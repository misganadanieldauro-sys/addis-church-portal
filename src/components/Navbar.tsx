import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Broadcast,
  Calendar,
  Envelope,
  FacebookLogo,
  Heart,
  List,
  MapPin,
  PaperPlaneTilt,
  Phone,
  TelegramLogo,
  X,
  YoutubeLogo,
} from "@phosphor-icons/react";
import { toast } from "sonner";
import { CHURCH, LOGO_URL, NAV_ITEMS, SERVICE_TIMES } from "../data/churchData";
import type { PageKey } from "../types";

interface NavbarProps {
  page: PageKey;
  onNavigate: (page: PageKey) => void;
  onGive: () => void;
  onPrayer: () => void;
}

export function ChurchMark({ size = 44 }: { size?: number }) {
  return (
    <img
      src={LOGO_URL}
      alt={`${CHURCH.name} አርማ`}
      width={size}
      height={size}
      loading="eager"
      className="h-full w-full rounded-full object-contain"
      style={{ width: size, height: size }}
    />
  );
}

export default function Navbar({ page, onNavigate, onGive, onPrayer }: NavbarProps) {
  const [open, setOpen] = useState(false);

  const go = (key: PageKey) => {
    onNavigate(key);
    setOpen(false);
  };

  const live = () => toast.info("የእሁድ አምልኮ በቀጥታ ስርጭት ከ2፡30 ሰዓት ጀምሮ ይታያል።");

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-[#fdfcf8]/90 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:h-20">
        <button
          onClick={() => go("home")}
          className="flex min-w-0 items-center gap-3 text-left"
          aria-label={CHURCH.name}
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-emerald-200 bg-white p-1 shadow-sm sm:h-12 sm:w-12">
            <ChurchMark size={40} />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-[15px] font-bold leading-tight text-slate-900 sm:text-base">
              {CHURCH.name}
            </span>
            <span className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-500">
              <MapPin size={11} weight="bold" className="text-amber-600" />
              {CHURCH.area} · {CHURCH.city}
            </span>
          </span>
        </button>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() => go(item.key)}
              className={`relative rounded-lg px-3 py-2 text-sm font-medium transition ${
                page === item.key
                  ? "text-emerald-800"
                  : "text-slate-600 hover:bg-stone-100 hover:text-slate-900"
              }`}
            >
              {item.label}
              {page === item.key && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-2.5 -bottom-0.5 h-0.5 rounded-full bg-emerald-700"
                />
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={live}
            className="hidden items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1.5 text-[11px] font-semibold text-amber-800 transition hover:bg-amber-100 sm:flex"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-600" />
            </span>
            የቀጥታ ስርጭት
          </button>
          <button
            onClick={onPrayer}
            className="hidden items-center gap-1.5 rounded-full bg-emerald-800 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-900 active:scale-95 sm:flex"
          >
            <Heart size={14} weight="fill" /> የጸሎት ጥያቄ
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="ምናሌ"
            className="grid h-10 w-10 place-items-center rounded-xl border border-stone-300 text-slate-700 transition hover:bg-stone-100 lg:hidden"
          >
            {open ? <X size={18} weight="bold" /> : <List size={18} weight="bold" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="overflow-hidden border-t border-stone-200 bg-[#fdfcf8] lg:hidden"
          >
            <div className="space-y-1 px-4 py-3">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.key}
                  onClick={() => go(item.key)}
                  className={`block w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium ${
                    page === item.key
                      ? "bg-emerald-50 text-emerald-800"
                      : "text-slate-700 hover:bg-stone-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => {
                    setOpen(false);
                    onPrayer();
                  }}
                  className="rounded-xl bg-emerald-800 px-3 py-2.5 text-xs font-semibold text-white"
                >
                  የጸሎት ጥያቄ
                </button>
                <button
                  onClick={() => {
                    setOpen(false);
                    onGive();
                  }}
                  className="rounded-xl border border-amber-300 bg-amber-50 px-3 py-2.5 text-xs font-semibold text-amber-900"
                >
                  መስጠት
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function SiteFooter({
  onNavigate,
  onGive,
  onPrayer,
}: {
  onNavigate: (page: PageKey) => void;
  onGive: () => void;
  onPrayer: () => void;
}) {
  const [email, setEmail] = useState("");

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("እባክዎ ትክክለኛ የኢሜይል አድራሻ ያስገቡ።");
      return;
    }
    try {
      const key = "mekanisa-newsletter";
      const prev = JSON.parse(localStorage.getItem(key) ?? "[]") as string[];
      localStorage.setItem(key, JSON.stringify([...new Set([email, ...prev])]));
      toast.success("ለጋዜጣችን ተመዝግበዋል። እናመሰግናለን!");
      setEmail("");
    } catch {
      toast.error("መመዝገብ አልተቻለም። እባክዎ በኋላ ይሞክሩ።");
    }
  };

  return (
    <footer className="mt-16 border-t border-emerald-900/30 bg-emerald-950 text-emerald-50">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white p-1">
              <ChurchMark size={40} />
            </span>
            <div>
              <p className="font-display text-sm font-bold leading-tight">{CHURCH.name}</p>
              <p className="text-[11px] text-emerald-200/70">{CHURCH.latin}</p>
            </div>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-emerald-100/70">
            {CHURCH.tagline}። ከ{founded(CHURCH.founded)} ጀምሮ በመካኒሳ አካባቢ ቃሉን እያገለገልን እንገኛለን።
          </p>
          <div className="mt-4 flex gap-2">
            {[
              { href: CHURCH.socials.youtube, icon: YoutubeLogo, label: "YouTube" },
              { href: CHURCH.socials.telegram, icon: TelegramLogo, label: "Telegram" },
              { href: CHURCH.socials.facebook, icon: FacebookLogo, label: "Facebook" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="grid h-9 w-9 place-items-center rounded-full border border-emerald-800 text-emerald-100 transition hover:bg-emerald-900"
              >
                <s.icon size={16} weight="fill" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-amber-300">ገጾች</p>
          <ul className="mt-3 space-y-2 text-xs text-emerald-100/80">
            {NAV_ITEMS.map((item) => (
              <li key={item.key}>
                <button onClick={() => onNavigate(item.key)} className="hover:text-white">
                  {item.label}
                </button>
              </li>
            ))}
            <li>
              <button onClick={onGive} className="hover:text-white">
                መስጠትና ድጋፍ
              </button>
            </li>
            <li>
              <button onClick={onPrayer} className="hover:text-white">
                የጸሎት ጥያቄ
              </button>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-amber-300">የአምልኮ ሰዓታት</p>
          <ul className="mt-3 space-y-2 text-xs text-emerald-100/80">
            {SERVICE_TIMES.slice(0, 4).map((s) => (
              <li key={s.id} className="flex items-start gap-2">
                <Calendar size={13} className="mt-0.5 shrink-0 text-amber-300" />
                <span>
                  <span className="font-semibold text-emerald-50">{s.day}</span> · {s.title}
                  <span className="block text-[11px] text-emerald-200/60">{s.time}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-amber-300">አግኙን</p>
          <ul className="mt-3 space-y-2 text-xs text-emerald-100/80">
            <li className="flex items-start gap-2">
              <a
                href={CHURCH.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-2 transition hover:text-amber-200 hover:underline"
              >
                <MapPin size={13} className="mt-0.5 shrink-0 text-amber-300" />
                {CHURCH.address}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={13} className="shrink-0 text-amber-300" />
              {CHURCH.phone}
            </li>
            <li className="flex items-center gap-2">
              <Envelope size={13} className="shrink-0 text-amber-300" />
              {CHURCH.email}
            </li>
          </ul>
          <form onSubmit={subscribe} className="mt-4">
            <label htmlFor="newsletter" className="text-[11px] text-emerald-200/70">
              የሳምንቱን ቃል በኢሜይል ይቀበሉ
            </label>
            <div className="mt-1.5 flex gap-2">
              <input
                id="newsletter"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ኢሜይልዎ"
                className="min-w-0 flex-1 rounded-lg border border-emerald-800 bg-emerald-900/60 px-2.5 py-2 text-xs text-white placeholder:text-emerald-300/50 outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                aria-label="ተመዝገብ"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-amber-500 text-emerald-950 transition hover:bg-amber-400 active:scale-95"
              >
                <PaperPlaneTilt size={15} weight="fill" />
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="border-t border-emerald-900">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-[11px] text-emerald-200/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {CHURCH.name} · መብቱ በህግ የተጠበቀ ነው።
          </p>
          <p className="flex items-center gap-1.5">
            <Broadcast size={12} className="text-amber-300" /> {CHURCH.coords} · {CHURCH.poBox}
          </p>
        </div>
      </div>
    </footer>
  );
}

function founded(label: string) {
  return label.replace(" ዓ.ም", " ዓ.ም.");
}