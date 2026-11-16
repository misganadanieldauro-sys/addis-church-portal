import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Books,
  Calendar,
  CheckCircle,
  Clock,
  Cross,
  Envelope,
  HandHeart,
  Heart,
  MapPin,
  Megaphone,
  MusicNotes,
  Phone,
  Quotes,
  ShieldCheck,
  Sparkle,
  UsersThree,
} from "@phosphor-icons/react";
import { FULL_TIME_MINISTERS } from "../data/churchData";
import type { PageKey } from "../types";

interface Props {
  onNavigate: (page: PageKey) => void;
  onGive: () => void;
  onPrayer: () => void;
}

const CALLING_POINTS = [
  {
    icon: Books,
    title: "የቃሉ አገልግሎት",
    text: "በስብከት፣ በትምህርትና በመጽሐፍ ቅዱስ ጥናት ማዕከል የሚደረግ የቀን ሙሉ አገልግሎት።",
  },
  {
    icon: HandHeart,
    title: "የእረኝነት እንክብካቤ",
    text: "ለቤተሰቦች፣ ለታመሙና ለተቸገሩ አባላት የሚደረግ የጸሎትና የጉብኝት አገልግሎት።",
  },
  {
    icon: Megaphone,
    title: "የወንጌል ስርጭት",
    text: "በሰፈር፣ በትምህርት ቤትና በማህበረሰብ ውስጥ ወንጌልን ማድረስና አዳዲስ አማኞችን ማጸናት።",
  },
  {
    icon: ShieldCheck,
    title: "የመሪነት ስልጠና",
    text: "አዳዲስ አገልጋዮችን ማሰልጠንና የአገልግሎት ቡድኖችን ማስተባበር።",
  },
];

