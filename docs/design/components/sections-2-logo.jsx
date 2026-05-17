// Park&Wash — Logo section

const LogoTile = ({ bg, children, label, sub }) => (
  <div>
    <div style={{
      background: bg, borderRadius: 18, padding: 48, height: 260,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      border: bg === '#FFFFFF' ? '1px solid var(--pw-fog)' : 'none',
    }}>{children}</div>
    <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--pw-slate)', letterSpacing: 1 }}>
      <span>{label}</span><span>{sub}</span>
    </div>
  </div>
);

const LogoSection = () => (
  <section>
    <BG_SectionHead num={1} kicker="Logo-systeem" title="Eén merk, meerdere stemmen.">
      Het badge-logo blijft ons primaire embleem — voor voertuigen, drukwerk, uithangborden.
      Daarnaast werken we met drie functionele varianten voor web, apps, en compacte ruimtes.
    </BG_SectionHead>

    {/* Primary badge — the provided logo */}
    <div style={{ padding: '32px 64px 64px' }}>
      <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--pw-blue-600)', marginBottom: 20 }}>
        1.1 · PRIMAIR EMBLEEM
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 32 }}>
        <div style={{
          background: 'var(--pw-white)', borderRadius: 18, padding: 48, minHeight: 520,
          border: '1px solid var(--pw-fog)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
        }}>
          <PWBadgeLogo size={440}/>
          <div style={{
            position: 'absolute', top: 20, left: 20, fontFamily: 'var(--f-mono)', fontSize: 10,
            color: 'var(--pw-slate)', letterSpacing: 2,
          }}>PRIMARY · SVG · FULL COLOR</div>
          <div style={{
            position: 'absolute', top: 20, right: 20, fontFamily: 'var(--f-mono)', fontSize: 10,
            color: 'var(--pw-blue-600)', letterSpacing: 2,
          }}>VECTOR · ∞</div>
        </div>
        <div style={{ background: 'var(--pw-blue-50)', borderRadius: 18, padding: 40 }}>
          <div style={{ fontFamily: 'var(--f-display)', fontSize: 28, fontWeight: 600, letterSpacing: '-.5px', marginBottom: 16 }}>
            Het embleem
          </div>
          <p style={{ fontFamily: 'var(--f-body)', fontSize: 14, color: 'var(--pw-graphite)', lineHeight: 1.7 }}>
            Het primaire logo combineert onze tools (borstel, spuitgun, sprayfles), het voertuig,
            en de wash-ster — alles binnen een zegelvorm die vakmanschap en vertrouwen uitstraalt.
          </p>
          <div style={{ height: 1, background: 'var(--pw-blue-200)', margin: '24px 0' }}/>
          <dl style={{ fontFamily: 'var(--f-mono)', fontSize: 12, color: 'var(--pw-graphite)', display: 'grid', gap: 8, margin: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><dt>Min. grootte print</dt><dd style={{margin:0}}>24mm</dd></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><dt>Min. grootte scherm</dt><dd style={{margin:0}}>96px</dd></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><dt>Vrije ruimte</dt><dd style={{margin:0}}>½ hoogte badge</dd></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><dt>Gebruik</dt><dd style={{margin:0}}>Voertuig, gevel, print</dd></div>
          </dl>
        </div>
      </div>
    </div>

    {/* SVG COMPARISON — reverse-engineered */}
    <div style={{ padding: '0 64px 48px' }}>
      <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--pw-blue-600)', marginBottom: 20 }}>
        1.2 · SVG RECONSTRUCTIE · ORIGINEEL → VECTOR
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
        <div style={{ background: '#fff', borderRadius: 18, padding: 32, border: '1px solid var(--pw-fog)', textAlign: 'center' }}>
          <img src="assets/logo-source.png" alt="PNG source" style={{ maxHeight: 280, width: 'auto' }}/>
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: 2, color: 'var(--pw-slate)', marginTop: 16 }}>ORIGINEEL · PNG · 1024×1536</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 18, padding: 32, border: '1px solid var(--pw-fog)', textAlign: 'center' }}>
          <PWBadgeLogo size={260}/>
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: 2, color: 'var(--pw-blue-600)', marginTop: 16 }}>VECTOR · SVG · SCHAALBAAR ∞</div>
        </div>
        <div style={{ background: 'var(--pw-blue-950)', borderRadius: 18, padding: 32, textAlign: 'center', color: '#fff' }}>
          <div style={{ fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 22, marginBottom: 16, letterSpacing: '-.5px' }}>
            Wat is gewonnen
          </div>
          <ul style={{ textAlign: 'left', fontFamily: 'var(--f-body)', fontSize: 13, lineHeight: 1.9, padding: 0, listStyle: 'none', margin: 0, opacity: .85 }}>
            <li>✓ Scherp op elk formaat</li>
            <li>✓ Kleine bestandsgrootte (~7 KB)</li>
            <li>✓ Individuele elementen bewerkbaar</li>
            <li>✓ Kleuren volgen brand tokens</li>
            <li>✓ Werkt op dark én light bg</li>
          </ul>
          <a href="assets/park-and-wash-logo.svg" download style={{
            display: 'inline-block', marginTop: 20, padding: '10px 20px',
            background: 'var(--pw-blue-600)', color: '#fff', borderRadius: 999,
            fontFamily: 'var(--f-body)', fontSize: 13, fontWeight: 600, textDecoration: 'none',
          }}>Download .svg ↓</a>
        </div>
      </div>
    </div>

    {/* Variants */}
    <div style={{ padding: '32px 64px 64px' }}>
      <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--pw-blue-600)', marginBottom: 20 }}>
        1.3 · VARIANTEN — DIGITAAL & SECUNDAIR
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        <LogoTile bg="#FFFFFF" label="Horizontal lockup" sub="Web header · e-mail">
          <Lockup height={64}/>
        </LogoTile>
        <LogoTile bg="var(--pw-blue-950)" label="Wordmark — dark" sub="Footers · dark mode">
          <Wordmark height={56} color="#FFFFFF" accent="#6AA9F2"/>
        </LogoTile>
        <LogoTile bg="#FFFFFF" label="Wordmark — light" sub="Documenten">
          <Wordmark height={56}/>
        </LogoTile>
        <LogoTile bg="var(--pw-blue-600)" label="Droplet — op blauw" sub="App icon · social">
          <MonoDroplet size={140} bg="#1A73E8" fg="#FFFFFF"/>
        </LogoTile>
        <LogoTile bg="var(--pw-blue-950)" label="Monogram — P&W" sub="Favicon · signature">
          <MonoLetters size={140}/>
        </LogoTile>
        <LogoTile bg="var(--pw-cloud)" label="Droplet — solid" sub="Watermark">
          <MonoDroplet size={140} bg="#0A1B2E" fg="#FFFFFF"/>
        </LogoTile>
      </div>
    </div>

    {/* Clear space + construction */}
    <div style={{ padding: '32px 64px 64px' }}>
      <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--pw-blue-600)', marginBottom: 20 }}>
        1.4 · CONSTRUCTIE & VRIJE RUIMTE
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ background: '#fff', border: '1px solid var(--pw-fog)', borderRadius: 18, padding: 40, position: 'relative' }}>
          {/* Clear space diagram */}
          <svg viewBox="0 0 400 260" style={{ width: '100%', height: 220 }}>
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E4E8EE" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="400" height="260" fill="url(#grid)"/>
            {/* inner clear-space box */}
            <rect x="80" y="40" width="240" height="180" fill="none" stroke="#1A73E8" strokeDasharray="4 4" strokeWidth="1.5"/>
            <rect x="120" y="80" width="160" height="100" fill="none" stroke="#0A1B2E" strokeWidth="1.5"/>
            {/* logo block placeholder */}
            <g transform="translate(140, 100)">
              <rect width="40" height="40" rx="8" fill="#1A73E8"/>
              <path d="M20 10 C 14 20, 11 26, 11 30 a 9 9 0 0 0 18 0 C 29 26, 26 20, 20 10Z" fill="#fff"/>
            </g>
            <text x="195" y="128" fontFamily="Poppins" fontSize="18" fontWeight="700" fill="#0A1B2E">Park&amp;Wash</text>
            {/* X labels */}
            <text x="105" y="35" fontFamily="ui-monospace" fontSize="10" fill="#1A73E8">X</text>
            <text x="105" y="235" fontFamily="ui-monospace" fontSize="10" fill="#1A73E8">X</text>
            <text x="65" y="135" fontFamily="ui-monospace" fontSize="10" fill="#1A73E8">X</text>
            <text x="330" y="135" fontFamily="ui-monospace" fontSize="10" fill="#1A73E8">X</text>
          </svg>
          <div style={{ fontFamily: 'var(--f-display)', fontSize: 20, fontWeight: 600, marginTop: 8 }}>Vrije ruimte = X</div>
          <p style={{ fontFamily: 'var(--f-body)', fontSize: 14, color: 'var(--pw-graphite)', lineHeight: 1.6 }}>
            X is gelijk aan de hoogte van de droplet-vorm. Geen andere elementen binnen deze zone.
          </p>
        </div>
        <div style={{ background: '#fff', border: '1px solid var(--pw-fog)', borderRadius: 18, padding: 40 }}>
          <div style={{ fontFamily: 'var(--f-display)', fontSize: 20, fontWeight: 600, marginBottom: 20 }}>Minimum formaten</div>
          <div style={{ display: 'flex', alignItems: 'end', gap: 32, justifyContent: 'center', padding: '20px 0 30px', borderBottom: '1px dashed var(--pw-fog)' }}>
            <div style={{ textAlign: 'center' }}>
              <Lockup height={24}/>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--pw-slate)', marginTop: 8 }}>24px · min</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Lockup height={40}/>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--pw-slate)', marginTop: 8 }}>40px</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Lockup height={72}/>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--pw-slate)', marginTop: 8 }}>72px · ideaal</div>
            </div>
          </div>
          <div style={{ marginTop: 20, fontFamily: 'var(--f-mono)', fontSize: 12, color: 'var(--pw-graphite)', lineHeight: 1.8 }}>
            ↳ Print: nooit onder 24mm breedte<br/>
            ↳ Gevel: minimaal 180mm hoog<br/>
            ↳ Voertuig-sticker: 400mm breed aanbevolen
          </div>
        </div>
      </div>
    </div>

    {/* Don'ts */}
    <div style={{ padding: '32px 64px 96px' }}>
      <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--pw-blue-600)', marginBottom: 20 }}>
        1.5 · NIET DOEN
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {[
          { t: 'Niet rekken', sx: 'scaleX(1.5)' },
          { t: 'Niet roteren', sx: 'rotate(-12deg)' },
          { t: 'Niet omlijnen', extra: 'outline' },
          { t: 'Niet herkleuren', extra: 'recolor' },
        ].map((v, i) => (
          <div key={i} style={{ background: 'var(--pw-cloud)', borderRadius: 14, padding: 24, textAlign: 'center' }}>
            <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: v.sx || 'none' }}>
              {v.extra === 'outline' ? (
                <div style={{ padding: 6, border: '2px solid #E8733B' }}><MonoDroplet size={70}/></div>
              ) : v.extra === 'recolor' ? (
                <MonoDroplet size={80} bg="#E8733B" fg="#fff"/>
              ) : (
                <MonoDroplet size={80}/>
              )}
            </div>
            <div style={{ marginTop: 16, fontFamily: 'var(--f-body)', fontSize: 13, fontWeight: 600, color: 'var(--pw-alert)' }}>✕ {v.t}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

window.BG_LogoSection = LogoSection;
