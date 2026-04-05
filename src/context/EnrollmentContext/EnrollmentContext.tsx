// context/EnrollmentContext/EnrollmentContext.tsx
import { Enrollment } from "../../types";
import { createContext, Dispatch, ReactNode, useReducer } from "react";
import { EnrollmentReducer, IActionDispatch } from "./EnrollmentReducer";

interface IEnrollmentContext {
  stateEnrollment: Enrollment[];
  dispatchEnrollment: Dispatch<IActionDispatch>;
}

const initialState: Enrollment[] = [];

const EnrollmentContext = createContext<IEnrollmentContext | undefined>(
  undefined,
);

function EnrollmentProvider({ children }: { children: ReactNode }) {
  const [stateEnrollment, dispatchEnrollment] = useReducer(
    EnrollmentReducer,
    initialState,
  );
  return (
    <EnrollmentContext.Provider value={{ stateEnrollment, dispatchEnrollment }}>
      {children}
    </EnrollmentContext.Provider>
  );
}

export { EnrollmentContext };
export default EnrollmentProvider;
