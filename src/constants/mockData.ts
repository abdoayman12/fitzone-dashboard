import type {
  Member,
  Plan,
  Payment,
  GymClass,
  Trainer,
  KpiData,
} from "../types";

// ─── KPI Data ────────────────────────────────────────────
export const MOCK_KPI: KpiData = {
  todaysSessions: 37,
  memberGrowth: [
    { month: "Jan", count: 420 },
    { month: "Feb", count: 580 },
    { month: "Mar", count: 510 },
    { month: "Apr", count: 740 },
    { month: "May", count: 660 },
    { month: "Jun", count: 850 },
    { month: "Jul", count: 800 },
    { month: "Aug", count: 1010 },
    { month: "Sep", count: 940 },
    { month: "Oct", count: 980 },
    { month: "Nov", count: 1100 },
    { month: "Dec", count: 1284 },
  ],
  planDistribution: [
    { name: "Monthly", value: 40, color: "#E8FF47" },
    { name: "Quarterly", value: 33, color: "#378ADD" },
    { name: "Annual", value: 27, color: "#4ADE80" },
  ],
};

// ─── Plans ───────────────────────────────────────────────
export const MOCK_PLANS: Plan[] = [
  {
    id: "plan-1",
    name: "Monthly",
    duration: 1,
    price: 350,
    features: ["Full gym access", "Locker room", "2 free classes/month"],
  },
  {
    id: "plan-2",
    name: "Quarterly",
    duration: 3,
    price: 900,
    features: [
      "Full gym access",
      "Locker room",
      "8 free classes/quarter",
      "Nutrition consult",
    ],
  },
  {
    id: "plan-3",
    name: "Annual",
    duration: 12,
    price: 3000,
    features: [
      "Full gym access",
      "Locker room",
      "Unlimited classes",
      "Personal trainer session",
      "Nutrition plan",
    ],
  },
];

// ─── Members ─────────────────────────────────────────────
export const MOCK_MEMBERS: Member[] = [
  {
    id: "m-1",
    name: "Karim Mostafa",
    phone: "+20 100 123 4567",
    email: "karim@email.com",
    avatarColor: "#E8FF47",
    planName: "Annual",
    startDate: "2025-01-01",
    expiryDate: "2026-01-01",
    status: "active",
    totalPaid: 3000,
  },
  {
    id: "m-2",
    name: "Nour Salem",
    phone: "+20 101 234 5678",
    email: "nour@email.com",
    avatarColor: "#378ADD",
    planName: "Monthly",
    startDate: "2025-03-01",
    expiryDate: "2025-04-01",
    status: "expiring",
    totalPaid: 350,
  },
  {
    id: "m-3",
    name: "Hassan Farid",
    phone: "+20 112 345 6789",
    email: "hassan@email.com",
    avatarColor: "#4ADE80",
    planName: "Quarterly",
    startDate: "2024-12-01",
    expiryDate: "2025-03-01",
    status: "expired",
    totalPaid: 900,
  },
  {
    id: "m-4",
    name: "Sara Ahmed",
    phone: "+20 122 456 7890",
    email: "sara@email.com",
    avatarColor: "#F87171",
    planName: "Annual",
    startDate: "2025-02-01",
    expiryDate: "2026-02-01",
    status: "active",
    totalPaid: 3000,
  },
  {
    id: "m-5",
    name: "Omar Khaled",
    phone: "+20 100 567 8901",
    email: "omar@email.com",
    avatarColor: "#FBBF24",
    planName: "Monthly",
    startDate: "2025-03-10",
    expiryDate: "2025-04-10",
    status: "active",
    totalPaid: 350,
  },
  {
    id: "m-6",
    name: "Mona Hassan",
    phone: "+20 111 678 9012",
    email: "mona@email.com",
    avatarColor: "#A78BFA",
    planName: "Quarterly",
    startDate: "2025-01-15",
    expiryDate: "2025-04-15",
    status: "expiring",
    totalPaid: 900,
  },
];

// ─── Payments ────────────────────────────────────────────
export const MOCK_PAYMENTS: Payment[] = [
  {
    id: "pay-1",
    memberId: "m-1",
    memberName: "Karim Mostafa",
    planName: "Annual",
    amount: 3000,
    method: "card",
    status: "paid",
    date: "2025-01-01",
  },
  {
    id: "pay-2",
    memberId: "m-2",
    memberName: "Nour Salem",
    planName: "Monthly",
    amount: 350,
    method: "cash",
    status: "paid",
    date: "2025-03-01",
  },
  {
    id: "pay-3",
    memberId: "m-3",
    memberName: "Hassan Farid",
    planName: "Quarterly",
    amount: 900,
    method: "wallet",
    status: "overdue",
    date: "2025-03-01",
  },
  {
    id: "pay-4",
    memberId: "m-4",
    memberName: "Sara Ahmed",
    planName: "Annual",
    amount: 3000,
    method: "card",
    status: "paid",
    date: "2025-02-01",
  },
  {
    id: "pay-5",
    memberId: "m-5",
    memberName: "Omar Khaled",
    planName: "Monthly",
    amount: 350,
    method: "cash",
    status: "pending",
    date: "2025-03-10",
  },
  {
    id: "pay-6",
    memberId: "m-6",
    memberName: "Mona Hassan",
    planName: "Quarterly",
    amount: 900,
    method: "card",
    status: "paid",
    date: "2025-01-15",
  },
];

// ─── Classes ─────────────────────────────────────────────
// constants/mockData.ts — عدّل الـ MOCK_CLASSES
export const MOCK_CLASSES: GymClass[] = [

];

// ─── Trainers ────────────────────────────────────────────
export const MOCK_TRAINERS: Trainer[] = [
  {
    id: "t-1",
    name: "Layla Nasser",
    specialty: "Yoga & Zumba",
    phone: "+20 100 111",
    email: "layla@fitzone.com",
    avatarColor: "#4ADE80",
  },
  {
    id: "t-2",
    name: "Ahmed Samy",
    specialty: "CrossFit",
    phone: "+20 101 222",
    email: "ahmed@fitzone.com",
    avatarColor: "#F87171",
  },
  {
    id: "t-3",
    name: "Rania Adel",
    specialty: "Spinning",
    phone: "+20 112 333",
    email: "rania@fitzone.com",
    avatarColor: "#378ADD",
  },
  {
    id: "t-4",
    name: "Khaled Magdy",
    specialty: "Boxing",
    phone: "+20 122 444",
    email: "khaled@fitzone.com",
    avatarColor: "#F97316",
  },
];
