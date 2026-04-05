import moment from "moment";
import type { GymClass, Member, MemberStatus, PaymentStatus } from "../types";
import { MOCK_PLANS } from "../constants/mockData";

// ─── Date helpers ─────────────────────────────────────────
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function daysUntil(iso: string): number {
  const diff = new Date(iso).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

// ─── Currency ─────────────────────────────────────────────
export function formatCurrency(amount: number): string {
  return (
    new Intl.NumberFormat("en-EG", {
      style: "decimal",
      maximumFractionDigits: 0,
    }).format(amount) + " EGP"
  );
}

// ─── Initials ─────────────────────────────────────────────
export function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

// ─── Status labels & colors ───────────────────────────────
export const memberStatusConfig: Record<
  MemberStatus,
  { label: string; color: string; bg: string }
> = {
  active: { label: "Active", color: "#4ADE80", bg: "rgba(74,222,128,0.1)" },
  expiring: { label: "Expiring", color: "#FBBF24", bg: "rgba(251,191,36,0.1)" },
  expired: { label: "Expired", color: "#F87171", bg: "rgba(248,113,113,0.1)" },
  suspended: {
    label: "Suspended",
    color: "#8A9AB5",
    bg: "rgba(138,154,181,0.1)",
  },
};

export const paymentStatusConfig: Record<
  PaymentStatus,
  { label: string; color: string; bg: string }
> = {
  paid: { label: "Paid", color: "#4ADE80", bg: "rgba(74,222,128,0.1)" },
  pending: { label: "Pending", color: "#FBBF24", bg: "rgba(251,191,36,0.1)" },
  overdue: { label: "Overdue", color: "#F87171", bg: "rgba(248,113,113,0.1)" },
};

// calc totalMembers
export const totalMembers = (state: Member[]) => {
  return state.length;
};

// calc monthly Revenue
export const calcMonthlyRevenue = (state: Member[]) => {
  const ThisMonth = moment(new Date()).format("MMMM");
  const totalMemberMonthly = state.map((item) => {
    let monthMember = moment(item.startDate).format("MMMM");
    if (ThisMonth === monthMember) {
      return item;
    }
  });
  const totalMonthlyRevenue = totalMemberMonthly.reduce(
    (total, item) => total + +(item?.totalPaid ?? 0),
    0,
  );
  return totalMonthlyRevenue;
};

// calc expiringSoon
export const calcExpiringSoon = (state: Member[]) => {
  const expiringMembers = state.filter((item) => {
    if (item.status === "expiring") {
      return item;
    }
  });
  return expiringMembers.length;
};

// cale get current year months
export function getCurrentYearMonths(
  state: Member[],
): { month: string; count: number }[] {
  const calcCountThisMonth = (state_2: Member[], month: string): number => {
    const allMembersInMonth = state_2.filter((item) => {
      if (moment(item.startDate).format("MMM") === month) {
        return item;
      }
    });
    return allMembersInMonth.length;
  };
  const now = new Date();
  const currentMonth = now.getMonth();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return monthNames
    .slice(0, currentMonth + 1)
    .map((month) => ({ month, count: calcCountThisMonth(state, month) }));
}

// cale pie chart data
export function calcPieChartData(state: Member[]) {
  const planDistribution = [];
  for (let i = 0; i < MOCK_PLANS.length; i++) {
    const NewArr = state.filter((item) => MOCK_PLANS[i].name === item.planName);
    function generateRandomHexColor(): string {
      let randomColor = Math.floor(Math.random() * 16777215).toString(16);

      randomColor = randomColor.padStart(6, "0");

      return `#${randomColor.toUpperCase()}`;
    }
    planDistribution.push({
      name: MOCK_PLANS[i].name,
      value: NewArr.length,
      color: generateRandomHexColor(),
    });
  }
  return planDistribution;
}

// today classes
export function todayClassesFun(classes: GymClass[]): GymClass[] {
  const now: number = new Date().getDay();
  return classes
    .filter((cls) => cls.repeatDays.includes(now))
    .sort((a, b) => a.startTime.localeCompare(b.startTime));
}
