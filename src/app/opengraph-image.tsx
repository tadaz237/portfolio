import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/data/site";

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Dynamically generated Open Graph / Twitter card. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "radial-gradient(1000px circle at 20% 10%, #17223d 0%, #0a0a0f 55%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top: monogram + name */}
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 84,
              height: 84,
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              fontWeight: 700,
              background: "linear-gradient(135deg, #3d7bff, #a855f7)",
            }}
          >
            TM
          </div>
          <div style={{ fontSize: 30, color: "#a1a1b3" }}>Portfolio</div>
        </div>

        {/* Middle: headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 74, fontWeight: 800, lineHeight: 1.05 }}>
            Tadaze Votio Martinez
          </div>
          <div
            style={{
              fontSize: 40,
              fontWeight: 600,
              background: "linear-gradient(90deg, #3d7bff, #a855f7)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Software Engineer · Full Stack Developer
          </div>
        </div>

        {/* Bottom: tech line */}
        <div style={{ display: "flex", gap: 16, fontSize: 26, color: "#8a8a9e" }}>
          {["React", "Next.js", "TypeScript", "DevOps", "Three.js"].map((t) => (
            <span key={t} style={{ display: "flex" }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
