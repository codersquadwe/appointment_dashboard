"use client";
import React, { useState } from "react";

const SelectGroupTwo: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  return (
    <div>
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        Select Country
      </label>

      <div className="relative z-20 bg-white dark:bg-form-input">
        <select
          value={selectedOption}
          onChange={(e) => {
            setSelectedOption(e.target.value);
            changeTextColor();
          }}
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-12 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
            isOptionSelected ? "text-black dark:text-white" : ""
          }`}
        >
          <option value="" disabled className="text-body dark:text-bodydark">
            Select Country
          </option>
          <option value="USA" className="text-body dark:text-bodydark">
            USA
          </option>
          <option value="UK" className="text-body dark:text-bodydark">
            UK
          </option>
          <option value="Canada" className="text-body dark:text-bodydark">
            Canada
          </option>
        </select>

        <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
          <IoIosArrowDown />
        </span>
      </div>
    </div>
  );
};

export default SelectGroupTwo;
