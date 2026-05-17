// Park&Wash — Assets & Code Snippets section

const AssetsSection = () => {
  const svgFiles = [
    { name: 'park-and-wash-primary.svg',    label: 'Primary (full color)',  desc: 'Default gebruik' },
    { name: 'park-and-wash-mono-navy.svg',  label: 'Mono navy',             desc: 'Eén kleur · dark ink' },
    { name: 'park-and-wash-mono-white.svg', label: 'Mono white',            desc: 'Voor donkere bg' },
    { name: 'park-and-wash-wordmark.svg',   label: 'Wordmark',              desc: 'Tekst-only lockup' },
    { name: 'park-and-wash-app-icon.svg',   label: 'App icon (shield)',     desc: 'iOS / Android' },
    { name: 'favicon.svg',                  label: 'Favicon',               desc: 'Browser tab' },
  ];
  const pngFiles = [
    ['Logo', ['park-and-wash-256.png','park-and-wash-512.png','park-and-wash-1024.png']],
    ['App icon', ['app-icon-180.png','app-icon-192.png','app-icon-512.png','app-icon-1024.png']],
    ['Favicon', ['favicon-16.png','favicon-32.png','favicon-48.png','favicon-64.png']],
  ];

  return (
    <section>
      <BG_SectionHead num={7} kicker="Assets & implementatie" title="Klaar voor web, app, print.">
        Alle logo-varianten in SVG (vector) en PNG (raster). Plus drop-in code voor website en
        app — geen handwerk meer nodig.
      </BG_SectionHead>

      {/* SVG grid */}
      <div style={{ padding: '32px 64px 32px' }}>
        <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--pw-blue-600)', marginBottom: 20 }}>
          7.1 · SVG VARIANTEN
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {svgFiles.map(f => {
            const isMonoWhite = f.name.includes('mono-white');
            return (
              <div key={f.name} style={{
                background: isMonoWhite ? 'var(--pw-blue-950)' : '#fff',
                border: '1px solid var(--pw-fog)', borderRadius: 14, padding: 24,
                display: 'flex', flexDirection: 'column', color: isMonoWhite ? '#fff' : 'var(--pw-ink)',
              }}>
                <div style={{ height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                  <img src={`assets/logo/${f.name}`} style={{ maxHeight: 160, maxWidth: '100%' }} alt={f.label}/>
                </div>
                <div style={{ fontFamily: 'var(--f-display)', fontWeight: 600, fontSize: 15 }}>{f.label}</div>
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, opacity: .6, marginTop: 4, letterSpacing: 1 }}>
                  {f.desc}
                </div>
                <a href={`assets/logo/${f.name}`} download style={{
                  marginTop: 12, padding: '8px 14px', background: 'var(--pw-blue-600)', color: '#fff',
                  borderRadius: 99, fontFamily: 'var(--f-body)', fontSize: 12, fontWeight: 600,
                  textDecoration: 'none', alignSelf: 'flex-start',
                }}>↓ .svg</a>
              </div>
            );
          })}
        </div>
      </div>

      {/* PNG exports */}
      <div style={{ padding: '32px 64px 32px' }}>
        <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--pw-blue-600)', marginBottom: 20 }}>
          7.2 · PNG EXPORTS
        </div>
        <div style={{ display: 'grid', gap: 16 }}>
          {pngFiles.map(([group, files]) => (
            <div key={group} style={{ background: '#fff', border: '1px solid var(--pw-fog)', borderRadius: 14, padding: 20 }}>
              <div style={{ fontFamily: 'var(--f-display)', fontWeight: 600, fontSize: 16, marginBottom: 14 }}>{group}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                {files.map(fn => (
                  <a key={fn} href={`assets/logo/png/${fn}`} download style={{
                    padding: '8px 14px', background: 'var(--pw-blue-100)', color: 'var(--pw-blue-700)',
                    borderRadius: 99, fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: 1,
                    textDecoration: 'none', fontWeight: 600,
                  }}>↓ {fn}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Web code */}
      <div style={{ padding: '32px 64px 32px' }}>
        <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--pw-blue-600)', marginBottom: 20 }}>
          7.3 · WEB · DROP-IN HTML
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <pre style={{
            background: 'var(--pw-blue-950)', color: '#fff', borderRadius: 14, padding: 24,
            fontFamily: 'var(--f-mono)', fontSize: 12, lineHeight: 1.7, overflow: 'auto', margin: 0,
          }}>{`<!-- Favicon + App icons in <head> -->
<link rel="icon" type="image/svg+xml"
      href="/logo/favicon.svg">
<link rel="icon" sizes="32x32"
      href="/logo/png/favicon-32.png">
<link rel="icon" sizes="16x16"
      href="/logo/png/favicon-16.png">

<!-- iOS home-screen -->
<link rel="apple-touch-icon" sizes="180x180"
      href="/logo/png/app-icon-180.png">

<!-- PWA manifest -->
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#1A73E8">`}</pre>
          <pre style={{
            background: 'var(--pw-blue-950)', color: '#fff', borderRadius: 14, padding: 24,
            fontFamily: 'var(--f-mono)', fontSize: 12, lineHeight: 1.7, overflow: 'auto', margin: 0,
          }}>{`<!-- Logo in header -->
<a href="/" aria-label="Park&Wash home">
  <img src="/logo/park-and-wash-primary.svg"
       alt="Park&Wash"
       width="180" height="216"/>
</a>

<!-- Wordmark inline (best SEO) -->
<img src="/logo/park-and-wash-wordmark.svg"
     alt="Park&Wash" style="height:48px">

<!-- Dark bg -->
<img src="/logo/park-and-wash-mono-white.svg"
     alt="Park&Wash" style="height:56px">`}</pre>
        </div>
      </div>

      {/* App code */}
      <div style={{ padding: '32px 64px 32px' }}>
        <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--pw-blue-600)', marginBottom: 20 }}>
          7.4 · APP · MANIFEST & NATIVE
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div>
            <div style={{ fontFamily: 'var(--f-display)', fontWeight: 600, fontSize: 14, marginBottom: 8 }}>manifest.json (PWA / Android)</div>
            <pre style={{
              background: 'var(--pw-blue-950)', color: '#fff', borderRadius: 14, padding: 24,
              fontFamily: 'var(--f-mono)', fontSize: 12, lineHeight: 1.7, overflow: 'auto', margin: 0,
            }}>{`{
  "name": "Park&Wash",
  "short_name": "Park&Wash",
  "description": "Mobiele autoreiniging",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0A1B2E",
  "theme_color": "#1A73E8",
  "icons": [
    { "src": "/logo/png/app-icon-192.png",
      "sizes": "192x192", "type": "image/png" },
    { "src": "/logo/png/app-icon-512.png",
      "sizes": "512x512", "type": "image/png",
      "purpose": "any maskable" }
  ]
}`}</pre>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--f-display)', fontWeight: 600, fontSize: 14, marginBottom: 8 }}>React / React Native component</div>
            <pre style={{
              background: 'var(--pw-blue-950)', color: '#fff', borderRadius: 14, padding: 24,
              fontFamily: 'var(--f-mono)', fontSize: 12, lineHeight: 1.7, overflow: 'auto', margin: 0,
            }}>{`// React web
import Logo from './logo/park-and-wash-primary.svg';
<img src={Logo} alt="Park&Wash" />

// React Native (with react-native-svg)
import Svg, { Path } from 'react-native-svg';
import Logo from './assets/logo.svg';
<Logo width={200} height={240} />

// Tailwind CSS
<img
  src="/logo/park-and-wash-mono-white.svg"
  className="h-14 w-auto"
  alt="Park&Wash"
/>`}</pre>
          </div>
        </div>
      </div>

      {/* CSS tokens export */}
      <div style={{ padding: '32px 64px 96px' }}>
        <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--pw-blue-600)', marginBottom: 20 }}>
          7.5 · DESIGN TOKENS · :root CSS
        </div>
        <pre style={{
          background: 'var(--pw-blue-950)', color: '#E8F1FD', borderRadius: 14, padding: 32,
          fontFamily: 'var(--f-mono)', fontSize: 12, lineHeight: 1.7, overflow: 'auto', margin: 0,
        }}>{`:root {
  /* Brand blues */
  --pw-blue-600: #1A73E8;  /* signature · primary CTA */
  --pw-blue-700: #1859A8;  /* pressed · link */
  --pw-blue-800: #14365C;  /* badge fill */
  --pw-blue-950: #0A1B2E;  /* deepest navy · dark surface */
  --pw-blue-500: #3B8BED;  --pw-blue-400: #6AA9F2;
  --pw-blue-300: #A3C9F7;  --pw-blue-200: #D1E3FB;
  --pw-blue-100: #E8F1FD;  --pw-blue-50:  #F4F8FE;

  /* Neutrals */
  --pw-ink: #0B1220; --pw-graphite: #3A4555; --pw-slate: #6B7689;
  --pw-mist: #B7C0CC; --pw-fog: #E4E8EE; --pw-cloud: #F5F5F5;
  --pw-paper: #FAFBFC; --pw-white: #FFFFFF;

  /* Support */
  --pw-signal: #2EC27E; --pw-alert: #E8733B;

  /* Type */
  --f-display: "Poppins", system-ui, sans-serif;
  --f-body:    "Montserrat", system-ui, sans-serif;

  /* Radii */
  --r-sm: 8px; --r-md: 12px; --r-lg: 18px; --r-pill: 999px;

  /* Shadows */
  --sh-1: 0 1px 2px rgba(11,18,32,.06);
  --sh-2: 0 4px 12px rgba(11,18,32,.08);
  --sh-blue: 0 12px 28px rgba(26,115,232,.28);
}`}</pre>

        {/* Download bundle CTA */}
        <div style={{
          marginTop: 32, background: 'var(--pw-blue-600)', borderRadius: 18, padding: 40,
          color: '#fff', display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 32,
        }}>
          <div>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: 3, opacity: .8 }}>BUNDLE</div>
            <div style={{ fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 32, letterSpacing: '-.5px', marginTop: 6 }}>
              Download alles in één keer
            </div>
            <p style={{ fontFamily: 'var(--f-body)', fontSize: 14, opacity: .85, marginTop: 6, maxWidth: 520 }}>
              Alle SVG- en PNG-bestanden, geordend per categorie. Geef aan de ontwikkelaar —
              plug-and-play voor web, app, PWA en favicon.
            </p>
          </div>
          <a href="assets/logo/" style={{
            padding: '14px 24px', background: '#fff', color: 'var(--pw-blue-700)',
            borderRadius: 99, fontFamily: 'var(--f-body)', fontSize: 14, fontWeight: 700,
            textDecoration: 'none', whiteSpace: 'nowrap',
          }}>Bekijk /assets/logo →</a>
        </div>
      </div>
    </section>
  );
};

window.BG_AssetsSection = AssetsSection;
