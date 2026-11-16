import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Envelope, HandHeart, Phone, ShieldCheck, X } from "@phosphor-icons/react";
import { toast } from "sonner";
import { CBE_ACCOUNT, CHURCH, GIVING_PURPOSES, TELEBIRR } from "../data/churchData";
import type { PrayerRequest } from "../types";

const PRAYER_KEY = "mekanisa-prayer-requests";

function Shell({
  title,
  subtitle,
  onClose,
  children,
}: {
  title: string;
  subtitle: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-end justify-center bg-emerald-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 30, opacity: 0, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-stone-200 bg-[#fdfcf8] p-5 shadow-2xl sm:rounded-3xl sm:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-bold text-slate-900 sm:text-2xl">{title}</h2>
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="ዝጋ"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-stone-300 text-slate-500 transition hover:bg-stone-100"
          >
            <X size={16} weight="bold" />
          </button>
        </div>
        <div className="mt-5">{children}</div>
      </motion.div>
    </motion.div>
  );
}

function CopyRow({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success(`${label} ተቀድቷል`);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("መቅዳት አልተቻለም። እባክዎ እራስዎ ይጻፉ።");
    }
  };

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-stone-200 bg-white px-3 py-2.5">
      <div className="min-w-0">
        <p className="text-[11px] text-slate-500">{label}</p>
        <p className="truncate text-sm font-semibold text-slate-900">{value}</p>
      </div>
      <button
        onClick={copy}
        aria-label={`${label} ቅዳ`}
        className="shrink-0 rounded-lg bg-emerald-50 p-2 text-emerald-800 transition hover:bg-emerald-100 active:scale-95"
      >
        {copied ? <Check size={16} weight="bold" /> : <Copy size={16} weight="bold" />}
      </button>
    </div>
  );
}

