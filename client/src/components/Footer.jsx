import { Link } from "react-router-dom";
import { useTheme } from "../App";

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const borderColor = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const textMain = isDark ? "#f0f0f0" : "#111111";
  const textMuted = isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)";
  const textFaint = isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.18)";
  const bgFooter = isDark ? "rgba(12,12,13,0.85)" : "rgba(248,248,246,0.85)";

  return (
    <footer
      style={{
        background: bgFooter,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: `1px solid ${borderColor}`,
        padding: "1.75rem 1.5rem",
        transition: "background 0.4s ease, border-color 0.4s ease",
      }}
    >
      <div
        style={{
          maxWidth: "72rem",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
        className="sm:flex-row"
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <svg width="17" height="17" viewBox="0 0 100 100" fill={textMain} xmlns="http://www.w3.org/2000/svg">
            <rect x="48" y="10" width="4" height="75" rx="2"/>
            <rect x="30" y="83" width="40" height="6" rx="3"/>
            <rect x="10" y="24" width="80" height="4" rx="2"/>
            <circle cx="50" cy="11" r="5"/>
            <rect x="19" y="28" width="3" height="18" rx="1.5"/>
            <rect x="78" y="28" width="3" height="18" rx="1.5"/>
            <path d="M10 46 Q20.5 54 31 46" stroke={textMain} strokeWidth="3" fill="none" strokeLinecap="round"/>
            <path d="M69 46 Q79.5 54 90 46" stroke={textMain} strokeWidth="3" fill="none" strokeLinecap="round"/>
          </svg>
          <span style={{ fontFamily: "Georgia, serif", fontWeight: 700, color: textMain, fontSize: "0.875rem" }}>
            Legal Ease AI
          </span>
        </div>

        {/* Links */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          {["Privacy Policy", "Terms of Service", "Contact"].map((label, i) => {
            const to = i === 0 ? "/privacy" : i === 1 ? "/terms" : "/contact";
            return (
              <Link
                key={label}
                to={to}
                style={{
                  fontSize: "0.725rem",
                  color: textMuted,
                  textDecoration: "none",
                  transition: "color 0.2s",
                  letterSpacing: "0.01em",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = textMain)}
                onMouseLeave={(e) => (e.currentTarget.style.color = textMuted)}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Copyright */}
        <p style={{ fontSize: "0.7rem", color: textFaint, textAlign: "center" }}>
          © {new Date().getFullYear()} Legal Ease AI.&nbsp;
          <span style={{ color: textFaint }}>Not legal advice.</span>
        </p>
      </div>
    </footer>
  );
}