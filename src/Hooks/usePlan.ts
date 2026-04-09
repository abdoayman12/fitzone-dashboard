import { useContext } from "react";
import { PlanContext } from "../context/PlanContext/PlanContext";

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) throw new Error("usePlan must be inside PlanProvider");
  return context;
}
