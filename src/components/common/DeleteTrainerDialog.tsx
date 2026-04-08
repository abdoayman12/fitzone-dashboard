import { MdDeleteOutline, MdWarningAmber } from "react-icons/md";
import type { Trainer } from "../../types";
import { useTrainer } from "../../Hooks/useTrainer";
import toast from "react-hot-toast";

interface Props {
  trainer: Trainer;
  onCancel: () => void;
}

export default function DeleteTrainerDialog({ trainer, onCancel }: Props) {
  const initials = trainer.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const { dispatchTrainer } = useTrainer();

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
        {/* Body */}
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

          {/* Title + desc */}
          <div>
            <p
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: 600,
                margin: "0 0 8px",
              }}
            >
              Delete Trainer?
            </p>
            <p
              style={{
                color: "#5A6280",
                fontSize: 13,
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              You are about to permanently delete this trainer. This action
              cannot be undone.
            </p>
          </div>

          {/* Trainer chip */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "#0D0F14",
              border: "1px solid #1A1E2E",
              borderRadius: 10,
              padding: "10px 14px",
              width: "100%",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 9,
                background: `${trainer.avatarColor}1A`,
                border: `1px solid ${trainer.avatarColor}40`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 700,
                color: trainer.avatarColor,
                flexShrink: 0,
              }}
            >
              {initials}
            </div>
            <div>
              <p
                style={{
                  color: "#C8D0E0",
                  fontSize: 13,
                  fontWeight: 600,
                  margin: 0,
                }}
              >
                {trainer.name}
              </p>
              <p style={{ color: "#3A4560", fontSize: 11, margin: "2px 0 0" }}>
                {trainer.specialty}
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
              All assigned classes for this trainer will be unassigned.
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
            onClick={() => {
              dispatchTrainer({ type: "DELETE_TRAINER", payloud: trainer.id });
              toast.success(`${trainer.name} deleted`);
              onCancel();
            }}
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
