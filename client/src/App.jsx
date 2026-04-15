import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useContext, useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Waitlist from "./pages/Waitlist";
import Admin from "./pages/Admin";
import Auth from "./pages/AuthPages";
import Dashboard from "./pages/Dashboard";

export const ThemeContext = createContext(null);
export function useTheme() { return useContext(ThemeContext); }

// ── Dot Background ──────────────────────────────────────────────
function DotBackground() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-15%", right: "-5%", width: "55vw", height: "55vw", borderRadius: "50%", background: isDark ? "radial-gradient(circle, rgba(180,140,40,0.07) 0%, transparent 65%)" : "radial-gradient(circle, rgba(180,140,40,0.13) 0%, transparent 65%)", animation: "floatA 20s ease-in-out infinite" }}/>
      <div style={{ position: "absolute", bottom: "0%", left: "-10%", width: "45vw", height: "45vw", borderRadius: "50%", background: isDark ? "radial-gradient(circle, rgba(100,100,100,0.08) 0%, transparent 65%)" : "radial-gradient(circle, rgba(140,100,40,0.08) 0%, transparent 65%)", animation: "floatB 25s ease-in-out infinite" }}/>
      <div style={{ position: "absolute", top: "45%", left: "35%", width: "38vw", height: "38vw", borderRadius: "50%", background: isDark ? "radial-gradient(circle, rgba(60,50,20,0.06) 0%, transparent 65%)" : "radial-gradient(circle, rgba(200,160,60,0.06) 0%, transparent 65%)", animation: "floatC 30s ease-in-out infinite" }}/>
      <canvas id="dot-canvas" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
      <style>{`
        @keyframes floatA { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(3%,5%) scale(1.05)} 66%{transform:translate(-2%,2%) scale(0.97)} }
        @keyframes floatB { 0%,100%{transform:translate(0,0)} 40%{transform:translate(5%,-4%)} 75%{transform:translate(-3%,3%)} }
        @keyframes floatC { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-6%,6%)} }
      `}</style>
    </div>
  );
}

