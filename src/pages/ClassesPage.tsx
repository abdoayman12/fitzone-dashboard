import { MOCK_CLASSES, MOCK_TRAINERS } from "../constants/mockData";
import Avatar from "../components/common/Avatar";
import PageHeader from "../components/common/PageHeader";
import { MdAdd, MdAccessTime, MdPeople } from "react-icons/md";
import { useState } from "react";
import AddClassModal from "../components/common/AddClassModal";
import { useAddClass } from "../Hooks/useAddClass";
import { todayClassesFun } from "../utils/helpers";
import { useEnrollment } from "../Hooks/useEnrollment";
import { GymClass } from "@/types";
import ManageEnrollmentModal from "../components/common/ManageEnrollmentModal";

export default function ClassesPage() {
  const { stateClass } = useAddClass();
  const { stateEnrollment } = useEnrollment();
  const [showAddClass, setShowAddClass] = useState<boolean>(false);
  const [managingClass, setManagingClass] = useState<GymClass | null>(null);
  const todayClasses = todayClassesFun(stateClass);

  console.log(stateEnrollment)
  return (
    <div>
      <PageHeader
        title="Classes & Schedule"
        subtitle="Manage gym sessions and trainer assignments"
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
            onClick={() => setShowAddClass(true)}
          >
            <MdAdd size={16} /> Add Class
          </button>
        }
      />

      {/* Today's Classes */}
      <p
        style={{
          color: "var(--color-text-muted)",
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "1px",
          fontWeight: 600,
          marginBottom: 12,
        }}
      >
        Today's Classes
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 14,
          marginBottom: 28,
        }}
      >
        {todayClasses.map((cls) => {
          const spotsLeft = cls.capacity - cls.enrolled;
          const fillPct = Math.round((cls.enrolled / cls.capacity) * 100);
          const enrolledCount = stateEnrollment.filter(
            (e) => e.classId === cls.id,
          ).length;
          const enrolledMembers = stateEnrollment
            .filter((e) => e.classId === cls.id)
            .slice(0, 3);
          return (
            <div
              key={cls.id}
              style={{
                background: "#10131A",
                border: "1px solid var(--color-border)",
                borderRadius: 12,
                padding: 18,
                borderTop: `3px solid ${cls.color}`,
              }}
            >
              {/* Name + category */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 12,
                }}
              >
                <div>
                  <p
                    style={{
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: 14,
                      margin: 0,
                    }}
                  >
                    {cls.name}
                  </p>
                  <span
                    style={{
                      fontSize: 10,
                      color: cls.color,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      fontWeight: 600,
                    }}
                  >
                    {cls.category}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: 11,
                    padding: "3px 8px",
                    borderRadius: 20,
                    background:
                      spotsLeft === 0
                        ? "rgba(248,113,113,0.1)"
                        : "rgba(74,222,128,0.1)",
                    color:
                      spotsLeft === 0
                        ? "var(--color-danger)"
                        : "var(--color-success)",
                    fontWeight: 500,
                  }}
                >
                  {spotsLeft === 0 ? "Full" : `${spotsLeft} spots`}
                </span>
              </div>

              {/* Trainer */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 14,
                }}
              >
                <Avatar
                  name={cls.trainerName}
                  color={cls.color}
                  size={26}
                  radius={6}
                />
                <span
                  style={{ color: "var(--color-text-secondary)", fontSize: 12 }}
                >
                  {cls.trainerName}
                </span>
              </div>

              {/* Time */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginBottom: 12,
                }}
              >
                <MdAccessTime size={14} color="var(--color-text-muted)" />
                <span
                  style={{ color: "var(--color-text-secondary)", fontSize: 12 }}
                >
                  {cls.startTime} — {cls.endTime}
                </span>
              </div>

              {/* Capacity progress */}
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 5,
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <MdPeople size={13} color="var(--color-text-muted)" />
                    <span
                      style={{ color: "var(--color-text-muted)", fontSize: 11 }}
                    >
                      {cls.enrolled}/{cls.capacity}
                    </span>
                  </div>
                  <span
                    style={{ color: "var(--color-text-muted)", fontSize: 11 }}
                  >
                    {fillPct}%
                  </span>
                </div>
                <div
                  style={{
                    height: 4,
                    background: "var(--color-bg-hover)",
                    borderRadius: 4,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${fillPct}%`,
                      background: cls.color,
                      borderRadius: 4,
                    }}
                  />
                </div>
              </div>
              
              <div
                style={{ height: 1, background: "#1A1E2E", marginBottom: 12 }}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {/* Mini avatars + عدد */}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ display: "flex" }}>
                    {enrolledMembers.map((e, i) => (
                      <div
                        key={e.id}
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: 6,
                          border: "2px solid #10131A",
                          background: "rgba(232,255,71,0.12)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 8,
                          fontWeight: 700,
                          color: "#E8FF47",
                          marginLeft: i === 0 ? 0 : -6,
                        }}
                      >
                        {e.memberName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </div>
                    ))}
                    {enrolledCount > 3 && (
                      <div
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: 6,
                          border: "2px solid #10131A",
                          background: "#161B28",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 9,
                          color: "#5A6280",
                          marginLeft: -6,
                        }}
                      >
                        +{enrolledCount - 3}
                      </div>
                    )}
                  </div>
                  <span style={{ fontSize: 12, color: "#5A6280" }}>
                    <span style={{ color: "#C8D0E0", fontWeight: 600 }}>
                      {enrolledCount}
                    </span>{" "}
                    enrolled
                  </span>
                </div>
                <button
                  onClick={() => setManagingClass(cls)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    padding: "6px 14px",
                    borderRadius: 8,
                    border: `1px solid ${spotsLeft === 0 ? "rgba(248,113,113,0.25)" : "rgba(232,255,71,0.25)"}`,
                    background:
                      spotsLeft === 0
                        ? "rgba(248,113,113,0.06)"
                        : "rgba(232,255,71,0.06)",
                    color: spotsLeft === 0 ? "#F87171" : "#E8FF47",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                  </svg>
                  Manage Enrollment
                </button>
              </div>
            </div>
          );
        })}

        {showAddClass && (
          <AddClassModal onClose={() => setShowAddClass(false)} />
        )}
        {/* Modal */}
        {managingClass && (
          <ManageEnrollmentModal
            gymClass={managingClass}
            onClose={() => setManagingClass(null)}
          />
        )}
      </div>
      {/* Trainers Section */}
      <p
        style={{
          color: "var(--color-text-muted)",
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "1px",
          fontWeight: 600,
          marginBottom: 12,
        }}
      >
        Trainers
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 14,
        }}
      >
        {MOCK_TRAINERS.map((trainer) => {
          const trainerClasses = MOCK_CLASSES.filter(
            (c) => c.trainerId === trainer.id,
          );
          return (
            <div
              key={trainer.id}
              style={{
                background: "#10131A",
                border: "1px solid var(--color-border)",
                borderRadius: 12,
                padding: 16,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                textAlign: "center",
              }}
            >
              <Avatar
                name={trainer.name}
                color={trainer.avatarColor}
                size={44}
                radius={12}
              />
              <div>
                <p
                  style={{
                    color: "#fff",
                    fontSize: 13,
                    fontWeight: 600,
                    margin: 0,
                  }}
                >
                  {trainer.name}
                </p>
                <p
                  style={{
                    color: "var(--color-text-muted)",
                    fontSize: 11,
                    margin: "2px 0 0",
                  }}
                >
                  {trainer.specialty}
                </p>
              </div>
              <span
                style={{
                  fontSize: 11,
                  padding: "3px 10px",
                  borderRadius: 20,
                  background: "rgba(232,255,71,0.08)",
                  color: "var(--color-accent)",
                  border: "1px solid rgba(232,255,71,0.15)",
                }}
              >
                {trainerClasses.length} class
                {trainerClasses.length !== 1 ? "es" : ""} today
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
