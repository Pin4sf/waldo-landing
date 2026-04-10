"use client";

import { isValidEmail } from "@/lib/validate-email";
import { submitEmail } from "@/actions/submit-email";

type PageState = "default" | "error" | "success";

const COPY: Record<
  "default" | "error",
  { placeholder: string; button: string }
> = {
  default: {
    placeholder: "the one you actually check.",
    button: "About time.",
  },
  error: {
    placeholder: "enter your email \u2014 the one you actually check.",
    button: "Retry.",
  },
};

export function EmailForm({
  state,
  onStateChange,
}: {
  state: PageState;
  onStateChange: (s: PageState) => void;
}) {
  if (state === "success") return null;

  const copy = COPY[state];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const email = fd.get("email") as string;

    if (!email || !isValidEmail(email)) {
      onStateChange("error");
      return;
    }

    const result = await submitEmail(fd);

    if (result.success) {
      onStateChange("success");
    } else if (result.error === "invalid_email") {
      onStateChange("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-3">
      <input
        name="email"
        type="email"
        placeholder={copy.placeholder}
        autoComplete="email"
        className="flex-1 rounded-[10px] border border-[rgba(26,26,26,0.1)] bg-white px-4 py-3 text-[15px] text-[#1A1A1A] placeholder-[#9CA3AF] outline-none focus:border-[#1A1A1A]"
        style={{ fontFamily: "var(--font-body)" }}
      />
      <button
        type="submit"
        className="cursor-pointer whitespace-nowrap rounded-[12px] bg-[#F97316] px-6 py-3 text-[15px] font-medium text-white transition-opacity hover:opacity-90"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {copy.button}
      </button>
    </form>
  );
}
