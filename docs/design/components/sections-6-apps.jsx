// Park&Wash — Applications section (brand in use)

const AppSection = () => (
  <section>
    <BG_SectionHead num={6} kicker="Toepassingen" title="Het merk in het wild.">
      Hoe Park&amp;Wash leeft op voertuigen, kleding, drukwerk en social. Voorbeelden, geen
      verplichtingen — volg de regels, blijf consistent.
    </BG_SectionHead>

    {/* Van */}
    <div style={{ padding: '32px 64px 32px' }}>
      <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--pw-blue-600)', marginBottom: 20 }}>
        6.1 · VOERTUIG-BELETTERING
      </div>
      <div style={{ background: 'linear-gradient(180deg, #E8F1FD 0%, #FFF 80%)', borderRadius: 18, padding: 64, position: 'relative', overflow: 'hidden' }}>
        {/* road */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 80, height: 2, background: 'var(--pw-mist)' }}/>
        {/* SVG van */}
        <svg viewBox="0 0 900 360" style={{ width: '100%', maxWidth: 900, display: 'block', margin: '0 auto' }}>
          {/* shadow */}
          <ellipse cx="440" cy="310" rx="370" ry="10" fill="#0A1B2E" opacity=".08"/>
          {/* body */}
          <path d="M80 260 L 80 150 Q 80 120 110 110 L 280 80 Q 320 72 360 72 L 760 72 Q 800 72 800 112 L 800 260 Z" fill="#FFFFFF" stroke="#0A1B2E" strokeWidth="3"/>
          {/* windows */}
          <path d="M130 150 L 290 110 L 290 150 Z" fill="#0A1B2E" opacity=".85"/>
          <rect x="310" y="100" width="120" height="55" fill="#0A1B2E" opacity=".85" rx="4"/>
          <rect x="450" y="100" width="120" height="55" fill="#0A1B2E" opacity=".85" rx="4"/>
          <rect x="590" y="100" width="160" height="55" fill="#0A1B2E" opacity=".85" rx="4"/>
          {/* side panel fill (brand blue) */}
          <path d="M80 180 L 80 260 L 800 260 L 800 180 Z" fill="#1A73E8"/>
          {/* wordmark on van */}
          <g transform="translate(190, 200)">
            <rect x="0" y="0" width="52" height="52" rx="11" fill="#FFFFFF"/>
            <path d="M26 12 C 19 22, 15 28, 15 33 a 11 11 0 0 0 22 0 C 37 28, 33 22, 26 12Z" fill="#1A73E8"/>
            <text x="70" y="36" fontFamily="Poppins" fontWeight="800" fontSize="34" fill="#FFFFFF" letterSpacing="-1">Park&amp;Wash</text>
            <text x="70" y="54" fontFamily="Montserrat" fontWeight="500" fontSize="11" fill="#FFFFFF" opacity=".8" letterSpacing="2">
              MOBIELE DETAILING · OOST-VLAANDEREN
            </text>
          </g>
          {/* phone on rear */}
          <text x="720" y="230" fontFamily="Montserrat" fontWeight="700" fontSize="16" fill="#FFFFFF" textAnchor="end">+32 468 41 15 93</text>
          {/* wheels */}
          <circle cx="220" cy="275" r="38" fill="#0A1B2E"/>
          <circle cx="220" cy="275" r="16" fill="#3A4555"/>
          <circle cx="680" cy="275" r="38" fill="#0A1B2E"/>
          <circle cx="680" cy="275" r="16" fill="#3A4555"/>
          {/* light */}
          <rect x="780" y="180" width="18" height="10" fill="#E8733B" rx="2"/>
        </svg>
        <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--pw-slate)', letterSpacing: 2, textAlign: 'center', marginTop: 12 }}>
          TOEPASSING · WERKBUS · RENAULT TRAFIC / VW TRANSPORTER
        </div>
      </div>
    </div>

    {/* Business card + Polo */}
    <div style={{ padding: '32px 64px 32px', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24 }}>
      {/* Business card — front & back */}
      <div style={{ background: 'var(--pw-cloud)', borderRadius: 18, padding: 48 }}>
        <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--pw-blue-600)', marginBottom: 20 }}>
          6.2 · VISITEKAARTJE · 85×55mm
        </div>
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center' }}>
          {/* front */}
          <div style={{
            width: 340, height: 220, background: 'var(--pw-blue-950)', color: '#fff',
            borderRadius: 10, padding: 24, boxShadow: 'var(--sh-3)', position: 'relative', overflow: 'hidden',
          }}>
            <div aria-hidden style={{
              position: 'absolute', right: -20, top: -40, fontFamily: 'Poppins', fontWeight: 800, fontSize: 220,
              color: 'var(--pw-blue-800)', opacity: .5, letterSpacing: '-10px', lineHeight: .8,
            }}>&amp;</div>
            <div style={{ position: 'relative' }}>
              <MonoDroplet size={40} bg="#1A73E8" fg="#fff"/>
              <div style={{ position: 'absolute', bottom: 0, right: 0, fontFamily: 'var(--f-mono)', fontSize: 9, letterSpacing: 2, opacity: .6 }}>V.01</div>
            </div>
            <div style={{ position: 'absolute', bottom: 24, left: 24 }}>
              <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 32, letterSpacing: '-1px' }}>Park<span style={{color:'#6AA9F2'}}>&amp;</span>Wash</div>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, opacity: .7, letterSpacing: 2, marginTop: 6 }}>MOBIELE DETAILING</div>
            </div>
          </div>
          {/* back */}
          <div style={{
            width: 340, height: 220, background: '#fff', borderRadius: 10, padding: 24,
            boxShadow: 'var(--sh-3)', border: '1px solid var(--pw-fog)', position: 'relative',
          }}>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--pw-blue-600)', letterSpacing: 2 }}>LOUAY LAHDHIRI</div>
            <div style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 22, marginTop: 4, letterSpacing: '-.5px' }}>Oprichter &amp; detailer</div>
            <div style={{ height: 1, background: 'var(--pw-fog)', margin: '18px 0' }}/>
            <div style={{ fontFamily: 'var(--f-body)', fontSize: 12, color: 'var(--pw-graphite)', lineHeight: 1.7 }}>
              <div>+32 468 41 15 93</div>
              <div>lahdhirilouay21@gmail.com</div>
              <div style={{ marginTop: 8, color: 'var(--pw-slate)' }}>Werkgebied · Oost-Vlaanderen</div>
            </div>
            <div style={{ position: 'absolute', bottom: 16, right: 16 }}>
              <Wordmark height={20}/>
            </div>
          </div>
        </div>
      </div>

      {/* Polo / uniform */}
      <div style={{ background: '#fff', border: '1px solid var(--pw-fog)', borderRadius: 18, padding: 40 }}>
        <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--pw-blue-600)', marginBottom: 20 }}>
          6.3 · WERKKLEDING
        </div>
        <svg viewBox="0 0 280 340" style={{ width: '100%', maxHeight: 320, display: 'block', margin: '0 auto' }}>
          {/* polo shape */}
          <path d="M60 80 L 100 40 L 120 60 Q 140 75 160 60 L 180 40 L 220 80 L 240 120 L 220 140 L 220 310 L 60 310 L 60 140 L 40 120 Z"
                fill="#0A1B2E"/>
          {/* collar */}
          <path d="M120 60 L 140 85 L 160 60 L 155 55 L 140 70 L 125 55 Z" fill="#14365C"/>
          <path d="M140 70 L 140 110" stroke="#14365C" strokeWidth="2"/>
          {/* chest logo */}
          <g transform="translate(160, 130)">
            <rect width="36" height="36" rx="8" fill="#1A73E8"/>
            <path d="M18 9 C 13 17, 10 22, 10 25 a 8 8 0 0 0 16 0 C 26 22, 23 17, 18 9Z" fill="#fff"/>
          </g>
          {/* tag bottom */}
          <text x="140" y="290" fontFamily="Montserrat" fontWeight="700" fontSize="11" fill="#6AA9F2" letterSpacing="3" textAnchor="middle">PARK&amp;WASH · CREW</text>
        </svg>
        <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--pw-slate)', letterSpacing: 2, textAlign: 'center', marginTop: 12 }}>
          NAVY POLO · DROPLET LINKS BORST
        </div>
      </div>
    </div>

    {/* Social */}
    <div style={{ padding: '32px 64px 32px' }}>
      <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--pw-blue-600)', marginBottom: 20 }}>
        6.4 · SOCIAL MEDIA
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {/* Instagram post 1 — quote */}
        <div style={{ background: 'var(--pw-blue-600)', aspectRatio: '1/1', borderRadius: 14, padding: 32, color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
          <MonoDroplet size={36} bg="rgba(255,255,255,.18)" fg="#fff"/>
          <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 42, lineHeight: 1, letterSpacing: '-1.5px' }}>
            Jij geeft<br/>de sleutel.
          </div>
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, opacity: .7, letterSpacing: 2 }}>@PARKANDWASH · BOEK VIA LINK</div>
        </div>
        {/* post 2 — before/after placeholder */}
        <div style={{ aspectRatio: '1/1', borderRadius: 14, overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 1fr', background: '#fff', border: '1px solid var(--pw-fog)' }}>
          <div style={{ background: 'repeating-linear-gradient(45deg, var(--pw-mist), var(--pw-mist) 8px, var(--pw-fog) 8px, var(--pw-fog) 16px)', display: 'flex', alignItems: 'end', padding: 14 }}>
            <span style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--pw-ink)', background: '#fff', padding: '4px 10px', borderRadius: 99, letterSpacing: 2 }}>VOOR</span>
          </div>
          <div style={{ background: 'repeating-linear-gradient(45deg, var(--pw-blue-200), var(--pw-blue-200) 8px, var(--pw-blue-100) 8px, var(--pw-blue-100) 16px)', display: 'flex', alignItems: 'end', padding: 14, justifyContent: 'flex-end' }}>
            <span style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--pw-blue-700)', background: '#fff', padding: '4px 10px', borderRadius: 99, letterSpacing: 2 }}>NA</span>
          </div>
        </div>
        {/* post 3 — price */}
        <div style={{ background: 'var(--pw-blue-950)', aspectRatio: '1/1', borderRadius: 14, padding: 32, color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, opacity: .7, letterSpacing: 3 }}>PAKKET · BASIC DETAIL</div>
          <div>
            <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 88, lineHeight: .9, letterSpacing: '-3px' }}>€135</div>
            <div style={{ fontFamily: 'var(--f-body)', fontSize: 13, opacity: .8, marginTop: 8 }}>Handwas, velgen, banden, drogen, afwerking.</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Wordmark height={16} color="#fff" accent="#6AA9F2"/>
            <span style={{ fontFamily: 'var(--f-mono)', fontSize: 9, opacity: .6, letterSpacing: 2 }}>PARKANDWASH.BE</span>
          </div>
        </div>
      </div>
    </div>

    {/* Web header + Mobile UI */}
    <div style={{ padding: '32px 64px 96px' }}>
      <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--pw-blue-600)', marginBottom: 20 }}>
        6.5 · DIGITAAL
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        {/* Browser window */}
        <div style={{ background: 'var(--pw-cloud)', borderRadius: 16, padding: 24 }}>
          <div style={{
            background: '#fff', borderRadius: 10, overflow: 'hidden', boxShadow: 'var(--sh-2)',
          }}>
            <div style={{ background: 'var(--pw-fog)', padding: '10px 14px', display: 'flex', gap: 6, alignItems: 'center' }}>
              <span style={{ width: 10, height: 10, borderRadius: 99, background: '#E8733B' }}/>
              <span style={{ width: 10, height: 10, borderRadius: 99, background: '#EAC15C' }}/>
              <span style={{ width: 10, height: 10, borderRadius: 99, background: '#2EC27E' }}/>
              <div style={{ flex: 1, background: '#fff', borderRadius: 99, padding: '4px 12px', fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--pw-slate)', marginLeft: 12 }}>
                parkandwash.be
              </div>
            </div>
            {/* site */}
            <div style={{ padding: '18px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--pw-fog)' }}>
              <Lockup height={40}/>
              <div style={{ display: 'flex', gap: 24, fontFamily: 'var(--f-body)', fontSize: 13, fontWeight: 500, color: 'var(--pw-ink)' }}>
                <span>Diensten</span><span>Prijzen</span><span>Over</span><span>Contact</span>
                <span style={{ background: 'var(--pw-blue-600)', color: '#fff', padding: '6px 14px', borderRadius: 99 }}>Boek</span>
              </div>
            </div>
            <div style={{ padding: '48px 28px 40px', background: 'linear-gradient(180deg, #F4F8FE 0%, #FFF 100%)' }}>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--pw-blue-600)', letterSpacing: 3 }}>MOBIELE AUTOREINIGING</div>
              <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 56, lineHeight: 1, letterSpacing: '-2px', marginTop: 12, maxWidth: 560 }}>
                Jij geeft de sleutel.<br/>Wij geven showroom.
              </div>
              <div style={{ fontFamily: 'var(--f-body)', fontSize: 14, color: 'var(--pw-graphite)', marginTop: 14, maxWidth: 460, lineHeight: 1.6 }}>
                Mobiele buiten- en interieurreiniging voor particulieren en bedrijven in Oost-Vlaanderen.
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
                <span style={{ background: 'var(--pw-blue-600)', color: '#fff', padding: '10px 18px', borderRadius: 99, fontFamily: 'var(--f-body)', fontWeight: 600, fontSize: 13 }}>Boek reiniging</span>
                <span style={{ background: '#fff', color: 'var(--pw-ink)', border: '1.5px solid var(--pw-fog)', padding: '8.5px 18px', borderRadius: 99, fontFamily: 'var(--f-body)', fontWeight: 600, fontSize: 13 }}>Vraag proefbeurt</span>
              </div>
            </div>
          </div>
        </div>

        {/* Phone mockup */}
        <div style={{ background: 'var(--pw-blue-950)', borderRadius: 16, padding: 24, display: 'flex', justifyContent: 'center' }}>
          <div style={{
            width: 240, height: 470, background: '#0B1220', borderRadius: 36, padding: 8, boxShadow: '0 20px 40px rgba(0,0,0,.4)',
          }}>
            <div style={{ background: 'var(--pw-blue-50)', borderRadius: 28, height: '100%', overflow: 'hidden', position: 'relative' }}>
              {/* notch */}
              <div style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', width: 80, height: 18, background: '#0B1220', borderRadius: 99 }}/>
              <div style={{ padding: '40px 20px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <MonoDroplet size={32}/>
                  <div style={{ width: 28, height: 28, background: 'var(--pw-blue-100)', borderRadius: 99 }}/>
                </div>
                <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 22, marginTop: 20, lineHeight: 1.15, letterSpacing: '-.5px' }}>
                  Boek jouw<br/>reiniging
                </div>
                <div style={{ marginTop: 16, background: '#fff', borderRadius: 14, padding: 14, boxShadow: 'var(--sh-1)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <PWIcons.FullClean size={24} stroke="var(--pw-blue-600)"/>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'var(--f-body)', fontSize: 12, fontWeight: 600 }}>Basic detail</div>
                      <div style={{ fontFamily: 'var(--f-mono)', fontSize: 9, color: 'var(--pw-slate)' }}>±2u · aan huis</div>
                    </div>
                    <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 14, color: 'var(--pw-blue-600)' }}>€135</div>
                  </div>
                </div>
                <div style={{ marginTop: 10, background: '#fff', borderRadius: 14, padding: 14, boxShadow: 'var(--sh-1)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <PWIcons.Interior size={24} stroke="var(--pw-blue-600)"/>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'var(--f-body)', fontSize: 12, fontWeight: 600 }}>Intense detail</div>
                      <div style={{ fontFamily: 'var(--f-mono)', fontSize: 9, color: 'var(--pw-slate)' }}>±4u · aan huis</div>
                    </div>
                    <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 14, color: 'var(--pw-blue-600)' }}>€185</div>
                  </div>
                </div>
                <div style={{ marginTop: 18, background: 'var(--pw-blue-600)', color: '#fff', borderRadius: 99, padding: '10px 14px', textAlign: 'center', fontFamily: 'var(--f-body)', fontSize: 12, fontWeight: 600 }}>
                  Verder →
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Footer / colophon
const Colophon = () => (
  <footer style={{
    background: 'var(--pw-blue-950)', color: '#fff', padding: '80px 64px 48px', position: 'relative', overflow: 'hidden',
  }}>
    <div aria-hidden style={{
      position: 'absolute', right: -60, bottom: -80, fontFamily: 'Poppins', fontWeight: 800,
      fontSize: 360, color: 'var(--pw-blue-800)', opacity: .35, letterSpacing: '-18px', lineHeight: .8,
    }}>P&amp;W</div>
    <div style={{ position: 'relative' }}>
      <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: 3, color: 'var(--pw-blue-400)' }}>COLOFON</div>
      <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 72, lineHeight: 1, letterSpacing: '-2px', marginTop: 12, maxWidth: 720 }}>
        Dit is Park<span style={{color:'var(--pw-blue-400)'}}>&amp;</span>Wash.
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, marginTop: 64, maxWidth: 1000 }}>
        <div>
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: 2, opacity: .6 }}>CONTACT</div>
          <div style={{ fontFamily: 'var(--f-body)', fontSize: 14, lineHeight: 1.7, marginTop: 10 }}>
            +32 468 41 15 93<br/>
            lahdhirilouay21@gmail.com
          </div>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: 2, opacity: .6 }}>WERKGEBIED</div>
          <div style={{ fontFamily: 'var(--f-body)', fontSize: 14, lineHeight: 1.7, marginTop: 10 }}>
            Oost-Vlaanderen<br/>
            Thuisbasis · Melle
          </div>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: 2, opacity: .6 }}>SYSTEEM</div>
          <div style={{ fontFamily: 'var(--f-body)', fontSize: 14, lineHeight: 1.7, marginTop: 10 }}>
            Brand guidelines v1.0<br/>
            Apr 2026
          </div>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: 2, opacity: .6 }}>FONTS</div>
          <div style={{ fontFamily: 'var(--f-body)', fontSize: 14, lineHeight: 1.7, marginTop: 10 }}>
            Poppins · Display<br/>
            Montserrat · Tekst
          </div>
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,.12)', marginTop: 80, paddingTop: 24, fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: 2, opacity: .5, display: 'flex', justifyContent: 'space-between' }}>
        <span>© 2026 PARK&amp;WASH — MOBIELE DETAILING</span>
        <span>JIJ GEEFT DE SLEUTEL. WIJ GEVEN SHOWROOM.</span>
      </div>
    </div>
  </footer>
);

window.BG_AppSection = AppSection;
window.BG_Colophon = Colophon;
