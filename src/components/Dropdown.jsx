import React, { useState, Component } from "react";
import DropdownItem from "./DropdownItem";
import { capitalizeWord } from "../other/utilities";
export default function Dropdown({ type, children, currentSort }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  function handleClick(e) {
    setDropdownOpen((open) => !open);
  }

  return (
    <div className=" bg-[#F6F6F6] rounded-full py-1 px-2 w-max my-2 shadow-xl/15 shadow-[#757969] border-[#959987]">
      <span className="inter-medium uppercase text-[#5C4E41]">
        {type === "ai" && "AI"}
        {type === "human" && "HUMAN"}
        {type === "content" && "CONTENT"}
        {type === "result" && "SORT"}
      </span>
      <button
        onClick={handleClick}
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className=" bg-[#899481] hover:bg-[#9eac95] focus:bg-[#9eac95] text-lg focus:outline-hidden  font-medium rounded-full px-2 pb-1 pt-0.5 ml-1 text-center inline-flex items-center cursor-pointer"
        type="button"
        onBlur={() => {
          setDropdownOpen(false);
        }}
      >
        <span className="text-[#F6F6F6]"> {capitalizeWord(currentSort)}</span>

        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      <div
        className={
          "absolute z-10 bg-[#F6F6F6] divide-y divide-gray-100 rounded-xl shadow-sm w-44   hover:block " +
          (dropdownOpen ? "" : "hidden")
        }
      >
        <ul
          className="py-2 text-sm text-[#5C4E41]"
          aria-labelledby="dropdownDefaultButton"
        >
          <li>
            <div className="block px-4 py-2 nunito-sans-light uppercase text-black">
              <span className="">
                {type === "ai" && "AI Sort By"}
                {type === "human" && "Human Sort By"}
                {type === "content" && "Content Type"}
                {type === "result" && "Sort By"}
              </span>
            </div>
          </li>

          {children}
        </ul>
      </div>
    </div>
  );
}
