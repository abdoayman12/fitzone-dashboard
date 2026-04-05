import { GymClass } from "@/types";

type AddClass = { type: "ADD_CLASS"; payloud: GymClass };
type AddEnrolled = { type: "ADD_ENROLLED"; payloud: string };
type DelEnrolled = { type: "DEL_ENROLLED"; payloud: string };

export type IActionDispatch = AddClass | AddEnrolled | DelEnrolled;

export const AddClass = (
  stateClass: GymClass[],
  actionClass: IActionDispatch,
) => {
  switch (actionClass.type) {
    case "ADD_CLASS": {
      return [...stateClass, actionClass.payloud];
    }
    case "ADD_ENROLLED": {
      return stateClass.map((item) => {
        if (item.id === actionClass.payloud) {
          return { ...item, enrolled: item.enrolled++ };
        } else {
          return item;
        }
      });
    }
    case "DEL_ENROLLED": {
      return stateClass.map((item) => {
        if (item.id === actionClass.payloud) {
          return { ...item, enrolled: item.enrolled-- };
        } else {
          return item;
        }
      });
    }
    default:
      return stateClass;
  }
};
