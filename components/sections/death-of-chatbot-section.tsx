import Image from "next/image";

import deathOfChatBoxFrame from "@/public/waldo-web-assets/death-of-chatbot/death-of-chat-box.webp";

export function DeathOfChatbotSection() {
  return (
    <section id="death-of-chatbot" className="waldo-death-chat-section relative w-screen max-w-none overflow-hidden scroll-mt-28">
      <div className="waldo-death-chat-gradient" aria-hidden="true">
        <span className="waldo-death-chat-mesh waldo-death-chat-mesh-a" />
        <span className="waldo-death-chat-mesh waldo-death-chat-mesh-b" />
        <span className="waldo-death-chat-mesh waldo-death-chat-mesh-c" />
        <span className="waldo-death-chat-sheen" />
        <span className="waldo-death-chat-grain" />
      </div>

      <div className="waldo-death-chat-inner mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-10">
        <div className="waldo-death-chat-card relative isolate mx-auto overflow-hidden" data-animate="blur-fade">
          <Image
            src={deathOfChatBoxFrame}
            alt="Waldo holding a sunflower inside a quiet white chat card."
            fill
            sizes="(min-width: 1280px) 1120px, (min-width: 768px) 92vw, 100vw"
            className="waldo-death-chat-frame select-none"
            draggable={false}
          />

          <div className="waldo-death-chat-copy relative z-10">
            <p className="type-aside tone-tertiary">still typing? (or flowing? either way - slow)</p>
            <h2 className="type-h1 mt-5 text-[var(--ink)]" data-animate="headline">
              The death of the chat box.
            </h2>
            <p className="type-body tone-secondary mt-5 max-w-[52ch]">
              Waldo moves things before you open the app. The chat box never went anywhere. You can still ask it anything. You just run out of things to ask because they are already done!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
