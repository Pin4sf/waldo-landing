"use client";

import { useState } from "react";

import { requestConnector } from "@/actions/request-connector";

export function ConnectorRequestForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");
  const [tool, setTool] = useState("");
  const [bounce, setBounce] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setTool(String(data.get("tool") ?? "").trim());
    setState("sending");
    const result = await requestConnector(data);
    if (result.success) {
      setState("sent");
      return;
    }
    setState("error");
    setBounce(true);
    setMessage(
      result.error === "missing_tool"
        ? "Which tool? Add its name and try again."
        : result.error === "invalid_email"
          ? "That email looks off. Check for a typo and try again."
          : "That one's on us. Give it a minute and try again.",
    );
  }

  if (state === "sent") {
    return <p className="site-text site-state">Got it. We&apos;ll tell you when Waldo speaks {tool || "your tool"}.</p>;
  }

  return (
    <form
      className="site-form site-form--stack"
      onSubmit={handleSubmit}
      data-bounce={bounce ? "" : undefined}
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget) setBounce(false);
      }}
    >
      <input className="site-input" name="tool" placeholder="Which tool?" aria-label="Which tool?" maxLength={80} required />
      <input
        className="site-input"
        name="note"
        placeholder="What should Waldo do with it? (optional)"
        aria-label="What should Waldo do with it? (optional)"
        maxLength={280}
      />
      <input className="site-input" name="email" type="email" placeholder="Your email" aria-label="Your email" autoComplete="email" required />
      <div className="site-actions">
        <button type="submit" className="site-button site-button--primary" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : "Send request"}
        </button>
      </div>
      {state === "error" ? (
        <p key={message} className="site-form-error" role="alert">
          {message}
        </p>
      ) : null}
    </form>
  );
}
