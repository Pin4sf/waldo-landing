import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import path from "path";

export const alt = "Waldo — AI Health Agent";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const mascotData = await readFile(
    path.join(process.cwd(), "public/waldo-mascot.png")
  );
  const mascotSrc = `data:image/png;base64,${mascotData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#f4f3f0",
          padding: "0 110px",
        }}
      >
        {/* Left — wordmark + headline + sub */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 20,
          }}
        >
          {/* Brand pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "#fafaf8",
              border: "1.5px solid rgba(26,26,26,0.12)",
              borderRadius: 40,
              padding: "8px 20px",
            }}
          >
            <span
              style={{
                display: "flex",
                fontSize: 22,
                fontWeight: 700,
                color: "#1a1a1a",
                letterSpacing: -0.5,
              }}
            >
              Waldo
            </span>
          </div>

          {/* Headline */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 82,
              fontWeight: 800,
              color: "#1a1a1a",
              lineHeight: 1.0,
              letterSpacing: -2,
            }}
          >
            <span style={{ display: "flex" }}>Already</span>
            <span style={{ display: "flex" }}>on it.</span>
          </div>

          {/* Sub */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 24,
              color: "#6b6b68",
              lineHeight: 1.4,
              fontWeight: 400,
            }}
          >
            <span style={{ display: "flex" }}>
              AI health agent for WHOOP &amp; Apple Watch.
            </span>
            <span style={{ display: "flex" }}>
              Reads your body. Acts before you burn out.
            </span>
          </div>

          {/* Accent tag */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 8,
              background: "#FB943F",
              borderRadius: 30,
              padding: "10px 24px",
              fontSize: 18,
              fontWeight: 600,
              color: "#fff",
            }}
          >
            heywaldo.in
          </div>
        </div>

        {/* Right — mascot */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={mascotSrc}
          width={340}
          height={346}
          style={{ objectFit: "contain" }}
          alt=""
        />
      </div>
    ),
    { ...size }
  );
}
