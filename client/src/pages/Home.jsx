import { useState, useRef } from "react";
import { useTheme } from "../App";

export default function Home() {
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const charLimit = 5000;
  const hasInput = text.trim() || fileName;

  // ── Theme tokens ───────────────────────────────────
  const cardBg = isDark ? "rgba(20,20,22,0.82)" : "rgba(255,255,255,0.88)";
  const cardBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const textMain = isDark ? "#f0f0f0" : "#111111";
  const textSub = isDark ? "rgba(255,255,255,0.38)" : "rgba(0,0,0,0.38)";
  const textMuted = isDark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.22)";
  const inputBg = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.025)";
  const inputBorder = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const inputText = isDark ? "#e8e8e8" : "#1a1a1a";
  const inputPlaceholder = isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)";
  const dividerColor = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const btnBg = isDark ? "#f0f0f0" : "#111111";
  const btnText = isDark ? "#111111" : "#f0f0f0";
  const badgeBg = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)";
  const badgeBorder = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)";
  const badgeText = isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.4)";

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setFileName(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) setFileName(file.name);
  };

  const handleAnalyze = () => {
    if (!hasInput) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Connect your AI handler here.");
    }, 2000);
  };

  return (
    <main style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      <section style={{
        position: "relative",
        zIndex: 1,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "6rem 1.5rem 4rem",
      }}>
        <div style={{
          width: "100%",
          maxWidth: "640px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "1.1rem",
        }}>

          {/* Badge */}
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.375rem",
            background: badgeBg,
            border: `1px solid ${badgeBorder}`,
            color: badgeText,
            fontSize: "0.7rem",
            fontWeight: 500,
            padding: "0.3rem 0.875rem",
            borderRadius: "999px",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}>
            <span style={{
              width: "6px", height: "6px", borderRadius: "50%",
              backgroundColor: "#10b981",
              animation: "pulse-dot 2s infinite",
              display: "inline-block",
            }} />
            AI-powered analysis
          </span>

          {/* Heading */}
          <h1 style={{
            fontFamily: "Georgia, serif",
            fontWeight: 700,
            color: textMain,
            lineHeight: 1.15,
            fontSize: "clamp(1.6rem, 3.5vw, 2.7rem)",
            letterSpacing: "-0.025em",
            margin: "0.25rem 0 0",
            transition: "color 0.4s ease",
          }}>
            Understand Legal Documents<br />
            <span style={{ opacity: 0.7 }}>in Seconds</span>
          </h1>

          <p style={{
            color: textSub,
            fontSize: "0.9375rem",
            fontWeight: 400,
            maxWidth: "400px",
            lineHeight: 1.6,
            transition: "color 0.4s ease",
          }}>
            No jargon. Just clear legal explanations powered by AI.
          </p>

          {/* Card */}
          <div style={{
            width: "100%",
            marginTop: "1rem",
            background: cardBg,
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: `1px solid ${cardBorder}`,
            borderRadius: "20px",
            padding: "1.75rem",
            boxShadow: isDark
              ? "0 24px 64px rgba(0,0,0,0.4)"
              : "0 8px 40px rgba(0,0,0,0.06)",
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            transition: "background 0.4s ease, border-color 0.4s ease",
          }}>

            {/* Textarea */}
            <div style={{ position: "relative" }}>
              <textarea
                value={text}
                onChange={(e) => e.target.value.length <= charLimit && setText(e.target.value)}
                rows={7}
                placeholder="Paste your legal text here…"
                style={{
                  width: "100%",
                  background: inputBg,
                  border: `1px solid ${inputBorder}`,
                  borderRadius: "12px",
                  padding: "0.875rem 1rem",
                  fontSize: "0.875rem",
                  color: inputText,
                  resize: "none",
                  outline: "none",
                  fontFamily: "inherit",
                  lineHeight: 1.65,
                  boxSizing: "border-box",
                  transition: "border-color 0.25s, background 0.4s",
                }}
                onFocus={(e) => (e.target.style.borderColor = isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)")}
                onBlur={(e) => (e.target.style.borderColor = inputBorder)}
              />
              {/* Placeholder color workaround via style tag */}
              <style>{`textarea::placeholder { color: ${inputPlaceholder}; }`}</style>
              <span style={{
                position: "absolute",
                bottom: "12px",
                right: "12px",
                fontSize: "0.7rem",
                color: text.length > charLimit * 0.9
                  ? "#f59e0b"
                  : textMuted,
                pointerEvents: "none",
                fontVariantNumeric: "tabular-nums",
              }}>
                {text.length}/{charLimit}
              </span>
            </div>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{ flex: 1, height: "1px", background: dividerColor }} />
              <span style={{ fontSize: "0.7rem", color: textMuted, letterSpacing: "0.04em" }}>
                or upload a file
              </span>
              <div style={{ flex: 1, height: "1px", background: dividerColor }} />
            </div>

            {/* Drop zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => !fileName && fileInputRef.current?.click()}
              style={{
                borderRadius: "12px",
                border: `2px dashed ${
                  fileName
                    ? (isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)")
                    : dragging
                    ? (isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)")
                    : (isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)")
                }`,
                padding: "1rem 1.25rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "0.75rem",
                cursor: fileName ? "default" : "pointer",
                background: dragging ? (isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)") : "transparent",
                transition: "border-color 0.2s, background 0.2s",
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", minWidth: 0 }}>
                <svg width="18" height="18" fill="none" stroke={textSub} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M12 16V4m0 0L8 8m4-4 4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
                </svg>
                {fileName ? (
                  <p style={{ fontSize: "0.875rem", color: inputText, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {fileName}
                  </p>
                ) : (
                  <p style={{ fontSize: "0.875rem", color: textMuted }}>
                    <span style={{ color: inputText, fontWeight: 500 }}>Upload your PDF here</span>
                    {" "}— or drag &amp; drop
                  </p>
                )}
              </div>
              {fileName && (
                <button
                  onClick={handleRemoveFile}
                  style={{
                    flexShrink: 0,
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    background: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
                    border: "none",
                    color: textSub,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    transition: "background 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(239,68,68,0.15)";
                    e.currentTarget.style.color = "#ef4444";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)";
                    e.currentTarget.style.color = textSub;
                  }}
                  title="Remove file"
                >
                  ✕
                </button>
              )}
            </div>

            <p style={{ fontSize: "0.7rem", color: textMuted, marginTop: "-0.25rem" }}>
              Accepted: PDF, DOC, DOCX, TXT
            </p>

            {/* CTA */}
            <button
              onClick={handleAnalyze}
              disabled={!hasInput || loading}
              style={{
                width: "100%",
                padding: "0.8rem",
                borderRadius: "12px",
                fontWeight: 600,
                fontSize: "0.875rem",
                letterSpacing: "0.015em",
                border: "none",
                cursor: hasInput && !loading ? "pointer" : "not-allowed",
                opacity: !hasInput || loading ? 0.3 : 1,
                background: btnBg,
                color: btnText,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                transition: "opacity 0.25s, transform 0.15s",
              }}
              onMouseEnter={(e) => hasInput && !loading && (e.currentTarget.style.opacity = "0.82")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = !hasInput || loading ? "0.3" : "1")}
            >
              {loading ? (
                <>
                  <svg style={{ animation: "spin 1s linear infinite", width: "15px", height: "15px" }} fill="none" viewBox="0 0 24 24">
                    <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Analysing…
                </>
              ) : (
                "Analyse Document"
              )}
            </button>
          </div>

          {/* Trust line */}
          <p style={{ fontSize: "0.7rem", color: textMuted, marginTop: "0.25rem" }}>
            Your document is never stored. Analysis happens in real time.
          </p>
        </div>
      </section>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}