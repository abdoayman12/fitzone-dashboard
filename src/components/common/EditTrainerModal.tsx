import { useState } from "react";
import {
  MdEdit,
  MdCheck,
  MdClose,
  MdPerson,
  MdPhone,
  MdEmail,
  MdFitnessCenter,
  MdAccessTime,
} from "react-icons/md";
import type { Trainer } from "../../types";
import { useTrainer } from "../../Hooks/useTrainer";
import toast from "react-hot-toast";

interface Props {
  trainer: Trainer;
  onCancel: () => void;
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

export default function EditTrainerModal({ trainer, onCancel }: Props) {
  const nameParts = trainer.name.split(" ");
  const { dispatchTrainer } = useTrainer();

  const [form, setForm] = useState({
    firstName: nameParts[0] ?? "",
    lastName: nameParts.slice(1).join(" ") ?? "",
    phone: trainer.phone,
    email: trainer.email,
    specialty: trainer.specialty,
    avatarColor: trainer.avatarColor,
  });

  const set = (key: keyof typeof form, val: string) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const fullName = [form.firstName, form.lastName].filter(Boolean).join(" ");
  const initials =
    [form.firstName[0], form.lastName[0]]
      .filter(Boolean)
      .join("")
      .toUpperCase() || "TR";

  const handleSave = () => {
    if (
      !form.firstName.trim() ||
      !form.lastName.trim() ||
      !form.specialty ||
      !form.phone.trim()
    )
      return;
    const UPDTrainer: Trainer = {
      ...trainer,
      name: fullName,
      specialty: form.specialty,
      phone: form.phone,
      email: form.email,
      avatarColor: form.avatarColor,
    };
    dispatchTrainer({ type: "UPD_TRAINER", payloud: UPDTrainer });
    toast.success(`${UPDTrainer.name} updated`);
    onCancel()
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
          maxWidth: 480,
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
                Edit Trainer
              </p>
              <p style={{ color: "#3A4560", fontSize: 11, margin: 0 }}>
                Editing: {trainer.name}
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
                {fullName || trainer.name}
              </p>
              <p style={{ color: "#5A6280", fontSize: 11, margin: "3px 0 0" }}>
                {form.specialty || trainer.specialty}
              </p>
            </div>
          </div>

          <SLabel>Personal Information</SLabel>

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <Field label="First Name" required>
              <Inp icon={<MdPerson size={14} color="#3A4560" />}>
                <input
                  style={inp}
                  value={form.firstName}
                  onChange={(e) => set("firstName", e.target.value)}
                />
              </Inp>
            </Field>
            <Field label="Last Name" required>
              <Inp icon={<MdPerson size={14} color="#3A4560" />}>
                <input
                  style={inp}
                  value={form.lastName}
                  onChange={(e) => set("lastName", e.target.value)}
                />
              </Inp>
            </Field>
          </div>

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <Field label="Phone" required>
              <Inp icon={<MdPhone size={14} color="#3A4560" />}>
                <input
                  style={inp}
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                />
              </Inp>
            </Field>
            <Field label="Email">
              <Inp icon={<MdEmail size={14} color="#3A4560" />}>
                <input
                  style={inp}
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                />
              </Inp>
            </Field>
          </div>

          <div style={{ height: 1, background: "#1A1E2E" }} />
          <SLabel>Specialty</SLabel>

          <Field label="Specialty" required>
            <Inp icon={<MdFitnessCenter size={14} color="#3A4560" />}>
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
            </Inp>
          </Field>

          <div style={{ height: 1, background: "#1A1E2E" }} />
          <SLabel>Avatar Color</SLabel>

          <Field label="Choose a color">
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {COLORS.map((c) => (
                <div
                  key={c}
                  onClick={() => set("avatarColor", c)}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: c,
                    cursor: "pointer",
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontSize: 11,
              color: "#2E3550",
            }}
          >
            <MdAccessTime size={12} />
            Last edited:{" "}
            {new Date().toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </div>
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

// ── Helpers ──
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
