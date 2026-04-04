import { AddClassContext } from "../context/AddClassContext/AddClassContext";
import { useContext } from "react";

export const useAddClass = () => {
  const context = useContext(AddClassContext);
  if (!context) {
    throw new Error("useAddClass must be used within a useAddClass");
  }
  return context;
};
