import { Enrollment } from "../../types";

type EnrollMember = { type: "ENROLL_MEMBER"; payloud: Enrollment };
type UnenrollMember = {
  type: "UNENROLL_MEMBER";
  payloud: { classId: string; memberId: string };
};
type localStorage = { type: "LOCAL_STORAGE" };
export type IActionDispatch = EnrollMember | UnenrollMember | localStorage;

export const EnrollmentReducer = (
  stateEnrollment: Enrollment[],
  actionEnrollment: IActionDispatch,
) => {
  switch (actionEnrollment.type) {
    case "ENROLL_MEMBER": {
      let newArr = [...stateEnrollment, actionEnrollment.payloud];
      localStorage.setItem("enrollment", JSON.stringify(newArr));
      return newArr;
    }
    case "UNENROLL_MEMBER": {
      let newArr = stateEnrollment.filter(
        (item) =>
          !(
            item.classId === actionEnrollment.payloud.classId &&
            item.memberId === actionEnrollment.payloud.memberId
          ),
      );
      localStorage.setItem("enrollment", JSON.stringify(newArr));
      return newArr;
    }
    case "LOCAL_STORAGE":
      return JSON.parse(localStorage.getItem("enrollment") || "[]");
    default:
      return stateEnrollment;
  }
};
