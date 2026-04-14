import { GymClass } from "@/types";

type AddClass = { type: "ADD_CLASS"; payloud: GymClass };
type DelClass = { type: "DELETE_CLASS"; payloud: string };
type UPDClass = { type: "UPD_CLASS"; payloud: GymClass };
type AddEnrolled = { type: "ADD_ENROLLED"; payloud: string };
type DelEnrolled = { type: "DEL_ENROLLED"; payloud: string };
type localStorage = { type: "LOCAL_STORAGE" };

export type IActionDispatch =
  | AddClass
  | DelClass
  | UPDClass
  | AddEnrolled
  | DelEnrolled
  | localStorage;

export const AddClass = (
  stateClass: GymClass[],
  actionClass: IActionDispatch,
) => {
  switch (actionClass.type) {
    case "ADD_CLASS": {
      let newArr = [...stateClass, actionClass.payloud];
      localStorage.setItem("classes", JSON.stringify(newArr));
      return newArr;
    }
    case "DELETE_CLASS": {
      let newArr = stateClass.filter((cls) => cls.id !== actionClass.payloud);
      localStorage.setItem("classes", JSON.stringify(newArr));
      return newArr;
    }
    case "UPD_CLASS": {
      let newArr = stateClass.map((cls) =>
        cls.id === actionClass.payloud.id ? actionClass.payloud : cls,
      );
      localStorage.setItem("classes", JSON.stringify(newArr));
      return newArr;
    }
    case "ADD_ENROLLED": {
      let newArr = stateClass.map((item) => {
        if (item.id === actionClass.payloud) {
          return { ...item, enrolled: item.enrolled++ };
        } else {
          return item;
        }
      });
      localStorage.setItem("classes", JSON.stringify(newArr));
      return newArr;
    }
    case "DEL_ENROLLED": {
      let newArr = stateClass.map((item) => {
        if (item.id === actionClass.payloud) {
          return { ...item, enrolled: item.enrolled-- };
        } else {
          return item;
        }
      });
      localStorage.setItem("classes", JSON.stringify(newArr));
      return newArr;
    }
    case "LOCAL_STORAGE":
      return JSON.parse(localStorage.getItem("classes") || "[]");
    default:
      return stateClass;
  }
};
