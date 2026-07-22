import { ImageResponse } from "next/og";

export const alt = "Ahmed Ashraf — Front-End Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 78px",
        background: "#f6f2e9",
        color: "#171813",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          fontSize: 26,
          fontWeight: 700,
        }}
      >
        <span
          style={{
            width: 22,
            height: 22,
            borderRadius: 99,
            background: "#b98b24",
          }}
        />
        Ahmed Ashraf
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            color: "#8a6515",
            textTransform: "uppercase",
            letterSpacing: 5,
            fontWeight: 700,
            fontSize: 18,
          }}
        >
          Front-End Developer
        </span>
        <div
          style={{
            fontSize: 75,
            lineHeight: 1.02,
            letterSpacing: -4,
            fontWeight: 750,
            width: 980,
            marginTop: 22,
          }}
        >
          Clear, useful digital experiences built with care.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: "#62645d",
          fontSize: 22,
        }}
      >
        <span>React · Next.js · TypeScript</span>
        <span>Al Madinah, Saudi Arabia</span>
      </div>
    </div>,
    size,
  );
}
