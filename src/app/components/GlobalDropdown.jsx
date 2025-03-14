import React, { useState, useEffect, useRef } from "react";

const GlobalDropdown = ({
  options = [], // Array of objects with { id, name }
  label = "Select",
  icon = null,
  mainLabel = "Select",
  value = "", // The selected value's name
  onChange = () => {}, // Callback to pass selected option (object)
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Handle option selection
  const handleSelectOption = (option) => {
    onChange(option); // Pass the selected option object to the parent component
    setIsOpen(false); // Close the dropdown after selection
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left w-full">
      {/* Dropdown button */}
      <button
        type="button"
        onClick={toggleDropdown}
        className="flex items-center justify-between px-5 py-4 text-gray-700 border border-[#000000] rounded-lg hover:bg-gray-50 focus:outline-none w-full relative z-10"
      >
        {/* Main Label */}
        <label className="absolute bg-white -top-3 left-3 lg:left-2 text-[#00000066] font-14 font-normal px-3">
          {mainLabel}
        </label>

        {/* Icon if passed */}
        {icon && <span className="mr-2">{icon}</span>}

        {/* Display selected value or placeholder */}
        <span className="font-16 font-medium leading-5">
          {value ? value : label}
        </span>

        {/* Dropdown Arrow */}
        <svg
          className={`w-4 h-4 ml-2 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className="absolute right-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-20"
          style={{ top: "100%" }}
        >
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.id} // Use unique key based on ID
                onClick={() => handleSelectOption(option)} // Pass the full object
                className="block w-full font-16 font-medium leading-5 border-b border-[#00000033] px-5 py-4 text-left text-gray-700 hover:bg-gray-100 focus:outline-none"
              >
                {option.name} {/* Render the name */}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalDropdown;
