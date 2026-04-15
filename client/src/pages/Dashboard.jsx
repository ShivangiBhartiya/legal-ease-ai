import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTokens } from "../App";

export default function Dashboard() {
  const tk = useTokens();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("legal-user");
    if (!stored) {
      navigate("/auth");
      return;
    }
    setUser(JSON.parse(stored));
  }, []);

  const logout = () => {
    localStorage.removeItem("legal-user");
    navigate("/auth");
  };

  if (!user) return null;

  const cardStyle = {
    background: tk.surface,
    border: `1px solid ${tk.goldBorder}`,
    borderRadius: "16px",
    padding: "1.5rem",
    backdropFilter: "blur(20px)",
    boxShadow: tk.isDark
      ? "0 8px 32px rgba(0,0,0,0.3)"
      : "0 8px 24px rgba(0,0,0,0.07)",
  };

  const labelStyle = {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: "0.75rem",
    fontWeight: 700,
    color: tk.gold,
    letterSpacing: "0.1em",
    marginBottom: "0.25rem",
  };

  const valueStyle = {
    fontFamily: "'Noto Serif', Georgia, serif",
    fontSize: "1rem",
    color: tk.textPrimary,
    fontWeight: 500,
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "3rem 1.5rem", animation: "fadeIn 0.4s ease" }}>
      <style>{`@keyframes fadeIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:none} }`}</style>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{
            fontFamily: "'Noto Serif', Georgia, serif",
            fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
            fontWeight: 700, color: tk.textPrimary,
            letterSpacing: "-0.03em", margin: "0 0 0.25rem",
          }}>
            Welcome, <span style={{ color: tk.gold }}>{user.username}</span> 👋
          </h1>
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "1rem", color: tk.textMuted, fontStyle: "italic", margin: 0,
          }}>Your Legal Ease AI Dashboard</p>
        </div>
        <button onClick={logout} style={{
          padding: "0.6rem 1.25rem",
          borderRadius: "10px",
          border: `1px solid ${tk.goldBorder}`,
          background: tk.goldLight,
          color: tk.gold,
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "0.9rem", fontWeight: 600, cursor: "pointer",
          transition: "opacity 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.7"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          Logout →
        </button>
      </div>

      {/* Divider */}
      <div style={{ height: "1px", background: `linear-gradient(90deg, transparent, ${tk.gold}, transparent)`, marginBottom: "2rem" }} />

      {/* Profile Card */}
      <h2 style={{
        fontFamily: "'Noto Serif', Georgia, serif",
        fontSize: "1.125rem", fontWeight: 700,
        color: tk.textPrimary, margin: "0 0 1rem",
        letterSpacing: "-0.02em",
      }}>
        Your Profile
      </h2>

      <div style={{ ...cardStyle, marginBottom: "2.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.5rem" }}>
          <div>
            <p style={labelStyle}>USERNAME</p>
            <p style={valueStyle}>{user.username}</p>
          </div>
          <div>
            <p style={labelStyle}>EMAIL</p>
            <p style={valueStyle}>{user.email}</p>
          </div>
          <div>
            <p style={labelStyle}>USER ID</p>
            <p style={valueStyle}>#{user.id}</p>
          </div>
          <div>
            <p style={labelStyle}>JOINED</p>
            <p style={valueStyle}>
              {new Date(user.created_at).toLocaleDateString("en-GB", {
                day: "numeric", month: "long", year: "numeric"
              })}
            </p>
          </div>
        </div>
      </div>

      {/* ✅ ALL USERS SECTION REMOVED COMPLETELY */}

    </div>
  );
}