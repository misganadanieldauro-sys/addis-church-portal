import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  MusicNotes,
  Pause,
  Play,
  SpeakerHigh,
  SpeakerSimpleX,
  X,
} from "@phosphor-icons/react";
import type { Sermon } from "../types";

function fmt(sec: number) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

interface AudioPlayerProps {
  sermon: Sermon;
  onClose: () => void;
}

export default function AudioPlayer({ sermon, onClose }: AudioPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [muted, setMuted] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    setPosition(0);
    setPlaying(true);
  }, [sermon.id]);

  useEffect(() => {
    if (timer.current) window.clearInterval(timer.current);
    if (!playing) return;
    timer.current = window.setInterval(() => {
      setPosition((p) => {
        const next = p + speed;
        if (next >= sermon.duration) {
          setPlaying(false);
          return sermon.duration;
        }
        return next;
      });
    }, 1000);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [playing, speed, sermon.duration]);

  const percent = Math.min(100, (position / sermon.duration) * 100);

  return (
    <motion.div
      initial={{ y: 90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 90, opacity: 0 }}
      transition={{ type: "spring", stiffness: 240, damping: 26 }}
      className="fixed inset-x-0 bottom-0 z-50 px-3 pb-3"
    >
      <div className="mx-auto max-w-4xl rounded-2xl border border-slate-700/60 bg-[#0b1220]/97 px-4 py-3 text-white shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="hidden h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-600/20 text-emerald-300 sm:grid">
            <MusicNotes size={20} weight="bold" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{sermon.title}</p>
            <p className="truncate text-[11px] text-stone-400">
              {sermon.speaker} · {sermon.scripture}
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setPlaying((v) => !v)}
              aria-label={playing ? "አቁም" : "አጫውት"}
              className="grid h-10 w-10 place-items-center rounded-full bg-emerald-500 text-slate-900 transition hover:bg-emerald-400 active:scale-95"
            >
              {playing ? <Pause size={18} weight="fill" /> : <Play size={18} weight="fill" />}
            </button>
            <button
              onClick={() => setMuted((v) => !v)}
              aria-label="ድምጽ"
              className="hidden h-9 w-9 place-items-center rounded-full text-stone-300 transition hover:bg-white/10 sm:grid"
            >
              {muted ? <SpeakerSimpleX size={18} /> : <SpeakerHigh size={18} />}
            </button>
            <button
              onClick={() => setSpeed((s) => (s >= 1.5 ? 0.75 : Number((s + 0.25).toFixed(2))))}
              className="hidden rounded-full border border-white/20 px-2 py-1 text-[11px] font-semibold text-stone-300 transition hover:border-emerald-400 hover:text-emerald-300 sm:block"
            >
              {speed}x
            </button>
            <button
              onClick={onClose}
              aria-label="ዝጋ"
              className="grid h-9 w-9 place-items-center rounded-full text-stone-400 transition hover:bg-white/10 hover:text-white"
            >
              <X size={16} weight="bold" />
            </button>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-3">
          <span className="w-9 shrink-0 text-right text-[11px] tabular-nums text-stone-400">
            {fmt(position)}
          </span>
          <input
            type="range"
            min={0}
            max={sermon.duration}
            step={1}
            value={Math.floor(position)}
            onChange={(e) => setPosition(Number(e.target.value))}
            aria-label="የስብከት ሂደት"
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-emerald-400"
            style={{
              background: `linear-gradient(to right, #34d399 ${percent}%, rgba(255,255,255,0.15) ${percent}%)`,
            }}
          />
          <span className="w-9 shrink-0 text-[11px] tabular-nums text-stone-400">
            {fmt(sermon.duration)}
          </span>
          <button
            onClick={() => setPosition(0)}
            className="hidden shrink-0 items-center gap-1 text-[11px] text-stone-400 hover:text-emerald-300 md:flex"
          >
            <Download size={14} /> አውርድ
          </button>
        </div>
      </div>
    </motion.div>
  );
}