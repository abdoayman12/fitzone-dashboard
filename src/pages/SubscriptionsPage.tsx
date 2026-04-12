import { MdCheck, MdAdd } from "react-icons/md";
import PageHeader from "../components/common/PageHeader";
import Badge from "../components/common/Badge";
import Avatar from "../components/common/Avatar";
import { formatDate, memberStatusConfig } from "../utils/helpers";
import { useAddMember } from "../Hooks/useAddMember";
import { useState } from "react";
import AddPlanModal from "../components/common/AddPlanModal";
import { usePlan } from "../Hooks/usePlan";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Plan } from "@/types";
import toast from "react-hot-toast";
import DeletePlanDialog from "../components/common/DeletePlanDialog";
import EditPlanModal from "../components/common/EditPlanModal";

export default function SubscriptionsPage() {
  const { stateMember } = useAddMember();
  const { statePlan, dispatchPlan } = usePlan();
  console.log(statePlan);
  const [planToDelete, setPlanToDelete] = useState<Plan | null>(null);
  const [planToEdit, setPlanToEdit] = useState<Plan | null>(null);
  const [showAddPlanModal, setShowAddPlanModal] = useState(false);
  return (
    <div>
      <PageHeader
        title="Subscriptions & Plans"
        subtitle="Manage pricing plans and member subscriptions"
        action={
          <button
            onClick={() => setShowAddPlanModal(true)}
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
        {statePlan.map((plan) => {
          return (
            <div
              key={plan.id}
              style={{
                background: "#10131A",
                border: `1px solid var(--color-border)`,
                borderRadius: 14,
                padding: 22,
                position: "relative",
              }}
            >
              <div className="flex items-center justify-between">
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
                <button
                  onClick={() => setPlanToDelete(plan)}
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
                  <RiDeleteBin5Line size={13} color="#F87171" />
                </button>
              </div>
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
                    color: "#fff",
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
                onClick={() => setPlanToEdit(plan)}
                style={{
                  width: "100%",
                  padding: "9px",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 500,
                  background: "transparent",
                  color: "var(--color-text-secondary)",
                  border: "1px solid var(--color-border)",
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
        {stateMember.length === 0 ? (
          <div
            style={{
              padding: 40,
              textAlign: "center",
              color: "var(--color-text-muted)",
              fontSize: 14,
            }}
          >
            No members found.
          </div>
        ) : (
          stateMember.map((m, i) => {
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
          })
        )}
      </div>
      {showAddPlanModal ? (
        <AddPlanModal onClose={() => setShowAddPlanModal(false)} />
      ) : (
        ""
      )}
      {planToDelete && (
        <DeletePlanDialog
          plan={planToDelete}
          onCancel={() => setPlanToDelete(null)}
          onConfirm={() => {
            dispatchPlan({ type: "DELETE_PLAN", payloud: planToDelete.id });
            toast.success(`"${planToDelete.name}" deleted`);
            setPlanToDelete(null);
          }}
        />
      )}

      {planToEdit && (
        <EditPlanModal
          plan={planToEdit}
          onCancel={() => setPlanToEdit(null)}
          onSave={(updated) => {
            dispatchPlan({ type: "UPD_PLAN", payloud: updated });
            toast.success(`"${updated.name}" updated`);
            setPlanToEdit(null);
          }}
        />
      )}
    </div>
  );
}
