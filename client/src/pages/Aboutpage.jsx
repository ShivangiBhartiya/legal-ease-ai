import AnimBlock from '../components/Animblock';

const TEAM = [
  { name: 'Priya Sharma', role: 'CEO & Founder', desc: 'Former legal counsel with 15 years of experience in corporate law.' },
  { name: 'Arjun Patel',  role: 'CTO',           desc: 'AI researcher specializing in NLP and legal-tech innovation.' },
  { name: 'Maya Chen',    role: 'Head of Legal',  desc: 'Harvard Law graduate focused on making law accessible to all.' },
];

const VALUES = [
  { icon: '🎯', title: 'Accuracy',    desc: 'Every analysis is verified against multiple legal databases.' },
  { icon: '🤝', title: 'Trust',       desc: 'We handle your data with the highest security standards.' },
  { icon: '💡', title: 'Innovation',  desc: 'We push boundaries to deliver cutting-edge solutions.' },
  { icon: '🌍', title: 'Access',      desc: 'Making legal understanding available to everyone, everywhere.' },
];

export default function Aboutpage() {
  return (
    <div style={{ paddingTop: '6rem' }}>
      {/* Header */}
      <section className="section" style={{ textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 2rem' }}>
          <AnimBlock>
            <span className="tag">// Our Story</span>
            <h1 className="heading-xl" style={{ marginBottom: '1.5rem' }}>
              About <span className="text-gradient">LegalEase</span>
            </h1>
          </AnimBlock>
          <AnimBlock delay={0.1}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 2, maxWidth: 600, margin: '0 auto' }}>
              We're a team of lawyers, engineers, and designers who believe that understanding law should be simple, fast, and accessible to everyone.
            </p>
          </AnimBlock>
        </div>
      </section>

      {/* Mission */}
      <section style={{ background: 'var(--bg-card)', padding: '5rem 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="about-mission-grid">
            <AnimBlock>
              <span className="tag">// Mission</span>
              <h2 className="heading-lg" style={{ marginBottom: '1.5rem' }}>
                Democratizing<br />
                <span className="text-outline">Legal Knowledge</span>
              </h2>
            </AnimBlock>
            <AnimBlock delay={0.15}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 2 }}>
                Legal complexity shouldn't be a barrier to justice. Our AI-powered platform breaks down legal jargon, identifies risks, and empowers individuals and businesses to make informed decisions without expensive legal consultations for routine matters.
              </p>
            </AnimBlock>
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) {
            .about-mission-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* Values */}
      <section className="section">
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <AnimBlock>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <span className="tag">// Our Values</span>
              <h2 className="heading-lg">What Drives <span className="text-gradient">Us</span></h2>
            </div>
          </AnimBlock>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }} className="values-grid">
            {VALUES.map((v, i) => (
              <AnimBlock key={i} delay={i * 0.08}>
                <div className="card" style={{ textAlign: 'center', height: '100%' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{v.icon}</div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{v.title}</h3>
                  <p className="mono" style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>{v.desc}</p>
                </div>
              </AnimBlock>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) {
            .values-grid { grid-template-columns: 1fr 1fr !important; }
          }
          @media (max-width: 500px) {
            .values-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* Team */}
      <section style={{ background: 'var(--bg-card)', padding: '5rem 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <AnimBlock>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <span className="tag">// Our Team</span>
              <h2 className="heading-lg">Meet the <span className="text-gradient">Team</span></h2>
            </div>
          </AnimBlock>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="team-grid">
            {TEAM.map((t, i) => (
              <AnimBlock key={i} delay={i * 0.1}>
                <div className="card" style={{ textAlign: 'center' }}>
                  <div style={{
                    width: 72, height: 72, borderRadius: '50%',
                    background: 'var(--gradient)', margin: '0 auto 1.25rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.5rem', fontWeight: 900, color: 'var(--bg)',
                  }}>{t.name[0]}</div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.25rem' }}>{t.name}</h3>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>{t.role}</div>
                  <p className="mono" style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>{t.desc}</p>
                </div>
              </AnimBlock>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) {
            .team-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>
    </div>
  );
}
