"use client";

import type { ReactNode } from "react";
import { useRef } from "react";

import { useElementInView } from "@/hooks/use-element-in-view";

type SmartSectionActivityProps = {
  children: ReactNode;
  className?: string;
};

export function SmartSectionActivity({ children, className }: SmartSectionActivityProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isActive = useElementInView(sectionRef, "640px 0px");

  return (
    <div ref={sectionRef} className={className} data-smart-active={isActive ? "true" : "false"}>
      {children}
    </div>
  );
}
