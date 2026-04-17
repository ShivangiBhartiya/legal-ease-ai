import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTokens } from "../App";
import LogoMark from "../components/LogoMark";

const API = "/api";

export default function AuthPages() {
  const tk = useTokens();
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccessMsg("");
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setError("");
    setSuccessMsg("");
    setForm({ username: "", email: "", password: "" });
  };

  const submit = async () => {
    setError("");
    setSuccessMsg("");

    if (!form.email || !form.password) return setError("Email and password are required");
    if (mode === "register" && !form.username) return setError("Username is required");
    if (form.password.length < 6) return setError("Password must be at least 6 characters");

    setLoading(true);
    try {
      const endpoint = mode === "login" ? "/login" : "/register";
      const body = mode === "login"
        ? { email: form.email, password: form.password }
        : { username: form.username, email: form.email, password: form.password };

      const res = await fetch(`${API}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          setError("This email or username is already registered. Please login.");
          setTimeout(() => switchMode("login"), 2000);
        } else if (res.status === 401) {
          setError("Incorrect email or password");
        } else if (res.status === 403) {
          setError(data.error || "Your account is not approved yet");
        } else {
          setError(data.error || "Something went wrong, please try again");
        }
      } else if (mode === "register") {
        setSuccessMsg(`Account created! Welcome, ${data.data.username}!`);
        setTimeout(() => {
          localStorage.setItem("legal-user", JSON.stringify(data.data));
          navigate("/dashboard");
        }, 1200);
      } else {
        localStorage.setItem("legal-user", JSON.stringify(data.data));
        navigate("/dashboard");
      }
    } catch {
      setError("Could not connect to server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem 1rem",
    borderRadius: "10px",
    border: `1.5px solid ${tk.inputBorder}`,
    background: tk.inputBg,
    color: tk.textPrimary,
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: "1.0625rem",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: "0.8rem",
    fontWeight: 700,
    color: tk.textSecondary,
    letterSpacing: "0.08em",
    display: "block",
    marginBottom: "0.4rem",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "5rem 1.5rem 2rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          background: tk.surface,
          border: `1px solid ${tk.goldBorder}`,
          borderRadius: "24px",
          padding: "2.5rem 2.25rem",
          boxShadow: tk.isDark
            ? "0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,220,100,0.07)"
            : "0 24px 60px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.9)",
          backdropFilter: "blur(24px)",
          animation: "authIn 0.4s cubic-bezier(.22,1,.36,1)",
        }}
      >
        <style>{`
          @keyframes authIn { from{opacity:0;transform:translateY(20px) scale(.98)} to{opacity:1;transform:none} }
          @keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-6px)} 40%{transform:translateX(6px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)} }
          .input-field:focus { border-color: ${tk.gold} !important; box-shadow: 0 0 0 3px ${tk.goldLight} !important; }
        `}</style>

        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: tk.goldLight,
              border: `1.5px solid ${tk.goldBorder}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem",
            }}
          >
            <LogoMark size={26} isDark={tk.isDark} />
          </div>
          <h1
            style={{
              fontFamily: "'Noto Serif', Georgia, serif",
              fontSize: "1.875rem",
              fontWeight: 700,
              color: tk.textPrimary,
              letterSpacing: "-0.03em",
              margin: "0 0 0.3rem",
            }}
          >
            Legal Ease AI
          </h1>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "1rem",
              color: tk.textMuted,
              fontStyle: "italic",
              margin: 0,
            }}
          >
            {mode === "login" ? "Welcome back to your account" : "Create a new account"}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            background: tk.inputBg,
            border: `1px solid ${tk.surfaceBorder}`,
            borderRadius: "12px",
            padding: "4px",
            marginBottom: "1.75rem",
          }}
        >
          {["login", "register"].map((m) => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              style={{
                flex: 1,
                padding: "0.6rem",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "1rem",
                fontWeight: 600,
                letterSpacing: "0.04em",
                background: mode === m ? (tk.isDark ? "#c9a84c" : "#1a160c") : "transparent",
                color: mode === m ? (tk.isDark ? "#0e0e0f" : "#f9f7f4") : tk.textSecondary,
                transition: "all 0.2s",
              }}
            >
              {m === "login" ? "Login" : "Register"}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
          {mode === "register" && (
            <div>
              <label style={labelStyle}>USERNAME</label>
              <input
                className="input-field"
                name="username"
                value={form.username}
                onChange={handle}
                placeholder="choose a username"
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = tk.gold; e.target.style.boxShadow = `0 0 0 3px ${tk.goldLight}`; }}
                onBlur={(e) => { e.target.style.borderColor = tk.inputBorder; e.target.style.boxShadow = "none"; }}
              />
            </div>
          )}

          <div>
            <label style={labelStyle}>EMAIL</label>
            <input
              className="input-field"
              name="email"
              type="email"
              value={form.email}
              onChange={handle}
              placeholder="your@email.com"
              style={inputStyle}
              onFocus={(e) => { e.target.style.borderColor = tk.gold; e.target.style.boxShadow = `0 0 0 3px ${tk.goldLight}`; }}
              onBlur={(e) => { e.target.style.borderColor = tk.inputBorder; e.target.style.boxShadow = "none"; }}
            />
          </div>

          <div>
            <label style={labelStyle}>PASSWORD</label>
            <input
              className="input-field"
              name="password"
              type="password"
              value={form.password}
              onChange={handle}
              placeholder="........"
              style={inputStyle}
              onFocus={(e) => { e.target.style.borderColor = tk.gold; e.target.style.boxShadow = `0 0 0 3px ${tk.goldLight}`; }}
              onBlur={(e) => { e.target.style.borderColor = tk.inputBorder; e.target.style.boxShadow = "none"; }}
              onKeyDown={(e) => e.key === "Enter" && submit()}
            />
            {mode === "register" && (
              <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "0.8rem", color: tk.textMuted, margin: "0.35rem 0 0 0.25rem" }}>
                At least 6 characters
              </p>
            )}
          </div>

          {error && (
            <div
              style={{
                background: "rgba(224,82,82,0.1)",
                border: "1px solid rgba(224,82,82,0.35)",
                borderRadius: "10px",
                padding: "0.7rem 1rem",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "0.9375rem",
                color: "#e05252",
                animation: "shake 0.4s ease",
                lineHeight: 1.5,
              }}
            >
              {error}
              {error.includes("already registered") && (
                <span
                  onClick={() => switchMode("login")}
                  style={{ display: "block", marginTop: "0.3rem", color: tk.gold, cursor: "pointer", fontWeight: 600, fontSize: "0.875rem" }}
                >
                  Go to Login
                </span>
              )}
            </div>
          )}

          {successMsg && (
            <div
              style={{
                background: "rgba(61,168,122,0.12)",
                border: "1px solid rgba(61,168,122,0.35)",
                borderRadius: "10px",
                padding: "0.7rem 1rem",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "0.9375rem",
                color: "#3da87a",
              }}
            >
              {successMsg}
            </div>
          )}

          <button
            onClick={submit}
            disabled={loading}
            style={{
              width: "100%",
              padding: "0.9rem",
              borderRadius: "12px",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              background: loading ? tk.textMuted : (tk.isDark ? "#c9a84c" : "#1a160c"),
              color: tk.isDark ? "#0e0e0f" : "#f9f7f4",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "1.0625rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              transition: "opacity 0.2s, transform 0.15s",
              marginTop: "0.25rem",
            }}
            onMouseEnter={(e) => { if (!loading) e.currentTarget.style.opacity = "0.85"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
          >
            {loading ? "Please wait..." : mode === "login" ? "Login" : "Create Account"}
          </button>
        </div>

        <div
          style={{
            height: "1px",
            background: `linear-gradient(90deg, transparent, ${tk.gold}, transparent)`,
            margin: "1.75rem 0",
          }}
        />

        <p
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "0.9375rem",
            color: tk.textMuted,
            textAlign: "center",
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          {mode === "login" ? "Don't have an account? " : "Already have an account? "}
          <span
            onClick={() => switchMode(mode === "login" ? "register" : "login")}
            style={{ color: tk.gold, cursor: "pointer", fontWeight: 600 }}
          >
            {mode === "login" ? "Register here" : "Login here"}
          </span>
        </p>
      </div>
    </div>
  );
}
