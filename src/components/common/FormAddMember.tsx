import { CiUser } from "react-icons/ci";
import InputAddMember from "./InputAddMember";
import PageHeader from "./PageHeader";
import {
  MdCardMembership,
  MdOutlineEmail,
  MdOutlinePhone,
} from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { SubmitEvent } from "react";
import { Member, MemberStatus } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { useAddMember } from "../../Hooks/useAddMember";
import toast from "react-hot-toast";
import {
  calcExpiryDate,
  getAvatarColor,
  totalPaidReturn,
} from "../../utils/helpers";
import { usePlan } from "../../Hooks/usePlan";

function FormAddMember({ close }: { close: () => void }) {
  const { dispatchMember } = useAddMember();
  const { statePlan } = usePlan();
  function returnPlanName(planID: string): string | undefined {
    const plan = statePlan.find((item) => item.id === planID);
    return plan?.name;
  }
  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    let myuuid = uuidv4();
    const formData = new FormData(e.target);
    const raw = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;
    const data: Member = {
      id: myuuid,
      name: raw.name,
      phone: raw.phone,
      email: raw.email || undefined,
      gender: raw.gender || undefined,
      brithDate: raw.brithDate || undefined,
      planID: raw.planID,
      planName: returnPlanName(raw.planID),
      startDate: raw.dateStart,
      expiryDate: calcExpiryDate(raw.dateStart, raw.planID, statePlan),
      avatarColor: getAvatarColor(),
      status: (raw.status as MemberStatus) ?? "active",
      totalPaid: totalPaidReturn(raw.planID, statePlan),
      paymentMethod: raw.paymentMethod,
    };
    dispatchMember({ type: "ADD_MEMBER", payloud: data });
    console.log(data);
    close();
    toast.success("Member Added successfully");
  }
  return (
    <form
      onSubmit={handleSubmit}
      onClick={(e) => e.stopPropagation()}
      className="relative bg-(--color-bg-card) z-100 w-140 flex flex-col gap-2.5 rounded-lg p-5"
    >
      <PageHeader
        title="Add New Member"
        subtitle="Fill in the member's details below"
        form
        action={
          <button
            onClick={close}
            className="bg-[#0D0F14] text-(--color-text-secondary) border border-white/10 p-1 rounded-md text-lg cursor-pointer"
          >
            <IoClose />
          </button>
        }
      />
      <div className="sticky left-0 right-0 top-23 w-full h-0.5 bg-(--color-border)" />
      <div className="flex gap-2 w-full">
        <InputAddMember
          type="text"
          label="FULL NAME"
          placeholder="karim ahmed"
          name="name"
          icon={<CiUser />}
          required={true}
        />
        <InputAddMember
          type="text"
          label="PHONE NUMBER"
          placeholder="+20 100 000 0000"
          name="phone"
          icon={<MdOutlinePhone />}
          required={true}
        />
      </div>
      <div className="flex gap-2 w-full">
        <InputAddMember
          type="email"
          label="EMAIL ADDRESS"
          placeholder="karim@email.com"
          name="email"
          icon={<MdOutlineEmail />}
        />
      </div>
      <div className="flex gap-2 w-full">
        <div className="flex flex-col gap-2 flex-1 relative">
          <label className="text-(--color-text-muted) font-bold">GENDER</label>
          <span className="absolute text-gray-400 bottom-3 ml-3">
            <CiUser />
          </span>
          <select
            name="gender"
            id=""
            className="bg-[#0D0F14] py-1.5 px-8 text-white rounded-lg outline-none border border-(--color-border)"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <InputAddMember
          type="date"
          label="DATE OF BIRTH"
          placeholder=""
          name="brithDate"
        />
      </div>
      <div className="flex gap-2 w-full">
        <div className="flex flex-col gap-2 flex-1 relative">
          <label className="text-(--color-text-muted) font-bold">
            SUBSCRIPTION PLAN
          </label>
          <span className="absolute text-gray-400 bottom-2 ml-3">
            <MdCardMembership />
          </span>
          <select
            name="planID"
            id="plan"
            className="bg-[#0D0F14] py-1.5 px-8 text-white rounded-lg outline-none border border-(--color-border)"
          >
            {statePlan.map((plan) => (
              <option
                key={plan.id}
                value={plan.id}
              >{`${plan.name}: ${plan.price} EGP`}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex gap-2 w-full">
        <InputAddMember
          type="date"
          label="START DATE"
          placeholder=""
          name="dateStart"
          required
        />
        <div className="flex flex-col gap-2 flex-1 relative">
          <label className="text-(--color-text-muted) font-bold">
            PAYMENT METHOD
          </label>
          <span className="absolute text-gray-400 bottom-3 ml-3">
            <FaMoneyBillWave />
          </span>
          <select
            name="paymentMethod"
            id=""
            className="bg-[#0D0F14] py-1.5 px-9 text-white rounded-lg outline-none border border-(--color-border)"
          >
            <option value="card">Card</option>
            <option value="cash">Cash</option>
            <option value="wallet">Wallet</option>
          </select>
        </div>
      </div>
      <div className="flex gap-2 w-full mb-2">
        <div className="flex gap-2 flex-col w-full">
          <label className="text-(--color-text-muted) font-bold">STATUS</label>
          <div className="flex items-center justify-around">
            <div className="flex gap-2">
              <input id="active" type="radio" name="status" value={"active"} />
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
            Save Member
          </button>
        </div>
      </div>
    </form>
  );
}

export default FormAddMember;
