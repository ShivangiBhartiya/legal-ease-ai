import { useState } from "react";
import axios from "axios";
import { useTokens } from "../App";

export default function Waitlist() {
  const tk = useTokens();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [status, setStatus] = useState(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name || !form.email) {
      setStatus("error");
      setMsg("Name and email are required.");
      return;
    }
    setLoading(true);
    setStatus(null);
    try {
      await axios.post("http://localhost:5000/api/joinwaitlist", form);
      setStatus("success");
      setMsg("You're on the list! We'll reach out soon.");
      setForm({ name: "", email: "", phone: "" });
    } catch (err) {
      setStatus("error");
      setMsg(
        err.response?.data?.error === "Email already registered"
          ? "This email is already registered."
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "6rem 1.5rem 4rem" }}>
      <div style={{ width: "100%", maxWidth: "480px", background: tk.surface, border: `1px solid ${tk.surfaceBorder}`, borderRadius: "20px", padding: "2.5rem", boxShadow: tk.isDark ? "0 32px 80px rgba(0,0,0,.5)" : "0 12px 48px rgba(0,0,0,.07)" }}>
        <h2 style={{ fontFamily: "'Noto Serif', Georgia, serif", fontWeight: 700, fontSize: "clamp(1.5rem,4vw,2rem)", color: tk.textPrimary, letterSpacing: "-0.03em", margin: "0 0 0.375rem" }}>
          Join the Waitlist
        </h2>
        <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: tk.textSecondary, fontSize: "1.0625rem", margin: "0 0 1.75rem", lineHeight: 1.6 }}>
          Be the first to access Legal Ease AI when we launch.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            name="name"
            placeholder="Full Name *"
            value={form.name}
            onChange={handleChange}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = tk.gold)}
            onBlur={(e) => (e.target.style.borderColor = tk.inputBorder)}
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address *"
            value={form.email}
            onChange={handleChange}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = tk.gold)}
            onBlur={(e) => (e.target.style.borderColor = tk.inputBorder)}
          />
          <input
            name="phone"
            placeholder="Phone Number (optional)"
            value={form.phone}
            onChange={handleChange}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = tk.gold)}
            onBlur={(e) => (e.target.style.borderColor = tk.inputBorder)}
          />

          {status && (
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "0.9375rem", color: status === "success" ? tk.success : tk.danger, margin: 0 }}>
              {msg}
            </p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: "100%", padding: "0.875rem", borderRadius: "12px",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 600, fontSize: "1rem", letterSpacing: "0.04em",
              border: "none", cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
              background: tk.btnBg, color: tk.btnText,
              transition: "opacity .25s",
            }}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.opacity = "0.82")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = loading ? "0.6" : "1")}
          >
            {loading ? "Submitting…" : "Join Waitlist →"}
          </button>
        </div>
      </div>
    </main>
  );
}