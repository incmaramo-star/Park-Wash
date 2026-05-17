// Park&Wash — Color section

const Swatch = ({ hex, name, token, role, dark }) => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <div style={{
      background: hex, height: 140, borderRadius: 14,
      border: hex.toUpperCase() === '#FFFFFF' ? '1px solid var(--pw-fog)' : 'none',
      display: 'flex', alignItems: 'flex-end', padding: 16,
      color: dark ? '#fff' : 'var(--pw-ink)',
      fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: 1.5,
    }}>{hex}</div>
    <div style={{ marginTop: 10 }}>
      <div style={{ fontFamily: 'var(--f-display)', fontSize: 14, fontWeight: 600 }}>{name}</div>
      <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--pw-slate)', letterSpacing: 1, marginTop: 2 }}>
        {token} · {role}
      </div>
    </div>
  </div>
);

const ColorSection = () => {
  const blues = [
    ['#0A1B2E','Midnight','blue-950','surface · dark',true],
    ['#102A43','Deep navy','blue-900','text · emphasis',true],
    ['#14365C','Badge','blue-800','brand mark fill',true],
    ['#1859A8','Ocean','blue-700','pressed · link',true],
    ['#1A73E8','Signature','blue-600','PRIMARY · CTA',true],
    ['#3B8BED','Bright','blue-500','highlight',true],
    ['#6AA9F2','Sky','blue-400','accent · dark mode',false],
    ['#A3C9F7','Frost','blue-300','muted',false],
    ['#D1E3FB','Tint','blue-200','subtle bg',false],
    ['#E8F1FD','Mist','blue-100','cards',false],
    ['#F4F8FE','Wash','blue-50','page tint',false],
  ];
  const neutrals = [
    ['#0B1220','Ink','ink','body text',true],
    ['#3A4555','Graphite','graphite','secondary text',true],
    ['#6B7689','Slate','slate','muted · meta',true],
    ['#B7C0CC','Mist','mist','disabled',false],
    ['#E4E8EE','Fog','fog','borders',false],
    ['#F5F5F5','Cloud','cloud','surfaces',false],
    ['#FAFBFC','Paper','paper','page bg',false],
    ['#FFFFFF','White','white','cards · base',false],
  ];
  const support = [
    ['#2EC27E','Signal','signal','success · booked',true],
    ['#E8733B','Alert','alert','error · warning',true],
  ];

  return (
    <section>
      <BG_SectionHead num={2} kicker="Kleursysteem" title="Blauw als handtekening.">
        Één dominante blauwtoon (#1A73E8) draagt het merk. Een schaal van diepe navy tot lichte mist
        geeft hiërarchie. Neutrale grijzen houden de UI rustig. Accenten alleen voor feedback.
      </BG_SectionHead>

      <div style={{ padding: '32px 64px 32px' }}>
        <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--pw-blue-600)', marginBottom: 20 }}>
          2.1 · BRAND BLUES — SCHAAL 50–950
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16 }}>
          {blues.map(([h,n,t,r,d]) => <Swatch key={t} hex={h} name={n} token={`--pw-${t}`} role={r} dark={d}/>)}
        </div>
      </div>

      {/* Big hero color tile */}
      <div style={{ padding: '32px 64px 32px' }}>
        <div style={{
          background: 'var(--pw-blue-600)', borderRadius: 18, padding: 64, color: '#fff',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center',
        }}>
          <div>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: 3, opacity: .7 }}>PRIMARY · SIGNATURE</div>
            <div style={{ fontFamily: 'var(--f-display)', fontSize: 96, fontWeight: 800, lineHeight: 1, letterSpacing: '-3px', marginTop: 8 }}>#1A73E8</div>
            <p style={{ fontFamily: 'var(--f-body)', fontSize: 15, opacity: .8, lineHeight: 1.6, maxWidth: 400, marginTop: 16 }}>
              De handtekening van Park&amp;Wash. Gebruik voor primaire acties, logo-badges,
              en merkmomenten. Niet voor lopende tekst.
            </p>
          </div>
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 12, display: 'grid', gap: 10 }}>
            {[
              ['HEX','#1A73E8'],['RGB','26, 115, 232'],['CMYK','82, 55, 0, 0'],
              ['HSL','214°, 82%, 51%'],['Pantone (c)','2175 C'],['RAL','5017 (approx.)'],
            ].map(([k,v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 8, borderBottom: '1px solid rgba(255,255,255,.15)' }}>
                <span style={{ opacity: .6, letterSpacing: 2 }}>{k}</span><span>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: '32px 64px 32px' }}>
        <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--pw-blue-600)', marginBottom: 20 }}>
          2.2 · NEUTRAAL
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 16 }}>
          {neutrals.map(([h,n,t,r,d]) => <Swatch key={t} hex={h} name={n} token={`--pw-${t}`} role={r} dark={d}/>)}
        </div>
      </div>

      <div style={{ padding: '32px 64px 96px' }}>
        <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--pw-blue-600)', marginBottom: 20 }}>
          2.3 · ONDERSTEUNEND
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16 }}>
          {support.map(([h,n,t,r,d]) => <Swatch key={t} hex={h} name={n} token={`--pw-${t}`} role={r} dark={d}/>)}
        </div>

        {/* Pairing examples */}
        <div style={{ marginTop: 48 }}>
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--pw-blue-600)', marginBottom: 20 }}>
            2.4 · AANBEVOLEN COMBINATIES
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {[
              { bg:'#FFFFFF', fg:'#0B1220', accent:'#1A73E8', label:'Primair web' },
              { bg:'#0A1B2E', fg:'#FFFFFF', accent:'#6AA9F2', label:'Dark mode' },
              { bg:'#1A73E8', fg:'#FFFFFF', accent:'#D1E3FB', label:'Hero / CTA' },
              { bg:'#F5F5F5', fg:'#0B1220', accent:'#1859A8', label:'Document' },
            ].map((p,i) => (
              <div key={i} style={{
                background: p.bg, color: p.fg, borderRadius: 14, padding: 24, height: 180,
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                border: p.bg === '#FFFFFF' ? '1px solid var(--pw-fog)' : 'none',
              }}>
                <div style={{ fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 22, letterSpacing: '-.5px' }}>
                  Showroom<span style={{ color: p.accent }}>.</span>
                </div>
                <div>
                  <div style={{ display: 'inline-block', padding: '8px 14px', background: p.accent, color: p.bg === '#FFFFFF' ? '#fff' : (p.bg === '#1A73E8' ? '#0B1220' : '#0B1220'), borderRadius: 999, fontFamily: 'var(--f-body)', fontSize: 12, fontWeight: 600 }}>
                    Boek nu
                  </div>
                  <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: 1.5, marginTop: 12, opacity: .6 }}>{p.label.toUpperCase()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

window.BG_ColorSection = ColorSection;
