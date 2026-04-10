"use client";

import { useState } from "react";
import { isValidEmail } from "@/lib/validate-email";
import { submitEmail } from "@/actions/submit-email";

type PageState = "default" | "error" | "success";

export function EmailForm({
  state,
  onStateChange,
}: {
  state: PageState;
  onStateChange: (s: PageState) => void;
}) {
  const [pending, setPending] = useState(false);

  if (state === "success") return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd  = new FormData(e.currentTarget);
    const val = fd.get("email") as string;

    if (!val || !isValidEmail(val)) {
      onStateChange("error");
      return;
    }

    setPending(true);
    const result = await submitEmail(fd);
    setPending(false);

    if (result.success) {
      onStateChange("success");
    } else {
      onStateChange("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3">
      <input
        name="email"
        type="email"
        placeholder={
          state === "error"
            ? "enter your email \u2014 the one you actually check"
            : "enter your email \u2013 the one you actually check"
        }
        autoComplete="email"
        inputMode="email"
        maxLength={254}
        disabled={pending}
        className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-[14px] text-center text-[#1A1A1A] placeholder-[#9CA3AF] outline-none focus:border-[#1A1A1A]/30 disabled:opacity-50"
        style={{ fontFamily: "var(--font-body)" }}
      />
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-[#1A1A1A] py-3 text-[14px] font-medium text-white transition-opacity hover:opacity-80 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        style={{ fontFamily: "var(--font-body)", transition: "opacity 150ms, transform 100ms" }}
      >
        {pending ? "Sending\u2026" : state === "error" ? "Retry." : "About time."}
      </button>
    </form>
  );
}
