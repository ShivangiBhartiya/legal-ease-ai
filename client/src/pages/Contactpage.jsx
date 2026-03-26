import { useState } from 'react';
import AnimBlock from '../components/Animblock';

const CONTACTS = [
  { label: 'Email',    val: 'hello@legalease.ai', icon: '@'  },
  { label: 'Location', val: 'New Delhi, India',    icon: '◎'  },
  { label: 'LinkedIn', val: '/in/legalease',       icon: 'in' },
  { label: 'GitHub',   val: '@legalease-ai',       icon: '<>' },
];

export default function Contactpage() {
  const [form, setForm]   = useState({ name: '', email: '', subject: '', msg: '' });
  const [sent, setSent]   = useState(false);
  const [focused, setFoc] = useState('');

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => { e.preventDefault(); setSent(true); };
  const reset  = ()  => { setSent(false); setForm({ name: '', email: '', subject: '', msg: '' }); };

  const inputBase = (name) => ({
    width: '100%',
    background: 'var(--surface)',
    border: `1px solid ${focused === name ? 'var(--accent)' : 'var(--border)'}`,
    padding: '1rem 1.25rem',
    color: 'var(--white)',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.82rem',
    outline: 'none',
    borderRadius: 'var(--radius)',
    transition: 'border-color 0.25s, box-shadow 0.25s',
    boxShadow: focused === name ? '0 0 0 3px var(--accent-glow)' : 'none',
  });

  return (
    <div style={{ paddingTop: '6rem' }}>
      <section className="section">
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <AnimBlock>
            <span className="tag">// Get In Touch</span>
            <h1 className="heading-xl" style={{ marginBottom: '0.5rem' }}>
              Let's<br />
              <span className="text-outline">Connect</span>
            </h1>
          </AnimBlock>

          <div className="divider" />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '5rem', alignItems: 'start' }} className="contact-grid">
            {/* Info column */}
            <div>
              <AnimBlock delay={0.1}>
                <p className="mono" style={{ color: 'var(--text-muted)', lineHeight: 2, marginBottom: '2.5rem' }}>
                  Have a project in mind? Looking for a collaborator? Or just want to say hi? Drop me a message — I respond within 24 hours.
                </p>
              </AnimBlock>

              {CONTACTS.map((c, i) => (
                <AnimBlock key={i} delay={i * 0.08 + 0.15}>
                  <div style={{
                    display: 'flex', gap: '1.25rem', alignItems: 'flex-start',
                    marginBottom: '1.25rem', paddingBottom: '1.25rem',
                    borderBottom: '1px solid var(--border)',
                  }}>
                    <div style={{
                      width: 40, height: 40, border: '1px solid var(--border-light)',
                      borderRadius: '10px', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent)',
                    }}>{c.icon}</div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-dim)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>{c.label}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--white)' }}>{c.val}</div>
                    </div>
                  </div>
                </AnimBlock>
              ))}
            </div>

            {/* Form column */}
            <AnimBlock delay={0.2}>
              {sent ? (
                <div className="card" style={{ textAlign: 'center', padding: '3rem', border: '1px solid var(--accent)' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent)', marginBottom: '1rem' }}>Message Sent!</h3>
                  <p className="mono" style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
                    I'll get back to you within 24 hours. Excited to connect!
                  </p>
                  <button className="btn" style={{ marginTop: '2rem' }} onClick={reset}>Send Another</button>
                </div>
              ) : (
                <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <input name="name"  placeholder="Your Name"     value={form.name}  onChange={handle} onFocus={() => setFoc('name')}  onBlur={() => setFoc('')} required style={inputBase('name')} />
                    <input name="email" placeholder="Email Address" value={form.email} onChange={handle} onFocus={() => setFoc('email')} onBlur={() => setFoc('')} required style={inputBase('email')} type="email" />
                  </div>
                  <input name="subject" placeholder="Subject" value={form.subject} onChange={handle} onFocus={() => setFoc('subject')} onBlur={() => setFoc('')} required style={inputBase('subject')} />
                  <textarea
                    name="msg" value={form.msg} onChange={handle} rows={6}
                    onFocus={() => setFoc('msg')} onBlur={() => setFoc('')}
                    placeholder="Your message..."
                    required
                    style={{ ...inputBase('msg'), resize: 'none' }}
                  />
                  <button type="submit" className="btn btn-solid" style={{ alignSelf: 'flex-start', padding: '1rem 2.5rem', fontSize: '0.75rem', marginTop: '0.5rem' }}>
                    Send Message ↗
                  </button>
                </form>
              )}
            </AnimBlock>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </div>
  );
}
