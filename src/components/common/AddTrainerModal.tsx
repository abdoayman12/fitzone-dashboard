// components/common/AddTrainerModal.tsx
import { useState } from "react";
import {
  MdClose,
  MdCheck,
  MdPerson,
  MdPhone,
  MdEmail,
  MdFitnessCenter,
} from "react-icons/md";
import type { Trainer } from "../../types";
import { useTrainer } from "../../Hooks/useTrainer";

interface Props {
  onClose: () => void;
}

const COLORS = [
  "#4ADE80",
  "#F87171",
  "#378ADD",
  "#FBBF24",
  "#F97316",
  "#A78BFA",
  "#E8FF47",
  "#F472B6",
];

const SPECIALTIES = [
  "Yoga",
  "CrossFit",
  "Spinning",
  "Zumba",
  "Boxing",
  "Pilates",
  "Yoga & Zumba",
];

const EMPTY = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  specialty: "",
  avatarColor: "#4ADE80",
};

export default function AddTrainerModal({ onClose }: Props) {
  const [form, setForm] = useState(EMPTY);
  const { dispatchTrainer } = useTrainer();
  const set = (key: keyof typeof EMPTY, val: string) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const initials =
    [form.firstName[0], form.lastName[0]]
      .filter(Boolean)
      .join("")
      .toUpperCase() || "TR";

  const fullName =
    [form.firstName, form.lastName].filter(Boolean).join(" ") || "Trainer Name";

  const handleSave = () => {
    if (!form.firstName.trim() || !form.lastName.trim()) return;
    if (!form.phone.trim()) return;
    if (!form.specialty) return;

    const newTrainer: Trainer = {
      id: `t-${Date.now()}`,
      name: fullName,
      specialty: form.specialty,
      phone: form.phone,
      email: form.email,
      avatarColor: form.avatarColor,
    };
    dispatchTrainer({ type: "ADD_TRAINER", payloud: newTrainer });
    onClose();
  };

  // ── Shared styles ──
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
          maxHeight: "90vh",
          overflowY: "auto",
        }}
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
              <MdPerson size={20} color="#E8FF47" />
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
                Add New Trainer
              </p>
              <p style={{ color: "#3A4560", fontSize: 11, margin: 0 }}>
                Fill in the trainer's details below
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
              fontSize: 13,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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
            gap: 14,
          }}
        >
          {/* Avatar preview */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              background: "#0D0F14",
              border: "1px solid #1A1E2E",
              borderRadius: 10,
              padding: "12px 14px",
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: `${form.avatarColor}1A`,
                border: `1.5px solid ${form.avatarColor}40`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 17,
                fontWeight: 700,
                color: form.avatarColor,
                flexShrink: 0,
                transition: "all .2s",
              }}
            >
              {initials}
            </div>
            <div>
              <p
                style={{
                  color: "#C8D0E0",
                  fontSize: 13,
                  fontWeight: 600,
                  margin: 0,
                }}
              >
                {fullName}
              </p>
              <p
                style={{
                  color: "#5A6280",
                  fontSize: 11,
                  margin: "3px 0 0",
                  lineHeight: 1.5,
                }}
              >
                Avatar generated automatically
                <br />
                from name initials
              </p>
            </div>
          </div>

          {/* Section */}
          <SectionLabel>Personal Information</SectionLabel>

          {/* First + Last name */}
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <Field label="First Name" required>
              <div style={{ position: "relative" }}>
                <MdPerson
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
                  style={inp}
                  placeholder="Layla"
                  value={form.firstName}
                  onChange={(e) => set("firstName", e.target.value)}
                />
              </div>
            </Field>
            <Field label="Last Name" required>
              <div style={{ position: "relative" }}>
                <MdPerson
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
                  style={inp}
                  placeholder="Nasser"
                  value={form.lastName}
                  onChange={(e) => set("lastName", e.target.value)}
                />
              </div>
            </Field>
          </div>

          {/* Phone + Email */}
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <Field label="Phone" required>
              <div style={{ position: "relative" }}>
                <MdPhone
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
                  style={inp}
                  placeholder="+20 100 000 0000"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                />
              </div>
            </Field>
            <Field label="Email">
              <div style={{ position: "relative" }}>
                <MdEmail
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
                  style={inp}
                  placeholder="trainer@fitzone.com"
                  value={form.email}
                  type="email"
                  onChange={(e) => set("email", e.target.value)}
                />
              </div>
            </Field>
          </div>

          <div style={{ height: 1, background: "#1A1E2E" }} />

          {/* Specialty */}
          <SectionLabel>Specialty</SectionLabel>

          <Field label="Specialty" required>
            <div style={{ position: "relative" }}>
              <MdFitnessCenter
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
                style={{ ...inp, appearance: "none", cursor: "pointer" }}
                value={form.specialty}
                onChange={(e) => set("specialty", e.target.value)}
              >
                <option value="">Select specialty</option>
                {SPECIALTIES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </Field>

          <div style={{ height: 1, background: "#1A1E2E" }} />

          {/* Avatar color */}
          <SectionLabel>Avatar Color</SectionLabel>

          <Field label="Choose a color">
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {COLORS.map((c) => (
                <div
                  key={c}
                  onClick={() => set("avatarColor", c)}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    background: c,
                    cursor: "pointer",
                    flexShrink: 0,
                    border: `2px solid ${form.avatarColor === c ? "#fff" : "transparent"}`,
                    transform:
                      form.avatarColor === c ? "scale(1.15)" : "scale(1)",
                    transition: "all .15s",
                  }}
                />
              ))}
            </div>
          </Field>
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
              <MdCheck size={16} /> Save Trainer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Helpers ──
function SectionLabel({ children }: { children: React.ReactNode }) {
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
