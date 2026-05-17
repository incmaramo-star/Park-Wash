// Park&Wash — Brand Guide sections
const { useState } = React;

// ---------- SECTION HEADER ----------
const SectionHead = ({ num, title, kicker, children }) => (
  <header style={{
    display: 'grid', gridTemplateColumns: '120px 1fr', gap: 48,
    padding: '96px 64px 32px', borderTop: '1px solid var(--pw-fog)',
  }}>
    <div>
      <div style={{
        fontFamily: 'var(--f-mono)', fontSize: 12, color: 'var(--pw-slate)',
        letterSpacing: 2, textTransform: 'uppercase',
      }}>Sectie</div>
      <div style={{
        fontFamily: 'var(--f-display)', fontSize: 64, fontWeight: 800,
        color: 'var(--pw-blue-600)', lineHeight: 1,
      }}>{String(num).padStart(2,'0')}</div>
    </div>
    <div>
      <div style={{
        fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--pw-blue-600)',
        letterSpacing: 3, textTransform: 'uppercase', marginBottom: 12,
      }}>{kicker}</div>
      <h2 style={{
        fontFamily: 'var(--f-display)', fontSize: 56, fontWeight: 700,
        margin: 0, lineHeight: 1.05, letterSpacing: '-1.5px',
      }}>{title}</h2>
      {children && <p style={{
        fontFamily: 'var(--f-body)', fontSize: 16, color: 'var(--pw-graphite)',
        maxWidth: 640, marginTop: 20, lineHeight: 1.6,
      }}>{children}</p>}
    </div>
  </header>
);

// ---------- COVER ----------
const Cover = () => (
  <section style={{
    minHeight: 780, padding: '64px', background: 'var(--pw-blue-950)',
    color: '#fff', position: 'relative', overflow: 'hidden',
  }}>
    {/* Giant P&W watermark */}
    <div aria-hidden style={{
      position: 'absolute', right: -80, bottom: -120,
      fontFamily: 'var(--f-display)', fontWeight: 800, fontSize: 680,
      lineHeight: .8, color: 'var(--pw-blue-800)', opacity: .35,
      letterSpacing: '-30px', userSelect: 'none',
    }}>P&amp;W</div>

    <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <MonoDroplet size={56} />
        <div>
          <div style={{ fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 20, letterSpacing: '-.5px' }}>Park&amp;Wash</div>
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, opacity: .6, letterSpacing: 2 }}>BRAND GUIDELINES</div>
        </div>
      </div>
      <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, opacity: .6, letterSpacing: 2, textAlign: 'right' }}>
        V 1.0 · APR 2026<br/>OOST-VLAANDEREN, BE
      </div>
    </div>

    <div style={{ position: 'relative', zIndex: 1, marginTop: 160, maxWidth: 900 }}>
      <div style={{
        display: 'inline-block', padding: '6px 14px', borderRadius: 999,
        background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.18)',
        fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: 2, marginBottom: 32,
      }}>● IDENTITEITSSYSTEEM — VOLLEDIG</div>
      <h1 style={{
        fontFamily: 'var(--f-display)', fontWeight: 800, fontSize: 140,
        lineHeight: .92, margin: 0, letterSpacing: '-5px',
      }}>
        Jij geeft<br/>de <span style={{ color: 'var(--pw-blue-500)' }}>sleutel.</span><br/>Wij geven<br/>showroom.
      </h1>
      <p style={{
        fontFamily: 'var(--f-body)', fontSize: 18, maxWidth: 520, marginTop: 32,
        opacity: .75, lineHeight: 1.55,
      }}>
        Een complete visuele gids voor Park&amp;Wash — mobiele autoreiniging voor
        particulieren en bedrijven. Logo, kleuren, typografie, iconen, toepassingen.
      </p>
    </div>

    <div style={{
      position: 'absolute', bottom: 40, left: 64, right: 64,
      display: 'flex', justifyContent: 'space-between',
      fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: 2, opacity: .55, zIndex: 1,
    }}>
      <span>— 01 LOGO · 02 KLEUREN · 03 TYPOGRAFIE · 04 ICONEN · 05 TOEPASSING</span>
      <span>BRAND / IDENTITY</span>
    </div>
  </section>
);

// ---------- PRINCIPLES ----------
const Principles = () => (
  <section style={{ padding: '96px 64px', background: 'var(--pw-paper)' }}>
    <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: 3, color: 'var(--pw-blue-600)' }}>
      KERNWAARDEN
    </div>
    <h2 style={{ fontFamily: 'var(--f-display)', fontSize: 72, fontWeight: 700, letterSpacing: '-2px', lineHeight: 1, margin: '8px 0 64px', maxWidth: 900 }}>
      Eerlijk. Vlot. Showroomklaar.
    </h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
      {[
        { n: '01', t: 'Transparant', b: 'Duidelijke prijzen, geen verrassingen. De klant weet altijd wat hij krijgt, voor hoeveel, tegen wanneer.' },
        { n: '02', t: 'Mobiel & flexibel', b: 'Wij komen ter plaatse — thuis, op kantoor, bij de dealer. De agenda draait rond jou.' },
        { n: '03', t: 'Precies', b: 'Basic tot coating: elk detail krijgt de juiste tijd. Geen compromis op afwerking.' },
      ].map(v => (
        <div key={v.n} style={{ borderTop: '2px solid var(--pw-blue-600)', paddingTop: 20 }}>
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: 3, color: 'var(--pw-slate)' }}>{v.n}</div>
          <div style={{ fontFamily: 'var(--f-display)', fontSize: 28, fontWeight: 600, letterSpacing: '-.5px', marginTop: 12 }}>{v.t}</div>
          <p style={{ fontFamily: 'var(--f-body)', fontSize: 15, color: 'var(--pw-graphite)', lineHeight: 1.6, marginTop: 12 }}>{v.b}</p>
        </div>
      ))}
    </div>
  </section>
);

window.BG_Cover = Cover;
window.BG_Principles = Principles;
window.BG_SectionHead = SectionHead;
