import { Trainer } from "../../types";

type AddTrainer = { type: "ADD_TRAINER"; payloud: Trainer };
type DeleteTrainer = { type: "DELETE_TRAINER"; payloud: string };
type UpdateTrainer = { type: "UPD_TRAINER"; payloud: Trainer };

export type IActionDispatch = AddTrainer | DeleteTrainer | UpdateTrainer;

export const TrainerReducer = (
  stateTrainer: Trainer[],
  actionTrainer: IActionDispatch,
) => {
  switch (actionTrainer.type) {
    case "ADD_TRAINER":
      return [...stateTrainer, actionTrainer.payloud];
    case "DELETE_TRAINER":
      return stateTrainer.filter((t) => t.id !== actionTrainer.payloud);
    case "UPD_TRAINER":
      return stateTrainer.map((t) =>
        t.id === actionTrainer.payloud.id ? actionTrainer.payloud : t,
      );
    default:
      return stateTrainer;
  }
};
