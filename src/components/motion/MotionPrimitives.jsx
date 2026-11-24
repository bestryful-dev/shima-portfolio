import { useRef, useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useScroll,
  useSpring,
  useInView,
  useReducedMotion,
} from "motion/react";

/**
 * 1. Top Botanical-Sage to Champagne Scroll Progress Bar
 */
export function ScrollProgressLine() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-[#175955] via-[#2A7B76] to-[#B88B6A] origin-left z-50 pointer-events-none"
    />
  );
}

/**
 * 2. Smooth Blur-to-Sharp Entrance
 */
export function BlurFade({ children, delay = 0, yOffset = 18, className = "" }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.12 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * 3. Porcelain Atelier Cursor-Tracking Card
 */
export function AtelierCard({ children, className = "", onClick }) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(-999);
  const mouseY = useMotionValue(-999);
  const shouldReduceMotion = useReducedMotion();

  function handleMouseMove(e) {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  function handleMouseLeave() {
    mouseX.set(-999);
    mouseY.set(-999);
  }

  const spotlightBg = useMotionTemplate`radial-gradient(360px circle at ${mouseX}px ${mouseY}px, rgba(23, 89, 85, 0.06), transparent 75%)`;
  const borderGlow = useMotionTemplate`radial-gradient(260px circle at ${mouseX}px ${mouseY}px, rgba(184, 139, 106, 0.45), transparent 75%)`;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`group relative overflow-hidden border border-[#175955]/15 bg-white shadow-[0_6px_28px_-12px_rgba(26,30,36,0.08)] transition-all duration-300 hover:border-[#175955]/35 hover:shadow-[0_14px_34px_-14px_rgba(23,89,85,0.16)] ${className}`}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlightBg }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: borderGlow,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

/**
 * 4. Soft Champagne & Sage Perimeter Beam around Hero Portrait
 */
export function PorcelainBeam({ duration = 11 }) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-[100%] opacity-55"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg 280deg, rgba(23, 89, 85, 0.65) 320deg, rgba(184, 139, 106, 0.75) 345deg, transparent 360deg)",
        }}
      />
      <div className="absolute inset-[1.5px] bg-white" />
    </div>
  );
}

/**
 * 5. Magnetic Button
 */
export function MagneticButton({ children, className = "", onClick, type = "button" }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18 });
  const springY = useSpring(y, { stiffness: 260, damping: 18 });
  const shouldReduceMotion = useReducedMotion();

  function handleMouseMove(e) {
    if (shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.14);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.14);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.97 }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

/**
 * 6. Metric Counter on Scroll (ESLint-Clean)
 */
export function NumberTicker({ value, decimals = 0, prefix = "", suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.2 });
  const [displayValue, setDisplayValue] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!inView || shouldReduceMotion) return;

    let startTime = null;
    const duration = 1100;
    let frameId;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(eased * value);
      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    }

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [inView, value, shouldReduceMotion]);

  const activeValue = shouldReduceMotion ? value : displayValue;
  const formatted =
    decimals > 0
      ? activeValue.toFixed(decimals)
      : value === 2022
      ? String(Math.round(activeValue))
      : Math.round(activeValue).toLocaleString("en-US");

  return (
    <span ref={ref} dir="ltr" className="inline-block tabular-nums">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

/**
 * 7. Smooth Moving Skills Ribbon (Pauses on Hover, RTL-safe)
 */
export function SkillsRibbon({ items, reverse = false, isRtl = false }) {
  const doubled = [...items, ...items];

  return (
    <div dir="ltr" className="ribbon-wrapper relative overflow-hidden py-2">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#F2EFE9] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#F2EFE9] to-transparent" />

      <div className={reverse ? "animate-ribbon-reverse" : "animate-ribbon-forward"}>
        {doubled.map((skill, idx) => (
          <div
            key={`${skill}-${idx}`}
            dir={isRtl ? "rtl" : "ltr"}
            className="mx-2 inline-flex shrink-0 items-center gap-2.5 border border-[#175955]/18 bg-white px-4 py-2.5 text-xs sm:text-sm text-[#1A1E24] shadow-xs transition-colors hover:border-[#175955]/50"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#B88B6A]" />
            <span className="whitespace-nowrap">{skill}</span>
          </div>
        ))}
      </div>
    </div>
  );
}