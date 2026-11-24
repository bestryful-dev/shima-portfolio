import { useState, useRef } from "react";
import { ArrowsLeftRight, Sparkle } from "@phosphor-icons/react";
import { CONTACT_CONFIG } from "../data/content";

function DentalCaseArtwork({ caseId = "ortho", variant = "before" }) {
  const isAfter = variant === "after";
  const isCleaning = caseId === "cleaning";
  const toothFill = isAfter ? "#FFFFFF" : "#EDE3C8";
  const toothStroke = isAfter ? "#CBD5E1" : "#C5B492";
  const bgGradient = isAfter
    ? "from-[#EAF4F3] via-[#FBF9F6] to-[#E3F0EE]"
    : "from-[#EFECE6] via-[#E5DFD5] to-[#DDD5C7]";

  return (
    <div
      className={`relative flex h-full w-full items-center justify-center bg-gradient-to-br ${bgGradient} select-none`}
    >
      <div className="absolute inset-6 border border-[#175955]/12 pointer-events-none" />

      <div className="relative flex flex-col items-center">
        {isCleaning ? (
          /* Lingual Arch Deep Scaling Artwork */
          <svg viewBox="0 0 320 140" className="w-64 sm:w-80 drop-shadow-sm">
            <path
              d="M45 120 Q160 10 275 120"
              fill="none"
              stroke="#E6A4A4"
              strokeWidth="26"
              strokeLinecap="round"
            />
            {[
              { x: 66, y: 74, r: -18 },
              { x: 102, y: 50, r: -10 },
              { x: 146, y: 38, r: 0 },
              { x: 190, y: 50, r: 10 },
              { x: 226, y: 74, r: 18 },
            ].map((t, i) => (
              <g key={i} transform={`rotate(${t.r} ${t.x + 14} ${t.y + 20})`}>
                <rect
                  x={t.x}
                  y={t.y}
                  width="28"
                  height="38"
                  rx="10"
                  fill={toothFill}
                  stroke={toothStroke}
                  strokeWidth="1.3"
                />
                {!isAfter && (
                  <path
                    d={`M${t.x + 4} ${t.y + 24} Q${t.x + 14} ${t.y + 16} ${t.x + 24} ${t.y + 24} L${t.x + 22} ${t.y + 34} L${t.x + 6} ${t.y + 34} Z`}
                    fill="#B7791F"
                    opacity="0.72"
                  />
                )}
              </g>
            ))}
          </svg>
        ) : (
          /* Orthodontics & Cavity Care Artwork */
          <svg viewBox="0 0 320 140" className="w-64 sm:w-80 drop-shadow-sm">
            <path
              d="M30 70 Q160 14 290 70 Q160 128 30 70 Z"
              fill={isAfter ? "#FDF6F4" : "#F3EAE6"}
              stroke="#B88B6A"
              strokeWidth="1.5"
              opacity="0.75"
            />
            {[
              { x: 64, w: 22, h: 36, y: isAfter ? 52 : 55, rot: isAfter ? 0 : -7 },
              { x: 88, w: 24, h: 40, y: isAfter ? 50 : 47, rot: isAfter ? 0 : 6 },
              { x: 114, w: 26, h: 44, y: isAfter ? 48 : 51, rot: isAfter ? 0 : -4 },
              { x: 142, w: 36, h: 46, y: 47, rot: 0 },
              { x: 180, w: 26, h: 44, y: isAfter ? 48 : 45, rot: isAfter ? 0 : 7 },
              { x: 208, w: 24, h: 40, y: isAfter ? 50 : 54, rot: isAfter ? 0 : -6 },
              { x: 234, w: 22, h: 36, y: 52, rot: 0 },
            ].map((t, i) => (
              <g key={i} transform={`rotate(${t.rot} ${t.x + t.w / 2} ${t.y + t.h / 2})`}>
                <rect
                  x={t.x}
                  y={t.y}
                  width={t.w}
                  height={t.h}
                  rx="8"
                  fill={toothFill}
                  stroke={toothStroke}
                  strokeWidth="1.2"
                />
                {!isAfter && (i === 1 || i === 4) && (
                  <circle cx={t.x + t.w * 0.55} cy={t.y + t.h * 0.62} r="4.5" fill="#4A3525" opacity="0.85" />
                )}
              </g>
            ))}
            {isAfter && (
              <>
                <path
                  d="M66 70 Q160 72 254 70"
                  fill="none"
                  stroke="#64748B"
                  strokeWidth="1.8"
                />
                {[75, 100, 127, 160, 193, 220, 245].map((cx) => (
                  <rect
                    key={cx}
                    x={cx - 4}
                    y="66"
                    width="8"
                    height="8"
                    rx="1.5"
                    fill="#94A3B8"
                    stroke="#475569"
                    strokeWidth="0.9"
                  />
                ))}
              </>
            )}
          </svg>
        )}

        <span
          className={`mt-2 inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-medium ${
            isAfter ? "bg-[#175955]/10 text-[#175955]" : "bg-[#1A1E24]/8 text-[#525B66]"
          }`}
        >
          {isAfter && <Sparkle size={12} weight="fill" />}
          {isCleaning
            ? isAfter
              ? "Spotless Lingual Enamel"
              : "Calculus & Tartar Buildup"
            : isAfter
            ? "Aligned Enamel + Braces"
            : "Misalignment & Decay"}
        </span>
      </div>
    </div>
  );
}

