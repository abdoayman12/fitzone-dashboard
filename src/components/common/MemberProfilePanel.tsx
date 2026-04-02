import {
  MdEdit,
  MdRefresh,
  MdPhone,
  MdPerson,
  MdCalendarMonth,
  MdAttachMoney,
} from "react-icons/md";
import type { Member } from "../../types";
import {
  formatDate,
  formatCurrency,
  memberStatusConfig,
} from "../../utils/helpers";
import Badge from "./Badge";

interface Props {
  member: Member;
  onClose: () => void;
  onEdit: () => void;
}

export default function MemberProfilePanel({ member, onClose, onEdit }: Props) {
  const status = memberStatusConfig[member.status];

  // احسب نسبة الـ progress بتاع الاشتراك
  const start = new Date(member.startDate).getTime();
  const expiry = new Date(member.expiryDate).getTime();
  const now = Date.now();
  const progress = Math.min(
    100,
    Math.round(((now - start) / (expiry - start)) * 100),
  );

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          zIndex: 40,
        }}
      />

      {/* Panel — بيطلع من اليمين */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: 380,
          background: "#10131A",
          borderLeft: "1px solid #1E2230",
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          animation: "slideIn 0.25s ease",
        }}
      >
        <style>{`@keyframes slideIn{from{transform:translateX(40px);opacity:0}to{transform:translateX(0);opacity:1}}`}</style>

        {/* Header */}
        <div
          style={{
            padding: "18px 20px",
            borderBottom: "1px solid #1A1E2E",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              color: "#8A9AB5",
              fontSize: 12,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Member Profile
          </span>
          <button
            onClick={onClose}
            style={{
              width: 28,
              height: 28,
              background: "#0D0F14",
              border: "1px solid #1E2230",
              borderRadius: 7,
              cursor: "pointer",
              color: "#5A6280",
              fontSize: 13,
            }}
          >
            ✕
          </button>
        </div>

        {/* Body — scrollable */}
        <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
          {/* Avatar + name */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              paddingBottom: 20,
              borderBottom: "1px solid #1A1E2E",
              marginBottom: 18,
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 18,
                background: `${member.avatarColor}1A`,
                border: `2px solid ${member.avatarColor}40`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                fontWeight: 700,
                color: member.avatarColor,
                marginBottom: 12,
              }}
            >
              {member.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </div>
            <p
              style={{
                color: "#fff",
                fontSize: 17,
                fontWeight: 700,
                marginBottom: 4,
              }}
            >
              {member.name}
            </p>
            <p style={{ color: "#3A4560", fontSize: 12, marginBottom: 12 }}>
              {member.email}
            </p>
            <Badge label={status.label} color={status.color} bg={status.bg} />
          </div>

          {/* Personal info */}
          <SectionTitle>Personal Information</SectionTitle>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 5,
              marginBottom: 18,
            }}
          >
            <InfoRow
              icon={<MdPhone size={13} color="#5A6280" />}
              label="Phone"
              value={member.phone}
            />
            <InfoRow
              icon={<MdPerson size={13} color="#5A6280" />}
              label="Gender"
              value="Male"
            />
            <InfoRow
              icon={<MdCalendarMonth size={13} color="#5A6280" />}
              label="Member Since"
              value={formatDate(member.startDate)}
            />
            <InfoRow
              icon={<MdAttachMoney size={13} color="#5A6280" />}
              label="Total Paid"
              value={formatCurrency(member.totalPaid)}
              valueColor="#E8FF47"
            />
          </div>

          {/* Subscription card */}
          <SectionTitle>Current Subscription</SectionTitle>
          <div
            style={{
              background: "#0D0F14",
              border: "1px solid #1A1E2E",
              borderRadius: 10,
              padding: 14,
              marginBottom: 18,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <div>
                <p style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>
                  {member.planName} Plan
                </p>
                <p style={{ color: "#3A4560", fontSize: 11, marginTop: 2 }}>
                  Expires {formatDate(member.expiryDate)}
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p
                  style={{
                    color: "#E8FF47",
                    fontSize: 20,
                    fontWeight: 800,
                    letterSpacing: -0.5,
                  }}
                >
                  {member.totalPaid.toLocaleString()}
                </p>
                <p style={{ color: "#3A4560", fontSize: 11 }}>EGP</p>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 11,
                color: "#5A6280",
                marginBottom: 6,
              }}
            >
              <span>Progress</span>
              <span>{progress <= 0 ? 0 : progress}% used</span>
            </div>
            <div
              style={{
                height: 5,
                background: "#1A1E2E",
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progress <= 0 ? 0 : progress}%`,
                  background: "#E8FF47",
                  borderRadius: 4,
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <div style={{ fontSize: 10, color: "#3A4560" }}>
                Start
                <div
                  style={{
                    color: "#8A9AB5",
                    fontSize: 11,
                    fontWeight: 500,
                    marginTop: 2,
                  }}
                >
                  {formatDate(member.startDate)}
                </div>
              </div>
              <div
                style={{ fontSize: 10, color: "#3A4560", textAlign: "right" }}
              >
                Expires
                <div
                  style={{
                    color: "#E8FF47",
                    fontSize: 11,
                    fontWeight: 500,
                    marginTop: 2,
                  }}
                >
                  {formatDate(member.expiryDate)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "14px 20px",
            borderTop: "1px solid #1A1E2E",
            display: "flex",
            gap: 8,
          }}
        >
          <button
            onClick={onEdit}
            style={{
              flex: 1,
              background: "#161B28",
              border: "1px solid #1E2230",
              borderRadius: 8,
              padding: 9,
              color: "#8A9AB5",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            <MdEdit size={15} /> Edit Member
          </button>
          <button
            style={{
              flex: 1,
              background: "#E8FF47",
              border: "none",
              borderRadius: 8,
              padding: 9,
              color: "#0D0F14",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            <MdRefresh size={15} /> Renew Plan
          </button>
        </div>
      </div>
    </>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: 10,
        fontWeight: 700,
        color: "#3A4560",
        textTransform: "uppercase",
        letterSpacing: 1,
        marginBottom: 10,
      }}
    >
      {children}
    </p>
  );
}

function InfoRow({
  icon,
  label,
  value,
  valueColor = "#C8D0E0",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "9px 12px",
        borderRadius: 8,
        background: "#0D0F14",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          color: "#5A6280",
          fontSize: 12,
        }}
      >
        {icon}
        {label}
      </div>
      <span style={{ color: valueColor, fontSize: 12, fontWeight: 500 }}>
        {value}
      </span>
    </div>
  );
}
