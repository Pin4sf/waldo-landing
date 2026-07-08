"use client";

import { useCallback } from "react";

type PreloadOptions = {
  immediate?: boolean;
};

type IdleWindow = Window & {
  requestIdleCallback?: (callback: () => void, options?: { timeout?: number }) => number;
};

const decodedSources = new Set<string>();
const pendingSources = new Map<string, Promise<void>>();

function preloadImageSource(source: string) {
  if (!source || decodedSources.has(source)) return Promise.resolve();

  const pending = pendingSources.get(source);
  if (pending) return pending;

  const preload = new Promise<void>((resolve) => {
    if (typeof window === "undefined") {
      resolve();
      return;
    }

    const image = new window.Image();
    image.decoding = "async";

    image.onload = () => {
      const decode = typeof image.decode === "function" ? image.decode().catch(() => undefined) : Promise.resolve();
      void decode.finally(() => {
        decodedSources.add(source);
        pendingSources.delete(source);
        resolve();
      });
    };

    image.onerror = () => {
      pendingSources.delete(source);
      resolve();
    };

    image.src = source;
  });

  pendingSources.set(source, preload);
  return preload;
}

function schedulePreload(task: () => void, immediate: boolean) {
  if (typeof window === "undefined") return;

  if (immediate) {
    task();
    return;
  }

  const idleWindow = window as IdleWindow;
  if (idleWindow.requestIdleCallback) {
    idleWindow.requestIdleCallback(task, { timeout: 1400 });
    return;
  }

  window.setTimeout(task, 120);
}

function uniqueSources(sources: Array<string | null | undefined>) {
  return Array.from(new Set(sources.filter((source): source is string => Boolean(source))));
}

export function useImagePreloader() {
  const preload = useCallback((source: string | null | undefined, options: PreloadOptions = {}) => {
    if (!source) return;
    schedulePreload(() => {
      void preloadImageSource(source);
    }, Boolean(options.immediate));
  }, []);

  const preloadMany = useCallback((sources: Array<string | null | undefined>, options: PreloadOptions = {}) => {
    const queue = uniqueSources(sources);
    if (queue.length === 0) return;

    schedulePreload(() => {
      const concurrency = options.immediate ? Math.min(4, queue.length) : Math.min(2, queue.length);
      let cursor = 0;

      const next = () => {
        const source = queue[cursor];
        cursor += 1;
        if (!source) return;

        void preloadImageSource(source).finally(next);
      };

      for (let index = 0; index < concurrency; index += 1) {
        next();
      }
    }, Boolean(options.immediate));
  }, []);

  return { preload, preloadMany };
}
