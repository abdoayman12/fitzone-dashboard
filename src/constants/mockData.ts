import { generateRandomHexColor } from "../utils/helpers";
import type {
  Plan,
  Trainer,
  KpiData,
} from "../types";

// ─── KPI Data ────────────────────────────────────────────
export const MOCK_KPI: KpiData = {
  memberGrowth: [
    { month: "Jan" },
    { month: "Feb" },
    { month: "Mar" },
    { month: "Apr" },
    { month: "May" },
    { month: "Jun" },
    { month: "Jul" },
    { month: "Aug"},
    { month: "Sep" },
    { month: "Oct" },
    { month: "Nov" },
    { month: "Dec"},
  ],

};

// ─── Plans ───────────────────────────────────────────────
export const MOCK_PLANS: Plan[] = [
  {
    id: "plan-1",
    name: "Monthly",
    duration: 1,
    price: 350,
    color: generateRandomHexColor(),
    features: ["Full gym access", "Locker room", "2 free classes/month"],
  },
  {
    id: "plan-2",
    name: "Quarterly",
    duration: 3,
    price: 900,
    color: generateRandomHexColor(),
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
    color: generateRandomHexColor(),
    features: [
      "Full gym access",
      "Locker room",
      "Unlimited classes",
      "Personal trainer session",
      "Nutrition plan",
    ],
  },
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
