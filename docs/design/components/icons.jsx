// Park&Wash — Service icon set. Original, 2px stroke, 48×48 grid, rounded joins.

const IconBase = ({ children, size = 48, stroke = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none"
       stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
       xmlns="http://www.w3.org/2000/svg">
    {children}
  </svg>
);

// 1. Exterior wash — water drops + car silhouette
const IconExterior = (p) => (
  <IconBase {...p}>
    <path d="M8 32 h 32 l -3 -9 a 3 3 0 0 0 -2.8 -2 H 13.8 a 3 3 0 0 0 -2.8 2 L 8 32Z"/>
    <circle cx="15" cy="34" r="2.5"/>
    <circle cx="33" cy="34" r="2.5"/>
    <path d="M14 18 q 1.5 -3 0 -5" opacity=".7"/>
    <path d="M24 16 q 1.8 -3.5 0 -6" opacity=".7"/>
    <path d="M34 18 q 1.5 -3 0 -5" opacity=".7"/>
  </IconBase>
);

// 2. Interior — seat + sparkle
const IconInterior = (p) => (
  <IconBase {...p}>
    <path d="M14 36 v -14 a 4 4 0 0 1 4 -4 h 8 a 4 4 0 0 1 4 4 v 14"/>
    <path d="M14 28 h 16"/>
    <path d="M36 14 l 1 3 l 3 1 l -3 1 l -1 3 l -1 -3 l -3 -1 l 3 -1 Z" opacity=".8"/>
  </IconBase>
);

// 3. Full clean — car + circular arrows
const IconFullClean = (p) => (
  <IconBase {...p}>
    <circle cx="24" cy="24" r="14"/>
    <path d="M16 26 h 16 l -1.5 -4.5 a 2 2 0 0 0 -1.9 -1.5 H 19.4 a 2 2 0 0 0 -1.9 1.5 L 16 26Z"/>
    <circle cx="19" cy="27" r="1.5"/>
    <circle cx="29" cy="27" r="1.5"/>
  </IconBase>
);

// 4. Deep clean — spray bottle
const IconDeepClean = (p) => (
  <IconBase {...p}>
    <path d="M18 18 h 10 v 18 a 2 2 0 0 1 -2 2 h -6 a 2 2 0 0 1 -2 -2 Z"/>
    <path d="M22 18 v -4 h 6 v 2 l 4 2 v 2 h -10"/>
    <path d="M21 28 h 4"/>
    <path d="M34 10 l 2 1 M 38 13 l 2 1 M 35 15 l 1 2" opacity=".7"/>
  </IconBase>
);

// 5. Business / fleet — multiple cars
const IconFleet = (p) => (
  <IconBase {...p}>
    <path d="M6 30 h 20 l -2 -6 a 2 2 0 0 0 -1.9 -1.5 H 9.9 a 2 2 0 0 0 -1.9 1.5 L 6 30Z"/>
    <circle cx="11" cy="31" r="2"/>
    <circle cx="21" cy="31" r="2"/>
    <path d="M26 22 h 14 l -2 -6 a 2 2 0 0 0 -1.9 -1.5 H 29.9 a 2 2 0 0 0 -1.9 1.5 L 26 22Z" opacity=".55"/>
    <circle cx="31" cy="23" r="2" opacity=".55"/>
  </IconBase>
);

// 6. Trial / check
const IconTrial = (p) => (
  <IconBase {...p}>
    <circle cx="24" cy="24" r="15"/>
    <path d="M17 24 l 5 5 l 10 -11"/>
  </IconBase>
);

// 7. Location — pin
const IconLocation = (p) => (
  <IconBase {...p}>
    <path d="M24 8 a 10 10 0 0 1 10 10 c 0 8 -10 22 -10 22 s -10 -14 -10 -22 a 10 10 0 0 1 10 -10 Z"/>
    <circle cx="24" cy="18" r="4"/>
  </IconBase>
);

// 8. Planning — calendar
const IconPlanning = (p) => (
  <IconBase {...p}>
    <rect x="9" y="12" width="30" height="28" rx="3"/>
    <path d="M9 20 h 30"/>
    <path d="M17 8 v 8 M 31 8 v 8"/>
    <circle cx="18" cy="28" r="1.5"/>
    <circle cx="24" cy="28" r="1.5"/>
    <circle cx="30" cy="28" r="1.5"/>
  </IconBase>
);

// 9. Key (brand motif from "jij geeft ons de sleutel")
const IconKey = (p) => (
  <IconBase {...p}>
    <circle cx="16" cy="24" r="7"/>
    <path d="M23 24 h 17"/>
    <path d="M34 24 v 5"/>
    <path d="M40 24 v 4"/>
  </IconBase>
);

// 10. Shine / sparkle
const IconShine = (p) => (
  <IconBase {...p}>
    <path d="M24 8 l 2.5 7.5 l 7.5 2.5 l -7.5 2.5 l -2.5 7.5 l -2.5 -7.5 l -7.5 -2.5 l 7.5 -2.5 Z"/>
    <path d="M38 30 l 1 3 l 3 1 l -3 1 l -1 3 l -1 -3 l -3 -1 l 3 -1 Z" opacity=".6"/>
  </IconBase>
);

// 11. Wheel/tire
const IconWheel = (p) => (
  <IconBase {...p}>
    <circle cx="24" cy="24" r="15"/>
    <circle cx="24" cy="24" r="5"/>
    <path d="M24 9 v 10 M 24 29 v 10 M 9 24 h 10 M 29 24 h 10"/>
  </IconBase>
);

// 12. Phone
const IconPhone = (p) => (
  <IconBase {...p}>
    <path d="M12 10 h 7 l 3 8 l -4 3 a 18 18 0 0 0 9 9 l 3 -4 l 8 3 v 7 a 2 2 0 0 1 -2 2 C 22 38, 10 26, 10 12 a 2 2 0 0 1 2 -2 Z"/>
  </IconBase>
);

window.PWIcons = {
  Exterior: IconExterior,
  Interior: IconInterior,
  FullClean: IconFullClean,
  DeepClean: IconDeepClean,
  Fleet: IconFleet,
  Trial: IconTrial,
  Location: IconLocation,
  Planning: IconPlanning,
  Key: IconKey,
  Shine: IconShine,
  Wheel: IconWheel,
  Phone: IconPhone,
};
