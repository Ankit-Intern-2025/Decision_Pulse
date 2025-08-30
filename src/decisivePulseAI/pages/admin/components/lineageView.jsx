import React, { useCallback } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "@xyflow/react";
import { Handle } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import EarthIcon from "@mui/icons-material/Public";
import { Box, Button } from "@mui/material";
import DateModeling from "../../../components/admin/DataModeling/DateModeling";
import { CustomContainer } from "../../developer/component/detailsPage";


const dummyData = {
  name: "Data",
  url: "https://example.com/sales-data",
  columns: ["Custom Key"],
};

const TableBox = ({ data }) => (
  <div
    style={{
      padding: "15px",
      backgroundColor: "#f7f7f7",
      border: "1px solid #ccc",
      borderRadius: "8px",
      width: "180px",
      boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
      position: "relative",
    }}
  >
    <Handle
      type="target"
      position="left"
      id="target-handle"
      style={{
        backgroundColor: "#007A7F",
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        top: "50%",
        transform: "translateY(-50%)",
      }}
    />

    <div style={{ display: "flex", alignItems: "center" }}>
      <EarthIcon style={{ marginRight: "10px", color: "#006064" }} />
      <h4 style={{ fontSize: "14px", fontWeight: "bold", margin: 0 }}>{data.name}</h4>
    </div>

    <div style={{ marginTop: "10px", fontSize: "12px", color: "#555" }}>
      <a
        href={data.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#006064", textDecoration: "none" }}
      >
        {data.url}
      </a>
    </div>

    <ul style={{ listStyleType: "none", padding: "5px 0", margin: "0" }}>
      {data.columns.map((col, idx) => (
        <li key={idx} style={{ fontSize: "12px", color: "#555" }}>
          {col}
        </li>
      ))}
    </ul>

    <Handle
      type="source"
      position="right"
      id="source-handle"
      style={{
        backgroundColor: "#007A7F",
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        top: "50%",
        transform: "translateY(-50%)",
      }}
    />
  </div>
);

const initialNodes = [
    {
      id: "1",
      position: { x: -300, y: 0 },
      data: { ...dummyData, name: "Datasource 1", url: "https://example.com/node-1" },
      type: "table",
    },
    {
      id: "2",
      position: { x: 100, y: 50 },
      data: { ...dummyData, name: "Mediator 1", url: "https://example.com/node-2" },
      type: "table",
    },
    {
      id: "3",
      position: { x: 400, y: -100 },
      data: { ...dummyData, name: "Aggregator 1", url: "https://example.com/node-3" },
      type: "table",
    },
    {
      id: "4",
      position: { x: 400, y: 150 },
      data: { ...dummyData, name: "Aggregator 2", url: "https://example.com/node-4" },
      type: "table",
    },
    {
      id: "5",
      position: { x: 700, y: 50 },
      data: { ...dummyData, name: "Output 1", url: "https://example.com/node-5" },
      type: "table",
    },
    {
      id: "6",
      position: { x: -300, y: 200 },
      data: { ...dummyData, name: "Datasource 2", url: "https://example.com/node-6" },
      type: "table",
    },
  ];
  
  const initialEdges = [
    { id: "e1-2", source: "1", sourceHandle: "source-handle", target: "2", targetHandle: "target-handle", animated: true },
    { id: "e6-2", source: "6", sourceHandle: "source-handle", target: "2", targetHandle: "target-handle", animated: true },
    { id: "e2-3", source: "2", sourceHandle: "source-handle", target: "3", targetHandle: "target-handle", animated: true },
    { id: "e2-4", source: "2", sourceHandle: "source-handle", target: "4", targetHandle: "target-handle", animated: true },
    { id: "e3-5", source: "3", sourceHandle: "source-handle", target: "5", targetHandle: "target-handle", animated: true },
    { id: "e4-5", source: "4", sourceHandle: "source-handle", target: "5", targetHandle: "target-handle", animated: true },
  ];
  

const nodeTypes = {
  table: TableBox,
};

export default function LineageView() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges]
  );

  return (
<CustomContainer
  ClassNamesWidth={"100%"}
>
  {/* Button Container */}
  <Box
    sx={{
      backgroundColor: "#095458",
      display: 'flex',
      justifyContent: 'end',
      alignItems: 'center',
      border: "3px",
      padding: "8px",
      gap: 2, // Space between buttons
      // marginBottom: 2, // Space below the button container
    }}
  >
  <Button
      variant="text"
      sx={{
        fontFamily: "Poppins, sans-serif",
        // backgroundColor: '#00B8C0',
        color: 'white',
        // '&:hover': { backgroundColor: '#e68900' },
      }}
    >filter
    </Button>
  </Box>
  <Box
    sx={{
      backgroundColor: "#EDEDED",
      display: 'flex',
      justifyContent: 'end',
      alignItems: 'center',
      border: "3px",
      padding: "8px",
      gap: 2, // Space between buttons
      // marginBottom: 2, // Space below the button container
    }}
  >
    <Button variant="text" sx={{
          fontFamily: "Poppins, sans-serif",color: 'black'}}>Create</Button>
    <Button variant="text" sx={{
          fontFamily: "Poppins, sans-serif",color: 'black'}}>Setting</Button>
    <Button variant="text" sx={{
          fontFamily: "Poppins, sans-serif",color: 'black'}}>Access</Button>
    <Button variant="text" sx={{
          fontFamily: "Poppins, sans-serif",color: 'black'}}>Lineage View</Button>
    <Button
      variant="contained"
      sx={{
        fontFamily: "Poppins, sans-serif",
        backgroundColor: '#00B8C0',
        color: 'white',
        '&:hover': { backgroundColor: '#e68900' },
      }}
    >
      Export
    </Button>
  </Box>

  {/* Second Box (ReactFlow and DataModelling) */}
  <Box
    sx={{
      backgroundColor: 'white',
      padding: 4,
      borderRadius: 2,
      boxShadow: 2,
      height: 'calc(100vh - 160px)', // Adjust height to fit viewport with space for the button container
    }}
  >
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
      style={{ width: '100%', height: 'calc(100% - 40px)' }} // Reserve space for DataModelling
    >
      <Controls />
      <Background color="#E1DFDD" gap={24} />
    </ReactFlow>
  </Box>
  <DateModeling classNameStyle={"bg-white"}/>
</CustomContainer>

  );
}
