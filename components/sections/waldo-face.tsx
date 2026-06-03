import { waldoFaceSvg } from "@/components/assets/waldo-face-svg";

/**
 * Animated Waldo face for the phone screen.
 *
 * Instead of hard-cutting between loosely-drawn keyframes (which flickered), this
 * inlines a single frame and animates its sub-parts: the eye group looks around +
 * blinks, the brows raise, and the whole head rocks gently. True tweening — smooth,
 * controllable, and crisp at any size. See globals.css `.waldo-face-*`.
 */
export function WaldoFace() {
  return (
    <div
      aria-hidden
      className="waldo-face absolute left-1/2 top-1/2 z-40 h-[56px] w-[84px] -translate-x-1/2 -translate-y-1/2"
      dangerouslySetInnerHTML={{ __html: waldoFaceSvg }}
    />
  );
}
