import { MOCK_TRAINERS } from "../../constants/mockData";
import { Trainer } from "../../types";

type AddTrainer = { type: "ADD_TRAINER"; payloud: Trainer };
type DeleteTrainer = { type: "DELETE_TRAINER"; payloud: string };
type UpdateTrainer = { type: "UPD_TRAINER"; payloud: Trainer };
type localStorage = { type: "LOCAL_STORAGE" };

export type IActionDispatch =
  | AddTrainer
  | DeleteTrainer
  | UpdateTrainer
  | localStorage;

export const TrainerReducer = (
  stateTrainer: Trainer[],
  actionTrainer: IActionDispatch,
) => {
  switch (actionTrainer.type) {
    case "ADD_TRAINER": {
      let newArr = [...stateTrainer, actionTrainer.payloud];
      localStorage.setItem("trainers", JSON.stringify(newArr));
      return newArr;
    }
    case "DELETE_TRAINER": {
      let newArr = stateTrainer.filter((t) => t.id !== actionTrainer.payloud);
      localStorage.setItem("trainers", JSON.stringify(newArr));
      return newArr;
    }
    case "UPD_TRAINER": {
      let newArr = stateTrainer.map((t) =>
        t.id === actionTrainer.payloud.id ? actionTrainer.payloud : t,
      );
      localStorage.setItem("trainers", JSON.stringify(newArr));
      return newArr;
    }
    case "LOCAL_STORAGE":
      return JSON.parse(
        localStorage.getItem("trainers") || JSON.stringify(MOCK_TRAINERS),
      );
    default:
      return stateTrainer;
  }
};