export function BeforeAfterSlider({ cases }) {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [position, setPosition] = useState(52);
  const containerRef = useRef(null);
  const draggingRef = useRef(false);

  const currentCase = cases[activeCaseIndex] || cases[0];
  const beforeSrc =
    currentCase.id === "cleaning"
      ? CONTACT_CONFIG.cleaningBeforeImage
      : CONTACT_CONFIG.orthoBeforeImage;
  const afterSrc =
    currentCase.id === "cleaning"
      ? CONTACT_CONFIG.cleaningAfterImage
      : CONTACT_CONFIG.orthoAfterImage;

  function updatePosition(clientX) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const raw = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(8, Math.min(92, raw)));
  }

  return (
    <div className="border border-[#175955]/18 bg-white p-5 sm:p-8 shadow-[0_10px_35px_-15px_rgba(26,30,36,0.1)]">
      {/* Interactive Case Switcher */}
      <div className="mb-6 flex flex-wrap gap-2 border-b border-[#175955]/12 pb-4">
        {cases.map((item, idx) => {
          const isSelected = activeCaseIndex === idx;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setActiveCaseIndex(idx);
                setPosition(52);
              }}
              className={`border px-4 py-2 text-xs sm:text-sm font-medium transition ${
                isSelected
                  ? "border-[#175955] bg-[#175955] text-white"
                  : "border-[#175955]/20 bg-[#FBF9F6] text-[#525B66] hover:border-[#175955]/50 hover:text-[#1A1E24]"
              }`}
            >
              {item.tabLabel}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between mb-5">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-[#1A1E24]">
            {currentCase.title}
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-[#525B66]">{currentCase.subtitle}</p>
        </div>
        <span className="text-xs font-mono text-[#175955] tabular-nums" dir="ltr">
          {Math.round(position)}%
        </span>
      </div>

      {/* Force LTR inside slider stage for exact drag geometry */}
      <div
        ref={containerRef}
        dir="ltr"
        role="slider"
        tabIndex={0}
        aria-label={currentCase.title}
        aria-valuemin={8}
        aria-valuemax={92}
        aria-valuenow={Math.round(position)}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPosition((p) => Math.max(8, p - 4));
          if (e.key === "ArrowRight") setPosition((p) => Math.min(92, p + 4));
        }}
        onPointerDown={(e) => {
          draggingRef.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          updatePosition(e.clientX);
        }}
        onPointerMove={(e) => {
          if (draggingRef.current) updatePosition(e.clientX);
        }}
        onPointerUp={() => {
          draggingRef.current = false;
        }}
        className="relative h-64 sm:h-80 w-full cursor-ew-resize overflow-hidden border border-[#175955]/15 touch-none select-none"
      >
        {/* Base Layer: AFTER */}
        <div className="absolute inset-0">
          {afterSrc ? (
            <img
              src={afterSrc}
              alt={currentCase.afterLabel}
              className="h-full w-full object-cover"
            />
          ) : (
            <DentalCaseArtwork caseId={currentCase.id} variant="after" />
          )}
          <span className="absolute top-3 right-3 border border-[#175955]/25 bg-white/90 px-3 py-1 text-[11px] font-semibold text-[#175955] backdrop-blur-xs">
            {currentCase.afterLabel}
          </span>
        </div>

        {/* Clipped Top Layer: BEFORE */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          {beforeSrc ? (
            <img
              src={beforeSrc}
              alt={currentCase.beforeLabel}
              className="h-full w-full object-cover"
            />
          ) : (
            <DentalCaseArtwork caseId={currentCase.id} variant="before" />
          )}
          <span className="absolute top-3 left-3 border border-[#1A1E24]/15 bg-white/90 px-3 py-1 text-[11px] font-semibold text-[#525B66] backdrop-blur-xs">
            {currentCase.beforeLabel}
          </span>
        </div>

        {/* Interactive Divider Handle */}
        <div
          style={{ left: `${position}%` }}
          className="pointer-events-none absolute top-0 bottom-0 w-[2px] -translate-x-1/2 bg-[#175955]"
        >
          <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#175955] bg-white text-[#175955] shadow-md">
            <ArrowsLeftRight size={17} weight="bold" />
          </div>
        </div>
      </div>
    </div>
  );
}