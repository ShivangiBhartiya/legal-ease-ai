import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTokens } from "../App";
import axios from "axios";

function ThreatCard({ threat, level }) {
  const isRed = level === "critical";
  const color = isRed ? "#DC2626" : "#D97706";
  const bg = isRed ? "rgba(220,38,38,0.08)" : "rgba(217,119,6,0.08)";
  const border = isRed ? "rgba(220,38,38,0.25)" : "rgba(217,119,6,0.25)";
  return (
    <div style={{ background: bg, border: `1px solid ${border}`, borderLeft: `4px solid ${color}`, borderRadius: "12px", padding: "1rem 1.25rem", marginBottom: "0.75rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
        <span>{isRed ? "🔴" : "🟡"}</span>
        <strong style={{ fontFamily: "'Noto Serif', Georgia, serif", fontSize: "0.95rem", color }}>{threat.title}</strong>
        <span style={{ marginLeft: "auto", fontSize: "0.7rem", fontWeight: 700, color, background: isRed ? "rgba(220,38,38,0.15)" : "rgba(217,119,6,0.15)", padding: "2px 8px", borderRadius: "20px", letterSpacing: "0.08em" }}>
          {isRed ? "CRITICAL" : "MODERATE"}
        </span>
      </div>
      <p style={{ margin: "0 0 0.4rem", fontSize: "0.875rem", color: "#4B5563", lineHeight: 1.6 }}>{threat.description}</p>
      {threat.quote && (
        <blockquote style={{ margin: 0, padding: "0.5rem 0.75rem", background: "rgba(0,0,0,0.04)", borderRadius: "6px", fontStyle: "italic", fontSize: "0.8rem", color: "#6B7280", borderLeft: `2px solid ${border}` }}>
          "{threat.quote}"
        </blockquote>
      )}
    </div>
  );
}

function AnalysisResult({ analysis, tk }) {
  const cardStyle = { background: tk.surface, border: `1px solid ${tk.goldBorder}`, borderRadius: "16px", padding: "1.5rem", marginBottom: "1.5rem", backdropFilter: "blur(20px)" };
  const sectionTitle = (icon, text) => (
    <h3 style={{ fontFamily: "'Noto Serif', Georgia, serif", fontSize: "1.05rem", fontWeight: 700, color: tk.textPrimary, margin: "0 0 1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <span>{icon}</span> {text}
    </h3>
  );
  const totalThreats = (analysis.criticalThreats?.length || 0) + (analysis.moderateThreats?.length || 0);
  const bannerColor = totalThreats === 0 ? "rgba(16,185,129,0.08)" : analysis.criticalThreats?.length > 0 ? "rgba(220,38,38,0.08)" : "rgba(217,119,6,0.08)";
  const bannerBorder = totalThreats === 0 ? "rgba(16,185,129,0.3)" : analysis.criticalThreats?.length > 0 ? "rgba(220,38,38,0.3)" : "rgba(217,119,6,0.3)";
  return (
    <div style={{ animation: "fadeIn 0.5s ease" }}>
      <div style={{ ...cardStyle, background: bannerColor, borderColor: bannerBorder, display: "flex", alignItems: "center", gap: "1rem" }}>
        <span style={{ fontSize: "2.5rem" }}>{totalThreats === 0 ? "✅" : analysis.criticalThreats?.length > 0 ? "🚨" : "⚠️"}</span>
        <div>
          <div style={{ fontFamily: "'Noto Serif', Georgia, serif", fontWeight: 700, fontSize: "1.1rem", color: tk.textPrimary }}>
            {totalThreats === 0 ? "Document looks safe!" : `${totalThreats} risk${totalThreats > 1 ? "s" : ""} detected`}
          </div>
          <div style={{ fontSize: "0.85rem", color: tk.textMuted }}>{analysis.criticalThreats?.length || 0} critical &nbsp;•&nbsp; {analysis.moderateThreats?.length || 0} moderate</div>
        </div>
      </div>
      <div style={cardStyle}>
        {sectionTitle("📋", "Document Summary")}
        <p style={{ fontFamily: "'Noto Serif', Georgia, serif", fontSize: "0.95rem", color: tk.textPrimary, lineHeight: 1.7, margin: "0 0 1rem" }}>{analysis.summary}</p>
        {analysis.keyPoints?.length > 0 && (
          <ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
            {analysis.keyPoints.map((pt, i) => <li key={i} style={{ fontSize: "0.875rem", color: tk.textMuted, lineHeight: 1.6, marginBottom: "0.35rem" }}>{pt}</li>)}
          </ul>
        )}
      </div>
      {analysis.criticalThreats?.length > 0 && (
        <div style={cardStyle}>
          {sectionTitle("🔴", `Critical Risks (${analysis.criticalThreats.length})`)}
          {analysis.criticalThreats.map((t, i) => <ThreatCard key={i} threat={t} level="critical" />)}
        </div>
      )}
      {analysis.moderateThreats?.length > 0 && (
        <div style={cardStyle}>
          {sectionTitle("🟡", `Moderate Risks (${analysis.moderateThreats.length})`)}
          {analysis.moderateThreats.map((t, i) => <ThreatCard key={i} threat={t} level="moderate" />)}
        </div>
      )}
    </div>
  );
}

export default function Dashboard() {
  const tk = useTokens();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState("file");
  const [file, setFile] = useState(null);
  const [textInput, setTextInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef();

  useEffect(() => {
    const stored = localStorage.getItem("legal-user");
    if (!stored) { navigate("/auth"); return; }
    setUser(JSON.parse(stored));
  }, []);

  const logout = () => { localStorage.removeItem("legal-user"); navigate("/auth"); };

  const handleAnalyze = async () => {
    setError(""); setAnalysis(null); setLoading(true);
    try {
      let res;
      if (mode === "file") {
        if (!file) { setError("Please select a PDF file first."); setLoading(false); return; }
        const formData = new FormData();
        formData.append("file", file);
        res = await axios.post("http://localhost:5000/api/upload", formData, { headers: { "Content-Type": "multipart/form-data" } });
      } else {
        if (textInput.trim().length < 50) { setError("Please paste at least 50 characters of legal text."); setLoading(false); return; }
        res = await axios.post("http://localhost:5000/api/analyze-text", { text: textInput });
      }
      if (res.data.analysis) { setAnalysis(res.data.analysis); }
      else { setError("Analysis failed — check if GEMINI_API_KEY is set on the server."); }
    } catch (err) {
      setError(err.response?.data?.error || "Server error. Make sure the backend is running.");
    } finally { setLoading(false); }
  };

  if (!user) return null;

  const cardStyle = { background: tk.surface, border: `1px solid ${tk.goldBorder}`, borderRadius: "16px", padding: "1.5rem", backdropFilter: "blur(20px)", boxShadow: tk.isDark ? "0 8px 32px rgba(0,0,0,0.3)" : "0 8px 24px rgba(0,0,0,0.07)" };
  const tabBtn = (label, val) => (
    <button onClick={() => { setMode(val); setAnalysis(null); setError(""); setFile(null); }} style={{ padding: "0.6rem 1.5rem", borderRadius: "10px", border: `1px solid ${mode === val ? tk.gold : tk.goldBorder}`, background: mode === val ? tk.gold : "transparent", color: mode === val ? "#fff" : tk.textMuted, fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "0.95rem", fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}>
      {label}
    </button>
  );

  return (
    <div style={{ maxWidth: "860px", margin: "0 auto", padding: "3rem 1.5rem", animation: "fadeIn 0.4s ease" }}>
      <style>{`@keyframes fadeIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:none} } @keyframes spin { to { transform: rotate(360deg) } }`}</style>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontFamily: "'Noto Serif', Georgia, serif", fontSize: "clamp(1.75rem, 4vw, 2.25rem)", fontWeight: 700, color: tk.textPrimary, letterSpacing: "-0.03em", margin: "0 0 0.25rem" }}>
            Welcome, <span style={{ color: tk.gold }}>{user.username}</span> 👋
          </h1>
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1rem", color: tk.textMuted, fontStyle: "italic", margin: 0 }}>Legal Ease AI Dashboard</p>
        </div>
        <button onClick={logout} style={{ padding: "0.6rem 1.25rem", borderRadius: "10px", border: `1px solid ${tk.goldBorder}`, background: tk.goldLight, color: tk.gold, fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer" }}>Logout →</button>
      </div>
      <div style={{ height: "1px", background: `linear-gradient(90deg, transparent, ${tk.gold}, transparent)`, marginBottom: "2.5rem" }} />
      <h2 style={{ fontFamily: "'Noto Serif', Georgia, serif", fontSize: "1.25rem", fontWeight: 700, color: tk.textPrimary, margin: "0 0 1.25rem" }}>⚖️ Legal Document Analyzer</h2>
      <div style={{ ...cardStyle, marginBottom: "2rem" }}>
        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem" }}>
          {tabBtn("📄 Upload PDF", "file")}
          {tabBtn("✍️ Paste Text", "text")}
        </div>
        {mode === "file" && (
          <div>
            <div onClick={() => fileInputRef.current?.click()} onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); setFile(e.dataTransfer.files[0]); setAnalysis(null); }}
              style={{ border: `2px dashed ${file ? tk.gold : tk.goldBorder}`, borderRadius: "12px", padding: "2.5rem", textAlign: "center", cursor: "pointer", background: file ? "rgba(202,154,88,0.05)" : "transparent", transition: "all 0.2s", marginBottom: "1rem" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>📁</div>
              {file ? (
                <div>
                  <div style={{ fontWeight: 700, color: tk.gold, fontFamily: "'Noto Serif', Georgia, serif" }}>{file.name}</div>
                  <div style={{ fontSize: "0.8rem", color: tk.textMuted, marginTop: "0.25rem" }}>{(file.size / 1024).toFixed(1)} KB — Click to change</div>
                </div>
              ) : (
                <div>
                  <div style={{ color: tk.textPrimary, fontFamily: "'Noto Serif', Georgia, serif", fontWeight: 600 }}>Drop PDF here or click to browse</div>
                  <div style={{ fontSize: "0.8rem", color: tk.textMuted, marginTop: "0.35rem" }}>Supports PDF files</div>
                </div>
              )}
            </div>
            <input ref={fileInputRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={e => { setFile(e.target.files[0]); setAnalysis(null); }} />
          </div>
        )}
        {mode === "text" && (
          <textarea value={textInput} onChange={e => { setTextInput(e.target.value); setAnalysis(null); }}
            placeholder="Paste your legal document, contract, NDA, or any legal text here..."
            style={{ width: "100%", minHeight: "200px", padding: "1rem", borderRadius: "12px", border: `1px solid ${tk.goldBorder}`, background: tk.surface, color: tk.textPrimary, fontFamily: "'Noto Serif', Georgia, serif", fontSize: "0.9rem", lineHeight: 1.6, resize: "vertical", outline: "none", boxSizing: "border-box", marginBottom: "0.5rem" }} />
        )}
        {error && (
          <div style={{ padding: "0.75rem 1rem", borderRadius: "10px", marginBottom: "1rem", background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.25)", color: "#DC2626", fontSize: "0.875rem" }}>
            ⚠️ {error}
          </div>
        )}
        <button onClick={handleAnalyze} disabled={loading} style={{ width: "100%", padding: "0.875rem", borderRadius: "12px", border: "none", background: loading ? tk.goldBorder : `linear-gradient(135deg, ${tk.gold}, #B8860B)`, color: "#fff", fontFamily: "'Noto Serif', Georgia, serif", fontSize: "1rem", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", letterSpacing: "0.02em", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
          {loading ? (<><span style={{ display: "inline-block", width: "16px", height: "16px", border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid #fff", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />Analyzing with AI...</>) : "🔍 Analyze Document"}
        </button>
        <p style={{ fontSize: "0.75rem", color: tk.textMuted, textAlign: "center", margin: "0.75rem 0 0", fontStyle: "italic" }}>Powered by Google Gemini AI — threats color-coded by severity</p>
      </div>
      {analysis && <AnalysisResult analysis={analysis} tk={tk} />}
    </div>
  );
}