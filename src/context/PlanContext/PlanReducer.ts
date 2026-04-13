import { MOCK_PLANS } from "../../constants/mockData";
import { Plan } from "../../types";

type AddPlan = { type: "ADD_PLAN"; payloud: Plan };
type UpdatePlan = { type: "UPD_PLAN"; payloud: Plan };
type DeletePlan = { type: "DELETE_PLAN"; payloud: string };
type localStorage = { type: "LOCAL_STORAGE" };

export type IActionDispatch = AddPlan | UpdatePlan | DeletePlan | localStorage;

export const PlanReducer = (statePlan: Plan[], actionPlan: IActionDispatch) => {
  switch (actionPlan.type) {
    case "ADD_PLAN": {
      let newArr = [...statePlan, actionPlan.payloud];
      localStorage.setItem("plans", JSON.stringify(newArr));
      return newArr;
    }
    case "UPD_PLAN": {
      let newArr = statePlan.map((item) =>
        item.id === actionPlan.payloud.id ? actionPlan.payloud : item,
      );
      localStorage.setItem("plans", JSON.stringify(newArr));
      return newArr;
    }
    case "DELETE_PLAN": {
      let newArr = statePlan.filter((item) => item.id !== actionPlan.payloud);
      localStorage.setItem("plans", JSON.stringify(newArr));
      return newArr;
    }
    case "LOCAL_STORAGE":
      return JSON.parse(
        localStorage.getItem("plans") || JSON.stringify(MOCK_PLANS),
      );
    default:
      return statePlan;
  }
};
