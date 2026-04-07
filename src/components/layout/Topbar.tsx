import { MdNotifications, MdSearch } from "react-icons/md";
import { useLocation } from "react-router-dom";

const pageTitles: Record<string, string> = {
  "/dashboard": "Overview",
  "/members": "Members",
  "/classes": "Classes & Schedule",
  "/trainers": "Trainers",
  "/payments": "Payments & Revenue",
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

      {/* Right: search + notif + avatar */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Search */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "var(--color-bg-base)",
            border: "1px solid var(--color-border)",
            borderRadius: 8,
            padding: "6px 12px",
          }}
        >
          <MdSearch size={16} color="var(--color-text-muted)" />
          <input
            placeholder="Search..."
            style={{
              background: "none",
              border: "none",
              outline: "none",
              color: "var(--color-text-secondary)",
              fontSize: 13,
              width: 140,
            }}
          />
        </div>

        {/* Notification bell */}
        <div style={{ position: "relative" }}>
          <button
            style={{
              width: 36,
              height: 36,
              background: "var(--color-bg-base)",
              border: "1px solid var(--color-border)",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <MdNotifications size={18} color="var(--color-text-secondary)" />
          </button>
          <span
            style={{
              position: "absolute",
              top: 6,
              right: 6,
              width: 7,
              height: 7,
              background: "var(--color-accent)",
              borderRadius: "50%",
              border: "1.5px solid #10131A",
            }}
          />
        </div>

        {/* Avatar */}
        <div
          style={{
            width: 36,
            height: 36,
            background: "var(--color-accent)",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 12,
            color: "#0D0F14",
            cursor: "pointer",
          }}
        >
          AH
        </div>
      </div>
    </header>
  );
}
