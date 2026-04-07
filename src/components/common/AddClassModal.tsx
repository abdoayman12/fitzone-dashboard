import { useState } from "react";
import {
  MdAdd,
  MdCheck,
  MdClose,
  MdPeople,
  MdAccessTime,
  MdPerson,
  MdClass,
} from "react-icons/md";
import type { GymClass, ClassCategory } from "../../types";
import toast from "react-hot-toast";
import { useAddClass } from "../../Hooks/useAddClass";
import { useTrainer } from "../../Hooks/useTrainer";

interface Props {
  onClose: () => void;
}

// ── إعدادات الـ categories ─────────────────────────────────
const CATEGORIES: { value: ClassCategory; label: string; color: string }[] = [
  { value: "yoga", label: "Yoga", color: "#4ADE80" },
  { value: "crossfit", label: "CrossFit", color: "#F87171" },
  { value: "spinning", label: "Spinning", color: "#378ADD" },
  { value: "zumba", label: "Zumba", color: "#FBBF24" },
  { value: "boxing", label: "Boxing", color: "#F97316" },
  { value: "pilates", label: "Pilates", color: "#A78BFA" },
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// ── الـ initial form state ─────────────────────────────────
const EMPTY_FORM = {
  name: "",
  category: "yoga" as ClassCategory,
  trainerId: "",
  trainerName: "",
  startTime: "07:00",
  endTime: "08:00",
  repeatDays: [] as number[],
  capacity: 15,
};

export default function AddClassModal({ onClose }: Props) {
  const [form, setForm] = useState(EMPTY_FORM);
  const { dispatchClass } = useAddClass();
  const { stateTrainer } = useTrainer();
  // ── helpers ───────────────────────────────────────────────
  const set = <K extends keyof typeof EMPTY_FORM>(
    key: K,
    val: (typeof EMPTY_FORM)[K],
  ) => setForm((prev) => ({ ...prev, [key]: val }));

  const toggleDay = (dayIndex: number) => {
    setForm((prev) => ({
      ...prev,
      repeatDays: prev.repeatDays.includes(dayIndex)
        ? prev.repeatDays.filter((d) => d !== dayIndex)
        : [...prev.repeatDays, dayIndex],
    }));
  };

  const selectedTrainer = stateTrainer.find((t) => t.id === form.trainerId);
  const selectedCategory = CATEGORIES.find((c) => c.value === form.category)!;

  // ── validation ───────────────────────────────────────────
  const validate = () => {
    if (!form.name.trim()) {
      toast.error("Class name is required");
      return false;
    }
    if (!form.trainerId) {
      toast.error("Please select a trainer");
      return false;
    }
    if (!form.startTime) {
      toast.error("Start time is required");
      return false;
    }
    if (!form.endTime) {
      toast.error("End time is required");
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

  // ── submit ───────────────────────────────────────────────
  const handleSave = () => {
    if (!validate()) return;

    const newClass: GymClass = {
      id: `cls-${Date.now()}`,
      name: form.name.trim(),
      category: form.category,
      trainerId: form.trainerId,
      trainerName: selectedTrainer?.name ?? "",
      startTime: form.startTime,
      endTime: form.endTime,
      repeatDays: form.repeatDays.sort(),
      capacity: form.capacity,
      enrolled: 0,
      color: selectedCategory.color,
    };

    toast.success(`"${newClass.name}" added successfully!`);
    dispatchClass({ type: "ADD_CLASS", payloud: newClass });
    console.log(newClass);
    onClose();
  };

  // ── shared styles ─────────────────────────────────────────
  const inputStyle: React.CSSProperties = {
    background: "#0D0F14",
    border: "1px solid #252B40",
    borderRadius: 8,
    height: 38,
    color: "#fff",
    fontSize: 13,
    width: "100%",
    outline: "none",
    padding: "0 12px 0 34px",
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
        className="backdrop-blur-md"
      >
        {/* ── Header ── */}
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
                background: "rgba(232,255,71,0.1)",
                border: "1px solid rgba(232,255,71,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MdAdd size={20} color="#E8FF47" />
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
                Add New Class
              </p>
              <p style={{ color: "#3A4560", fontSize: 11, margin: 0 }}>
                Fill in the class details below
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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
            <MdClose size={14} />
          </button>
        </div>

        {/* ── Body ── */}
        <div
          style={{
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {/* Section: Class Info */}
          <SectionLabel>Class Information</SectionLabel>

          {/* Name */}
          <Field label="Class Name" required>
            <div style={{ position: "relative" }}>
              <MdClass
                size={14}
                color="#3A4560"
                style={{
                  position: "absolute",
                  left: 11,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
              <input
                style={inputStyle}
                placeholder="e.g. Morning Yoga"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
              />
            </div>
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
                const selected = form.category === cat.value;
                return (
                  <div
                    key={cat.value}
                    onClick={() => set("category", cat.value)}
                    style={{
                      background: selected ? `${cat.color}14` : "#0D0F14",
                      border: `1px solid ${selected ? cat.color : "#1A1E2E"}`,
                      borderRadius: 8,
                      padding: "9px 12px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
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
                        color: selected ? cat.color : "#5A6280",
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

          {/* Section: Trainer & Capacity */}
          <SectionLabel>Trainer & Capacity</SectionLabel>

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            {/* Trainer */}
            <Field label="Trainer" required>
              <div style={{ position: "relative" }}>
                <MdPerson
                  size={14}
                  color="#3A4560"
                  style={{
                    position: "absolute",
                    left: 11,
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                  }}
                />
                <select
                  style={{
                    ...inputStyle,
                    appearance: "none",
                    cursor: "pointer",
                  }}
                  value={form.trainerId}
                  onChange={(e) => {
                    const t = stateTrainer.find((t) => t.id === e.target.value);
                    setForm((prev) => ({
                      ...prev,
                      trainerId: e.target.value,
                      trainerName: t?.name ?? "",
                    }));
                  }}
                >
                  <option value="">Select trainer</option>
                  {stateTrainer.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>
            </Field>

            {/* Capacity */}
            <Field label="Max Capacity" required>
              <div style={{ position: "relative" }}>
                <MdPeople
                  size={14}
                  color="#3A4560"
                  style={{
                    position: "absolute",
                    left: 11,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                />
                <input
                  style={inputStyle}
                  type="number"
                  min={1}
                  max={100}
                  value={form.capacity}
                  onChange={(e) => set("capacity", Number(e.target.value))}
                />
              </div>
            </Field>
          </div>

          <div style={{ height: 1, background: "#1A1E2E" }} />

          {/* Section: Schedule */}
          <SectionLabel>Schedule</SectionLabel>

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <Field label="Start Time" required>
              <div style={{ position: "relative" }}>
                <MdAccessTime
                  size={14}
                  color="#3A4560"
                  style={{
                    position: "absolute",
                    left: 11,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                />
                <input
                  style={inputStyle}
                  type="time"
                  lang="en"
                  value={form.startTime}
                  onChange={(e) => set("startTime", e.target.value)}
                />
              </div>
            </Field>
            <Field label="End Time" required>
              <div style={{ position: "relative" }}>
                <MdAccessTime
                  size={14}
                  color="#3A4560"
                  style={{
                    position: "absolute",
                    left: 11,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                />
                <input
                  style={inputStyle}
                  type="time"
                  lang="en"
                  value={form.endTime}
                  onChange={(e) => set("endTime", e.target.value)}
                />
              </div>
            </Field>
          </div>

          {/* Repeat Days */}
          <Field label="Repeat Days" required>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {DAYS.map((day, i) => {
                const selected = form.repeatDays.includes(i);
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
                      border: `1px solid ${selected ? "#E8FF47" : "#1A1E2E"}`,
                      background: selected
                        ? "rgba(232,255,71,0.08)"
                        : "#0D0F14",
                      color: selected ? "#E8FF47" : "#5A6280",
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
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <p style={{ fontSize: 12, color: "#5A6280" }}>Class capacity</p>
              <p style={{ fontSize: 11, color: "#3A4560", marginTop: 3 }}>
                0 enrolled / {form.capacity} max
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 22, fontWeight: 700, color: "#E8FF47" }}>
                {form.capacity}
              </p>
              <p style={{ fontSize: 10, color: "#3A4560" }}>spots available</p>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
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
              onClick={onClose}
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
                background: "#E8FF47",
                border: "none",
                borderRadius: 8,
                padding: "9px 20px",
                color: "#0D0F14",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <MdCheck size={16} /> Save Class
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Helper components ─────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: 10,
        fontWeight: 700,
        color: "#3A4560",
        textTransform: "uppercase",
        letterSpacing: 1,
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
          letterSpacing: "0.7px",
        }}
      >
        {label} {required && <span style={{ color: "#E8FF47" }}>*</span>}
      </p>
      {children}
    </div>
  );
}
