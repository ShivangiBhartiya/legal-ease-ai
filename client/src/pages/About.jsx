import heroBg from "../assets/hero-bg.png";

export default function About() {
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
            About Us
          </h1>

          <p className="text-gray-400 text-base font-sans font-normal">
            Built for people who don't have lawyers
          </p>

          {/* Content card */}
          <div className="w-full mt-4 bg-white/85 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 shadow-sm text-left space-y-8">

            <div className="space-y-2">
              <h2 className="font-serif text-xl font-semibold text-gray-900">The Problem</h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                Most students and first-jobbers sign documents they've never truly understood.
                Rent agreements, internship offers, T&Cs — they're written to protect one side.
                Without a lawyer, you're signing blind.
              </p>
            </div>

            <div className="h-px bg-gray-100" />

            <div className="space-y-2">
              <h2 className="font-serif text-xl font-semibold text-gray-900">Our Fix</h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                Legal case uses AI to translate legalese into plain English, flag risky clauses,
                tell you what you're actually agreeing to, and suggest what to negotiate — in seconds.
              </p>
            </div>

            <div className="h-px bg-gray-100" />

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { value: "10k+", label: "Documents Analyzed" },
                { value: "98%", label: "Accuracy Rate" },
                { value: "< 5s", label: "Avg. Analysis Time" },
              ].map((s) => (
                <div key={s.label} className="space-y-1">
                  <p className="font-serif text-2xl font-bold text-gray-900">{s.value}</p>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">{s.label}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}