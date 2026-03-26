import AnimBlock from '../components/Animblock';

const FEATURES = [
  { icon: '📄', title: 'Document Analysis',   desc: 'Upload contracts and legal documents for instant AI-powered analysis, risk identification, and plain-language summaries.' },
  { icon: '⚡', title: 'Instant Answers',      desc: 'Ask questions in natural language and get accurate legal insights within seconds, backed by comprehensive legal databases.' },
  { icon: '🔒', title: 'Privacy First',        desc: 'Enterprise-grade encryption ensures your sensitive legal documents remain confidential and protected at all times.' },
  { icon: '📋', title: 'Contract Review',      desc: 'Automated clause-by-clause review highlights risks, unusual terms, and suggests improvements before you sign.' },
  { icon: '🤖', title: 'Smart Compliance',     desc: 'Stay ahead of regulatory changes with real-time compliance monitoring and automated alerts for your industry.' },
  { icon: '📊', title: 'Legal Analytics',      desc: 'Track case trends, monitor deadlines, and generate insights to make smarter legal decisions for your organization.' },
];

const STATS = [
  { value: '50K+', label: 'Documents Analyzed' },
  { value: '99.2%', label: 'Accuracy Rate' },
  { value: '3.5s', label: 'Avg Response Time' },
  { value: '2K+', label: 'Happy Clients' },
];

