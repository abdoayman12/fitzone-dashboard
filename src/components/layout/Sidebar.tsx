import { NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdPeople,
  MdCalendarMonth,
  MdCardMembership,
  MdFitnessCenter,
  MdSportsGymnastics,
} from "react-icons/md";
import { useAddMember } from "../../Hooks/useAddMember";
import { calceDateExpery } from "../../utils/helpers";
import { useEffect } from "react";
import { useAddClass } from "../../Hooks/useAddClass";
import { useEnrollment } from "../../Hooks/useEnrollment";
import { usePlan } from "../../Hooks/usePlan";
import { useTrainer } from "../../Hooks/useTrainer";

type NavItem = {
  label: string;
  path: string;
  icon: React.ReactNode;
};

const mainNav: NavItem[] = [
  { label: "Overview", path: "/dashboard", icon: <MdDashboard size={18} /> },
  { label: "Members", path: "/members", icon: <MdPeople size={18} /> },
  { label: "Classes", path: "/classes", icon: <MdCalendarMonth size={18} /> },
  {
    label: "Trainers",
    path: "/trainers",
    icon: <MdSportsGymnastics size={18} />,
  },
];

const financeNav: NavItem[] = [
  {
    label: "Subscriptions",
    path: "/subscriptions",
    icon: <MdCardMembership size={18} />,
  },
];

const itemStyle = (isActive: boolean): React.CSSProperties => ({
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "9px 12px",
  borderRadius: 8,
  fontSize: 13,
  fontWeight: isActive ? 500 : 400,
  color: isActive ? "var(--color-accent)" : "var(--color-text-secondary)",
  background: isActive ? "var(--color-bg-active)" : "transparent",
  textDecoration: "none",
  marginBottom: 2,
  transition: "all 0.15s",
});

function NavItemLink({ item }: { item: NavItem }) {
  return (
    <NavLink to={item.path} style={({ isActive }) => itemStyle(isActive)}>
      {item.icon}
      <span>{item.label}</span>
    </NavLink>
  );
}

function NavSection({ label, items }: { label: string; items: NavItem[] }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <p
        style={{
          color: "var(--color-text-muted)",
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: "1px",
          fontWeight: 600,
          padding: "12px 20px 4px",
        }}
      >
        {label}
      </p>
      <ul style={{ listStyle: "none", padding: "0 8px", margin: 0 }}>
        {items.map((item) => (
          <li key={item.path}>
            <NavItemLink item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Sidebar() {
  const { stateMember, dispatchMember } = useAddMember();
  const { dispatchClass } = useAddClass();
  const { dispatchEnrollment } = useEnrollment();
  const { dispatchPlan } = usePlan();
  const { dispatchTrainer } = useTrainer();
  setInterval(() => {
    stateMember.forEach((item) => {
      let num = calceDateExpery(item.startDate, item.expiryDate);
      if (num === 100) {
        dispatchMember({ type: "UPD_STATUS_TO_EXPIRED", payloud: item.id });
      } else if (num >= 80 && num < 100) {
        dispatchMember({ type: "UPD_STATUS_TO_EXPIRING", payloud: item.id });
      }
    });
  }, 3600000);

  useEffect(() => {
    stateMember.forEach((item) => {
      let num = calceDateExpery(item.startDate, item.expiryDate);
      if (num === 100) {
        dispatchMember({ type: "UPD_STATUS_TO_EXPIRED", payloud: item.id });
      } else if (num >= 80 && num < 100) {
        dispatchMember({ type: "UPD_STATUS_TO_EXPIRING", payloud: item.id });
      }
    });
  }, []);

  useEffect(() => {
    dispatchMember({ type: "SAVE_MEMBERS_FROM_LOCAL" });
    dispatchClass({ type: "LOCAL_STORAGE" });
    dispatchEnrollment({ type: "LOCAL_STORAGE" });
    dispatchPlan({ type: "LOCAL_STORAGE" });
    dispatchTrainer({ type: "LOCAL_STORAGE" });
  }, []);
  return (
    <aside
      style={{
        width: "var(--sidebar-width)",
        background: "#10131A",
        borderRight: "1px solid var(--color-border)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "20px",
          borderBottom: "1px solid var(--color-border)",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            background: "var(--color-accent)",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MdFitnessCenter size={18} color="#0D0F14" />
        </div>
        <div>
          <p
            style={{
              color: "#fff",
              fontWeight: 600,
              fontSize: 14,
              lineHeight: 1,
              margin: 0,
            }}
          >
            FitZone
          </p>
          <p
            style={{
              color: "var(--color-text-muted)",
              fontSize: 11,
              marginTop: 3,
              margin: 0,
            }}
          >
            Management System
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 0", overflowY: "auto" }}>
        <NavSection label="Main" items={mainNav} />
        <NavSection label="Finance" items={financeNav} />
      </nav>
    </aside>
  );
}
