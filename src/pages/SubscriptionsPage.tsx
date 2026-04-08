import { MdCheck, MdAdd } from "react-icons/md";
import PageHeader from "../components/common/PageHeader";
import Badge from "../components/common/Badge";
import Avatar from "../components/common/Avatar";
import { MOCK_PLANS } from "../constants/mockData";
import { formatDate, memberStatusConfig } from "../utils/helpers";
import { useAddMember } from "../Hooks/useAddMember";

export default function SubscriptionsPage() {
  const { stateMember } = useAddMember();
  return (
    <div>
      <PageHeader
        title="Subscriptions & Plans"
        subtitle="Manage pricing plans and member subscriptions"
        action={
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "var(--color-accent)",
              color: "#0D0F14",
              border: "none",
              borderRadius: 8,
              padding: "9px 16px",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            <MdAdd size={18} /> Add Plan
          </button>
        }
      />

      {/* Plan Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 14,
          marginBottom: 28,
        }}
      >
        {MOCK_PLANS.map((plan, i) => {
          const isPopular = i === 1;
          return (
            <div
              key={plan.id}
              style={{
                background: "#10131A",
                border: `1px solid ${isPopular ? "var(--color-accent)" : "var(--color-border)"}`,
                borderRadius: 14,
                padding: 22,
                position: "relative",
              }}
            >
              {isPopular && (
                <span
                  style={{
                    position: "absolute",
                    top: -10,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "var(--color-accent)",
                    color: "#0D0F14",
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "3px 12px",
                    borderRadius: 20,
                  }}
                >
                  POPULAR
                </span>
              )}
              <p
                style={{
                  color: "var(--color-text-muted)",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  margin: "0 0 6px",
                }}
              >
                {plan.duration}
              </p>
              <p
                style={{
                  color: "#fff",
                  fontSize: 17,
                  fontWeight: 700,
                  margin: "0 0 4px",
                }}
              >
                {plan.name}
              </p>
              <div style={{ margin: "14px 0 18px" }}>
                <span
                  style={{
                    color: isPopular ? "var(--color-accent)" : "#fff",
                    fontSize: 30,
                    fontWeight: 800,
                  }}
                >
                  {plan.price.toLocaleString()}
                </span>
                <span
                  style={{ color: "var(--color-text-muted)", fontSize: 13 }}
                >
                  {" "}
                  EGP
                </span>
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 18px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {plan.features.map((f) => (
                  <li
                    key={f}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      fontSize: 12,
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    <MdCheck size={14} color="var(--color-accent)" /> {f}
                  </li>
                ))}
              </ul>
              <button
                style={{
                  width: "100%",
                  padding: "9px",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 500,
                  background: isPopular ? "var(--color-accent)" : "transparent",
                  color: isPopular ? "#0D0F14" : "var(--color-text-secondary)",
                  border: isPopular ? "none" : "1px solid var(--color-border)",
                }}
              >
                Edit Plan
              </button>
            </div>
          );
        })}
      </div>

      {/* Subscriptions Log */}
      <div
        style={{
          background: "#10131A",
          border: "1px solid var(--color-border)",
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <p
            style={{
              color: "var(--color-text-secondary)",
              fontWeight: 600,
              fontSize: 13,
              margin: 0,
            }}
          >
            Subscriptions Log
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr 0.8fr",
            gap: 8,
            padding: "10px 20px",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          {["Member", "Plan", "Start", "Expires", "Status"].map((h) => (
            <span
              key={h}
              style={{
                fontSize: 10,
                color: "var(--color-text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.8px",
              }}
            >
              {h}
            </span>
          ))}
        </div>

        {stateMember.map((m, i) => {
          const st = memberStatusConfig[m.status];
          return (
            <div
              key={m.id}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr 1fr 0.8fr",
                gap: 8,
                padding: "13px 20px",
                alignItems: "center",
                borderBottom:
                  i < stateMember.length - 1 ? "1px solid #111520" : "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Avatar name={m.name} color={m.avatarColor} size={30} />
                <p
                  style={{
                    color: "#C8D0E0",
                    fontSize: 13,
                    fontWeight: 500,
                    margin: 0,
                  }}
                >
                  {m.name}
                </p>
              </div>
              <span
                style={{ color: "var(--color-text-secondary)", fontSize: 12 }}
              >
                {m.planName}
              </span>
              <span
                style={{ color: "var(--color-text-secondary)", fontSize: 12 }}
              >
                {formatDate(m.startDate)}
              </span>
              <span
                style={{ color: "var(--color-text-secondary)", fontSize: 12 }}
              >
                {formatDate(m.expiryDate)}
              </span>
              <Badge label={st.label} color={st.color} bg={st.bg} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
