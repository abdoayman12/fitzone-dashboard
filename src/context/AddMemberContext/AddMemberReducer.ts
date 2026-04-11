import { calceDateExpery } from "../../utils/helpers";
import { Member } from "../../types";

type AddMember = { type: "ADD_MEMBER"; payloud: Member };
type DeleteMember = { type: "DELETE_MEMBER"; payloud: string };
type UPDMember = { type: "UPD_MEMBER"; payloud: Member };
type UPDStatus = { type: "UPD_STATUS"; payloud: string };

export type IActionDispatch = AddMember | DeleteMember | UPDMember | UPDStatus;

export const AddMember = (
  stateMember: Member[],
  actionMember: IActionDispatch,
) => {
  switch (actionMember.type) {
    case "ADD_MEMBER": {
      let num = calceDateExpery(
        actionMember.payloud.startDate,
        actionMember.payloud.expiryDate,
      );
      if (num === 100) {
        return [...stateMember, { ...actionMember.payloud, status: "expired" }];
      } else if (num >= 80 && num < 100) {
        return [
          ...stateMember,
          { ...actionMember.payloud, status: "expiring" },
        ];
      } else {
        return [...stateMember, actionMember.payloud];
      }
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
    case "UPD_STATUS": {
      return stateMember.map((item) => {
        if (item.id === actionMember.payloud) {
          return { ...item, status: "expired" };
        } else {
          return item;
        }
      });
    }
    default:
      return stateMember;
  }
};
