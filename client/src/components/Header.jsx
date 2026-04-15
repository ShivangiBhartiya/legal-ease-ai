import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme, useTokens } from "../App";
import LogoMark from "./LogoMark";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { toggleTheme } = useTheme();
  const tk = useTokens();

  useEffect(() => {
    const stored = localStorage.getItem("legal-user");
    if (stored) {
      const user = JSON.parse(stored);
      setLoggedIn(true);
      setUsername(user.username || "");
    } else {
      setLoggedIn(false);
      setUsername("");
    }
  }, [pathname]);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("legal-user");
    setLoggedIn(false);
    setUsername("");
    navigate("/auth");
  };

  const hBg = scrolled || menuOpen
    ? (tk.isDark ? "rgba(14,14,15,0.97)" : "rgba(249,247,244,0.97)")
    : (tk.isDark ? "rgba(14,14,15,0.80)" : "rgba(249,247,244,0.82)");

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        backgroundColor: hBg,
        borderBottom: `1px solid ${tk.surfaceBorder}`,
        transition: "background-color 0.35s ease",
      }}
    >
      <div
        style={{
          maxWidth: "72rem",
          margin: "0 auto",
          padding: "0 1.5rem",
          height: "62px",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Link
          to="/"
          style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none", transition: "opacity 0.2s" }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.7"; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
        >
          <LogoMark size={28} isDark={tk.isDark} />
          <span
            style={{
              fontFamily: "'Noto Serif', Georgia, serif",
              fontWeight: 700,
              fontSize: "0.9375rem",
              letterSpacing: "-0.02em",
              color: tk.textPrimary,
            }}
          >
            Legal Ease AI
          </span>
        </Link>

        <nav style={{ display: "flex", alignItems: "center", gap: "2.25rem" }}>
          {navLinks.map((link) => {
            const active = pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "1rem",
                  fontWeight: active ? 600 : 500,
                  letterSpacing: "0.04em",
                  color: active ? tk.gold : tk.textSecondary,
                  textDecoration: "none",
                  position: "relative",
                  paddingBottom: "2px",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = tk.gold; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = active ? tk.gold : tk.textSecondary; }}
              >
                {link.label}
                {active && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "1px",
                      borderRadius: "999px",
                      background: `linear-gradient(90deg, transparent, ${tk.gold}, transparent)`,
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "0.625rem" }}>
          <button
            onClick={toggleTheme}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: `1px solid ${tk.goldBorder}`,
              background: tk.goldLight,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: tk.textPrimary,
              transition: "all 0.25s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = tk.isDark ? "rgba(201,168,76,0.22)" : "rgba(160,120,40,0.16)";
              e.currentTarget.style.transform = "scale(1.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = tk.goldLight;
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            {tk.isDark ? (
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5" strokeWidth="1.8" />
                <line x1="12" y1="2" x2="12" y2="4" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="12" y1="20" x2="12" y2="22" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="2" y1="12" x2="4" y2="12" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="20" y1="12" x2="22" y2="12" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </button>

          {loggedIn ? (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Link
                to="/dashboard"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "0.9375rem",
                  fontWeight: 600,
                  background: tk.goldLight,
                  color: tk.gold,
                  border: `1px solid ${tk.goldBorder}`,
                  padding: "0.4rem 1rem",
                  borderRadius: "8px",
                  textDecoration: "none",
                  letterSpacing: "0.03em",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.75"; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
                {username}
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  background: "transparent",
                  border: `1px solid ${tk.surfaceBorder}`,
                  color: tk.textMuted,
                  padding: "0.4rem 0.75rem",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#e05252";
                  e.currentTarget.style.color = "#e05252";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = tk.surfaceBorder;
                  e.currentTarget.style.color = tk.textMuted;
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "0.9375rem",
                fontWeight: 600,
                background: tk.btnBg,
                color: tk.btnText,
                padding: "0.4rem 1.125rem",
                borderRadius: "8px",
                textDecoration: "none",
                letterSpacing: "0.04em",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.78"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
            >
              Login
            </Link>
          )}

          <button onClick={() => setMenuOpen(!menuOpen)} style={{ padding: "4px", color: tk.textPrimary, background: "transparent", border: "none", cursor: "pointer" }}>
            <div style={{ width: "20px", display: "flex", flexDirection: "column", gap: "5px" }}>
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    display: "block",
                    height: "1.5px",
                    background: "currentColor",
                    borderRadius: "2px",
                    transition: "all 0.2s",
                    transform: menuOpen && i === 0 ? "rotate(45deg) translateY(6.5px)" : menuOpen && i === 2 ? "rotate(-45deg) translateY(-6.5px)" : "none",
                    opacity: menuOpen && i === 1 ? 0 : 1,
                    width: i === 1 ? "13px" : "20px",
                  }}
                />
              ))}
            </div>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          style={{
            borderTop: `1px solid ${tk.surfaceBorder}`,
            padding: "1.25rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
            background: tk.isDark ? "rgba(14,14,15,0.98)" : "rgba(249,247,244,0.98)",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "1.125rem",
                fontWeight: 600,
                color: pathname === link.to ? tk.gold : tk.textSecondary,
                textDecoration: "none",
              }}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ paddingTop: "0.5rem", borderTop: `1px solid ${tk.surfaceBorder}` }}>
            {loggedIn ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <Link
                  to="/dashboard"
                  style={{
                    display: "block",
                    textAlign: "center",
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "1rem",
                    fontWeight: 600,
                    background: tk.goldLight,
                    color: tk.gold,
                    border: `1px solid ${tk.goldBorder}`,
                    padding: "0.6rem 1rem",
                    borderRadius: "8px",
                    textDecoration: "none",
                  }}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "1rem",
                    fontWeight: 600,
                    background: "transparent",
                    border: "1px solid rgba(224,82,82,0.4)",
                    color: "#e05252",
                    padding: "0.6rem 1rem",
                    borderRadius: "8px",
                    cursor: "pointer",
                    width: "100%",
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                style={{
                  display: "block",
                  textAlign: "center",
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "1rem",
                  fontWeight: 600,
                  background: tk.btnBg,
                  color: tk.btnText,
                  padding: "0.6rem 1rem",
                  borderRadius: "8px",
                  textDecoration: "none",
                }}
              >
                Login / Register
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
