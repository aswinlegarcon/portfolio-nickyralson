import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Work', href: '/work' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
]

const WORK_LOGOS = [
  { logo: '/assets/Zoho.svg', role: 'Visual designer', company: 'Zoho', time: 'June 2025 - Present' },
  { logo: '/assets/Kovai.svg', role: 'Creative designer', company: 'Kovai.co', time: 'Feb 2024 - May 2025' },
  { logo: '/assets/Myntra.svg', role: 'Senior designer', company: 'Myntra', time: 'Jul 2023 - Feb 2024' },
  { logo: '/assets/Dealshare.svg', role: 'Graphic designer', company: 'Dealshare', time: 'Jan 2022 - Jul 2023' },
]

const WORK_CARDS = [
  {
    id: 'work-1',
    // CARD HEADING: change `tag` text here for this card.
    tag: 'Web design',
    // CARD SUBHEADING: change `title` text here for this card.
    title: 'Designed websites with clear layout and strong hierarchy for easy navigation.',
    image: '/assets/work1-img.png',
    link: 'https://www.figma.com/proto/ZJvl3bW8ooubpkivtCLQDH/Portfolio--Nicky-Ralson-?node-id=349-6069&t=ri8RnNaPIM9FZf9d-1&scaling=min-zoom&content-scaling=fixed&page-id=349%3A16',
  },
  {
    id: 'work-2',
    // CARD HEADING: change `tag` text here for this card.
    tag: 'Graphic design',
    // CARD SUBHEADING: change `title` text here for this card.
    title: 'Designed campaign visuals with a focus on layout clarity and consistency across formats.',
    image: '/assets/work2-img.png',
    link: 'https://www.figma.com/proto/ZJvl3bW8ooubpkivtCLQDH/Portfolio--Nicky-Ralson-?node-id=376-890&viewport=-1110%2C2240%2C0.11&t=ayM7UFegeAPlHfKo-1&scaling=min-zoom&content-scaling=fixed&page-id=349%3A17',
  },
  {
    id: 'work-3',
    // CARD HEADING: change `tag` text here for this card.
    tag: 'Template Design',
    // CARD SUBHEADING: change `title` text here for this card.
    title: 'Created reusable templates to maintain consistency and scale across pages.',
    image: '/assets/work3-img.png',
    link: '/work/product-ui',
    isInternal: true,
  },
  {
    id: 'work-4',
    // CARD HEADING: change `tag` text here for this card.
    tag: 'PENTED (E-Learning App)',
    // CARD SUBHEADING: change `title` text here for this card.
    title: 'An e-learning experience with clear content structure and improved readability for learners.',
    image: '/assets/work4-img.jpg',
    link: 'https://www.behance.net/gallery/163595823/Ux-Case-Study-PENTED(E-Learning-app) ',
  },
  {
    id: 'work-5',
    // CARD HEADING: change `tag` text here for this card.
    tag: 'Campus Share',
    // CARD SUBHEADING: change `title` text here for this card.
    title: 'A social platform concept with clean layout and structured user flow for campus interactions.',
    image: '/assets/work5-img.jpg',
    link: 'https://www.behance.net/gallery/169085861/Campus-Share-UiUx-Case-Study ',
  },
  {
    id: 'work-6',
    // CARD HEADING: change `tag` text here for this card.
    tag: 'Myntra – Fashion Ustav',
    // CARD SUBHEADING: change `title` text here for this card.
    title: 'Campaign visuals for a festive sale, focused on layout clarity and brand consistency.',
    image: '/assets/work6-img.jpg',
    link: 'https://www.behance.net/gallery/185644493/Myntra-Fashion-Ustav ',
  },
  {
    id: 'work-7',
    // CARD HEADING: change `tag` text here for this card.
    tag: 'Resume Builder App',
    // CARD SUBHEADING: change `title` text here for this card.
    title: 'A structured experience for creating resumes with clear steps and simple content flow.',
    image: '/assets/work7-img.png',
    link: 'https://nickyralson.medium.com/ui-ux-case-study-resume-builder-app-1729239022df ',
  },
  {
    id: 'work-8',
    // CARD HEADING: change `tag` text here for this card.
    tag: 'IVAR Logo Redesign',
    // CARD SUBHEADING: change `title` text here for this card.
    title: 'A refined logo focused on simplifying form and improving visual balance.',
    image: '/assets/work8-img.png',
    link: 'https://www.behance.net/gallery/169487645/IVAR-Logo-redesign ',
  },
  {
    id: 'work-9',
    // CARD HEADING: change `tag` text here for this card.
    tag: 'Smart Little Ninjas',
    // CARD SUBHEADING: change `title` text here for this card.
    title: 'A logo concept with a playful yet structured approach, focused on clarity and character.',
    image: '/assets/work9-img.png',
    link: ' https://www.behance.net/gallery/133964101/Smart-little-ninjas-logo-concept',
  },
]

const WHAT_I_DO_WORK = WORK_CARDS.slice(0, 3)

const HOME_SERVICES = [
  {
    id: '01',
    title: 'Logo & Branding',
    description: 'Focused on clean and memorable marks. Built with strong form and visual balance.',
  },
  {
    id: '02',
    title: 'Graphic Design',
    description: 'Visual direction across typography, color, and layout. Designed to stay consistent.',
  },
  {
    id: '03',
    title: 'Web Design',
    description: 'Structured layouts with clear hierarchy and readable flow across screens.',
  },
  {
    id: '04',
    title: 'Illustrations',
    description: 'Clear visuals across digital, focused on layout and type.',
  },
]

const ABOUT_TEXT =
  'Hi, I am Nicky Ralson. I started with a strong interest in visuals and spent a lot of time learning by doing. As a self-taught designer, I focused on layout, typography, and detail. Over time, my work grew into shaping how things look, feel, and connect across screens. I enjoy refining ideas, improving them step by step, and getting better with every project.'

