import { GymClass } from "@/types";

type AddClass = { type: "ADD_CLASS"; payloud: GymClass };

export type IActionDispatch = AddClass;

export const AddClass = (
  stateClass: GymClass[],
  actionClass: IActionDispatch,
) => {
  switch (actionClass.type) {
    case "ADD_CLASS": {
      return [...stateClass, actionClass.payloud];
    }
    default:
      return stateClass;
  }
};
