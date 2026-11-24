export function DentalLogo({ isRtl, inverted = false }) {
  return (
    <div className="flex items-center gap-3 select-none">
      <div
        className={`relative flex h-9 w-9 items-center justify-center border bg-white shadow-xs ${
          inverted ? "border-white/35" : "border-[#175955]/30"
        }`}
      >
        <span className="absolute top-0 left-0 h-1.5 w-1.5 border-t border-l border-[#175955]" />
        <span className="absolute bottom-0 right-0 h-1.5 w-1.5 border-b border-r border-[#B88B6A]" />
        {/* Bespoke Enamel & Smile Contour Mark */}
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
          <path
            d="M7.5 4.5C5.6 4.5 4.2 6.1 4.4 8.4C4.7 11.4 5.9 14.5 6.8 18.2C7.1 19.4 8.2 19.7 8.9 18.7L10.7 15.6C11.3 14.6 12.7 14.6 13.3 15.6L15.1 18.7C15.8 19.7 16.9 19.4 17.2 18.2C18.1 14.5 19.3 11.4 19.6 8.4C19.8 6.1 18.4 4.5 16.5 4.5C14.8 4.5 13.4 5.5 12 5.5C10.6 5.5 9.2 4.5 7.5 4.5Z"
            stroke="#175955"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M8.5 9.8C9.7 10.9 14.3 10.9 15.5 9.8"
            stroke="#B88B6A"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="hidden sm:flex flex-col leading-tight">
        <span className={`text-sm font-semibold ${inverted ? "text-white" : "text-[#1A1E24]"}`}>
          {isRtl ? "د. شيماء أحمد العماد" : "Dr. Shaima Al-Emad"}
        </span>
        <span className={`text-[11px] ${inverted ? "text-white/75" : "text-[#525B66]"}`}>
          {isRtl ? "طب وجراحة الفم والأسنان" : "Oral & Dental Surgeon"}
        </span>
      </div>
    </div>
  );
}