function useDotCanvas(theme) {
  useEffect(() => {
    const canvas = document.getElementById("dot-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const SPACING = 22, RADIUS = 1.1, MOUSE_R = 130;
    let mouse = { x: -9999, y: -9999 }, animId, t = 0;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const onMove = (e) => { const ev = e.touches?.[0] || e; mouse.x = ev.clientX; mouse.y = ev.clientY; };
    const onLeave = () => { mouse = { x: -9999, y: -9999 }; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    const draw = () => {
      t++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = theme === "dark";
      const baseR = isDark ? 255 : 130, baseG = isDark ? 255 : 100, baseB = isDark ? 255 : 40;
      const cols = Math.ceil(canvas.width / SPACING) + 1, rows = Math.ceil(canvas.height / SPACING) + 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * SPACING, y = r * SPACING;
          const dx = x - mouse.x, dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const wave = Math.sin((x + y) * 0.016 - t * 0.07) * 0.5 + 0.5;
          const prox = dist < MOUSE_R ? 1 - dist / MOUSE_R : 0;
          const alpha = Math.min(0.015 + wave * 0.018 + prox * 0.08, 0.12);
          let ox = 0, oy = 0;
          if (prox > 0) { const ang = Math.atan2(dy, dx); const push = prox * 8; ox = Math.cos(ang) * push; oy = Math.sin(ang) * push; }
          const rad = RADIUS + prox * 2.8;
          ctx.beginPath(); ctx.arc(x + ox, y + oy, rad, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${baseR},${baseG},${baseB},${alpha.toFixed(3)})`; ctx.fill();
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); window.removeEventListener("mousemove", onMove); window.removeEventListener("touchmove", onMove); window.removeEventListener("mouseleave", onLeave); };
  }, [theme]);
}

function UserIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    </svg>
  );
}

function AILawyerBtn({ onOpen }) {
  const tk = useTokens();
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{ position: "fixed", bottom: "2rem", right: "2rem", zIndex: 9999 }}>
      <div style={{
        position: "absolute", bottom: "calc(100% + 0.75rem)", right: 0,
        background: tk.isDark ? "rgba(22,20,18,0.97)" : "rgba(255,254,252,0.97)",
        border: `1px solid ${tk.goldBorder}`, borderRadius: "12px",
        padding: "0.5rem 0.875rem",
        boxShadow: tk.isDark ? "0 8px 32px rgba(0,0,0,0.5)" : "0 8px 24px rgba(0,0,0,0.12)",
        backdropFilter: "blur(20px)", whiteSpace: "nowrap",
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: "0.8125rem", color: tk.textSecondary,
        pointerEvents: "none",
        opacity: hovered ? 1 : 0,
        transform: hovered ? "translateY(0)" : "translateY(6px)",
        transition: "opacity 0.2s ease, transform 0.2s ease",
      }}>
        <span style={{ color: tk.gold, fontWeight: 600 }}>Your AI Lawyer</span>{" — "}here to help
        <div style={{ position: "absolute", bottom: "-5px", right: "18px", width: "10px", height: "10px", background: tk.isDark ? "rgba(22,20,18,0.97)" : "rgba(255,254,252,0.97)", border: `1px solid ${tk.goldBorder}`, borderTop: "none", borderLeft: "none", transform: "rotate(45deg)", borderRadius: "0 0 2px 0" }}/>
      </div>
      <button
        onClick={onOpen}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: "54px", height: "54px", borderRadius: "50%",
          background: tk.isDark
            ? "linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)"
            : "linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%)",
          border: `2px solid ${tk.isDark ? "rgba(156,163,175,0.3)" : "rgba(156,163,175,0.4)"}`,
          cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: hovered
            ? (tk.isDark ? "0 0 0 8px rgba(156,163,175,0.1), 0 12px 32px rgba(0,0,0,0.5)" : "0 0 0 8px rgba(156,163,175,0.15), 0 12px 32px rgba(0,0,0,0.15)")
            : (tk.isDark ? "0 4px 20px rgba(0,0,0,0.5)" : "0 4px 20px rgba(0,0,0,0.12)"),
          transform: hovered ? "scale(1.1)" : "scale(1)",
          transition: "all 0.25s cubic-bezier(.34,1.56,.64,1)",
          padding: 0,
        }}
      >
        <UserIcon size={22} />
      </button>
    </div>
  );
}

function HowItWorksOverlay({ onClose }) {
  const tk = useTokens();
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 10000, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: tk.isDark ? "rgba(0,0,0,0.75)" : "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)" }}/>
      <div style={{
        position: "relative", width: "100%", maxWidth: "640px", maxHeight: "90vh", overflowY: "auto",
        background: tk.isDark ? "rgba(14,14,12,0.98)" : "rgba(253,251,248,0.98)",
        border: `1px solid ${tk.goldBorder}`, borderRadius: "24px", padding: "2.5rem",
        boxShadow: tk.isDark ? "0 40px 120px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,220,100,0.08)" : "0 40px 120px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.9)",
        animation: "overlayIn 0.35s cubic-bezier(.22,1,.36,1)",
      }}>
        <style>{`@keyframes overlayIn { from{opacity:0;transform:translateY(24px) scale(.97)} to{opacity:1;transform:none} }`}</style>
        <button onClick={onClose} style={{ position: "absolute", top: "1.25rem", left: "1.25rem", display: "flex", alignItems: "center", gap: "0.375rem", background: tk.goldLight, border: `1px solid ${tk.goldBorder}`, borderRadius: "8px", padding: "0.375rem 0.75rem", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "0.8125rem", fontWeight: 600, color: tk.gold, cursor: "pointer", transition: "all 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.background = tk.isDark ? "rgba(201,168,76,0.2)" : "rgba(160,120,40,0.15)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = tk.goldLight; }}>
          ← Back
        </button>
        <div style={{ paddingTop: "2rem" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.75rem" }}>
              <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: tk.isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)", border: `2px solid rgba(156,163,175,0.3)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <UserIcon size={32} />
              </div>
            </div>
            <h2 style={{ fontFamily: "'Noto Serif', Georgia, serif", fontWeight: 700, fontSize: "clamp(1.75rem, 4vw, 2.25rem)", color: tk.textPrimary, letterSpacing: "-0.03em", margin: "0 0 0.5rem" }}>Your AI Lawyer</h2>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: tk.textSecondary, fontSize: "1.125rem", fontWeight: 300, fontStyle: "italic", margin: 0 }}>Making legal documents accessible to everyone</p>
          </div>
          <div style={{ height: "1px", background: `linear-gradient(90deg, transparent, ${tk.gold}, transparent)`, marginBottom: "2rem" }}/>
          <section style={{ marginBottom: "2rem" }}>
            <h3 style={{ fontFamily: "'Noto Serif', Georgia, serif", fontSize: "1.125rem", fontWeight: 700, color: tk.textPrimary, margin: "0 0 0.75rem" }}>What is Legal Ease AI?</h3>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.0625rem", color: tk.textSecondary, lineHeight: 1.75, margin: 0 }}>
              Legal Ease AI is an intelligent document analysis tool that translates complex legal language into plain, understandable English. Whether reviewing a rental agreement, employment contract, terms of service, or any other legal document — we have you covered.
            </p>
          </section>
          <section style={{ marginBottom: "2rem" }}>
            <h3 style={{ fontFamily: "'Noto Serif', Georgia, serif", fontSize: "1.125rem", fontWeight: 700, color: tk.textPrimary, margin: "0 0 1rem" }}>How to Use</h3>
            {[
              { step: "01", title: "Paste or Upload", desc: "Paste your legal text directly or upload a PDF/DOC file from your device." },
              { step: "02", title: "One-Click Analysis", desc: "Hit Analyse Document and our AI processes every clause in seconds." },
              { step: "03", title: "Read Plain-English Results", desc: "Get a clear summary, risk flags with severity levels, and what you are actually agreeing to." },
              { step: "04", title: "Know What to Negotiate", desc: "Receive actionable suggestions on clauses you should push back on." },
            ].map(item => (
              <div key={item.step} style={{ display: "flex", gap: "1rem", marginBottom: "1rem", padding: "1rem", borderRadius: "12px", background: tk.isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.025)", border: `1px solid ${tk.surfaceBorder}` }}>
                <span style={{ fontFamily: "'Noto Serif', Georgia, serif", fontSize: "0.75rem", fontWeight: 700, color: tk.gold, letterSpacing: "0.08em", opacity: 0.8, flexShrink: 0, marginTop: "2px" }}>{item.step}</span>
                <div>
                  <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: "1rem", color: tk.textPrimary, margin: "0 0 0.25rem" }}>{item.title}</p>
                  <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "0.9375rem", color: tk.textSecondary, lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </section>
          <div style={{ background: tk.goldLight, border: `1px solid ${tk.goldBorder}`, borderRadius: "12px", padding: "1rem 1.25rem", display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
            <span style={{ fontSize: "1.125rem", flexShrink: 0 }}>🔒</span>
            <div>
              <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "0.9375rem", fontWeight: 600, color: tk.gold, margin: "0 0 0.25rem" }}>Your Privacy Matters</p>
              <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "0.875rem", color: tk.textSecondary, lineHeight: 1.6, margin: 0 }}>Documents are never stored. All analysis happens in real-time and nothing is retained after your session ends.</p>
            </div>
          </div>
          <button onClick={onClose} style={{ width: "100%", marginTop: "1.5rem", padding: "0.875rem", borderRadius: "12px", fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: "1rem", letterSpacing: "0.04em", border: "none", cursor: "pointer", background: tk.btnBg, color: tk.btnText, transition: "opacity 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.82"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
            Start Analysing →
          </button>
        </div>
      </div>
    </div>
  );
}

export function useTokens() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return {
    isDark,
    bg: isDark ? "#0e0e0f" : "#f9f7f4",
    surface: isDark ? "rgba(22,20,18,0.88)" : "rgba(255,254,252,0.90)",
    surfaceBorder: isDark ? "rgba(255,220,100,0.10)" : "rgba(160,120,40,0.15)",
    gold: isDark ? "#c9a84c" : "#a07830",
    goldLight: isDark ? "rgba(201,168,76,0.12)" : "rgba(160,120,40,0.09)",
    goldBorder: isDark ? "rgba(201,168,76,0.25)" : "rgba(160,120,40,0.22)",
    textPrimary: isDark ? "#f2eed8" : "#1a160c",
    textSecondary: isDark ? "rgba(242,238,216,0.72)" : "rgba(26,22,12,0.68)",
    textMuted: isDark ? "rgba(242,238,216,0.48)" : "rgba(26,22,12,0.42)",
    inputBg: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.025)",
    inputBorder: isDark ? "rgba(255,220,100,0.14)" : "rgba(160,120,40,0.16)",
    divider: isDark ? "rgba(255,220,100,0.08)" : "rgba(160,120,40,0.10)",
    btnBg: isDark ? "#c9a84c" : "#1a160c",
    btnText: isDark ? "#0e0e0f" : "#f9f7f4",
    danger: "#e05252",
    success: "#3da87a",
  };
}

function AppShell() {
  const { theme } = useTheme();
  const tokens = useTokens();
  const [overlayOpen, setOverlayOpen] = useState(false);
  useDotCanvas(theme);
  return (
    <div style={{ position: "relative", backgroundColor: tokens.bg, color: tokens.textPrimary, minHeight: "100vh", display: "flex", flexDirection: "column", transition: "background-color 0.4s ease, color 0.4s ease" }}>
      <DotBackground />
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/waitlist" element={<Waitlist />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
        <Footer />
      </div>
      <AILawyerBtn onOpen={() => setOverlayOpen(true)} />
      {overlayOpen && <HowItWorksOverlay onClose={() => setOverlayOpen(false)} />}
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("legal-theme") || "light");
  const toggleTheme = () => {
    setTheme(prev => { const next = prev === "light" ? "dark" : "light"; localStorage.setItem("legal-theme", next); return next; });
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <BrowserRouter><AppShell /></BrowserRouter>
    </ThemeContext.Provider>
  );
}