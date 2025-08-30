import React, { useEffect, useState } from "react";
import { UseContext } from "../../../../../context/ContextProvider";
import { CircularProgress, Drawer, Slider, Tooltip} from "@mui/material";
import { FaCross } from "react-icons/fa";
import { BsXCircleFill } from "react-icons/bs";
import { DateRangePicker } from "rsuite";
import 'rsuite/DateRangePicker/styles/index.css';
import dayjs from "dayjs";
import Select from "react-select";
import { CustomDatePickerFilter, CustomDropdownIndicator, CustomSlider, FilterMultiSelect } from "./FilterComponents";
import { useParams } from "react-router-dom";
import { getAppliedFilters, getFilters } from "../../../../../http/dashboard_api";
import { UseDescriptiveContext } from "../../../../../context/DescriptiveProvider";
import DescriptiveFiltersLoading from "../../../../components/common/dummyLoading/Dashboards/DescriptiveFiltersLoading";


function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value} className="bg-[#00acc1]" >
      {children}
    </Tooltip>
  );
}

const FilterCanvas = () => {
  const { toggleFilter, handleToggleFilter, dashboardData, handleSetFilteredData, filters, setFilters, rangeValues, setRangeValues, isFilterModified, setIsFilterModified} = UseContext();
  const {isLoadingFilter, setIsLoadingFilter, filter,setFilter, pages} = UseDescriptiveContext()
  
  const { module_id, id } = useParams();
  const initialFilters = {}; // Initial state of filters
  const initialRangeValues = {}; // Initial state of rangeValues
  const [loadingApply, setLoadingApply] = useState(false)
  // Check if filters or rangeValues are modified

   const fetchFilters = async () => {
      setIsLoadingFilter(true);
      try {
        const dashboardDetail = JSON.parse(sessionStorage.getItem("selectedDashboard"))
        const result = await getFilters(module_id, dashboardDetail.version_id);
        if (result.filters) {
          setFilter(result.filters)
        } else {
  
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoadingFilter(false);
      }
    };
    useEffect(() => {
      const isFilters = Object.keys(filter)
      if(isFilters.length===0)fetchFilters()
      
    }, []);
  useEffect(() => {
    const isFiltersChanged = Object.keys(filters).some(
      (key) => filters[key] !== initialFilters[key]
    );
    const isRangeValuesChanged = Object.keys(rangeValues).some(
      (key) =>
        !initialRangeValues[key] ||
        rangeValues[key][0] !== initialRangeValues[key][0] ||
        rangeValues[key][1] !== initialRangeValues[key][1]
    );
    setIsFilterModified(isFiltersChanged || isRangeValuesChanged);    
  }, [filters, rangeValues]);



  const handleResetFilters = () => {
    setRangeValues({})
    setIsFilterModified(false)
    setFilters({})
    handleSetFilteredData(null)
    handleToggleFilter()
    setSelectedFilters({})
  }
  // Get keys dynamically excluding `id`
  const excludeKeys = ["id", "transaction id", "customer id"]
  const keys = dashboardData.data
    ? Object.keys(dashboardData.data[0]).filter(
      (key) => !excludeKeys.includes(key.toLowerCase())
    )
    : [];

  // Determine if a value is numeric
  const isNumeric = (value) => !isNaN(Number(value));
  const isDate = (value, key) => {
    if(key.toLowerCase().includes("date")) return  true;
    if (typeof value !== "string") return false; // Dates are typically strings
    // Check if the string contains both letters and numbers
    const containsNumbersAndLetters = /[a-zA-Z]/.test(value) && /\d/.test(value);
    if (containsNumbersAndLetters) return false;
   
    // Check if the string matches valid date formats
    return dayjs(value, ['YYYY-MM-DD', 'DD-MM-YYYY'], false).isValid();
  };
  // Get data type dynamically
  const getDataType = (key) => {
    const sampleValue = key;
    if (isNumeric(sampleValue)) return "number"
    if (isDate(sampleValue, key)) return "date"
    return "category";
  };

  const [selectedFilters, setSelectedFilters] = useState({})
  // Handle slider changes
  const handleSliderChange = (key, _, newValue, min, max) => {
    setRangeValues((prev) => ({
      ...prev,
      [key]: newValue,
    }));
    setSelectedFilters((prev)=>{
      if(min===newValue[0] && max===newValue[1]){
        const temp = {...prev}
        delete temp[key]
        return temp
      }
      return {...prev,
      [key]: {values:newValue, type:"number"},}
    })
    if(min===newValue[0] && max===newValue[1]){
      removeFilter(rangeValues, setRangeValues, key)
    }
  };

  // Handle filter changes for all input types
  const handleFilterChange = (key, value, type = "category") => {
    const updatedFilters = { ...filters };

    if (type === "range") {
      if (!value || (value[0] === null && value[1] === null)) {
        delete updatedFilters[key];
      } else {
        updatedFilters[key] = value;
      }
    } else {
      if (value === false ) {
        delete updatedFilters[key];
      } if(value==="all"||value?.length===0){
        delete updatedFilters[key];
        removeFilter(rangeValues, setRangeValues, key)
      }
      else {
        updatedFilters[key] = value;
      }
    }
    setSelectedFilters((prev)=>{
      if(value.length===0){
        const temp = {...prev}
        delete temp[key]
        return temp
      }
      return {...prev,
      [key]: {values:value, type:type},}
    })

    setFilters(updatedFilters);
  };
  const handleDateFilterChange = (key, value, type = "text", min, max) => {
    const updatedFilters = { ...rangeValues };
    if (type === "date") {
      if (value) {
        const [minDate, maxDate] = value;
        updatedFilters[key] = [
          minDate ? dayjs(minDate).format("YYYY-MM-DD") : null,
          maxDate ? dayjs(maxDate).format("YYYY-MM-DD") : null,
        ];
      } else {
        delete updatedFilters[key];
        removeFilter(rangeValues, setRangeValues, key)
      }
    }
    setRangeValues(updatedFilters);
    if (value) {
      const [minDate, maxDate] = value;
      setSelectedFilters((prev)=>{
        if(dayjs(min).startOf("day").toDate()===minDate && dayjs(max).endOf("day").toDate()===maxDate){
          const temp = {...prev}
          delete temp[key]
          return temp
        }
        return {...prev,
        [key]: {values:value, type:"date"},}
      })
    } 
    
  }
  const applyFilter = async () => {
    setLoadingApply(true);
    const appliedFilters = Object.keys(selectedFilters).map((field) => ({
      field: field,
      ...selectedFilters[field],
      values: selectedFilters[field].values.map((data) =>
        selectedFilters[field].type === "date"
          ? dayjs(data).startOf("day").format("YYYY-MM-DDTHH:mm:ss")
          : data + ""
      ),
    }));
    const plot_recommendation = [pages[0].recommendation.map((data)=>({type:{xAxis:[data.xKey], yAxis:data.yKeys}, kind:data.kind}))]
    console.log(appliedFilters)
    const tempRequest = {filters:appliedFilters, plot_recommendation:plot_recommendation}
    const dashboardDetail = JSON.parse(sessionStorage.getItem("selectedDashboard"))
    try {
      const result = await getAppliedFilters(module_id, tempRequest, dashboardDetail.version_id, dashboardDetail.owner_id);
      console.log(result); // Log the result to check the structure of the response
      
      if (result.data) {
        handleSetFilteredData(result.data)
        handleToggleFilter()

      } else {

      }
    } catch (error) {
      handleSetFilteredData(null)
      console.error("Error fetching data:", error);
    } finally {
      setLoadingApply(false);
    }
  };
  const [shouldApplyFilter, setShouldApplyFilter] = useState(false);

  useEffect(() => {
    if (shouldApplyFilter) {
      // applyFilter();
      // setShouldApplyFilter(false); // Reset the flag after applying the filter
    }
  }, [filters, rangeValues]);

  const removeFilter = (data, setData, value) => {
    const tempData = { ...data };
    delete tempData[value];
    setData(tempData);
    setShouldApplyFilter(true); // Set the flag to apply the filter
  };


  return (
    <Drawer className="relative" open={toggleFilter} onClose={handleToggleFilter}>
      {isLoadingFilter?
        <div className="">
          <DescriptiveFiltersLoading />
        </div>
        :
        <>
          <div className="w-96 p-5 h-[100%] overflow-y-auto overflow-x-hidden">
            {isFilterModified &&
              <div>
                <p>Applied Filters</p>
                <div className="flex flex-wrap gap-1 mb-3">

                  {Object.keys(rangeValues).map((data, index) => {
                    return (
                      <span key={index} className="rounded-3xl text-xs bg-gray-300 px-2 flex items-center justify-center gap-1 py-1">
                        <span><span className="text-[#095458]">{data.includes("_")?data.split("_").join(" "):data}:</span> {Array.isArray(rangeValues[data]) ? `${rangeValues[data]?.[0]} - ${rangeValues[data]?.[1]}` : rangeValues[data]}</span>
                        <button disabled={loadingApply} ><BsXCircleFill onClick={() => removeFilter(rangeValues, setRangeValues, data)} className="text-black h-3 w-3" /> </button>
                      </span>
                    )
                  })}
                  {Object.keys(filters).map((data, index) => {
                    return (
                      <span key={index} className="rounded-3xl text-xs bg-gray-300 px-2 flex items-center justify-center gap-1 py-1">
                        <span ><span className="text-[#095458]">{data.includes("_")?data.split("_").join(" ").slice(0,10):data.slice(0,10)}: </span>{filters?.[data] === true ? data : filters?.[data]?.slice(0, 10).map((val, i)=>{return <span key={i}>{val}, </span>})}</span>
                        <button disabled={loadingApply}><BsXCircleFill onClick={() => removeFilter(filters, setFilters, data)} className="text-black h-3 w-3" /> </button>
                      </span>
                    )
                  })}

                </div>

              </div>
            }
            <div className="pb-5">Filters</div>
            <div>
              {Object.keys(filter).map((key) => {
                const dataType = filter[key]?.type?.toLowerCase()
                if (dataType==="number") {
                  const min = filter[key].min;
                  const max = filter[key].max;
                  // const defaultRange = rangeValues[key] || [min, max];
                  const defaultRange = selectedFilters?.[key]?.values || [min, max];
                  return (
                    <div key={key} className="mb-3">
                      <label className="capitalize">{key.includes("_")?key.split("_").join(" "):key}:</label>
                      <CustomSlider
                        value={defaultRange}
                        onChange={(e, newValue) =>
                          handleSliderChange(key, e, newValue, min, max)
                        }
                        valueLabelDisplay="auto"
                        min={min}
                        max={max}
                        ValueLabelComponent={ValueLabelComponent}
                        disabled={loadingApply}
                        sx={{
                          color: '#00acc1', // Range track color
                          '& .MuiSlider-thumb': {
                            backgroundColor: '#00acc1', // Thumb color
                          },
                          '& .MuiSlider-valueLabel': {
                            backgroundColor: '#00acc1', // Tooltip (value label) background color
                            color: '#fff', // Tooltip text color
                          },
                        }}
                      />
                    </div>
                  );
                }
                if (dataType==="category") {
                  const values = filter[key].values;
                  return(
                    <FilterMultiSelect 
                      disabled={loadingApply}
                      dataKey={key} 
                      key={key}
                      values={values}
                      handleFilterChange={handleFilterChange}
                      filters={filters}
                    />
                  )
                }
                if (dataType==="date") {
                  const {min, max} = filter[key]
                  return(
                    <CustomDatePickerFilter 
                      disabled={loadingApply}
                      key={key}
                      min={min}
                      max={max}
                      dataKey={key}
                      handleDateFilterChange={handleDateFilterChange}
                      rangeValues={rangeValues}
                    />
                  )
                }
                return null;
              })}
            </div>
          </div>
            <div className="p-4 flex justify-between items-center bg-[#095458]">
              <button
                onClick={handleResetFilters}
                className="bg-[#00acc1]  py-2 text-white font-bold flex justify-center rounded-md px-3"
                disabled={loadingApply}
              >
                Reset
              </button>
              <button
                onClick={() => {
                  applyFilter()
                  // handleToggleFilter()
                }}
                disabled={loadingApply||!isFilterModified}
                className={`${!isFilterModified?"bg-[#047685] text-[#9b9b9b]":"bg-[#00acc1] text-white"} py-2  font-bold flex justify-center items-center gap-2 rounded-md px-3`}
              >
                {loadingApply && <CircularProgress size={20} sx={{color:"white"}} />}
                <span>{loadingApply?"Applying Filters":"Apply Filter"}</span>
                
              </button>
            </div>
        </>
      }
    </Drawer>
  );
};

export default FilterCanvas;
