import { MdEdit, MdDelete, MdPhone, MdAccessTime } from "react-icons/md";
import type { Trainer, GymClass } from "../../types";

interface Props {
  trainer: Trainer;
  todayClasses: GymClass[];
  weekClasses: GymClass[];
  enrolledCount: number;
  onEdit: () => void;
  onDelete: () => void;
}

export default function TrainerCard({
  trainer,
  todayClasses,
  weekClasses,
  enrolledCount,
  onEdit,
  onDelete,
}: Props) {
  const color = trainer.avatarColor;

  return (
    <div
      style={{
        background: "#10131A",
        border: "1px solid #1A1E2E",
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      {/* Accent top bar */}
      <div style={{ height: 3, background: color }} />

      <div style={{ padding: 18 }}>
        {/* Top: avatar + info */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: 14,
              background: `${color}1A`,
              border: `1.5px solid ${color}40`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              fontWeight: 700,
              color,
              flexShrink: 0,
            }}
          >
            {trainer.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </div>
          <div>
            <p
              style={{
                color: "#fff",
                fontSize: 15,
                fontWeight: 600,
                margin: 0,
              }}
            >
              {trainer.name}
            </p>
            <p
              style={{
                color,
                fontSize: 10,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: ".6px",
                margin: "3px 0",
              }}
            >
              {trainer.specialty}
            </p>
            <p style={{ color: "#3A4560", fontSize: 11, margin: 0 }}>
              {trainer.email}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 8,
            marginBottom: 14,
          }}
        >
          {[
            { val: todayClasses.length, lbl: "Today" },
            { val: weekClasses.length, lbl: "This week" },
            { val: enrolledCount, lbl: "Enrolled", accent: true },
          ].map((s) => (
            <div
              key={s.lbl}
              style={{
                background: "#0D0F14",
                border: "1px solid #151A27",
                borderRadius: 8,
                padding: "9px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  color: s.accent ? "#E8FF47" : "#fff",
                  fontSize: 16,
                  fontWeight: 700,
                  margin: 0,
                }}
              >
                {s.val}
              </p>
              <p style={{ color: "#3A4560", fontSize: 10, marginTop: 2 }}>
                {s.lbl}
              </p>
            </div>
          ))}
        </div>

        {/* Today's Classes */}
        <div style={{ marginBottom: 14 }}>
          <p
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "#3A4560",
              textTransform: "uppercase",
              letterSpacing: ".8px",
              marginBottom: 7,
            }}
          >
            Today's classes
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {todayClasses.length === 0 ? (
              <span style={{ fontSize: 11, color: "#252B40" }}>
                No classes today
              </span>
            ) : (
              todayClasses.map((cls) => (
                <span
                  key={cls.id}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    padding: "4px 10px",
                    borderRadius: 6,
                    fontSize: 11,
                    fontWeight: 600,
                    background: `${color}14`,
                    color,
                  }}
                >
                  <MdAccessTime size={10} />
                  {cls.name} · {cls.startTime}
                </span>
              ))
            )}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "#151A27", marginBottom: 12 }} />

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              color: "#3A4560",
              fontSize: 11,
            }}
          >
            <MdPhone size={12} />
            {trainer.phone}
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button
              onClick={onEdit}
              style={{
                width: 30,
                height: 30,
                borderRadius: 7,
                background: "rgba(55,138,221,0.08)",
                border: "1px solid rgba(55,138,221,0.25)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MdEdit size={13} color="#378ADD" />
            </button>
            <button
              onClick={onDelete}
              style={{
                width: 30,
                height: 30,
                borderRadius: 7,
                background: "rgba(248,113,113,0.08)",
                border: "1px solid rgba(248,113,113,0.25)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MdDelete size={13} color="#F87171" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
