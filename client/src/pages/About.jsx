import { useTheme } from "../App";

const stats = [
  { value: "10k+", label: "Documents Analyzed", icon: "📄" },
  { value: "98%", label: "Accuracy Rate", icon: "✅" },
  { value: "< 5s", label: "Avg. Analysis Time", icon: "⚡" },
];

const problemItems = [
  "Rent agreements written to protect landlords",
  "Internship offers with buried non-compete clauses",
  "T&Cs that sign away your IP by default",
];

const fixItems = [
  "Plain-English summaries of every clause",
  "Risk flags with severity levels",
  "Negotiation suggestions you can actually use",
];

export default function About() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const cardBg = isDark ? "rgba(20,20,22,0.82)" : "rgba(255,255,255,0.88)";
  const cardBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const textMain = isDark ? "#f0f0f0" : "#111111";
  const textSub = isDark ? "rgba(255,255,255,0.38)" : "rgba(0,0,0,0.38)";
  const textBody = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)";
  const dividerColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";

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
          gap: "1.25rem",
        }}>

          <h1 style={{
            fontFamily: "Georgia, serif",
            fontWeight: 700,
            color: textMain,
            lineHeight: 1.15,
            fontSize: "clamp(2rem, 4vw, 3rem)",
            letterSpacing: "-0.025em",
            transition: "color 0.4s ease",
          }}>
            About Us
          </h1>

          <p style={{
            color: textSub,
            fontSize: "0.9375rem",
            maxWidth: "380px",
            lineHeight: 1.6,
            transition: "color 0.4s ease",
          }}>
            Built for people who don't have lawyers
          </p>

          {/* Stats */}
          <div style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "0.75rem",
            marginTop: "0.5rem",
          }}>
            {stats.map((s) => (
              <div key={s.label} style={{
                background: cardBg,
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: `1px solid ${cardBorder}`,
                borderRadius: "16px",
                padding: "1.125rem 0.75rem",
                textAlign: "center",
                boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.35)" : "0 4px 20px rgba(0,0,0,0.05)",
                transition: "background 0.4s ease",
              }}>
                <span style={{ fontSize: "1.25rem", display: "block", marginBottom: "0.375rem" }}>{s.icon}</span>
                <p style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: textMain,
                  lineHeight: 1,
                  marginBottom: "0.3rem",
                }}>
                  {s.value}
                </p>
                <p style={{
                  fontSize: "0.65rem",
                  color: textSub,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  lineHeight: 1.3,
                }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Content card */}
          <div style={{
            width: "100%",
            background: cardBg,
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: `1px solid ${cardBorder}`,
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: isDark ? "0 24px 64px rgba(0,0,0,0.4)" : "0 8px 40px rgba(0,0,0,0.06)",
            textAlign: "left",
            transition: "background 0.4s ease",
          }}>

            {/* The Problem */}
            <div style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                <span style={{ width: "5px", height: "20px", borderRadius: "999px", background: "#f87171", display: "block" }} />
                <h2 style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "1.125rem",
                  fontWeight: 600,
                  color: textMain,
                  margin: 0,
                }}>
                  The Problem
                </h2>
              </div>
              <p style={{ fontSize: "0.875rem", color: textBody, lineHeight: 1.7, margin: 0 }}>
                Most students and first-jobbers sign documents they've never truly understood.
                Without a lawyer, you're signing blind.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {problemItems.map((item) => (
                  <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem", fontSize: "0.875rem", color: textBody }}>
                    <svg width="15" height="15" fill="none" stroke="#f87171" viewBox="0 0 24 24" style={{ marginTop: "2px", flexShrink: 0 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ height: "1px", background: dividerColor }} />

            {/* Our Fix */}
            <div style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                <span style={{ width: "5px", height: "20px", borderRadius: "999px", background: "#34d399", display: "block" }} />
                <h2 style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "1.125rem",
                  fontWeight: 600,
                  color: textMain,
                  margin: 0,
                }}>
                  Our Fix
                </h2>
              </div>
              <p style={{ fontSize: "0.875rem", color: textBody, lineHeight: 1.7, margin: 0 }}>
                Legal case uses AI to translate legalese into plain English, flag risky clauses,
                tell you what you're actually agreeing to, and suggest what to negotiate — in seconds.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {fixItems.map((item) => (
                  <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem", fontSize: "0.875rem", color: textBody }}>
                    <svg width="15" height="15" fill="none" stroke="#34d399" viewBox="0 0 24 24" style={{ marginTop: "2px", flexShrink: 0 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA */}
          <a
            href="/"
            style={{
              marginTop: "0.5rem",
              fontSize: "0.875rem",
              color: textMain,
              fontWeight: 600,
              textDecoration: "underline",
              textUnderlineOffset: "4px",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.55")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Try it free — no account needed →
          </a>
        </div>
      </section>
    </main>
  );
}