import { AddMemberContext } from "../context/AddMemberContext/AddMemberContext";
import { useContext } from "react";

export const useAddMember = () => {
    const context = useContext(AddMemberContext);
    if (!context) {
        throw new Error("useAddMember must be used within a useAddMember");
    }
    return context;
}