export default function Homepage() {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────── */}
      <section id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Background orbs */}
        <div className="glow-orb" style={{ width: 500, height: 500, top: '-10%', right: '-5%', background: 'var(--accent)' }} />
        <div className="glow-orb" style={{ width: 350, height: 350, bottom: '10%', left: '-8%', background: '#a855f7' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1, width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center' }} className="hero-grid">
            <div>
              <AnimBlock>
                <span className="tag">// AI-Powered Legal Assistant</span>
              </AnimBlock>
              <AnimBlock delay={0.1}>
                <h1 className="heading-xl" style={{ marginBottom: '1.5rem' }}>
                  Legal Made<br />
                  <span className="text-gradient">Simple.</span>
                </h1>
              </AnimBlock>
              <AnimBlock delay={0.2}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 2, maxWidth: 520, marginBottom: '2.5rem' }}>
                  Navigate complex legal landscapes with confidence. Our AI analyzes documents, answers questions, and provides actionable insights — faster than traditional methods.
                </p>
              </AnimBlock>
              <AnimBlock delay={0.3}>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <a href="#features" className="btn btn-solid" data-cursor>Start Free Trial ↗</a>
                  <a href="#about" className="btn" data-cursor>Watch Demo</a>
                </div>
              </AnimBlock>
            </div>

            {/* Hero visual */}
            <AnimBlock delay={0.3}>
              <div style={{
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)', padding: '2rem',
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute', top: -1, left: 30, right: 30, height: 2,
                  background: 'var(--gradient)',
                }} />
                {/* Fake terminal */}
                <div style={{ display: 'flex', gap: 6, marginBottom: '1.5rem' }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' }} />
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', lineHeight: 2.2 }}>
                  <div style={{ color: 'var(--text-dim)' }}>$ legalease analyze contract.pdf</div>
                  <div style={{ color: 'var(--accent)' }}>✓ Document parsed (142 clauses)</div>
                  <div style={{ color: 'var(--accent2)' }}>✓ 3 high-risk clauses identified</div>
                  <div style={{ color: '#ffbd2e' }}>⚠ Non-compete scope: 36 months</div>
                  <div style={{ color: 'var(--accent)' }}>✓ Plain-language summary ready</div>
                  <div style={{ color: 'var(--text-dim)', marginTop: '0.5rem' }}>
                    &gt; <span style={{ color: 'var(--white)' }}>Risk Score: </span>
                    <span style={{ color: 'var(--accent2)', fontWeight: 700 }}>7.2 / 10</span>
                  </div>
                </div>
              </div>
            </AnimBlock>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .hero-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ── Stats Bar ──────────────────────────────────── */}
      <section style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '3rem 2rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', textAlign: 'center' }} className="stats-grid">
          {STATS.map((s, i) => (
            <AnimBlock key={i} delay={i * 0.1}>
              <div>
                <div style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 900, letterSpacing: '-0.03em' }} className="text-gradient">{s.value}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: '0.35rem' }}>{s.label}</div>
              </div>
            </AnimBlock>
          ))}
        </div>
        <style>{`
          @media (max-width: 600px) {
            .stats-grid { grid-template-columns: 1fr 1fr !important; }
          }
        `}</style>
      </section>

      {/* ── Features ───────────────────────────────────── */}
      <section id="features" className="section">
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <AnimBlock>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span className="tag">// What We Offer</span>
              <h2 className="heading-lg">
                Powerful <span className="text-gradient">Features</span>
              </h2>
            </div>
          </AnimBlock>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="features-grid">
            {FEATURES.map((f, i) => (
              <AnimBlock key={i} delay={i * 0.08}>
                <div className="card" style={{ height: '100%' }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: '12px',
                    background: 'var(--surface)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.4rem', marginBottom: '1.25rem',
                  }}>{f.icon}</div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.6rem', letterSpacing: '-0.01em' }}>{f.title}</h3>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.9 }}>{f.desc}</p>
                </div>
              </AnimBlock>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .features-grid { grid-template-columns: 1fr 1fr !important; }
          }
          @media (max-width: 560px) {
            .features-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ── About ──────────────────────────────────────── */}
      <section id="about" className="section" style={{ background: 'var(--bg-card)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }} className="about-grid">
            <AnimBlock>
              <div style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)', padding: '2.5rem',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', top: 0, right: 0, width: 200, height: 200,
                  background: 'radial-gradient(circle, var(--accent-glow), transparent)',
                  filter: 'blur(60px)', opacity: 0.4,
                }} />
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 2.2, position: 'relative' }}>
                  <div style={{ color: 'var(--text-dim)', marginBottom: '0.5rem' }}>{'// How it works'}</div>
                  <div><span style={{ color: 'var(--accent)' }}>01.</span> Upload your legal document</div>
                  <div><span style={{ color: 'var(--accent)' }}>02.</span> AI analyzes every clause</div>
                  <div><span style={{ color: 'var(--accent)' }}>03.</span> Get risk scores & summaries</div>
                  <div><span style={{ color: 'var(--accent)' }}>04.</span> Ask follow-up questions</div>
                  <div><span style={{ color: 'var(--accent)' }}>05.</span> Export actionable report</div>
                  <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(108,99,255,0.08)', border: '1px solid rgba(108,99,255,0.2)', borderRadius: '8px' }}>
                    <span style={{ color: 'var(--accent2)' }}>✓</span> Average time saved: <span style={{ color: 'var(--white)', fontWeight: 600 }}>12 hours per document</span>
                  </div>
                </div>
              </div>
            </AnimBlock>

            <div>
              <AnimBlock delay={0.1}>
                <span className="tag">// About Us</span>
                <h2 className="heading-lg" style={{ marginBottom: '1.5rem' }}>
                  Built for the<br />
                  <span className="text-gradient">Modern Era</span>
                </h2>
              </AnimBlock>
              <AnimBlock delay={0.2}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 2, marginBottom: '1.5rem' }}>
                  LegalEase AI was founded on a simple idea: legal understanding shouldn't require a law degree. We combine cutting-edge artificial intelligence with decades of legal expertise to make law accessible to everyone.
                </p>
              </AnimBlock>
              <AnimBlock delay={0.3}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 2, marginBottom: '2rem' }}>
                  Our models are trained on millions of legal documents and continuously updated with the latest regulations, ensuring accuracy and relevance in every analysis.
                </p>
              </AnimBlock>
              <AnimBlock delay={0.35}>
                <a href="#contact" className="btn btn-solid" data-cursor>Learn More ↗</a>
              </AnimBlock>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) {
            .about-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ── CTA ────────────────────────────────────────── */}
      <section className="section">
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 2rem', textAlign: 'center' }}>
          <AnimBlock>
            <span className="tag">// Ready?</span>
            <h2 className="heading-lg" style={{ marginBottom: '1.25rem' }}>
              Start Using <span className="text-gradient">LegalEase</span> Today
            </h2>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 2, marginBottom: '2.5rem', maxWidth: 540, margin: '0 auto 2.5rem' }}>
              Join thousands of professionals who trust LegalEase AI to simplify their legal workflows and reduce risk.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#contact" className="btn btn-solid" data-cursor>Get Started Free ↗</a>
              <a href="#features" className="btn" data-cursor>View Features</a>
            </div>
          </AnimBlock>
        </div>
      </section>
    </>
  );
}