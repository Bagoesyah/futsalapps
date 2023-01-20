import React from "react";

const Input = (props) => {
  const {
    type,
    className,
    placeholder,
    name,
    onChange,
    padding,
    refInput,
    onClick,
    defaultValue,
  } = props;
  return (
    <input
      type={`${type || "text"}`}
      onChange={onChange || null}
      name={name || ""}
      ref={refInput}
      onClick={onClick || null}
      defaultValue={defaultValue || ""}
      className={`ring-[1px] ring-black/50 ${
        padding || ""
      } outline-none rounded-md ${className || ""}`}
      placeholder={`${placeholder || ""}`}
    />
  );
};

export default Input;
