import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "sonner";
import Navbar, { SiteFooter } from "./components/Navbar";
import AudioPlayer from "./components/AudioPlayer";
import { ModalHost } from "./components/Modals";
import { AboutPage, HomePage } from "./components/HomeAbout";
import { ContactPage, EventsPage, SermonsPage } from "./components/SermonsEvents";
import FulltimeMinistersPage from "./components/FulltimeMinistersPage";
import type { PageKey, Sermon } from "./types";

export default function App() {
  const [page, setPage] = useState<PageKey>("home");
  const [modal, setModal] = useState<"giving" | "prayer" | null>(null);
  const [current, setCurrent] = useState<Sermon | null>(null);

  const navigate = (next: PageKey) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const play = (sermon: Sermon) => setCurrent(sermon);

  return (
    <div className="min-h-screen bg-[#fdfcf8] text-slate-900 antialiased">
      <Navbar
        page={page}
        onNavigate={navigate}
        onGive={() => setModal("giving")}
        onPrayer={() => setModal("prayer")}
      />

      <main className={current ? "pb-28" : ""}>
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            {page === "home" && (
              <HomePage
                onNavigate={navigate}
                onGive={() => setModal("giving")}
                onPrayer={() => setModal("prayer")}
                onPlay={play}
              />
            )}
            {page === "about" && <AboutPage onPrayer={() => setModal("prayer")} />}
            {page === "sermons" && <SermonsPage onPlay={play} />}
            {page === "ministers" && (
              <FulltimeMinistersPage
                onNavigate={navigate}
                onGive={() => setModal("giving")}
                onPrayer={() => setModal("prayer")}
              />
            )}
            {page === "events" && (
              <EventsPage onNavigate={navigate} onPrayer={() => setModal("prayer")} />
            )}
            {page === "contact" && (
              <ContactPage onGive={() => setModal("giving")} onPrayer={() => setModal("prayer")} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <SiteFooter
        onNavigate={navigate}
        onGive={() => setModal("giving")}
        onPrayer={() => setModal("prayer")}
      />

      <AnimatePresence>
        {current && <AudioPlayer sermon={current} onClose={() => setCurrent(null)} />}
      </AnimatePresence>

      <ModalHost which={modal} onClose={() => setModal(null)} />

      <Toaster richColors position="top-right" closeButton />
    </div>
  );
}