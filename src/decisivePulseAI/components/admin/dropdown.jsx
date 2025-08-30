import React, { useState, useEffect, useRef } from "react";

const Dropdown = ({ data, dropdownHandle1, selectedFormat }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(selectedFormat||"Select option");
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    // Pass the selected option to the parent component
    dropdownHandle1(option);
  };

  useEffect(() => {
    // Add event listener for clicks on the whole document
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative inline-block text-left max-sm:w-full"
      ref={dropdownRef}
    >
      {/* Dropdown button */}
      <div className="max-sm:w-full">
        <button
          id="dropdownButton"
          className="inline-flex sm:min-w-[200px]  max-w-[400px] w-full text-xs sm:text-sm max-sm:py-3.5 rounded-md border border-black shadow-sm px-4 py-3 bg-white font-medium text-gray-700 hover:bg-gray-50 justify-between items-center"
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={toggleDropdown}
        >
          <span>{selectedOption}</span>
          {!isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="13"
              viewBox="0 0 17 15"
              fill="none"
              className="flex-shrink-0 ml-5"
            >
              <path
                d="M7.63398 0.5C8.01888 -0.166667 8.98112 -0.166667 9.36602 0.5L16.7272 13.25C17.1121 13.9167 16.631 14.75 15.8612 14.75H1.13878C0.368984 14.75 -0.112141 13.9167 0.272759 13.25L7.63398 0.5Z"
                fill="#016064"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="13"
              viewBox="0 0 17 15"
              fill="none"
              className="flex-shrink-0 ml-5"
            >
              <path
                d="M9.36602 14.5C8.98112 15.1667 8.01888 15.1667 7.63397 14.5L0.272759 1.75C-0.112142 1.08333 0.368983 0.250002 1.13878 0.250002L15.8612 0.25C16.631 0.25 17.1121 1.08333 16.7272 1.75L9.36602 14.5Z"
                fill="#3C3C3C"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          id="dropdownMenu"
          className="origin-top-right absolute left-0 sm:min-w-[200px] max-w-[400px] w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="dropdownButton"
        >
          <div className="" role="none">
            {data.map((option, index) => (
              <div key={index}>
                <span
                  onClick={() => handleOptionClick(option)}
                  className="block px-4 py-3 text-xs text-gray-700 hover:bg-gray-100 cursor-pointer"
                  role="menuitem"
                >
                  {option}
                </span>
                <div className="h-[0.5px] bg-black"></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
