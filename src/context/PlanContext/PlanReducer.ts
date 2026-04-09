import { Plan } from "../../types";

type AddPlan = { type: "ADD_PLAN"; payloud: Plan };
type UpdatePlan = { type: "UPD_PLAN"; payloud: Plan };
type DeletePlan = { type: "DELETE_PLAN"; payloud: string };

export type IActionDispatch = AddPlan | UpdatePlan | DeletePlan;

export const PlanReducer = (statePlan: Plan[], actionPlan: IActionDispatch) => {
  switch (actionPlan.type) {
    case "ADD_PLAN": {
      return [...statePlan, actionPlan.payloud];
    }
    case "UPD_PLAN": {
      return statePlan.map((item) =>
        item.id === actionPlan.payloud.id ? actionPlan.payloud : item,
      );
    }
    case "DELETE_PLAN": {
      return statePlan.filter((item) => item.id !== actionPlan.payloud);
    }
    default:
      return statePlan;
  }
};
