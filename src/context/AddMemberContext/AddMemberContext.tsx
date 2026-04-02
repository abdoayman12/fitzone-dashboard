import { Member } from "../../types";
import { createContext, Dispatch, ReactNode, useReducer } from "react";
import { AddMember, IActionDispatch } from "./AddMemberReducer";

interface IAddMemberContext {
  stateMember: Member[];
  dispatchMember: Dispatch<IActionDispatch>;
}
const initialState: Member[] = [];

const AddMemberContext = createContext<IAddMemberContext | undefined>(
  undefined,
);

function AddMemberProvider({ children }: { children: ReactNode }) {
  const [ stateMember, dispatchMember ] = useReducer(AddMember, initialState);
  return (
    <AddMemberContext.Provider value={{ stateMember, dispatchMember }}>
      {children}
    </AddMemberContext.Provider>
  );
}

export { AddMemberContext }
export default AddMemberProvider;
