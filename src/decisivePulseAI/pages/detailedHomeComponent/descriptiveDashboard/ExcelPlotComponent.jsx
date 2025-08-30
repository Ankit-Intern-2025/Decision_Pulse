import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import filteredOut from "../../../resources/home/filtered-out.png";
import { UseContext } from "../../../../context/ContextProvider";
import { addBookmarksFromAPI, deleteBookmarkFromAPI, fetchBookmarksFromAPI, fetchDataForDescriptiveModule, fetchDataForModule, getFilters, getSessionData, renameBookmarksFromAPI, updateBookmarksFromAPI, updatePage } from '../../../../http/dashboard_api';
import { useParams } from "react-router-dom";
import CustomVisuals from "./CustomVisuals";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider, useDrop } from "react-dnd";
import { UseDescriptiveContext } from "../../../../context/DescriptiveProvider";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import ChartDropZone from "./ChartDropZone";
import { CircularProgress } from "@mui/material";
import DashboardLoading from "../../../components/loader/DashboardLoading";
import { v4 as uuidv4 } from 'uuid';
import { deepEqual, FireAlert } from "../../../../utils/static_func";
import BottomMenu from "./BottomMenu";
import DescriptiveLoading from "../../../components/common/dummyLoading/Dashboards/DescriptiveLoading";

