import { ReactNode } from "react";

function InputAddMember({
  type,
  placeholder,
  label,
  icon,
  name,
  required = false
}: {
  type: string;
  placeholder: string;
  label: string;
  icon?: ReactNode;
  name: string;
  required?: boolean
}) {
  return (
    <div className="flex flex-col gap-2 flex-1 relative">
      <label htmlFor={name} className="flex gap-1.5 items-center text-(--color-text-muted) font-bold">{label} {required ? <span style={{ color: "#E8FF47" }}>*</span> : ''}</label>
      <span className="absolute text-gray-400 bottom-2.5 ml-3">
        {icon}
      </span>
      <input className="bg-[#0D0F14] py-1.5 px-8 cursor-pointer text-white rounded-lg outline-none border border-(--color-border)" type={type} placeholder={placeholder} id={name} name={name} required={required}/>
    </div>
  );
}

export default InputAddMember;