const GALLERY_IMAGES = [
  { id: 'gallery-1', src: '/assets/Gallery image 1.png', alt: 'Gallery artwork 1' },
  { id: 'gallery-2', src: '/assets/Gallery image 2.png', alt: 'Gallery artwork 2' },
  { id: 'gallery-3', src: '/assets/Gallery image 3.png', alt: 'Gallery artwork 3' },
  { id: 'gallery-4', src: '/assets/Gallery image 4.png', alt: 'Gallery artwork 4' },
  { id: 'gallery-5', src: '/assets/Gallery image 5.png', alt: 'Gallery artwork 5' },
  { id: 'gallery-6', src: '/assets/Gallery image 6.png', alt: 'Gallery artwork 6' },
  { id: 'gallery-7', src: '/assets/Gallery image 7.png', alt: 'Gallery artwork 7' },
  { id: 'gallery-8', src: '/assets/Gallery image 8.png', alt: 'Gallery artwork 8' },
  { id: 'gallery-9', src: '/assets/Gallery image 9.png', alt: 'Gallery artwork 9' },
  { id: 'gallery-10', src: '/assets/Gallery image 10.png', alt: 'Gallery artwork 10' },
  { id: 'gallery-11', src: '/assets/Gallery image 11.png', alt: 'Gallery artwork 11' },
  { id: 'gallery-12', src: '/assets/Gallery image 12.png', alt: 'Gallery artwork 12' },
  { id: 'gallery-13', src: '/assets/Gallery image 13.png', alt: 'Gallery artwork 13' },
  { id: 'gallery-14', src: '/assets/Gallery image 14.png', alt: 'Gallery artwork 14' },
  { id: 'gallery-15', src: '/assets/Gallery image 15.png', alt: 'Gallery artwork 15' },
  { id: 'gallery-16', src: '/assets/Gallery image 16.png', alt: 'Gallery artwork 16' },
  { id: 'gallery-17', src: '/assets/Gallery image 17.png', alt: 'Gallery artwork 17' },
  { id: 'gallery-18', src: '/assets/Gallery image 18.png', alt: 'Gallery artwork 18' },
]

const HOME_SCROLL_IMAGES = GALLERY_IMAGES.slice(0, 8)

const UNIFORM_HEADING_SIZE = 'clamp(36px, 4vw, 64px)'
const UNIFORM_SUBHEADING_SIZE = 'clamp(24px, 2.2vw, 36px)'
const WORK_CARD_SUBHEADING_SIZE = 'clamp(28px, 2.5vw, 38px)'
const WORK_CARD_FIXED_HEIGHT = 620
const UNIFORM_SUBTEXT_SIZE = 'clamp(14px, 1.1vw, 18px)'

// ─── HoverRevealImage ─────────────────────────────────────────────────────────

function HoverRevealImage({ baseSrc, revealSrc, alt, className, revealSize = 100 }) {
  const [isHovered, setIsHovered] = useState(false)
  const actualRef = useRef({ x: 0, y: 0 })
  const trailingRef = useRef({ x: 0, y: 0 })
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const animRef = useRef(null)

  useEffect(() => {
    const animate = () => {
      trailingRef.current.x += (actualRef.current.x - trailingRef.current.x) * 0.07
      trailingRef.current.y += (actualRef.current.y - trailingRef.current.y) * 0.07
      setCursor({ x: trailingRef.current.x, y: trailingRef.current.y })
      animRef.current = requestAnimationFrame(animate)
    }
    animRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  const handleMouseMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    actualRef.current = {
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    }
  }

  const mask = `radial-gradient(circle ${revealSize}px at ${cursor.x}px ${cursor.y}px, black 0%, black 45%, transparent 90%)`

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <img src={baseSrc} alt={alt} className="h-full w-full object-contain object-center" draggable={false} />
      <img
        src={revealSrc}
        alt={alt}
        className="pointer-events-none absolute inset-0 h-full w-full object-contain object-center transition-opacity duration-300"
        style={{
          opacity: isHovered ? 0.5 : 0,
          transform: 'translateX(14px)',
          WebkitMaskImage: mask,
          maskImage: mask,
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
        }}
        draggable={false}
      />
    </div>
  )
}

// ─── HoverRevealLayer ─────────────────────────────────────────────────────────

function HoverRevealLayer({ src, active, pointer, revealSize = 240, className }) {
  const mask = `radial-gradient(circle ${revealSize}px at ${pointer.x}px ${pointer.y}px, black 0%, black 38%, transparent 78%)`

  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className={className}
      style={{
        opacity: active ? 0.25 : 0,
        transition: 'opacity 0.4s ease',
        WebkitMaskImage: mask,
        maskImage: mask,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
      }}
      draggable={false}
    />
  )
}

// ─── ScrollReadingText ────────────────────────────────────────────────────────

function ScrollReadingText({ text, progress }) {
  const words = text.split(' ')
  const transitionWindow = 0.01
  const staticWhiteCount = 5
  const animatedWords = Math.max(1, words.length - staticWhiteCount)

  return (
    /* Responsive font: 28px on mobile → scales with viewport → caps at 52px on huge screens */
    <p
      className="text-center font-semibold leading-[1.2] tracking-[-0.02em]"
      style={{ fontSize: 'clamp(26px, 3.2vw, 52px)' }}
    >
      {words.map((word, index) => {
        const shouldStayWhite = index < staticWhiteCount
        const start = shouldStayWhite ? 0 : (index - staticWhiteCount) / animatedWords
        const reveal = (progress - start) / transitionWindow
        const mix = shouldStayWhite ? 1 : Math.max(0, Math.min(1, reveal))
        const shade = Math.round(126 + (255 - 126) * mix)
        return (
          <span key={`${word}-${index}`} style={{ color: `rgb(${shade}, ${shade}, ${shade})` }}>
            {word}{' '}
          </span>
        )
      })}
    </p>
  )
}

// ─── TopNav ───────────────────────────────────────────────────────────────────

