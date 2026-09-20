import { useState, useEffect, useRef } from 'react'
import './App.css'

/* ── Brand ────────────────────────────────────── */
const BRAND = 'SK Repair Lab'
const BRAND_EMAIL = 'kasakimparrot@gmail.com'

/* ── Typewriter Phrases ───────────────────────── */
const TYPEWRITER_PHRASES = [
  'Repair You Can Trust',
  'Same-Day Screen Fixes',
  'Virus Removal Experts',
  'Data Recovery Pros',
  'Battery Life Restored',
  'Speed Upgrades Fast',
]

/* ── Typewriter Hook ──────────────────────────── */
function useTypewriter(phrases, typingSpeed = 75, deletingSpeed = 40, pauseMs = 2000) {
  const [displayed, setDisplayed] = useState('')
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    const current = phrases[phraseIdx]

    if (!isDeleting && charIdx <= current.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx))
        setCharIdx((c) => c + 1)
      }, typingSpeed)
    } else if (!isDeleting && charIdx > current.length) {
      timeoutRef.current = setTimeout(() => setIsDeleting(true), pauseMs)
    } else if (isDeleting && charIdx > 0) {
      timeoutRef.current = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx - 1))
        setCharIdx((c) => c - 1)
      }, deletingSpeed)
    } else if (isDeleting && charIdx === 0) {
      setIsDeleting(false)
      setPhraseIdx((i) => (i + 1) % phrases.length)
    }

    return () => clearTimeout(timeoutRef.current)
  }, [charIdx, isDeleting, phraseIdx, phrases, typingSpeed, deletingSpeed, pauseMs])

  return displayed
}

/* ── Service Data ─────────────────────────────── */
const services = [
  {
    icon: '🖥️',
    title: 'Screen Replacement',
    desc: 'Cracked, flickering, or dim displays fixed fast with premium panels that match your original.',
  },
  {
    icon: '🔋',
    title: 'Battery Replacement',
    desc: 'Restore full day battery life with a high-quality replacement. Same-day service available.',
  },
  {
    icon: '🛡️',
    title: 'Virus & Malware Removal',
    desc: 'Deep clean your system of threats, restore performance and lock down your security.',
  },
  {
    icon: '⚡',
    title: 'Speed Optimisation',
    desc: 'SSD upgrades, RAM boosts, and system tune-ups that feel like a brand new machine.',
  },
  {
    icon: '⌨️',
    title: 'Keyboard & Hinge Repair',
    desc: 'Sticky keys, broken hinges, loose ports, and cracked palmrests — all sorted.',
  },
  {
    icon: '💾',
    title: 'Data Recovery',
    desc: 'Lost files from a crash, water damage, or failed drive? We recover what matters most.',
  },
]

/* ── Pricing Data ─────────────────────────────── */
const pricing = [
  {
    tier: 'Quick Fix',
    tagline: 'Minor repairs & tune-ups',
    price: 'Ksh 300 /=',
    note: 'Starting from',
    highlight: false,
    items: [
      'Free diagnosis included',
      'Virus & malware removal',
      'System speed clean-up',
      'Driver & software updates',
      'Basic performance check',
    ],
    cta: 'Book Quick Fix',
  },
  {
    tier: 'Standard Repair',
    tagline: 'Most popular choice',
    price: 'Ksh 700 /=',
    note: 'Starting from',
    highlight: true,
    items: [
      'Everything in Quick Fix',
      'Screen or battery swap',
      'Keyboard / hinge repair',
      'RAM or storage upgrade',
      '90-day repair warranty',
    ],
    cta: 'Book Standard Repair',
  },
  {
    tier: 'Full Overhaul',
    tagline: 'Complete laptop revival',
    price: 'Ksh 1000 /=',
    note: 'Starting from',
    highlight: false,
    items: [
      'Everything in Standard',
      'Data recovery (up to 50 GB)',
      'Motherboard-level diagnosis',
      'Full hardware deep clean',
      '6-month extended warranty',
    ],
    cta: 'Book Full Overhaul',
  },
]

