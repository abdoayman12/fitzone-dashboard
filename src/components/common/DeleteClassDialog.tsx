import { MdDeleteOutline, MdWarningAmber } from "react-icons/md";
import type { GymClass } from "../../types";

interface Props {
  gymClass: GymClass;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteClassDialog({
  gymClass,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <div
      onClick={onCancel}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
      }}
      className="backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#10131A",
          border: "1px solid #1E2230",
          borderRadius: 14,
          width: "100%",
          maxWidth: 380,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "28px 24px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 14,
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "rgba(248,113,113,0.1)",
              border: "1px solid rgba(248,113,113,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MdDeleteOutline size={26} color="#F87171" />
          </div>

          {/* Title */}
          <div>
            <p
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: 600,
                margin: "0 0 8px",
              }}
            >
              Delete Class?
            </p>
            <p
              style={{
                color: "#5A6280",
                fontSize: 13,
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              You are about to permanently delete this class. This action cannot
              be undone.
            </p>
          </div>

          {/* Class chip */}
          <div
            style={{
              background: "#0D0F14",
              border: `1px solid #1A1E2E`,
              borderRadius: 10,
              padding: "12px 14px",
              width: "100%",
              textAlign: "left",
              borderTop: `3px solid ${gymClass.color}`,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 6,
              }}
            >
              <div>
                <p
                  style={{
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: 700,
                    margin: 0,
                  }}
                >
                  {gymClass.name}
                </p>
                <p
                  style={{
                    color: gymClass.color,
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: ".5px",
                    margin: "3px 0 0",
                  }}
                >
                  {gymClass.category}
                </p>
              </div>
              <p style={{ color: "#8A9AB5", fontSize: 12, margin: 0 }}>
                {gymClass.startTime} — {gymClass.endTime}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginTop: 4,
              }}
            >
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 5,
                  background: `${gymClass.color}20`,
                  color: gymClass.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 8,
                  fontWeight: 700,
                }}
              >
                {gymClass.trainerName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </div>
              <p style={{ color: "#5A6280", fontSize: 11, margin: 0 }}>
                {gymClass.trainerName}
              </p>
              <p
                style={{ color: "#3A4560", fontSize: 11, margin: "0 0 0 auto" }}
              >
                {gymClass.capacity} spots
              </p>
            </div>
          </div>

          {/* Warning */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 8,
              background: "rgba(248,113,113,0.06)",
              border: "1px solid rgba(248,113,113,0.15)",
              borderRadius: 8,
              padding: "10px 12px",
              width: "100%",
              textAlign: "left",
            }}
          >
            <MdWarningAmber
              size={15}
              color="#F87171"
              style={{ flexShrink: 0, marginTop: 1 }}
            />
            <p
              style={{
                color: "#F87171",
                fontSize: 12,
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              All enrolled members in this class will be removed.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", gap: 10, padding: "0 24px 24px" }}>
          <button
            onClick={onCancel}
            style={{
              flex: 1,
              background: "transparent",
              border: "1px solid #1E2230",
              borderRadius: 8,
              padding: 10,
              color: "#8A9AB5",
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              flex: 1,
              background: "#F87171",
              border: "none",
              borderRadius: 8,
              padding: 10,
              color: "#fff",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            <MdDeleteOutline size={16} /> Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}
