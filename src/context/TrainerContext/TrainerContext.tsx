import { createContext, Dispatch, ReactNode, useReducer } from "react";
import { TrainerReducer, IActionDispatch } from "./TrainerReducer";
import { MOCK_TRAINERS } from "../../constants/mockData";
import { Trainer } from "../../types";

interface ITrainerContext {
  stateTrainer: Trainer[];
  dispatchTrainer: Dispatch<IActionDispatch>;
}

const TrainerContext = createContext<ITrainerContext | undefined>(undefined);

function TrainerProvider({ children }: { children: ReactNode }) {
  const [stateTrainer, dispatchTrainer] = useReducer(
    TrainerReducer,
    MOCK_TRAINERS,
  );
  return (
    <TrainerContext.Provider value={{ stateTrainer, dispatchTrainer }}>
      {children}
    </TrainerContext.Provider>
  );
}

export { TrainerContext };
export default TrainerProvider;
