export default function LogoMark({ size = 26, isDark = false }) {
  const ink = isDark ? "#f2eed8" : "#1a160c";
  const paper = isDark ? "#0e0e0f" : "#f9f7f4";
  const gold = isDark ? "#c9a84c" : "#a07830";

  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="3" width="28" height="36" rx="2.5" fill={ink} />
      <rect
        x="6"
        y="3"
        width="28"
        height="36"
        rx="2.5"
        fill="none"
        stroke={isDark ? "rgba(255,220,100,0.3)" : "rgba(160,120,40,0.3)"}
        strokeWidth="0.75"
      />
      <path d="M27 3 L34 10 L27 10 Z" fill={isDark ? "rgba(255,220,100,0.25)" : "rgba(255,255,255,0.25)"} />
      <path d="M27 3 L34 10" stroke={isDark ? "rgba(255,220,100,0.5)" : "rgba(0,0,0,0.3)"} strokeWidth="0.75" />
      <line x1="11" y1="16" x2="24" y2="16" stroke={paper} strokeWidth="2" strokeLinecap="round" />
      <line x1="11" y1="21" x2="28" y2="21" stroke={paper} strokeWidth="2" strokeLinecap="round" />
      <line x1="11" y1="26" x2="26" y2="26" stroke={paper} strokeWidth="2" strokeLinecap="round" />
      <line x1="11" y1="31" x2="20" y2="31" stroke={paper} strokeWidth="2" strokeLinecap="round" />
      <circle cx="36" cy="36" r="11" fill={paper} stroke={gold} strokeWidth="1.25" />
      <line x1="36" y1="28" x2="36" y2="42" stroke={ink} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="32" y1="42" x2="40" y2="42" stroke={ink} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="30" y1="31" x2="42" y2="31" stroke={ink} strokeWidth="1.25" strokeLinecap="round" />
      <line x1="31" y1="31" x2="31" y2="36" stroke={ink} strokeWidth="1" />
      <path d="M28 36 Q31 39 34 36" stroke={ink} strokeWidth="1.25" fill="none" strokeLinecap="round" />
      <line x1="41" y1="31" x2="41" y2="36" stroke={ink} strokeWidth="1" />
      <path d="M38 36 Q41 39 44 36" stroke={ink} strokeWidth="1.25" fill="none" strokeLinecap="round" />
    </svg>
  );
}
