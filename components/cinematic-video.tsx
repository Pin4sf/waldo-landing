"use client";

import { useRef, useState, useEffect, useCallback } from "react";

const SPEEDS = [0.5, 1, 1.25, 1.5, 2] as const;
type Speed = typeof SPEEDS[number];

interface CinematicVideoProps {
  src: string;
  containerStyle?: React.CSSProperties;
  containerClassName?: string;
}

export function CinematicVideo({ src, containerStyle, containerClassName }: CinematicVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef     = useRef<HTMLVideoElement>(null);

  const [expanded, setExpanded] = useState(false);
  const [playing,  setPlaying]  = useState(true);
  const [muted,    setMuted]    = useState(true);
  const [speed,    setSpeed]    = useState<Speed>(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration,    setDuration]    = useState(0);
  const [rect,     setRect]     = useState<DOMRect | null>(null);

  // ── Scroll handler ───────────────────────────────────────────
  useEffect(() => {
    const handle = () => {
      const el = containerRef.current;
      if (!el) return;
      const r   = el.getBoundingClientRect();
      const vh  = window.innerHeight;
      const cy  = r.top + r.height / 2;
      const inZ = cy > vh * 0.15 && cy < vh * 0.75;
      if (inZ && !expanded) { setRect(r); setExpanded(true); }
      else if (!inZ && expanded) {
        setExpanded(false);
        if (videoRef.current) { videoRef.current.muted = true; setMuted(true); }
      }
    };
    window.addEventListener("scroll", handle, { passive: true });
    handle();
    return () => window.removeEventListener("scroll", handle);
  }, [expanded]);

  // ── Sync speed to video ─────────────────────────────────────
  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = speed;
  }, [speed]);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
    } else {
      v.pause();
    }
  }, []);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }, []);

  const cycleSpeed = useCallback(() => {
    setSpeed(s => {
      const idx = SPEEDS.indexOf(s);
      return SPEEDS[(idx + 1) % SPEEDS.length] as Speed;
    });
  }, []);

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current;
    if (!v || !duration) return;
    const t = (Number(e.target.value) / 1000) * duration;
    v.currentTime = t;
    setCurrentTime(t);
  }, [duration]);

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <>
      {/* Container — holds layout, shows ambient muted loop */}
      <div ref={containerRef} className={containerClassName} style={{ ...containerStyle, position: "relative" }}>
        <video
          src={src} autoPlay loop muted playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: expanded ? 0 : 1, transition: "opacity 300ms var(--ease-premium)" }}
        />
      </div>

      {/* Fullscreen overlay */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 9999,
        display: "flex", alignItems: "center", justifyContent: "center",
        pointerEvents: expanded ? "auto" : "none",
        background: "color-mix(in srgb, var(--dark-t3) 86%, transparent)",
        opacity: expanded ? 1 : 0,
        transition: "opacity 0.45s cubic-bezier(0.22,1,0.36,1)",
        backdropFilter: "blur(6px)",
      }}>
        {/* Video card */}
        <div style={{
          position: "relative",
          width: expanded ? "min(92vw, 1200px)" : rect ? `${rect.width}px` : "707px",
          aspectRatio: "16/9",
          borderRadius: expanded ? 16 : 14,
          overflow: "hidden",
          transition: "width 0.5s cubic-bezier(0.22,1,0.36,1), border-radius 0.5s ease",
        }}>
          <video
            ref={videoRef}
            src={src}
            autoPlay={expanded}
            loop muted={muted} playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime ?? 0)}
            onLoadedMetadata={() => {
              setDuration(videoRef.current?.duration ?? 0);
              if (videoRef.current) videoRef.current.playbackRate = speed;
            }}
          />

          {/* Controls bar */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            padding: "60px 20px 16px",
            background: "linear-gradient(to top, color-mix(in srgb, var(--dark-t4) 88%, transparent) 0%, transparent 100%)",
            display: "flex", flexDirection: "column", gap: 10,
            opacity: expanded ? 1 : 0,
            transition: "opacity 0.3s ease 0.2s",
          }}>
            {/* Seek slider */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--text-secondary)", minWidth: 34, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
                {fmt(currentTime)}
              </span>
              <input
                type="range" min={0} max={1000} step={1}
                value={duration ? (currentTime / duration) * 1000 : 0}
                onChange={handleSeek}
                style={{
                  flex: 1, height: 3, cursor: "pointer", accentColor: "var(--action)",
                  WebkitAppearance: "none", appearance: "none",
                  background: `linear-gradient(to right, var(--action) ${duration ? (currentTime / duration) * 100 : 0}%, rgba(250,250,248,0.2) 0%)`,
                  borderRadius: 2, outline: "none",
                }}
              />
              <span style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--text-secondary)", minWidth: 34, fontVariantNumeric: "tabular-nums" }}>
                {fmt(duration)}
              </span>
            </div>

            {/* Buttons row */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {/* Play/Pause */}
              <Btn onClick={togglePlay}>
                {playing
                  ? <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><rect x="2" y="1.5" width="3.5" height="12" rx="1" fill="currentColor"/><rect x="9.5" y="1.5" width="3.5" height="12" rx="1" fill="currentColor"/></svg>
                  : <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M4 2.5l9 5-9 5v-10z" fill="currentColor"/></svg>
                }
              </Btn>

              {/* Sound */}
              <Btn onClick={toggleMute} accent={muted}>
                {muted ? (
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                    <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
                  </svg>
                ) : (
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                  </svg>
                )}
              </Btn>

              {/* Speed toggle */}
              <Btn onClick={cycleSpeed}>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 600, color: speed !== 1 ? "var(--action)" : "var(--surface-t2)", letterSpacing: "-0.02em" }}>
                  {speed}×
                </span>
              </Btn>

              {/* Status */}
              <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-secondary)", marginLeft: 4 }}>
                {muted ? "sound is muted" : speed !== 1 ? `playing at ${speed}×` : "waldo · already on it."}
              </span>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        {expanded && (
          <div style={{
            position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)",
            fontFamily: "var(--font-body)", fontSize: 11,
            color: "var(--text-secondary)", letterSpacing: "0.08em",
            pointerEvents: "none", animation: "hint-pulse 2s ease-in-out infinite",
          }}>
            scroll to continue
          </div>
        )}
      </div>
    </>
  );
}

function Btn({ onClick, accent, children }: { onClick: () => void; accent?: boolean; children: React.ReactNode }) {
  return (
    <button onClick={onClick} style={{
      width: 40, height: 40, borderRadius: "50%", cursor: "pointer", flexShrink: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "var(--surface-t2)",
      background: accent ? "color-mix(in srgb, var(--action) 24%, transparent)" : "rgba(250,250,248,0.12)",
      border: accent ? "1px solid color-mix(in srgb, var(--action) 52%, transparent)" : "1px solid rgba(250,250,248,0.18)",
      backdropFilter: "blur(8px)",
      transition: "background 0.15s ease, transform 0.1s ease",
    }}
    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"; }}
    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
    >
      {children}
    </button>
  );
}
