// components/common/RenewPlanModal.tsx
import { useState } from "react";
import { MdRefresh, MdCheck, MdClose, MdCardMembership } from "react-icons/md";
import { usePlan } from "../../Hooks/usePlan";
import {
  formatDuration,
  calcExpiryDate,
  formatDate,
  formatCurrency,
} from "../../utils/helpers";
import type { Member } from "../../types";
import toast from "react-hot-toast";
import { useAddMember } from "../../Hooks/useAddMember";

interface Props {
  member: Member;
  onClose: () => void;
  onCloseParent: () => void;
  onRenewed?: () => void;
}

export default function RenewPlanModal({ member, onClose, onCloseParent, onRenewed }: Props) {
  const { dispatchMember } = useAddMember();
  const { statePlan } = usePlan();

  // الباقة الحالية للعضو
  const currentPlan = statePlan.find((p) => p.id === member.planID);

  // ممكن يغير الباقة وقت التجديد
  const [selectedPlanId, setSelectedPlanId] = useState(member.planID);
  const selectedPlan =
    statePlan.find((p) => p.id === selectedPlanId) ?? currentPlan;

  // تاريخ البداية = دلوقتي
  const today = new Date().toISOString().split("T")[0];
  const newExpiry = selectedPlan
    ? calcExpiryDate(today, selectedPlan.id, statePlan)
    : "";

  const handleConfirm = () => {
    if (!selectedPlan) return;

    // ── update المـ member ──
    const updatedMember: Member = {
      ...member,
      planID: selectedPlan.id,
      planName: selectedPlan.name,
      startDate: today,
      expiryDate: newExpiry,
      status: "active",
      totalPaid: member.totalPaid + selectedPlan.price,
    };
    dispatchMember({ type: "UPD_MEMBER", payloud: updatedMember });

    toast.success(
      `${member.name}'s plan renewed until ${formatDate(newExpiry)}`,
    );
    onRenewed?.();
    onClose();
    onCloseParent();
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 60,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#10131A",
          border: "1px solid #1E2230",
          borderRadius: 16,
          width: "100%",
          maxWidth: 420,
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "18px 20px",
            borderBottom: "1px solid #1A1E2E",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 9,
                background: "rgba(232,255,71,0.1)",
                border: "1px solid rgba(232,255,71,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MdRefresh size={18} color="#E8FF47" />
            </div>
            <div>
              <p
                style={{
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 600,
                  margin: 0,
                }}
              >
                Renew Plan
              </p>
              <p style={{ color: "#3A4560", fontSize: 11, margin: 0 }}>
                {member.name}
              </p>
            </div>
          </div>
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
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MdClose size={14} />
          </button>
        </div>

        {/* Body */}
        <div
          style={{
            padding: "18px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          {/* Select plan */}
          <div>
            <p
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "#3A4560",
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: 8,
              }}
            >
              Select Plan
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {statePlan.map((plan) => {
                const selected = plan.id === selectedPlanId;
                return (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlanId(plan.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 14px",
                      borderRadius: 8,
                      cursor: "pointer",
                      border: `1px solid ${selected ? "#E8FF47" : "#1A1E2E"}`,
                      background: selected
                        ? "rgba(232,255,71,0.06)"
                        : "#0D0F14",
                      transition: "all .15s",
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <MdCardMembership
                        size={15}
                        color={selected ? "#E8FF47" : "#3A4560"}
                      />
                      <div>
                        <p
                          style={{
                            color: selected ? "#E8FF47" : "#C8D0E0",
                            fontSize: 13,
                            fontWeight: 600,
                            margin: 0,
                          }}
                        >
                          {plan.name}
                        </p>
                        <p
                          style={{ color: "#3A4560", fontSize: 11, margin: 0 }}
                        >
                          {formatDuration(plan.duration)}
                        </p>
                      </div>
                    </div>
                    <p
                      style={{
                        color: selected ? "#E8FF47" : "#8A9AB5",
                        fontSize: 14,
                        fontWeight: 700,
                        margin: 0,
                      }}
                    >
                      {formatCurrency(plan.price)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Summary card */}
          {selectedPlan && (
            <div
              style={{
                background: "#0D0F14",
                border: "1px solid #1A1E2E",
                borderRadius: 10,
                padding: "12px 14px",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#3A4560",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  margin: 0,
                }}
              >
                Renewal Summary
              </p>
              <div style={{ height: 1, background: "#1A1E2E" }} />
              {[
                { label: "Plan", value: selectedPlan.name },
                {
                  label: "Duration",
                  value: formatDuration(selectedPlan.duration),
                },
                { label: "Starts", value: formatDate(today) },
                {
                  label: "Expires",
                  value: formatDate(newExpiry),
                  accent: true,
                },
                {
                  label: "Amount Due",
                  value: formatCurrency(selectedPlan.price),
                  accent: true,
                },
              ].map((row) => (
                <div
                  key={row.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ color: "#5A6280", fontSize: 12 }}>
                    {row.label}
                  </span>
                  <span
                    style={{
                      color: row.accent ? "#E8FF47" : "#C8D0E0",
                      fontSize: 12,
                      fontWeight: row.accent ? 700 : 500,
                    }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ display: "flex", gap: 10, padding: "0 20px 18px" }}>
          <button
            onClick={onClose}
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
            onClick={handleConfirm}
            style={{
              flex: 1,
              background: "#E8FF47",
              border: "none",
              borderRadius: 8,
              padding: 10,
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
            <MdCheck size={16} /> Confirm Renewal
          </button>
        </div>
      </div>
    </div>
  );
}
