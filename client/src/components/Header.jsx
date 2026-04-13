import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme, useTokens } from "../App";

// Illustrated scales-of-justice logo — full black/white editorial style
function LogoIcon({ size = 26, isDark }) {
  const ink = isDark ? "#f2eed8" : "#1a160c";
  const paper = isDark ? "#0e0e0f" : "#f9f7f4";
  const gold = isDark ? "#c9a84c" : "#a07830";
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Document */}
      <rect x="6" y="3" width="28" height="36" rx="2.5" fill={ink}/>
      <rect x="6" y="3" width="28" height="36" rx="2.5" fill="none" stroke={isDark?"rgba(255,220,100,0.3)":"rgba(160,120,40,0.3)"} strokeWidth="0.75"/>
      {/* Folded corner */}
      <path d="M27 3 L34 10 L27 10 Z" fill={isDark?"rgba(255,220,100,0.25)":"rgba(255,255,255,0.25)"}/>
      <path d="M27 3 L34 10" stroke={isDark?"rgba(255,220,100,0.5)":"rgba(0,0,0,0.3)"} strokeWidth="0.75"/>
      {/* Lines */}
      <line x1="11" y1="16" x2="24" y2="16" stroke={paper} strokeWidth="2" strokeLinecap="round"/>
      <line x1="11" y1="21" x2="28" y2="21" stroke={paper} strokeWidth="2" strokeLinecap="round"/>
      <line x1="11" y1="26" x2="26" y2="26" stroke={paper} strokeWidth="2" strokeLinecap="round"/>
      <line x1="11" y1="31" x2="20" y2="31" stroke={paper} strokeWidth="2" strokeLinecap="round"/>
      {/* Scale circle overlay */}
      <circle cx="36" cy="36" r="11" fill={paper} stroke={gold} strokeWidth="1.25"/>
      {/* Scale pole */}
      <line x1="36" y1="28" x2="36" y2="42" stroke={ink} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="32" y1="42" x2="40" y2="42" stroke={ink} strokeWidth="1.5" strokeLinecap="round"/>
      {/* Beam */}
      <line x1="30" y1="31" x2="42" y2="31" stroke={ink} strokeWidth="1.25" strokeLinecap="round"/>
      {/* Pans */}
      <line x1="31" y1="31" x2="31" y2="36" stroke={ink} strokeWidth="1"/>
      <path d="M28 36 Q31 39 34 36" stroke={ink} strokeWidth="1.25" fill="none" strokeLinecap="round"/>
      <line x1="41" y1="31" x2="41" y2="36" stroke={ink} strokeWidth="1"/>
      <path d="M38 36 Q41 39 44 36" stroke={ink} strokeWidth="1.25" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const { toggleTheme } = useTheme();
  const tk = useTokens();

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", h, { passive:true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  useEffect(() => setMenuOpen(false), [pathname]);

  const hBg = scrolled || menuOpen
    ? (tk.isDark ? "rgba(14,14,15,0.97)" : "rgba(249,247,244,0.97)")
    : (tk.isDark ? "rgba(14,14,15,0.80)" : "rgba(249,247,244,0.82)");

  return (
    <header style={{
      position:"fixed", top:0, left:0, right:0, zIndex:50,
      backdropFilter:"blur(18px)", WebkitBackdropFilter:"blur(18px)",
      backgroundColor: hBg,
      borderBottom:`1px solid ${tk.surfaceBorder}`,
      transition:"background-color 0.35s ease",
    }}>
      <div style={{
        maxWidth:"72rem", margin:"0 auto", padding:"0 1.5rem",
        height:"62px", display:"grid",
        gridTemplateColumns:"1fr auto 1fr", alignItems:"center", gap:"1rem",
      }}>
        {/* Logo */}
        <Link to="/" style={{
          display:"flex", alignItems:"center", gap:"0.5rem",
          textDecoration:"none", transition:"opacity 0.2s",
        }}
          onMouseEnter={e=>e.currentTarget.style.opacity="0.7"}
          onMouseLeave={e=>e.currentTarget.style.opacity="1"}
        >
          <LogoIcon size={28} isDark={tk.isDark}/>
          <span style={{
            fontFamily:"'Noto Serif', Georgia, serif",
            fontWeight:700,
            fontSize:"0.9375rem",
            letterSpacing:"-0.02em",
            color: tk.textPrimary,
          }}>Legal Ease AI</span>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display:"flex", alignItems:"center", gap:"2.25rem" }}>
          {navLinks.map(link => {
            const active = pathname === link.to;
            return (
              <Link key={link.to} to={link.to} style={{
                fontFamily:"'Cormorant Garamond', Georgia, serif",
                fontSize:"1rem", fontWeight: active ? 600 : 400,
                letterSpacing:"0.04em",
                color: active ? tk.gold : tk.textSecondary,
                fontWeight: active ? 600 : 500,
                textDecoration:"none", position:"relative",
                paddingBottom:"2px", transition:"color 0.2s",
              }}
                onMouseEnter={e=>e.currentTarget.style.color=tk.gold}
                onMouseLeave={e=>e.currentTarget.style.color=active?tk.gold:tk.textSecondary}
              >
                {link.label}
                {active && <span style={{
                  position:"absolute", bottom:0, left:0, right:0,
                  height:"1px", borderRadius:"999px",
                  background:`linear-gradient(90deg, transparent, ${tk.gold}, transparent)`,
                }}/>}
              </Link>
            );
          })}
        </nav>

        {/* Right */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"flex-end", gap:"0.625rem" }}>
          {/* Theme toggle */}
          <button onClick={toggleTheme}
            style={{
              width:"36px", height:"36px", borderRadius:"50%",
              border:`1px solid ${tk.goldBorder}`,
              background: tk.goldLight,
              cursor:"pointer", display:"flex", alignItems:"center",
              justifyContent:"center",
              color: tk.textPrimary,
              transition:"all 0.25s",
            }}
            onMouseEnter={e=>{e.currentTarget.style.background=tk.isDark?"rgba(201,168,76,0.22)":"rgba(160,120,40,0.16)"; e.currentTarget.style.transform="scale(1.08)";}}
            onMouseLeave={e=>{e.currentTarget.style.background=tk.goldLight; e.currentTarget.style.transform="scale(1)";}}
          >
            {tk.isDark ? (
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5" strokeWidth="1.8"/>
                <line x1="12" y1="2" x2="12" y2="4" strokeWidth="1.8" strokeLinecap="round"/>
                <line x1="12" y1="20" x2="12" y2="22" strokeWidth="1.8" strokeLinecap="round"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" strokeWidth="1.8" strokeLinecap="round"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" strokeWidth="1.8" strokeLinecap="round"/>
                <line x1="2" y1="12" x2="4" y2="12" strokeWidth="1.8" strokeLinecap="round"/>
                <line x1="20" y1="12" x2="22" y2="12" strokeWidth="1.8" strokeLinecap="round"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" strokeWidth="1.8" strokeLinecap="round"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
              </svg>
            )}
          </button>

          {/* CTA */}
          <Link to="/" style={{
            fontFamily:"'Cormorant Garamond', Georgia, serif",
            fontSize:"0.9375rem", fontWeight:600,
            background: tk.btnBg,
            color: tk.btnText,
            padding:"0.4rem 1.125rem",
            borderRadius:"8px",
            textDecoration:"none",
            letterSpacing:"0.04em",
            transition:"opacity 0.2s",
          }}
            onMouseEnter={e=>e.currentTarget.style.opacity="0.78"}
            onMouseLeave={e=>e.currentTarget.style.opacity="1"}
            className="hidden md:block"
          >
            Try free →
          </Link>

          {/* Hamburger */}
          <button className="md:hidden" onClick={()=>setMenuOpen(!menuOpen)}
            style={{ padding:"4px", color:tk.textPrimary, background:"transparent", border:"none", cursor:"pointer" }}>
            <div style={{ width:"20px", display:"flex", flexDirection:"column", gap:"5px" }}>
              {[0,1,2].map(i=>(
                <span key={i} style={{
                  display:"block", height:"1.5px", background:"currentColor", borderRadius:"2px",
                  transition:"all 0.2s",
                  transform: menuOpen && i===0 ? "rotate(45deg) translateY(6.5px)" : menuOpen && i===2 ? "rotate(-45deg) translateY(-6.5px)" : "none",
                  opacity: menuOpen && i===1 ? 0 : 1,
                  width: i===1 ? "13px":"20px",
                }}/>
              ))}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden" style={{
          borderTop:`1px solid ${tk.surfaceBorder}`,
          padding:"1.25rem 1.5rem",
          display:"flex", flexDirection:"column", gap:"1.25rem",
          background: tk.isDark?"rgba(14,14,15,0.98)":"rgba(249,247,244,0.98)",
        }}>
          {navLinks.map(link=>(
            <Link key={link.to} to={link.to} style={{
              fontFamily:"'Cormorant Garamond', Georgia, serif",
              fontSize:"1.125rem", fontWeight:600,
              color: pathname===link.to ? tk.gold : tk.textSecondary,
              textDecoration:"none",
            }}>{link.label}</Link>
          ))}
          <div style={{ paddingTop:"0.5rem", borderTop:`1px solid ${tk.surfaceBorder}` }}>
            <Link to="/" style={{
              display:"block", textAlign:"center",
              fontFamily:"'Cormorant Garamond', Georgia, serif",
              fontSize:"1rem", fontWeight:600,
              background:tk.btnBg, color:tk.btnText,
              padding:"0.6rem 1rem", borderRadius:"8px", textDecoration:"none",
            }}>Try free →</Link>
          </div>
        </div>
      )}
    </header>
  );
}