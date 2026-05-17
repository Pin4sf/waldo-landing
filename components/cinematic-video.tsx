"use client";

/**
 * CinematicVideo — scroll-triggered video expansion.
 *
 * Behaviour:
 * 1. Video plays muted + autoloop in its container (ambient)
 * 2. When container reaches viewport center → expands to fullscreen overlay
 * 3. Controls appear: play/pause + sound toggle
 * 4. When user scrolls past the section → collapses back, continues muted
 */

import { useRef, useState, useEffect, useCallback } from "react";

interface CinematicVideoProps {
  src: string;
  containerStyle?: React.CSSProperties;
  containerClassName?: string;
}

export function CinematicVideo({ src, containerStyle, containerClassName }: CinematicVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [rect, setRect] = useState<DOMRect | null>(null);

  // Track scroll to expand/collapse
  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Expand when container center is between 15% and 75% of viewport
      const centerY = r.top + r.height / 2;
      const inZone = centerY > vh * 0.15 && centerY < vh * 0.75;
      if (inZone && !expanded) {
        setRect(r);
        setExpanded(true);
      } else if (!inZone && expanded) {
        setExpanded(false);
        // Re-mute when collapsing
        if (videoRef.current) {
          videoRef.current.muted = true;
          setMuted(true);
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // run once on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [expanded]);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  }, []);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }, []);

  return (
    <>
      {/* Original container — holds layout space, shows ambient video */}
      <div
        ref={containerRef}
        className={containerClassName}
        style={{ ...containerStyle, position: "relative" }}
      >
        {/* When expanded, hide the container video (the fullscreen one is visible) */}
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: expanded ? 0 : 1,
            transition: "opacity 0.4s ease",
          }}
        />
      </div>

      {/* Fullscreen overlay — only rendered when expanded */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: expanded ? "auto" : "none",
          // Backdrop
          background: "rgba(0,0,0,0.72)",
          opacity: expanded ? 1 : 0,
          transition: "opacity 0.45s cubic-bezier(0.22,1,0.36,1)",
          backdropFilter: expanded ? "blur(6px)" : "none",
        }}
      >
        {/* Video wrapper — scales from rect → 90vw×90vh */}
        <div
          style={{
            position: "relative",
            width: expanded ? "min(90vw, 1200px)" : rect ? `${rect.width}px` : "707px",
            aspectRatio: "16/9",
            borderRadius: expanded ? 16 : 14,
            overflow: "hidden",
            boxShadow: expanded ? "0 32px 80px rgba(0,0,0,0.5)" : "none",
            transition: "width 0.5s cubic-bezier(0.22,1,0.36,1), border-radius 0.5s ease",
          }}
        >
          <video
            ref={videoRef}
            src={src}
            autoPlay={expanded}
            loop
            muted={muted}
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />

          {/* Controls overlay */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "40px 24px 20px",
              background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
              display: "flex",
              alignItems: "center",
              gap: 12,
              opacity: expanded ? 1 : 0,
              transition: "opacity 0.3s ease 0.2s",
            }}
          >
            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              style={{
                width: 42, height: 42,
                borderRadius: "50%",
                background: "rgba(250,250,248,0.15)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "white",
                cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.15s ease, transform 0.1s ease",
                flexShrink: 0,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(250,250,248,0.25)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(250,250,248,0.15)"; }}
            >
              {playing ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="3" y="2" width="3.5" height="12" rx="1" fill="white"/>
                  <rect x="9.5" y="2" width="3.5" height="12" rx="1" fill="white"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M5 3l9 5-9 5V3z" fill="white"/>
                </svg>
              )}
            </button>

            {/* Sound toggle */}
            <button
              onClick={toggleMute}
              style={{
                width: 42, height: 42,
                borderRadius: "50%",
                background: muted ? "rgba(249,115,22,0.25)" : "rgba(250,250,248,0.15)",
                backdropFilter: "blur(8px)",
                border: muted ? "1px solid rgba(249,115,22,0.5)" : "1px solid rgba(255,255,255,0.2)",
                color: "white",
                cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.15s ease",
                flexShrink: 0,
              }}
            >
              {muted ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <line x1="23" y1="9" x2="17" y2="15"/>
                  <line x1="17" y1="9" x2="23" y2="15"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                </svg>
              )}
            </button>

            {/* Label */}
            <span style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              color: "rgba(255,255,255,0.5)",
              marginLeft: 4,
            }}>
              {muted ? "tap to unmute" : "waldo demo · may 2026"}
            </span>
          </div>
        </div>

        {/* Scroll hint */}
        {expanded && (
          <div style={{
            position: "absolute",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "var(--font-body)",
            fontSize: 11,
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.08em",
            pointerEvents: "none",
            animation: "hint-pulse 2s ease-in-out infinite",
          }}>
            scroll to continue
          </div>
        )}
      </div>
    </>
  );
}
