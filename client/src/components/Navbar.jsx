import { useState, useEffect } from 'react';

const links = [
  { label: 'Home',    href: '#home' },
  { label: 'Features',href: '#features' },
  { label: 'About',   href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      padding: scrolled ? '0.75rem 0' : '1.25rem 0',
      background: scrolled ? 'rgba(10,10,15,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      transition: 'all 0.35s ease',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{
            width: 36, height: 36, borderRadius: '10px',
            background: 'var(--gradient)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            fontWeight: 900, fontSize: '0.9rem', color: 'var(--bg)',
          }}>⚖</div>
          <span style={{ fontWeight: 800, fontSize: '1.15rem', letterSpacing: '-0.03em' }}>
            Legal<span style={{ color: 'var(--accent)' }}>Ease</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '2.5rem',
        }} className="nav-desktop">
          {links.map((l) => (
            <a key={l.label} href={l.href} style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'var(--text-muted)', transition: 'color 0.3s',
            }}
              onMouseEnter={(e) => e.target.style.color = 'var(--accent)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
            >
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn btn-solid" style={{ padding: '0.65rem 1.6rem', fontSize: '0.68rem' }}>
            Get Started ↗
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="nav-toggle"
          style={{
            display: 'none', background: 'none', border: 'none',
            color: 'var(--white)', fontSize: '1.5rem', padding: '0.25rem',
          }}
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: 'rgba(10,10,15,0.95)', backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border)', padding: '1.5rem 2rem',
          display: 'flex', flexDirection: 'column', gap: '1.25rem',
        }}>
          {links.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)} style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'var(--text-muted)',
            }}>
              {l.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-toggle  { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
