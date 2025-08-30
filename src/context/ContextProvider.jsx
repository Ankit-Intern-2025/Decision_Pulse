import React, { createContext, useContext, useState } from 'react'
import LoaderModal from '../decisivePulseAI/components/common/LoaderModal'
const Context = createContext()

export const UseContext = ()=>{
    return useContext(Context)
}
const ContextProvider = ({children}) => {
    const [dashboardData, setDashboardData] = useState({})
    const [toggleFilter, setToggleFilter] = useState(false)
    const handleToggleFilter = ()=>{
        setToggleFilter(prev=>!prev)
    }
    const [filteredData, setFilteredData] = useState(null)
    const handleSetFilteredData = (data)=>{
        setFilteredData(data)
    }
    const [filters, setFilters] = useState({});
    const [rangeValues, setRangeValues] = useState({});
    const [isFilterModified, setIsFilterModified] = useState(false);
    const handleResetFilters = () => {
        setRangeValues({})
        setIsFilterModified(false)
        setFilters({})
        handleSetFilteredData(null)
      }
    const [loadingModal, setLoadingModal] = useState({isLoading:false, loaderMsg:""})
    const handleLoader = (isLoading, loaderMsg)=>{
        setLoadingModal({isLoading:isLoading,loaderMsg:loaderMsg})
    }
    const [iframeData, setIframeData] = useState(null);
    const [iframeMessage, setIframeMessage] = useState(null)
    const [loadingModules, setLoadingModules] = useState(true)
    const [moduleErrMsg, setModuleErrMsg] = useState(null)
  return (
    <Context.Provider
        value={{
            dashboardData, setDashboardData, toggleFilter, handleToggleFilter, filteredData, handleSetFilteredData,
            filters, setFilters, rangeValues, setRangeValues, isFilterModified, setIsFilterModified, handleResetFilters,
            loadingModal, handleLoader, iframeData, setIframeData, iframeMessage, setIframeMessage, loadingModules, setLoadingModules,
            moduleErrMsg, setModuleErrMsg
        }}
    >
        {children}
        {loadingModal.isLoading && <LoaderModal />}
    </Context.Provider>
  )
}

export default ContextProvider