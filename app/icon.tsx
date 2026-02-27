import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0B1220",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "96px",
          border: "6px solid rgba(125,227,230,0.25)",
        }}
      >
        <svg
          width="340"
          height="340"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Brain outline */}
          <path
            d="M24 10C17.5 10 13 14.5 13 20C13 23 14.5 25.5 16.5 27.3L16 33H32L31.5 27.3C33.5 25.5 35 23 35 20C35 14.5 30.5 10 24 10Z"
            stroke="#7DE3E6"
            strokeWidth="1.8"
            fill="none"
            strokeLinejoin="round"
          />
          {/* Brain midline */}
          <line
            x1="24"
            y1="10"
            x2="24"
            y2="27"
            stroke="#7DE3E6"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          {/* Chart line */}
          <polyline
            points="17,29 20,25 23,27 26.5,21 30,24"
            stroke="#7DE3E6"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Base line */}
          <line
            x1="14"
            y1="33"
            x2="34"
            y2="33"
            stroke="#7DE3E6"
            strokeWidth="1.5"
            strokeOpacity="0.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
