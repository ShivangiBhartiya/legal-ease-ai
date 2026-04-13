import { Link } from "react-router-dom";
import { useTokens } from "../App";

function FooterLogo({ tk }) {
  return (
    <svg width="36" height="36" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Blue circular background */}
      <circle cx="60" cy="60" r="58" fill="#d8eaf5"/>

      {/* ── Books stack ── */}
      <rect x="14" y="82" width="50" height="8" rx="2" fill="#e8a048"/>
      <rect x="16" y="74" width="46" height="9" rx="2" fill="#c07830"/>
      <rect x="18" y="67" width="42" height="8" rx="2" fill="#e8a048"/>

      {/* ── Scales of Justice pole ── */}
      <rect x="36" y="32" width="3" height="37" rx="1.5" fill="#c9a84c"/>
      {/* Top horizontal bar */}
      <rect x="22" y="32" width="31" height="3" rx="1.5" fill="#c9a84c"/>
      {/* Left chain */}
      <line x1="25" y1="35" x2="25" y2="52" stroke="#c9a84c" strokeWidth="1.5" strokeDasharray="2 1.5"/>
      {/* Right chain */}
      <line x1="50" y1="35" x2="50" y2="52" stroke="#c9a84c" strokeWidth="1.5" strokeDasharray="2 1.5"/>
      {/* Left pan */}
      <path d="M19 52 Q25 58 31 52" stroke="#c9a84c" strokeWidth="2" fill="rgba(201,168,76,0.25)" strokeLinecap="round"/>
      {/* Right pan */}
      <path d="M44 52 Q50 58 56 52" stroke="#c9a84c" strokeWidth="2" fill="rgba(201,168,76,0.25)" strokeLinecap="round"/>

      {/* ── Female Lawyer ── */}
      {/* Body / jacket (pink) */}
      <path d="M72 95 C72 78 80 72 90 70 C100 72 108 78 108 95Z" fill="#f4a0b8"/>
      {/* White shirt collar area */}
      <rect x="86" y="68" width="8" height="10" rx="2" fill="white"/>
      {/* Neck */}
      <rect x="87" y="58" width="6" height="12" rx="3" fill="#c8845c"/>
      {/* Head */}
      <ellipse cx="90" cy="48" rx="12" ry="14" fill="#c8845c"/>
      {/* Hair - brown, long */}
      <path d="M78 42 C78 28 84 22 90 21 C96 22 102 28 102 42 C102 54 99 64 99 64 L81 64 C81 64 78 54 78 42Z" fill="#6b3b23"/>
      {/* Face area */}
      <ellipse cx="90" cy="49" rx="8.5" ry="10" fill="#c8845c"/>
      {/* Hair sides */}
      <path d="M78 42 C77 50 78 60 80 64 L81 64 C79 58 79 50 79 42Z" fill="#6b3b23"/>
      <path d="M102 42 C103 50 102 60 100 64 L99 64 C101 58 101 50 101 42Z" fill="#6b3b23"/>
      {/* Eyes */}
      <ellipse cx="86" cy="47" rx="1.5" ry="1.3" fill="#3b2010"/>
      <ellipse cx="94" cy="47" rx="1.5" ry="1.3" fill="#3b2010"/>
      {/* Smile */}
      <path d="M86 54 Q90 57 94 54" stroke="#a0522d" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      {/* Arms crossed */}
      <path d="M76 80 Q90 76 104 80" stroke="#f4a0b8" strokeWidth="7" fill="none" strokeLinecap="round"/>
      <path d="M76 80 Q80 85 90 83 Q100 85 104 80" stroke="#e87898" strokeWidth="2.5" fill="none" strokeLinecap="round"/>

      {/* Dividing line (desk surface) */}
      <line x1="10" y1="88" x2="110" y2="88" stroke="#b0c8d8" strokeWidth="1.5" strokeLinecap="round"/>
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