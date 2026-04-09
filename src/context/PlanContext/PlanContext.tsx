import { createContext, Dispatch, ReactNode, useReducer } from "react";
import { PlanReducer, IActionDispatch } from "./PlanReducer";
import { MOCK_PLANS } from "../../constants/mockData";
import { Plan } from "../../types";

interface IPlanContext {
  statePlan: Plan[];
  dispatchPlan: Dispatch<IActionDispatch>;
}

const PlanContext = createContext<IPlanContext | undefined>(undefined);

function PlanProvider({ children }: { children: ReactNode }) {
  const [statePlan, dispatchPlan] = useReducer(PlanReducer, MOCK_PLANS);
  return (
    <PlanContext.Provider value={{ statePlan, dispatchPlan }}>
      {children}
    </PlanContext.Provider>
  );
}

export { PlanContext };
export default PlanProvider;