/* ── Testimonial Data ─────────────────────────── */
const testimonials = [
  {
    quote: 'My laptop screen was completely shattered. Sam had it fixed in under 24 hours and the display looks perfect. Absolutely brilliant service!',
    name: 'Erick M.',
    role: 'Graphic Designer',
    initials: 'EM',
    stars: 5,
  },
  {
    quote: 'Dropped off my laptop with a virus that was driving me crazy. Got it back the same day, running faster than it ever did. Highly recommend SK Repair Lab!',
    name: 'Brian K.',
    role: 'Student',
    initials: 'BK',
    stars: 5,
  },
  {
    quote: 'Fair pricing, honest diagnosis — Sam told me exactly what was wrong before touching anything. Rare to find that level of integrity these days.',
    name: 'Peter G.',
    role: 'Small Business Owner',
    initials: 'PG',
    stars: 5,
  },
]

/* ── Why Items ────────────────────────────────── */
const whyItems = [
  {
    icon: '\uD83D\uDD0D',
    title: 'Free Diagnosis',
    desc: "We examine your laptop at no cost and tell you exactly what's wrong before any work begins.",
  },
  {
    icon: '\uD83D\uDE80',
    title: 'Quick Turnaround',
    desc: "Most common repairs are completed same-day or within 24 hours, so you're never without your device.",
  },
  {
    icon: '💬',
    title: 'Transparent Pricing',
    desc: "You'll know the exact cost upfront — no hidden fees, no surprises, ever.",
  },
  {
    icon: '🛡️',
    title: '90-Day Warranty',
    desc: 'Every repair is backed by a 90-day warranty for your complete peace of mind.',
  },
]

