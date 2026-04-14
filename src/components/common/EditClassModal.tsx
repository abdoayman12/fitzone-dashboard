// components/common/EditClassModal.tsx
import { useState } from "react";
import {
  MdEdit,
  MdCheck,
  MdClose,
  MdAccessTime,
  MdPeople,
} from "react-icons/md";
import { useTrainer } from "../../Hooks/useTrainer";
import type { GymClass, ClassCategory } from "../../types";
import toast from "react-hot-toast";

interface Props {
  gymClass: GymClass;
  onSave: (updated: GymClass) => void;
  onCancel: () => void;
}

const CATEGORIES: { value: ClassCategory; label: string; color: string }[] = [
  { value: "yoga", label: "Yoga", color: "#4ADE80" },
  { value: "crossfit", label: "CrossFit", color: "#F87171" },
  { value: "spinning", label: "Spinning", color: "#378ADD" },
  { value: "zumba", label: "Zumba", color: "#FBBF24" },
  { value: "boxing", label: "Boxing", color: "#F97316" },
  { value: "pilates", label: "Pilates", color: "#A78BFA" },
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function EditClassModal({ gymClass, onSave, onCancel }: Props) {
  const { stateTrainer } = useTrainer();

  const [form, setForm] = useState({
    name: gymClass.name,
    category: gymClass.category,
    trainerId: gymClass.trainerId,
    startTime: gymClass.startTime,
    endTime: gymClass.endTime,
    repeatDays: gymClass.repeatDays ?? [],
    capacity: gymClass.capacity,
  });

  const set = <K extends keyof typeof form>(key: K, val: (typeof form)[K]) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const toggleDay = (i: number) =>
    setForm((prev) => ({
      ...prev,
      repeatDays: prev.repeatDays.includes(i)
        ? prev.repeatDays.filter((d) => d !== i)
        : [...prev.repeatDays, i],
    }));

  const selectedCategory = CATEGORIES.find((c) => c.value === form.category)!;
  const selectedTrainer = stateTrainer.find((t) => t.id === form.trainerId);

  const validate = () => {
    if (!form.name.trim()) {
      toast.error("Class name is required");
      return false;
    }
    if (!form.trainerId) {
      toast.error("Please select a trainer");
      return false;
    }
    if (form.startTime >= form.endTime) {
      toast.error("End time must be after start time");
      return false;
    }
    if (form.repeatDays.length === 0) {
      toast.error("Select at least one day");
      return false;
    }
    if (form.capacity < 1) {
      toast.error("Capacity must be at least 1");
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave({
      ...gymClass,
      name: form.name.trim(),
      category: form.category,
      trainerId: form.trainerId,
      trainerName: selectedTrainer?.name ?? gymClass.trainerName,
      startTime: form.startTime,
      endTime: form.endTime,
      repeatDays: form.repeatDays.sort(),
      capacity: form.capacity,
      color: selectedCategory.color,
    });
  };

  const inp: React.CSSProperties = {
    background: "#0D0F14",
    border: "1px solid #252B40",
    borderRadius: 8,
    padding: "0 12px 0 34px",
    height: 38,
    color: "#fff",
    fontSize: 13,
    width: "100%",
    outline: "none",
  };

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
          borderRadius: 16,
          width: "100%",
          maxWidth: 540,
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 24px",
            borderBottom: "1px solid #1A1E2E",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: "rgba(55,138,221,0.1)",
                border: "1px solid rgba(55,138,221,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MdEdit size={18} color="#378ADD" />
            </div>
            <div>
              <p
                style={{
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: 600,
                  margin: 0,
                }}
              >
                Edit Class
              </p>
              <p style={{ color: "#3A4560", fontSize: 11, margin: 0 }}>
                Editing: {gymClass.name}
              </p>
            </div>
          </div>
          <button
            onClick={onCancel}
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
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <SLabel>Class Information</SLabel>

          {/* Name */}
          <Field label="Class Name" required>
            <Inp
              icon={
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#3A4560"
                  strokeWidth="2"
                >
                  <path d="M4 6h16M4 10h16M4 14h8" />
                </svg>
              }
            >
              <input
                style={inp}
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
              />
            </Inp>
          </Field>

          {/* Category */}
          <Field label="Category" required>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: 8,
              }}
            >
              {CATEGORIES.map((cat) => {
                const sel = form.category === cat.value;
                return (
                  <div
                    key={cat.value}
                    onClick={() => set("category", cat.value)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "9px 12px",
                      borderRadius: 8,
                      cursor: "pointer",
                      border: `1px solid ${sel ? cat.color : "#1A1E2E"}`,
                      background: sel ? `${cat.color}14` : "#0D0F14",
                    }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: cat.color,
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: sel ? cat.color : "#5A6280",
                      }}
                    >
                      {cat.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </Field>

          <div style={{ height: 1, background: "#1A1E2E" }} />
          <SLabel>Trainer & Capacity</SLabel>

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <Field label="Trainer" required>
              <Inp
                icon={
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#3A4560"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                }
              >
                <select
                  style={{ ...inp, appearance: "none", cursor: "pointer" }}
                  value={form.trainerId}
                  onChange={(e) => set("trainerId", e.target.value)}
                >
                  <option value="">Select trainer</option>
                  {stateTrainer.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </Inp>
            </Field>
            <Field label="Max Capacity" required>
              <Inp icon={<MdPeople size={14} color="#3A4560" />}>
                <input
                  style={inp}
                  type="number"
                  min={1}
                  max={100}
                  value={form.capacity}
                  onChange={(e) => set("capacity", Number(e.target.value))}
                />
              </Inp>
            </Field>
          </div>

          <div style={{ height: 1, background: "#1A1E2E" }} />
          <SLabel>Schedule</SLabel>

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <Field label="Start Time" required>
              <Inp icon={<MdAccessTime size={14} color="#3A4560" />}>
                <input
                  style={inp}
                  type="time"
                  lang="en"
                  value={form.startTime}
                  onChange={(e) => set("startTime", e.target.value)}
                />
              </Inp>
            </Field>
            <Field label="End Time" required>
              <Inp icon={<MdAccessTime size={14} color="#3A4560" />}>
                <input
                  style={inp}
                  type="time"
                  lang="en"
                  value={form.endTime}
                  onChange={(e) => set("endTime", e.target.value)}
                />
              </Inp>
            </Field>
          </div>

          {/* Repeat Days */}
          <Field label="Repeat Days" required>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {DAYS.map((day, i) => {
                const sel = form.repeatDays.includes(i);
                return (
                  <div
                    key={day}
                    onClick={() => toggleDay(i)}
                    style={{
                      padding: "6px 12px",
                      borderRadius: 20,
                      cursor: "pointer",
                      fontSize: 11,
                      fontWeight: 600,
                      border: `1px solid ${sel ? "#E8FF47" : "#1A1E2E"}`,
                      background: sel ? "rgba(232,255,71,0.08)" : "#0D0F14",
                      color: sel ? "#E8FF47" : "#5A6280",
                    }}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </Field>

          {/* Capacity preview */}
          <div
            style={{
              background: "#0D0F14",
              border: "1px solid #1A1E2E",
              borderRadius: 8,
              padding: "12px 14px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <p style={{ fontSize: 12, color: "#5A6280", margin: 0 }}>
                Class capacity
              </p>
              <p style={{ fontSize: 11, color: "#3A4560", marginTop: 3 }}>
                {gymClass.enrolled} enrolled / {form.capacity} max
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#E8FF47",
                  margin: 0,
                }}
              >
                {form.capacity}
              </p>
              <p style={{ fontSize: 10, color: "#3A4560" }}>spots total</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 24px",
            borderTop: "1px solid #1A1E2E",
          }}
        >
          <p style={{ fontSize: 11, color: "#2E3550" }}>
            Fields marked * are required
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={onCancel}
              style={{
                background: "transparent",
                border: "1px solid #1E2230",
                borderRadius: 8,
                padding: "9px 18px",
                color: "#5A6280",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              style={{
                background: "#378ADD",
                border: "none",
                borderRadius: 8,
                padding: "9px 20px",
                color: "#fff",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <MdCheck size={16} /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SLabel({ children }: { children: React.ReactNode }) {
  return (
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
      {children}
    </p>
  );
}
function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <p
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: "#5A6280",
          textTransform: "uppercase",
          letterSpacing: ".7px",
          margin: 0,
        }}
      >
        {label} {required && <span style={{ color: "#E8FF47" }}>*</span>}
      </p>
      {children}
    </div>
  );
}
function Inp({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          left: 11,
          top: "50%",
          transform: "translateY(-50%)",
          pointerEvents: "none",
        }}
      >
        {icon}
      </div>
      {children}
    </div>
  );
}
