import { useState } from "react";
import heroBg from "../assets/hero-bg.png";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (form.name && form.email && form.message) setSent(true);
  };

  return (
    <main className="relative min-h-screen bg-white overflow-hidden">

      {/* BG at 40% opacity */}
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

          {/* Form card */}
          <div className="w-full mt-4 bg-white/85 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 shadow-sm text-left space-y-4">

            {sent ? (
              <div className="text-center py-6 space-y-2">
                <p className="font-serif text-2xl font-semibold text-gray-900">Message Sent!</p>
                <p className="text-sm text-gray-400">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <>
                {[
                  { id: "name", label: "Your Name", type: "text", placeholder: "Jane Smith" },
                  { id: "email", label: "Email Address", type: "email", placeholder: "jane@example.com" },
                ].map((f) => (
                  <div key={f.id} className="space-y-1.5">
                    <label className="text-xs text-gray-400 uppercase tracking-wide">{f.label}</label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      value={form[f.id]}
                      onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-gray-400 transition-colors"
                    />
                  </div>
                ))}

                <div className="space-y-1.5">
                  <label className="text-xs text-gray-400 uppercase tracking-wide">Message</label>
                  <textarea
                    rows={5}
                    placeholder="How can we help?"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 resize-none focus:outline-none focus:border-gray-400 transition-colors"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!form.name || !form.email || !form.message}
                  className="w-full py-3 bg-gray-900 hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl transition-colors"
                >
                  Send Message
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}