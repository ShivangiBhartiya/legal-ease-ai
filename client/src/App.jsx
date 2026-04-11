import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useContext, useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

// ── Theme Context ──────────────────────────────────────────────
export const ThemeContext = createContext(null);

export function useTheme() {
  return useContext(ThemeContext);
}

// ── Animated Dot Background ────────────────────────────────────
function DotBackground() {
  const { theme } = useTheme();

  return (
    <div
      className="dot-background"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <canvas id="dot-canvas" style={{ width: "100%", height: "100%", display: "block" }} />
      <style>{`
        #dot-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
}

// ── Dot Canvas Animation ───────────────────────────────────────
function useDotCanvas(theme) {
  useEffect(() => {
    const canvas = document.getElementById("dot-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const DOT_SPACING = 28;
    const DOT_RADIUS = 1.2;
    const MOUSE_RADIUS = 120;
    const WAVE_SPEED = 0.0012;

    let mouse = { x: -999, y: -999 };
    let animId;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e) => {
      const evt = e.touches ? e.touches[0] : e;
      mouse.x = evt.clientX;
      mouse.y = evt.clientY;
    };
    const onLeave = () => { mouse = { x: -999, y: -999 }; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);

    const draw = () => {
      t += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDark = theme === "dark";
      const baseDotColor = isDark ? "rgba(255,255,255," : "rgba(0,0,0,";

      const cols = Math.ceil(canvas.width / DOT_SPACING) + 1;
      const rows = Math.ceil(canvas.height / DOT_SPACING) + 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * DOT_SPACING;
          const y = r * DOT_SPACING;

          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Wave ripple
          const wave = Math.sin((x + y) * 0.018 - t * WAVE_SPEED * 60) * 0.5 + 0.5;

          // Mouse proximity boost
          const proximity = dist < MOUSE_RADIUS ? 1 - dist / MOUSE_RADIUS : 0;
          const alpha = Math.min(0.06 + wave * 0.08 + proximity * 0.55, 0.9);

          // Mouse push-away offset
          let ox = 0, oy = 0;
          if (proximity > 0) {
            const angle = Math.atan2(dy, dx);
            const push = proximity * 6;
            ox = Math.cos(angle) * push;
            oy = Math.sin(angle) * push;
          }

          const radius = DOT_RADIUS + proximity * 2.5;

          ctx.beginPath();
          ctx.arc(x + ox, y + oy, radius, 0, Math.PI * 2);
          ctx.fillStyle = `${baseDotColor}${alpha.toFixed(3)})`;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [theme]);
}

// ── App Shell ──────────────────────────────────────────────────
function AppShell() {
  const { theme } = useTheme();
  useDotCanvas(theme);

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        position: "relative",
        backgroundColor: theme === "dark" ? "#0c0c0d" : "#f8f8f6",
        color: theme === "dark" ? "#e8e8e8" : "#1a1a1a",
        transition: "background-color 0.4s ease, color 0.4s ease",
      }}
    >
      {/* Dot background layer */}
      <DotBackground />

      {/* Content layer */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("legal-theme") || "light";
  });

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("legal-theme", next);
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}