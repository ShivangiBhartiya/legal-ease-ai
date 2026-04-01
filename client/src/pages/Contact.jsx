import { useState } from "react";
import heroBg from "../assets/hero-bg.png";

const ENQUIRY_TYPES = ["General Question", "Partnership", "Bug Report", "Feedback"];

function FieldError({ message }) {
  if (!message) return null;
  return <p className="text-xs text-red-400 mt-1">{message}</p>;
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", enquiry: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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
    // Replace with real submission
    setTimeout(() => { setSubmitting(false); setSent(true); }, 1500);
  };

  const inputBase =
    "w-full bg-gray-50 border rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all";

  return (
    <main className="relative min-h-screen bg-white overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})`, opacity: 0.4 }}
      />

      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16">
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center gap-5">

          <h1
            className="font-serif font-bold text-gray-900 leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Contact
          </h1>

          <p className="text-gray-400 text-base font-sans font-normal">
            Questions, feedback, or partnership enquiries — we read everything
          </p>

          <div className="w-full mt-4 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 shadow-sm text-left space-y-5">

            {sent ? (
              <div className="text-center py-8 space-y-3">
                {/* Success checkmark */}
                <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto">
                  <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-serif text-2xl font-semibold text-gray-900">Message Sent!</p>
                <p className="text-sm text-gray-400">We'll get back to you within 24 hours.</p>
                <button
                  onClick={() => { setSent(false); setForm({ name: "", email: "", enquiry: "", message: "" }); }}
                  className="mt-4 text-xs text-gray-400 hover:text-gray-600 underline underline-offset-2 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-400 uppercase tracking-wide">Your Name</label>
                    <input
                      type="text"
                      placeholder="Jane Smith"
                      value={form.name}
                      onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: "" }); }}
                      className={`${inputBase} ${errors.name ? "border-red-300" : "border-gray-200"}`}
                    />
                    <FieldError message={errors.name} />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-400 uppercase tracking-wide">Email Address</label>
                    <input
                      type="email"
                      placeholder="jane@example.com"
                      value={form.email}
                      onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: "" }); }}
                      className={`${inputBase} ${errors.email ? "border-red-300" : "border-gray-200"}`}
                    />
                    <FieldError message={errors.email} />
                  </div>
                </div>

                {/* Enquiry type */}
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-400 uppercase tracking-wide">Enquiry Type <span className="text-gray-300">(optional)</span></label>
                  <div className="flex flex-wrap gap-2">
                    {ENQUIRY_TYPES.map((type) => (
                      <button
                        key={type}
                        onClick={() => setForm({ ...form, enquiry: form.enquiry === type ? "" : type })}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                          form.enquiry === type
                            ? "bg-gray-900 text-white border-gray-900"
                            : "bg-gray-50 text-gray-500 border-gray-200 hover:border-gray-400"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-400 uppercase tracking-wide">Message</label>
                  <textarea
                    rows={5}
                    placeholder="How can we help?"
                    value={form.message}
                    onChange={(e) => { setForm({ ...form, message: e.target.value }); setErrors({ ...errors, message: "" }); }}
                    className={`${inputBase} resize-none ${errors.message ? "border-red-300" : "border-gray-200"}`}
                  />
                  <FieldError message={errors.message} />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="w-full py-3 bg-gray-900 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}