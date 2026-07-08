import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import path from "path";

import {
  HAPPY_WALDO_IMAGE_PATH,
  SITE_DOMAIN,
  SITE_NAME,
} from "@/lib/site-metadata";

export const alt = "Happy Waldo beside the action layer for the human day";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const mascotData = await readFile(
    path.join(process.cwd(), "public", HAPPY_WALDO_IMAGE_PATH.replace(/^\//, ""))
  );
  const mascotSrc = `data:image/svg+xml;base64,${mascotData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #FAFAF8 0%, #F4F3F0 54%, #FFE1A6 100%)",
          padding: "0 92px 0 104px",
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
              background: "#FAFAF8",
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
                color: "#1A1A1A",
                letterSpacing: 0,
              }}
            >
              {SITE_NAME}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 72,
              fontWeight: 800,
              color: "#1A1A1A",
              lineHeight: 1.04,
              letterSpacing: 0,
            }}
          >
            <span style={{ display: "flex" }}>Action layer</span>
            <span style={{ display: "flex" }}>for the</span>
            <span style={{ display: "flex" }}>human day.</span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 23,
              color: "#6B6B68",
              lineHeight: 1.4,
              fontWeight: 400,
              maxWidth: 560,
            }}
          >
            <span style={{ display: "flex" }}>Body signals, calendar, tasks,</span>
            <span style={{ display: "flex" }}>communication, learning, and memory</span>
            <span style={{ display: "flex" }}>in one action layer.</span>
          </div>

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
              color: "#FAFAF8",
            }}
          >
            {SITE_DOMAIN}
          </div>
        </div>

        <img
          src={mascotSrc}
          width={392}
          height={292}
          style={{ objectFit: "contain" }}
          alt=""
        />
      </div>
    ),
    { ...size }
  );
}
