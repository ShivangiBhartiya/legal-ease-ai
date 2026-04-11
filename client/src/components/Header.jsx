import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../App";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  const headerBg = isDark
    ? scrolled || menuOpen
      ? "rgba(12,12,13,0.96)"
      : "rgba(12,12,13,0.75)"
    : scrolled || menuOpen
    ? "rgba(248,248,246,0.96)"
    : "rgba(248,248,246,0.80)";

  const borderColor = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const logoColor = isDark ? "#f0f0f0" : "#111111";
  const navActive = isDark ? "#f0f0f0" : "#111111";
  const navInactive = isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)";

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        backgroundColor: headerBg,
        borderBottom: `1px solid ${borderColor}`,
        transition: "background-color 0.35s ease, border-color 0.35s ease",
      }}
    >
      <div
        style={{
          maxWidth: "72rem",
          margin: "0 auto",
          padding: "0 1.5rem",
          height: "60px",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            color: logoColor,
            textDecoration: "none",
            fontFamily: "Georgia, serif",
            fontWeight: 700,
            fontSize: "1rem",
            letterSpacing: "-0.01em",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.65")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          <svg width="20" height="20" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            {/* Center pole */}
            <rect x="48" y="10" width="4" height="75" rx="2"/>
            {/* Base */}
            <rect x="30" y="83" width="40" height="6" rx="3"/>
            {/* Horizontal beam */}
            <rect x="10" y="24" width="80" height="4" rx="2"/>
            {/* Decorative top knob */}
            <circle cx="50" cy="11" r="5"/>
            {/* Left chain */}
            <rect x="19" y="28" width="3" height="18" rx="1.5"/>
            {/* Right chain */}
            <rect x="78" y="28" width="3" height="18" rx="1.5"/>
            {/* Left pan */}
            <path d="M10 46 Q20.5 54 31 46" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round"/>
            {/* Right pan */}
            <path d="M69 46 Q79.5 54 90 46" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round"/>
          </svg>
          Legal Ease AI
        </Link>

        {/* Desktop Nav */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2.5rem",
          }}
          className="hidden md:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                fontSize: "0.8125rem",
                color: pathname === link.to ? navActive : navInactive,
                fontWeight: pathname === link.to ? 600 : 400,
                textDecoration: "none",
                position: "relative",
                paddingBottom: "2px",
                transition: "color 0.2s",
                letterSpacing: "0.01em",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = navActive)}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color =
                  pathname === link.to ? navActive : navInactive)
              }
            >
              {link.label}
              {pathname === link.to && (
                <span
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "1.5px",
                    borderRadius: "999px",
                    backgroundColor: isDark ? "#e0e0e0" : "#111111",
                  }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Right: Theme Toggle + CTA */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "0.625rem",
          }}
        >
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: `1px solid ${borderColor}`,
              background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.25s, border-color 0.25s, transform 0.2s",
              color: isDark ? "#f0f0f0" : "#111111",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
              e.currentTarget.style.background = isDark
                ? "rgba(255,255,255,0.12)"
                : "rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.background = isDark
                ? "rgba(255,255,255,0.06)"
                : "rgba(0,0,0,0.04)";
            }}
          >
            {isDark ? (
              /* Sun icon */
              <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5" strokeWidth={1.8} />
                <line x1="12" y1="2" x2="12" y2="4" strokeWidth={1.8} strokeLinecap="round" />
                <line x1="12" y1="20" x2="12" y2="22" strokeWidth={1.8} strokeLinecap="round" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" strokeWidth={1.8} strokeLinecap="round" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" strokeWidth={1.8} strokeLinecap="round" />
                <line x1="2" y1="12" x2="4" y2="12" strokeWidth={1.8} strokeLinecap="round" />
                <line x1="20" y1="12" x2="22" y2="12" strokeWidth={1.8} strokeLinecap="round" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" strokeWidth={1.8} strokeLinecap="round" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" strokeWidth={1.8} strokeLinecap="round" />
              </svg>
            ) : (
              /* Moon icon */
              <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                />
              </svg>
            )}
          </button>

          {/* CTA — desktop only */}
          <Link
            to="/"
            className="hidden md:block"
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              background: isDark ? "#f0f0f0" : "#111111",
              color: isDark ? "#111111" : "#f0f0f0",
              padding: "0.45rem 1rem",
              borderRadius: "8px",
              textDecoration: "none",
              letterSpacing: "0.02em",
              transition: "opacity 0.2s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Try for free →
          </Link>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden"
            style={{
              padding: "4px",
              color: isDark ? "#f0f0f0" : "#111111",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <div style={{ width: "20px", display: "flex", flexDirection: "column", gap: "5px" }}>
              <span style={{
                display: "block", height: "1.5px", background: "currentColor", borderRadius: "2px",
                transition: "all 0.2s",
                transform: menuOpen ? "rotate(45deg) translateY(6.5px)" : "none",
                width: "20px",
              }} />
              <span style={{
                display: "block", height: "1.5px", background: "currentColor", borderRadius: "2px",
                transition: "all 0.2s",
                opacity: menuOpen ? 0 : 1,
                width: "13px",
              }} />
              <span style={{
                display: "block", height: "1.5px", background: "currentColor", borderRadius: "2px",
                transition: "all 0.2s",
                transform: menuOpen ? "rotate(-45deg) translateY(-6.5px)" : "none",
                width: "20px",
              }} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            borderTop: `1px solid ${borderColor}`,
            padding: "1.25rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
          className="md:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                fontSize: "0.875rem",
                color: pathname === link.to ? navActive : navInactive,
                fontWeight: pathname === link.to ? 600 : 400,
                textDecoration: "none",
              }}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ paddingTop: "0.5rem", borderTop: `1px solid ${borderColor}` }}>
            <Link
              to="/"
              style={{
                display: "block",
                textAlign: "center",
                fontSize: "0.75rem",
                fontWeight: 600,
                background: isDark ? "#f0f0f0" : "#111111",
                color: isDark ? "#111111" : "#f0f0f0",
                padding: "0.6rem 1rem",
                borderRadius: "8px",
                textDecoration: "none",
              }}
            >
              Try for free →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}