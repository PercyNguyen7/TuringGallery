import React from "react";

function DropdownItem({ children, onSelect, isSelected }) {
  return (
    <li>
      <span
        onClick={onSelect}
        className={
          "block px-4 py-2 font-normal hover:bg-gray-200" +
          (isSelected ? " bg-gray-300" : "")
        }
      >
        {children}
      </span>
    </li>
  );
}
export default DropdownItem;
