import { EnrollmentContext } from "../context/EnrollmentContext/EnrollmentContext";
import { useContext } from "react";

export function useEnrollment() {
  const context = useContext(EnrollmentContext);
  if (!context) throw new Error("useEnrollment must be inside EnrollmentProvider");
  return context;
}