/* ── Service Card ─────────────────────────────── */
function ServiceCard({ icon, title, desc }) {
  return (
    <article className="service-card">
      <div className="service-icon" aria-hidden="true">{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
      <span className="card-arrow">Learn more →</span>
    </article>
  )
}

/* ── Pricing Card ─────────────────────────────── */
function PricingCard({ tier, tagline, price, note, highlight, items, cta }) {
  return (
    <article className={`pricing-card${highlight ? ' pricing-card--highlight' : ''}`}>
      {highlight && <div className="pricing-badge">Most Popular</div>}
      <div className="pricing-tier">{tier}</div>
      <p className="pricing-tagline">{tagline}</p>
      <div className="pricing-price-wrap">
        <span className="pricing-note">{note}</span>
        <span className="pricing-price">{price}</span>
      </div>
      <ul className="pricing-features" aria-label={`${tier} features`}>
        {items.map((item) => (
          <li key={item} className="pricing-feature-item">
            <span className="pricing-check" aria-hidden="true">✓</span>
            {item}
          </li>
        ))}
      </ul>
      <a href="#contact" className={`pricing-cta${highlight ? ' pricing-cta--primary' : ''}`}>
        {cta}
      </a>
    </article>
  )
}

/* ── Testimonial Card ─────────────────────────── */
function TestimonialCard({ quote, name, role, initials, stars }) {
  return (
    <article className="testimonial-card">
      <div className="testimonial-stars" aria-label={`${stars} out of 5 stars`}>
        {Array.from({ length: stars }).map((_, i) => (
          <span key={i} aria-hidden="true">⭐</span>
        ))}
      </div>
      <blockquote>"{quote}"</blockquote>
      <footer className="testimonial-author">
        <div className="author-avatar" aria-hidden="true">{initials}</div>
        <div className="author-info">
          <strong>{name}</strong>
          <span>{role}</span>
        </div>
      </footer>
    </article>
  )
}

/* ── Main App ─────────────────────────────────── */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const typedText = useTypewriter(TYPEWRITER_PHRASES, 72, 38, 2200)

  const toggleMenu = () => setMenuOpen((prev) => !prev)
  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      {/* ── Navigation ── */}
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <a href="#home" className="nav-brand" aria-label={`${BRAND} Home`}>
          <div className="nav-logo-icon" aria-hidden="true">🔧</div>
          SK <span>Repair</span> Lab
        </a>

        <ul className={`nav-links${menuOpen ? ' open' : ''}`} role="list">
          <li><a href="#services" onClick={closeMenu}>Services</a></li>
          <li><a href="#pricing" onClick={closeMenu}>Pricing</a></li>
          <li><a href="#why-us" onClick={closeMenu}>Why Us</a></li>
          <li><a href="#testimonials" onClick={closeMenu}>Reviews</a></li>
          <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
          <li>
            <a href="tel:+254708834782" className="nav-cta" onClick={closeMenu}>
              📞 Call Now
            </a>
          </li>
        </ul>

        <button
          className="hamburger"
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-controls="nav-links"
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      <main>
        {/* ── Hero ── */}
        <section id="home" className="hero" aria-label="Hero section">
          <img
            src="/hero.jpg"
            alt="Professional laptop repair technician at work in a modern tech lab"
            className="hero-bg-img"
            loading="eager"
          />
          <div className="hero-overlay" aria-hidden="true"></div>

          <div className="hero-container">
            <div className="hero-text">
              <div className="hero-badge" aria-label="Currently open">
                Sam Kim · Available Today
              </div>

              <h1>
                Expert Laptop<br />
                <span className="typewriter-wrap" aria-live="polite" aria-label={typedText}>
                  {typedText}
                  <span className="typewriter-cursor" aria-hidden="true">|</span>
                </span>
              </h1>

              <p>
                Fast, honest, and affordable laptop repairs for all makes and models.
                Same-day service available — free diagnosis, no obligation.
              </p>

              <div className="hero-actions">
                <a href="tel:+254708834782" className="btn-primary">
                  📞 Call Now — It&apos;s Free
                </a>
                <a href="#services" className="btn-outline">
                  View Services →
                </a>
              </div>

              <div className="hero-stats" role="list" aria-label="Key statistics">
                <div className="stat" role="listitem">
                  <span className="stat-num">1,200+</span>
                  <span className="stat-lbl">Repairs Done</span>
                </div>
                <div className="stat" role="listitem">
                  <span className="stat-num">98%</span>
                  <span className="stat-lbl">Satisfaction</span>
                </div>
                <div className="stat" role="listitem">
                  <span className="stat-num">24hr</span>
                  <span className="stat-lbl">Turnaround</span>
                </div>
              </div>
            </div>

            <div className="hero-img-wrap">
              <div className="hero-img-card">
                <img
                  src="/hero.jpg"
                  alt="Technician carefully repairing an open laptop on a professional workbench"
                  loading="eager"
                />
                <div className="hero-img-badge">
                  <div className="img-badge-icon" aria-hidden="true">✅</div>
                  <div className="img-badge-text">
                    <strong>Sam Kim — Certified Tech</strong>
                    <span>All brands &amp; models covered</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Services ── */}
        <section id="services" className="services-section" aria-labelledby="services-heading">
          <div className="services-header">
            <span className="section-label" aria-hidden="true">What We Fix</span>
            <h2 id="services-heading" className="section-title">Our Repair Services</h2>
            <p className="section-sub">
              From cracked screens to dead batteries — SK Repair Lab handles every laptop problem
              quickly, professionally, and at a fair price.
            </p>
          </div>

          <div className="services-grid" role="list" aria-label="List of repair services">
            {services.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>
        </section>

        {/* ── Pricing ── */}
        <section id="pricing" className="pricing-section" aria-labelledby="pricing-heading">
          <div className="pricing-header">
            <span className="section-label" aria-hidden="true">Simple, Honest Pricing</span>
            <h2 id="pricing-heading" className="section-title">Repair Plans</h2>
            <p className="section-sub">
              No hidden fees. No guesswork. Pick the plan that fits your needs and
              Sam will take care of the rest — with a warranty to back it up.
            </p>
          </div>

          <div className="pricing-grid" role="list" aria-label="Pricing plans">
            {pricing.map((plan) => (
              <PricingCard key={plan.tier} {...plan} />
            ))}
          </div>

          <p className="pricing-footnote">
            * Prices are starting rates. Final cost confirmed after free diagnosis.
            All repairs include a <strong>90-day warranty</strong> minimum.
          </p>
        </section>

        {/* ── Why Choose Us ── */}
        <section id="why-us" className="why-section" aria-labelledby="why-heading">
          <div className="why-inner">
            <div className="why-img-wrap">
              <div className="why-img-card">
                <img
                  src="/team.jpg"
                  alt="Sam Kim and the SK Repair Lab team ready to help"
                  loading="lazy"
                />
              </div>
              <div className="why-float-badge" aria-hidden="true">
                <span className="icon">⭐</span>
                <div className="text">
                  <strong>4.9 / 5 Rating</strong>
                  <small>Based on 300+ reviews</small>
                </div>
              </div>
              <div className="why-float-badge-2" aria-hidden="true">
                <span className="icon">🔧</span>
                <div className="text">
                  <strong>5+ Years</strong>
                  <small>Sam Kim — trusted expert</small>
                </div>
              </div>
            </div>

            <div className="why-content">
              <span className="section-label" aria-hidden="true">Why SK Repair Lab</span>
              <h2 id="why-heading" className="section-title">
                The Right Choice for Your Laptop
              </h2>
              <p className="section-sub">
                Sam Kim built SK Repair Lab on one principle — doing things right.
                Honest advice, quality parts, and repairs that actually last.
              </p>

              <ul className="why-list" aria-label="Reasons to choose SK Repair Lab">
                {whyItems.map((item) => (
                  <li key={item.title} className="why-item">
                    <div className="why-item-icon" aria-hidden="true">{item.icon}</div>
                    <div className="why-item-text">
                      <strong>{item.title}</strong>
                      <span>{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section id="testimonials" className="testimonials-section" aria-labelledby="testimonials-heading">
          <div className="testimonials-header">
            <span className="section-label" aria-hidden="true">Customer Stories</span>
            <h2 id="testimonials-heading" className="section-title">
              What Our Customers Say
            </h2>
          </div>

          <div className="testimonials-grid" role="list" aria-label="Customer testimonials">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section className="cta-section" aria-label="Call to action">
          <div className="cta-inner">
            <h2>Ready to Get Your Laptop Fixed?</h2>
            <p>
              Bring it in today or give Sam a call. Free diagnosis, no commitment required —
              we&apos;ll tell you exactly what&apos;s wrong and what it&apos;ll cost.
            </p>
            <div className="cta-btns">
              <a href="tel:+254708834782" className="btn-white">
                📞 Call Sam Now
              </a>
              <a href="https://wa.me/+254793075625" className="btn-ghost">
                💬 WhatsApp Us
              </a>
            </div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="contact-section" aria-labelledby="contact-heading">
          <div className="contact-inner">
            <div className="contact-info">
              <span className="section-label" aria-hidden="true">Get In Touch</span>
              <h2 id="contact-heading" className="section-title">
                Let&apos;s Fix Your Laptop
              </h2>
              <p className="section-sub">
                Drop Sam a message, give us a call, or visit the workshop.
                We&apos;ll get back to you as soon as possible.
              </p>

              <address>
                <ul className="contact-details" aria-label="Contact details">
                  <li className="contact-item">
                    <div className="contact-item-icon" aria-hidden="true">📞</div>
                    <div className="contact-item-text">
                      <strong>Phone</strong>
                      <span>+254708834782</span>
                    </div>
                  </li>
                  <li className="contact-item">
                    <div className="contact-item-icon" aria-hidden="true">✉️</div>
                    <div className="contact-item-text">
                      <strong>Email</strong>
                      <span>{BRAND_EMAIL}</span>
                    </div>
                  </li>
                  <li className="contact-item">
                    <div className="contact-item-icon" aria-hidden="true">📍</div>
                    <div className="contact-item-text">
                      <strong>Location</strong>
                      <span>123 Tech Street, Your City</span>
                    </div>
                  </li>
                  <li className="contact-item">
                    <div className="contact-item-icon" aria-hidden="true">🕐</div>
                    <div className="contact-item-text">
                      <strong>Hours</strong>
                      <span>Mon – Sat: 8am – 6pm</span>
                    </div>
                  </li>
                </ul>
              </address>
            </div>

            <div className="contact-form-card">
              <h3>Send Sam a Message</h3>
              <form
                aria-label="Contact form"
                onSubmit={(e) => {
                  e.preventDefault()
                  alert("Message sent! Sam will be in touch shortly.")
                }}
              >
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="first-name">First Name</label>
                    <input
                      type="text"
                      id="first-name"
                      name="firstName"
                      placeholder="John"
                      required
                      autoComplete="given-name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="last-name">Last Name</label>
                    <input
                      type="text"
                      id="last-name"
                      name="lastName"
                      placeholder="Doe"
                      required
                      autoComplete="family-name"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="john@example.com"
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="service">Service Needed</label>
                  <select id="service" name="service">
                    <option value="">Select a service…</option>
                    {services.map((s) => (
                      <option key={s.title} value={s.title}>{s.title}</option>
                    ))}
                    <option value="Other">Other / Not sure yet</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell Sam about your laptop and what's happening…"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn-submit">
                  Send Message ✉️
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer Bar ── */}
      <footer className="footer-bar" role="contentinfo">
        <p>© {new Date().getFullYear()} {BRAND} · Sam Kim. All rights reserved.</p>
        <nav aria-label="Footer navigation">
          <ul className="footer-links" role="list">
            <li><a href="#services">Services</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="https://wa.me/10000000000">WhatsApp</a></li>
          </ul>
        </nav>
      </footer>
    </>
  )
}