import { useState } from "react";
import axios from "axios";
import { useTokens } from "../App";

const API_URL = "http://localhost:5000/api/joinwaitlist";

export default function WaitlistForm() {
  const tk = useTokens();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [status, setStatus] = useState(null); // null | "loading" | "success" | "error"
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone } = form;
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setStatus("error");
      setMessage("Please fill in all fields.");
      return;
    }
    setStatus("loading");
    setMessage("");
    try {
      const res = await axios.post(API_URL, { name, email, phone });
      setStatus("success");
      setMessage(res.data.message || "You've been added to the waitlist!");
      setForm({ name: "", email: "", phone: "" });
    } catch (err) {
      setStatus("error");
      setMessage(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
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
    transition: "border-color 0.25s",
  };

  const labelStyle = {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: "0.8rem",
    fontWeight: 600,
    color: tk.textSecondary,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    marginBottom: "0.375rem",
    display: "block",
  };

  return (
    <section
      id="waitlist"
      style={{
        position: "relative",
        zIndex: 1,
        padding: "5rem 1.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Section heading */}
      <div style={{ textAlign: "center", marginBottom: "2.5rem", maxWidth: "520px" }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.375rem",
            background: tk.goldLight,
            border: `1px solid ${tk.goldBorder}`,
            color: tk.gold,
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "0.72rem",
            fontWeight: 600,
            padding: "0.28rem 0.9rem",
            borderRadius: "999px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: tk.gold,
              display: "inline-block",
            }}
          />
          Early Access
        </span>

        <h2
          style={{
            fontFamily: "'Noto Serif', Georgia, serif",
            fontWeight: 700,
            fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
            color: tk.textPrimary,
            letterSpacing: "-0.03em",
            margin: "0 0 0.75rem",
          }}
        >
          Join the{" "}
          <span style={{ color: tk.gold, fontStyle: "italic" }}>Waitlist</span>
        </h2>

        <p
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            color: tk.textSecondary,
            fontSize: "1.0625rem",
            fontWeight: 400,
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          Be the first to access advanced AI-powered legal analysis. We'll notify you when we're ready.
        </p>
      </div>

      {/* Card */}
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          background: tk.surface,
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: `1px solid ${tk.surfaceBorder}`,
          borderRadius: "20px",
          padding: "2rem",
          boxShadow: tk.isDark
            ? "0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,220,100,0.06)"
            : "0 12px 48px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
        }}
      >
        <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
          {/* Name */}
          <div>
            <label htmlFor="wl-name" style={labelStyle}>Full Name</label>
            <input
              id="wl-name"
              name="name"
              type="text"
              placeholder="Jane Smith"
              value={form.name}
              onChange={handleChange}
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = tk.gold)}
              onBlur={(e) => (e.target.style.borderColor = tk.inputBorder)}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="wl-email" style={labelStyle}>Email Address</label>
            <input
              id="wl-email"
              name="email"
              type="email"
              placeholder="jane@example.com"
              value={form.email}
              onChange={handleChange}
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = tk.gold)}
              onBlur={(e) => (e.target.style.borderColor = tk.inputBorder)}
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="wl-phone" style={labelStyle}>Phone Number</label>
            <input
              id="wl-phone"
              name="phone"
              type="tel"
              placeholder="+91 98765 43210"
              value={form.phone}
              onChange={handleChange}
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = tk.gold)}
              onBlur={(e) => (e.target.style.borderColor = tk.inputBorder)}
            />
          </div>

          {/* Status message */}
          {status === "success" && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "rgba(61,168,122,0.12)",
                border: "1px solid rgba(61,168,122,0.3)",
                borderRadius: "10px",
                padding: "0.75rem 1rem",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "0.9375rem",
                color: tk.success,
                fontWeight: 600,
              }}
            >
              ✓ {message}
            </div>
          )}

          {status === "error" && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "rgba(224,82,82,0.10)",
                border: "1px solid rgba(224,82,82,0.28)",
                borderRadius: "10px",
                padding: "0.75rem 1rem",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "0.9375rem",
                color: tk.danger,
                fontWeight: 600,
              }}
            >
              ✕ {message}
            </div>
          )}

          {/* Submit */}
          <button
            id="waitlist-submit"
            type="submit"
            disabled={status === "loading"}
            style={{
              width: "100%",
              padding: "0.875rem",
              borderRadius: "12px",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 600,
              fontSize: "1rem",
              letterSpacing: "0.05em",
              border: "none",
              cursor: status === "loading" ? "not-allowed" : "pointer",
              opacity: status === "loading" ? 0.65 : 1,
              background: tk.btnBg,
              color: tk.btnText,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              transition: "opacity 0.25s, transform 0.15s",
            }}
            onMouseEnter={(e) => {
              if (status !== "loading") e.currentTarget.style.opacity = "0.82";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = status === "loading" ? "0.65" : "1";
            }}
          >
            {status === "loading" ? (
              <>
                <svg
                  style={{ animation: "spin 1s linear infinite", width: "15px", height: "15px" }}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Joining…
              </>
            ) : (
              "Join Waitlist →"
            )}
          </button>
        </form>

        <p
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "0.8rem",
            color: tk.textMuted,
            textAlign: "center",
            marginTop: "1rem",
            fontWeight: 500,
          }}
        >
          No spam. Unsubscribe any time.
        </p>
      </div>
    </section>
  );
}
