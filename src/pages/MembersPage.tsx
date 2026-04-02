import { useState } from "react";
import {
  MdSearch,
  MdAdd,
  MdEdit,
  MdDelete,
  MdVisibility,
} from "react-icons/md";
import PageHeader from "../components/common/PageHeader";
import Avatar from "../components/common/Avatar";
import Badge from "../components/common/Badge";
import { formatDate, memberStatusConfig } from "../utils/helpers";
import type { Member, MemberStatus } from "../types";
import FormAddMember from "../components/common/FormAddMember";
import { useAddMember } from "../Hooks/useAddMember";
import DeleteConfirmDialog from "../components/common/DeleteConfirmDialog";
import EditMemberModal from "../components/common/EditMemberModal";
import MemberProfilePanel from "../components/common/MemberProfilePanel";

const STATUS_FILTERS: { label: string; value: MemberStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Expiring", value: "expiring" },
  { label: "Expired", value: "expired" },
];
export default function MembersPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<MemberStatus | "all">("all");
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showDialogDelete, setShowDialogDelete] = useState<
  Member | undefined
  >();
  const [showDialogUPD, setShowDialogUPD] = useState<Member | undefined>();
  const [viewMember, setViewMember] = useState<Member | null>(null);
  const { stateMember } = useAddMember();
  console.log(stateMember);

  const filtered = stateMember.filter((m) => {
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.phone.includes(search);
    const matchFilter = filter === "all" || m.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div>
      <PageHeader
        title="Members"
        subtitle={`${stateMember.length} total members`}
        action={
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "var(--color-accent)",
              color: "#0D0F14",
              border: "none",
              borderRadius: 8,
              padding: "9px 16px",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
            onClick={() => setShowForm(!showForm)}
          >
            <MdAdd size={18} /> Add Member
          </button>
        }
      />

      {/* Stats row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 10,
          marginBottom: 20,
        }}
      >
        {STATUS_FILTERS.filter((f) => f.value !== "all").map((f) => {
          const count = stateMember.filter((m) => m.status === f.value).length;
          const cfg = memberStatusConfig[f.value as MemberStatus];
          return (
            <div
              key={f.value}
              style={{
                background: "#10131A",
                border: "1px solid var(--color-border)",
                borderRadius: 10,
                padding: "14px 16px",
              }}
            >
              <p
                style={{
                  color: "var(--color-text-muted)",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                  margin: "0 0 6px",
                }}
              >
                {f.label}
              </p>
              <p
                style={{
                  color: cfg.color,
                  fontSize: 22,
                  fontWeight: 700,
                  margin: 0,
                }}
              >
                {count}
              </p>
            </div>
          );
        })}
        <div
          style={{
            background: "#10131A",
            border: "1px solid var(--color-border)",
            borderRadius: 10,
            padding: "14px 16px",
          }}
        >
          <p
            style={{
              color: "var(--color-text-muted)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.8px",
              margin: "0 0 6px",
            }}
          >
            Total
          </p>
          <p
            style={{ color: "#fff", fontSize: 22, fontWeight: 700, margin: 0 }}
          >
            {stateMember.length}
          </p>
        </div>
      </div>

      {/* Search + Filter bar */}
      <div
        style={{
          display: "flex",
          gap: 10,
          marginBottom: 16,
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "#10131A",
            border: "1px solid var(--color-border)",
            borderRadius: 8,
            padding: "8px 14px",
            flex: 1,
          }}
        >
          <MdSearch size={16} color="var(--color-text-muted)" />
          <input
            placeholder="Search by name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              background: "none",
              border: "none",
              outline: "none",
              color: "var(--color-text-secondary)",
              fontSize: 13,
              width: "100%",
            }}
          />
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              style={{
                padding: "7px 14px",
                borderRadius: 8,
                fontSize: 12,
                cursor: "pointer",
                border:
                  filter === f.value
                    ? "1px solid var(--color-accent)"
                    : "1px solid var(--color-border)",
                background:
                  filter === f.value ? "rgba(232,255,71,0.08)" : "#10131A",
                color:
                  filter === f.value
                    ? "var(--color-accent)"
                    : "var(--color-text-secondary)",
                fontWeight: filter === f.value ? 500 : 400,
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div
        style={{
          background: "#10131A",
          border: "1px solid var(--color-border)",
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2.2fr 1fr 1fr 1fr 0.8fr 0.6fr",
            gap: 8,
            padding: "12px 20px",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          {[
            "Member",
            "Plan",
            "Start Date",
            "Expiry Date",
            "Status",
            "Actions",
          ].map((h) => (
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

        {filtered.length === 0 ? (
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
          filtered.map((m, i) => {
            const st = memberStatusConfig[m.status];
            return (
              <div
                key={m.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2.2fr 1fr 1fr 1fr 0.8fr 0.6fr",
                  gap: 8,
                  padding: "14px 20px",
                  alignItems: "center",
                  borderBottom:
                    i < filtered.length - 1 ? "1px solid #111520" : "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Avatar name={m.name} color={m.avatarColor} size={34} />
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
                      {m.email}
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
                <div style={{ display: "flex", gap: 4 }}>
                  {[
                    { icon: MdVisibility, fun: () => setViewMember(m) },
                    { icon: MdEdit, fun: () => setShowDialogUPD(m) },
                    { icon: MdDelete, fun: () => setShowDialogDelete(m) },
                  ].map((btn, idx) => (
                    <button
                      key={idx}
                      onClick={btn.fun}
                      style={{
                        width: 28,
                        height: 28,
                        background: "var(--color-bg-hover)",
                        border: "1px solid var(--color-border)",
                        borderRadius: 6,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                      <btn.icon size={14} color="var(--color-text-secondary)" />
                    </button>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
      {showForm ? (
        <div className="fixed flex items-center justify-center inset-0 z-99" onClick={() => setShowForm(false)}>
          {/* layout */}
          <div className="absolute bg-black/50 w-full h-full backdrop-blur-sm z-99" />
          <FormAddMember close={() => setShowForm(false)} />
        </div>
      ) : (
        ""
      )}
      {showDialogUPD && (
        <div className="fixed flex items-center justify-center inset-0 z-99" onClick={() => setShowDialogUPD(undefined)}>
          {/* layout */}
          <div className="absolute bg-black/50 w-full h-full backdrop-blur-sm z-99" />
          <EditMemberModal
            member={showDialogUPD}
            close={() => setShowDialogUPD(undefined)}
          />
        </div>
      )}
      {showDialogDelete && (
        <DeleteConfirmDialog
          member={showDialogDelete}
          onCancel={() => setShowDialogDelete(undefined)}
        />
      )}
      {viewMember && (
        <MemberProfilePanel
          member={viewMember}
          onClose={() => setViewMember(null)}
          onEdit={() => {
            setViewMember(null);
            setShowDialogUPD(viewMember); // بيفتح الـ EditModal
          }}
        />
      )}
    </div>
  );
}
