import { MdDeleteOutline, MdWarningAmber } from "react-icons/md";
import type { Member } from "../../types";
import { useAddMember } from "../../Hooks/useAddMember";
import toast from "react-hot-toast";

interface Props {
  member: Member;
  onCancel: () => void;
}

export default function DeleteConfirmDialog({ member, onCancel }: Props) {
  const { dispatchMember } = useAddMember();
  return (
    // Overlay
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
      {/* Dialog — stopPropagation عشان الكليك على الداخل ميقفلش */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#10131A",
          border: "1px solid #1E2230",
          borderRadius: 14,
          width: "100%",
          maxWidth: 400,
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
            gap: 16,
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
                marginBottom: 8,
              }}
            >
              Delete Member?
            </p>
            <p style={{ color: "#5A6280", fontSize: 13, lineHeight: 1.6 }}>
              You are about to permanently delete this member and all their
              associated data. This action cannot be undone.
            </p>
          </div>

          {/* Member chip */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "#0D0F14",
              border: "1px solid #1A1E2E",
              borderRadius: 10,
              padding: "10px 16px",
              width: "100%",
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                background: "rgba(232,255,71,0.12)",
                border: "1px solid rgba(232,255,71,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 700,
                color: "#E8FF47",
                flexShrink: 0,
              }}
            >
              {member.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </div>
            <div style={{ textAlign: "left" }}>
              <p style={{ color: "#C8D0E0", fontSize: 13, fontWeight: 600 }}>
                {member.name}
              </p>
              <p style={{ color: "#3A4560", fontSize: 11, marginTop: 2 }}>
                {member.planName} · {member.status}
              </p>
            </div>
          </div>

          {/* Warning note */}
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
              size={16}
              color="#F87171"
              style={{ flexShrink: 0, marginTop: 1 }}
            />
            <p style={{ color: "#F87171", fontSize: 12, lineHeight: 1.5 }}>
              Payment history and subscription records will also be permanently
              removed.
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
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              dispatchMember({ type: "DELETE_MEMBER", payloud: member.id });
              onCancel()
              toast.success('Member deleted successfully')
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
            <MdDeleteOutline size={16} />
            Yes, Delete Member
          </button>
        </div>
      </div>
    </div>
  );
}
