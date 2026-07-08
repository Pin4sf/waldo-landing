"use client";

import { useEffect } from "react";

const PROTECTED_ASSET_SELECTOR = "img,picture,video,canvas,svg,[data-protected-asset]";
const BACKGROUND_SCAN_DEPTH = 4;

function isElement(target: EventTarget | null): target is Element {
  return target instanceof Element;
}

function hasBackgroundAsset(element: Element) {
  const backgroundImage = window.getComputedStyle(element).backgroundImage;
  return Boolean(backgroundImage && backgroundImage !== "none");
}

function findProtectedAsset(target: EventTarget | null) {
  if (!isElement(target)) return null;

  const mediaAsset = target.closest(PROTECTED_ASSET_SELECTOR);
  if (mediaAsset) return mediaAsset;

  let current: Element | null = target;
  for (let depth = 0; current && current !== document.body && depth < BACKGROUND_SCAN_DEPTH; depth += 1) {
    if (hasBackgroundAsset(current)) return current;
    current = current.parentElement;
  }

  return null;
}

function markImage(image: HTMLImageElement) {
  image.draggable = false;
  image.setAttribute("draggable", "false");
}

function markImages(root: ParentNode) {
  root.querySelectorAll("img").forEach((image) => {
    if (image instanceof HTMLImageElement) markImage(image);
  });
}

function selectionContainsProtectedAsset() {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return false;

  for (let index = 0; index < selection.rangeCount; index += 1) {
    const fragment = selection.getRangeAt(index).cloneContents();
    if (fragment.querySelector(PROTECTED_ASSET_SELECTOR)) return true;
  }

  return false;
}

export function AssetProtection() {
  useEffect(() => {
    markImages(document);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node instanceof HTMLImageElement) markImage(node);
          markImages(node);
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    const protectAssetEvent = (event: Event) => {
      if (findProtectedAsset(event.target)) event.preventDefault();
    };

    const protectAssetCopy = (event: ClipboardEvent) => {
      if (!selectionContainsProtectedAsset()) return;

      const selectedText = window.getSelection()?.toString();
      event.preventDefault();
      if (selectedText) event.clipboardData?.setData("text/plain", selectedText);
    };

    document.addEventListener("contextmenu", protectAssetEvent, { capture: true });
    document.addEventListener("dragstart", protectAssetEvent, { capture: true });
    document.addEventListener("copy", protectAssetCopy, { capture: true });

    return () => {
      observer.disconnect();
      document.removeEventListener("contextmenu", protectAssetEvent, { capture: true });
      document.removeEventListener("dragstart", protectAssetEvent, { capture: true });
      document.removeEventListener("copy", protectAssetCopy, { capture: true });
    };
  }, []);

  return null;
}
