"use client";

import { useRef, useState } from "react";

type PlaybackState = "idle" | "playing" | "paused" | "error";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${remainder}`;
}

export function ArticleListenPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playbackState, setPlaybackState] = useState<PlaybackState>("idle");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;

    if (playbackState === "playing") {
      audio.pause();
      return;
    }

    try {
      await audio.play();
    } catch {
      setPlaybackState("error");
    }
  }

  function seek(value: number) {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value;
    setCurrentTime(value);
  }

  function skip(seconds: number) {
    const audio = audioRef.current;
    if (!audio) return;
    seek(Math.min(Math.max(audio.currentTime + seconds, 0), duration || 0));
  }

  function setPlaybackRate(value: number) {
    const audio = audioRef.current;
    if (!audio) return;
    audio.playbackRate = value;
  }

  const primaryLabel =
    playbackState === "playing"
      ? "Pause"
      : playbackState === "paused"
        ? "Resume"
        : playbackState === "error"
          ? "Audio unavailable"
          : "Listen";
  const playerTitle =
    playbackState === "playing"
      ? "Now playing"
      : playbackState === "paused"
        ? "Paused"
        : playbackState === "error"
          ? "Audio unavailable"
          : "Listen";
  const metadataReady = duration > 0;
  const durationLabel = metadataReady ? `${Math.max(1, Math.round(duration / 60))} min` : "Loading audio";

  return (
    <section className="blog-listen-player" aria-label="Listen to this article">
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onPlay={() => setPlaybackState("playing")}
        onPause={() => setPlaybackState((state) => (state === "error" ? state : "paused"))}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onEnded={() => {
          setPlaybackState("idle");
          setCurrentTime(0);
        }}
        onError={() => setPlaybackState("error")}
      />
      <button
        type="button"
        className="blog-listen-primary"
        data-state={playbackState}
        onClick={togglePlayback}
        aria-label={`${primaryLabel} article`}
        disabled={playbackState === "error"}
      >
        <span aria-hidden="true" />
      </button>
      <div className="blog-listen-copy">
        <div className="blog-listen-heading">
          <p aria-live="polite">{playerTitle}</p>
          <p>{durationLabel} · System voice</p>
        </div>
        <input
          type="range"
          min="0"
          max={duration || 0}
          step="0.1"
          value={Math.min(currentTime, duration || 0)}
          onChange={(event) => seek(Number(event.currentTarget.value))}
          aria-label="Article narration progress"
          disabled={!metadataReady || playbackState === "error"}
        />
        <div className="blog-listen-tools">
          <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
          <div>
            <button
              type="button"
              onClick={() => skip(-15)}
              aria-label="Skip back 15 seconds"
              disabled={!metadataReady || playbackState === "error"}
            >
              −15
            </button>
            <button
              type="button"
              onClick={() => skip(15)}
              aria-label="Skip forward 15 seconds"
              disabled={!metadataReady || playbackState === "error"}
            >
              +15
            </button>
            <select
              aria-label="Playback speed"
              defaultValue="1"
              onChange={(event) => setPlaybackRate(Number(event.currentTarget.value))}
              disabled={!metadataReady || playbackState === "error"}
            >
              <option value="0.75">0.75×</option>
              <option value="1">1×</option>
              <option value="1.25">1.25×</option>
              <option value="1.5">1.5×</option>
              <option value="2">2×</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}
