// Hero — "Your health didn't sign up for any of this."
// Stacked notification cards showing the chaos before Waldo.

const notifications = [
  {
    app: "Slack",
    message: "Suyash, need to talk about the sales review for Q1...",
    comment: "*Sunday, 11:43pm, really?*",
    width: undefined, // narrowest, no explicit width
    top: "calc(50% - 139.05px)",
    borderRadius: "16.307px",
    padding: "24.461px",
    gap: "9.784px",
    appSize: "10.302px",
    msgSize: "14.677px",
    cmtSize: "10.302px",
    border: "1.223px",
  },
  {
    app: "Slack",
    message: "Hey, can I get the data for Q1 sales??? prep for the meet tomorrow, wait no actually today...",
    comment: "*it\u2019s 3:58am. Interns just don\u2019t sleep.*",
    width: "405px",
    top: "calc(50% - 82.14px)",
    borderRadius: "16.987px",
    padding: "25.48px",
    gap: "10.192px",
    appSize: "10.731px",
    msgSize: "15.288px",
    cmtSize: "10.731px",
    border: "1.274px",
  },
  {
    app: "iMessage",
    message: "\u201cIt was a great night, hope you did not watch the next episodes without me\u201d ",
    comment: "*you binged the season on a Sunday night, bad call...*",
    width: "422px",
    top: "calc(50% - 29.7px)",
    borderRadius: "17.695px",
    padding: "26.542px",
    gap: "10.617px",
    appSize: "11.178px",
    msgSize: "15.925px",
    cmtSize: "11.178px",
    border: "1.327px",
  },
  {
    app: "Calendar",
    message: "Hey Suyash, We don\u2019t care if you received this mail in the best of you health.\n\nHope you are ready for the 96th product strategy review this week. See you at 9 on a Monday!",
    comment: "*here we go again...*",
    width: "439px",
    top: "calc(50% + 50.58px)",
    borderRadius: "18.432px",
    padding: "27.648px",
    gap: "11.059px",
    appSize: "11.644px",
    msgSize: "16.589px",
    cmtSize: "11.644px",
    border: "1.382px",
  },
  {
    app: "GMail",
    message: "+104 emails from the healthly lifestyle newsletter you forgot you had subscribed to.",
    comment: "*sharing work email - bad idea...*",
    width: "457px",
    top: "calc(50% + 79.79px)",
    borderRadius: "19.2px",
    padding: "28.8px",
    gap: "11.52px",
    appSize: "12.129px",
    msgSize: "17.28px",
    cmtSize: "12.129px",
    border: "1.44px",
  },
  {
    app: "GMail",
    message: "10:00 AM | Q1 Sales Review  ( Deck not finalized...",
    comment: "*did he complete the deck without the data?*",
    width: "477px",
    top: "calc(50% + 127.29px)",
    borderRadius: "20px",
    padding: "30px",
    gap: "12px",
    appSize: "12.635px",
    msgSize: "18px",
    cmtSize: "14px",
    border: "1.5px",
  },
] as const;

export function HeroSection() {
  return (
    <section
      className="flex flex-col gap-[80px] items-center px-[250px] py-[70px] w-full"
      style={{ borderRadius: "30px" }}
    >
      {/* Headline */}
      <h1
        className="text-[#1a1a1a] text-[48px] text-center"
        style={{
          fontFamily: "var(--font-headline)",
          lineHeight: 1.1,
        }}
      >
        Your health didn&apos;t{" "}
        <br />
        sign up for any of this.
      </h1>

      {/* Stacked notification cards */}
      <div className="relative shrink-0" style={{ height: "382.583px", width: "477px" }}>
        {notifications.map((n, i) => (
          <div
            key={i}
            className="absolute bg-[#fafaf8] border-solid border-[rgba(26,26,26,0.16)] flex flex-col items-start overflow-clip"
            style={{
              left: "50%",
              top: n.top,
              transform: "translate(-50%, -50%)",
              width: n.width ?? "auto",
              whiteSpace: n.width ? "normal" : "nowrap",
              borderRadius: n.borderRadius,
              padding: n.padding,
              gap: n.gap,
              borderWidth: n.border,
              zIndex: i + 1,
            }}
          >
            <p
              className="font-medium text-[#1a1a1a] shrink-0"
              style={{
                fontFamily: "var(--font-body)",
                fontVariationSettings: "'opsz' 14",
                fontSize: n.appSize,
                lineHeight: 1.3,
              }}
            >
              {n.app}
            </p>
            <p
              className="text-[#1a1a1a] shrink-0 min-w-full w-min"
              style={{
                fontFamily: "var(--font-headline)",
                fontSize: n.msgSize,
                lineHeight: 1.1,
                whiteSpace: "pre-wrap",
              }}
            >
              {n.message}
            </p>
            <p
              className="font-medium italic text-[#717171] shrink-0"
              style={{
                fontFamily: "var(--font-body)",
                fontVariationSettings: "'opsz' 14",
                fontStyle: "italic",
                fontSize: n.cmtSize,
                lineHeight: 1.3,
              }}
            >
              {n.comment}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
