import { Enrollment } from "../../types";

type EnrollMember = { type: "ENROLL_MEMBER"; payloud: Enrollment };
type UnenrollMember = {
  type: "UNENROLL_MEMBER";
  payloud: { classId: string; memberId: string };
};

export type IActionDispatch = EnrollMember | UnenrollMember;

export const EnrollmentReducer = (
  stateEnrollment: Enrollment[],
  actionEnrollment: IActionDispatch,
) => {
  switch (actionEnrollment.type) {
    case "ENROLL_MEMBER": {
      return [...stateEnrollment, actionEnrollment.payloud];
    }
    case "UNENROLL_MEMBER": {
      return stateEnrollment.filter(
        (item) =>
          !(
            item.classId === actionEnrollment.payloud.classId &&
            item.memberId === actionEnrollment.payloud.memberId
          ),
      );
    }
    default:
      return stateEnrollment;
  }
};
