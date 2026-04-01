import heroBg from "../assets/hero-bg.png";

const stats = [
  { value: "10k+", label: "Documents Analyzed", icon: "📄" },
  { value: "98%", label: "Accuracy Rate", icon: "✅" },
  { value: "< 5s", label: "Avg. Analysis Time", icon: "⚡" },
];

const problemItems = [
  "Rent agreements written to protect landlords",
  "Internship offers with buried non-compete clauses",
  "T&Cs that sign away your IP by default",
];

export default function About() {
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
            About Us
          </h1>

          <p className="text-gray-400 text-base font-sans font-normal">
            Built for people who don't have lawyers
          </p>

          {/* Stats row — pulled out of the card, given prominence */}
          <div className="w-full grid grid-cols-3 gap-3 mt-2">
            {stats.map((s) => (
              <div key={s.label} className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-4 text-center shadow-sm">
                <span className="text-xl mb-1 block">{s.icon}</span>
                <p className="font-serif text-2xl font-bold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-400 uppercase tracking-wide mt-1 leading-tight">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Content card */}
          <div className="w-full bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-sm text-left overflow-hidden">

            {/* The Problem */}
            <div className="p-8 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-5 rounded-full bg-red-400 block" />
                <h2 className="font-serif text-xl font-semibold text-gray-900">The Problem</h2>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Most students and first-jobbers sign documents they've never truly understood.
                Without a lawyer, you're signing blind.
              </p>
              <ul className="space-y-2">
                {problemItems.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-500">
                    <svg className="w-4 h-4 text-red-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="h-px bg-gray-100" />

            {/* Our Fix */}
            <div className="p-8 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-5 rounded-full bg-emerald-400 block" />
                <h2 className="font-serif text-xl font-semibold text-gray-900">Our Fix</h2>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Legal case uses AI to translate legalese into plain English, flag risky clauses,
                tell you what you're actually agreeing to, and suggest what to negotiate — in seconds.
              </p>
              <ul className="space-y-2">
                {[
                  "Plain-English summaries of every clause",
                  "Risk flags with severity levels",
                  "Negotiation suggestions you can actually use",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-500">
                    <svg className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* CTA nudge */}
          <a
            href="/"
            className="mt-2 text-sm text-gray-900 font-semibold underline underline-offset-4 hover:text-gray-600 transition-colors"
          >
            Try it free — no account needed →
          </a>
        </div>
      </section>
    </main>
  );
}