// ─── Member ───────────────────────────────────────────────
export type MemberStatus = 'active' | 'expiring' | 'expired' | 'suspended'

export interface Member {
  id: string
  name: string
  phone: string
  email?: string
  gender?: string
  brithDate?: string
  avatarColor?: string      // hex accent color
  planName: string
  startDate: string        // ISO date string
  expiryDate: string       // ISO date string
  status: MemberStatus
  totalPaid: number
  paymentMethod?: string
}

// ─── Subscription Plan ────────────────────────────────────

export interface Plan {
  id: string
  name: string
  duration: number
  price: number            // EGP
  features: string[]
}

// ─── Payment ──────────────────────────────────────────────
export type PaymentStatus  = 'paid' | 'pending' | 'overdue'
export type PaymentMethod  = 'cash' | 'card' | 'wallet'

export interface Payment {
  id: string
  memberId: string
  memberName: string
  planName: string
  amount: number
  method: PaymentMethod
  status: PaymentStatus
  date: string
}

// ─── Class / Session ──────────────────────────────────────
export type ClassCategory = 'yoga' | 'crossfit' | 'spinning' | 'zumba' | 'pilates' | 'boxing'

export interface GymClass {
  id: string
  name: string
  category: ClassCategory
  trainerId: string
  trainerName: string
  startTime: string        // ISO datetime
  endTime: string
  capacity: number
  enrolled: number
  color: string            // for calendar display
}

// ─── Trainer ──────────────────────────────────────────────
export interface Trainer {
  id: string
  name: string
  specialty: string
  phone: string
  email: string
  avatarColor: string
}

// ─── Dashboard KPIs ───────────────────────────────────────
export interface KpiData {
  todaysSessions: number
  memberGrowth: { month: string; count: number }[]
  planDistribution: { name: string; value: number; color: string }[]
}
