import { useState, useRef } from "react";
import heroBg from "../assets/hero-bg.png";

export default function Home() {
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState(null);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) setFileName(file.name);
  };

  const handleAnalyze = () => {
    if (!text.trim() && !fileName) return;
    alert("Connect your AI handler here.");
  };

  return (
    <main className="relative min-h-screen bg-white overflow-hidden">

      {/* BG image at 40% opacity — separate layer so text stays crisp */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroBg})`,
          opacity: 0.4,
        }}
      />

      {/* Content */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16">
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center gap-5">

          {/* Headline — matches screenshot exactly: large bold serif */}
          <h1
            className="font-serif font-bold text-gray-900 leading-tight"
            style={{ fontSize: "clamp(1.2rem, 3.2vw, 2.6rem)", whiteSpace: "nowrap" }}
          >
            Understand Legal Documents in Seconds
          </h1>

          {/* Subheading — matches screenshot: small, light gray, normal weight */}
          <p className="text-gray-400 text-base font-sans font-normal">
            No jargon. Just clear legal explanations powered by AI
          </p>

          {/* Input card */}
          <div className="w-full mt-6 bg-white/85 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-sm text-left space-y-4">

            {/* Textarea */}
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={7}
              placeholder="Paste your legal text here…"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:border-gray-400 transition-colors leading-relaxed font-sans"
            />

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
              onClick={() => fileInputRef.current?.click()}
              className={`cursor-pointer rounded-xl border-2 border-dashed px-6 py-4 flex items-center justify-center gap-3 transition-colors ${
                dragging
                  ? "border-gray-400 bg-gray-50"
                  : "border-gray-200 hover:border-gray-400 hover:bg-gray-50"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                className="hidden"
                onChange={handleFileChange}
              />
              <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M12 16V4m0 0L8 8m4-4 4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
              </svg>
              {fileName ? (
                <p className="text-sm text-gray-700 font-medium">{fileName}</p>
              ) : (
                <p className="text-sm text-gray-400">
                  <span className="text-gray-700 font-medium">Upload your PDF here</span>
                  &nbsp;— or drag &amp; drop
                </p>
              )}
            </div>

            {/* CTA */}
            <button
              onClick={handleAnalyze}
              disabled={!text.trim() && !fileName}
              className="w-full py-3 bg-gray-900 hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl transition-colors"
            >
              Analyse Document
            </button>
          </div>

        </div>
      </section>
    </main>
  );
}