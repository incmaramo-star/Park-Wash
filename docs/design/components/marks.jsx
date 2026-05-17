// Park&Wash — Custom SVG assets (original, not traced from logo)

// Monogram: stylized "P&W" droplet mark
const MonoDroplet = ({ size = 120, bg = '#1A73E8', fg = '#FFFFFF' }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="120" rx="28" fill={bg}/>
    {/* droplet */}
    <path d="M60 22 C 44 44, 34 58, 34 72 a 26 26 0 0 0 52 0 C 86 58, 76 44, 60 22Z"
          fill="none" stroke={fg} strokeWidth="6" strokeLinejoin="round"/>
    {/* shine */}
    <path d="M50 62 q -4 8 0 14" fill="none" stroke={fg} strokeWidth="4" strokeLinecap="round" opacity=".85"/>
  </svg>
);

// Monogram: "P&W" letter lockup
const MonoLetters = ({ size = 120, bg = '#0A1B2E', fg = '#FFFFFF', accent = '#1A73E8' }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="120" rx="28" fill={bg}/>
    <text x="60" y="74" textAnchor="middle"
          fontFamily="Poppins, sans-serif" fontWeight="800" fontSize="52"
          fill={fg} letterSpacing="-2">P<tspan fill={accent}>&amp;</tspan>W</text>
  </svg>
);

// Wordmark: horizontal — clean type-only
const Wordmark = ({ height = 56, color = '#0A1B2E', accent = '#1A73E8' }) => (
  <svg height={height} viewBox="0 0 340 72" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="52" fontFamily="Poppins, sans-serif" fontWeight="800" fontSize="56"
          fill={color} letterSpacing="-2">
      Park<tspan fill={accent}>&amp;</tspan>Wash
    </text>
  </svg>
);

// Horizontal lockup: droplet + wordmark + tagline
const Lockup = ({ height = 72, color = '#0A1B2E', accent = '#1A73E8' }) => (
  <svg height={height} viewBox="0 0 460 96" xmlns="http://www.w3.org/2000/svg">
    <g>
      {/* icon block */}
      <rect x="0" y="8" width="80" height="80" rx="18" fill={accent}/>
      <path d="M40 24 C 28 40, 22 50, 22 60 a 18 18 0 0 0 36 0 C 58 50, 52 40, 40 24Z"
            fill="none" stroke="#fff" strokeWidth="4.5" strokeLinejoin="round"/>
      <path d="M32 54 q -3 6 0 10" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".9"/>
    </g>
    <text x="98" y="54" fontFamily="Poppins, sans-serif" fontWeight="800" fontSize="44"
          fill={color} letterSpacing="-1.5">
      Park<tspan fill={accent}>&amp;</tspan>Wash
    </text>
    <text x="99" y="78" fontFamily="Montserrat, sans-serif" fontWeight="500" fontSize="12"
          fill={color} opacity=".55" letterSpacing="2">
      MOBIELE DETAILING · OOST-VLAANDEREN
    </text>
  </svg>
);

// Favicon mini
const FaviconMark = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="7" fill="#1A73E8"/>
    <path d="M16 7 C 11 13, 8.5 17, 8.5 20.5 a 7.5 7.5 0 0 0 15 0 C 23.5 17, 21 13, 16 7Z"
          fill="#fff"/>
  </svg>
);

Object.assign(window, { MonoDroplet, MonoLetters, Wordmark, Lockup, FaviconMark });
