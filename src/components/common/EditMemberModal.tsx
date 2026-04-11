import { CiUser } from "react-icons/ci";
import {
  MdCardMembership,
  MdEdit,
  MdOutlineEmail,
  MdOutlinePhone,
} from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa";
import { SubmitEvent, useEffect, useState } from "react";
import { useAddMember } from "../../Hooks/useAddMember";
import { Member, MemberStatus } from "@/types";
import toast from "react-hot-toast";
import {
  calceDateExpery,
  calcExpiryDate,
  totalPaidReturn,
} from "../../utils/helpers";
import { usePlan } from "../../Hooks/usePlan";

function EditMemberModal({
  member,
  close,
}: {
  member: Member;
  close: () => void;
}) {
  const { dispatchMember } = useAddMember();
  const [form, setForm] = useState<Member>({ ...member });
  const { statePlan } = usePlan();
  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    const newExpiryDate = calcExpiryDate(
      form.startDate,
      form.planID,
      statePlan,
    );
    let num = calceDateExpery(form.startDate, newExpiryDate);
    let status: MemberStatus = "active";
    if (num === 100) {
      status = "expired";
    } else if (num >= 80 && num < 100) {
      status = "expiring";
    } else {
      status = "active";
    }
    dispatchMember({
      type: "UPD_MEMBER",
      payloud: {
        ...form,
        expiryDate: newExpiryDate,
        status: status,
      },
    });
    close();
    toast.success("Member Updated successfully");
  }
  useEffect(() => {
    setForm({ ...form, totalPaid: totalPaidReturn(form.id, statePlan) });
  }, [form.planName]);
  return (
    <form
      onSubmit={handleSubmit}
      onClick={(e) => e.stopPropagation()}
      className="relative bg-(--color-bg-card) z-100 w-140 flex flex-col gap-2.5 rounded-lg p-5"
    >
      {/* header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBlock: "24px",
          borderBottom: "1px solid #1A1E2E",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: "rgba(55,138,221,0.12)",
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
              Edit Member
            </p>
            <p style={{ color: "#3A4560", fontSize: 11, margin: 0 }}>
              Editing:{" "}
              <span className="text-(--color-accent)">{member.name}</span>
            </p>
          </div>
        </div>
        <button
          onClick={close}
          style={{
            width: 30,
            height: 30,
            background: "#0D0F14",
            border: "1px solid #1E2230",
            borderRadius: 7,
            cursor: "pointer",
            color: "#5A6280",
            fontSize: 14,
          }}
        >
          ✕
        </button>
      </div>
      {/* name + phone */}
      <div className="flex gap-2 w-full">
        <Field label="Full Name" required icon={<CiUser color="#99a1af" />}>
          <input
            className="bg-[#0D0F14] py-1.5 px-8 cursor-pointer text-white rounded-lg outline-none border border-(--color-border)"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </Field>
        <Field label="Phone" required icon={<MdOutlinePhone color="#99a1af" />}>
          <input
            className="bg-[#0D0F14] py-1.5 px-8 cursor-pointer text-white rounded-lg outline-none border border-(--color-border)"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </Field>
      </div>
      {/* email */}
      <div className="flex gap-2 w-full">
        <Field label="Email" icon={<MdOutlineEmail color="#99a1af" />}>
          <input
            className="bg-[#0D0F14] py-1.5 px-8 cursor-pointer text-white rounded-lg outline-none border border-(--color-border) w-full"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </Field>
      </div>
      {/* brith Date + gender */}
      <div className="flex gap-2 w-full">
        <div className="flex w-full flex-col gap-2 flex-1 relative">
          <label className="text-(--color-text-muted) font-bold">GENDER</label>
          <span className="absolute text-gray-400 bottom-2.5 ml-3">
            <CiUser />
          </span>
          <select
            name="gender"
            id=""
            className="bg-[#0D0F14] py-1.5 px-8 text-white rounded-lg outline-none border border-(--color-border) "
            value={form.gender}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <Field label="DATE OF BIRTH">
          <input
            className="bg-[#0D0F14] py-1.5 px-8 cursor-pointer text-white rounded-lg outline-none border border-(--color-border) w-full"
            type="date"
            lang="en"
            value={form.brithDate}
            onChange={(e) => setForm({ ...form, brithDate: e.target.value })}
          />
        </Field>
      </div>
      {/* plan */}
      <div className="flex gap-2 w-full">
        <div className="flex flex-col gap-2 flex-1 relative">
          <label className="text-(--color-text-muted) font-bold">
            SUBSCRIPTION PLAN
          </label>
          <span className="absolute text-gray-400 bottom-2 ml-3">
            <MdCardMembership />
          </span>
          <select
            name="planName"
            id="plan"
            className="bg-[#0D0F14] py-1.5 px-8 text-white rounded-lg outline-none border border-(--color-border)"
            value={form.planName}
            onChange={(e) => setForm({ ...form, planName: e.target.value })}
          >
            {statePlan.map((plan) => (
              <option
                key={plan.id}
                value={plan.name}
              >{`${plan.name}: ${plan.price} EGP`}</option>
            ))}
          </select>
        </div>
      </div>
      {/* start date + payment method */}
      <div className="flex gap-2 w-full">
        <Field label="START DATE">
          <input
            className="bg-[#0D0F14] py-1.5 px-8 cursor-pointer text-white rounded-lg outline-none border border-(--color-border) w-full"
            type="date"
            lang="en"
            value={form.startDate}
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            required={true}
          />
        </Field>
        <div className="flex flex-col gap-2 flex-1 relative ">
          <label className="text-(--color-text-muted) font-bold">
            PAYMENT METHOD
          </label>
          <span className="absolute text-gray-400 bottom-2 ml-3">
            <FaMoneyBillWave />
          </span>
          <select
            name="paymentMethod"
            id=""
            className="bg-[#0D0F14] py-1.5 px-9 text-white rounded-lg outline-none border border-(--color-border)"
            value={form.paymentMethod}
            onChange={(e) =>
              setForm({ ...form, paymentMethod: e.target.value })
            }
          >
            <option value="card">Card</option>
            <option value="cash">Cash</option>
            <option value="wallet">Wallet</option>
          </select>
        </div>
      </div>
      {/* status */}
      <div className="flex gap-2 w-full mb-2">
        <div className="flex gap-2 flex-col w-full">
          <label className="text-(--color-text-muted) font-bold">STATUS</label>
          <div className="flex items-center justify-around">
            <div className="flex gap-2">
              <input
                id="active"
                type="radio"
                name="status"
                value={"active"}
                onClick={() => setForm({ ...form, status: "active" })}
                checked={form.status === "active"}
              />
              <label htmlFor="active" className="text-gray-500 text-lg">
                Active
              </label>
            </div>
            <div className="flex gap-2">
              <input
                id="expiring"
                type="radio"
                name="status"
                value={"expiring"}
                onClick={() => setForm({ ...form, status: "expiring" })}
                checked={form.status === "expiring"}
              />
              <label htmlFor="expiring" className="text-gray-500 text-lg">
                Expiring
              </label>
            </div>
            <div className="flex gap-2">
              <input
                id="suspended"
                type="radio"
                name="status"
                value={"suspended"}
                onClick={() => setForm({ ...form, status: "suspended" })}
                checked={form.status === "suspended"}
              />
              <label htmlFor="suspended" className="text-gray-500 text-lg">
                Suspended
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="sticky left-0 right-0 bottom-15 w-full h-0.5 bg-(--color-border)" />
      <div className="flex justify-between items-center">
        <div></div>
        <div className="flex gap-2 mt-2 items-center">
          <button
            onClick={close}
            className="bg-transparent text-(--color-text-secondary) font-semibold border border-white/10 py-1 px-2 rounded-lg text-[16px] cursor-pointer"
          >
            Cancel
          </button>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "var(--color-accent)",
              color: "#0D0F14",
              border: "none",
              borderRadius: 8,
              padding: "5px 10px",
              fontSize: 16,
              fontWeight: 600,
              cursor: "pointer",
            }}
            type="submit"
          >
            Edit Member
          </button>
        </div>
      </div>
    </form>
  );
}

// Helper component للـ fields
function Field({
  label,
  required = false,
  icon,
  children,
}: {
  label: string;
  required?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 5, flex: "1" }}
    >
      <p className="text-(--color-text-muted) font-bold">
        {label} {required ? <span style={{ color: "#E8FF47" }}>*</span> : ""}
      </p>
      <div style={{ position: "relative" }}>
        {icon && (
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
        )}
        {children}
      </div>
    </div>
  );
}
export default EditMemberModal;
