import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Rebel Minds OPS — Healthcare Technology Consultant";

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0B1220",
          backgroundImage:
            "radial-gradient(circle at 75% 25%, rgba(125, 227, 230, 0.18), rgba(11, 18, 32, 0) 55%)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 88,
            fontWeight: 800,
            color: "#FFFFFF",
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
          }}
        >
          Rebel Minds OPS
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 48,
            fontWeight: 700,
            color: "#7DE3E6",
          }}
        >
          Healthcare Technology Consultant
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 30,
            fontWeight: 500,
            color: "#94A3B8",
          }}
        >
          HIPAA-aware automation · Bilingual · Rio Grande Valley
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
