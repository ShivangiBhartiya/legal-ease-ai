import { useState, useEffect } from "react";
import axios from "axios";
import { useTokens } from "../App";

const ADMIN_PASSWORD = "1234";

export default function Admin() {
  const tk = useTokens();
  const [authed, setAuthed] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState(false);
  const [entries, setEntries] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  const handleLogin = () => {
    if (pwInput === ADMIN_PASSWORD) {
      setAuthed(true);
      setPwError(false);
    } else {
      setPwError(true);
    }
  };

  useEffect(() => {
    if (!authed) return;
    setLoadingData(true);
    axios.get("/api/waitlist")
      .then(res => setEntries(res.data.data))
      .catch(err => console.error(err))
      .finally(() => setLoadingData(false));
  }, [authed]);

  const inputStyle = {
    width: "100%",
    background: tk.inputBg,
    border: `1px solid ${tk.inputBorder}`,
    borderRadius: "10px",
    padding: "0.75rem 1rem",
    fontSize: "0.9375rem",
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    color: tk.textPrimary,
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color .25s",
  };

  // ── Password screen ──
  if (!authed) {
    return (
      <main style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:"6rem 1.5rem" }}>
        <div style={{
          width:"100%", maxWidth:"380px",
          background:tk.surface,
          border:`1px solid ${tk.surfaceBorder}`,
          borderRadius:"20px", padding:"2.5rem",
          boxShadow: tk.isDark ? "0 32px 80px rgba(0,0,0,.5)" : "0 12px 48px rgba(0,0,0,.07)",
        }}>
          <div style={{ textAlign:"center", marginBottom:"1.75rem" }}>
            <div style={{
              width:"48px", height:"48px", borderRadius:"50%",
              background:tk.goldLight, border:`1px solid ${tk.goldBorder}`,
              display:"flex", alignItems:"center", justifyContent:"center",
              margin:"0 auto 1rem",
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={tk.gold} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
            </div>
            <h2 style={{ fontFamily:"'Noto Serif', Georgia, serif", fontWeight:700, fontSize:"1.5rem", color:tk.textPrimary, margin:"0 0 0.25rem" }}>Admin Access</h2>
            <p style={{ fontFamily:"'Cormorant Garamond', Georgia, serif", color:tk.textSecondary, fontSize:"1rem", margin:0 }}>Enter password to view waitlist</p>
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:"0.875rem" }}>
            <input
              type="password"
              placeholder="Password"
              value={pwInput}
              onChange={e => { setPwInput(e.target.value); setPwError(false); }}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              style={{ ...inputStyle, borderColor: pwError ? tk.danger : tk.inputBorder }}
              onFocus={e => e.target.style.borderColor = pwError ? tk.danger : tk.gold}
              onBlur={e => e.target.style.borderColor = pwError ? tk.danger : tk.inputBorder}
            />
            {pwError && (
              <p style={{ fontFamily:"'Cormorant Garamond', Georgia, serif", color:tk.danger, fontSize:"0.9rem", margin:0 }}>
                Incorrect password. Try again.
              </p>
            )}
            <button
              onClick={handleLogin}
              style={{
                width:"100%", padding:"0.85rem", borderRadius:"12px",
                fontFamily:"'Cormorant Garamond', Georgia, serif",
                fontWeight:600, fontSize:"1rem", letterSpacing:"0.04em",
                border:"none", cursor:"pointer",
                background:tk.btnBg, color:tk.btnText,
                transition:"opacity .25s",
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.82"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              Enter →
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ── Admin dashboard ──
  return (
    <main style={{ minHeight:"100vh", padding:"6rem 1.5rem 4rem" }}>
      <div style={{ maxWidth:"900px", margin:"0 auto" }}>

        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"2rem", flexWrap:"wrap", gap:"1rem" }}>
          <div>
            <h1 style={{ fontFamily:"'Noto Serif', Georgia, serif", fontWeight:700, fontSize:"clamp(1.5rem,4vw,2rem)", color:tk.textPrimary, letterSpacing:"-0.03em", margin:"0 0 0.25rem" }}>
              Waitlist Entries
            </h1>
            <p style={{ fontFamily:"'Cormorant Garamond', Georgia, serif", color:tk.textSecondary, fontSize:"1rem", margin:0 }}>
              {entries.length} {entries.length === 1 ? "person" : "people"} on the waitlist
            </p>
          </div>
          <button
            onClick={() => { setAuthed(false); setPwInput(""); }}
            style={{
              padding:"0.5rem 1.25rem", borderRadius:"8px",
              fontFamily:"'Cormorant Garamond', Georgia, serif",
              fontWeight:600, fontSize:"0.875rem",
              border:`1px solid ${tk.goldBorder}`,
              background:tk.goldLight, color:tk.gold,
              cursor:"pointer", transition:"all .2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = tk.isDark ? "rgba(201,168,76,0.2)" : "rgba(160,120,40,0.15)"}
            onMouseLeave={e => e.currentTarget.style.background = tk.goldLight}
          >
            Logout
          </button>
        </div>

        {/* Divider */}
        <div style={{ height:"1px", background:`linear-gradient(90deg, transparent, ${tk.gold}, transparent)`, marginBottom:"2rem" }}/>

        {/* Loading */}
        {loadingData && (
          <div style={{ textAlign:"center", padding:"3rem", fontFamily:"'Cormorant Garamond', Georgia, serif", color:tk.textSecondary, fontSize:"1.125rem" }}>
            Loading entries…
          </div>
        )}

        {/* Empty */}
        {!loadingData && entries.length === 0 && (
          <div style={{
            textAlign:"center", padding:"3rem",
            background:tk.surface, border:`1px solid ${tk.surfaceBorder}`,
            borderRadius:"16px",
          }}>
            <p style={{ fontFamily:"'Cormorant Garamond', Georgia, serif", color:tk.textSecondary, fontSize:"1.125rem", margin:0 }}>
              No entries yet. Share your waitlist link!
            </p>
          </div>
        )}

        {/* Table */}
        {!loadingData && entries.length > 0 && (
          <div style={{ overflowX:"auto", borderRadius:"16px", border:`1px solid ${tk.surfaceBorder}` }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontFamily:"'Cormorant Garamond', Georgia, serif" }}>
              <thead>
                <tr style={{ background: tk.isDark ? "rgba(255,220,100,0.06)" : "rgba(160,120,40,0.07)" }}>
                  {["#", "Name", "Email", "Phone", "Joined"].map(h => (
                    <th key={h} style={{
                      padding:"0.875rem 1.25rem", textAlign:"left",
                      fontWeight:600, fontSize:"0.8125rem",
                      letterSpacing:"0.06em", textTransform:"uppercase",
                      color:tk.gold, borderBottom:`1px solid ${tk.surfaceBorder}`,
                      whiteSpace:"nowrap",
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, i) => (
                  <tr key={entry.id}
                    style={{ background: i % 2 === 0 ? "transparent" : (tk.isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.018)") }}
                    onMouseEnter={e => e.currentTarget.style.background = tk.isDark ? "rgba(201,168,76,0.06)" : "rgba(160,120,40,0.05)"}
                    onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "transparent" : (tk.isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.018)")}
                  >
                    <td style={{ padding:"0.875rem 1.25rem", color:tk.textMuted, fontSize:"0.875rem", borderBottom:`1px solid ${tk.surfaceBorder}` }}>{i + 1}</td>
                    <td style={{ padding:"0.875rem 1.25rem", color:tk.textPrimary, fontWeight:600, fontSize:"1rem", borderBottom:`1px solid ${tk.surfaceBorder}` }}>{entry.name}</td>
                    <td style={{ padding:"0.875rem 1.25rem", color:tk.textSecondary, fontSize:"0.9375rem", borderBottom:`1px solid ${tk.surfaceBorder}` }}>{entry.email}</td>
                    <td style={{ padding:"0.875rem 1.25rem", color:tk.textSecondary, fontSize:"0.9375rem", borderBottom:`1px solid ${tk.surfaceBorder}` }}>{entry.phone || "—"}</td>
                    <td style={{ padding:"0.875rem 1.25rem", color:tk.textMuted, fontSize:"0.875rem", borderBottom:`1px solid ${tk.surfaceBorder}`, whiteSpace:"nowrap" }}>
                      {new Date(entry.created_at).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}