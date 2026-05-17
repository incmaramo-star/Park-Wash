// Park&Wash — Icons, App icons, Spacing sections

const IconSection = () => {
  const items = [
    ['Exterior', 'Buitenwas'],
    ['Interior', 'Interieur'],
    ['FullClean', 'Full clean'],
    ['DeepClean', 'Deep clean'],
    ['Fleet', 'Bedrijven'],
    ['Trial', 'Proefbeurt'],
    ['Location', 'Locatie'],
    ['Planning', 'Planning'],
    ['Key', 'Sleutel'],
    ['Shine', 'Shine'],
    ['Wheel', 'Velgen'],
    ['Phone', 'Contact'],
  ];
  return (
    <section>
      <BG_SectionHead num={4} kicker="Iconen" title="Twaalf iconen, één systeem.">
        Custom iconenset — 2px stroke op een 48×48 grid, afgeronde uiteinden, consistent gewicht.
        Gebruik in diensten-secties, menu's, apps. Altijd in één kleur per instantie.
      </BG_SectionHead>

      {/* Grid */}
      <div style={{ padding: '32px 64px 32px' }}>
        <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--pw-blue-600)', marginBottom: 20 }}>
          4.1 · COMPLETE SET
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 0,
          border: '1px solid var(--pw-fog)', borderRadius: 18, overflow: 'hidden', background: '#fff',
        }}>
          {items.map(([key, label], i) => {
            const Ic = PWIcons[key];
            return (
              <div key={key} style={{
                padding: 28, borderRight: (i + 1) % 6 === 0 ? 'none' : '1px solid var(--pw-fog)',
                borderTop: i >= 6 ? '1px solid var(--pw-fog)' : 'none',
                textAlign: 'center', color: 'var(--pw-ink)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                  <Ic size={56} stroke="var(--pw-blue-600)"/>
                </div>
                <div style={{ fontFamily: 'var(--f-body)', fontSize: 13, fontWeight: 600 }}>{label}</div>
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--pw-slate)', marginTop: 4, letterSpacing: 1 }}>
                  pw-{key.toLowerCase()}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sizes & treatments */}
      <div style={{ padding: '32px 64px 32px' }}>
        <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--pw-blue-600)', marginBottom: 20 }}>
          4.2 · FORMATEN & BEHANDELING
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div style={{ background: '#fff', border: '1px solid var(--pw-fog)', borderRadius: 18, padding: 32 }}>
            <div style={{ fontFamily: 'var(--f-display)', fontSize: 18, fontWeight: 600, marginBottom: 24 }}>Schaal</div>
            <div style={{ display: 'flex', alignItems: 'end', gap: 32, justifyContent: 'center', paddingBottom: 24, borderBottom: '1px dashed var(--pw-fog)' }}>
              {[16, 24, 32, 48, 64].map(s => (
                <div key={s} style={{ textAlign: 'center' }}>
                  <PWIcons.FullClean size={s} stroke="var(--pw-blue-600)"/>
                  <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--pw-slate)', marginTop: 8 }}>{s}px</div>
                </div>
              ))}
            </div>
            <div style={{ fontFamily: 'var(--f-body)', fontSize: 13, color: 'var(--pw-graphite)', lineHeight: 1.6, marginTop: 16 }}>
              Default 24px in UI. 48px+ voor feature-blocks. Nooit onder 16px.
            </div>
          </div>
          <div style={{ background: '#fff', border: '1px solid var(--pw-fog)', borderRadius: 18, padding: 32 }}>
            <div style={{ fontFamily: 'var(--f-display)', fontSize: 18, fontWeight: 600, marginBottom: 24 }}>Behandelingen</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              {[
                { bg: '#fff', fg: 'var(--pw-ink)', border: '1px solid var(--pw-fog)', l: 'Line · ink' },
                { bg: 'var(--pw-blue-100)', fg: 'var(--pw-blue-700)', border: 'none', l: 'Soft tint' },
                { bg: 'var(--pw-blue-600)', fg: '#fff', border: 'none', l: 'On brand' },
                { bg: 'var(--pw-blue-950)', fg: 'var(--pw-blue-400)', border: 'none', l: 'Dark' },
              ].map((t, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{
                    background: t.bg, border: t.border, borderRadius: 14, padding: 20,
                    display: 'flex', justifyContent: 'center', alignItems: 'center', height: 80,
                  }}>
                    <PWIcons.DeepClean size={40} stroke={t.fg}/>
                  </div>
                  <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--pw-slate)', marginTop: 8, letterSpacing: 1 }}>
                    {t.l.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* App icons & favicons */}
      <div style={{ padding: '32px 64px 96px' }}>
        <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--pw-blue-600)', marginBottom: 20 }}>
          4.3 · APP ICONS & FAVICONS
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 24 }}>
          {/* App icons large */}
          <div style={{ background: 'var(--pw-blue-50)', borderRadius: 18, padding: 40 }}>
            <div style={{ fontFamily: 'var(--f-display)', fontSize: 18, fontWeight: 600, marginBottom: 24 }}>App icon — iOS/Android</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              {/* variant 1: droplet on blue */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ boxShadow: 'var(--sh-3)', borderRadius: 32, display: 'inline-block' }}>
                  <MonoDroplet size={140} bg="#1A73E8" fg="#FFFFFF"/>
                </div>
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--pw-slate)', marginTop: 10 }}>DROPLET · PRIMARY</div>
              </div>
              {/* variant 2: P&W on navy */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ boxShadow: 'var(--sh-3)', borderRadius: 32, display: 'inline-block' }}>
                  <MonoLetters size={140}/>
                </div>
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--pw-slate)', marginTop: 10 }}>P&W · SIGNATURE</div>
              </div>
              {/* variant 3: gradient */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ boxShadow: 'var(--sh-3)', borderRadius: 32, display: 'inline-block', overflow: 'hidden' }}>
                  <svg width="140" height="140" viewBox="0 0 120 120">
                    <defs>
                      <linearGradient id="ag" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#3B8BED"/>
                        <stop offset="1" stopColor="#0A1B2E"/>
                      </linearGradient>
                    </defs>
                    <rect width="120" height="120" rx="28" fill="url(#ag)"/>
                    <path d="M60 22 C 44 44, 34 58, 34 72 a 26 26 0 0 0 52 0 C 86 58, 76 44, 60 22Z"
                          fill="#fff"/>
                  </svg>
                </div>
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--pw-slate)', marginTop: 10 }}>GRADIENT · ALT</div>
              </div>
            </div>

            {/* Home screen preview */}
            <div style={{ marginTop: 32, padding: 24, background: 'linear-gradient(180deg, #0A1B2E, #14365C)', borderRadius: 24, display: 'flex', gap: 20, alignItems: 'center' }}>
              <MonoDroplet size={68} bg="#1A73E8" fg="#fff"/>
              <div>
                <div style={{ fontFamily: 'var(--f-display)', fontSize: 14, fontWeight: 600, color: '#fff' }}>Park&amp;Wash</div>
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'rgba(255,255,255,.6)', letterSpacing: 1 }}>PREVIEW · HOME SCREEN</div>
              </div>
            </div>
          </div>

          {/* Favicons */}
          <div style={{ background: '#fff', border: '1px solid var(--pw-fog)', borderRadius: 18, padding: 40 }}>
            <div style={{ fontFamily: 'var(--f-display)', fontSize: 18, fontWeight: 600, marginBottom: 24 }}>Favicon</div>
            <div style={{ display: 'flex', alignItems: 'end', gap: 32, paddingBottom: 24, borderBottom: '1px dashed var(--pw-fog)' }}>
              {[16, 24, 32, 48].map(s => (
                <div key={s} style={{ textAlign: 'center' }}>
                  <FaviconMark size={s}/>
                  <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--pw-slate)', marginTop: 8 }}>{s}px</div>
                </div>
              ))}
            </div>

            {/* Browser tab */}
            <div style={{ marginTop: 24 }}>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--pw-slate)', letterSpacing: 1, marginBottom: 8 }}>TAB PREVIEW</div>
              <div style={{
                background: 'var(--pw-cloud)', borderRadius: '10px 10px 0 0', padding: '8px 12px',
                display: 'flex', alignItems: 'center', gap: 8, maxWidth: 260,
                border: '1px solid var(--pw-fog)', borderBottom: 'none',
              }}>
                <FaviconMark size={16}/>
                <span style={{ fontFamily: 'var(--f-body)', fontSize: 12, color: 'var(--pw-ink)', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  Park&amp;Wash — Mobiele detailing
                </span>
                <span style={{ color: 'var(--pw-slate)', fontSize: 14 }}>×</span>
              </div>
              <div style={{ height: 6, background: '#fff', border: '1px solid var(--pw-fog)', borderRadius: '0 0 8px 8px', maxWidth: 260 }}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SpacingSection = () => (
  <section>
    <BG_SectionHead num={5} kicker="Schaal & ritme" title="4-punts systeem.">
      Spacing, radii en schaduwen volgen één eenvoudig ritme. Minder nadenken, meer consistentie.
    </BG_SectionHead>

    <div style={{ padding: '32px 64px 32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
      {/* Spacing */}
      <div style={{ background: '#fff', border: '1px solid var(--pw-fog)', borderRadius: 18, padding: 32 }}>
        <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--pw-blue-600)', marginBottom: 8 }}>5.1 · SPACING</div>
        <div style={{ fontFamily: 'var(--f-display)', fontSize: 20, fontWeight: 600, marginBottom: 24 }}>Base 4 · Scale ×2</div>
        {[['s-1',4],['s-2',8],['s-3',12],['s-4',16],['s-5',24],['s-6',32],['s-7',48],['s-8',64],['s-9',96]].map(([t,v]) => (
          <div key={t} style={{ display: 'grid', gridTemplateColumns: '80px 60px 1fr', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid var(--pw-fog)' }}>
            <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--pw-slate)' }}>--{t}</span>
            <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--pw-ink)' }}>{v}px</span>
            <div style={{ height: 10, width: v * 2, background: 'var(--pw-blue-600)', borderRadius: 2 }}/>
          </div>
        ))}
      </div>

      {/* Radii + shadow */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ background: '#fff', border: '1px solid var(--pw-fog)', borderRadius: 18, padding: 32 }}>
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--pw-blue-600)', marginBottom: 8 }}>5.2 · RADII</div>
          <div style={{ fontFamily: 'var(--f-display)', fontSize: 20, fontWeight: 600, marginBottom: 20 }}>Afgeronde hoeken</div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'end' }}>
            {[['xs',4],['sm',8],['md',12],['lg',18],['xl',28],['pill',999]].map(([t,v]) => (
              <div key={t} style={{ textAlign: 'center' }}>
                <div style={{
                  width: 68, height: 68, background: 'var(--pw-blue-100)',
                  border: '2px solid var(--pw-blue-600)', borderRadius: v === 999 ? 999 : v,
                }}/>
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--pw-slate)', marginTop: 8, letterSpacing: 1 }}>
                  {t.toUpperCase()} · {v === 999 ? '∞' : v}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: '#fff', border: '1px solid var(--pw-fog)', borderRadius: 18, padding: 32 }}>
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--pw-blue-600)', marginBottom: 8 }}>5.3 · SHADOWS</div>
          <div style={{ fontFamily: 'var(--f-display)', fontSize: 20, fontWeight: 600, marginBottom: 20 }}>Verhoging</div>
          <div style={{ display: 'flex', gap: 20 }}>
            {[['sh-1','var(--sh-1)','Subtle'],['sh-2','var(--sh-2)','Card'],['sh-3','var(--sh-3)','Floating'],['sh-blue','var(--sh-blue)','Brand']].map(([t,sh,l]) => (
              <div key={t} style={{ textAlign: 'center' }}>
                <div style={{
                  width: 68, height: 68, background: '#fff', borderRadius: 12, boxShadow: sh,
                }}/>
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--pw-slate)', marginTop: 10, letterSpacing: 1 }}>
                  {l.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Component samples */}
    <div style={{ padding: '32px 64px 96px' }}>
      <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--pw-blue-600)', marginBottom: 20 }}>
        5.4 · BOUWSTENEN
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
        {/* Buttons */}
        <div style={{ background: '#fff', border: '1px solid var(--pw-fog)', borderRadius: 18, padding: 28 }}>
          <div style={{ fontFamily: 'var(--f-display)', fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Knoppen</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
            <button style={{ background: 'var(--pw-blue-600)', color: '#fff', border: 0, padding: '12px 22px', borderRadius: 999, fontFamily: 'var(--f-body)', fontWeight: 600, fontSize: 14, boxShadow: 'var(--sh-blue)', cursor: 'pointer' }}>Boek een reiniging</button>
            <button style={{ background: 'var(--pw-ink)', color: '#fff', border: 0, padding: '12px 22px', borderRadius: 999, fontFamily: 'var(--f-body)', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>Secondary</button>
            <button style={{ background: 'transparent', color: 'var(--pw-blue-600)', border: '1.5px solid var(--pw-blue-600)', padding: '10.5px 22px', borderRadius: 999, fontFamily: 'var(--f-body)', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>Ghost</button>
            <button style={{ background: 'transparent', color: 'var(--pw-blue-600)', border: 0, padding: '8px 4px', fontFamily: 'var(--f-body)', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>Tekst-link →</button>
          </div>
        </div>
        {/* Card */}
        <div style={{ background: '#fff', border: '1px solid var(--pw-fog)', borderRadius: 18, padding: 28 }}>
          <div style={{ fontFamily: 'var(--f-display)', fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Dienst-kaart</div>
          <div style={{ background: 'var(--pw-paper)', border: '1px solid var(--pw-fog)', borderRadius: 14, padding: 20 }}>
            <div style={{ width: 48, height: 48, background: 'var(--pw-blue-100)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PWIcons.Interior size={28} stroke="var(--pw-blue-600)"/>
            </div>
            <div style={{ fontFamily: 'var(--f-display)', fontSize: 18, fontWeight: 600, marginTop: 14 }}>Intense detail</div>
            <div style={{ fontFamily: 'var(--f-body)', fontSize: 13, color: 'var(--pw-graphite)', lineHeight: 1.55, marginTop: 6 }}>
              Complete buitenwas + volledige interieurreiniging.
            </div>
            <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'var(--f-display)', fontSize: 20, fontWeight: 700, color: 'var(--pw-blue-600)' }}>€185</span>
              <span style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--pw-slate)', letterSpacing: 1 }}>VANAF</span>
            </div>
          </div>
        </div>
        {/* Badges */}
        <div style={{ background: '#fff', border: '1px solid var(--pw-fog)', borderRadius: 18, padding: 28 }}>
          <div style={{ fontFamily: 'var(--f-display)', fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Badges</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {[
              ['Nieuw','var(--pw-blue-600)','#fff'],
              ['Gepland','var(--pw-blue-100)','var(--pw-blue-700)'],
              ['Showroomklaar','var(--pw-signal)','#fff'],
              ['Wachtlijst','var(--pw-alert)','#fff'],
              ['Proefbeurt','var(--pw-ink)','#fff'],
            ].map(([t,b,c]) => (
              <span key={t} style={{ background: b, color: c, padding: '6px 12px', borderRadius: 999, fontFamily: 'var(--f-body)', fontWeight: 600, fontSize: 12 }}>{t}</span>
            ))}
          </div>
          <div style={{ fontFamily: 'var(--f-display)', fontSize: 16, fontWeight: 600, marginTop: 24, marginBottom: 12 }}>Input</div>
          <input placeholder="jouw@email.be" style={{
            width: '100%', padding: '12px 16px', border: '1.5px solid var(--pw-fog)', borderRadius: 10,
            fontFamily: 'var(--f-body)', fontSize: 14, outline: 'none',
          }}/>
        </div>
      </div>
    </div>
  </section>
);

window.BG_IconSection = IconSection;
window.BG_SpacingSection = SpacingSection;
