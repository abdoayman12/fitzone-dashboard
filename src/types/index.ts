// ─── Member ───────────────────────────────────────────────
export type MemberStatus = "active" | "expiring" | "expired" | "suspended";

export interface Member {
  id: string;
  name: string;
  phone: string;
  email?: string;
  gender?: string;
  brithDate?: string;
  avatarColor: string; // hex accent color
  planID: string;
  planName: string | undefined;
  startDate: string; // ISO date string
  expiryDate: string; // ISO date string
  status: MemberStatus;
  totalPaid: number;
  paymentMethod?: string;
}

// ─── Subscription Plan ────────────────────────────────────

export interface Plan {
  id: string;
  name: string;
  duration: number;
  price: number; // EGP
  color: string;
  features: string[];
}

// ─── Payment ──────────────────────────────────────────────
export type PaymentStatus = "paid" | "pending" | "overdue";
export type PaymentMethod = "cash" | "card" | "wallet";

export interface Payment {
  id: string;
  memberId: string;
  memberName: string;
  planName: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  date: string;
}

// ─── Class / Session ──────────────────────────────────────
export type ClassCategory =
  | "yoga"
  | "crossfit"
  | "spinning"
  | "zumba"
  | "pilates"
  | "boxing";

// types/index.ts — أضف الحقلين دول لـ GymClass
export interface GymClass {
  id: string;
  name: string;
  category: ClassCategory;
  trainerId: string;
  trainerName: string;
  startTime: string; // الوقت بس "07:00"
  endTime: string; // الوقت بس "08:00"
  repeatDays: number[]; // [0,1,2,3,4,5,6] — 0=الأحد, 1=الاتنين...
  capacity: number;
  enrolled: number;
  color: string;
}

// ─── Trainer ──────────────────────────────────────────────
export interface Trainer {
  id: string;
  name: string;
  specialty: string;
  phone: string;
  email: string;
  avatarColor: string;
}

// ─── Dashboard KPIs ───────────────────────────────────────
export interface KpiData {
  memberGrowth: { month: string }[];
}

// types/index.ts
export interface Enrollment {
  id: string;
  classId: string;
  memberId: string;
  memberName: string;
  trainerName?: string;
  trainerID: string;
  enrolledAt: string; // ISO date
}
