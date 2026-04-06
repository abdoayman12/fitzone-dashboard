import { useContext } from "react";
import { TrainerContext } from "../context/TrainerContext/TrainerContext";

export function useTrainer() {
  const context = useContext(TrainerContext);
  if (!context) throw new Error("useTrainer must be inside TrainerProvider");
  return context;
}
