// Park&Wash — Vector reconstruction of the badge logo (v2 — tighter composition)
const PW_PALETTE = {
  outline: '#0A1B2E',
  badge:   '#14365C',
  mid:     '#1859A8',
  bright:  '#3B8BED',
  sky:     '#6AA9F2',
  white:   '#FFFFFF',
};

const PWBadgeLogo = ({ size = 520 }) => {
  const p = PW_PALETTE;
  return (
    <svg width={size} viewBox="0 0 600 720" xmlns="http://www.w3.org/2000/svg" style={{ display:'block' }}>
      <defs>
        <radialGradient id="domeG" cx="50%" cy="90%" r="80%">
          <stop offset="0%" stopColor={p.bright}/>
          <stop offset="60%" stopColor={p.mid}/>
          <stop offset="100%" stopColor={p.badge}/>
        </radialGradient>
        <clipPath id="domeClip">
          <path d="M130 340 Q 130 140 300 140 Q 470 140 470 340 L 470 400 L 130 400 Z"/>
        </clipPath>
      </defs>

      {/* ---------- TOOLS (tucked close to badge) ---------- */}
      {/* Brush top-left */}
      <g transform="translate(105,175) rotate(-35 55 40)">
        <rect x="50" y="-40" width="14" height="48" rx="4" fill={p.badge} stroke={p.outline} strokeWidth="4"/>
        <circle cx="57" cy="-42" r="8" fill={p.badge} stroke={p.outline} strokeWidth="4"/>
        <rect x="8" y="6" width="96" height="40" rx="7" fill={p.sky} stroke={p.outline} strokeWidth="4.5"/>
        <rect x="14" y="10" width="84" height="14" rx="3" fill={p.bright} opacity=".6"/>
        {Array.from({length: 10}).map((_,i) => (
          <rect key={i} x={16 + i*9} y="46" width="5" height="14" fill={p.outline}/>
        ))}
      </g>

      {/* Squeegee left */}
      <g transform="translate(60,320)">
        <rect x="0" y="0" width="44" height="20" rx="3" fill={p.bright} stroke={p.outline} strokeWidth="3.5"/>
        <rect x="17" y="20" width="10" height="56" rx="3" fill={p.badge} stroke={p.outline} strokeWidth="3.5"/>
        <rect x="11" y="72" width="22" height="14" rx="2.5" fill={p.badge} stroke={p.outline} strokeWidth="3.5"/>
      </g>

      {/* Spray gun top-right */}
      <g transform="translate(360,175) rotate(10 80 30)">
        {/* barrel */}
        <rect x="0" y="12" width="130" height="22" rx="5" fill={p.badge} stroke={p.outline} strokeWidth="4.5"/>
        {/* nozzle */}
        <rect x="-16" y="16" width="18" height="14" rx="2.5" fill={p.mid} stroke={p.outline} strokeWidth="4"/>
        {/* body */}
        <rect x="95" y="4" width="42" height="42" rx="6" fill={p.mid} stroke={p.outline} strokeWidth="4.5"/>
        {/* handle */}
        <path d="M112 46 L 116 92 Q 118 102 128 102 L 142 102 Q 151 102 150 92 L 145 46 Z"
              fill={p.mid} stroke={p.outline} strokeWidth="4.5" strokeLinejoin="round"/>
        <path d="M108 50 L 104 72 L 115 74 Z" fill={p.outline}/>
        {/* water spray */}
        <g stroke={p.white} strokeWidth="4" strokeLinecap="round" fill="none">
          <path d="M-22 22 L -54 12"/>
          <path d="M-22 22 L -56 24"/>
          <path d="M-22 22 L -52 40"/>
        </g>
      </g>

      {/* Spray bottle right */}
      <g transform="translate(498,310)">
        <rect x="4" y="0" width="28" height="14" rx="2.5" fill={p.badge} stroke={p.outline} strokeWidth="3.5"/>
        <rect x="12" y="14" width="12" height="10" fill={p.badge} stroke={p.outline} strokeWidth="3.5"/>
        <path d="M0 24 L 36 24 L 38 80 Q 38 88 30 88 L 6 88 Q -2 88 -2 80 Z"
              fill={p.mid} stroke={p.outline} strokeWidth="3.5" strokeLinejoin="round"/>
        <rect x="7" y="50" width="22" height="18" rx="2" fill={p.white}/>
      </g>

      {/* ---------- BADGE ---------- */}
      {/* Outer dark shield (dome on top, shield with point bottom) */}
      <path d="
        M 110 350
        Q 110 125 300 125
        Q 490 125 490 350
        L 490 400
        Q 540 404 540 440
        L 540 590
        Q 540 630 500 630
        L 330 630
        L 300 665
        L 270 630
        L 100 630
        Q 60 630 60 590
        L 60 440
        Q 60 404 110 400
        Z" fill={p.outline}/>

      {/* Inner filled body */}
      <path d="
        M 128 353
        Q 128 143 300 143
        Q 472 143 472 353
        L 472 398
        L 128 398
        Z" fill={p.badge}/>

      {/* Dome gradient scene */}
      <path d="M 140 380 Q 140 155 300 155 Q 460 155 460 380 Z" fill="url(#domeG)"/>

      {/* Inner light ring */}
      <path d="M 140 380 Q 140 155 300 155 Q 460 155 460 380"
            fill="none" stroke={p.white} strokeWidth="2.5" opacity=".3"/>

      {/* Dome contents */}
      <g clipPath="url(#domeClip)">
        {/* check circle */}
        <g transform="translate(195, 225)">
          <circle r="22" fill={p.badge} stroke={p.white} strokeWidth="3.5"/>
          <path d="M -9 0 L -2 8 L 10 -7" fill="none" stroke={p.white} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
        </g>

        {/* sparkles */}
        {[
          [260, 225, 9], [295, 245, 7], [332, 230, 10],
          [372, 248, 7], [395, 232, 9],
          [230, 275, 8], [415, 290, 8], [180, 315, 7],
        ].map(([x, y, s], i) => (
          <path key={i}
                d={`M ${x} ${y-s} L ${x+s*0.28} ${y-s*0.28} L ${x+s} ${y} L ${x+s*0.28} ${y+s*0.28} L ${x} ${y+s} L ${x-s*0.28} ${y+s*0.28} L ${x-s} ${y} L ${x-s*0.28} ${y-s*0.28} Z`}
                fill={p.white}/>
        ))}

        {/* VAN */}
        <g transform="translate(300, 360)">
          <ellipse cx="0" cy="22" rx="145" ry="5" fill={p.outline} opacity=".4"/>
          {/* body */}
          <path d="
            M -145 18
            L -145 -28
            Q -145 -58 -115 -64
            L -70 -72
            Q -55 -76 -38 -76
            L 108 -76
            Q 132 -76 142 -60
            L 145 -28
            L 145 18
            Z" fill={p.badge} stroke={p.outline} strokeWidth="4.5" strokeLinejoin="round"/>
          {/* windows */}
          <path d="
            M -124 -24
            L -124 -48
            Q -124 -60 -108 -63
            L -72 -70
            Q -56 -74 -40 -74
            L 96 -74
            Q 116 -74 124 -60
            L 126 -24
            Z" fill={p.mid}/>
          <line x1="-78" y1="-72" x2="-78" y2="-24" stroke={p.badge} strokeWidth="4"/>
          <line x1="-32" y1="-74" x2="-32" y2="-24" stroke={p.badge} strokeWidth="4"/>
          <line x1="32" y1="-74" x2="32" y2="-24" stroke={p.badge} strokeWidth="4"/>
          {/* side stripe */}
          <path d="M -138 -4 L 138 -4 L 135 14 L -135 14 Z" fill={p.mid}/>
          <path d="M -90 4 L 90 4" stroke={p.bright} strokeWidth="2.5" opacity=".85"/>
          {/* door */}
          <line x1="12" y1="-24" x2="12" y2="14" stroke={p.outline} strokeWidth="2"/>
          <circle cx="18" cy="-6" r="2" fill={p.outline}/>
          {/* headlight */}
          <path d="M 135 -14 L 144 -14 L 144 -2 L 135 -2 Z" fill={p.white} opacity=".9"/>
          {/* wheels */}
          <circle cx="-90" cy="22" r="18" fill={p.outline}/>
          <circle cx="-90" cy="22" r="9" fill={p.mid}/>
          <circle cx="-90" cy="22" r="3.5" fill={p.white}/>
          <circle cx="90" cy="22" r="18" fill={p.outline}/>
          <circle cx="90" cy="22" r="9" fill={p.mid}/>
          <circle cx="90" cy="22" r="3.5" fill={p.white}/>
        </g>
      </g>

      {/* Star at top */}
      <g transform="translate(300, 135)">
        <path d="M 0 -42 L 12 -13 L 43 -10 L 19 10 L 28 40 L 0 24 L -28 40 L -19 10 L -43 -10 L -12 -13 Z"
              fill={p.outline}/>
        <path d="M 0 -33 L 9.5 -10 L 34 -8 L 15 8 L 22 32 L 0 19 L -22 32 L -15 8 L -34 -8 L -9.5 -10 Z"
              fill={p.white}/>
      </g>

      {/* ---------- WORDMARK PLATE (overlaps badge) ---------- */}
      <rect x="95" y="410" width="410" height="170" rx="6" fill={p.white} stroke={p.outline} strokeWidth="4.5"/>

      {/* water-drop decorations */}
      <g fill={p.bright}>
        <ellipse cx="140" cy="432" rx="14" ry="3"/>
        <ellipse cx="460" cy="432" rx="14" ry="3"/>
      </g>

      <text x="300" y="480" fontFamily="Poppins, Impact, sans-serif" fontWeight="900" fontSize="54"
            fill={p.badge} textAnchor="middle" letterSpacing="1">PARK &amp;</text>
      <text x="300" y="548" fontFamily="Poppins, Impact, sans-serif" fontWeight="900" fontSize="68"
            fill={p.badge} textAnchor="middle" letterSpacing="2">WASH</text>

      {/* MOBILE DETAILING banner */}
      <path d="M 150 585 L 450 585 L 450 618 L 300 635 L 150 618 Z"
            fill={p.badge} stroke={p.outline} strokeWidth="4.5" strokeLinejoin="round"/>
      <text x="300" y="609" fontFamily="Poppins, sans-serif" fontWeight="800" fontSize="18"
            fill={p.white} textAnchor="middle" letterSpacing="4">MOBILE DETAILING</text>
    </svg>
  );
};

