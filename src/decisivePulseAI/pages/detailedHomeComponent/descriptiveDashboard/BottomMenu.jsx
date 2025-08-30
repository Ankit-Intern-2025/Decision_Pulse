import React, { useEffect, useState } from "react";
import { UseDescriptiveContext } from "../../../../context/DescriptiveProvider";
import { CircularProgress, Tooltip } from "@mui/material";
import { FaRegSave } from "react-icons/fa";
import { RiFullscreenExitFill, RiFullscreenFill } from "react-icons/ri";
import { TiPlus } from "react-icons/ti";
import { IoIosClose } from "react-icons/io";
import {
  FireAlert,
  FireAlertWithCallbackAndCancel,
} from "../../../../utils/static_func";
import {
  createPage,
  deletePage,
  updatePage,
} from "../../../../http/dashboard_api";

const BottomMenu = ({
  zoomableRef,
  saveDashboard,
  selectPage,
  selectBookmark,
  fullScreenRef,
}) => {
  const {
    pages,
    sePages,
    selectedPage,
    bookmarks,
    zoomPercent,
    setZoomPercent,
  } = UseDescriptiveContext();
  const [loadingAddNewPage, setLoadingAddNewPage] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [selectedPageForRename, setSelectedPageForRename] = useState(null);

  const handleAddPage = async () => {
    setLoadingAddNewPage(true);
    const dashboardDetail = JSON.parse(
      sessionStorage.getItem("selectedDashboard")
    );
    const request = {
      dashboard_id: dashboardDetail.id,
      name: `Page ${pages.length + 1}`,
      styling: { layout: {}, options: {} },
      recommendation: [],
      data: { chart_data: [] },
    };
    try {
      const response = await createPage(request);
      if (response?.id) {
        sePages((prev) => {
          const updatedPages = [...prev, response];
          selectPage(updatedPages.length - 1, updatedPages);
          return updatedPages;
        });
      } else {
        FireAlert(
          "Information",
          "Unable to create new page, please try again",
          "info"
        );
      }
    } catch (err) {
      FireAlert(
        "Information",
        "Unable to create new page, please try again",
        "info"
      );
    } finally {
      setLoadingAddNewPage(false);
    }
  };
  const removePage = async (pageId) => {
    const dashboardDetail = JSON.parse(
      sessionStorage.getItem("selectedDashboard")
    );
    const response = await deletePage(dashboardDetail.id, pageId);
    if (response.status) {
      sePages((prev) => {
        const filteredDeletedPages = prev.filter((page) => page.id !== pageId);
        selectPage(filteredDeletedPages.length-1, filteredDeletedPages)
        return filteredDeletedPages
      });
    }
    return response;
  };
  const handleRemovePage = (pageDetail) => {
    FireAlertWithCallbackAndCancel(
      "Warning",
      "This action will delete the page permanently. Do you want to delete this page?",
      "warning",
      "",
      async () => await removePage(pageDetail.id),
      "Page deleted."
    );
  };
  const handlePageRename = (pageInd) => {
    setSelectedPageForRename(pageInd);
  };
  const handlePageNameChange = (e, id) => {
    const { name, value } = e.target;
    sePages((prev) => {
      const tempValue = [...prev];
      tempValue[id].name = value;
      return tempValue;
    });
  };
  const savePageName = async (pageId) => {
    const dashboardDetail = JSON.parse(
      sessionStorage.getItem("selectedDashboard")
    );
    const request = {
      dashboard_id: dashboardDetail.id,
      name: pages[pageId].name,
    };
    const response = await updatePage(request, pages[pageId].id);
    if (response.id) {
      setSelectedPageForRename(null);
    }
  };

  const handleZoomChange = (e) => {
    setZoomPercent(Number(e.target.value));
  };

  // Handle Ctrl + Mouse Wheel
  useEffect(() => {
    const handleWheel = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
        const delta = e.deltaY;
        setZoomPercent((prev) => {
          let newZoom = prev - delta * 0.1; // Adjust sensitivity here
          newZoom = Math.min(200, Math.max(10, newZoom)); // Clamp between 10% and 100%
          return Math.round(newZoom);
        });
      }
    };

    const zoomableEl = zoomableRef.current;
    if (zoomableEl) {
      zoomableEl.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (zoomableEl) {
        zoomableEl.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);
  // console.log(plotRecommendation, pages)

  // Toggle Fullscreen
  const toggleFullScreen = async () => {
    const el = fullScreenRef.current;
    console.log(fullScreenRef);
    if (!document.fullscreenElement) {
      if (el?.requestFullscreen) {
        await el.requestFullscreen();
        setIsFullScreen(true);
        el.style.background = "darkcyan";
        document.body.style.overflow = "hidden"; // prevent background scroll
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
        setIsFullScreen(false);
        el.style.background = "";
        document.body.style.overflow = "auto";
      }
    }
  };

  // Listen for full screen exit (via ESC key, etc.)
  useEffect(() => {
    const handleFullScreenChange = () => {
      const isFS = !!document.fullscreenElement;
      setIsFullScreen(isFS);
      document.body.style.overflow = isFS ? "hidden" : "auto";
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  return (
    <div className="w-full px-2 bg-gray-400 flex justify-between items-center rounded-md">
      <div className="w-[50%] py-2 flex gap-3 overflow-auto overflow-y-hidden text-nowrap custom-scrollbar-1">
        {pages.map((data, idx) => {
          return (
            <div
              key={idx}
              className="text-sm font-bold flex gap-2 items-center rounded-md group relative"
            >
              {pages.length !== 1 && (
                <span className="absolute top-[-10px] right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <IoIosClose
                    className="h-4 w-4 cursor-pointer hover:scale-150"
                    onClick={() => handleRemovePage(data)}
                  />
                </span>
              )}
              {selectedPageForRename === idx ? (
                <>
                  <input
                    onBlur={(e) => savePageName(idx)}
                    type="text"
                    value={data.name}
                    name="name"
                    onChange={(e) => handlePageNameChange(e, idx)}
                  />
                </>
              ) : (
                <span
                  className={`${
                    selectedPage === idx
                      ? "bg-[#19746b] text-white"
                      : "bg-white text-[#095458]"
                  } rounded-md py-2 px-2 cursor-pointer `}
                  onClick={() => {
                    selectPage(idx, pages);
                    selectBookmark(bookmarks, data);
                  }}
                  onDoubleClick={() => handlePageRename(idx)}
                >
                  {data.name}
                </span>
              )}
            </div>
          );
        })}
        <Tooltip
          title={
            loadingAddNewPage ? "Creating a page, please wait..." : "New Page"
          }
          placement="top"
        >
          <div className="text-sm font-bold flex gap-2 w-8 items-center justify-center bg-gray-300 rounded-md border">
            {loadingAddNewPage ? (
              <CircularProgress
                size={20}
                thickness={7}
                sx={{ color: "#008085" }}
              />
            ) : (
              <span
                className="bg-gray-200 rounded-sm h-full w-full flex items-center justify-center cursor-pointer"
                onClick={handleAddPage}
              >
                <TiPlus />
              </span>
            )}
          </div>
        </Tooltip>
      </div>
      <div className="w-[50%] py-2 flex justify-end items-center gap-2">
        <div className="flex text-sm items-center gap-2">
          <input
            id="zoom-slider"
            className="accent-[#008085] w-full"
            type="range"
            min="0"
            max="200"
            step="10"
            value={zoomPercent}
            onChange={handleZoomChange}
          />
          <span className="w-12 text-right">{zoomPercent}%</span>
          <span
            onClick={toggleFullScreen}
            className="p-1 bg-transparent text-white rounded hover:bg-gray-50 hover:text-gray-700 cursor-pointer"
          >
            {isFullScreen ? (
              <RiFullscreenExitFill className="h-6 w-6" />
            ) : (
              <RiFullscreenFill className="h-6 w-6" />
            )}
          </span>
        </div>
        <Tooltip title="Click to save your changes" placement="top">
          <button
            /*disabled={!isDashboardModified}*/ onClick={saveDashboard}
            className="disabled:bg-transparent disabled:text-gray-300 hover:bg-slate-500 text-white active:bg-slate-600 bg-[#006064] text-sm border rounded-md px-2 py-2 flex gap-2 items-center justify-center"
          >
            <FaRegSave className="h-5 w-5" />
            <span>Apply Changes</span>
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default BottomMenu;
