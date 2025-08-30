import React, { useCallback, useEffect, useState } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  StepEdge,
  // useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import TableBox from "./TableBox";


const nodeTypes = {
    "table": TableBox
}

export default function FlowDashboard({initialNodes, initialEdges, setPostData}) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => {
      console.log(params)
      const tempParams = { ...params };
      tempParams["id"] = `e-${tempParams.source}-${tempParams.sourceHandle}-${tempParams.target}-${tempParams.targetHandle}`;
      if (tempParams.source !== tempParams.target) {
        tempParams.style={ stroke: "#095458" } 
        tempParams.type = 'step'
        console.log('Connection Parameters:', tempParams);
    
        setEdges((eds) => {
          console.log(eds)
          const combineEdges = addEdge(tempParams, eds)
          setPostData(combineEdges.map(data=>{
            const {style, type, ...postData} = data
            return postData
          }));
          return combineEdges
        });
      }
    },
    [nodes, setEdges, setPostData]
  );
  
  // Handle node selection
  const handleNodeSelection = (event, node) => {
    console.log('Selected Node:', node);
    setNodes((nodes) =>
      nodes.map((n) =>
        n.id === node.id
          ? { ...n, style: { ...n.style, border: '2px solid red' } } // Highlight selected node
          : n
      )
    );
  };

  // Handle edge selection
  const handleEdgeSelection = (event, edge) => {
    console.log('Selected Edge:', edge);
    setEdges((edges) =>
      edges.map((e) =>
        e.id === edge.id
          ? { ...e, style: { ...e.style, stroke: 'red' } } // Highlight selected edge
          : e
      )
    );
  };

  // Handle deletion
  const handleDelete = (nodeId) => {
    setNodes((nodes) => nodes.filter((node) => node.id !== nodeId));
    setEdges((edges) => edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
  };

  // Handle focus
  const handleFocus = (nodeId) => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === nodeId
          ? { ...node, style: { ...node.style, boxShadow: '0px 0px 5px 3px blue' } }
          : node
      )
    );
  };

  return (
    <div style={{ width: "100%", height: "90%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}

        // onNodeClick={handleNodeSelection}
        // onEdgeClick={handleEdgeSelection}
        // onNodeFocus={(e, node) => handleFocus(node.id)}
        
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={{ step: StepEdge }}
      >
        <Controls />
        <Background color="#E1DFDD" />
      </ReactFlow>
    </div>
  );
}

