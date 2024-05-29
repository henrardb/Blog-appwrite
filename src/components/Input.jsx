import React, { forwardRef, useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && <label htmlFor={id}>{label}</label>}
      <input type={type} ref={ref} className={className} {...props} id={id} />
    </div>
  );
});

export default Input;
