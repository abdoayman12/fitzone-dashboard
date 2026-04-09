// components/common/AddPlanModal.tsx
import { useState } from "react";
import { MdAdd, MdCheck, MdClose, MdRemove } from "react-icons/md";
import { usePlan } from "../../Hooks/usePlan";
import { formatDuration, generateRandomHexColor } from "../../utils/helpers";
import type { Plan } from "../../types";
import toast from "react-hot-toast";

interface Props {
  onClose: () => void;
}

const EMPTY = {
  name: "",
  duration: "", // string في الـ input — بنحوله number وقت الحفظ
  price: "",
  features: [""] as string[],
};

export default function AddPlanModal({ onClose }: Props) {
  const { dispatchPlan } = usePlan();
  const [form, setForm] = useState(EMPTY);

  // ── helpers ──────────────────────────────────────────────
  const setField = (key: keyof typeof EMPTY, val: string) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const setFeature = (i: number, val: string) =>
    setForm((prev) => {
      const features = [...prev.features];
      features[i] = val;
      return { ...prev, features };
    });

  const addFeature = () =>
    setForm((prev) => ({ ...prev, features: [...prev.features, ""] }));

  const removeFeature = (i: number) =>
    setForm((prev) => ({
      ...prev,
      features: prev.features.filter((_, idx) => idx !== i),
    }));

  // ── live preview values ───────────────────────────────────
  const previewName = form.name || "Plan Name";
  const previewDuration = Number(form.duration) || 0;
  const previewPrice = Number(form.price) || 0;
  const previewFeatures = form.features.filter((f) => f.trim() !== "");

  // ── validation ───────────────────────────────────────────
  const validate = () => {
    if (!form.name.trim()) {
      toast.error("Plan name is required");
      return false;
    }
    if (!form.duration || previewDuration < 1) {
      toast.error("Duration must be at least 1 month");
      return false;
    }
    if (!form.price || previewPrice < 1) {
      toast.error("Price must be greater than 0");
      return false;
    }
    if (previewFeatures.length === 0) {
      toast.error("Add at least one feature");
      return false;
    }
    return true;
  };

  // ── save ─────────────────────────────────────────────────
  const handleSave = () => {
    if (!validate()) return;

    const newPlan: Plan = {
      id: `plan-${Date.now()}`,
      name: form.name.trim(),
      duration: previewDuration,
      price: previewPrice,
      color: generateRandomHexColor(),
      features: previewFeatures,
    };

    dispatchPlan({ type: "ADD_PLAN", payloud: newPlan });
    toast.success(`"${newPlan.name}" added successfully!`);
    onClose();
  };

  // ── shared styles ─────────────────────────────────────────
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
                Add New Plan
              </p>
              <p style={{ color: "#3A4560", fontSize: 11, margin: 0 }}>
                Fill in the plan details below
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

        {/* ── Body ── */}
        <div
          style={{
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {/* Live preview */}
          <div
            style={{
              background: "#0D0F14",
              border: "1px solid #1A1E2E",
              borderRadius: 10,
              padding: 16,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <div>
                <p
                  style={{
                    color: "#fff",
                    fontSize: 15,
                    fontWeight: 700,
                    margin: 0,
                  }}
                >
                  {previewName}
                </p>
                <p style={{ color: "#3A4560", fontSize: 11, marginTop: 3 }}>
                  {previewDuration > 0
                    ? `${formatDuration(previewDuration)} · ${previewDuration * 30} days`
                    : "— months"}
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p
                  style={{
                    color: "#E8FF47",
                    fontSize: 22,
                    fontWeight: 800,
                    letterSpacing: -0.5,
                    margin: 0,
                  }}
                >
                  {previewPrice > 0 ? previewPrice.toLocaleString() : "—"}
                </p>
                <p style={{ color: "#3A4560", fontSize: 11, marginTop: 2 }}>
                  EGP{" "}
                  {previewDuration > 0
                    ? `/ ${formatDuration(previewDuration)}`
                    : ""}
                </p>
              </div>
            </div>

            {previewFeatures.length > 0 && (
              <>
                <div style={{ height: 1, background: "#1A1E2E" }} />
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 5 }}
                >
                  {previewFeatures.map((f, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 7,
                        fontSize: 12,
                        color: "#8A9AB5",
                      }}
                    >
                      <div
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: 4,
                          background: "rgba(232,255,71,0.1)",
                          border: "1px solid rgba(232,255,71,0.2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <MdCheck size={9} color="#E8FF47" />
                      </div>
                      {f}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Section label */}
          <SLabel>Plan Information</SLabel>

          {/* Name + Duration */}
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <Field label="Plan Name" required>
              <Inp
                icon={
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#3A4560"
                    stroke-width="2"
                  >
                    <path d="M4 6h16M4 10h16M4 14h8" />
                  </svg>
                }
              >
                <input
                  style={inp}
                  placeholder="e.g. Premium"
                  value={form.name}
                  onChange={(e) => setField("name", e.target.value)}
                />
              </Inp>
            </Field>
            <Field label="Duration (months)" required>
              <Inp
                icon={
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#3A4560"
                    stroke-width="2"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                }
              >
                <input
                  style={inp}
                  type="number"
                  min="1"
                  max="24"
                  placeholder="e.g. 6"
                  value={form.duration}
                  onChange={(e) => setField("duration", e.target.value)}
                />
              </Inp>
            </Field>
          </div>

          {/* Price */}
          <Field label="Price (EGP)" required>
            <Inp
              icon={
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#3A4560"
                  stroke-width="2"
                >
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                </svg>
              }
            >
              <input
                style={inp}
                type="number"
                min="0"
                placeholder="e.g. 1800"
                value={form.price}
                onChange={(e) => setField("price", e.target.value)}
              />
            </Inp>
          </Field>

          <div style={{ height: 1, background: "#1A1E2E" }} />

          {/* Features */}
          <SLabel>Features</SLabel>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {form.features.map((feat, i) => (
              <div
                key={i}
                style={{ display: "flex", alignItems: "center", gap: 8 }}
              >
                <input
                  style={{
                    background: "#0D0F14",
                    border: "1px solid #252B40",
                    borderRadius: 8,
                    padding: "0 12px",
                    height: 34,
                    color: "#fff",
                    fontSize: 12,
                    flex: 1,
                    outline: "none",
                  }}
                  placeholder={`Feature ${i + 1}`}
                  value={feat}
                  onChange={(e) => setFeature(i, e.target.value)}
                />
                <button
                  onClick={() => removeFeature(i)}
                  style={{
                    width: 28,
                    height: 28,
                    background: "rgba(248,113,113,0.08)",
                    border: "1px solid rgba(248,113,113,0.2)",
                    borderRadius: 7,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  <MdRemove size={14} color="#F87171" />
                </button>
              </div>
            ))}

            <button
              onClick={addFeature}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                padding: "7px 12px",
                borderRadius: 7,
                border: "1px dashed #252B40",
                background: "transparent",
                color: "#5A6280",
                fontSize: 12,
                cursor: "pointer",
                width: "100%",
              }}
            >
              <MdAdd size={14} /> Add feature
            </button>
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
              <MdCheck size={16} /> Save Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Helpers ──────────────────────────────────────────────────
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
