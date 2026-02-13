import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { FOCUS_MUSIC, getEmbedUrl, type FocusTrack } from "./focusMusic";

export default function CoffeePomodoroApp() {
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [selectedFocus, setSelectedFocus] = useState<FocusTrack | null>(() => {
    try {
      const saved = localStorage.getItem("coffee-pomodoro-focus-id");
      if (saved) return FOCUS_MUSIC.find((t) => t.id === saved) ?? null;
    } catch {
      /* ignore */
    }
    return null;
  });

  const totalSegmentSeconds = (isBreak ? breakTime : workTime) * 60;
  const fillPercent = totalSegmentSeconds > 0 ? (timeLeft / totalSegmentSeconds) * 100 : 0;

  const notify = useCallback(() => {
    if (typeof Notification === "undefined") return;
    if (Notification.permission === "granted") {
      new Notification("Pomodoro Bitti! ☕", {
        body: isBreak ? "Çalışmaya dönme zamanı." : "Kısa bir mola ver.",
        icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>☕</text></svg>",
      });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission();
    }
  }, [isBreak]);

  useEffect(() => {
    if (typeof Notification !== "undefined" && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    }
    if (timeLeft === 0) {
      notify();
      if (!isBreak) {
        setIsBreak(true);
        setTimeLeft(breakTime * 60);
      } else {
        setIsBreak(false);
        setTimeLeft(workTime * 60);
      }
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, timeLeft, isBreak, breakTime, workTime, notify]);

  useEffect(() => {
    try {
      if (selectedFocus) localStorage.setItem("coffee-pomodoro-focus-id", selectedFocus.id);
    } catch {
      /* ignore */
    }
  }, [selectedFocus]);

  const startTimer = () => {
    setTimeLeft((isBreak ? breakTime : workTime) * 60);
    setIsRunning(true);
  };

  const pauseTimer = () => setIsRunning(false);

  const resetTimer = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(workTime * 60);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-[#f5e6d3] text-[#2c1a18] p-4 md:p-8">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-[#e8d4bc] blur-3xl opacity-80" />
        <div className="absolute top-2/3 -left-40 w-96 h-96 rounded-full bg-[#fff8f0] blur-3xl opacity-70" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#4b2e2b]/08 to-transparent" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-14"
        >
          <h1 className="font-display text-4xl md:text-6xl font-bold text-[#2c1a18] tracking-tight drop-shadow-sm">
            Coffee Pomodoro
          </h1>
          <p className="mt-3 font-medium text-[#5c3d38] text-lg md:text-xl tracking-wide">
            Odaklan — kahven bitmeden bitir.
          </p>
        </motion.header>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.45 }}
            className="md:col-span-1 flex flex-col items-center"
          >
            <div className="rounded-3xl shadow-cup bg-[#fff8f0] border-2 border-[#d4b896] p-6 md:p-8 w-full">
              <p className="font-display text-center text-xl font-semibold text-[#4b2e2b] mb-6">
                {isBreak ? "Mola" : "Çalışma"}
              </p>
              <div className="flex justify-center mb-6">
                <div className="relative w-40 h-52 md:w-44 md:h-56">
                  <div
                    className="absolute inset-0 rounded-b-[2rem] rounded-t-lg border-[5px] border-[#4b2e2b] bg-[#fdf8f6] shadow-cup-inner overflow-hidden"
                    style={{ borderTopWidth: "4px" }}
                  >
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 rounded-b-[1.25rem] rounded-t-sm"
                      style={{
                        background: isBreak
                          ? "linear-gradient(180deg, #b8926a 0%, #9c7355 100%)"
                          : "linear-gradient(180deg, #5c3d38 0%, #4b2e2b 50%, #3d2522 100%)",
                        boxShadow: "inset 0 2px 12px rgba(255,255,255,0.15)",
                      }}
                      initial={false}
                      animate={{ height: `${Math.max(0, fillPercent)}%` }}
                      transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                    />
                  </div>
                  <div
                    className="absolute -right-4 top-8 w-8 h-20 rounded-r-full border-[4px] border-l-0 border-[#4b2e2b] bg-transparent"
                    style={{ borderTopRightRadius: "999px", borderBottomRightRadius: "999px" }}
                    aria-hidden
                  />
                </div>
              </div>
              <div
                className={`font-display text-center text-5xl md:text-6xl font-bold tabular-nums tracking-tight ${
                  isBreak ? "text-[#7d5a42]" : "text-[#2c1a18]"
                }`}
                style={{ textShadow: "0 2px 12px rgba(75,46,43,0.12)" }}
              >
                {formatTime(timeLeft)}
              </div>
              <div className="flex flex-wrap gap-2 justify-center mt-6">
                <button type="button" onClick={startTimer} className="px-5 py-2.5 rounded-xl bg-[#4b2e2b] text-[#fff8f0] font-semibold hover:bg-[#3d2522] active:scale-[0.98] transition shadow-md">Başlat</button>
                <button type="button" onClick={pauseTimer} className="px-5 py-2.5 rounded-xl bg-[#e8d4bc] text-[#2c1a18] font-semibold hover:bg-[#d4b896] active:scale-[0.98] transition">Duraklat</button>
                <button type="button" onClick={resetTimer} className="px-5 py-2.5 rounded-xl border-2 border-[#9c7355] text-[#4b2e2b] font-semibold hover:bg-[#f5e6d3] active:scale-[0.98] transition">Sıfırla</button>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.45 }}>
            <div className="rounded-3xl shadow-xl bg-[#fff8f0] border-2 border-[#d4b896] overflow-hidden h-full p-6 md:p-8">
              <h2 className="font-display text-xl font-bold text-[#2c1a18] mb-5">Ayarlar</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-[#5c3d38] mb-1.5">Çalışma süresi (dk)</label>
                  <input type="number" min={1} max={120} value={workTime} onChange={(e) => { const v = Number(e.target.value); if (!isNaN(v) && v >= 1 && v <= 120) setWorkTime(v); }} className="w-full px-4 py-3 rounded-xl border-2 border-[#d4b896] bg-white text-[#2c1a18] font-medium focus:border-[#7d5a42] focus:ring-2 focus:ring-[#e8d4bc] outline-none transition" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#5c3d38] mb-1.5">Mola süresi (dk)</label>
                  <input type="number" min={1} max={60} value={breakTime} onChange={(e) => { const v = Number(e.target.value); if (!isNaN(v) && v >= 1 && v <= 60) setBreakTime(v); }} className="w-full px-4 py-3 rounded-xl border-2 border-[#d4b896] bg-white text-[#2c1a18] font-medium focus:border-[#7d5a42] focus:ring-2 focus:ring-[#e8d4bc] outline-none transition" />
                </div>
              </div>
              <p className="mt-4 text-xs font-medium text-[#7d5a42]">Değişiklikler yeni turda uygulanır.</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.45 }}>
            <div className="rounded-3xl shadow-xl bg-[#fff8f0] border-2 border-[#d4b896] overflow-hidden h-full p-6 md:p-8 flex flex-col">
              <h2 className="font-display text-xl font-bold text-[#2c1a18] mb-1">Odak Müziği</h2>
              <p className="text-sm font-medium text-[#5c3d38] mb-3">Ders & kitap için — klasik, piyano, enstrümantal (100 seçenek)</p>
              <div className="flex-1 min-h-0 flex flex-col gap-3">
                <div className="rounded-xl border-2 border-[#d4b896] bg-white overflow-hidden flex-1 min-h-[120px] max-h-[180px] overflow-y-auto">
                  <ul className="p-1.5 space-y-0.5">
                    {FOCUS_MUSIC.map((track) => (
                      <li key={track.id}>
                        <button type="button" onClick={() => setSelectedFocus(track)} className={`w-full text-left text-sm py-2 px-2.5 rounded-lg transition truncate ${selectedFocus?.id === track.id ? "bg-[#4b2e2b] text-[#fff8f0] font-medium" : "hover:bg-[#e8d4bc] text-[#2c1a18]"}`} title={track.title}>{track.title}</button>
                      </li>
                    ))}
                  </ul>
                </div>
                {selectedFocus && (
                  <div className="rounded-xl overflow-hidden bg-[#2c1a18]/05 flex-shrink-0">
                    <iframe src={getEmbedUrl(selectedFocus)} width="100%" height="152" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" title={selectedFocus.title} className="rounded-xl" />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.footer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-14 text-center">
          <p className="font-display text-xl font-semibold text-[#4b2e2b]">Kahveni al, odaklan ve üret</p>
        </motion.footer>
      </div>
    </div>
  );
}
