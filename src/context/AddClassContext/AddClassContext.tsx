import { GymClass } from "../../types";
import { createContext, Dispatch, ReactNode, useReducer } from "react";
import { AddClass, IActionDispatch } from "./AddClassReducer";

interface IAddClassContext {
  stateClass: GymClass[];
  dispatchClass: Dispatch<IActionDispatch>;
}

const AddClassContext = createContext<IAddClassContext | undefined>(undefined);

function AddClassProvider({ children }: { children: ReactNode }) {
  const [stateClass, dispatchClass] = useReducer(AddClass, []);
  return (
    <AddClassContext.Provider value={{ stateClass, dispatchClass }}>
      {children}
    </AddClassContext.Provider>
  );
}

export { AddClassContext };
export default AddClassProvider;
