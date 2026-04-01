import { useState, useRef } from "react";
import heroBg from "../assets/hero-bg.png";

export default function Home() {
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const charLimit = 5000;
  const hasInput = text.trim() || fileName;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setFileName(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) setFileName(file.name);
  };

  const handleAnalyze = () => {
    if (!hasInput) return;
    setLoading(true);
    // Simulate loading; replace with real AI call
    setTimeout(() => {
      setLoading(false);
      alert("Connect your AI handler here.");
    }, 2000);
  };

  return (
    <main className="relative min-h-screen bg-white overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})`, opacity: 0.4 }}
      />

      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16">
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center gap-5">

          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 bg-gray-900/5 border border-gray-200 text-gray-500 text-xs font-medium px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            AI-powered analysis
          </span>

          <h1
            className="font-serif font-bold text-gray-900 leading-tight"
            style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.6rem)" }}
          >
            Understand Legal Documents<br className="hidden sm:block" /> in Seconds
          </h1>

          <p className="text-gray-400 text-base font-sans font-normal">
            No jargon. Just clear legal explanations powered by AI
          </p>

          {/* Input card */}
          <div className="w-full mt-4 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-sm text-left space-y-4">

            {/* Textarea with char counter */}
            <div className="relative">
              <textarea
                value={text}
                onChange={(e) => e.target.value.length <= charLimit && setText(e.target.value)}
                rows={7}
                placeholder="Paste your legal text here…"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all leading-relaxed font-sans"
              />
              <span
                className={`absolute bottom-3 right-3 text-xs tabular-nums pointer-events-none ${
                  text.length > charLimit * 0.9 ? "text-amber-500" : "text-gray-300"
                }`}
              >
                {text.length}/{charLimit}
              </span>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 text-xs">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-gray-400 tracking-wide">or upload a file</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Drop zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => !fileName && fileInputRef.current?.click()}
              className={`rounded-xl border-2 border-dashed px-6 py-4 flex items-center justify-between gap-3 transition-colors ${
                fileName
                  ? "border-gray-300 bg-gray-50 cursor-default"
                  : dragging
                  ? "border-gray-500 bg-gray-50 cursor-copy"
                  : "border-gray-200 hover:border-gray-400 hover:bg-gray-50 cursor-pointer"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                className="hidden"
                onChange={handleFileChange}
              />

              <div className="flex items-center gap-3 min-w-0">
                <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M12 16V4m0 0L8 8m4-4 4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
                </svg>
                {fileName ? (
                  <p className="text-sm text-gray-700 font-medium truncate">{fileName}</p>
                ) : (
                  <p className="text-sm text-gray-400">
                    <span className="text-gray-700 font-medium">Upload your PDF here</span>
                    &nbsp;— or drag &amp; drop
                  </p>
                )}
              </div>

              {/* Remove file button */}
              {fileName && (
                <button
                  onClick={handleRemoveFile}
                  className="shrink-0 w-6 h-6 rounded-full bg-gray-200 hover:bg-red-100 hover:text-red-500 text-gray-400 flex items-center justify-center transition-colors text-xs font-bold"
                  title="Remove file"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Accepted formats hint */}
            <p className="text-xs text-gray-300 -mt-1">Accepted: PDF, DOC, DOCX, TXT</p>

            {/* CTA */}
            <button
              onClick={handleAnalyze}
              disabled={!hasInput || loading}
              className="w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2
                bg-gray-900 text-white hover:bg-gray-700
                disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Analysing…
                </>
              ) : (
                "Analyse Document"
              )}
            </button>

          </div>

          {/* Trust line */}
          <p className="text-xs text-gray-300 mt-1">
            Your document is never stored. Analysis happens in real time.
          </p>
        </div>
      </section>
    </main>
  );
}