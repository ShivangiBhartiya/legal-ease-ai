import { useEffect, useState } from 'react';

export default function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const over = () => setHover(true);
    const out  = () => setHover(false);

    window.addEventListener('mousemove', move);
    document.querySelectorAll('a, button, [data-cursor]').forEach((el) => {
      el.addEventListener('mouseenter', over);
      el.addEventListener('mouseleave', out);
    });

    return () => {
      window.removeEventListener('mousemove', move);
      document.querySelectorAll('a, button, [data-cursor]').forEach((el) => {
        el.removeEventListener('mouseenter', over);
        el.removeEventListener('mouseleave', out);
      });
    };
  }, []);

  // Hide on touch devices
  if ('ontouchstart' in window) return null;

  const size = hover ? 48 : 16;
  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: pos.y - size / 2,
          left: pos.x - size / 2,
          width: size,
          height: size,
          borderRadius: '50%',
          border: '1.5px solid var(--accent)',
          background: hover ? 'rgba(108,99,255,0.12)' : 'transparent',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'width 0.25s, height 0.25s, top 0.08s, left 0.08s, background 0.25s',
          mixBlendMode: 'difference',
        }}
      />
      <div
        style={{
          position: 'fixed',
          top: pos.y - 3,
          left: pos.x - 3,
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: 'var(--accent)',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'top 0.02s, left 0.02s',
        }}
      />
    </>
  );
}
