import { ImageResponse } from "next/og";

export const alt = "Jangan Injak Itu! — Game Platformer Jebakan Absurd";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#090A1A",
          color: "white",
          fontFamily: "Arial, sans-serif",
          padding: "70px",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", width: 520, height: 520, left: -100, top: -210, borderRadius: 999, background: "rgba(155,92,255,.26)" }} />
        <div style={{ position: "absolute", width: 440, height: 440, right: -130, bottom: -160, borderRadius: 999, background: "rgba(0,229,255,.18)" }} />
        <div style={{ width: "60%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontSize: 22, letterSpacing: 5, fontWeight: 700, color: "#00E5FF", marginBottom: 20 }}>ARCADE TRAP PLATFORMER</div>
          <div style={{ display: "flex", fontWeight: 900, fontSize: 82, lineHeight: .96, letterSpacing: -3, color: "#FFE44D", marginBottom: 24 }}>
            JANGAN<br />INJAK ITU!
          </div>
          <div style={{ fontSize: 25, lineHeight: 1.4, color: "#D9DBF2", width: 560 }}>
            Kelihatannya gampang, tetapi lantainya suka bohong.
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
            {["TANPA LOGIN", "MAIN DI HP", "HIGH SCORE LOKAL"].map((text) => (
              <div key={text} style={{ border: "1px solid rgba(255,255,255,.22)", borderRadius: 99, padding: "10px 17px", fontSize: 13, fontWeight: 700 }}>
                {text}
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: "absolute", right: 75, bottom: 115, width: 355, height: 300, background: "#10142d", border: "3px solid rgba(0,229,255,.35)", borderRadius: 28, display: "flex" }}>
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 48, height: 44, background: "#202850", borderTop: "6px solid #00E5FF" }} />
          <div style={{ position: "absolute", left: 75, bottom: 92, width: 45, height: 58, borderRadius: 7, background: "#FFE44D", display: "flex" }} />
          <div style={{ position: "absolute", right: 58, bottom: 92, width: 48, height: 72, background: "#090A1A", border: "7px solid #39FF88" }} />
          <div style={{ position: "absolute", left: 172, top: 54, width: 42, height: 42, borderRadius: 99, border: "4px dashed #39FF88", background: "#FF9F1C" }} />
        </div>
      </div>
    ),
    size,
  );
}
