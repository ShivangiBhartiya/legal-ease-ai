import { useState, useRef } from "react";
import { useTokens } from "../App";
import WaitlistForm from "../components/WaitlistForm";

export default function Home() {
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const tk = useTokens();

  const charLimit = 5000;
  const hasInput = text.trim() || fileName;

  const handleFileChange = e => { const f=e.target.files[0]; if(f) setFileName(f.name); };
  const handleRemoveFile = e => { e.stopPropagation(); setFileName(null); if(fileInputRef.current) fileInputRef.current.value=""; };
  const handleDrop = e => { e.preventDefault(); setDragging(false); const f=e.dataTransfer.files[0]; if(f) setFileName(f.name); };
  const handleAnalyze = () => {
    if(!hasInput) return;
    setLoading(true);
    setTimeout(()=>{ setLoading(false); alert("Connect your AI handler here."); }, 2000);
  };

  return (
    <main style={{ position:"relative", minHeight:"100vh" }}>
      <style>{`
        textarea::placeholder { color: ${tk.textMuted}; }
        @keyframes pulse-dot { 0%,100%{opacity:1} 50%{opacity:.3} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes heroIn { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        .hero-line1 { animation: heroIn .7s cubic-bezier(.22,1,.36,1) .05s both; }
        .hero-line2 { animation: heroIn .7s cubic-bezier(.22,1,.36,1) .15s both; }
        .hero-sub   { animation: heroIn .7s cubic-bezier(.22,1,.36,1) .25s both; }
        .hero-card  { animation: heroIn .7s cubic-bezier(.22,1,.36,1) .35s both; }
        .hero-trust { animation: heroIn .7s cubic-bezier(.22,1,.36,1) .45s both; }
      `}</style>

      <section style={{
        position:"relative", zIndex:1,
        minHeight:"100vh",
        display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"center",
        padding:"6rem 1.5rem 4rem",
      }}>
        <div style={{
          width:"100%", maxWidth:"640px",
          margin:"0 auto",
          display:"flex", flexDirection:"column",
          alignItems:"center", textAlign:"center", gap:"1.1rem",
        }}>

          {/* Badge */}
          <span className="hero-line1" style={{
            display:"inline-flex", alignItems:"center", gap:"0.375rem",
            background:tk.goldLight,
            border:`1px solid ${tk.goldBorder}`,
            color:tk.gold,
            fontFamily:"'Cormorant Garamond', Georgia, serif",
            fontSize:"0.75rem", fontWeight:600,
            padding:"0.3rem 1rem", borderRadius:"999px",
            letterSpacing:"0.1em", textTransform:"uppercase",
          }}>
            <span style={{
              width:"6px", height:"6px", borderRadius:"50%",
              backgroundColor:tk.success,
              animation:"pulse-dot 2s infinite", display:"inline-block",
            }}/>
            AI-powered analysis
          </span>

          {/* Heading */}
          <h1 style={{ margin:0 }}>
            <span className="hero-line1" style={{
              display:"block",
              fontFamily:"'Noto Serif', Georgia, serif",
              fontWeight:700, color:tk.textPrimary,
              fontSize:"clamp(1.875rem, 4vw, 3.25rem)",
              letterSpacing:"-0.03em", lineHeight:1.1,
            }}>Understand Legal Documents</span>
            <span className="hero-line2" style={{
              display:"block",
              fontFamily:"'Noto Serif', Georgia, serif",
              fontWeight:500, fontStyle:"italic",
              color:tk.gold,
              fontSize:"clamp(1.875rem, 4vw, 3.25rem)",
              letterSpacing:"-0.02em", lineHeight:1.1,
            }}>in Seconds</span>
          </h1>

          <p className="hero-sub" style={{
            fontFamily:"'Cormorant Garamond', Georgia, serif",
            color:tk.textSecondary, fontSize:"1.175rem", fontWeight:450,
            maxWidth:"380px", lineHeight:1.65,
          }}>
            No jargon. Just clear legal explanations powered by AI.
          </p>

          {/* Ghost Card */}
          <div className="hero-card" style={{
            width:"100%", marginTop:"0.875rem",
            background:tk.surface,
            backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)",
            border:`1px solid ${tk.surfaceBorder}`,
            borderRadius:"20px",
            padding:"1.875rem",
            boxShadow: tk.isDark
              ? "0 32px 80px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,220,100,.06)"
              : "0 12px 48px rgba(0,0,0,.07), inset 0 1px 0 rgba(255,255,255,.9)",
            textAlign:"left",
            display:"flex", flexDirection:"column", gap:"1rem",
          }}>

            {/* Textarea */}
            <div style={{ position:"relative" }}>
              <textarea
                value={text}
                onChange={e=>e.target.value.length<=charLimit&&setText(e.target.value)}
                rows={7}
                placeholder="Paste your legal text here…"
                style={{
                  width:"100%",
                  background:tk.inputBg,
                  border:`1px solid ${tk.inputBorder}`,
                  borderRadius:"12px",
                  padding:"0.875rem 1rem",
                  fontSize:"0.9375rem",
                  fontFamily:"'Cormorant Garamond', Georgia, serif",
                  color:tk.textPrimary,
                  resize:"none", outline:"none",
                  lineHeight:1.65, boxSizing:"border-box",
                  transition:"border-color .25s",
                }}
                onFocus={e=>e.target.style.borderColor=tk.gold}
                onBlur={e=>e.target.style.borderColor=tk.inputBorder}
              />
              <span style={{
                position:"absolute", bottom:"12px", right:"12px",
                fontFamily:"'Cormorant Garamond', Georgia, serif",
                fontSize:"0.75rem",
                color:text.length>charLimit*.9?"#f59e0b":tk.textSecondary,
                pointerEvents:"none",
              }}>{text.length}/{charLimit}</span>
            </div>

            {/* Divider */}
            <div style={{ display:"flex", alignItems:"center", gap:"0.75rem" }}>
              <div style={{ flex:1, height:"1px", background:tk.divider }}/>
              <span style={{
                fontFamily:"'Cormorant Garamond', Georgia, serif",
                fontSize:"0.8rem", color:tk.textSecondary, letterSpacing:"0.04em", fontWeight:500,
              }}>or upload a file</span>
              <div style={{ flex:1, height:"1px", background:tk.divider }}/>
            </div>

            {/* Drop zone */}
            <div
              onDragOver={e=>{e.preventDefault();setDragging(true);}}
              onDragLeave={()=>setDragging(false)}
              onDrop={handleDrop}
              onClick={()=>!fileName&&fileInputRef.current?.click()}
              style={{
                borderRadius:"12px",
                border:`2px dashed ${
                  fileName ? tk.goldBorder
                  : dragging ? tk.gold
                  : tk.inputBorder
                }`,
                padding:"1rem 1.25rem",
                display:"flex", alignItems:"center", justifyContent:"space-between", gap:"0.75rem",
                cursor:fileName?"default":"pointer",
                background: dragging ? tk.goldLight : "transparent",
                transition:"border-color .2s, background .2s",
              }}
            >
              <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx,.txt"
                style={{display:"none"}} onChange={handleFileChange}/>
              <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", minWidth:0 }}>
                <svg width="18" height="18" fill="none" stroke={tk.gold} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M12 16V4m0 0L8 8m4-4 4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"/>
                </svg>
                {fileName ? (
                  <p style={{
                    fontFamily:"'Cormorant Garamond', Georgia, serif",
                    fontSize:"0.9375rem", color:tk.textPrimary, fontWeight:500,
                    overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap",
                  }}>{fileName}</p>
                ) : (
                  <p style={{
                    fontFamily:"'Cormorant Garamond', Georgia, serif",
                    fontSize:"0.9375rem", color:tk.textSecondary, fontWeight:450,
                  }}>
                    <span style={{color:tk.textPrimary, fontWeight:600}}>Upload your PDF</span>
                    {" "}— or drag & drop
                  </p>
                )}
              </div>
              {fileName && (
                <button onClick={handleRemoveFile} style={{
                  flexShrink:0, width:"22px", height:"22px", borderRadius:"50%",
                  background:tk.goldLight, border:`1px solid ${tk.goldBorder}`,
                  color:tk.textSecondary, cursor:"pointer",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:"0.65rem", fontWeight:700, transition:"all .2s",
                }}
                  onMouseEnter={e=>{e.currentTarget.style.background="rgba(224,82,82,.15)"; e.currentTarget.style.color="#e05252";}}
                  onMouseLeave={e=>{e.currentTarget.style.background=tk.goldLight; e.currentTarget.style.color=tk.textSecondary;}}
                >✕</button>
              )}
            </div>

            <p style={{
              fontFamily:"'Cormorant Garamond', Georgia, serif",
              fontSize:"0.8rem", color:tk.textSecondary, marginTop:"-0.25rem", fontWeight:500,
            }}>Accepted: PDF, DOC, DOCX, TXT</p>

            {/* Analyse button */}
            <button onClick={handleAnalyze} disabled={!hasInput||loading} style={{
              width:"100%", padding:"0.85rem",
              borderRadius:"12px",
              fontFamily:"'Cormorant Garamond', Georgia, serif",
              fontWeight:600, fontSize:"1rem",
              letterSpacing:"0.04em", border:"none",
              cursor:hasInput&&!loading?"pointer":"not-allowed",
              opacity:!hasInput||loading?0.3:1,
              background:tk.btnBg, color:tk.btnText,
              display:"flex", alignItems:"center", justifyContent:"center", gap:"0.5rem",
              transition:"opacity .25s, transform .15s",
            }}
              onMouseEnter={e=>hasInput&&!loading&&(e.currentTarget.style.opacity="0.82")}
              onMouseLeave={e=>e.currentTarget.style.opacity=!hasInput||loading?"0.3":"1"}
            >
              {loading ? (
                <>
                  <svg style={{animation:"spin 1s linear infinite",width:"15px",height:"15px"}} fill="none" viewBox="0 0 24 24">
                    <circle style={{opacity:.25}} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path style={{opacity:.75}} fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                  Analysing…
                </>
              ) : "Analyse Document"}
            </button>
          </div>

          <p className="hero-trust" style={{
            fontFamily:"'Cormorant Garamond', Georgia, serif",
            fontSize:"0.875rem", color:tk.textSecondary, fontWeight:500,
          }}>
            Your document is never stored · Analysis happens in real time
          </p>
        </div>
      </section>

      {/* ── Waitlist Section ── */}
      <WaitlistForm />
    </main>
  );
}