import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, WhatsappLogo, Copy, Check, PaperPlaneTilt } from "@phosphor-icons/react";
import { CONTACT_CONFIG } from "../data/content";

export function AppointmentDrawer({ isOpen, onClose, copy, isRtl, initialAudience = 0 }) {
  const [audienceIndex, setAudienceIndex] = useState(initialAudience);
  const [name, setName] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const topicsList = audienceIndex === 0 ? copy.topicsPatient : copy.topicsHr;
  const activeTopic = topicsList.includes(selectedTopic) ? selectedTopic : topicsList[0];

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError(copy.validationError);
      return;
    }
    setError("");
    setSubmitted(true);
  }

  function handleCopyEmail() {
    navigator.clipboard.writeText(CONTACT_CONFIG.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  }

  const whatsappHref = `https://wa.me/${CONTACT_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    `${name ? `${name} — ` : ""}[${activeTopic}] ${message}`
  )}`;

  const slideOffset = isRtl ? "-100%" : "100%";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-[#1A1E24]/55 backdrop-blur-xs"
        >
          <motion.aside
            initial={{ x: slideOffset }}
            animate={{ x: 0 }}
            exit={{ x: slideOffset }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            dir={isRtl ? "rtl" : "ltr"}
            className={`fixed top-0 bottom-0 ${
              isRtl ? "left-0 border-r" : "right-0 border-l"
            } w-full max-w-md overflow-y-auto border-[#175955]/20 bg-[#FBF9F6] p-6 sm:p-8 shadow-2xl`}
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#175955]/15 pb-5">
              <div>
                <h3 className="text-xl font-semibold text-[#1A1E24]">{copy.title}</h3>
                <p className="mt-1.5 text-sm text-[#525B66]">{copy.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#175955]/20 bg-white text-[#525B66] transition hover:border-[#175955] hover:text-[#175955]"
              >
                <X size={18} />
              </button>
            </div>

            {submitted ? (
              <div className="mt-7 border border-[#175955]/25 bg-white p-6 text-center shadow-xs">
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#175955]/12 text-[#175955]">
                  <Check size={22} weight="bold" />
                </div>
                <p className="text-sm font-medium text-[#1A1E24]">{copy.preparedNotice}</p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setMessage("");
                  }}
                  className="mt-3 text-xs text-[#175955] underline underline-offset-4"
                >
                  {isRtl ? "تعديل الطلب" : "Edit inquiry"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                {/* Dual-Audience Toggle */}
                <div>
                  <label className="mb-2 block text-xs font-semibold text-[#175955]">
                    {copy.audienceLabel}
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {copy.audiences.map((aud, idx) => (
                      <button
                        key={aud}
                        type="button"
                        onClick={() => {
                          setAudienceIndex(idx);
                          setSelectedTopic("");
                        }}
                        className={`border px-3.5 py-2.5 text-start text-xs font-medium transition ${
                          audienceIndex === idx
                            ? "border-[#175955] bg-[#175955] text-white"
                            : "border-[#175955]/20 bg-white text-[#525B66] hover:border-[#175955]/50"
                        }`}
                      >
                        {aud}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-[#175955]">
                    {copy.nameLabel}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder={copy.namePlaceholder}
                    className="w-full border border-[#175955]/20 bg-white px-4 py-3 text-sm text-[#1A1E24] placeholder:text-[#525B66]/60 focus:border-[#175955] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-[#175955]">
                    {copy.topicLabel}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {topicsList.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setSelectedTopic(item)}
                        className={`border px-3 py-1.5 text-xs transition ${
                          activeTopic === item
                            ? "border-[#175955] bg-[#175955]/10 font-medium text-[#175955]"
                            : "border-[#175955]/20 bg-white text-[#525B66] hover:border-[#175955]/45"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-[#175955]">
                    {copy.messageLabel}
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder={copy.messagePlaceholder}
                    className="w-full resize-none border border-[#175955]/20 bg-white px-4 py-3 text-sm text-[#1A1E24] placeholder:text-[#525B66]/60 focus:border-[#175955] focus:outline-none"
                  />
                </div>

                {error && <p className="text-xs text-red-600">{error}</p>}

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 bg-[#175955] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#134744]"
                >
                  <PaperPlaneTilt size={18} weight="bold" />
                  <span>{copy.submit}</span>
                </button>
              </form>
            )}

            {/* Direct WhatsApp & Email */}
            <div className="mt-7 border-t border-[#175955]/15 pt-6 space-y-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2.5 border border-emerald-600/35 bg-emerald-50 px-4 py-3 text-sm font-semibold text-[#1A1E24] transition hover:border-emerald-600 hover:bg-emerald-100/70"
              >
                <WhatsappLogo size={20} weight="fill" className="text-emerald-600" />
                <span dir="ltr">{copy.whatsappBtn}</span>
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="flex w-full items-center justify-between border border-[#175955]/20 bg-white px-4 py-3 text-xs text-[#1A1E24] transition hover:border-[#175955]/50"
              >
                <span dir="ltr" className="truncate">{CONTACT_CONFIG.email}</span>
                <span className="inline-flex shrink-0 items-center gap-1.5 font-medium text-[#175955]">
                  {copied ? <Check size={15} /> : <Copy size={15} />}
                  {copied ? copy.emailCopied : copy.copyEmail}
                </span>
              </button>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}