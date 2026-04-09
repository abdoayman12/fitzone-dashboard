// components/common/DeletePlanDialog.tsx
import { MdDeleteOutline, MdWarningAmber } from "react-icons/md";
import { formatDuration } from "../../utils/helpers";
import type { Plan } from "../../types";

interface Props {
  plan: Plan;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeletePlanDialog({ plan, onCancel, onConfirm }: Props) {
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
              Delete Plan?
            </p>
            <p
              style={{
                color: "#5A6280",
                fontSize: 13,
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              You are about to permanently delete this plan. This action cannot
              be undone.
            </p>
          </div>

          {/* Plan chip */}
          <div
            style={{
              background: "#0D0F14",
              border: "1px solid #1A1E2E",
              borderRadius: 10,
              padding: "12px 16px",
              width: "100%",
              textAlign: "left",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
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
                  {plan.name}
                </p>
                <p
                  style={{ color: "#3A4560", fontSize: 11, margin: "3px 0 0" }}
                >
                  {formatDuration(plan.duration)} · {plan.duration * 30} days
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p
                  style={{
                    color: "#E8FF47",
                    fontSize: 18,
                    fontWeight: 800,
                    margin: 0,
                  }}
                >
                  {plan.price.toLocaleString()}
                </p>
                <p
                  style={{ color: "#3A4560", fontSize: 11, margin: "2px 0 0" }}
                >
                  EGP
                </p>
              </div>
            </div>
            <div
              style={{ height: 1, background: "#1A1E2E", margin: "8px 0" }}
            />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {plan.features.map((f, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: 10,
                    padding: "2px 8px",
                    borderRadius: 20,
                    background: "rgba(232,255,71,0.06)",
                    color: "#5A6280",
                    border: "1px solid #1A1E2E",
                  }}
                >
                  {f}
                </span>
              ))}
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
              Members subscribed to this plan will not be affected, but no new
              subscriptions can be made.
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
