import { useAddClass } from "../Hooks/useAddClass";
import PageHeader from "../components/common/PageHeader";
import TrainerCard from "../components/common/TrainerCard";
import { useTrainer } from "../Hooks/useTrainer";
import { MdAdd, MdSearch } from "react-icons/md";
import { todayClassesFun } from "../utils/helpers";
import { useState } from "react";
import AddTrainerModal from "../components/common/AddTrainerModal";

const styles = {
  addBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "#E8FF47",
    border: "none",
    borderRadius: 8,
    padding: "9px 18px",
    color: "#0D0F14",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
  } as React.CSSProperties,
  kpiRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: 12,
    marginBottom: 20,
  } as React.CSSProperties,
  kpi: {
    background: "#10131A",
    border: "1px solid #1A1E2E",
    borderRadius: 10,
    padding: "14px 18px",
  } as React.CSSProperties,
  kpiLbl: {
    fontSize: 10,
    fontWeight: 700,
    color: "#3A4560",
    textTransform: "uppercase" as const,
    letterSpacing: ".8px",
    marginBottom: 6,
  },
  kpiVal: {
    fontSize: 24,
    fontWeight: 700,
    color: "#fff",
    letterSpacing: "-.5px",
  },
  kpiSub: { fontSize: 11, color: "#3A4560", marginTop: 3 },
  bar: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 18,
  } as React.CSSProperties,
  search: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "#10131A",
    border: "1px solid #1A1E2E",
    borderRadius: 8,
    padding: "7px 12px",
    flex: 1,
  } as React.CSSProperties,
  searchInput: {
    background: "none",
    border: "none",
    outline: "none",
    color: "#8A9AB5",
    fontSize: 13,
    width: "100%",
  } as React.CSSProperties,
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    gap: 14,
  } as React.CSSProperties,
};

export default function TrainersPage() {
  const [filter, setFilter] = useState("All");
  const [searchInput, setSearchInput] = useState("");
  const [showTrainerModal, setShowTrainerModal] = useState(false);
  const { stateTrainer } = useTrainer();
  const { stateClass } = useAddClass();
  const todayClasses = todayClassesFun(stateClass);
  const totalEnrolled = todayClasses.reduce(
    (total, item) => total + item.enrolled,
    0,
  );
  const filterTrainers = stateTrainer.filter((item) => {
    let filterItem = filter === "All" ? true : item.specialty.includes(filter);
    let searchItem = item.name
      .toLowerCase()
      .includes(searchInput.toLowerCase());
    return filterItem && searchItem;
  });
  return (
    <div>
      {/* ── Page Header ── */}
      <PageHeader
        title="Trainers"
        subtitle="Manage your gym trainers and their schedules"
        action={
          <button
            style={styles.addBtn}
            onClick={() => setShowTrainerModal(true)}
          >
            <MdAdd size={15} color="#0D0F14" />
            Add Trainer
          </button>
        }
      />
      {/* ── KPI Row ── */}
      <div style={styles.kpiRow}>
        <div style={styles.kpi}>
          <p style={styles.kpiLbl}>Total Trainers</p>
          <p style={styles.kpiVal}>{stateTrainer.length}</p>
          <p style={styles.kpiSub}>All active</p>
        </div>
        <div style={styles.kpi}>
          <p style={styles.kpiLbl}>Classes Today</p>
          <p style={styles.kpiVal}>{todayClasses.length}</p>
          {/* هتحسبها من الـ stateClass */}
          <p style={styles.kpiSub}>Across all trainers</p>
        </div>
        <div style={styles.kpi}>
          <p style={styles.kpiLbl}>Total Enrolled</p>
          <p style={{ ...styles.kpiVal, color: "#E8FF47" }}>{totalEnrolled}</p>
          {/* من الـ stateEnrollment */}
          <p style={styles.kpiSub}>In today's classes</p>
        </div>
      </div>

      {/* ── Search + Filter ── */}
      <div style={styles.bar}>
        <div style={styles.search}>
          <MdSearch size={14} color="#3A4560" />
          <input
            placeholder="Search trainers..."
            style={styles.searchInput}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        {["All", "Yoga", "CrossFit", "Spinning", "Boxing"].map((f) => (
          <div
            key={f}
            style={{
              padding: "6px 14px",
              borderRadius: 20,
              fontSize: 12,
              cursor: "pointer",
              border:
                filter === f
                  ? "1px solid var(--color-accent)"
                  : "1px solid var(--color-border)",
              background: filter === f ? "rgba(232,255,71,0.08)" : "#10131A",
              color:
                filter === f
                  ? "var(--color-accent)"
                  : "var(--color-text-secondary)",
              fontWeight: filter === f ? 500 : 400,
            }}
            onClick={() => setFilter(f)}
          >
            {f}
          </div>
        ))}
      </div>

      {/* ── Trainers Grid ── */}
      <div style={styles.grid}>
        {filterTrainers.map((trainer) => {
          const ClassesThisTrainer = stateClass.filter(
            (item) => item.trainerId === trainer.id,
          );
          const todayClassesThisTrainer = todayClassesFun(ClassesThisTrainer);
          const totalEnrolled = todayClassesThisTrainer.reduce(
            (total, item) => total + item.enrolled,
            0,
          );
          return (
            <TrainerCard
              key={trainer.id}
              trainer={trainer}
              todayClasses={todayClassesThisTrainer}
              weekClasses={ClassesThisTrainer}
              enrolledCount={totalEnrolled}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          );
        })}
      </div>
      {showTrainerModal ? (
        <AddTrainerModal onClose={() => setShowTrainerModal(false)} />
      ) : (
        ""
      )}
    </div>
  );
}