export default function FulltimeMinistersPage({ onNavigate, onGive, onPrayer }: Props) {
  const departments = useMemo(
    () => ["ሁሉም", ...Array.from(new Set(FULL_TIME_MINISTERS.map((m) => m.department)))],
    [],
  );
  const [active, setActive] = useState(departments[0]);
  const shown = useMemo(
    () =>
      active === "ሁሉም"
        ? FULL_TIME_MINISTERS
        : FULL_TIME_MINISTERS.filter((m) => m.department === active),
    [active],
  );

  return (
    <div className="bg-[#fdfcf8]">
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-stone-200 bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-emerald-50">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:py-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-amber-300"
          >
            <Cross size={13} weight="bold" /> የቤተክርስቲያኗ ሙሉ ጊዜ አገልጋዮች
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
            className="mt-5 max-w-3xl font-display text-4xl font-bold leading-tight sm:text-5xl"
          >
            ሙሉ ጊዜ አገልጋዮች
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.12 }}
            className="mt-4 max-w-2xl text-sm leading-relaxed text-emerald-100/80 sm:text-base"
          >
            ራሳቸውን ለእግዚአብሔር አድርሰው በቀን ሙሉ ለመንፈሳዊ አገልግሎት የተቀደሱ ወንድሞችና እህቶች።
            በጸሎት፣ በቃሉና በእረኝነት አገልግሎት ቤተክርስቲያኗን ይመራሉ።
          </motion.p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button
              onClick={onPrayer}
              className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-emerald-950 shadow-sm transition hover:bg-amber-400 active:scale-95"
            >
              <Heart size={15} weight="fill" /> የጸሎት ጥያቄ አቅርብ
            </button>
            <button
              onClick={onGive}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-700 bg-emerald-900/60 px-5 py-2.5 text-sm font-semibold text-emerald-50 transition hover:bg-emerald-800 active:scale-95"
            >
              <HandHeart size={15} weight="bold" /> አገልግሎቱን ደግፍ
            </button>
          </div>
          <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
            {[
              { k: `${FULL_TIME_MINISTERS.length}`, v: "ሙሉ ጊዜ አገልጋዮች" },
              { k: `${departments.length - 1}`, v: "የአገልግሎት ክፍሎች" },
              { k: "24/7", v: "የጸሎት እንክብካቤ" },
            ].map((s) => (
              <div
                key={s.v}
                className="rounded-xl border border-emerald-800/70 bg-emerald-900/40 px-3 py-3 text-center"
              >
                <p className="font-display text-xl font-bold text-amber-300">{s.k}</p>
                <p className="mt-0.5 text-[11px] text-emerald-200/70">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Department tabs ────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pt-12">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">
              የአገልግሎት ክፍሎች
            </h2>
            <p className="mt-1.5 text-sm text-slate-600">
              በአገልግሎት መስክ ይምረጡና የየራሳቸውን አገልጋዮች ይመልከቱ።
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 self-start rounded-full border border-stone-200 bg-white px-3 py-1.5 text-[11px] font-medium text-slate-500 sm:self-auto">
            <UsersThree size={13} className="text-emerald-700" /> {shown.length} አገልጋዮች
          </span>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {departments.map((d) => (
            <button
              key={d}
              onClick={() => setActive(d)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                active === d
                  ? "bg-emerald-800 text-white shadow-sm"
                  : "border border-stone-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-800"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </section>

      {/* ── Minister cards ─────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pt-8 pb-4">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((m, i) => (
            <motion.article
              key={m.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: i * 0.04 }}
              className="group flex flex-col rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md"
            >
              <div className="flex items-start gap-3.5">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-gradient-to-br from-emerald-800 to-emerald-600 font-display text-base font-bold text-amber-200 shadow-sm">
                  {m.initials}
                </span>
                <div className="min-w-0">
                  <h3 className="truncate font-display text-base font-bold text-slate-900">
                    {m.name}
                  </h3>
                  <p className="mt-0.5 text-xs font-semibold text-emerald-800">{m.role}</p>
                  <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-800">
                    <Sparkle size={10} weight="fill" /> {m.department}
                  </span>
                </div>
              </div>

              <p className="mt-3.5 text-xs leading-relaxed text-slate-600">{m.bio}</p>

              <p className="mt-3 flex items-start gap-1.5 rounded-lg bg-stone-50 px-3 py-2 text-[11px] italic leading-relaxed text-stone-600">
                <Quotes size={12} weight="fill" className="mt-0.5 shrink-0 text-amber-600" />
                {m.verse}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500">
                <span className="inline-flex items-center gap-1">
                  <Calendar size={12} className="text-amber-600" /> {m.since}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Phone size={12} className="text-emerald-700" /> {m.phone}
                </span>
              </div>

              <div className="mt-4 flex gap-2 pt-1">
                <button
                  onClick={onPrayer}
                  className="flex-1 rounded-lg bg-emerald-800 px-3 py-2 text-[11px] font-semibold text-white transition hover:bg-emerald-900 active:scale-95"
                >
                  በጸሎት አስብ
                </button>
                <a
                  href={`mailto:${m.email}`}
                  className="inline-flex flex-1 items-center justify-center gap-1 rounded-lg border border-stone-200 px-3 py-2 text-[11px] font-semibold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-800"
                >
                  <Envelope size={12} /> ያግኙ
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        {shown.length === 0 && (
          <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-10 text-center">
            <UsersThree size={28} className="mx-auto text-stone-400" />
            <p className="mt-3 text-sm font-semibold text-slate-700">
              በዚህ ክፍል አገልጋይ አልተገኘም።
            </p>
            <button
              onClick={() => setActive(departments[0])}
              className="mt-3 text-xs font-semibold text-emerald-800 underline"
            >
              ሁሉንም አገልጋዮች አሳይ
            </button>
          </div>
        )}
      </section>

      {/* ── What is full-time ministry ──────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-9">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-50 text-emerald-800">
              <Books size={17} weight="bold" />
            </span>
            <h2 className="font-display text-xl font-bold text-slate-900 sm:text-2xl">
              የሙሉ ጊዜ አገልግሎት ምንድን ነው?
            </h2>
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">
            የሙሉ ጊዜ አገልግሎት ማለት ጊዜያቸውንና ሃይላቸውን ሙሉ በሙሉ ለቤተክርስቲያኗ
            መንፈሳዊ ስራ የሰጡ የተቀደሱ አገልጋዮች ናቸው — በቃሉ፣ በጸሎት፣ በእረኝነትና በወንጌል
            ስርጭት ያገለግላሉ። እነሱ የሚሰሩት ስራ የተለያየ ቢሆንም ግባቸው አንድ ነው፦
            ሰዎች ክርስቶስን እንዲያውቁና በእምነት እንዲያድጉ ማገዝ።
          </p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {CALLING_POINTS.map((p) => (
              <div
                key={p.title}
                className="flex gap-3 rounded-xl border border-stone-100 bg-[#fdfcf8] p-4"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-amber-100 text-amber-800">
                  <p.icon size={16} weight="bold" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{p.title}</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-slate-600">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Support banner ─────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="relative overflow-hidden rounded-3xl bg-emerald-950 p-7 text-emerald-50 sm:p-10">
          <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-amber-400/15 blur-3xl" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl font-bold sm:text-3xl">
                አገልጋዮችን በጸሎትና በስጦታ ደግፉ
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-emerald-100/80">
                ሙሉ ጊዜ አገልጋዮች በጸሎታችሁና በስጦታችሁ ይበረታታሉ። ጸሎታችሁን አቅርቡ፤ ለአገልግሎቱ
                ደግሞ አስተዋጽኦ ያድርጉ።
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-emerald-100/70">
                {[
                  "የጸሎት ስምምነት",
                  "የስጦታ ድጋፍ",
                  "የአገልግሎት ተሳትፎ",
                ].map((t) => (
                  <li key={t} className="inline-flex items-center gap-1.5">
                    <CheckCircle size={13} weight="fill" className="text-amber-300" /> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex shrink-0 flex-col gap-2.5 sm:flex-row lg:flex-col">
              <button
                onClick={onPrayer}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-emerald-950 shadow-sm transition hover:bg-amber-400 active:scale-95"
              >
                <Heart size={15} weight="fill" /> ጸሎቴን አቅርብ
              </button>
              <button
                onClick={onGive}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-700 bg-emerald-900/60 px-6 py-3 text-sm font-semibold text-emerald-50 transition hover:bg-emerald-800 active:scale-95"
              >
                <HandHeart size={15} weight="bold" /> መስጠትና ድጋፍ
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick links ────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { key: "sermons" as PageKey, label: "ስብከቶችን ያዳምጡ", icon: MusicNotes },
            { key: "events" as PageKey, label: "ፕሮግራሞችን ይመልከቱ", icon: Calendar },
            { key: "about" as PageKey, label: "ስለ እኛ ይወቁ", icon: Clock },
            { key: "contact" as PageKey, label: "አድራሻችንን ያግኙ", icon: MapPin },
          ].map((l) => (
            <button
              key={l.key}
              onClick={() => onNavigate(l.key)}
              className="group flex items-center justify-between rounded-xl border border-stone-200 bg-white px-4 py-3.5 text-left text-xs font-semibold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-800"
            >
              <span className="inline-flex items-center gap-2">
                <l.icon size={15} className="text-amber-600" /> {l.label}
              </span>
              <ArrowRight
                size={14}
                className="text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-emerald-700"
              />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}