import React, { createContext, useContext, useState } from 'react'
const Context = createContext()

export const UseDescriptiveContext = ()=>{
    return useContext(Context)
}
const DescriptiveProvider = ({children}) => {
    const [bookmarks, setBookmarks] = useState([])
    const [selectedBookmark, setSelectedBookmark] = useState({})
    const [tempBookmark, setTempBookmark] = useState({}) 
    const [plotRecommendation, setPlotRecommendation] = useState([])
    const [selectedPlot, setSelectedPlot] = useState("")
    const [isDraggable, setIsDraggable] = useState(false)
    const handleIsDraggable = ()=>{
      setIsDraggable(prev=>!prev)
    }

    const [buttons, setButtons] = useState([])

    const [isLoadingFilter, setIsLoadingFilter] = useState(false)
    const [filter, setFilter] = useState({})
    const [pages, sePages] = useState([]);
    const [selectedPage, setSelectedPage] = useState(0)
    const [chartData, setChartData] = useState([]);
    const handleSetSelectedBookmark= (data)=>{
      setSelectedBookmark(data)
      setTempBookmark(Object.assign({}, data))
    }
    const [zoomPercent, setZoomPercent] = useState(100);
  return (
    <Context.Provider
        value={{
            bookmarks, setBookmarks, selectedBookmark, setSelectedBookmark, plotRecommendation, setPlotRecommendation, selectedPlot, setSelectedPlot,
            handleIsDraggable, isDraggable, buttons, setButtons,
            isLoadingFilter, setIsLoadingFilter, filter, setFilter, pages, sePages, tempBookmark, setTempBookmark, chartData, setChartData, handleSetSelectedBookmark,
            selectedPage, setSelectedPage, zoomPercent, setZoomPercent
        }}
    >
        {children}
    </Context.Provider>
  )
}

export default DescriptiveProvider