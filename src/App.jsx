import { useState, useEffect, useRef } from "react";
import Lenis from "lenis";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import {
  ArrowUpRight,
  ArrowUpLeft,
  ArrowDown,
  Sparkle,
  ShieldCheck,
  GraduationCap,
  Buildings,
  MapPin,
  Globe,
  List,
  X,
  LockKey,
  UserCheck,
  WhatsappLogo,
} from "@phosphor-icons/react";

import { CONTENT, CONTACT_CONFIG } from "./data/content";
import { DentalLogo } from "./components/DentalLogo";
import { BeforeAfterSlider } from "./components/BeforeAfterSlider";
import { CoursesCarousel } from "./components/CoursesCarousel";
import { AppointmentDrawer } from "./components/AppointmentDrawer";
import {
  ScrollProgressLine,
  BlurFade,
  AtelierCard,
  PorcelainBeam,
  MagneticButton,
  NumberTicker,
  SkillsRibbon,
} from "./components/motion/MotionPrimitives";

export default function App() {
  const [lang, setLang] = useState("ar"); // Default Arabic RTL
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerAudience, setDrawerAudience] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isRtl = lang === "ar";
  const t = CONTENT[lang];
  const DirectionArrow = isRtl ? ArrowUpLeft : ArrowUpRight;

  // Lenis smooth scroll
  const lenisRef = useRef(null);
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (x) => Math.min(1, 1.001 - Math.pow(2, -10 * x)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang, isRtl]);

  // Hero portrait parallax
  const heroRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(heroScroll, [0, 1], [0, shouldReduceMotion ? 0 : 44]);

  function scrollToId(id) {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -80 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  function openDrawer(audienceIdx = 0) {
    setMobileMenuOpen(false);
    setDrawerAudience(audienceIdx);
    setDrawerOpen(true);
  }

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="min-h-screen bg-[#FBF9F6] text-[#1A1E24] overflow-x-clip"
    >
      <ScrollProgressLine />

      {/* 1. Distinct Deep Botanical-Sage Navbar + Mobile Menu Bar */}
      <header className="fixed top-0 inset-x-0 z-40 border-b border-white/15 bg-[#175955]/95 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("top");
            }}
          >
            <DentalLogo isRtl={isRtl} inverted />
          </a>

          <nav className="hidden md:flex items-center gap-7">
            {t.nav.links.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToId(item.id)}
                className="text-sm text-white/80 transition hover:text-[#E7C6A8]"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setLang((prev) => (prev === "ar" ? "en" : "ar"))}
              aria-label={t.nav.langAria}
              className="inline-flex items-center gap-1.5 border border-white/25 bg-white/10 px-3 py-2 text-xs font-medium text-white transition hover:bg-white/20"
            >
              <Globe size={15} className="text-[#E7C6A8]" />
              <span>{t.nav.langToggle}</span>
            </button>

            <MagneticButton
              onClick={() => openDrawer(0)}
              className="hidden sm:inline-flex items-center gap-2 bg-[#FBF9F6] px-4 py-2 text-xs sm:text-sm font-semibold text-[#175955] transition hover:bg-white"
            >
              <span>{t.nav.cta}</span>
              <DirectionArrow size={15} weight="bold" />
            </MagneticButton>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={isRtl ? "قائمة التنقل" : "Toggle navigation menu"}
              className="inline-flex md:hidden h-[34px] w-[34px] items-center justify-center border border-white/25 bg-white/10 text-white transition hover:bg-white/20"
            >
              {mobileMenuOpen ? <X size={17} weight="bold" /> : <List size={18} weight="bold" />}
            </button>
          </div>
        </div>

        {/* Mobile Toggle Menu Bar */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden overflow-hidden border-t border-[#175955]/15 bg-[#FBF9F6]/95 backdrop-blur-md"
            >
              <div className="mx-auto max-w-6xl space-y-2 px-5 py-4">
                {t.nav.links.map((item, idx) => (
                  <motion.button
                    key={item.id}
                    type="button"
                    initial={{ opacity: 0, x: isRtl ? 14 : -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04, duration: 0.22 }}
                    onClick={() => scrollToId(item.id)}
                    className="flex w-full items-center justify-between border border-[#175955]/15 bg-white px-4 py-3 text-sm font-medium text-[#1A1E24] transition hover:border-[#175955] hover:text-[#175955]"
                  >
                    <span className="flex items-center gap-3">
                      <span dir="ltr" className="text-[11px] font-mono text-[#B88B6A]">
                        0{idx + 1}
                      </span>
                      <span>{item.label}</span>
                    </span>
                    <DirectionArrow size={15} className="text-[#175955]" />
                  </motion.button>
                ))}

                <button
                  type="button"
                  onClick={() => openDrawer(0)}
                  className="sm:hidden mt-2 flex w-full items-center justify-center gap-2 bg-[#175955] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#134744]"
                >
                  <span>{t.nav.cta}</span>
                  <DirectionArrow size={16} weight="bold" />
                </button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* 2. Hero Section */}
      <section
        id="top"
        ref={heroRef}
        className="bg-atelier-grid relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24 border-b border-[#175955]/15"
      >
        {CONTACT_CONFIG.heroBgImage && (
          <img
            src={CONTACT_CONFIG.heroBgImage}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-55"
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#FBF9F6]/45 via-[#FBF9F6]/58 to-[#FBF9F6]" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <BlurFade delay={0.04}>
              <div className="inline-flex items-center gap-2 border border-[#175955]/25 bg-white px-3 py-1 text-[11px] font-medium text-[#175955] shadow-xs">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{t.hero.availabilityBadge}</span>
              </div>
            </BlurFade>

            <BlurFade delay={0.09}>
              <p className="mt-4 text-xs font-semibold tracking-wide text-[#B88B6A]">
                {t.hero.eyebrow}
              </p>
              <p className="mt-1.5 text-lg font-semibold text-[#175955]">{t.hero.nameTitle}</p>
            </BlurFade>

            <BlurFade delay={0.15}>
              <h1 className="font-editorial mt-3 text-4xl font-semibold leading-[1.15] text-[#1A1E24] sm:text-6xl lg:text-[4.1rem]">
                {t.hero.titleLine1}
                <span className={`block text-[#175955] ${!isRtl ? "italic font-medium" : "mt-1"}`}>
                  {t.hero.titleAccent}
                </span>
              </h1>
            </BlurFade>

            <BlurFade delay={0.22}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-[#525B66] sm:text-lg">
                {t.hero.subtitle}
              </p>
            </BlurFade>

            {/* Dual-Audience CTAs */}
            <BlurFade delay={0.28}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <MagneticButton
                  onClick={() => openDrawer(0)}
                  className="inline-flex items-center gap-2.5 bg-[#175955] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#134744]"
                >
                  <span>{t.hero.primaryCta}</span>
                  <DirectionArrow size={17} weight="bold" />
                </MagneticButton>

                <button
                  type="button"
                  onClick={() => scrollToId("journey")}
                  className="inline-flex items-center gap-2.5 border border-[#175955]/30 bg-white px-6 py-3.5 text-sm font-medium text-[#1A1E24] transition hover:border-[#175955] hover:bg-[#F2EFE9]"
                >
                  <ShieldCheck size={17} weight="duotone" className="text-[#175955]" />
                  <span>{t.hero.secondaryCta}</span>
                </button>
              </div>
            </BlurFade>

            <BlurFade delay={0.34}>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-xs text-[#525B66]">
                <span className="inline-flex items-center gap-1.5">
                  <GraduationCap size={16} className="text-[#175955]" />
                  {t.hero.badges[0]}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Buildings size={16} className="text-[#B88B6A]" />
                  {t.hero.badges[1]}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Sparkle size={16} className="text-[#175955]" />
                  {t.hero.badges[2]}
                </span>
              </div>
            </BlurFade>
          </div>

          {/* Editorial Portrait + Floating Distinction Card */}
          <div className="lg:col-span-5">
            <motion.div style={{ y: portraitY }} className="relative mx-auto max-w-sm">
              <div className="relative border border-[#175955]/20 bg-white p-3 shadow-[0_20px_50px_-20px_rgba(23,89,85,0.2)]">
                <PorcelainBeam duration={11} />
                <span className="pointer-events-none absolute -top-1 -left-1 h-4 w-4 border-t-2 border-l-2 border-[#175955]" />
                <span className="pointer-events-none absolute -bottom-1 -right-1 h-4 w-4 border-b-2 border-r-2 border-[#B88B6A]" />

                <div className="relative z-10 aspect-[4/4.6] w-full overflow-hidden border border-[#175955]/12 bg-[#F2EFE9]">
                  {CONTACT_CONFIG.portraitImage ? (
                    <img
                      src={CONTACT_CONFIG.portraitImage}
                      alt={t.hero.nameTitle}
                      className="h-full w-full object-cover object-top"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-between p-6 text-center">
                      <span className="border border-[#175955]/25 bg-white px-3 py-1 text-[11px] font-medium text-[#175955]">
                        {t.hero.nameTitle}
                      </span>
                      <div className="flex flex-col items-center">
                        <span className="font-editorial text-5xl font-semibold text-[#175955]">
                          93.78%
                        </span>
                        <span className="mt-1 text-xs text-[#B88B6A] font-medium">
                          {isRtl ? "تقدير ممتاز — طب الأسنان" : "Excellent Distinction — B.D.S."}
                        </span>
                      </div>
                      <span className="text-[11px] tracking-wide text-[#525B66]">
                        {t.hero.portraitComingSoon}
                      </span>
                    </div>
                  )}
                </div>

                <div className="relative z-10 mt-3 flex items-center justify-between px-1 text-[11px] text-[#525B66]">
                  <span>{t.hero.portraitFigure}</span>
                  <span className="inline-flex items-center gap-1 text-[#175955] font-medium">
                    <MapPin size={12} />
                    {isRtl ? "جدة، السعودية" : "Jeddah, KSA"}
                  </span>
                </div>
              </div>

              {/* Detached Academic & English Distinction Card */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="mt-4 border border-[#175955]/20 bg-white px-5 py-4 shadow-sm"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#B88B6A]">
                      {t.hero.floatingCardTitle}
                    </p>
                    <p className="text-[11px] text-[#525B66]">{t.hero.floatingCardSub}</p>
                  </div>
                  <p className="text-base font-bold text-[#175955]" dir="ltr">
                    {t.hero.floatingCardValue}
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between gap-4 border-t border-[#175955]/12 pt-3">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#B88B6A]">
                      {t.hero.englishCardTitle}
                    </p>
                    <p className="text-[11px] text-[#525B66]">{t.hero.englishCardSub}</p>
                  </div>
                  <p className="text-sm font-bold text-[#175955]">
                    {t.hero.englishCardValue}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="relative mx-auto mt-14 flex max-w-6xl justify-center px-5 sm:justify-start sm:px-8">
          <button
            type="button"
            onClick={() => scrollToId("metrics")}
            className="inline-flex items-center gap-2 text-xs text-[#525B66] transition hover:text-[#175955]"
          >
            <span>{t.hero.scrollHint}</span>
            <ArrowDown size={14} className="animate-bounce text-[#175955]" />
          </button>
        </div>
      </section>

      {/* 3. Credibility Strip */}
      <section id="metrics" className="border-b border-[#175955]/15 bg-[#F2EFE9]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-y sm:divide-y-0 sm:grid-cols-4 sm:divide-x divide-[#175955]/15 rtl:sm:divide-x-reverse">
          {t.metrics.map((m, idx) => (
            <BlurFade key={idx} delay={idx * 0.06} className="px-6 py-8 text-center sm:text-start">
              <div className="font-editorial text-3xl font-bold text-[#175955] sm:text-4xl">
                <NumberTicker
                  value={m.value}
                  decimals={m.decimals}
                  prefix={m.prefix}
                  suffix={m.suffix}
                />
              </div>
              <p className="mt-2 text-xs font-medium text-[#525B66]">{m.label}</p>
            </BlurFade>
          ))}
        </div>
      </section>

      {/* 4. Sticky Pinned Clinical Journey (4 Sana'a Hospitals & Clinics) */}
      <section id="journey" className="py-20 sm:py-28 border-b border-[#175955]/15">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:items-start">
          {/* Pinned Sticky Left Column */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <BlurFade>
              <p className="text-xs font-semibold tracking-wider text-[#B88B6A]">
                {t.journey.sectionTag}
              </p>
              <h2 className="font-editorial mt-3 text-3xl font-semibold leading-tight text-[#1A1E24] sm:text-5xl">
                {t.journey.titleStart}
                <span className={`block text-[#175955] ${!isRtl ? "italic font-medium" : "mt-1"}`}>
                  {t.journey.titleAccent}
                </span>
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-[#525B66] sm:text-base">
                {t.journey.stickyLead}
              </p>
            </BlurFade>

            <div className="mt-8 space-y-3">
              {t.journey.highlights.map((item, idx) => (
                <BlurFade key={idx} delay={idx * 0.06}>
                  <div className="border border-[#175955]/15 bg-white p-4 shadow-xs">
                    <p className="text-[11px] font-semibold text-[#B88B6A]">{item.label}</p>
                    <p className="mt-1 text-sm font-medium text-[#1A1E24]">{item.value}</p>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>

          {/* Scrolling Experience Cards Right Column */}
          <div className="lg:col-span-7 space-y-6">
            {t.journey.experiences.map((exp, idx) => (
              <BlurFade key={idx} delay={idx * 0.07}>
                <AtelierCard className="p-7 sm:p-8">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-mono font-semibold text-[#B88B6A]">
                      {exp.index}
                    </span>
                    <span className="border border-[#175955]/20 bg-[#175955]/8 px-3 py-1 text-[11px] font-semibold text-[#175955]">
                      {exp.duration}
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-[#1A1E24]">{exp.org}</h3>
                  <p className="mt-1 text-xs font-medium text-[#175955]">{exp.role}</p>
                  <p className="mt-4 text-sm leading-relaxed text-[#525B66]">{exp.summary}</p>
                </AtelierCard>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Interactive Before/After Smile Slider + Treatment Pillars + Skills Ribbon */}
      <section id="treatments" className="py-20 sm:py-28 border-b border-[#175955]/15 bg-[#F2EFE9]">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <BlurFade>
            <p className="text-xs font-semibold tracking-wider text-[#B88B6A]">
              {t.treatments.sectionTag}
            </p>
            <h2 className="font-editorial mt-3 text-3xl font-semibold text-[#1A1E24] sm:text-5xl">
              {t.treatments.titleStart}{" "}
              <span className={`text-[#175955] ${!isRtl ? "italic font-medium" : ""}`}>
                {t.treatments.titleAccent}
              </span>
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-[#525B66] sm:text-base">
              {t.treatments.subtitle}
            </p>
          </BlurFade>

          {/* Interactive Dual-Case Drag-Comparison Slider */}
          <BlurFade delay={0.1} className="mt-10">
            <BeforeAfterSlider cases={t.treatments.sliderCases} />
          </BlurFade>

          {/* 4 Clinical Pillars */}
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {t.treatments.pillars.map((pillar, idx) => (
              <BlurFade key={pillar.id} delay={idx * 0.06}>
                <AtelierCard className="h-full p-6">
                  <span className="text-[11px] font-semibold text-[#B88B6A]">{pillar.tag}</span>
                  <h3 className="mt-3 text-lg font-semibold text-[#1A1E24]">{pillar.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#525B66]">{pillar.desc}</p>
                </AtelierCard>
              </BlurFade>
            ))}
          </div>

          {/* Moving Skills Ribbon */}
          <div className="mt-14">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#175955]">
              {t.treatments.skillsTitle}
            </p>
            <SkillsRibbon items={t.treatments.skillsList} isRtl={isRtl} />
          </div>
        </div>
      </section>

      {/* 6. 10 Courses & Conferences Interactive Carousel */}
      <section id="courses" className="py-20 sm:py-28 border-b border-[#175955]/15">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <BlurFade>
            <p className="text-xs font-semibold tracking-wider text-[#B88B6A]">
              {t.courses.sectionTag}
            </p>
            <h2 className="font-editorial mt-3 text-3xl font-semibold text-[#1A1E24] sm:text-5xl">
              {t.courses.titleStart}{" "}
              <span className={`text-[#175955] ${!isRtl ? "italic font-medium" : ""}`}>
                {t.courses.titleAccent}
              </span>
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-[#525B66] sm:text-base">
              {t.courses.subtitle}
            </p>
          </BlurFade>

          <CoursesCarousel courses={t.courses} isRtl={isRtl} />
        </div>
      </section>

      {/* 7. Medical References (Privacy Protected — Contact Upon Request) */}
      <section id="references" className="py-20 sm:py-24 border-b border-[#175955]/15 bg-[#F2EFE9]">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <BlurFade>
              <p className="text-xs font-semibold tracking-wider text-[#B88B6A]">
                {t.references.sectionTag}
              </p>
              <h2 className="font-editorial mt-3 text-3xl font-semibold text-[#1A1E24] sm:text-5xl">
                {t.references.titleStart}{" "}
                <span className={`text-[#175955] ${!isRtl ? "italic font-medium" : ""}`}>
                  {t.references.titleAccent}
                </span>
              </h2>
            </BlurFade>

            <button
              type="button"
              onClick={() => openDrawer(1)}
              className="inline-flex items-center gap-2 self-start sm:self-auto border border-[#175955]/30 bg-white px-4 py-2.5 text-xs font-semibold text-[#175955] transition hover:bg-[#175955] hover:text-white"
            >
              <LockKey size={15} weight="duotone" />
              <span>{t.references.requestRefBtn}</span>
            </button>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {t.references.items.map((refItem, idx) => {
              const refPhoto = CONTACT_CONFIG.referenceImages?.[idx];
              return (
                <BlurFade key={idx} delay={idx * 0.06}>
                  <AtelierCard className="h-full p-6">
                    <div className="flex items-center justify-between gap-3">
                      <span className="border border-[#B88B6A]/35 bg-[#B88B6A]/10 px-2.5 py-1 text-[11px] font-medium text-[#8C6245]">
                        {refItem.tag}
                      </span>
                      {refPhoto ? (
                        <img
                          src={refPhoto}
                          alt={refItem.name}
                          className="h-12 w-12 rounded-full border border-[#175955]/25 object-cover object-top shadow-xs"
                        />
                      ) : (
                        <UserCheck size={18} weight="duotone" className="text-[#175955]" />
                      )}
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-[#1A1E24]">{refItem.name}</h3>
                    <p className="mt-1.5 text-sm text-[#525B66]">{refItem.title}</p>
                  </AtelierCard>
                </BlurFade>
              );
            })}
          </div>

          <p className="mt-5 flex items-center gap-2 text-xs text-[#525B66]">
            <LockKey size={14} className="text-[#175955]" />
            <span>{t.references.privacyNote}</span>
          </p>
        </div>
      </section>

      {/* 8. Conversion Footer */}
      <footer id="contact" className="py-20 sm:py-24 bg-[#EAE5DC]">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <BlurFade>
            <p className="text-xs font-semibold tracking-wider text-[#B88B6A]">
              {t.ctaFooter.sectionTag}
            </p>
            <h2 className="font-editorial mt-4 text-4xl font-semibold text-[#1A1E24] sm:text-6xl">
              {t.ctaFooter.titleStart}
              <span className={`block text-[#175955] ${!isRtl ? "italic font-medium" : "mt-1"}`}>
                {t.ctaFooter.titleAccent}
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm text-[#525B66] sm:text-base">
              {t.ctaFooter.subtitle}
            </p>

            <div className="mt-8 flex justify-center">
              <MagneticButton
                onClick={() => openDrawer(0)}
                className="inline-flex items-center gap-2.5 bg-[#175955] px-7 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#134744]"
              >
                <span>{t.ctaFooter.button}</span>
                <DirectionArrow size={17} weight="bold" />
              </MagneticButton>
            </div>
          </BlurFade>
        </div>

        {/* Owner Footer Info */}
        <div className="mx-auto mt-16 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-[#175955]/15 px-5 pt-8 text-xs text-[#525B66] sm:flex-row sm:px-8">
          <DentalLogo isRtl={isRtl} />
          <div className="flex flex-wrap items-center gap-6">
            <span>{t.ctaFooter.location}</span>
            <span>{t.ctaFooter.copyright}</span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href={`mailto:${CONTACT_CONFIG.email}`}
              dir="ltr"
              className="font-medium text-[#175955] hover:underline underline-offset-4"
            >
              {CONTACT_CONFIG.email}
            </a>
            <span dir="ltr" className="text-[#1A1E24]">
              {CONTACT_CONFIG.phoneDisplay}
            </span>
          </div>
        </div>

        {/* Bestryful Soft Agency Credit Bar (Logo + Website + WhatsApp Icon Only) */}
        <div className="mx-auto mt-6 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-[#175955]/10 px-5 pt-6 text-xs text-[#525B66] sm:flex-row sm:px-8">
          <div className="flex items-center gap-2.5">
            <span>{isRtl ? "تصميم وتطوير:" : "Crafted by"}</span>
            <a
              href={CONTACT_CONFIG.agency.website}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded border border-[#175955]/20 bg-white px-3 py-1.5 text-[#1A1E24] transition hover:border-[#175955]/55"
            >
              <img
                src={CONTACT_CONFIG.agency.logo}
                alt={CONTACT_CONFIG.agency.name}
                className="h-5 w-5 rounded object-contain"
              />
              <span className="font-semibold">{CONTACT_CONFIG.agency.name}</span>
              <DirectionArrow size={12} className="text-[#175955]" />
            </a>
          </div>

          <a
            href={`https://wa.me/${CONTACT_CONFIG.agency.whatsappNumber}?text=${encodeURIComponent(
              CONTACT_CONFIG.agency.premadeMessage
            )}`}
            target="_blank"
            rel="noreferrer"
            aria-label={isRtl ? "تواصل مع Bestryful Soft عبر واتساب" : "Contact Bestryful Soft on WhatsApp"}
            title={isRtl ? "تواصل مع Bestryful Soft عبر واتساب" : "Contact Bestryful Soft on WhatsApp"}
            className="flex h-8 w-8 items-center justify-center border border-emerald-600/30 bg-white text-emerald-600 transition hover:border-emerald-600 hover:bg-emerald-50"
          >
            <WhatsappLogo size={18} weight="fill" />
          </a>
        </div>
      </footer>

      <AppointmentDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        copy={t.drawer}
        isRtl={isRtl}
        initialAudience={drawerAudience}
      />
    </div>
  );
}