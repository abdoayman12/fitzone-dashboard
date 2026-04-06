// components/common/ManageEnrollmentModal.tsx
import { useState } from "react";
import { MdPersonAdd, MdPersonRemove, MdSearch, MdClose } from "react-icons/md";
import { useEnrollment } from "../../Hooks/useEnrollment";
import Avatar from "./Avatar";
import toast from "react-hot-toast";
import type { GymClass } from "../../types";
import { useAddMember } from "../../Hooks/useAddMember";
import { useAddClass } from "../../Hooks/useAddClass";

interface Props {
  gymClass: GymClass;
  onClose: () => void;
}

export default function ManageEnrollmentModal({ gymClass, onClose }: Props) {
  const { stateEnrollment, dispatchEnrollment } = useEnrollment();
  const { stateMember } = useAddMember();
  const { dispatchClass } = useAddClass();

  const [tab, setTab] = useState<"enrolled" | "add">("enrolled");
  const [search, setSearch] = useState("");

  // المسجلين في الحصة دي بس
  const classEnrollments = stateEnrollment.filter(
    (e) => e.classId === gymClass.id,
  );
  const enrolledIds = new Set(classEnrollments.map((e) => e.memberId));
  const fillPct = Math.round(
    (classEnrollments.length / gymClass.capacity) * 100,
  );

  // الأعضاء المتاحين للإضافة
  const availableMembers = stateMember.filter(
    (m) =>
      !enrolledIds.has(m.id) &&
      m.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleEnroll = (memberId: string, memberName: string) => {
    if (classEnrollments.length >= gymClass.capacity) {
      toast.error("Class is full!");
      return;
    }
    dispatchEnrollment({
      type: "ENROLL_MEMBER",
      payloud: {
        id: `enr-${Date.now()}`,
        classId: gymClass.id,
        memberId,
        memberName,
        trainerID: gymClass.trainerId,
        enrolledAt: new Date().toISOString(),
      },
    });
    toast.success(`${memberName} enrolled!`);
    setTab("enrolled");
    dispatchClass({ type: "ADD_ENROLLED", payloud: gymClass.id });
  };

  const handleUnenroll = (memberId: string, memberName: string) => {
    dispatchEnrollment({
      type: "UNENROLL_MEMBER",
      payloud: { classId: gymClass.id, memberId },
    });
    toast.success(`${memberName} removed`);
    dispatchClass({ type: "DEL_ENROLLED", payloud: gymClass.id });
  };
  console.log(stateEnrollment)
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
        zIndex: 50,
      }}
      className="backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#10131A",
          border: "1px solid #1E2230",
          borderRadius: 16,
          width: "100%",
          maxWidth: 480,
          maxHeight: "85vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
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
          <div>
            <p
              style={{
                color: "#fff",
                fontSize: 15,
                fontWeight: 600,
                margin: 0,
              }}
            >
              {gymClass.name}
            </p>
            <p style={{ color: "#3A4560", fontSize: 11, margin: 0 }}>
              {gymClass.startTime} — {gymClass.endTime}
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                padding: "4px 12px",
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 600,
                background:
                  classEnrollments.length >= gymClass.capacity
                    ? "rgba(248,113,113,0.1)"
                    : "rgba(74,222,128,0.1)",
                color:
                  classEnrollments.length >= gymClass.capacity
                    ? "#F87171"
                    : "#4ADE80",
              }}
            >
              {classEnrollments.length}/{gymClass.capacity}
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
        </div>

        {/* Progress */}
        <div style={{ height: 3, background: "#1A1E2E" }}>
          <div
            style={{
              height: "100%",
              width: `${fillPct}%`,
              background: gymClass.color,
              transition: "width 0.3s",
            }}
          />
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid #1A1E2E" }}>
          {(["enrolled", "add"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                flex: 1,
                padding: "11px 0",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                background: "transparent",
                border: "none",
                borderBottom: `2px solid ${tab === t ? "#E8FF47" : "transparent"}`,
                color: tab === t ? "#E8FF47" : "#5A6280",
              }}
            >
              {t === "enrolled"
                ? `Enrolled (${classEnrollments.length})`
                : "Add Member"}
            </button>
          ))}
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "14px 20px" }}>
          {tab === "enrolled" ? (
            classEnrollments.length === 0 ? (
              <p
                style={{
                  textAlign: "center",
                  color: "#3A4560",
                  fontSize: 13,
                  padding: "32px 0",
                }}
              >
                No members enrolled yet
              </p>
            ) : (
              classEnrollments.map((enr) => {
                const member = stateMember.find((m) => m.id === enr.memberId);
                return (
                  <div
                    key={enr.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 0",
                      borderBottom: "1px solid #0f1218",
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <Avatar
                        name={enr.memberName}
                        color={member?.avatarColor ?? "#8A9AB5"}
                        size={32}
                      />
                      <div>
                        <p
                          style={{
                            color: "#C8D0E0",
                            fontSize: 13,
                            fontWeight: 500,
                            margin: 0,
                          }}
                        >
                          {enr.memberName}
                        </p>
                        <p
                          style={{ color: "#3A4560", fontSize: 11, margin: 0 }}
                        >
                          {new Date(enr.enrolledAt).toLocaleDateString(
                            "en-GB",
                            { day: "2-digit", month: "short" },
                          )}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        handleUnenroll(enr.memberId, enr.memberName)
                      }
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        padding: "5px 10px",
                        background: "rgba(248,113,113,0.08)",
                        border: "1px solid rgba(248,113,113,0.2)",
                        borderRadius: 7,
                        color: "#F87171",
                        fontSize: 12,
                        cursor: "pointer",
                      }}
                    >
                      <MdPersonRemove size={14} /> Remove
                    </button>
                  </div>
                );
              })
            )
          ) : (
            <>
              <div style={{ position: "relative", marginBottom: 12 }}>
                <MdSearch
                  size={15}
                  color="#3A4560"
                  style={{
                    position: "absolute",
                    left: 11,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                />
                <input
                  placeholder="Search members..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    background: "#0D0F14",
                    border: "1px solid #252B40",
                    borderRadius: 8,
                    height: 36,
                    padding: "0 12px 0 34px",
                    color: "#fff",
                    fontSize: 13,
                    width: "100%",
                    outline: "none",
                  }}
                />
              </div>
              {availableMembers.length === 0 ? (
                <p
                  style={{
                    textAlign: "center",
                    color: "#3A4560",
                    fontSize: 13,
                    padding: "24px 0",
                  }}
                >
                  No available members
                </p>
              ) : (
                availableMembers.map((m) => (
                  <div
                    key={m.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 0",
                      borderBottom: "1px solid #0f1218",
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <Avatar name={m.name} color={m.avatarColor} size={32} />
                      <div>
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
                        <p
                          style={{ color: "#3A4560", fontSize: 11, margin: 0 }}
                        >
                          {m.planName}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleEnroll(m.id, m.name)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        padding: "5px 10px",
                        background: "rgba(232,255,71,0.08)",
                        border: "1px solid rgba(232,255,71,0.2)",
                        borderRadius: 7,
                        color: "#E8FF47",
                        fontSize: 12,
                        cursor: "pointer",
                        fontWeight: 600,
                      }}
                    >
                      <MdPersonAdd size={14} /> Enroll
                    </button>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
