// Park&Wash — Typography section

const TypeSection = () => (
  <section>
    <BG_SectionHead num={3} kicker="Typografie" title="Poppins & Montserrat.">
      Poppins voor displays, koppen en merkmomenten — rond, zelfverzekerd, modern.
      Montserrat voor body, UI en lange tekst — helder en leesbaar.
    </BG_SectionHead>

    {/* Poppins specimen */}
    <div style={{ padding: '32px 64px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 48, alignItems: 'start' }}>
        <div>
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--pw-blue-600)' }}>3.1</div>
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--pw-slate)', marginTop: 6 }}>DISPLAY</div>
        </div>
        <div>
          <div style={{
            fontFamily: 'Poppins', fontWeight: 800, fontSize: 220, lineHeight: .9,
            letterSpacing: '-8px', color: 'var(--pw-ink)',
          }}>Aa</div>
          <div style={{ display: 'flex', gap: 48, marginTop: 16, fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--pw-slate)', letterSpacing: 1 }}>
            <span>POPPINS</span>
            <span>400 · 500 · 600 · 700 · 800</span>
            <span>GOOGLE FONTS</span>
          </div>
          <div style={{ marginTop: 40, display: 'grid', gap: 8 }}>
            {[
              { w:400, size: 34, t:'Showroomklare reiniging.' },
              { w:500, size: 34, t:'Mobiel bij jou thuis.' },
              { w:600, size: 34, t:'Transparant geprijsd.' },
              { w:800, size: 34, t:'Park&Wash.' },
            ].map((v,i)=>(
              <div key={i} style={{
                fontFamily: 'Poppins', fontWeight: v.w, fontSize: v.size, letterSpacing: '-1px',
                paddingBottom: 14, borderBottom: '1px solid var(--pw-fog)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
              }}>
                <span>{v.t}</span>
                <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--pw-slate)', letterSpacing: 1 }}>{v.w}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Montserrat specimen */}
    <div style={{ padding: '32px 64px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 48, alignItems: 'start' }}>
        <div>
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--pw-blue-600)' }}>3.2</div>
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--pw-slate)', marginTop: 6 }}>TEKST & UI</div>
        </div>
        <div>
          <div style={{
            fontFamily: 'Montserrat', fontWeight: 500, fontSize: 220, lineHeight: .9,
            letterSpacing: '-6px', color: 'var(--pw-blue-600)',
          }}>Rr</div>
          <div style={{ display: 'flex', gap: 48, marginTop: 16, fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--pw-slate)', letterSpacing: 1 }}>
            <span>MONTSERRAT</span>
            <span>400 · 500 · 600 · 700</span>
            <span>GOOGLE FONTS</span>
          </div>
          <p style={{
            fontFamily: 'Montserrat', fontWeight: 400, fontSize: 20, lineHeight: 1.55,
            color: 'var(--pw-graphite)', marginTop: 40, maxWidth: 720,
          }}>
            Park&amp;Wash is een mobiele reinigingsdienst uit Melle. Wij reinigen voertuigen
            voor particulieren én bedrijven, aan huis of op locatie. Dankzij onze flexibele
            planning en transparante prijzen bespaar jij tijd en krijg je een auto die er
            weer als nieuw uitziet.
          </p>
        </div>
      </div>
    </div>

    {/* Type scale */}
    <div style={{ padding: '48px 64px 32px' }}>
      <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--pw-blue-600)', marginBottom: 20 }}>
        3.3 · TYPE-SCHAAL
      </div>
      <div style={{ background: '#fff', border: '1px solid var(--pw-fog)', borderRadius: 18, overflow: 'hidden' }}>
        {[
          { name: 'Display XL', font: 'Poppins', w: 800, size: 80, lh: .95, ls: '-2px', sample: 'Jij geeft de sleutel.' },
          { name: 'Display', font: 'Poppins', w: 700, size: 56, lh: 1, ls: '-1.5px', sample: 'Showroomklare auto.' },
          { name: 'Heading 1', font: 'Poppins', w: 700, size: 40, lh: 1.1, ls: '-1px', sample: 'Mobiele detailing' },
          { name: 'Heading 2', font: 'Poppins', w: 600, size: 28, lh: 1.2, ls: '-.5px', sample: 'Pakketten & prijzen' },
          { name: 'Heading 3', font: 'Poppins', w: 600, size: 20, lh: 1.3, ls: '-.2px', sample: 'Basic detail vanaf €135' },
          { name: 'Body L', font: 'Montserrat', w: 400, size: 18, lh: 1.55, ls: '0', sample: 'Wij komen ter plaatse of halen de wagen op.' },
          { name: 'Body', font: 'Montserrat', w: 400, size: 15, lh: 1.6, ls: '0', sample: 'Transparante prijzen en flexibele planning.' },
          { name: 'Caption', font: 'Montserrat', w: 500, size: 13, lh: 1.5, ls: '.2px', sample: 'Proefbeurt mogelijk — vraag aan.' },
          { name: 'Mono', font: 'ui-monospace', w: 400, size: 12, lh: 1.5, ls: '1.5px', sample: 'PWASH · 001 / 2026' },
        ].map((r,i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '160px 90px 1fr',
            padding: '18px 24px', borderTop: i === 0 ? 'none' : '1px solid var(--pw-fog)',
            alignItems: 'baseline',
          }}>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--pw-slate)', letterSpacing: 1.5 }}>{r.name.toUpperCase()}</div>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--pw-slate)' }}>{r.size}/{Math.round(r.size * r.lh)}</div>
            <div style={{ fontFamily: r.font, fontWeight: r.w, fontSize: r.size, lineHeight: r.lh, letterSpacing: r.ls, color: 'var(--pw-ink)' }}>
              {r.sample}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Alphabet / numerals */}
    <div style={{ padding: '32px 64px 96px' }}>
      <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--pw-blue-600)', marginBottom: 20 }}>
        3.4 · ALFABET & CIJFERS
      </div>
      <div style={{
        background: 'var(--pw-blue-950)', color: '#fff', borderRadius: 18, padding: '40px 48px',
      }}>
        <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 56, letterSpacing: '-1px', lineHeight: 1.2 }}>
          ABCDEFGHIJKLMNOPQRSTUVWXYZ
        </div>
        <div style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: 56, letterSpacing: '-1px', lineHeight: 1.2, opacity: .6, marginTop: 8 }}>
          abcdefghijklmnopqrstuvwxyz
        </div>
        <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 56, letterSpacing: '-1px', lineHeight: 1.2, color: 'var(--pw-blue-400)', marginTop: 16 }}>
          0123456789 &amp; €%+—
        </div>
      </div>
    </div>
  </section>
);

window.BG_TypeSection = TypeSection;