const ExcelPlotComponent = () => {
  const { setDashboardData, filteredData, handleResetFilters, dashboardData, handleLoader } = UseContext()
  const {setIsLoadingFilter, setFilter,plotRecommendation, setPlotRecommendation, pages, sePages, chartData, setChartData, selectedPage, setSelectedPage, bookmarks, setBookmarks, selectedBookmark, tempBookmark, setSelectedBookmark} = UseDescriptiveContext()

  const [cardData, setCardData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { module_id, id } = useParams();
  const [layout, setLayout] = useState([]);
  const [initialPages, setInitialPages] = useState()

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

  const selectPage = (page, data)=>{
    setSelectedPage(page)
    recreatePageContent(page, data)
 
  }
  const recreatePageContent = (page, data) => {
    // console.log("recreatePageContent called in",page,data) //page is index & data is array
    const selectedPage = data[page]
    // console.log(selectedPage)
    const layout = []
    const recommendation = []
    selectedPage.recommendation.forEach((data, index)=>{
        const uniqueId = data.id|| uuidv4();
        layout.push({
            i: uniqueId,
            x: selectedPage?.styling?.layout?.[index]?.x ||(index % 3) * 40,
            y: selectedPage?.styling?.layout?.[index]?.y || Math.floor(index / 3) * 20,
            w: selectedPage?.styling?.layout?.[index]?.w || 40,
            h: selectedPage?.styling?.layout?.[index]?.h || 20,
          })
        recommendation.push({...data, id:uniqueId, type:data.type===undefined?"chart":data.type, options:{...selectedPage?.styling?.options?.[index]}})
    })
    setDashboardData(selectedPage.data.chart_data)
    setChartData(selectedPage.data.chart_data);
    setPlotRecommendation(recommendation)
    setCardData(selectedPage.final_clean_card || {});
    setLayout(layout)
  }
//   useEffect(() => {
//     recreatePageContent(selectedPage, pages)
//   }, [])
    useEffect(()=>{
        if(pages.length){
            sePages((prev)=>{
                const tempPages = [...prev]
                const option = []
                const recommendation = plotRecommendation?.map((data, index)=>{
                    // console.log(data, "index")
                    const {options, title, img, ...rest} = data
                    option.push(options||{})
                    return rest
                })
                tempPages[selectedPage].styling["options"]=option
                tempPages[selectedPage].recommendation=recommendation
                return tempPages
            })
        }
    },[plotRecommendation])
    useEffect(()=>{
        if(pages.length){
            sePages((prev)=>{
                const tempPages = [...prev]
                tempPages[selectedPage].styling["layout"]=layout.map((data)=>{
                    const {...rest} = data
                    return rest
                })
                return tempPages
            })
        }
    },[layout])
    useEffect(()=>{
        if(pages.length){
            sePages((prev)=>{
                const tempPages = [...prev]
                tempPages[selectedPage].data["chart_data"]=dashboardData
                return tempPages
            })
        }
    },[dashboardData])

    
  const fetchDescriptiveData = async () => {
    setIsLoading(true);
    try {
      // Dynamically fetch descriptive data using the module_id and 'descriptive'
      const result = await fetchDataForDescriptiveModule(module_id, [], id);
      // console.log(result); // Log the result to check the structure of the response
      const firstPage = result?.[0]
      if (firstPage) {
        sePages(result)
        setInitialPages(result)
        const dashboardDetail = JSON.parse(sessionStorage.getItem("selectedDashboard"))
        const response = await fetchBookmarksFromAPI(dashboardDetail.id);
        // const filters = await getFilters(module_id, dashboardDetail.version_id);
        // setFilter(filters?.filters||{})
        setBookmarks(response);
        if(result.length >= 0) {
            selectBookmark(response, firstPage)
            selectPage(selectedPage,result)
        }
        // fetchFilters()
        
      } else {
        setError("Please upload the data for showing the dashboard.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchDescriptiveData(); // Fetch data on component mount
    // selectPage(0, testDummyJson)
    // setIsLoading(false);
    // sePages(testDummyJson)


    // setDashboardData(testDummyJson[0].data.chart_data)
    // setPlotRecommendation(testDummyJson[0].recommendation)
    // setLayout(
    //     testDummyJson[0].recommendation.map((_, index) => ({
    //     i: `${index}`,
    //     x: (index % 3) * 40,
    //     y: Math.floor(index / 3) * 20,
    //     w: 40,
    //     h: 20,
    //   }))
    // )
    return ()=>handleResetFilters()
  }, [module_id]);
  const [isDashboardModified, setIdDashboardModified] = useState(false)
  useEffect(()=>{
    const isModified = deepEqual(initialPages, pages)
    // console.log(isModified)
    setIdDashboardModified(isModified)
  },[pages[selectedPage], pages])
  const saveDashboard = async () => {
    handleLoader(true, "Applying your changes, please wait..")

    try {
        const updatePromises = pages.map(page => {
            const request = { ...page };
            return updatePage(request, page.id);
        });

        const responses = await Promise.all(updatePromises);
        if(responses.every(page => page.id)){
            FireAlert("Success","Your Dashboard saved successfully", "success")
        }else{
            FireAlert("Information","Unable to save your dashboard, please try again", "error")
        }
        // console.log(responses)
        
    } catch (error) {
        FireAlert("Information","Unable to save your dashboard, please try again", "error")
    } finally {
        handleLoader(false, "") 
    }
   };

  const removePlot = useCallback(index=> {
    setPlotRecommendation(prev=>prev.filter((_,i)=> i!==index))
    setDashboardData(prev=>prev.filter((_,i)=> i!==index))
    setLayout(prev=>prev.filter((_,i)=> i!==index))
    }, [])
    
    /*bookmarks stat here */
    const selectBookmark = (bookmarks, page) => {
        const isBook = bookmarks.find((obj) => obj.page_id === page?.id)
            if(bookmarks.length >= 0 && isBook) {
                setSelectedBookmark(isBook)
            }
    }
    const dashboardId = getSessionData()?.id
    useEffect(() => {
        // console.log(selectedBookmark, "in use Effect")
        if (selectedBookmark !== undefined) {
            navigateToPage(selectedBookmark)
        }
    }, [selectedBookmark, tempBookmark])
    const fetchBookmarks = async () => {
        try {
            const response = await fetchBookmarksFromAPI(dashboardId);
            // console.log(response, "res in bookmarks")
            setBookmarks(response);
        } catch (e) {
            console.error("Error fetching bookmarks:", e);
        }
    };
    const handleAddbookmarks = async ()=>{
        const tempPlotRec = [...plotRecommendation]
        const bookmarkItems = tempPlotRec.map((plot)=>{
            const title= `${plot?.yKeys?.map(axis=>axis?.name)?.join(", ")} by ${plot?.xKey}`
            return {id:plot.id, title:title, isVisible:true}
        })
        const newBookmark = {
            name:`Bookmark${bookmarks.length+1}`,
            /*bkId:bookmarks.length,*/ 
            data:{plots: bookmarkItems},
            // index:bookmarks.length,
            styling: {},
            page_id: pages[selectedPage].id,
            recommendation: {},
        }
        // console.log(newBookmark)
        //setBookmarks((prev)=>([...prev, newBookmark]))
        try {
            // console.log(newBookmark, "in bookmark.tsx")
            // const pageId = await fetchPagesFromAPI(dashboardId)//[0]//.id
            // newBookmark.page_id = pageId[0].id
            // console.log(newBookmark)
            const response = await addBookmarksFromAPI(newBookmark); // ✅ Properly await API call
            if (response?.id) {
                // console.log('Created successfully. Refetching bookmarks...');
                setBookmarks((prev) => [...prev, response]);
                fetchBookmarks(); // ✅ Optional: Refresh bookmarks after adding
            } else {
                console.log("Unable to create bookmark");
            }
        } catch (error) {
            console.error("Error adding bookmark:", error);
        }
    }
    const handleBookmarkNameChange = async (bookmark)=>{
        // const {value} = e.target
        // console.log(bookmark, "Targetted Bookmark")
        try {
            const response = await renameBookmarksFromAPI(bookmark); // ✅ Properly await API call
            if (response?.id) {
                // console.log('Updated successfully. Refetching bookmarks...');
                //setBookmarks((prev) => [...prev, response]);
                // setBookmarks(prev=>{
                //     const tempData = [...prev]
                //     tempData[index].bookmarkName = value
                //     return tempData
                // })
                fetchBookmarks(); // ✅ Optional: Refresh bookmarks after adding
            } else {
                console.log("Unable to create bookmark");
            }
        } catch (error) {
            console.error("Error adding bookmark:", error);
        }
        /*setBookmarks(prev=>{
            const tempData = [...prev]
            tempData[index].bookmarkName = value
            return tempData
        })*/
    }
    const handleRemoveBookmark = async (bookmark)=>{
        console.log(bookmark)
        //const bookmarkId = bookmark.id
        // setBookmarks((prev)=>prev.filter(bookmark=>bookmark.bookmarkId!==bookmarkId))
        // if(selectedBookmark.bookmarkId===bookmarkId){
        //     setSelectedBookmark({})
        // }
        try {
            const response = await deleteBookmarkFromAPI(bookmark);
            // console.log(response)
            fetchBookmarks(); 
            // if (response?.success) {
            //     console.log("success delete")
            //     setBookmarks((prev) => prev.filter(bookmark => bookmark.bookmarkId !== bookmarkId));
            //     if (selectedBookmark.bookmarkId === bookmarkId) {
            //         setSelectedBookmark({});
            //     }
            //     console.log("Bookmark deleted successfully.");
                
            // } else {
            //     console.log("Failed to delete bookmark.");
            // }
        } catch (error) {
            console.error("Error deleting bookmark:", error);
            console.log("Failed to delete bookmark.");
        }
    }
    const handleUpdateBookmark = async (bookmark) => {
        // console.log(bookmark)
        try {
            const response = await updateBookmarksFromAPI(bookmark);
            if (response?.id) {
                // console.log('Updated successfully. Refetching bookmarks...');
                fetchBookmarks();
            } else {
                console.log("Unable to create bookmark");
            }
        } catch (error) {
            console.error("Error adding bookmark:", error);
        }
    }
    const navigateToPage = (bookmark) => {
        const matchedPageIndex = pages.findIndex(page => page.id === bookmark.page_id);
        if (matchedPageIndex !== -1) {
            setSelectedPage(matchedPageIndex)
            recreatePageContent(matchedPageIndex, pages)
        }
    }
    
    const fullScreenRef = useRef(null)
    const zoomableRef = useRef(null);

    //bookmarks end here
  if (isLoading) {
    return <DescriptiveLoading />
  }
  if (error)
    return (
      <div className="text-center text-white font-semibold">
        Descriptive dashboard not available.
      </div>
    );


  return (

      <div ref={fullScreenRef}  className="app-container">
        <div className="flex gap-4 ">
          {Object.entries(cardData).map(([key, value]) => {
            return (
              <div
                key={key}
                className="flex bg-[#f0f0f0] w-[24%] rounded-md p-3 pr-6 justify-between mb-4 "
              >
                <div className=" w-full">
                  <h3 className="font-semibold text-center text-lg text-[#006064]">
                    {/* {key.replace(/_/g, " ")} */}
                    {key
                      .replace(/\b\w/g, (char) => char.toUpperCase())
                      .replace(/_/g, " ")}
                  </h3>
                  <p className="font-medium text-center text-[#006064]">
                    {value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className=" mx-auto flex flex-col gap-2 h-full ">
          {filteredData && filteredData.length===0?(
          <div className="flex gap-4 items-center bg-white rounded-md">
          <img src={filteredOut} style={{width:'6rem', height:'auto'}} alt='Filtered Out' />
          <div className='flex flex-col'>
            <span className='font-semibold text-lg text-[#006064]'>Too many filters applied!</span>
            <span className='font-medium text-center text-[#006064]'>We couldn't generate charts with all the filters you’ve selected. Try removing some filters</span>
            <div style={{flexDirection:"unset"}} className='gap-1 flex-wrap d-flex mt-1'>
              <span className='fs-7 d-flex align-items-center'>
                <span className='me-2'>Or</span>
                <span className='rounded bg-slate-100 px-2 py-1 text-[#006064] font-bold cursor-pointer' onClick={handleResetFilters}>CLEAR ALL FILTERS</span>
              </span>
            </div>
          </div>
        </div>
          ):(
            <DndProvider backend={HTML5Backend}>
              <div className="flex relative gap-3 h-full">
                <ChartDropZone
                  removePlot={removePlot}
                  layout={layout}
                  setLayout={setLayout}
                  pages={pages}
                  selectPage={selectPage}
                  isDashboardModified={isDashboardModified}
                  saveDashboard={saveDashboard}
                  selectBookmark={selectBookmark}
                  fullScreenRef={fullScreenRef}
                  zoomableRef={zoomableRef}
                />
                <CustomVisuals 
                    recreatePageContent={selectPage}
                    fetchBookmarks={fetchBookmarks} 
                    handleAddbookmarks={handleAddbookmarks} 
                    handleBookmarkNameChange={handleBookmarkNameChange} 
                    handleRemoveBookmark={handleRemoveBookmark} 
                    handleUpdateBookmark={handleUpdateBookmark} 
                    navigateToPage={navigateToPage}
                />
              </div>
              <BottomMenu 
               zoomableRef={zoomableRef}
               saveDashboard={saveDashboard}
               selectPage={selectPage}
               selectBookmark={selectBookmark}
               fullScreenRef={fullScreenRef}
              />
            </DndProvider>
          )

          }
        </div>
      </div>
  );
};



export default ExcelPlotComponent;