// Mono variant (single color)
const PWBadgeMono = ({ size = 520, color = '#0A1B2E' }) => (
  <div style={{ filter: 'saturate(0)' }}><PWBadgeLogo size={size}/></div>
);

// Small app-icon version
const PWShieldIcon = ({ size = 120 }) => {
  const p = PW_PALETTE;
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="24" fill={p.outline}/>
      <path d="M 22 68 Q 22 22 60 22 Q 98 22 98 68 L 98 78 L 22 78 Z" fill={p.mid}/>
      <path d="M 60 12 L 64 22 L 75 23 L 67 30 L 70 41 L 60 35 L 50 41 L 53 30 L 45 23 L 56 22 Z" fill={p.white}/>
      <g transform="translate(60, 70)">
        <path d="M -28 4 L -28 -8 Q -28 -14 -22 -15 L -13 -18 Q -9 -19 -5 -19 L 21 -19 Q 26 -19 28 -15 L 29 -6 L 29 4 Z"
              fill={p.badge} stroke={p.white} strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="-17" cy="5" r="4.5" fill={p.outline} stroke={p.white} strokeWidth="1.5"/>
        <circle cx="17" cy="5" r="4.5" fill={p.outline} stroke={p.white} strokeWidth="1.5"/>
      </g>
    </svg>
  );
};

Object.assign(window, { PWBadgeLogo, PWBadgeMono, PWShieldIcon });
