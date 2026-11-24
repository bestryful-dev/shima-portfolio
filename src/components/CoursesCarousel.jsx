import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CaretLeft, CaretRight, Certificate } from "@phosphor-icons/react";
import { AtelierCard } from "./motion/MotionPrimitives";

export function CoursesCarousel({ courses, isRtl }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeIndex, setActiveIndex] = useState(0);

  const filtered =
    activeFilter === "all"
      ? courses.items
      : courses.items.filter((item) => item.category === activeFilter);

  const safeIndex = activeIndex >= filtered.length ? 0 : activeIndex;

  function handleFilterChange(id) {
    setActiveFilter(id);
    setActiveIndex(0);
  }

  function handlePrev() {
    setActiveIndex((prev) => (prev <= 0 ? filtered.length - 1 : prev - 1));
  }

  function handleNext() {
    setActiveIndex((prev) => (prev >= filtered.length - 1 ? 0 : prev + 1));
  }

  const visibleCount = Math.min(3, filtered.length);
  const visibleItems = Array.from({ length: visibleCount }, (_, offset) => {
    const idx = (safeIndex + offset) % filtered.length;
    return filtered[idx];
  });

  const PrevIcon = isRtl ? CaretRight : CaretLeft;
  const NextIcon = isRtl ? CaretLeft : CaretRight;

  return (
    <div>
      {/* Filters + Carousel Navigation */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {courses.filters.map((f) => {
            const active = activeFilter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => handleFilterChange(f.id)}
                className={`relative border px-3.5 py-2 text-xs transition ${
                  active
                    ? "border-[#175955] text-white font-semibold"
                    : "border-[#175955]/20 bg-white text-[#525B66] hover:border-[#175955]/50 hover:text-[#1A1E24]"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="courseFilterPill"
                    transition={{ type: "spring", stiffness: 360, damping: 28 }}
                    className="absolute inset-0 bg-[#175955]"
                  />
                )}
                <span className="relative z-10">{f.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <span className="text-xs tabular-nums text-[#525B66]" dir="ltr">
            {String(safeIndex + 1).padStart(2, "0")} / {String(filtered.length).padStart(2, "0")}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous course"
              className="flex h-9 w-9 items-center justify-center border border-[#175955]/25 bg-white text-[#1A1E24] transition hover:border-[#175955] hover:text-[#175955]"
            >
              <PrevIcon size={16} weight="bold" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next course"
              className="flex h-9 w-9 items-center justify-center border border-[#175955]/25 bg-white text-[#1A1E24] transition hover:border-[#175955] hover:text-[#175955]"
            >
              <NextIcon size={16} weight="bold" />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel Cards */}
      <div className="mt-8 overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={`${activeFilter}-${safeIndex}`}
            initial={{ opacity: 0, x: isRtl ? -24 : 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isRtl ? 24 : -24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-6 md:grid-cols-3"
          >
            {visibleItems.map((course, idx) => (
              <AtelierCard
                key={course.id}
                className={`flex h-full flex-col justify-between p-6 ${
                  idx === 0 ? "border-[#175955]/40" : ""
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 border border-[#175955]/20 bg-[#175955]/8 px-2.5 py-1 text-[11px] font-medium text-[#175955]">
                      <Certificate size={14} weight="duotone" />
                      {course.badge}
                    </span>
                    <span className="text-xs font-medium text-[#B88B6A]">{course.year}</span>
                  </div>

                  <h3 className="mt-5 text-base sm:text-lg font-semibold leading-snug text-[#1A1E24]">
                    {course.title}
                  </h3>
                </div>

                <p className="mt-5 border-t border-[#175955]/12 pt-3 text-xs text-[#525B66]">
                  {course.org}
                </p>
              </AtelierCard>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="mt-6 flex justify-center gap-2">
        {filtered.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveIndex(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`h-1.5 transition-all duration-300 ${
              idx === safeIndex ? "w-7 bg-[#175955]" : "w-2 bg-[#175955]/25 hover:bg-[#175955]/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}