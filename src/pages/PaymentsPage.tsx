import { MdCreditCard, MdMoney, MdAccountBalanceWallet, MdFileDownload } from 'react-icons/md'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts'
import PageHeader from '../components/common/PageHeader'
import KpiCard from '../components/common/KpiCard'
import Badge from '../components/common/Badge'
import Avatar from '../components/common/Avatar'
import { MOCK_PAYMENTS, MOCK_MEMBERS, MOCK_KPI } from '../constants/mockData'
import { formatDate, formatCurrency, paymentStatusConfig } from '../utils/helpers'
import type { PaymentMethod } from '../types'

const methodIcon: Record<PaymentMethod, JSX.Element> = {
  cash:   <MdMoney size={14} color="#4ADE80" />,
  card:   <MdCreditCard size={14} color="#378ADD" />,
  wallet: <MdAccountBalanceWallet size={14} color="#FBBF24" />,
}

const totalRevenue  = MOCK_PAYMENTS.filter(p => p.status === 'paid').reduce((s, p) => s + p.amount, 0)
const totalPending  = MOCK_PAYMENTS.filter(p => p.status !== 'paid').reduce((s, p) => s + p.amount, 0)

export default function PaymentsPage() {
  const memberMap = Object.fromEntries(MOCK_MEMBERS.map(m => [m.id, m]))

  return (
    <div>
      <PageHeader title="Payments & Revenue" subtitle="Track all transactions and revenue" />

      {/* KPI Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
        <KpiCard label="Total Revenue"      value={formatCurrency(totalRevenue)}  sub="This month" subColor="var(--color-success)"   accentBorder />
        <KpiCard label="Pending / Overdue"  value={formatCurrency(totalPending)}  sub="Awaiting payment" subColor="var(--color-warning)" accentColor="var(--color-warning)" />
        <KpiCard label="Transactions"       value={MOCK_PAYMENTS.length}          sub="All time" />
      </div>

      {/* Bar chart */}
      <div style={{ background: '#10131A', border: '1px solid var(--color-border)', borderRadius: 12, padding: 20, marginBottom: 20 }}>
        <p style={{ color: 'var(--color-text-secondary)', fontWeight: 600, fontSize: 13, margin: '0 0 16px' }}>Monthly Revenue</p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={MOCK_KPI.memberGrowth.map(m => ({ month: m.month, revenue: m.count * 38 }))} barSize={18}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1A1E2E" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: '#3A4560', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#3A4560', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: '#161B28', border: '1px solid #1A1E2E', borderRadius: 8, color: '#fff', fontSize: 12 }} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
            <Bar dataKey="revenue" fill="#E8FF47" radius={[4, 4, 0, 0]} opacity={0.85} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Payments Table */}
      <div style={{ background: '#10131A', border: '1px solid var(--color-border)', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)' }}>
          <p style={{ color: 'var(--color-text-secondary)', fontWeight: 600, fontSize: 13, margin: 0 }}>All Transactions</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 0.8fr 0.5fr', gap: 8, padding: '10px 20px', borderBottom: '1px solid var(--color-border)' }}>
          {['Member', 'Plan', 'Amount', 'Method', 'Status', ''].map((h) => (
            <span key={h} style={{ fontSize: 10, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{h}</span>
          ))}
        </div>

        {MOCK_PAYMENTS.map((p, i) => {
          const member = memberMap[p.memberId]
          const st     = paymentStatusConfig[p.status]
          return (
            <div key={p.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 0.8fr 0.5fr', gap: 8, padding: '13px 20px', alignItems: 'center', borderBottom: i < MOCK_PAYMENTS.length - 1 ? '1px solid #111520' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {member && <Avatar name={member.name} color={member.avatarColor} size={30} />}
                <div>
                  <p style={{ color: '#C8D0E0', fontSize: 13, fontWeight: 500, margin: 0 }}>{p.memberName}</p>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: 11, margin: 0 }}>{formatDate(p.date)}</p>
                </div>
              </div>
              <span style={{ color: 'var(--color-text-secondary)', fontSize: 12 }}>{p.planName}</span>
              <span style={{ color: '#fff', fontSize: 13, fontWeight: 500 }}>{p.amount.toLocaleString()} EGP</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                {methodIcon[p.method]}
                <span style={{ color: 'var(--color-text-secondary)', fontSize: 12, textTransform: 'capitalize' }}>{p.method}</span>
              </div>
              <Badge label={st.label} color={st.color} bg={st.bg} />
              <button style={{ width: 28, height: 28, background: 'var(--color-bg-hover)', border: '1px solid var(--color-border)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <MdFileDownload size={14} color="var(--color-text-secondary)" />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
