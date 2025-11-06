'use client'

import { useEffect, useState } from 'react'
import './globals.css'

export default function Home() {
  const [showCookie, setShowCookie] = useState(false)
  const [formMessage, setFormMessage] = useState<{ type: string; text: string } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Cookie consent check
    if (!localStorage.getItem('cookieConsent')) {
      setTimeout(() => setShowCookie(true), 800)
    }

    // Active menu highlighting on scroll
    const links = Array.from(document.querySelectorAll('.menu a')) as HTMLAnchorElement[]
    const ids = links.map(a => document.querySelector(a.getAttribute('href') || ''))

    const onScroll = () => {
      const y = window.scrollY + 120
      let active = 0
      ids.forEach((el, i) => {
        if (el && (el as HTMLElement).offsetTop <= y) active = i
      })
      links.forEach((a, i) => {
        a.style.fontWeight = i === active ? '700' : '500'
      })
    }

    document.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => document.removeEventListener('scroll', onScroll)
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    setShowCookie(false)
    console.log('Cookies accepted')
  }

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined')
    setShowCookie(false)
    console.log('Cookies declined')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormMessage(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      jmeno: formData.get('jmeno'),
      email: formData.get('email'),
      zprava: formData.get('zprava')
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setFormMessage({ type: 'success', text: '✓ Děkujeme! Vaše zpráva byla odeslána.' })
        ;(e.target as HTMLFormElement).reset()
      } else {
        setFormMessage({ type: 'error', text: '✗ Něco se pokazilo. Zkuste to prosím znovu.' })
      }
    } catch (error) {
      console.error('Form error:', error)
      setFormMessage({ type: 'error', text: '✗ Chyba při odesílání. Zkuste to prosím znovu.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* NAV */}
      <nav className="nav">
        <div className="container nav-inner">
          <a className="brand" href="#top" aria-label="ZE Invest domů">
            <img src="/logo.png" alt="ZE Invest logo" style={{ maxWidth: '200px', marginBottom: '1rem' }} />
          </a>
          <div className="menu" role="navigation" aria-label="Hlavní menu">
            <a href="#o-nas">O nás</a>
            <a href="#projekt">Projekt</a>
            <a href="#vyhody">Výhody</a>
            <a href="#kontakt" className="btn">Kontakt</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header id="top" className="hero" role="banner">
        <div className="container">
          <div>
            <img src="/wind-turbine.jpg" alt="Větrná turbína na horizontu" />
          </div>
          <div>
            <h1>Investice do udržitelné budoucnosti</h1>
            <p>Vítr pro stabilní a nezávislou budoucnost. Dlouhodobý provoz, lokální přínos a čistá energie.</p>
            <a className="btn" href="#o-nas" aria-label="Zjistit více o společnosti ZE Invest">Zjistit více</a>
          </div>
        </div>
      </header>

      {/* O NÁS */}
      <section id="o-nas">
        <div className="container cols-2 grid">
          <div>
            <h2>Náš projekt větrné energie</h2>
            <p className="lead">
              ZE&nbsp;Invest se věnuje vývoji udržitelných řešení větrné energie. Využíváme moderní technologie a pečlivý výběr lokalit pro maximální efektivitu výroby a minimální dopad na okolí.
            </p>
            <ul className="list">
              <li><span className="tick">✓</span><span>Dlouhodobý provoz – nejsme „postavit a prodat", ale <strong>stavět a provozovat</strong>.</span></li>
              <li><span className="tick">✓</span><span>Stabilní výnos podpořený dlouhodobými smlouvami na odběr elektřiny.</span></li>
              <li><span className="tick">✓</span><span>Lokální spolupráce s obcemi, transparentní komunikace.</span></li>
            </ul>
          </div>
          <div>
            <img src="/projekt.png" alt="Rodina kupuje energii z větrné farmy" style={{ maxWidth: '100%', borderRadius: '12px' }} />
          </div>
        </div>
      </section>

      {/* PROJEKT – DETAIL */}
      <section id="projekt">
        <div className="container">
          <h2>Parametry aktuálního projektu</h2>
          <div className="grid cols-3">
            <div className="card">
              <div className="icon" aria-hidden="true">⚡</div>
              <h3>Kapacita</h3>
              <p>Plánované 3&nbsp;VTE s instalovaným výkonem až 15&nbsp;MW<small>*</small>.</p>
            </div>
            <div className="card">
              <div className="icon" aria-hidden="true">📍</div>
              <h3>Lokalita</h3>
              <p>Ještě se řeší</p>
            </div>
            <div className="card">
              <div className="icon" aria-hidden="true">📄</div>
              <h3>Stav</h3>
              <p>Probíhá povolovací proces, technická příprava a jednání s partnery.</p>
            </div>
          </div>
          <p className="mute" style={{ marginTop: '.6rem' }}><small>* upřesní se dle finální specifikace turbín a výsledků EIA.</small></p>
        </div>
      </section>

      {/* VÝHODY */}
      <section id="vyhody">
        <div className="container">
          <h2>Proč dává náš projekt smysl</h2>
          <div className="grid cols-3">
            <div className="card">
              <h3>Ekologie</h3>
              <p>Čistá energie bez emisí CO₂, minimální záběr půdy a šetrný provoz.</p>
            </div>
            <div className="card">
              <h3>Dlouhodobá odpovědnost</h3>
              <p>Nevznikáme proto, abychom postavili a prodali. Chceme naše elektrárny dlouhodobě provozovat, udržovat a modernizovat, aby přinášely užitek po desítky let.</p>
            </div>
            <div className="card">
              <h3>Přínos pro okolí</h3>
              <p>Podporujeme rozvoj obcí, místní infrastruktury a aktivit, které zvyšují kvalitu života. Chceme, aby projekt byl zdrojem hrdosti, ne obav.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA pruh */}
      <section className="cta">
        <div className="container bar">
          <div>
            <strong>Chcete se dozvědět více?</strong><br />
            Rádi s vámi probereme vše co chcete vědět.
          </div>
          <a className="btn" href="#kontakt">Ozvěte se nám</a>
        </div>
      </section>

      {/* KONTAKT */}
      <section id="kontakt">
        <div className="container cols-2 grid">
          <div>
            <h2>Kontaktujte nás</h2>
            <p className="lead">Ozveme se vám s detailními informacemi o projektu.</p>
            <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
              <input
                id="jmeno"
                name="jmeno"
                type="text"
                placeholder="Vaše jméno"
                required
                style={{ width: '100%', padding: '.8rem', marginBottom: '.6rem' }}
              />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Váš e-mail"
                required
                style={{ width: '100%', padding: '.8rem', marginBottom: '.6rem' }}
              />
              <textarea
                id="zprava"
                name="zprava"
                placeholder="Zpráva"
                style={{ width: '100%', padding: '.8rem', marginBottom: '.6rem' }}
              />
              <button className="btn" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Odesílám...' : 'Odeslat'}
              </button>
              {formMessage && (
                <div
                  style={{
                    marginTop: '1rem',
                    padding: '1rem',
                    borderRadius: '8px',
                    backgroundColor: formMessage.type === 'success' ? '#eaf4ea' : '#fee',
                    color: formMessage.type === 'success' ? '#3b7f2f' : '#c00'
                  }}
                >
                  {formMessage.text}
                </div>
              )}
            </form>
          </div>
          <div>
            <img src="/vte-cow.png" alt="Větrná farma při západu slunce" />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '2rem 0', background: '#f4f6f7', color: 'var(--muted)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            © {new Date().getFullYear()} ZE Invest | Web vytvořilo{' '}
            <a
              href="https://www.bezit.cz"
              target="_blank"
              rel="noopener"
              style={{ color: 'var(--brand-green)', textDecoration: 'none', fontWeight: '600' }}
            >
              www.bezit.cz
            </a>
          </div>
          <div>IČO: 222 68 715 • Chrustenice 179, 267 12 Chrustenice</div>
        </div>
      </footer>

      {/* Cookie Consent Banner */}
      {showCookie && (
        <div id="cookie-consent" className="cookie-consent show">
          <div className="container">
            <div className="cookie-content">
              <div className="cookie-text">
                🍪 Tento web používá cookies pro zajištění správné funkčnosti a analytických účelů.
                Používáním webu souhlasíte s používáním cookies v souladu s našimi{' '}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    alert('Zásady ochrany osobních údajů budou brzy k dispozici')
                  }}
                >
                  zásadami ochrany osobních údajů
                </a>.
              </div>
              <div className="cookie-buttons">
                <button onClick={declineCookies} className="cookie-btn decline">Odmítnout</button>
                <button onClick={acceptCookies} className="cookie-btn accept">Přijmout vše</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'ZE Invest',
            url: 'https://ze-invest-web.pages.dev',
            logo: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=400&auto=format&fit=crop',
            sameAs: []
          })
        }}
      />
    </>
  )
}
