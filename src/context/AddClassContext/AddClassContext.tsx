import { GymClass } from "../../types";
import { createContext, Dispatch, ReactNode, useReducer } from "react";
import { MOCK_CLASSES } from "../../constants/mockData";
import { AddClass, IActionDispatch } from "./AddClassReducer";

interface IAddClassContext {
  stateClass: GymClass[];
  dispatchClass: Dispatch<IActionDispatch>;
}

const AddClassContext = createContext<IAddClassContext | undefined>(undefined);

function AddClassProvider({ children }: { children: ReactNode }) {
  const [stateClass, dispatchClass] = useReducer(AddClass, MOCK_CLASSES);
  return (
    <AddClassContext.Provider value={{ stateClass, dispatchClass }}>
      {children}
    </AddClassContext.Provider>
  );
}

export { AddClassContext };
export default AddClassProvider;