function TopNav() {
  return (
    <div className="w-full">
      <nav className="flex items-center justify-between px-6 py-6 lg:px-[120px]">
        <Link to="/" className="inline-flex">
          <img src="/assets/Logo.svg" alt="Logo" className="h-10 w-auto" draggable={false} />
        </Link>

        <ul className="flex items-center gap-5 text-[15px] text-[#F2F2F2]">
          {NAV_LINKS.map((item) => (
            <li key={item.label}>
              {item.label === 'Contact' ? (
                <Link
                  to={item.href}
                  className="rounded-sm border border-[#232323] bg-[#232323] px-4 py-2 text-[15px] leading-none text-white transition-colors hover:border-[#CB2C2E] hover:bg-[#CB2C2E]"
                >
                  {item.label}
                </Link>
              ) : (
                <Link to={item.href} className="transition-colors hover:text-white/80">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="h-px w-full bg-[#1A1A1A]" />
    </div>
  )
}

// ─── WorkShowcaseCard ─────────────────────────────────────────────────────────
// Stacks vertically on mobile; side-by-side on md+. Height scales with viewport.

function WorkShowcaseCard({ item, imageStyle, imageClassName }) {
  const mergedImageStyle = {
    ...imageStyle,
    transform: `${imageStyle?.transform ? `${imageStyle.transform} ` : ''}scale(1)`,
  }

  return (
    <article
      className="flex w-full flex-col overflow-hidden border border-[#1A1A1A] bg-[#0B0B0B] md:flex-row md:items-stretch"
      style={{ height: `${WORK_CARD_FIXED_HEIGHT}px` }}
    >
      {/* Left info panel */}
      <div className="flex flex-col justify-between bg-[#111111] p-6 md:p-8 xl:p-10 md:flex-shrink-0 md:w-[38%]">
        <div>
          <p className="text-[12px] font-normal uppercase tracking-[0.107em] leading-[26px] text-[#878787]">
            {item.tag}
          </p>
          <h3
            className="mt-4 text-white font-bold leading-[1.3] tracking-[0]"
            style={{ fontSize: WORK_CARD_SUBHEADING_SIZE }}
          >
            {item.title}
          </h3>
        </div>

        {item.isInternal ? (
          <Link
            to={item.link}
            className="mt-6 inline-flex w-fit items-center gap-2 text-[14px] font-semibold uppercase tracking-[0.094em] leading-[26px] text-white hover:opacity-70 transition-opacity"
          >
            View Work <span aria-hidden="true">→</span>
          </Link>
        ) : (
          <a
            href={item.link}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex w-fit items-center gap-2 text-[14px] font-semibold uppercase tracking-[0.094em] leading-[26px] text-white hover:opacity-70 transition-opacity"
          >
            View Work <span aria-hidden="true">→</span>
          </a>
        )}
      </div>

      {/* Right image panel — fixed height on mobile, fills remaining space on desktop */}
      <div className="relative h-[200px] overflow-hidden bg-[#0C0C0C] md:h-full md:min-w-0 md:flex-1">
        <img
          src={item.image}
          alt={item.title}
          className={`h-full w-full object-cover object-center ${imageClassName || ''}`}
          style={mergedImageStyle}
          draggable={false}
        />
      </div>
    </article>
  )
}

// ─── CardDots ─────────────────────────────────────────────────────────────────

function CardDots({ total, activeIndex, transitionProgress }) {
  return (
    <div className="absolute right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
      {Array.from({ length: total }).map((_, i) => {
        const fill =
          i < activeIndex
            ? 1
            : i === activeIndex
            ? 1 - transitionProgress
            : i === activeIndex + 1
            ? transitionProgress
            : 0

        return (
          <div
            key={i}
            className="w-1.5 overflow-hidden rounded-full bg-[#2a2a2a]"
            style={{ height: '24px' }}
          >
            <div
              className="w-full rounded-full bg-white"
              style={{
                height: `${fill * 100}%`,
                transition: 'none',
                transformOrigin: 'top',
              }}
            />
          </div>
        )
      })}
    </div>
  )
}

// ─── WhatIDoSection (Stacked Scroll Cards) ────────────────────────────────────

function WhatIDoSection() {
  const containerRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  /* Responsive horizontal padding matching page gutters */
  const [hPad, setHPad] = useState(24)

  const cards = WHAT_I_DO_WORK
  const total = cards.length

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      // Match page padding breakpoints
      setHPad(w >= 1024 ? 120 : 24)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    let raf = 0
    const compute = () => {
      raf = 0
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight
      const scrolled = -rect.top
      const p = Math.max(0, Math.min(1, scrolled / totalScrollable))
      setScrollProgress(p)
    }
    const onScroll = () => { if (raf) return; raf = window.requestAnimationFrame(compute) }
    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [])

  const cardFloat = scrollProgress * (total - 1)
  const activeIndex = Math.min(Math.floor(cardFloat), total - 2)
  const t = cardFloat - activeIndex

  return (
    <section id="work" ref={containerRef} style={{ height: `${total * 80}vh` }}>
      <div className="sticky top-0 overflow-hidden bg-[#0A0A0A]" style={{ height: '80vh' }}>

        {/* Section heading */}
        <div className="absolute top-0 left-0 right-0 z-50" style={{ paddingLeft: `${hPad}px`, paddingRight: `${hPad}px`, paddingTop: '48px' }}>
          <h2
            className="w-full font-semibold leading-[1.2] tracking-[-0.02em] text-white"
            style={{ fontSize: UNIFORM_HEADING_SIZE }}
          >
            What I Do
          </h2>
        </div>

        {/*
          Card stage — pushed slightly below center to leave breathing room under heading.
          left/right set in JS to match page padding so cards sit within the gutters.
        */}
        <div
          style={{
            position: 'absolute',
            /* Shift centre down by ~32px so heading doesn't overlap */
            top: 'calc(50% + 32px)',
            left: `${hPad}px`,
            right: `${hPad}px`,
            transform: 'translateY(-50%)',
            height: `${WORK_CARD_FIXED_HEIGHT}px`,
          }}
        >
          {cards.map((item, index) => {
            let translateY, blurPx, imageShiftPx, zIndex

            if (index < activeIndex) {
              translateY = '0px'; blurPx = 14; imageShiftPx = 48; zIndex = index
            } else if (index === activeIndex) {
              translateY = '0px'; blurPx = t * 14; imageShiftPx = t * 48; zIndex = total
            } else if (index === activeIndex + 1) {
              translateY = `${(1 - t) * 100}vh`; blurPx = 0; imageShiftPx = 0; zIndex = total + 1
            } else {
              translateY = '100vh'; blurPx = 0; imageShiftPx = 0; zIndex = index
            }

            return (
              <div
                key={item.id}
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex,
                  transform: `translateY(${translateY})`,
                  filter: blurPx > 0 ? `blur(${blurPx}px)` : 'none',
                  willChange: 'transform, filter',
                }}
              >
                <WorkShowcaseCard
                  item={item}
                  imageStyle={{ transform: `translateX(${imageShiftPx}px)`, transition: 'none' }}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── HomeServicesSection ──────────────────────────────────────────────────────

function HomeServicesSection() {
  const [activeId, setActiveId] = useState(null)

  return (
    /* pt-[72px] = breathing room between the sticky card section and services */
    <section className="w-full bg-[#0A0A0A] px-6 pb-[80px] pt-[72px] lg:px-[120px]">
      <div onMouseLeave={() => setActiveId(null)}>
        {HOME_SERVICES.map((service) => {
          const isActive = activeId === service.id

          return (
            <article
              key={service.id}
              className="relative grid grid-cols-1 items-center gap-6 overflow-hidden py-7 transition-colors duration-500 xl:grid-cols-[1fr,max-content] xl:gap-16"
              /* Reduced opacity border — use rgba for a softer divider line */
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
              onMouseEnter={() => setActiveId(service.id)}
            >
              <div className="relative z-10 flex items-center gap-6 xl:gap-10">
                <span
                  className="font-semibold leading-none tracking-[0] text-[#CB2C2E] flex-shrink-0"
                  style={{ fontSize: 'clamp(28px, 2.8vw, 44px)' }}
                >
                  {service.id}
                </span>
                <h3
                  className={`font-semibold leading-[1.2] tracking-[0] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isActive
                      ? 'translate-x-4 scale-[1.02] text-white [text-shadow:0_0_12px_rgba(255,255,255,0.14)]'
                      : 'translate-x-0 scale-100'
                  }`}
                  style={{
                    fontSize: UNIFORM_SUBHEADING_SIZE,
                    fontFamily: "Inter, 'Plus Jakarta Sans', sans-serif",
                    ...(isActive
                      ? {}
                      : {
                        color: 'transparent',
                        WebkitTextStroke: '1px #6F7277',
                        textStroke: '1px #6F7277',
                        textShadow: 'none',
                      }),
                  }}
                >
                  {service.title}
                </h3>
              </div>

              <p
                className="relative z-10 font-normal leading-[1.6] tracking-[0.031em] text-[#878787] transition-colors duration-500 xl:max-w-[480px] xl:text-right"
                style={{ fontSize: 'clamp(13px, 1vw, 16px)' }}
              >
                {service.description}
              </p>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function WhereItStartedSection() {
  const sectionRef = useRef(null)
  const stickyRef = useRef(null)
  const trackRef = useRef(null)
  const [sectionHeight, setSectionHeight] = useState('220vh')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [maxShift, setMaxShift] = useState(0)

  useEffect(() => {
    let scrollFrame = 0
    let measureFrame = 0

    const updateProgress = () => {
      scrollFrame = 0
      if (!sectionRef.current || !stickyRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const totalScrollable = sectionRef.current.offsetHeight - stickyRef.current.offsetHeight
      const scrolled = -rect.top
      const progress = Math.max(0, Math.min(1, scrolled / Math.max(1, totalScrollable)))
      setScrollProgress(progress)
    }

    const onScroll = () => {
      if (scrollFrame) return
      scrollFrame = window.requestAnimationFrame(updateProgress)
    }

    const scheduleMeasure = () => {
      if (measureFrame) return
      measureFrame = window.requestAnimationFrame(() => {
        measureFrame = 0
        updateShiftBounds()
        updateProgress()
      })
    }

    const updateShiftBounds = () => {
      if (!sectionRef.current || !trackRef.current || !stickyRef.current) return

      const viewportWidth = sectionRef.current.clientWidth
      const trackWidth = trackRef.current.scrollWidth
      const requiredShift = Math.max(0, trackWidth - viewportWidth)
      setMaxShift(requiredShift)

      const pinScrollDistance = requiredShift / 1.5
      const stickyHeight = stickyRef.current.offsetHeight + 50
      setSectionHeight(`${stickyHeight + pinScrollDistance}px`)
    }

    const onResize = () => {
      onScroll()
      scheduleMeasure()
    }

    const trackImages = trackRef.current
      ? Array.from(trackRef.current.querySelectorAll('img'))
      : []

    const imageCleanupFns = []
    trackImages.forEach((image) => {
      if (image.complete) return
      const onImageReady = () => scheduleMeasure()
      image.addEventListener('load', onImageReady)
      image.addEventListener('error', onImageReady)
      imageCleanupFns.push(() => {
        image.removeEventListener('load', onImageReady)
        image.removeEventListener('error', onImageReady)
      })
    })

    const onWindowLoad = () => scheduleMeasure()

    let resizeObserver = null
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => scheduleMeasure())
      if (sectionRef.current) resizeObserver.observe(sectionRef.current)
      if (stickyRef.current) resizeObserver.observe(stickyRef.current)
      if (trackRef.current) resizeObserver.observe(trackRef.current)
    }

    updateProgress()
    updateShiftBounds()
    const delayedMeasure = window.setTimeout(scheduleMeasure, 220)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    window.addEventListener('load', onWindowLoad)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('load', onWindowLoad)
      window.clearTimeout(delayedMeasure)
      imageCleanupFns.forEach((cleanup) => cleanup())
      if (resizeObserver) resizeObserver.disconnect()
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame)
      if (measureFrame) window.cancelAnimationFrame(measureFrame)
    }
  }, [])

  const translateX = -(scrollProgress * maxShift)

  return (
    <section ref={sectionRef} className="w-full bg-[#0A0A0A]" style={{ height: sectionHeight }}>
      <div ref={stickyRef} className="sticky top-0 overflow-hidden pt-[80px] pb-[48px]">
        <div className="flex w-full flex-col gap-12">
          {/* Header row — full bleed with page padding */}
          <div className="flex w-full items-end justify-between gap-8 px-6 lg:px-[120px]">
            <div className="max-w-[54%]">
              <h2
                className="font-semibold leading-[1.1] tracking-[-0.02em] text-white"
                style={{ fontSize: UNIFORM_HEADING_SIZE }}
              >
                Where It Started
              </h2>
              <p
                className="mt-4 leading-[1.6] tracking-[0.01em] text-[#878787]"
                style={{ fontSize: UNIFORM_SUBTEXT_SIZE }}
              >
                I used to draw a lot during college. That helped me understand form, detail, and visual balance. It
                shaped how I see design today.
              </p>
            </div>

            <Link
              to="/gallery"
              className="inline-flex flex-shrink-0 items-center gap-2 font-semibold uppercase tracking-[0.094em] text-white hover:opacity-70 transition-opacity"
              style={{ fontSize: 'clamp(13px, 1vw, 16px)' }}
            >
              View Gallery <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* IMAGE STRIP */}
          <div className="relative h-[340px] w-full overflow-hidden xl:h-[420px]">
            <div
              ref={trackRef}
              className="flex h-full items-start gap-6"
              style={{ transform: `translateX(${translateX}px)`, transition: 'transform 60ms linear', willChange: 'transform' }}
            >
              {HOME_SCROLL_IMAGES.map((image) => (
                <img
                  key={image.id}
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-auto"
                  draggable={false}
                />
              ))}
            </div>

            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0A0A0A] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0A0A0A] to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer
      className="relative w-full bg-[#0A0A0A]"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Content wrapper with page padding — the bg illustration sits inside this */}
      <div
        className="relative z-10 flex flex-col px-6 lg:px-[120px]"
        style={{ minHeight: '640px', paddingTop: '48px' }}
      >
        {/* Background illustration — centred inside the padded content box */}
        <img
          src="/assets/Footer bg.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none"
          style={{ width: 'clamp(200px, 16vw, 300px)', height: 'auto', zIndex: 0 }}
          draggable={false}
        />

        {/* Top bar */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full bg-[#22C55E]"
              style={{ boxShadow: '0 0 6px 2px rgba(34,197,94,0.55)' }}
            />
            <span
              className="text-white"
              style={{ fontSize: 'clamp(14px, 1.2vw, 20px)', fontWeight: 400, lineHeight: '28px' }}
            >
              Available for opportunities
            </span>
          </div>

          <span
            style={{
              fontSize: 'clamp(13px, 1.1vw, 20px)',
              fontWeight: 400,
              lineHeight: '28px',
              color: '#878787',
            }}
          >
            Worldwide (9:00 AM – 8:00PM IST)
          </span>
        </div>

        {/* Centre CTA */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-8 py-14">
          <p
            className="text-center text-white"
            style={{
              fontSize: 'clamp(20px, 2.2vw, 34px)',
              fontWeight: 400,
              lineHeight: '1.35',
              maxWidth: '800px',
            }}
          >
            I'd love to hear from you and explore collaboration, answer your questions, or simply chat.
          </p>

          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-sm bg-[#CB2C2E] px-8 py-3 text-white transition-opacity hover:opacity-90"
            style={{ fontSize: 'clamp(14px, 1vw, 18px)', fontWeight: 600, letterSpacing: '0.02em' }}
          >
            Contact
          </a>
        </div>

        {/* Divider */}
        <div className="relative z-10 h-px w-full bg-[#1A1A1A]" />

        {/* Bottom bar */}
        <div className="relative z-10 flex items-center justify-between py-6">
          <div className="flex items-center gap-6">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <img src="/assets/Linkedin.svg" alt="LinkedIn" className="h-6 w-6 opacity-70 transition-opacity hover:opacity-100" draggable={false} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <img src="/assets/Instagram.svg" alt="Instagram" className="h-6 w-6 opacity-70 transition-opacity hover:opacity-100" draggable={false} />
            </a>
            <a href="https://behance.net" target="_blank" rel="noreferrer" aria-label="Behance">
              <img src="/assets/Behance.svg" alt="Behance" className="h-6 w-6 opacity-70 transition-opacity hover:opacity-100" draggable={false} />
            </a>
          </div>

          <div className="flex items-center gap-2">
            <img src="/assets/location-svgrepo-com 1.svg" alt="" aria-hidden="true" className="h-5 w-5 opacity-60" draggable={false} />
            <span
              style={{
                fontSize: 'clamp(13px, 1vw, 20px)',
                fontWeight: 400,
                lineHeight: '28px',
                color: '#878787',
              }}
            >
              Coimbatore, Tamil Nadu
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── ContactPage ──────────────────────────────────────────────────────────────

function ContactPage() {
  const [heroHovered, setHeroHovered] = useState(false)
  const [heroPointer, setHeroPointer] = useState({ x: 0, y: 0 })
  const actualHeroRef = useRef({ x: 0, y: 0 })
  const trailingHeroRef = useRef({ x: 0, y: 0 })
  const heroRafRef = useRef(null)

  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSending, setIsSending] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')

  useEffect(() => {
    const animateBg = () => {
      trailingHeroRef.current.x += (actualHeroRef.current.x - trailingHeroRef.current.x) * 0.07
      trailingHeroRef.current.y += (actualHeroRef.current.y - trailingHeroRef.current.y) * 0.07
      setHeroPointer({ x: trailingHeroRef.current.x, y: trailingHeroRef.current.y })
      heroRafRef.current = requestAnimationFrame(animateBg)
    }
    heroRafRef.current = requestAnimationFrame(animateBg)
    return () => cancelAnimationFrame(heroRafRef.current)
  }, [])

  const handleHeroMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    actualHeroRef.current = {
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatusMessage('Please fill in all fields before sending.')
      return
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      setStatusMessage('Email is not configured yet. Add EmailJS keys in your .env file.')
      return
    }

    try {
      setIsSending(true)
      setStatusMessage('')
      await emailjs.send(
        serviceId,
        templateId,
        { from_name: formData.name, reply_to: formData.email, message: formData.message, to_name: 'Nicky Ralson' },
        publicKey,
      )
      setStatusMessage('Message sent successfully. You should receive it in your inbox soon.')
      setFormData({ name: '', email: '', message: '' })
    } catch {
      setStatusMessage('Could not send the message. Please verify EmailJS setup and try again.')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <TopNav />

      <section
        className="relative z-10 overflow-hidden"
        onMouseEnter={() => setHeroHovered(true)}
        onMouseLeave={() => setHeroHovered(false)}
        onMouseMove={handleHeroMove}
      >
        <div className="pointer-events-none absolute inset-0 z-0 bg-[#0A0A0A]" />
        <HoverRevealLayer
          src="/assets/Hero%20bg.png"
          active={heroHovered}
          pointer={heroPointer}
          revealSize={230}
          className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
        />

        {/* Form layout — no top padding so it sits tight under the navbar */}
        <div className="relative z-10 grid w-full grid-cols-1 gap-12 px-6 pb-28 pt-8 md:grid-cols-[1fr,1.45fr] md:pb-44 lg:px-[120px] lg:pb-56 lg:pt-12">
          <div className="relative z-10">
            <h1
              className="font-semibold leading-[1.03] tracking-[-0.03em] text-[#F5F5F5]"
              style={{ fontSize: UNIFORM_HEADING_SIZE }}
            >
              Get In touch
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="relative z-10 space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="h-[64px] w-full border border-[#1A1A1A] bg-black/20 px-5 text-[18px] text-white placeholder:text-[#5E5E5E] focus:border-[#2D2D2D] focus:outline-none"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="h-[64px] w-full border border-[#1A1A1A] bg-black/20 px-5 text-[18px] text-white placeholder:text-[#5E5E5E] focus:border-[#2D2D2D] focus:outline-none"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message"
              className="h-[180px] w-full resize-none border border-[#1A1A1A] bg-black/20 px-5 py-5 text-[18px] text-white placeholder:text-[#5E5E5E] focus:border-[#2D2D2D] focus:outline-none"
            />

            <button
              type="submit"
              disabled={isSending}
              className="inline-flex h-[50px] min-w-[165px] items-center justify-center bg-[#CB2C2E] px-6 text-[22px] font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSending ? 'Sending...' : 'Send Message'}
            </button>

            {statusMessage ? (
              <p className="pt-1 text-[14px] text-[#A5A5A5]">{statusMessage}</p>
            ) : null}
          </form>

          {/* LET'S TALK watermark behind form */}
          <div className="pointer-events-none absolute inset-x-0 bottom-4 z-0 hidden h-[190px] items-end justify-center px-6 md:flex lg:bottom-8 lg:h-[260px] lg:px-[120px]">
            <span
              className="block w-full select-none text-center"
              style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontWeight: 600,
                fontSize: 'clamp(120px, 14vw, 240px)',
                lineHeight: '70%',
                letterSpacing: '0%',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                display: 'inline-block',
                transform: 'translateY(18%) scaleY(1.4)',
                transformOrigin: 'center bottom',
                background: 'linear-gradient(180deg, #232323 0%, rgba(10,10,10,0) 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              LET&apos;S TALK
            </span>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-[#1A1A1A] bg-[#0A0A0A]">
        <div className="flex w-full items-center justify-between px-6 py-4 lg:px-[120px]">
          <span className="sr-only">Footer social links</span>
          <div className="flex items-center gap-6">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <img src="/assets/Linkedin.svg" alt="LinkedIn" className="h-6 w-6 opacity-70 transition-opacity hover:opacity-100" draggable={false} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <img src="/assets/Instagram.svg" alt="Instagram" className="h-6 w-6 opacity-70 transition-opacity hover:opacity-100" draggable={false} />
            </a>
            <a href="https://behance.net" target="_blank" rel="noreferrer" aria-label="Behance">
              <img src="/assets/Behance.svg" alt="Behance" className="h-6 w-6 opacity-70 transition-opacity hover:opacity-100" draggable={false} />
            </a>
          </div>

          <div className="flex items-center gap-2">
            <img src="/assets/location-svgrepo-com 1.svg" alt="" aria-hidden="true" className="h-5 w-5 opacity-60" draggable={false} />
            <span className="text-[18px] font-normal leading-[38px] tracking-[0] text-[#878787]">Coimbatore, Tamil Nadu</span>
          </div>
        </div>
      </footer>
    </main>
  )
}

// ─── GalleryLightbox ──────────────────────────────────────────────────────────

function GalleryLightbox({ images, activeIndex, onClose, onNext, onPrev, canNext, canPrev }) {
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    if (activeIndex === null) return
    setZoom(1)
    setRotation(0)

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight' && canNext) onNext()
      if (event.key === 'ArrowLeft' && canPrev) onPrev()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeIndex, canNext, canPrev, onClose, onNext, onPrev])

  if (activeIndex === null) return null

  const currentImage = images[activeIndex]

  const handleWheelZoom = (event) => {
    event.preventDefault()
    const delta = event.deltaY > 0 ? -0.12 : 0.12
    setZoom((prev) => Math.max(0.6, Math.min(3, prev + delta)))
  }

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 p-6" onClick={onClose}>
      <div className="absolute right-6 top-6 flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-3 py-2 backdrop-blur">
        <button type="button" onClick={(e) => { e.stopPropagation(); setZoom((p) => Math.max(0.6, p - 0.2)) }} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-lg text-white transition-colors hover:border-white/50" aria-label="Zoom out">−</button>
        <button type="button" onClick={(e) => { e.stopPropagation(); setZoom((p) => Math.min(3, p + 0.2)) }} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-lg text-white transition-colors hover:border-white/50" aria-label="Zoom in">+</button>
        <button type="button" onClick={(e) => { e.stopPropagation(); setRotation((p) => p + 90) }} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-base text-white transition-colors hover:border-white/50" aria-label="Rotate">⟳</button>
        <button type="button" onClick={(e) => { e.stopPropagation(); setZoom(1); setRotation(0) }} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-base text-white transition-colors hover:border-white/50" aria-label="Reset">⟲</button>
        <button type="button" onClick={(e) => { e.stopPropagation(); onClose() }} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-base text-white transition-colors hover:border-white/50" aria-label="Close">✕</button>
      </div>

      <button
        type="button"
        disabled={!canPrev}
        onClick={(e) => { e.stopPropagation(); if (canPrev) onPrev() }}
        className="absolute left-6 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-2xl text-white transition-colors hover:border-white/50 disabled:cursor-not-allowed disabled:opacity-35"
        aria-label="Previous image"
      >
        ‹
      </button>

      <img
        src={currentImage.src}
        alt={currentImage.alt}
        className="max-h-[86vh] max-w-[86vw] object-contain transition-transform duration-300"
        style={{ transform: `scale(${zoom}) rotate(${rotation}deg)` }}
        onWheel={handleWheelZoom}
        onClick={(e) => e.stopPropagation()}
        draggable={false}
      />

      <button
        type="button"
        disabled={!canNext}
        onClick={(e) => { e.stopPropagation(); if (canNext) onNext() }}
        className="absolute right-6 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-2xl text-white transition-colors hover:border-white/50 disabled:cursor-not-allowed disabled:opacity-35"
        aria-label="Next image"
      >
        ›
      </button>

      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-white/15 bg-black/40 px-4 py-2 text-[12px] tracking-[0.08em] text-white/70">
        Esc ✕ · ←/→ · Wheel ±
      </div>
    </div>
  )
}

// ─── HomePage ─────────────────────────────────────────────────────────────────

function HomePage() {
  const [heroHovered, setHeroHovered] = useState(false)
  const [heroPointer, setHeroPointer] = useState({ x: 0, y: 0 })
  const [textProgress, setTextProgress] = useState(0)
  const aboutTextRef = useRef(null)
  const actualHeroRef = useRef({ x: 0, y: 0 })
  const trailingHeroRef = useRef({ x: 0, y: 0 })
  const heroRafRef = useRef(null)

  useEffect(() => {
    const animateBg = () => {
      trailingHeroRef.current.x += (actualHeroRef.current.x - trailingHeroRef.current.x) * 0.07
      trailingHeroRef.current.y += (actualHeroRef.current.y - trailingHeroRef.current.y) * 0.07
      setHeroPointer({ x: trailingHeroRef.current.x, y: trailingHeroRef.current.y })
      heroRafRef.current = requestAnimationFrame(animateBg)
    }
    heroRafRef.current = requestAnimationFrame(animateBg)
    return () => cancelAnimationFrame(heroRafRef.current)
  }, [])

  useEffect(() => {
    const updateTextProgress = () => {
      if (!aboutTextRef.current) return

      const rect = aboutTextRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const startPoint = viewportHeight * 0.7
      const endPoint = viewportHeight * 0.45
      const travelDistance = rect.height + (startPoint - endPoint)
      const progress = ((startPoint - rect.top) / travelDistance) * 1.25
      const clamped = Math.max(0, Math.min(1, progress))
      setTextProgress(clamped)
    }

    updateTextProgress()
    window.addEventListener('scroll', updateTextProgress, { passive: true })
    window.addEventListener('resize', updateTextProgress)

    return () => {
      window.removeEventListener('scroll', updateTextProgress)
      window.removeEventListener('resize', updateTextProgress)
    }
  }, [])

  const handleHeroMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    actualHeroRef.current = {
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    }
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <TopNav />

      {/* ── Hero ── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ height: 'clamp(580px, 52vw, 800px)' }}
        onMouseEnter={() => setHeroHovered(true)}
        onMouseLeave={() => setHeroHovered(false)}
        onMouseMove={handleHeroMove}
      >
        <div className="absolute inset-0 bg-[#0A0A0A]" />
        <HoverRevealLayer
          src="/assets/Hero%20bg.png"
          active={heroHovered}
          pointer={heroPointer}
          revealSize={230}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />

        <img
          src="/assets/Hero%20bg%20name.svg"
          alt="Nicky Ralson"
          className="pointer-events-none absolute bottom-[18px] left-1/2 z-10 w-[min(1380px,98vw)] -translate-x-1/2 opacity-55"
          style={{ filter: 'grayscale(1) brightness(1.18) contrast(1.08)' }}
          draggable={false}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[260px] bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/85 to-transparent" />

        {/* Hero text — left padded; image elements flush right */}
        <div className="pointer-events-none absolute left-0 right-0 top-[119px] z-20 flex items-start justify-between">
          <h1
            className="pl-6 lg:pl-[120px] font-semibold leading-[1.03] tracking-[-0.03em] text-[#F5F5F5]"
            style={{ fontSize: UNIFORM_HEADING_SIZE }}
          >
            Product &<br />Visual Designer
          </h1>

          {/* Images are flush to the right viewport edge — no right padding */}
          <div className="flex items-start gap-0.5 flex-shrink-0">
            <img src="/assets/Hero%20image%20element%201.png" alt="Hero element 1" className="h-[clamp(80px,10vw,128px)] w-auto object-cover" />
            <img src="/assets/Hero%20image%20element%202.png" alt="Hero element 2" className="h-[clamp(80px,10vw,128px)] w-auto object-cover" />
            <img src="/assets/Hero%20image%20element%203.png" alt="Hero element 3" className="h-[clamp(80px,10vw,128px)] w-auto object-cover" />
          </div>
        </div>

        {/* Hero portrait */}
        <div
          className="absolute left-1/2 top-[71px] z-10 -translate-x-1/2"
          style={{ height: 'calc(100% - 71px)', width: 'clamp(480px, 54vw, 800px)' }}
        >
          <HoverRevealImage
            baseSrc="/assets/Hero%20image%201.png"
            revealSrc="/assets/Hero%20image%202.png"
            alt="Hero person"
            className="h-full w-full"
            revealSize={160}
          />
        </div>
      </section>

      {/* ── About + logos ── */}
      <section className="w-full bg-[#0A0A0A] px-6 py-20 lg:px-[120px]">
        {/* Scroll-reading text — no inner max-width cap */}
        <div ref={aboutTextRef}>
          <ScrollReadingText text={ABOUT_TEXT} progress={textProgress} />
        </div>

        {/* Work logos grid */}
        <div className="mt-16 grid grid-cols-1 gap-[1px] border border-[#171717] bg-[#171717] sm:grid-cols-2 xl:grid-cols-4">
          {WORK_LOGOS.map((item) => (
            <div
              key={item.role}
              className="flex items-center gap-4 bg-[#0A0A0A] px-6 py-5 transition-colors hover:bg-[#111111]"
            >
              <img src={item.logo} alt={item.company} className="h-12 w-12 rounded-sm bg-white p-2 object-contain flex-shrink-0" draggable={false} />
              <div>
                <p
                  className="font-medium leading-tight text-white"
                  style={{ fontSize: 'clamp(15px, 1.2vw, 19px)' }}
                >
                  {item.role}
                </p>
                <p className="mt-1 text-[13px] text-[#A0A0A0]">{item.company}</p>
                <p className="text-[12px] text-[#7C7C7C]">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <WhatIDoSection />
      <HomeServicesSection />
      <WhereItStartedSection />
      <Footer />
    </main>
  )
}

// ─── WorkPage ─────────────────────────────────────────────────────────────────

function WorkPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <TopNav />

      <section className="w-full px-6 py-20 lg:px-[120px]">
        <div className="py-10">
          <h1
            className="w-full font-semibold leading-[1.2] tracking-[-0.02em] text-white"
            style={{ fontSize: UNIFORM_HEADING_SIZE }}
          >
            What I Do
          </h1>

          <div className="mt-8 flex w-full flex-col gap-8">
            {WORK_CARDS.map((item) => (
              <WorkShowcaseCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

// ─── Project3CasePage ────────────────────────────────────────────────────────

function Project3CasePage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <TopNav />

      {/* ── Hero: bg image visible at top, gradient dark at bottom ── */}
      <section className="relative isolate w-full overflow-hidden" style={{ minHeight: '420px' }}>
        {/* Background image */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "url('/assets/work3-bg.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            backgroundRepeat: 'no-repeat',
          }}
        />
        {/* Gradient overlay — adjust the rgba opacity values below to control darkness:
            • Stop 1 (0%):   top of section  — increase 4th value (0→1) to darken the top
            • Stop 2 (30%):  upper-mid area  — increase to darken where image is brightest
            • Stop 3 (60%):  lower-mid area  — increase to darken the transition zone
            • Stop 4 (85%):  near bottom     — keep high so text area is very dark
            • Stop 5 (100%): bottom edge     — keep at 1 (fully opaque) for solid background */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,10,10,0.50) 0%, rgba(10,10,10,0.70) 0%, rgba(10,10,10,0.9) 60%, rgba(10,10,10,0.95) 85%, rgba(10,10,10,1) 100%)',
          }}
        />

        {/* Text block pinned to the bottom of the section — no border/box */}
        <div
          className="relative z-10 flex flex-col justify-end px-6 pb-12 pt-14 lg:px-[120px] lg:pb-16 lg:pt-0"
          style={{ minHeight: '420px' }}
        >
          <h1
            className="mt-4 max-w-[1200px] leading-[1.2] tracking-[-0.02em] text-white"
            style={{ fontSize: 'clamp(28px, 3.2vw, 52px)', fontWeight: 600 }}
          >
            I worked on designing homepage layouts for Document360 customers. Each project required quick
            turnaround while still maintaining visual quality and consistency.
          </h1>
        </div>
      </section>

      {/* ── Problem / Solution ── */}
      <section className="w-full px-6 py-16 lg:px-[120px] lg:py-20">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* Problem card */}
          <article className="relative overflow-hidden px-6 pb-8 pt-16 lg:px-8 lg:pb-10 lg:pt-20">
            {/* Ghost "PROBLEM" text — gradient from subtle dark-gray to transparent */}
            <p
              aria-hidden="true"
              className="pointer-events-none absolute left-5 top-3 select-none font-extrabold uppercase leading-none tracking-[-0.02em] lg:left-7"
              style={{
                fontSize: 'clamp(52px, 5.5vw, 72px)',
                background: 'linear-gradient(180deg, rgba(35,35,35,0.85) 0%, rgba(10,10,10,0) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Problem
            </p>
            <p className="text-[clamp(18px,1.6vw,24px)] font-semibold leading-[1.35] text-white">
              Designing each homepage from scratch was slow and inconsistent.
            </p>
            <ul className="mt-6 space-y-3 text-[15px] leading-[1.7] text-[#878787]">
              <li>• Layouts varied across projects</li>
              <li>• No clear structure to follow</li>
              <li>• Repeating similar work again and again</li>
              <li>• Difficult to maintain visual consistency at scale</li>
            </ul>
            <p className="mt-6 text-[15px] font-semibold italic leading-[1.6] text-white/90">
              "This made it hard to deliver fast without compromising quality."
            </p>
          </article>

          {/* Solution card */}
          <article className="relative overflow-hidden px-6 pb-8 pt-16 lg:px-8 lg:pb-10 lg:pt-20">
            {/* Ghost "SOLUTION" text */}
            <p
              aria-hidden="true"
              className="pointer-events-none absolute left-5 top-3 select-none font-extrabold uppercase leading-none tracking-[-0.02em] lg:left-7"
              style={{
                fontSize: 'clamp(52px, 5.5vw, 72px)',
                background: 'linear-gradient(180deg, rgba(35,35,35,0.85) 0%, rgba(10,10,10,0) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Solution
            </p>
            <p className="text-[clamp(18px,1.6vw,24px)] font-semibold leading-[1.35] text-white">
              I started building reusable layout structures instead of designing each page from scratch.
            </p>
            <ul className="mt-6 space-y-3 text-[15px] leading-[1.7] text-[#878787]">
              <li>• Defined common layout patterns</li>
              <li>• Created flexible sections that could be reused</li>
              <li>• Standardized typography and spacing</li>
              <li>• Built templates that adapt to different brands</li>
            </ul>
            <p className="mt-6 text-[15px] font-semibold italic leading-[1.6] text-white/90">
              "This made the process faster and more structured."
            </p>
          </article>
        </div>
      </section>

      {/* ── Outcome — same WorkShowcaseCard as home page ── */}
      <section className="w-full px-6 pb-20 lg:px-[120px] lg:pb-28">
        <WorkShowcaseCard
          item={{
            id: 'outcome',
            tag: 'OUTCOME',
            title: 'Delivered 100+ homepage designs with better consistency and faster execution by using reusable layout systems.',
            description: '',
            image: '/assets/work3-img.png',
            link: 'https://www.figma.com/proto/ZJvl3bW8ooubpkivtCLQDH/Portfolio--Nicky-Ralson-?node-id=387-4073&viewport=647%2C606%2C0.08&t=nYquiMd4LS0OxI0c-1&scaling=min-zoom&content-scaling=fixed&page-id=349%3A18',
            isInternal: false,
          }}
        />
      </section>

      <Footer />
    </main>
  )
}

// ─── GalleryPage ──────────────────────────────────────────────────────────────

function GalleryPage() {
  const [activeIndex, setActiveIndex] = useState(null)

  const goNext = () => setActiveIndex((prev) => (prev === null ? 0 : Math.min(prev + 1, GALLERY_IMAGES.length - 1)))
  const goPrev = () => setActiveIndex((prev) => (prev === null ? 0 : Math.max(prev - 1, 0)))

  const canPrev = activeIndex !== null && activeIndex > 0
  const canNext = activeIndex !== null && activeIndex < GALLERY_IMAGES.length - 1

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <TopNav />

      <section className="w-full px-6 py-20 lg:px-[120px]">
        {/* No inner max-width — full bleed within padding */}
        <h1
          className="font-semibold leading-[1.1] tracking-[-0.02em] text-white"
          style={{ fontSize: UNIFORM_HEADING_SIZE }}
        >
          Vector illustrations
        </h1>

        <div className="mt-10 grid grid-cols-2 gap-4 xl:grid-cols-3 2xl:grid-cols-4">
          {GALLERY_IMAGES.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group relative aspect-square overflow-hidden"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                draggable={false}
              />
            </button>
          ))}
        </div>
      </section>

      <GalleryLightbox
        images={GALLERY_IMAGES}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNext={goNext}
        onPrev={goPrev}
        canNext={canNext}
        canPrev={canPrev}
      />
      <Footer />
    </main>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  return null
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/work/product-ui" element={<Project3CasePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App