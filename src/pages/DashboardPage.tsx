import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  MdPeople,
  MdAttachMoney,
  MdFitnessCenter,
  MdWarning,
} from "react-icons/md";
import KpiCard from "../components/common/KpiCard";
import Avatar from "../components/common/Avatar";
import Badge from "../components/common/Badge";
import { MOCK_KPI } from "../constants/mockData";
import {
  calcExpiringSoon,
  calcMonthlyRevenue,
  calcPieChartData,
  formatCurrency,
  formatDate,
  getCurrentYearMonths,
  memberStatusConfig,
  todayClassesFun,
  totalMembers,
} from "../utils/helpers";
import { useAddMember } from "../Hooks/useAddMember";
import { useMemo } from "react";
import { useAddClass } from "../Hooks/useAddClass";
import { usePlan } from "../Hooks/usePlan";

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
const nowDate = new Date();
export default function DashboardPage() {
  const { stateMember } = useAddMember();
  const { statePlan } = usePlan();
  const recentMembers = stateMember.slice(0, 5);
  const { stateClass } = useAddClass();
  const todayClasses = todayClassesFun(stateClass);
  const planDistribution = useMemo(
    () => calcPieChartData(stateMember, statePlan),
    [stateMember, statePlan],
  );
  return (
    <div>
      {/* Greeting */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ color: "#fff", fontSize: 22, fontWeight: 700, margin: 0 }}>
          Good morning 👋
        </h1>
        <p
          style={{
            color: "var(--color-text-muted)",
            fontSize: 13,
            margin: "4px 0 0",
          }}
        >
          Here's what's happening at your gym today.
        </p>
      </div>

      {/* KPI Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 12,
          marginBottom: 20,
        }}
      >
        <KpiCard
          label="Total Members"
          value={totalMembers(stateMember)}
          subColor="var(--color-success)"
          icon={<MdPeople size={18} />}
          accentBorder
        />
        <KpiCard
          label="Monthly Revenue"
          value={formatCurrency(calcMonthlyRevenue(stateMember))}
          subColor="var(--color-success)"
          icon={<MdAttachMoney size={18} />}
        />
        <KpiCard
          label="Today's Sessions"
          value={todayClasses.length}
          icon={<MdFitnessCenter size={18} />}
        />
        <KpiCard
          label="Expiring Soon"
          value={calcExpiringSoon(stateMember)}
          sub="Need renewal"
          subColor="var(--color-danger)"
          accentColor="var(--color-danger)"
          icon={<MdWarning size={18} />}
        />
      </div>

      {/* Charts Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.6fr 1fr",
          gap: 12,
          marginBottom: 20,
        }}
      >
        {/* Bar Chart */}
        <div
          style={{
            background: "#10131A",
            border: "1px solid var(--color-border)",
            borderRadius: 12,
            padding: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <p
              style={{
                color: "var(--color-text-secondary)",
                fontSize: 13,
                fontWeight: 600,
                margin: 0,
              }}
            >
              Member Growth
            </p>
            <span
              style={{
                fontSize: 11,
                color: "var(--color-accent)",
                background: "rgba(232,255,71,0.08)",
                padding: "3px 10px",
                borderRadius: 20,
                border: "1px solid rgba(232,255,71,0.15)",
              }}
            >
              2026
            </span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={getCurrentYearMonths(stateMember)} barSize={16}>
              <XAxis
                dataKey="month"
                tick={{ fill: "#3A4560", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  background: "#161B28",
                  border: "1px solid #1A1E2E",
                  borderRadius: 8,
                  color: "#fff",
                  fontSize: 12,
                }}
                cursor={{ fill: "rgba(255,255,255,0.03)" }}
              />
              <Bar dataKey="count" fill="#E8FF47" radius={[4, 4, 0, 0]}>
                {MOCK_KPI.memberGrowth.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.month === monthNames[nowDate.getMonth()]
                        ? "#E8FF47"
                        : "#1E2535"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div
          style={{
            background: "#10131A",
            border: "1px solid var(--color-border)",
            borderRadius: 12,
            padding: 20,
          }}
        >
          <p
            style={{
              color: "var(--color-text-secondary)",
              fontSize: 13,
              fontWeight: 600,
              margin: "0 0 16px",
            }}
          >
            Subscription Types
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <PieChart width={110} height={110}>
              <Pie
                data={planDistribution}
                cx={55}
                cy={55}
                innerRadius={32}
                outerRadius={50}
                dataKey="value"
                strokeWidth={0}
              >
                {planDistribution.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {planDistribution.map((item) => (
                <div
                  key={item.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 12,
                    color: "var(--color-text-secondary)",
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: item.color,
                      flexShrink: 0,
                    }}
                  />
                  {item.name} —{" "}
                  {Math.floor((item.value * 100) / stateMember.length) || 0}%
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Members Table */}
      <div
        style={{
          background: "#10131A",
          border: "1px solid var(--color-border)",
          borderRadius: 12,
          padding: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <p
            style={{
              color: "var(--color-text-secondary)",
              fontSize: 13,
              fontWeight: 600,
              margin: 0,
            }}
          >
            Recent Members
          </p>
          <a
            href="/members"
            style={{
              fontSize: 11,
              color: "var(--color-accent)",
              textDecoration: "none",
            }}
          >
            View all →
          </a>
        </div>

        {/* Table Header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
            gap: 8,
            padding: "0 8px 10px",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          {["Member", "Plan", "Start", "Expires", "Status"].map((h) => (
            <span
              key={h}
              style={{
                fontSize: 10,
                color: "var(--color-text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.8px",
              }}
            >
              {h}
            </span>
          ))}
        </div>

        {/* Rows */}
        {recentMembers.length === 0 ? (
          <div
            style={{
              padding: 40,
              textAlign: "center",
              color: "var(--color-text-muted)",
              fontSize: 14,
            }}
          >
            No members found.
          </div>
        ) : (
          recentMembers.map((m, i) => {
            const st = memberStatusConfig[m.status];
            return (
              <div
                key={m.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
                  gap: 8,
                  padding: "12px 8px",
                  borderBottom:
                    i < recentMembers.length - 1 ? "1px solid #111520" : "none",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Avatar name={m.name} color={m.avatarColor} size={30} />
                  <div>
                    <p
                      style={{
                        color: "#C8D0E0",
                        fontSize: 13,
                        fontWeight: 500,
                        margin: 0,
                      }}
                    >
                      {m.name}
                    </p>
                    <p
                      style={{
                        color: "var(--color-text-muted)",
                        fontSize: 11,
                        margin: 0,
                      }}
                    >
                      {m.phone}
                    </p>
                  </div>
                </div>
                <span
                  style={{ color: "var(--color-text-secondary)", fontSize: 12 }}
                >
                  {m.planName}
                </span>
                <span
                  style={{ color: "var(--color-text-secondary)", fontSize: 12 }}
                >
                  {formatDate(m.startDate)}
                </span>
                <span
                  style={{ color: "var(--color-text-secondary)", fontSize: 12 }}
                >
                  {formatDate(m.expiryDate)}
                </span>
                <Badge label={st.label} color={st.color} bg={st.bg} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
