import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  ClockCountdown,
  Confetti,
  HandHeart,
  Heart,
  MapPin,
  MusicNotes,
  Play,
  Quotes,
  Sparkle,
  Ticket,
  Users,
} from "@phosphor-icons/react";
import { toast } from "sonner";
import {
  ARTICLES,
  CHURCH,
  EVENTS,
  FAITH_POINTS,
  LEADERS,
  LOGO_URL,
  MINISTRIES,
  SERMONS,
  SERVICE_TIMES,
  VERSES,
} from "../data/churchData";
import type { Ministry, PageKey, Sermon } from "../types";

const fadeUp = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: "easeOut" as const },
};

const iconMap = {
  sunrise: Sparkle,
  children: Users,
  prayer: HandHeart,
  youth: Heart,
  choir: MusicNotes,
  book: Quotes,
} as const;

const ministryIcon: Record<Ministry["icon"], typeof Users> = {
  children: Users,
  youth: Sparkle,
  women: Heart,
  men: HandHeart,
  choir: MusicNotes,
  charity: Confetti,
};

function SectionTitle({
  kicker,
  title,
  desc,
}: {
  kicker: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-700">{kicker}</p>
      <h2 className="mt-2 font-display text-2xl font-bold leading-snug text-slate-900 sm:text-3xl">
        {title}
      </h2>
      {desc && <p className="mt-3 text-sm leading-relaxed text-slate-600">{desc}</p>}
    </div>
  );
}

