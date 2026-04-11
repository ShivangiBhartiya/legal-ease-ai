import { useState } from "react";
import { useTheme } from "../App";

const ENQUIRY_TYPES = ["General Question", "Partnership", "Bug Report", "Feedback"];

function FieldError({ message }) {
  if (!message) return null;
  return <p style={{ fontSize: "0.7rem", color: "#f87171", marginTop: "4px" }}>{message}</p>;
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", enquiry: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // ── Theme tokens ───────────────────────────────────
  const cardBg = isDark ? "rgba(20,20,22,0.82)" : "rgba(255,255,255,0.88)";
  const cardBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const textMain = isDark ? "#f0f0f0" : "#111111";
  const textSub = isDark ? "rgba(255,255,255,0.38)" : "rgba(0,0,0,0.38)";
  const textMuted = isDark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.22)";
  const labelColor = isDark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.28)";
  const inputBg = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.025)";
  const inputBorder = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const inputText = isDark ? "#e8e8e8" : "#1a1a1a";
  const btnBg = isDark ? "#f0f0f0" : "#111111";
  const btnText = isDark ? "#111111" : "#f0f0f0";

  const inputStyle = (hasError) => ({
    width: "100%",
    background: inputBg,
    border: `1px solid ${hasError ? "rgba(248,113,113,0.5)" : inputBorder}`,
    borderRadius: "12px",
    padding: "0.75rem 1rem",
    fontSize: "0.875rem",
    color: inputText,
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box",
    transition: "border-color 0.25s, background 0.4s",
  });

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({});
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSent(true); }, 1500);
  };

  return (
    <main style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      <section style={{
        position: "relative",
        zIndex: 1,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "6rem 1.5rem 4rem",
      }}>
        <div style={{
          width: "100%",
          maxWidth: "640px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "1.25rem",
        }}>

          <h1 style={{
            fontFamily: "Georgia, serif",
            fontWeight: 700,
            color: textMain,
            lineHeight: 1.15,
            fontSize: "clamp(2rem, 4vw, 3rem)",
            letterSpacing: "-0.025em",
            transition: "color 0.4s ease",
          }}>
            Contact
          </h1>

          <p style={{
            color: textSub,
            fontSize: "0.9375rem",
            maxWidth: "380px",
            lineHeight: 1.6,
          }}>
            Questions, feedback, or partnership enquiries — we read everything
          </p>

          {/* Form card */}
          <div style={{
            width: "100%",
            background: cardBg,
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: `1px solid ${cardBorder}`,
            borderRadius: "20px",
            padding: "2rem",
            boxShadow: isDark ? "0 24px 64px rgba(0,0,0,0.4)" : "0 8px 40px rgba(0,0,0,0.06)",
            textAlign: "left",
            transition: "background 0.4s ease",
          }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "2.5rem 0", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: isDark ? "rgba(52,211,153,0.1)" : "rgba(16,185,129,0.08)",
                  border: "1px solid rgba(52,211,153,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <svg width="20" height="20" fill="none" stroke="#34d399" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p style={{ fontFamily: "Georgia, serif", fontSize: "1.5rem", fontWeight: 600, color: textMain }}>
                  Message Sent!
                </p>
                <p style={{ fontSize: "0.875rem", color: textSub }}>
                  We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: "", email: "", enquiry: "", message: "" }); }}
                  style={{
                    marginTop: "0.5rem",
                    fontSize: "0.75rem",
                    color: textMuted,
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textDecoration: "underline",
                    textUnderlineOffset: "3px",
                    padding: 0,
                  }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.125rem" }}>
                {/* Name + Email row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}
                  className="contact-grid"
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                    <label style={{ fontSize: "0.675rem", color: labelColor, textTransform: "uppercase", letterSpacing: "0.07em" }}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={form.name}
                      onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: "" }); }}
                      style={inputStyle(errors.name)}
                      onFocus={(e) => (e.target.style.borderColor = isDark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.28)")}
                      onBlur={(e) => (e.target.style.borderColor = errors.name ? "rgba(248,113,113,0.5)" : inputBorder)}
                    />
                    <FieldError message={errors.name} />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                    <label style={{ fontSize: "0.675rem", color: labelColor, textTransform: "uppercase", letterSpacing: "0.07em" }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="Your Email"
                      value={form.email}
                      onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: "" }); }}
                      style={inputStyle(errors.email)}
                      onFocus={(e) => (e.target.style.borderColor = isDark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.28)")}
                      onBlur={(e) => (e.target.style.borderColor = errors.email ? "rgba(248,113,113,0.5)" : inputBorder)}
                    />
                    <FieldError message={errors.email} />
                  </div>
                </div>

                {/* Enquiry type */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <label style={{ fontSize: "0.675rem", color: labelColor, textTransform: "uppercase", letterSpacing: "0.07em" }}>
                    Enquiry Type <span style={{ color: textMuted, textTransform: "none", letterSpacing: 0 }}>(optional)</span>
                  </label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {ENQUIRY_TYPES.map((type) => (
                      <button
                        key={type}
                        onClick={() => setForm({ ...form, enquiry: form.enquiry === type ? "" : type })}
                        style={{
                          fontSize: "0.75rem",
                          padding: "0.375rem 0.875rem",
                          borderRadius: "8px",
                          border: `1px solid ${
                            form.enquiry === type
                              ? (isDark ? "rgba(240,240,240,0.3)" : "rgba(17,17,17,0.3)")
                              : inputBorder
                          }`,
                          background: form.enquiry === type
                            ? (isDark ? "rgba(240,240,240,0.1)" : "rgba(17,17,17,0.06)")
                            : inputBg,
                          color: form.enquiry === type ? textMain : labelColor,
                          cursor: "pointer",
                          transition: "all 0.2s",
                          fontWeight: form.enquiry === type ? 600 : 400,
                        }}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                  <label style={{ fontSize: "0.675rem", color: labelColor, textTransform: "uppercase", letterSpacing: "0.07em" }}>
                    Message
                  </label>
                  <textarea
                    rows={5}
                    placeholder="How can we help?"
                    value={form.message}
                    onChange={(e) => { setForm({ ...form, message: e.target.value }); setErrors({ ...errors, message: "" }); }}
                    style={{
                      ...inputStyle(errors.message),
                      resize: "none",
                      lineHeight: 1.65,
                    }}
                    onFocus={(e) => (e.target.style.borderColor = isDark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.28)")}
                    onBlur={(e) => (e.target.style.borderColor = errors.message ? "rgba(248,113,113,0.5)" : inputBorder)}
                  />
                  <FieldError message={errors.message} />
                </div>

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  style={{
                    width: "100%",
                    padding: "0.8rem",
                    borderRadius: "12px",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    letterSpacing: "0.015em",
                    border: "none",
                    cursor: submitting ? "not-allowed" : "pointer",
                    opacity: submitting ? 0.5 : 1,
                    background: btnBg,
                    color: btnText,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    transition: "opacity 0.25s",
                  }}
                  onMouseEnter={(e) => !submitting && (e.currentTarget.style.opacity = "0.8")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = submitting ? "0.5" : "1")}
                >
                  {submitting ? (
                    <>
                      <svg style={{ animation: "spin 1s linear infinite", width: "15px", height: "15px" }} fill="none" viewBox="0 0 24 24">
                        <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 520px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}