export function GivingModal({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<"cbe" | "telebirr">("cbe");

  return (
    <Shell
      title="መስጠትና ድጋፍ"
      subtitle="አስራትዎን፣ በኩራትዎንና ልዩ መዋጮዎን በቀላሉ ማስተላለፍ ይችላሉ።"
      onClose={onClose}
    >
      <div className="grid gap-2 sm:grid-cols-2">
        {GIVING_PURPOSES.map((p) => (
          <div key={p.id} className="rounded-xl border border-stone-200 bg-white p-3">
            <div className="flex items-center gap-2">
              <HandHeart size={16} weight="bold" className="text-amber-600" />
              <p className="text-sm font-semibold text-slate-900">{p.title}</p>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">{p.detail}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 flex gap-1 rounded-xl bg-stone-100 p-1">
        {[
          { key: "cbe" as const, label: "የኢትዮጵያ ንግድ ባንክ" },
          { key: "telebirr" as const, label: "ቴሌብር" },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
              tab === t.key ? "bg-white text-emerald-800 shadow-sm" : "text-slate-600"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "cbe" ? (
        <div className="mt-4 space-y-2">
          <CopyRow label="የሂሳብ ባለቤት" value={CBE_ACCOUNT.holder} />
          <CopyRow label="የሂሳብ ቁጥር" value={CBE_ACCOUNT.number} />
          <CopyRow label="ቅርንጫፍ" value={CBE_ACCOUNT.branch} />
          <p className="flex items-start gap-2 rounded-xl bg-amber-50 px-3 py-2.5 text-xs leading-relaxed text-amber-900">
            <ShieldCheck size={16} weight="bold" className="mt-0.5 shrink-0" />
            ከዝውውሩ በኋላ የደረሰኙን ምስል ወደ {CHURCH.email} ይላኩ። ስለ መዋጮው ጥያቄ ካለዎት በቤተክርስትያኑ
            ጽ/ቤት ሰዓት ይደውሉልን።
          </p>
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          <div className="grid gap-2 sm:grid-cols-2">
            <CopyRow label="የቴሌብር ቁጥር" value={TELEBIRR.number} />
            <CopyRow label="የነጋዴ ስም" value={TELEBIRR.merchant} />
          </div>
          <ol className="space-y-2">
            {TELEBIRR.steps.map((step, i) => (
              <li
                key={i}
                className="flex gap-3 rounded-xl border border-stone-200 bg-white p-3"
              >
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-700 text-[11px] font-bold text-white">
                  {i + 1}
                </span>
                <p className="text-xs leading-relaxed text-slate-600">{step}</p>
              </li>
            ))}
          </ol>
          <p className="text-xs text-slate-500">
            አማራጭ፡ በቴሌብር መተግበሪያ ውስጥ የ USSD ኮድ {TELEBIRR.ussd} በመጠቀምም መላክ ይችላሉ።
          </p>
        </div>
      )}
    </Shell>
  );
}

const PRAYER_TOPICS = [
  "ጤና",
  "ቤተሰብ",
  "ስራ",
  "ትምህርት",
  "መንፈሳዊ እድገት",
  "ሌላ",
];

export function PrayerModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<PrayerRequest>({
    name: "",
    phone: "",
    topic: PRAYER_TOPICS[0],
    message: "",
  });
  const [privateNote, setPrivateNote] = useState(true);
  const [sending, setSending] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    try {
      const prev = JSON.parse(localStorage.getItem(PRAYER_KEY) ?? "[]") as PrayerRequest[];
      setCount(prev.length);
    } catch {
      setCount(0);
    }
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name.trim().length < 2) {
      toast.error("እባክዎ ስምዎን ያስገቡ።");
      return;
    }
    if (form.message.trim().length < 10) {
      toast.error("የጸሎት ጥያቄው ቢያንስ 10 ፊደል መሆን አለበት።");
      return;
    }
    setSending(true);
    try {
      const prev = JSON.parse(localStorage.getItem(PRAYER_KEY) ?? "[]") as PrayerRequest[];
      localStorage.setItem(
        PRAYER_KEY,
        JSON.stringify([
          { ...form, private: privateNote, createdAt: new Date().toISOString() },
          ...prev,
        ]),
      );
      setCount(prev.length + 1);
      toast.success("ጸሎትዎ ተመዝግቧል። የጸሎት ቡድናችን ይጸልያል።");
      setForm({ name: "", phone: "", topic: PRAYER_TOPICS[0], message: "" });
      setTimeout(onClose, 700);
    } catch {
      toast.error("መላክ አልተቻለም። እባክዎ እንደገና ይሞክሩ።");
    } finally {
      setSending(false);
    }
  };

  return (
    <Shell
      title="የጸሎት ጥያቄ"
      subtitle="ጥያቄዎን በሚስጥር ይናገሩ። የጸሎት ቡድናችን በየሳምንቱ ይጸልያል።"
      onClose={onClose}
    >
      <form onSubmit={submit} className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="text-xs font-medium text-slate-600" htmlFor="prayer-name">
              ስም
            </label>
            <input
              id="prayer-name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="ሙሉ ስምዎ"
              className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-emerald-600"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600" htmlFor="prayer-phone">
              ስልክ (አማራጭ)
            </label>
            <input
              id="prayer-phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="09xx xxx xxx"
              className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-emerald-600"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-slate-600" htmlFor="prayer-topic">
            የጥያቄ ዓይነት
          </label>
          <select
            id="prayer-topic"
            value={form.topic}
            onChange={(e) => setForm({ ...form, topic: e.target.value })}
            className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-emerald-600"
          >
            {PRAYER_TOPICS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-medium text-slate-600" htmlFor="prayer-message">
            የጸሎት ጥያቄዎ
          </label>
          <textarea
            id="prayer-message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            rows={4}
            placeholder="የጸሎት ጥያቄዎን በአማርኛ ይጻፉ..."
            className="mt-1 w-full resize-none rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-emerald-600"
          />
        </div>

        <label className="flex items-center gap-2 text-xs text-slate-600">
          <input
            type="checkbox"
            checked={privateNote}
            onChange={(e) => setPrivateNote(e.target.checked)}
            className="h-4 w-4 rounded border-stone-300 accent-emerald-700"
          />
          ጥያቄዬ ሚስጥራዊ እንዲሆን እፈልጋለሁ
        </label>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-xs text-slate-500">
            <Envelope size={14} /> ወይም {CHURCH.email} ይላኩ
          </p>
          <button
            type="submit"
            disabled={sending}
            className="rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800 active:scale-[0.98] disabled:opacity-60"
          >
            {sending ? "በመላክ ላይ..." : "ጥያቄውን ላክ"}
          </button>
        </div>
        <p className="flex items-center gap-2 text-[11px] text-slate-400">
          <Phone size={12} /> አስቸኳይ ጉዳይ ካለ በቀጥታ {CHURCH.phone} ይደውሉ።
        </p>
        {count > 0 && (
          <p className="rounded-xl bg-emerald-50 px-3 py-2 text-[11px] font-medium text-emerald-800">
            በዚህ መሣሪያ ላይ {count} የጸሎት ጥያቄ ተመዝግቧል።
          </p>
        )}
      </form>
    </Shell>
  );
}

export function ModalHost({
  which,
  onClose,
}: {
  which: "giving" | "prayer" | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {which === "giving" && <GivingModal key="giving" onClose={onClose} />}
      {which === "prayer" && <PrayerModal key="prayer" onClose={onClose} />}
    </AnimatePresence>
  );
}