function VerseCard() {
  const [index, setIndex] = useState(0);
  const verse = VERSES[index % VERSES.length];
  return (
    <motion.div
      key={verse.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="rounded-2xl border border-emerald-200/70 bg-white/90 p-5 shadow-sm"
    >
      <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-emerald-700">
        <Quotes size={13} weight="fill" /> የዕለቱ ቃል
      </p>
      <p className="mt-3 font-display text-[17px] leading-relaxed text-slate-900">“{verse.text}”</p>
      <p className="mt-2 text-xs font-semibold text-amber-700">{verse.reference}</p>
      <p className="mt-3 text-xs leading-relaxed text-slate-600">{verse.reflection}</p>
      <button
        onClick={() => setIndex((i) => i + 1)}
        className="mt-4 flex items-center gap-1.5 rounded-lg border border-stone-300 px-3 py-1.5 text-[11px] font-semibold text-slate-700 transition hover:bg-stone-100 active:scale-95"
      >
        ሌላ ጥቅስ <ArrowRight size={12} weight="bold" />
      </button>
    </motion.div>
  );
}

export function HomePage({
  onNavigate,
  onGive,
  onPrayer,
  onPlay,
}: {
  onNavigate: (page: PageKey) => void;
  onGive: () => void;
  onPrayer: () => void;
  onPlay: (sermon: Sermon) => void;
}) {
  const joinMinistry = (m: Ministry) => {
    toast.success(`ለ${m.title} ተግባራዊ አገልግሎት ፍላጎትዎ ተመዝግቧል። መሪው ${m.lead} ያገኝዎታል።`);
  };

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-50 via-[#fdfcf8] to-[#fdfcf8]" />
        <img
          src={LOGO_URL}
          alt=""
          aria-hidden
          className="pointer-events-none absolute -right-24 top-6 h-80 w-80 opacity-[0.06] sm:h-[26rem] sm:w-[26rem]"
        />
        <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-12 sm:pt-16 lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <span className="inline-flex items-center rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-emerald-800 shadow-sm">
              ኢየሱስ ክርስቶስ ትናንትና፥ ዛሬም ለዘላለምም ያው ነው። ዕብ 13:8
            </span>
            <h1 className="mt-5 font-display text-3xl font-bold leading-[1.35] text-slate-900 sm:text-4xl lg:text-[2.7rem]">
              እንኳን ወደ <span className="text-emerald-800">{CHURCH.name}</span> በደህና መጡ
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-[15px]">
              የክርስቶስን ወንጌል ለሁሉም በማድረስ፣ አማኞችን በሕያው የእግዚአብሔር ቃል በማነጽና ለፍሬያማ መንፈሳዊ አገልግሎት ለማብቃት እንተጋለን።
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              <button
                onClick={onPrayer}
                className="flex items-center gap-2 rounded-xl bg-emerald-800 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-900 active:scale-95"
              >
                <Heart size={16} weight="fill" /> የጸሎት ጥያቄ ይላኩ
              </button>
              <button
                onClick={() => onNavigate("sermons")}
                className="flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-stone-50 active:scale-95"
              >
                <Play size={15} weight="fill" className="text-emerald-700" /> ስብከቶችን ይመልከቱ
              </button>
              <button
                onClick={() => onNavigate("contact")}
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50"
              >
                <MapPin size={15} weight="bold" /> አድራሻ
              </button>
            </div>

            <div className="mt-7 grid gap-2 sm:grid-cols-3">
              {[
                { day: "እሁድ", label: "ዋና አምልኮ", time: "2፡30 - 6፡30" },
                { day: "አርብ", label: "የወጣቶች ፕሮግራም", time: "6፡00 - 8፡00" },
                { day: "ሐሙስ", label: "የቅዱስ ቃል ጥናት", time: "6፡00 - 7፡30" },
              ].map((s) => (
                <div
                  key={s.day}
                  className="rounded-xl border border-stone-200 bg-white/80 px-3 py-2.5"
                >
                  <p className="text-[11px] font-bold text-amber-700">{s.day}</p>
                  <p className="mt-0.5 text-xs font-semibold text-slate-900">{s.label}</p>
                  <p className="text-[11px] text-slate-500">{s.time}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="mt-10 space-y-3 lg:mt-0"
          >
            <VerseCard />
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-amber-800">
                <Ticket size={13} weight="fill" /> የመጪው እሁድ አምልኮ
              </p>
              <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-amber-950">
                <ClockCountdown size={15} weight="bold" /> እሁድ 2፡30 · ዋና አዳራሽ
              </p>
              <p className="mt-2 text-xs leading-relaxed text-amber-900/80">
                በዋና አዳራሽ የሚካሄደውን የአምልኮ ፕሮግራም በቀጥታ ስርጭት መከታተል ይችላሉ።
              </p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => onNavigate("events")}
                  className="rounded-lg bg-emerald-900 px-3 py-1.5 text-[11px] font-semibold text-white transition hover:bg-emerald-950"
                >
                  ፕሮግራሞችን ይመልከቱ
                </button>
                <button
                  onClick={onGive}
                  className="rounded-lg border border-amber-300 bg-white px-3 py-1.5 text-[11px] font-semibold text-amber-900 transition hover:bg-amber-100"
                >
                  መስጠት
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WELCOME */}
      <section className="mx-auto max-w-7xl px-4 pt-2 pb-2">
        <motion.div
          {...fadeUp}
          className="relative overflow-hidden rounded-3xl border border-emerald-200/70 bg-gradient-to-br from-emerald-50 via-[#fdfcf8] to-amber-50 p-6 sm:p-9"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-amber-200/40 blur-3xl" />
          <div className="relative grid items-center gap-7 lg:grid-cols-[1.05fr_1fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-emerald-800 shadow-sm">
                <Sparkle size={13} weight="fill" className="text-amber-600" /> የእግዚአብሔር ቤተሰብ
              </span>
              <h2 className="mt-4 font-display text-2xl font-bold leading-snug text-slate-900 sm:text-3xl">
                እንኳን ወደ ቤተክርስትያናችን በደህና መጡ
              </h2>

              <div className="mt-4 space-y-3 rounded-2xl border border-stone-200 bg-white/85 p-4 sm:p-5">
                <p className="text-sm font-semibold leading-relaxed text-emerald-900">
                  በጌታችን በኢየሱስ ክርስቶስ ስም የተወደዳችሁ ቅዱሳንና ወዳጆች፦
                </p>
                <p className="text-sm font-semibold leading-relaxed text-slate-800">
                  እንኳን ወደ ቤተክርስቲያናችን ይፋዊ ድረ-ገጽ በደህና መጣችሁ!
                </p>
                <p className="text-sm leading-relaxed text-slate-600">
                  ቤተክርስቲያናችን የእግዚአብሔር ፍቅር የሚገለጥባት፣ የእውነት ቃል የሚሰበክባት እና እያንዳንዱ አማኝ በመንፈሳዊ ማንነቱ የሚያድግባት መንፈሳዊ ቤተሰብ ናት። በዚህ ድረ-ገጽ አማካኝነት የቃሉን ትምህርቶች፣ የአምልኮ ፕሮግራሞቻችንን፣ እና ልዩ ልዩ አገልግሎቶቻችንን እንድትከታተሉ በታላቅ ደስታ እንጋብዛችኋለን።
                </p>
                <p className="text-sm leading-relaxed text-slate-600">
                  በሕይወታችሁ ውስጥ እውነተኛ ሰላም፣ ፈውስ እና ትስፋ የሚገኘው በክርስቶስ ኢየሱስ ብቻ ነው። በኅብረታችን መካከል ተገኝታችሁ አብረን እንድናመልክ፣ በመንፈሳዊ ሕይወት አብረን እንድንጠነክር፣ እና ወንጌልን ለሌሎች በማድረስ የእግዚአብሔርን መንግሥት አብረን እንድናሰፋ ሁልጊዜ በራችን ክፍት ነው።
                </p>
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-stone-200 pt-3">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-800 text-white">
                      <Sparkle size={14} weight="fill" />
                    </span>
                    <div>
                      <p className="text-xs font-bold text-slate-900">ፓስተር አስቻለው ሞላ</p>
                      <p className="text-[11px] text-slate-500">የቤተክርስቲያናችን ፓስተር</p>
                    </div>
                  </div>
                  <p className="text-right text-xs font-semibold text-amber-800">
                    እግዚአብሔር አብዝቶ ይባርካችሁ!
                  </p>
                </div>
              </div>

              <p className="hidden mt-3 max-w-xl text-sm leading-relaxed text-slate-600">
                በጌታችን በኢየሱስ ክርስቶስ ፍቅር ሞቅ ያለ አቀባበል እናደርግልዎታለን። አብረን እንጸልይ፣ ቃሉን እንማር፣
                በጋራ እናገልግል።
              </p>

              <div className="hidden" aria-hidden="true">
                <div className="mt-5 grid gap-2.5 sm:grid-cols-3">
                {[
                  {
                    Icon: Sparkle,
                    title: "መንፈሳዊ እድገት",
                    text: "የእግዚአብሔርን ቃል በጥልቀት ማጥናትና በሕይወት መለማመድ።",
                  },
                  {
                    Icon: Heart,
                    title: "የፍቅር ሕብረት",
                    text: "በጸሎትና በእውነተኛ የወንድማማችነት ፍቅር የተሳሰረ ማህበረሰብ።",
                  },
                  {
                    Icon: HandHeart,
                    title: "የተልእኮ አገልግሎት",
                    text: "ፍቅርን በተግባር በማሳየት የተቸገሩትን መደገፍና ወንጌልን ማድረስ።",
                  },
                ].map(({ Icon, title, text }, i) => (
                  <motion.div
                    key={title}
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: 0.08 + i * 0.06 }}
                    className="rounded-2xl border border-stone-200 bg-white/90 p-3.5 transition hover:border-emerald-300 hover:shadow-sm"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-50 text-emerald-800">
                      <Icon size={17} weight="bold" />
                    </span>
                    <p className="mt-2 text-xs font-bold text-slate-900">{title}</p>
                    <p className="mt-1 text-[11px] leading-relaxed text-slate-600">{text}</p>
                  </motion.div>
                ))}
              </div>
              </div>

              
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative"
            >
              <div className="pointer-events-none absolute -inset-2 rounded-[1.75rem] bg-gradient-to-br from-emerald-200/50 to-amber-200/40 blur" />
              <img
                src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1000&q=80"
                alt="እንኳን ወደ ቤተክርስትያናችን በደህና መጡ"
                loading="lazy"
                className="relative w-full rounded-2xl border border-emerald-200/70 object-cover shadow-lg"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* SCHEDULE */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <SectionTitle
          kicker="የሳምንቱ መርሃ ግብር"
          title="የአገልግሎት ሰዓታት"
          desc="ስድስቱም የጋራ ጉባኤዎች በሳምንቱ ውስጥ ተዘጋጅተዋል — በሁሉም አገልግሎት ላይ እንኳን በደህና መጡ።"
        />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_TIMES.map((s, i) => {
            const Icon = iconMap[s.icon];
            return (
              <motion.div
                key={s.id}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.04 }}
                className="group rounded-2xl border border-stone-200 bg-white p-5 transition hover:border-emerald-300 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-800 transition group-hover:bg-emerald-100">
                    <Icon size={18} weight="bold" />
                  </span>
                  <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-800">
                    {s.day}
                  </span>
                </div>
                <h3 className="mt-3 text-sm font-bold text-slate-900">{s.title}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
                  <Calendar size={12} /> {s.time}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">{s.detail}</p>
                <p className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-500">
                  <MapPin size={11} /> {s.place}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* SERMONS PREVIEW */}
      <section className="border-y border-stone-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-700">
                የቅርብ ጊዜ ስብከቶች
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold text-slate-900 sm:text-3xl">
                ቃሉን ያዳምጡ
              </h2>
            </div>
            <button
              onClick={() => onNavigate("sermons")}
              className="flex items-center gap-1.5 rounded-lg border border-stone-300 px-3.5 py-2 text-xs font-semibold text-slate-700 transition hover:bg-stone-50"
            >
              ሁሉንም ስብከቶች <ArrowRight size={12} weight="bold" />
            </button>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {SERMONS.slice(0, 3).map((s, i) => (
              <motion.article
                key={s.id}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.05 }}
                className="flex flex-col rounded-2xl border border-stone-200 bg-[#fdfcf8] p-5"
              >
                <span className="w-fit rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-800">
                  {s.topic}
                </span>
                <h3 className="mt-3 font-display text-base font-bold leading-snug text-slate-900">
                  {s.title}
                </h3>
                <p className="mt-1 text-[11px] text-slate-500">
                  {s.speaker} · {s.scripture}
                </p>
                <p className="mt-2 line-clamp-3 flex-1 text-xs leading-relaxed text-slate-600">
                  {s.summary}
                </p>
                <button
                  onClick={() => onPlay(s)}
                  className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-emerald-800 px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-emerald-900 active:scale-95"
                >
                  <Play size={13} weight="fill" /> አድምጥ
                </button>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* MINISTRIES */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <SectionTitle
          kicker="አገልግሎቶች"
          title="በአገልግሎት ውስጥ ይሳተፉ"
          desc="እያንዳንዱ ሰው ስጦታውን የሚጠቀምበት ቦታ አለው። ከስድስቱ አገልግሎቶች አንዱን ይምረጡ።"
        />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {MINISTRIES.map((m, i) => {
            const Icon = ministryIcon[m.icon];
            return (
              <motion.div
                key={m.id}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.04 }}
                className="group flex flex-col rounded-2xl border border-stone-200 bg-white p-5 transition hover:border-amber-300 hover:shadow-md"
              >
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-amber-50 text-amber-700 transition group-hover:bg-amber-100">
                  <Icon size={19} weight="bold" />
                </span>
                <h3 className="mt-3 text-sm font-bold text-slate-900">{m.title}</h3>
                <p className="mt-1 text-[11px] font-semibold text-emerald-800">{m.tagline}</p>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-600">{m.detail}</p>
                <div className="mt-3 flex items-center justify-between gap-2 border-t border-stone-100 pt-3">
                  <span className="text-[10px] text-slate-500">{m.meets}</span>
                  <button
                    onClick={() => joinMinistry(m)}
                    className="rounded-lg bg-emerald-50 px-2.5 py-1.5 text-[10px] font-bold text-emerald-800 transition hover:bg-emerald-100 active:scale-95"
                  >
                    ተቀላቀል
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* EVENTS + GIVING */}
      <section className="bg-emerald-950 py-12 text-emerald-50">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 lg:grid-cols-2">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-300">
              የሚመጡ ፕሮግራሞች
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold">በጋራ የምንገኝባቸው ጊዜያት</h2>
            <ul className="mt-5 space-y-2.5">
              {EVENTS.slice(0, 3).map((e) => (
                <li
                  key={e.id}
                  className="rounded-xl border border-emerald-800 bg-emerald-900/50 p-3.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold">{e.title}</p>
                    <span className="shrink-0 rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-200">
                      {e.date}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-emerald-200/70">
                    {e.time} · {e.place}
                  </p>
                </li>
              ))}
            </ul>
            <button
              onClick={() => onNavigate("events")}
              className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-amber-300 hover:text-amber-200"
            >
              ሁሉንም ፕሮግራሞች <ArrowRight size={12} weight="bold" />
            </button>
          </div>

          <div className="rounded-2xl border border-amber-500/30 bg-emerald-900/40 p-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-300">
              መስጠትና ድጋፍ
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold">በፍቅር ይሳተፉ</h2>
            <p className="mt-3 text-xs leading-relaxed text-emerald-100/80">
              አስራትዎን፣ በኩራትዎንና ልዩ መዋጮዎን በኢትዮጵያ ንግድ ባንክ ወይም በቴሌብር በቀላሉ ማስተላለፍ
              ይችላሉ። ሁሉም የባንክ መረጃዎች በአንድ ጠቅታ ይቀዳሉ።
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={onGive}
                className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-bold text-emerald-950 transition hover:bg-amber-400 active:scale-95"
              >
                <HandHeart size={15} weight="fill" /> የመስጠት መመሪያ
              </button>
              <button
                onClick={onPrayer}
                className="flex items-center gap-2 rounded-xl border border-emerald-700 px-4 py-2.5 text-xs font-semibold text-emerald-50 transition hover:bg-emerald-900"
              >
                <Heart size={14} weight="fill" /> ጸሎት ይጠይቁ
              </button>
            </div>
            <p className="mt-4 border-t border-emerald-800 pt-3 text-[11px] text-emerald-200/60">
              {CHURCH.verseRef} · “{CHURCH.verse}”
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export function AboutPage({ onPrayer }: { onPrayer: () => void }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid items-center gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative grid place-items-center rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-amber-50 p-10"
        >
          <img src={LOGO_URL} alt={`${CHURCH.name} አርማ`} className="h-52 w-52 object-contain" />
          <p className="mt-4 text-center font-display text-sm font-bold text-emerald-900">
            {CHURCH.name}
          </p>
          <p className="text-[11px] text-emerald-800/70">{CHURCH.latin}</p>
        </motion.div>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-700">
            ስለ እኛ
          </p>
          <h1 className="mt-2 font-display text-2xl font-bold leading-snug text-slate-900 sm:text-3xl">
            ከ{CHURCH.founded} ጀምሮ በመካኒሳ የሚገኝ የእምነት ቤት
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            {CHURCH.name} በመካኒሳ አካባቢ የሚኖሩ ቤተሰቦችን በቃሉ ለማገልገል የተመሠረተ ሙሉ ወንጌል
            ቤተክርስትያን ነው። ህፃናትን፣ ወጣቶችን፣ እናቶችንና አባቶችን በአንድ የፍቅር ቤተሰብ ውስጥ
            በማሰባሰብ በጸሎት፣ በትምህርትና በአገልግሎት እናድጋለን።
          </p>

          <div className="mt-6 grid grid-cols-3 gap-2.5">
            {[
              { k: "36+", v: "ዓመታት አገልግሎት" },
              { k: "1,400+", v: "የጉባኤ አባላት" },
              { k: "6", v: "የአገልግሎት ክፍሎች" },
            ].map((s) => (
              <div key={s.v} className="rounded-2xl border border-stone-200 bg-white p-3 text-center">
                <p className="font-display text-xl font-bold text-emerald-800">{s.k}</p>
                <p className="mt-0.5 text-[10px] text-slate-500">{s.v}</p>
              </div>
            ))}
          </div>

          <button
            onClick={onPrayer}
            className="mt-5 flex items-center gap-2 rounded-xl bg-emerald-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900 active:scale-95"
          >
            <Heart size={16} weight="fill" /> የጸሎት ጥያቄ ይላኩ
          </button>
        </div>
      </div>

      <div className="mt-14">
        <SectionTitle kicker="እምነታችን" title="ስድስቱ የእምነት መሠረቶች" />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FAITH_POINTS.map((f, i) => (
            <motion.div
              key={f.id}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.04 }}
              className="rounded-2xl border border-stone-200 bg-white p-5"
            >
              <p className="text-[11px] font-bold text-amber-700">{f.verse}</p>
              <h3 className="mt-1.5 text-sm font-bold text-slate-900">{f.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{f.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-14">
        <SectionTitle kicker="መሪዎች" title="የአገልግሎት ባልደረቦች" />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {LEADERS.map((l, i) => (
            <motion.div
              key={l.id}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.04 }}
              className="flex gap-3 rounded-2xl border border-stone-200 bg-white p-4"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-emerald-50 font-display text-sm font-bold text-emerald-800">
                {l.initials}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-slate-900">{l.name}</p>
                <p className="text-[11px] font-semibold text-amber-700">{l.role}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">{l.bio}</p>
                <p className="mt-1 text-[10px] text-slate-400">ከ{l.since} ጀምሮ</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-14">
        <SectionTitle kicker="መንፈሳዊ ጽሑፎች" title="ለማንበብ" />
        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {ARTICLES.map((a) => (
            <article key={a.id} className="rounded-2xl border border-stone-200 bg-white p-5">
              <h3 className="font-display text-sm font-bold text-slate-900">{a.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{a.excerpt}</p>
              <p className="mt-3 text-[10px] text-slate-400">
                {a.author} · {a.minutes} ደቂቃ ንባብ
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}