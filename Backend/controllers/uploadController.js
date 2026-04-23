import fs from "fs";
import path from "path";
import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";

function parseAnalysisResponse(rawText) {
  try {
    return JSON.parse(rawText);
  } catch {
    const start = rawText.indexOf("{");
    const end = rawText.lastIndexOf("}");

    if (start === -1 || end === -1 || end <= start) {
      throw new Error("AI returned an invalid response format");
    }

    const extracted = rawText.slice(start, end + 1);
    return JSON.parse(extracted);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getGeminiModels() {
  const primary = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const fallbackModels = (process.env.GEMINI_FALLBACK_MODELS || "gemini-2.5-flash-lite")
    .split(",")
    .map(model => model.trim())
    .filter(Boolean);

  return [...new Set([primary, ...fallbackModels])];
}

async function requestGeminiAnalysis(model, geminiApiKey, body) {
  let lastError;

  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": geminiApiKey,
          },
          body,
          signal: AbortSignal.timeout(30000),
        }
      );

      return response;
    } catch (error) {
      lastError = error;

      if (attempt === 2) {
        break;
      }

      await sleep(1200 * attempt);
    }
  }

  throw new Error(`Gemini request failed: ${lastError?.message || "network error"}`);
}

async function analyzeWithGemini(documentText, geminiApiKey) {
  const prompt = `You are a legal document analyst. Analyze the following legal document and respond ONLY with valid JSON (no markdown, no backticks, no extra text).

Return this exact JSON structure:
{
  "documentType": "Type of document e.g. Rental Agreement, NDA, Employment Contract, Terms of Service",
  "riskScore": 0,
  "summary": "A plain-English summary of what this document is about (2-4 sentences)",
  "keyPoints": ["point 1", "point 2", "point 3"],
  "moderateThreats": [
    {
      "title": "Short threat title",
      "description": "What this clause means and why it matters",
      "quote": "Exact quote from document if available"
    }
  ],
  "criticalThreats": [
    {
      "title": "Short threat title",
      "description": "What this clause means and why it is dangerous",
      "quote": "Exact quote from document if available"
    }
  ],
  "negotiationTips": ["Tip 1 on what to negotiate or push back on", "Tip 2"],
  "deadlines": [
    {
      "label": "Short name of the deadline e.g. Rent due, Lease expires, Notice period",
      "timing": "When it happens e.g. 1st of every month, 60 days notice, 2026-11-30",
      "description": "What it means for the user",
      "urgency": "high | medium | low"
    }
  ]
}

Rules:
- documentType: identify the type of legal document in 2-4 words
- riskScore: integer 0-100. 0-30 = low risk (safe), 31-60 = moderate, 61-85 = high, 86-100 = critical
- moderateThreats = yellow level risks (unfavorable but not catastrophic)
- criticalThreats = red level risks (seriously harmful, must be flagged urgently)
- negotiationTips = 2-4 actionable tips the user can use to negotiate better terms
- deadlines: extract all dates, notice periods, expiry clauses, due dates, renewal deadlines. Set urgency = "high" for strict penalties, "medium" for normal dates, "low" for informational. Empty array [] if none found.
- If no threats found, return empty arrays []
- Keep language simple and understandable for non-lawyers
- Quote directly from document where possible

DOCUMENT:
${documentText.substring(0, 8000)}`;

  const models = getGeminiModels();

  const requestBody = JSON.stringify({
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.2,
      maxOutputTokens: 8192,
    },
  });

  let lastModelError;
  let lastStatus = 0;

  for (const model of models) {
    const response = await requestGeminiAnalysis(model, geminiApiKey, requestBody);

    if (response.ok) {
      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
const cleaned = rawText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

      return parseAnalysisResponse(cleaned);
    }

    const errText = await response.text();
    lastModelError = errText;
    lastStatus = response.status;

    const isRetryableOverload = response.status === 503 || response.status === 429;
    if (!isRetryableOverload) {
      break;
    }
  }

  // Friendly messages instead of raw API dumps
  const isDailyQuota = /free_tier_requests|RESOURCE_EXHAUSTED|GenerateRequestsPerDay/i.test(lastModelError || "");
  if (lastStatus === 429 && isDailyQuota) {
    const err = new Error("Daily AI quota exhausted. Gemini's free tier allows a limited number of analyses per day — please try again tomorrow (resets at midnight Pacific Time) or enable billing to remove the limit.");
    err.status = 429;
    throw err;
  }
  if (lastStatus === 429) {
    const err = new Error("Too many requests in a short time. Please wait a minute and try again.");
    err.status = 429;
    throw err;
  }
  if (lastStatus === 503) {
    const err = new Error("Gemini is temporarily overloaded. Please try again shortly.");
    err.status = 503;
    throw err;
  }
  throw new Error("Analysis service unavailable. Please try again.");
}

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = req.file.path;
    const geminiApiKey = process.env.GEMINI_API_KEY;
    const extension = path.extname(req.file.originalname || filePath).toLowerCase();
    let text = "";

    if (extension === ".pdf") {
      const dataBuffer = fs.readFileSync(filePath);
      const parser = new PDFParse({ data: dataBuffer });

      try {
        const result = await parser.getText();
        text = result.text;
      } finally {
        await parser.destroy();
      }
    } else if (extension === ".txt") {
      text = fs.readFileSync(filePath, "utf8");
    } else if (extension === ".docx") {
      const result = await mammoth.extractRawText({ path: filePath });
      text = result.value;
    } else {
      return res.status(400).json({ error: "Supported formats: PDF, DOCX, TXT" });
    }

    if (!geminiApiKey) {
      return res.status(500).json({ error: "GEMINI_API_KEY not configured on server" });
    }

    if (!text.trim()) {
      return res.status(400).json({ error: "Could not extract readable text from the uploaded file" });
    }

    const analysis = await analyzeWithGemini(text, geminiApiKey);

    res.json({
      message: "File processed successfully",
      text: text.substring(0, 500),
      analysis,
    });
  } catch (error) {
    console.error("uploadFile error:", error);
    const status = error.status || 500;
    const msg = status === 500 ? "Error processing file: " + error.message : error.message;
    res.status(status).json({ error: msg });
  } finally {
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
  }
};

export const analyzeText = async (req, res) => {
  try {
    const { text } = req.body;
    const geminiApiKey = process.env.GEMINI_API_KEY;

    if (!text || text.trim().length < 50) {
      return res.status(400).json({ error: "Please provide at least 50 characters of text" });
    }

    if (!geminiApiKey) {
      return res.status(500).json({ error: "GEMINI_API_KEY not configured on server" });
    }

    const analysis = await analyzeWithGemini(text, geminiApiKey);

    res.json({
      message: "Text analyzed successfully",
      analysis,
    });
  } catch (error) {
    console.error("analyzeText error:", error);
    const status = error.status || 500;
    const msg = status === 500 ? "Error analyzing text: " + error.message : error.message;
    res.status(status).json({ error: msg });
  }
};
