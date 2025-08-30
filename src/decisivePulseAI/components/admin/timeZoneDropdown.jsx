import React, { useState, useEffect, useRef } from "react";
import TimezoneSelect from "react-timezone-select";
import { components } from 'react-select';

const Dropdown = ({ onTimezoneChange }) => {
  const [selectedTimezone, setSelectedTimezone] = useState({});

  const handleTimezoneChange = (timezone) => {
    setSelectedTimezone(timezone);
    onTimezoneChange(timezone.value); 
  };

  return (
    <div className="w-full sm:flex max-sm:w-1/2 max-sm:ml-2">
      <TimezoneSelect
        value={selectedTimezone}
        onChange={handleTimezoneChange}
        className="w-full border border-black shadow-sm rounded-md text-gray-700 text-sm"
        styles={ {
          control: (base) => ({
            ...base,
            height: '50px', // Set your desired height
            paddingRight:"10px"
          }),
        }}
        components={{ DropdownIndicator: CustomDropdownIndicator }}
      />
    </div>
  );
};

const CustomDropdownIndicator = (props) => {
  const { selectProps } = props;

  return (
    <components.DropdownIndicator {...props}>
      {selectProps.menuIsOpen ? (
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
            d="M7.63398 0.5C8.01888 -0.166667 8.98112 -0.166667 9.36602 0.5L16.7272 13.25C17.1121 13.9167 16.631 14.75 15.8612 14.75H1.13878C0.368984 14.75 -0.112141 13.9167 0.272759 13.25L7.63398 0.5Z"
            fill="#016064"
          />
        </svg>
      )}
    </components.DropdownIndicator>
  );
};



export default Dropdown;
