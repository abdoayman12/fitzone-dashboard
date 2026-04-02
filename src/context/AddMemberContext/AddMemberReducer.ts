import { Member } from "../../types";

type AddMember = { type: "ADD_MEMBER"; payloud: Member };
type DeleteMember = { type: "DELETE_MEMBER"; payloud: string };
type UPDMember = { type: "UPD_MEMBER"; payloud: Member };

export type IActionDispatch = AddMember | DeleteMember | UPDMember;

export const AddMember = (
  stateMember: Member[],
  actionMember: IActionDispatch,
) => {
  switch (actionMember.type) {
    case "ADD_MEMBER": {
      return [...stateMember, actionMember.payloud];
    }
    case "DELETE_MEMBER": {
      return stateMember.filter((item) => item.id !== actionMember.payloud);
    }
    case "UPD_MEMBER": {
      return stateMember.map((item) => {
        if (item.id === actionMember.payloud.id) {
          return actionMember.payloud;
        } else {
          return item;
        }
      });
    }
    default:
      return stateMember;
  }
};
