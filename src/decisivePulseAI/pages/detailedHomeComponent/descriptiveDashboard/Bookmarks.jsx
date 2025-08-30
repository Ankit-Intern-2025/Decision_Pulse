
import React, { useEffect, useState } from 'react'
import { BsBookmarkFill, BsBookmarkPlus } from 'react-icons/bs'
import ListBookmark from './components/ListBookmark'
import { UseDescriptiveContext } from '../../../../context/DescriptiveProvider'
import { addBookmarksFromAPI, deleteBookmarkFromAPI, fetchBookmarksFromAPI, fetchPagesFromAPI, getSessionData, renameBookmarksFromAPI, updateBookmarksFromAPI } from '../../../../http/dashboard_api'

const Bookmarks = ({recreatePageContent, fetchBookmarks, handleAddbookmarks, handleBookmarkNameChange, handleRemoveBookmark, handleUpdateBookmark, navigateToPage}) => {
    const {bookmarks, setBookmarks, selectedBookmark, setSelectedBookmark, plotRecommendation, pages, selectedPage, setSelectedPage, tempBookmark} = UseDescriptiveContext()
    const [bookmarkRename, setBookmarkRename] = useState({})
    const dashboardId = getSessionData()?.id
    /*
    useEffect(() => {
        // console.log("I am calling even when the buttons lcicked")
        fetchBookmarks()
    }, [])

    const fetchBookmarks = async () => {
        try {
            const response = await fetchBookmarksFromAPI(dashboardId);
            // console.log(response, "res in bookmarks")
            setBookmarks(response);
        } catch (e) {
            console.error("Error fetching bookmarks:", e);
        }
    };
    //not working
    const handleAddbookmarks = async ()=>{
        const tempPlotRec = [...plotRecommendation]
        const bookmarkItems = tempPlotRec.map((plot)=>{
            const title= `${plot?.yKeys?.map(axis=>axis?.name)?.join(", ")} by ${plot?.xKey}`
            return {id:plot.id, title:title, isVisible:true}
        })
        const newBookmark = {
            name:`Bookmark${bookmarks.length+1}`,
            //bkId:bookmarks.length, 
            data:{plots: bookmarkItems},
            // index:bookmarks.length,
            styling: {},
            page_id: pages[selectedPage].id,
            recommendation: {},
        }
        console.log(newBookmark)
        //setBookmarks((prev)=>([...prev, newBookmark]))
        try {
            console.log(newBookmark, "in bookmark.tsx")
            // const pageId = await fetchPagesFromAPI(dashboardId)//[0]//.id
            // newBookmark.page_id = pageId[0].id
            console.log(newBookmark)
            const response = await addBookmarksFromAPI(newBookmark); // ✅ Properly await API call
            if (response?.id) {
                console.log('Created successfully. Refetching bookmarks...');
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
        //setBookmarks(prev=>{
        //     const tempData = [...prev]
        //     tempData[index].bookmarkName = value
        //     return tempData
        // })
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
            console.log(response)
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
        console.log(bookmark)
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
        // console.log(bookmark, "innavigate to function")
        console.log("-----------------")
        const matchedPageIndex = pages.findIndex(page => page.id === bookmark.page_id);

        console.log(matchedPageIndex, "match")  
        //pages is array of objects that has id 
        //selected page is index 
        //bookmark is selected bookmark that also ha the page_id corresponding to pages array's id
        //write code to find the particular id from pages array by simply checking the bookmark's page_id attribute equality to id in the pages array 's particular object 
        // setSelectedBookmark(bookmark)
        if (matchedPageIndex !== -1) {
            recreatePageContent(matchedPageIndex, pages)
            setSelectedPage(matchedPageIndex)
        }
        //yet to implement
    }
    */
    useEffect(() => {
        console.log(selectedBookmark, "in use Effect")
        if (selectedBookmark !== undefined) {
            navigateToPage(selectedBookmark)
        }
    }, [selectedBookmark, tempBookmark])
    // console.log(plotRecommendation, selectedBookmark, bookmarks)
    return (
        <div className='flex flex-col gap-1 px-4 '>
            <div className='flex justify-around items-center mb-4 py-1 border-b border-gray-400'>
                <div onClick={handleAddbookmarks} className={`p-2 rounded-md hover:bg-gray-200 cursor-pointer flex gap-2 items-center text-sm`}>
                    <BsBookmarkPlus className='h-3 w-3' />
                    <span>Add</span>
                </div>
                <div className={`p-2   rounded-md hover:bg-gray-200 cursor-pointer flex gap-2 items-center text-sm`}>
                    <BsBookmarkFill className='h-3 w-3' />
                    <span>View</span>
                </div>
            </div>
            <div className='flex flex-col gap-1'>
                {bookmarks?.map((data, index)=>{
                    return(
                        <ListBookmark 
                            data={data}
                            index={index}
                            bookmarks={bookmarks}
                            setBookmarkRename={setBookmarkRename} 
                            bookmarkRename={bookmarkRename}
                            setSelectedBookmark={setSelectedBookmark}
                            selectedBookmark={selectedBookmark}
                            handleRemoveBookmark={handleRemoveBookmark}
                            handleBookmarkNameChange={handleBookmarkNameChange}
                            key={index}
                            handleUpdate={handleUpdateBookmark}
                            navigateToPage={navigateToPage}
                        />
                    )
                })}
            </div>

        </div>
    )
}

export default Bookmarks