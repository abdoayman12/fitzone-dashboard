import { useLocation } from "react-router-dom";

const pageTitles: Record<string, string> = {
  "/": "Overview",
  "/members": "Members",
  "/classes": "Classes & Schedule",
  "/trainers": "Trainers",
  "/subscriptions": "Subscriptions",
  "/settings": "Settings",
};

export default function Topbar() {
  const { pathname } = useLocation();
  const title = pageTitles[pathname] ?? "FitZone";

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        height: 64,
        borderBottom: "1px solid var(--color-border)",
        background: "#10131A",
        flexShrink: 0,
      }}
    >
      {/* Left: page title */}
      <div>
        <p style={{ color: "#fff", fontWeight: 600, fontSize: 16, margin: 0 }}>
          {title}
        </p>
        <p
          style={{ color: "var(--color-text-muted)", fontSize: 12, margin: 0 }}
        >
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </header>
  );
}
