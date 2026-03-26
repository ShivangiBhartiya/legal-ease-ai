import AnimBlock from './Animblock';

const cols = [
  {
    title: 'Product',
    items: ['Features', 'Pricing', 'Integrations', 'Changelog'],
  },
  {
    title: 'Company',
    items: ['About', 'Careers', 'Blog', 'Press'],
  },
  {
    title: 'Resources',
    items: ['Documentation', 'Support', 'Privacy', 'Terms'],
  },
];

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      background: 'var(--bg)',
      padding: '4rem 0 2rem',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
        <AnimBlock>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr repeat(3, 1fr)',
            gap: '3rem',
            marginBottom: '3rem',
          }} className="footer-grid">
            {/* Brand column */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '8px',
                  background: 'var(--gradient)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontWeight: 900, fontSize: '0.8rem', color: 'var(--bg)',
                }}>⚖</div>
                <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>
                  Legal<span style={{ color: 'var(--accent)' }}>Ease</span>
                </span>
              </div>
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
                color: 'var(--text-muted)', lineHeight: 1.9,
                maxWidth: 280,
              }}>
                AI-powered legal assistance that simplifies complex legal documents, contracts, and compliance for everyone.
              </p>
            </div>

            {/* Link columns */}
            {cols.map((col) => (
              <div key={col.title}>
                <h4 style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                  letterSpacing: '0.15em', textTransform: 'uppercase',
                  color: 'var(--accent)', marginBottom: '1.25rem',
                }}>{col.title}</h4>
                <ul style={{ listStyle: 'none' }}>
                  {col.items.map((item) => (
                    <li key={item} style={{ marginBottom: '0.65rem' }}>
                      <a href="#" style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
                        color: 'var(--text-muted)', transition: 'color 0.3s',
                      }}
                        onMouseEnter={(e) => e.target.style.color = 'var(--white)'}
                        onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
                      >{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </AnimBlock>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid var(--border)',
          paddingTop: '1.5rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '1rem',
        }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-dim)' }}>
            © 2026 LegalEase AI. All rights reserved.
          </span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Twitter', 'LinkedIn', 'GitHub'].map((s) => (
              <a key={s} href="#" style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-dim)',
              }}>{s}</a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
