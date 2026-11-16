import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  Envelope,
  HandHeart,
  Heart,
  MapPin,
  MusicNotes,
  Phone,
  Play,
} from "@phosphor-icons/react";
import { toast } from "sonner";
import { ARTICLES, CBE_ACCOUNT, CHURCH, EVENTS, SERMONS, SERVICE_TIMES, TOPICS } from "../data/churchData";
import type { PageKey, Sermon } from "../types";

const fade = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, ease: "easeOut" as const },
};

export const MAP_QUERY = `${CHURCH.latin}, ${CHURCH.area}, ${CHURCH.city}`;
const MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`;
const MAP_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAP_QUERY)}`;

function PageHead({ label, title, desc }: { label: string; title: string; desc: string }) {
  return (
    <div className="paper-grain border-b border-stone-200 bg-[#fdfcf8]">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800">
          {label}
        </span>
        <h1 className="font-display mt-4 max-w-3xl text-3xl leading-[1.4] font-bold text-slate-900 sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">{desc}</p>
      </div>
    </div>
  );
}

function fmt(sec: number) {
  return `${Math.floor(sec / 60)} ደቂቃ`;
}

export function SermonsPage({ onPlay }: { onPlay: (sermon: Sermon) => void }) {
  const [topic, setTopic] = useState<string>(TOPICS[0]);
  const filtered = useMemo(
    () => (topic === "ሁሉም" ? SERMONS : SERMONS.filter((s) => s.topic === topic)),
    [topic],
  );

  return (
    <div>
      <PageHead
        label="ስብከቶችና ትምህርቶች"
        title="በአማርኛ የተመዘገቡ ስብከቶችና የመንፈሳዊ ጽሑፎች ማዕከል"
        desc="በማንኛውም ጊዜ ያዳምጡ፣ ማስታወሻ ይውሰዱና በመጽሐፍ ቅዱስ ትምህርት ያድጉ።"
      />

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
          {["ሁሉም", ...TOPICS].map((t) => (
            <button
              key={t}
              onClick={() => setTopic(t)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm transition ${
                topic === t
                  ? "border-emerald-700 bg-emerald-700 font-semibold text-white"
                  : "border-stone-300 bg-white text-slate-600 hover:border-emerald-400"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {filtered.map((s, i) => (
            <motion.article
              key={s.id}
              {...fade}
              transition={{ ...fade.transition, delay: i * 0.05 }}
              className="rounded-2xl border border-stone-200 bg-white p-5 transition hover:border-emerald-300 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-600">
                    {s.topic}
                  </span>
                  <h2 className="font-display mt-2 text-lg font-bold text-slate-900">{s.title}</h2>
                  <p className="mt-1 text-xs text-slate-500">
                    {s.speaker} · {s.scripture}
                  </p>
                </div>
                <button
                  onClick={() => onPlay(s)}
                  aria-label="አጫውት"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-emerald-700 text-white transition hover:bg-emerald-800 active:scale-95"
                >
                  <Play size={16} weight="fill" />
                </button>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{s.summary}</p>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
                <span className="inline-flex items-center gap-1">
                  <Calendar size={12} /> {s.date}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock size={12} /> {fmt(s.duration)}
                </span>
              </div>
              <details className="group mt-3 border-t border-stone-100 pt-3">
                <summary className="flex cursor-pointer list-none items-center gap-1.5 text-xs font-semibold text-emerald-800">
                  <BookOpen size={14} weight="bold" /> የስብከቱ ማስታወሻዎች
                  <ArrowRight size={12} className="transition group-open:rotate-90" />
                </summary>
                <ul className="mt-2 space-y-1.5">
                  {s.notes.map((n, idx) => (
                    <li key={idx} className="flex gap-2 text-xs leading-relaxed text-slate-600">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                      {n}
                    </li>
                  ))}
                </ul>
              </details>
            </motion.article>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-10 rounded-2xl border border-dashed border-stone-300 p-10 text-center text-sm text-slate-500">
            በዚህ ርዕስ ላይ የተመዘገበ ስብከት አልተገኘም።
          </p>
        )}
      </section>

      <section className="border-y border-stone-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">የመንፈሳዊ ጽሑፎች ማዕዘን</h2>
          <p className="mt-2 text-sm text-slate-500">ለግል ንባብና ለቤተሰብ አምልኮ የተዘጋጁ አጭር ጽሑፎች።</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {ARTICLES.map((a) => (
              <div key={a.id} className="rounded-2xl border border-stone-200 bg-[#fdfcf8] p-5">
                <MusicNotes size={18} weight="bold" className="text-emerald-700" />
                <h3 className="mt-3 text-sm font-semibold text-slate-900">{a.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">{a.excerpt}</p>
                <p className="mt-3 text-[11px] text-slate-400">
                  {a.author} · {a.minutes} ደቂቃ ንባብ
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export function EventsPage({ onNavigate, onPrayer }: { onNavigate: (p: PageKey) => void; onPrayer: () => void }) {
  const addToCalendar = (title: string) => {
    toast.success(`“${title}” በቀን መቁጠሪያዎ ላይ ተጨምሯል`);
  };

  return (
    <div>
      <PageHead
        label="መርሃ ግብሮችና ሁነቶች"
        title="ሳምንታዊ አምልኮዎችና የሚመጡ ልዩ ጉባኤዎች"
        desc="መደበኛ የሳምንት ፕሮግራሞችንና የዓመቱን ልዩ ስብሰባዎች ከዚህ ይመልከቱ።"
      />

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="font-display text-xl font-bold text-slate-900 sm:text-2xl">የሳምንቱ መደበኛ ፕሮግራሞች</h2>
        <div className="mt-6 overflow-hidden rounded-2xl border border-stone-200 bg-white">
          {SERVICE_TIMES.map((s, i) => (
            <div
              key={s.id}
              className={`flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:gap-6 ${
                i !== 0 ? "border-t border-stone-100" : ""
              }`}
            >
              <div className="flex w-full items-center gap-3 sm:w-40 sm:shrink-0">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-50 text-emerald-800">
                  <Calendar size={15} weight="bold" />
                </span>
                <div>
                  <p className="text-xs font-semibold text-slate-900">{s.day}</p>
                  <p className="text-[11px] text-slate-500">{s.time}</p>
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-900">{s.title}</p>
                <p className="text-xs text-slate-500">{s.detail}</p>
              </div>
              <span className="shrink-0 rounded-full bg-stone-100 px-3 py-1 text-[11px] text-slate-600">
                {s.place}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-stone-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">የሚመጡ ልዩ መርሃ ግብሮች</h2>
          <p className="mt-2 text-sm text-slate-500">ቀኖቹ በኢትዮጵያ የቀን መቁጠሪያ መሠረት ተጽፈዋል።</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {EVENTS.map((e, i) => (
              <motion.div
                key={e.id}
                {...fade}
                transition={{ ...fade.transition, delay: i * 0.05 }}
                className="flex flex-col rounded-2xl border border-stone-200 bg-[#fdfcf8] p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-semibold text-amber-900">
                    {e.type}
                  </span>
                  <span className="text-xs font-medium text-emerald-800">{e.date}</span>
                </div>
                <h3 className="mt-3 text-sm font-semibold text-slate-900">{e.title}</h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-500">{e.description}</p>
                <div className="mt-3 space-y-1 text-[11px] text-slate-500">
                  <p className="flex items-center gap-1.5">
                    <Clock size={12} /> {e.time}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <MapPin size={12} /> {e.place}
                  </p>
                </div>
                <button
                  onClick={() => addToCalendar(e.title)}
                  className="mt-4 rounded-xl border border-stone-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-emerald-600 hover:text-emerald-800"
                >
                  ወደ ቀን መቁጠሪያ አክል
                </button>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4 rounded-2xl bg-emerald-50 p-6">
            <div>
              <p className="font-display text-lg font-bold text-emerald-900">ስለ መርሃ ግብሮች ጥያቄ አለዎት?</p>
              <p className="mt-1 text-sm text-emerald-800/80">የቤተክርስቲያን ቢሮ በሳምንቱ ቀናት ክፍት ነው።</p>
            </div>
            <div className="ml-auto flex gap-2">
              <button
                onClick={() => onNavigate("contact")}
                className="rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800"
              >
                አድራሻ
              </button>
              <button
                onClick={onPrayer}
                className="rounded-full border border-emerald-700 px-5 py-2.5 text-sm font-semibold text-emerald-800 hover:bg-white"
              >
                ጸሎት ጠይቅ
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function ContactPage({ onGive, onPrayer }: { onGive: () => void; onPrayer: () => void }) {
  const [copied, setCopied] = useState(false);

  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText(CHURCH.phone);
      setCopied(true);
      toast.success("የስልክ ቁጥር ተቀድቷል");
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("መቅዳት አልተቻለም።");
    }
  };

  return (
    <div>
      <PageHead
        label="አድራሻና ግንኙነት"
        title="በአዲስ አበባ ቦሌ ክፍለ ከተማ ይገኛሉ"
        desc="እሁድ ጠዋት በሰላም ይምጡ። ለጸሎት፣ ለምክርና ለመዋጮ መረጃ በቀጥታ ማግኘት ይችላሉ።"
      />

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-3">
          <div className="rounded-2xl border border-stone-200 bg-white p-5">
            <p className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <MapPin size={15} weight="bold" className="text-emerald-700" /> አድራሻ
            </p>
            <p className="mt-2 text-[15px] font-medium leading-relaxed text-slate-900">{CHURCH.address}</p>
            <p className="mt-2 text-xs text-slate-500">
              ታዋቂ ምልክቶች፡ ፍላሚንጎ ማዞሪያ፣ ኤድና ሞል፣ የቦሌ ብራንክ ባንክ።
            </p>
            <div className="paper-grain mt-4 grid h-36 place-items-center rounded-xl border border-stone-200 bg-emerald-50/60">
              <div className="text-center">
                <MapPin size={26} weight="bold" className="mx-auto text-emerald-700" />
                <p className="mt-2 text-xs font-semibold text-emerald-900">ቦሌ · ፍላሚንጎ አጠገብ</p>
                <p className="text-[11px] text-emerald-800/70">8°59′N 38°47′E</p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
            <iframe
              title="Mekanisa Full Gospel Believers Church location map"
              src={MAP_EMBED}
              className="h-64 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="flex flex-wrap items-center gap-2 border-t border-stone-200 p-4">
              <a
                href={CHURCH.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-700 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-800"
              >
                <MapPin size={13} weight="bold" /> በGoogle Maps ክፈት
              </a>
              <a
                href={MAP_DIRECTIONS}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:border-emerald-600 hover:text-emerald-800"
              >
                አቅጣጫ አሳይ <ArrowRight size={13} weight="bold" />
              </a>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-stone-200 bg-white p-5">
              <p className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <Phone size={15} weight="bold" className="text-emerald-700" /> ስልክ
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-900">{CHURCH.phone}</p>
              <div className="mt-3 flex gap-2">
                <a
                  href={`tel:${CHURCH.phone.replace(/\s/g, "")}`}
                  className="rounded-lg bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-800"
                >
                  ደውል
                </a>
                <button
                  onClick={copyPhone}
                  className="rounded-lg border border-stone-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-emerald-600"
                >
                  {copied ? "ተቀድቷል" : "ቅዳ"}
                </button>
              </div>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-white p-5">
              <p className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <Envelope size={15} weight="bold" className="text-emerald-700" /> ኢሜይል
              </p>
              <p className="mt-2 break-all text-sm font-semibold text-slate-900">{CHURCH.email}</p>
              <a
                href={`mailto:${CHURCH.email}`}
                className="mt-3 inline-block rounded-lg border border-stone-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-emerald-600"
              >
                መልእክት ላክ
              </a>
              <p className="mt-3 text-[11px] text-slate-400">{CHURCH.poBox}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-2xl bg-slate-900 p-6 text-white">
            <p className="font-display text-lg font-bold">የቢሮ ሰዓት</p>
            <ul className="mt-3 space-y-2 text-sm text-stone-300">
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>ሰኞ - አርብ</span> <span>9፡00 - 5፡00</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>ቅዳሜ</span> <span>9፡00 - 1፡00</span>
              </li>
              <li className="flex justify-between">
                <span>እሁድ</span> <span>ከአምልኮ በኋላ</span>
              </li>
            </ul>
            <div className="mt-5 flex flex-col gap-2">
              <button
                onClick={onPrayer}
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-emerald-400"
              >
                <Heart size={16} weight="bold" /> የጸሎት ጥያቄ ላክ
              </button>
              <button
                onClick={onGive}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/20 px-4 py-2.5 text-sm font-semibold text-white hover:border-emerald-400"
              >
                <HandHeart size={16} weight="bold" /> የመዋጮ መረጃ
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-5">
            <p className="text-xs font-semibold text-slate-500">የባንክ ሂሳብ</p>
            <p className="mt-2 text-sm font-semibold text-slate-900">{CBE_ACCOUNT.holder}</p>
            <p className="mt-1 text-xs text-slate-500">
              {CBE_ACCOUNT.number} · {CBE_ACCOUNT.branch}
            </p>
            <button
              onClick={onGive}
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:underline"
            >
              ሙሉ መረጃ <ArrowRight size={13} weight="bold" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}