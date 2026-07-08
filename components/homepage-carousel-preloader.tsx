"use client";

import { useEffect } from "react";

import { useImagePreloader } from "@/hooks/use-image-preloader";
import appsAccountsAgents from "@/public/waldo-web-assets/agent-features/apps-accounts-agents.webp";
import contextThread from "@/public/waldo-web-assets/agent-features/context-thread.webp";
import draftsReadyToGo from "@/public/waldo-web-assets/agent-features/drafts-ready-to-go.webp";
import overnightPatrol from "@/public/waldo-web-assets/agent-features/overnight-patrol.webp";
import dots01Patrol from "@/public/figma-assets/health-carousel/dots-01-patrol.webp";
import dots02Spot from "@/public/figma-assets/health-carousel/dots-02-spot.webp";
import dots03Constellation from "@/public/figma-assets/health-carousel/dots-03-constellation.webp";
import dots04Readiness from "@/public/figma-assets/health-carousel/dots-04-readiness.webp";
import dots05WednesdayProtected from "@/public/figma-assets/health-carousel/dots-05-wednesday-protected.webp";
import edge01StressElevated from "@/public/figma-assets/health-carousel/edge-01-stress-elevated.webp";
import edge02ContextGraph from "@/public/figma-assets/health-carousel/edge-02-context-graph.webp";
import edge03RunPlan from "@/public/figma-assets/health-carousel/edge-03-run-plan.webp";
import edge04FormSpike from "@/public/figma-assets/health-carousel/edge-04-form-spike.webp";
import edge05CalendarAction from "@/public/figma-assets/health-carousel/edge-05-calendar-action.webp";
import gut01SleepSignal from "@/public/figma-assets/health-carousel/gut-01-sleep-signal.webp";
import gut02HeartRate from "@/public/figma-assets/health-carousel/gut-02-heart-rate.webp";
import gut03StressAction from "@/public/figma-assets/health-carousel/gut-03-stress-action.webp";
import gut04RecoveryCheck from "@/public/figma-assets/health-carousel/gut-04-recovery-check.webp";
import gut05MotionContext from "@/public/figma-assets/health-carousel/gut-05-motion-context.webp";
import habits01DeepDive from "@/public/figma-assets/health-carousel/habits-01-deep-dive.webp";
import habits02DreamingMode from "@/public/figma-assets/health-carousel/habits-02-dreaming-mode.webp";
import habits03Corrections from "@/public/figma-assets/health-carousel/habits-03-corrections.webp";
import habits04Slope from "@/public/figma-assets/health-carousel/habits-04-slope.webp";
import habits05RunIt from "@/public/figma-assets/health-carousel/habits-05-run-it.webp";
import mornings01Action from "@/public/figma-assets/health-carousel/mornings-01-action.webp";
import mornings02HrvWatch from "@/public/figma-assets/health-carousel/mornings-02-hrv-watch.webp";
import mornings03RestingState from "@/public/figma-assets/health-carousel/mornings-03-resting-state.webp";
import mornings04Sleep from "@/public/figma-assets/health-carousel/mornings-04-sleep.webp";
import mornings05SleepDebt from "@/public/figma-assets/health-carousel/mornings-05-sleep-debt.webp";

const healthCarouselSources = [
  mornings01Action.src,
  mornings02HrvWatch.src,
  mornings03RestingState.src,
  mornings04Sleep.src,
  mornings05SleepDebt.src,
  edge01StressElevated.src,
  edge02ContextGraph.src,
  edge03RunPlan.src,
  edge04FormSpike.src,
  edge05CalendarAction.src,
  gut01SleepSignal.src,
  gut02HeartRate.src,
  gut03StressAction.src,
  gut04RecoveryCheck.src,
  gut05MotionContext.src,
  dots01Patrol.src,
  dots02Spot.src,
  dots03Constellation.src,
  dots04Readiness.src,
  dots05WednesdayProtected.src,
  habits01DeepDive.src,
  habits02DreamingMode.src,
  habits03Corrections.src,
  habits04Slope.src,
  habits05RunIt.src,
];

const carouselPrioritySources = [
  mornings01Action.src,
  mornings02HrvWatch.src,
  mornings03RestingState.src,
  mornings04Sleep.src,
  mornings05SleepDebt.src,
  edge01StressElevated.src,
  gut01SleepSignal.src,
  dots01Patrol.src,
  habits01DeepDive.src,
  appsAccountsAgents.src,
  contextThread.src,
  draftsReadyToGo.src,
  overnightPatrol.src,
];

const prioritySourceSet = new Set(carouselPrioritySources);
const deferredCarouselSources = [
  ...healthCarouselSources,
  appsAccountsAgents.src,
  contextThread.src,
  draftsReadyToGo.src,
  overnightPatrol.src,
].filter((source) => !prioritySourceSet.has(source));

export function HomepageCarouselPreloader() {
  const { preloadMany } = useImagePreloader();

  useEffect(() => {
    preloadMany(carouselPrioritySources, { immediate: true });
    preloadMany(deferredCarouselSources);
  }, [preloadMany]);

  return null;
}
