import React, { useCallback, useState, memo } from "react";
import { UseContext } from "../../../../context/ContextProvider";
import { useDrop } from "react-dnd";
import ChartPlot from "./components/chart/ChartPlot";
import { UseDescriptiveContext } from "../../../../context/DescriptiveProvider";
import GridLayout from "react-grid-layout";
import CustomCard from "./components/card/CustomCard";
import CustomShape from "./components/shapes/CustomShape";
import ButtonVisual from "./components/button/ButtonVisual";
import { v4 as uuidv4 } from "uuid";
const ChartDropZone = memo(({ removePlot, layout, setLayout, zoomableRef }) => {
  const {
    plotRecommendation,
    setPlotRecommendation,
    selectedBookmark,
    selectedPlot,
    setSelectedPlot,
    isDraggable,
    zoomPercent,
  } = UseDescriptiveContext();
  const { dashboardData, filteredData, setDashboardData } = UseContext();
  const [selected, setSelected] = useState(null);
  const [, drop] = useDrop(() => ({
    accept: ["CHART", "BUTTON", "SHAPE", "CARD"],
    drop: (item) => {
      if (item.type === "chart") {
        handleChartDrop(item);
      } else if (item.type === "button") {
        handleButtonDrop(item);
      } else if (item.type === "shape") {
        handleShapeDrop(item);
      } else if (item.type === "card") {
        handleCardDrop(item);
      }
    },
  }));
  const handleButtonDrop = useCallback((item) => {
    const uniqueId = uuidv4();
    setPlotRecommendation((prev) => [...prev, { ...item, id: uniqueId }]);
    setLayout((prev) => {
      const tempLayout = [...prev];
      const dashboardLength = plotRecommendation.length + 1;
      tempLayout.push({
        i: uniqueId,
        x: (dashboardLength % 3) * 40,
        y: Math.floor(dashboardLength / 3) * 20,
        w: 6,
        h: 3,
      });
      return tempLayout;
    });
  }, []);

  const handleShapeDrop = useCallback((item) => {
    const uniqueId = uuidv4();
    setPlotRecommendation((prev) => [...prev, { ...item, id: uniqueId }]);

    setLayout((prev) => {
      const tempLayout = [...prev];
      const dashboardLength = prev.length + 1;
      tempLayout.push({
        i: uniqueId,
        x: (dashboardLength % 3) * 40,
        y: Math.floor(dashboardLength / 3) * 20,
        w: 6,
        h: 3,
      });
      return tempLayout;
    });
  }, []);
  const handleCardDrop = useCallback((item) => {
    const uniqueId = uuidv4();
    setPlotRecommendation((prev) => [...prev, { ...item, id: uniqueId }]);

    setLayout((prev) => {
      const tempLayout = [...prev];
      const dashboardLength = prev.length + 1;
      tempLayout.push({
        i: uniqueId,
        x: (dashboardLength % 3) * 40,
        y: Math.floor(dashboardLength / 3) * 20,
        w: 6,
        h: 3,
      });
      return tempLayout;
    });
  }, []);

  const handleChartDrop = useCallback((item) => {
    const uniqueId = uuidv4();
    setPlotRecommendation((prev) => [...prev, { ...item, id: uniqueId }]);
    setDashboardData((prev) => [...prev, []]);
    setLayout((prev) => {
      const tempLayout = [...prev];
      tempLayout.push({
        i: uniqueId,
        x: (0 % 3) * 40 + 15,
        y: Math.floor(0 / 3) * 20,
        w: 40,
        h: 20,
      });
      setSelectedPlot(tempLayout.length - 1);
      return tempLayout;
    });
  }, []);
  const onResizeLayout = (updatedLayout, pre, newLay) => {
    setLayout((prev) => {
      const tempLayout = [...prev];
      tempLayout[pre.i] = { ...newLay, i: tempLayout[pre.i].i };
      return tempLayout;
    });
    setSelected(null);
  };
  const handleDragStart = () => {
    setSelected(true);
  };
  const handleContainerClick = (event) => {
    if (event.target === event.currentTarget) {
      setSelectedPlot("");
    }
  };

  const handleChildClick = (index) => {
    // console.log(`Child ${index} clicked`);
    setSelectedPlot(index);
    // Perform child click-specific actions here
  };

  return (
    <div
      className="w-full h-[100%] flex flex-col gap-3"
      onClick={handleContainerClick}
    >
      <div
        ref={drop}
        className="w-full h-[100%] overflow-x-auto custom-scrollbar custom-scrollbar-1"
      >
        <div ref={zoomableRef} className="h-full w-full relative">
          {selected !== null && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 8,
                backgroundColor: "transparent",
                pointerEvents: "auto", // This blocks interactions behind it
              }}
            />
          )}
          <GridLayout
            className="layout min-h-[800px]"
            style={{
              transform: `scale(${zoomPercent / 100})`,
              transformOrigin: "top left",
              transition: "transform 0.3s ease-in-out",
            }}
            // margin={[0, 0]}  // Set margin between grid items to zero
            containerPadding={[2, 0]} // Remove container padding
            isResizable={isDraggable}
            resizeHandles={["s", "w", "e", "n", "sw", "nw", "se", "ne"]}
            autoSize
            draggableHandle=".react-grid-drag-handle"
            allowOverlap
            onDragStart={handleDragStart}
            onResizeStart={handleDragStart}
            onResizeStop={onResizeLayout}
            onDragStop={onResizeLayout}
            preventCollision={true}
            rowHeight={10}
            cols={120}
            width={1325}
            maxRows={40}
            transformScale={zoomPercent / 100}
            compactType={null}
            // onDrop={(data, e)=>console.log(data, e)}
            // isDroppable
          >
            {plotRecommendation.map((data, index) => {
              const title = `${data?.yKeys
                ?.map((axis) => axis?.name)
                ?.join(", ")} by ${data?.xKey}`;
              const isSelectedBookmark = selectedBookmark?.data?.[index];

              if (
                isSelectedBookmark &&
                selectedBookmark?.data[index].isVisible
              ) {
                return (
                  <div
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent bubbling to container
                      handleChildClick(index);
                    }}
                    className={`z-${selectedPlot === index ? "10" : "1"}`}
                    data-grid={{
                      ...layout.find((lay) => lay?.i === data.id),
                      isResizable: index === selectedPlot && isDraggable,
                    }}
                  >
                    <>
                      {data.type === undefined || data.type === "chart" ? (
                        <ChartPlot
                          key={index}
                          title={
                            title.includes("_")
                              ? title.split("_").join(" ")
                              : title
                          }
                          xKey={data.xKey}
                          yKey={data.yKeys}
                          chartTypes={data.kind}
                          data={
                            filteredData
                              ? filteredData[index]
                              : dashboardData[index]
                          }
                          removePlot={removePlot}
                          index={index}
                          options={data.options}
                        />
                      ) : data.type === "button" ? (
                        <ButtonVisual data={data} />
                      ) : data.type === "shape" ? (
                        <CustomShape data={data} />
                      ) : data.type === "card" ? (
                        <CustomCard {...data} />
                      ) : (
                        <></>
                      )}
                    </>
                  </div>
                );
              } else if (!isSelectedBookmark) {
                return (
                  <div
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent bubbling to container
                      handleChildClick(index);
                    }}
                    className={`z-${selectedPlot === index ? "10" : "1"}`}
                    data-grid={{
                      ...layout.find((lay) => lay?.i === data.id),
                      isResizable: index === selectedPlot && isDraggable,
                    }}
                  >
                    <>
                      {data.type === undefined || data.type === "chart" ? (
                        <ChartPlot
                          key={index}
                          title={
                            title.includes("_")
                              ? title.split("_").join(" ")
                              : title
                          }
                          xKey={data.xKey}
                          yKey={data.yKeys}
                          chartTypes={data.kind}
                          data={
                            filteredData
                              ? filteredData[index]
                              : dashboardData[index]
                          }
                          removePlot={removePlot}
                          index={index}
                          options={data.options}
                        />
                      ) : data.type === "button" ? (
                        <ButtonVisual data={data} />
                      ) : data.type === "shape" ? (
                        <CustomShape data={data} />
                      ) : data.type === "card" ? (
                        <CustomCard {...data} />
                      ) : (
                        <></>
                      )}
                    </>
                  </div>
                );
              } else {
                return;
              }
            })}
          </GridLayout>
        </div>
      </div>
    </div>
  );
});

export default ChartDropZone;
