import { Link } from "react-router-dom";
import { useTokens } from "../App";

function FooterLogo({ tk }) {
  const ink = tk.isDark ? "#f2eed8" : "#1a160c";
  const paper = tk.isDark ? "#0e0e0f" : "#f9f7f4";
  const gold = tk.isDark ? "#c9a84c" : "#a07830";
  return (
    <svg width="22" height="22" viewBox="0 0 48 48" fill="none">
      <rect x="6" y="3" width="28" height="36" rx="2.5" fill={ink}/>
      <line x1="11" y1="16" x2="24" y2="16" stroke={paper} strokeWidth="2" strokeLinecap="round"/>
      <line x1="11" y1="21" x2="28" y2="21" stroke={paper} strokeWidth="2" strokeLinecap="round"/>
      <line x1="11" y1="26" x2="26" y2="26" stroke={paper} strokeWidth="2" strokeLinecap="round"/>
      <circle cx="36" cy="36" r="11" fill={paper} stroke={gold} strokeWidth="1.25"/>
      <line x1="36" y1="28" x2="36" y2="42" stroke={ink} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="32" y1="42" x2="40" y2="42" stroke={ink} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="30" y1="31" x2="42" y2="31" stroke={ink} strokeWidth="1.25" strokeLinecap="round"/>
      <line x1="31" y1="31" x2="31" y2="36" stroke={ink} strokeWidth="1"/>
      <path d="M28 36 Q31 39 34 36" stroke={ink} strokeWidth="1.25" fill="none" strokeLinecap="round"/>
      <line x1="41" y1="31" x2="41" y2="36" stroke={ink} strokeWidth="1"/>
      <path d="M38 36 Q41 39 44 36" stroke={ink} strokeWidth="1.25" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export default function Footer() {
  const tk = useTokens();
  return (
    <footer style={{
      backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)",
      borderTop:`1px solid ${tk.surfaceBorder}`,
      padding:"1.75rem 1.5rem",
      background: tk.isDark?"rgba(14,14,15,0.88)":"rgba(249,247,244,0.88)",
    }}>
      <div style={{
        maxWidth:"72rem", margin:"0 auto",
        display:"flex", flexWrap:"wrap",
        alignItems:"center", justifyContent:"space-between", gap:"1rem",
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
          <FooterLogo tk={tk}/>
          <span style={{
            fontFamily:"'Noto Serif', Georgia, serif",
            fontWeight:700, fontSize:"0.875rem",
            color:tk.textPrimary,
          }}>Legal Ease AI</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:"1.5rem" }}>
          {[["Privacy Policy","/privacy"],["Terms","/terms"],["Contact","/contact"]].map(([l,t])=>(
            <Link key={t} to={t} style={{
              fontFamily:"'Cormorant Garamond', Georgia, serif",
              fontSize:"0.9rem", color:tk.textSecondary, fontWeight:500,
              textDecoration:"none", transition:"color 0.2s",
            }}
              onMouseEnter={e=>e.currentTarget.style.color=tk.gold}
              onMouseLeave={e=>e.currentTarget.style.color=tk.textSecondary}
            >{l}</Link>
          ))}
        </div>
        <p style={{
          fontFamily:"'Cormorant Garamond', Georgia, serif",
          fontSize:"0.8rem", color:tk.textSecondary, fontWeight:500,
        }}>
          © {new Date().getFullYear()} Legal Ease AI · Not legal advice
        </p>
      </div>
    </footer>
  );
}