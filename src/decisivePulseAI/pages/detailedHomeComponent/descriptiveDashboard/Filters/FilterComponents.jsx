import { Slider} from "@mui/material";
import dayjs from "dayjs";
import Select, { components } from 'react-select';
import { DateRangePicker } from "rsuite";
import { alpha, styled } from '@mui/material'
// function supports filters
function getMinAndMaxDates(data, key) {
    const parseDateSafely = (dateString) => {
        const parsedDate = new Date(dateString);
        return isNaN(parsedDate) ? null : parsedDate; // Return null if invalid
    };

    const minDate = data.reduce((earliest, item) => {
        const currentDate = parseDateSafely(item[key]);
        return currentDate && (!earliest || currentDate < earliest) ? currentDate : earliest;
    }, null);

    const maxDate = data.reduce((latest, item) => {
        const currentDate = parseDateSafely(item[key]);
        return currentDate && (!latest || currentDate > latest) ? currentDate : latest;
    }, null);

    return { minDate, maxDate };
}

// dynamic input types for filters
const CustomSlider = styled(Slider)`
  color: #00acc1;
  height: 4px;

  & .MuiSlider-thumb {
    height: 15px;
    width: 15px;
    background-color: #00acc1;
    border: 2px solid currentColor;
    margin-top: 0px;
    margin-left: 0;

    &[data-index="1"] {
      margin-left: 0px; /* Specific adjustment for the right thumb */
    }

    &:focus,
    &:hover,
    &.Mui-active {
      box-shadow: inherit;
    }
  }

  & .MuiSlider-track {
    height: 4px;
    border-radius: 4px;
  }

  & .MuiSlider-rail {
    height: 4px;
    border-radius: 4px;
  }

  // & .MuiSlider-valueLabel {
  //   left: calc(-50% + 4px);
  // }
`;

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
            className="flex-shrink-0"
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
            className="flex-shrink-0"
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

  const FilterMultiSelect = ({dataKey, values, handleFilterChange, filters, disabled})=>{
    const options = [...new Set(values)].map((option) => ({
        value: option,
        label: option,
      }));
    return(
        <div className="flex flex-col mb-3" key={dataKey}>
            <label  className="capitalize" >{dataKey.includes("_") ? dataKey.split("_").join(" ") : dataKey}:</label>
            <Select
              isDisabled={disabled}
                isMulti
                options={options}
                onChange={(selectedOptions) =>
                    handleFilterChange(
                    dataKey,
                    selectedOptions.map((option) => option.value)
                    )
                }
                value={(filters[dataKey] || []).map((value) => ({
                    value,
                    label: value,
                }))}
                className=""
                styles={{
                    control: (base) => ({
                    ...base,
                    // borderColor: "rgba(156, 163, 175)", // Matches Tailwind `border-slate-400`
                    borderRadius: "0.15rem", // Matches Tailwind `rounded-md`
                    // backgroundColor: "rgb(241, 245, 249)", // Matches Tailwind `bg-slate-100`
                    }),
                }}
                components={{ DropdownIndicator: CustomDropdownIndicator }}
            />
        </div>
    )
  }
  const CustomDatePickerFilter = ({dataKey, handleDateFilterChange, rangeValues, min, max, disabled})=>{
    const shouldDisableMonthNavigation = (date) => {
      return date < min || date > max;
    };
    return (
      <div className="flex flex-col mb-3" key={dataKey}>
        <label  className="capitalize" >{dataKey.includes("_")?dataKey.split("_").join(" "):dataKey}:</label>
        <DateRangePicker
          disabled={disabled}
          placement="auto"
          value={
            rangeValues[dataKey]
              ? [dayjs(rangeValues[dataKey][0]).toDate(), dayjs(rangeValues[dataKey][1]).toDate()]
              : []
          }
          onChange={(range) => handleDateFilterChange(dataKey, range, "date", min, max)}
          className="rounded-md"
          minDate={min ? dayjs(min).toDate() : undefined}
          maxDate={max ? dayjs(max).toDate() : undefined}
          shouldDisableDate={(date) =>
            (min && date < dayjs(min).startOf("day").toDate()) ||
            (max && date > dayjs(max).endOf("day").toDate())
          }
          shouldDisableMonthNavigation={shouldDisableMonthNavigation}
          defaultCalendarValue={[ new Date(min), new Date(max)]}
        />

      </div>
    );
  }
  export{
    CustomSlider,
    CustomDropdownIndicator,
    FilterMultiSelect,
    CustomDatePickerFilter
  }
  