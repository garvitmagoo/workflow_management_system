import {useState, useCallback} from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';
import 'reactflow/dist/style.css';

const WorkflowCanvas = ({
  nodes,
  edges,
  onEdgesChange,
  onNodesChange,
  onConnect,
  onNodesDelete,
  onNodeClick,
  onEdgesDelete,
  nodeTypes,
  isValidConnection,
}) => {
  
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodesDelete={onNodesDelete}
      onNodeClick={onNodeClick}
      onEdgesDelete={onEdgesDelete}
      nodeTypes={nodeTypes}
      isValidConnection={isValidConnection}
      fitView={true}
    >
      <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      <MiniMap zoomable pannable />
      <Controls />
    </ReactFlow>
  );
};

export default WorkflowCanvas;