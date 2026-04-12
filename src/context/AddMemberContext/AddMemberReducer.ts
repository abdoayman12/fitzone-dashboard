import { calceDateExpery } from "../../utils/helpers";
import { Member } from "../../types";

type AddMember = { type: "ADD_MEMBER"; payloud: Member };
type DeleteMember = { type: "DELETE_MEMBER"; payloud: string };
type UPDMember = { type: "UPD_MEMBER"; payloud: Member };
type UPDStatusExpired = { type: "UPD_STATUS_TO_EXPIRED"; payloud: string };
type UPDStatusExpiring = { type: "UPD_STATUS_TO_EXPIRING"; payloud: string };
type SaveMembersFromLocal = { type: "SAVE_MEMBERS_FROM_LOCAL" };

export type IActionDispatch =
  | AddMember
  | DeleteMember
  | UPDMember
  | UPDStatusExpired
  | UPDStatusExpiring
  | SaveMembersFromLocal;

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
        let newArr = [
          ...stateMember,
          { ...actionMember.payloud, status: "expired" },
        ];
        localStorage.setItem("members", JSON.stringify(newArr));
        return newArr;
      } else if (num >= 80 && num < 100) {
        let newArr = [
          ...stateMember,
          { ...actionMember.payloud, status: "expiring" },
        ];
        localStorage.setItem("members", JSON.stringify(newArr));
        return newArr;
      } else {
        let newArr = [...stateMember, actionMember.payloud];
        localStorage.setItem("members", JSON.stringify(newArr));
        return newArr;
      }
    }
    case "DELETE_MEMBER": {
      let newArr = stateMember.filter(
        (item) => item.id !== actionMember.payloud,
      );
      localStorage.setItem("members", JSON.stringify(newArr));
      return newArr;
    }
    case "UPD_MEMBER": {
      let newArr = stateMember.map((item) => {
        if (item.id === actionMember.payloud.id) {
          return actionMember.payloud;
        } else {
          return item;
        }
      });
      localStorage.setItem("members", JSON.stringify(newArr));
      return newArr;
    }
    case "UPD_STATUS_TO_EXPIRED": {
      let newArr = stateMember.map((item) => {
        if (item.id === actionMember.payloud) {
          return { ...item, status: "expired" };
        } else {
          return item;
        }
      });
      localStorage.setItem("members", JSON.stringify(newArr));
      return newArr;
    }
    case "UPD_STATUS_TO_EXPIRING": {
      let newArr = stateMember.map((item) => {
        if (item.id === actionMember.payloud) {
          return { ...item, status: "expiring" };
        } else {
          return item;
        }
      });
      localStorage.setItem("members", JSON.stringify(newArr));
      return newArr;
    }
    case "SAVE_MEMBERS_FROM_LOCAL":
      return JSON.parse(localStorage.getItem("members") ?? "[]");
    default:
      return stateMember;
  }
};
