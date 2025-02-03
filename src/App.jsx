import React, { useMemo, useState, useCallback } from 'react';
import WorkflowCanvas from './components/WorkFlowCanvas';
import TaskNode from './components/Nodes/TaskNode';
import ConditionNode from './components/Nodes/ConditionNode';
import NotificationNode from './components/Nodes/NotificationNode';
import NodeConfigPanel from './components/NodeConfigurationPanel';
import WorkflowDataTable from './components/WorkflowDataTable';
import useWorkflowState from './hooks/useWorkflowState';
import Button from './components/UI/Button';
import styled from 'styled-components';

const initialNodes = [
  { id: '1', type: 'task', position: { x: 220, y: 5 }, data: { taskName: 'Task Node', assignee: '', dueDate: '' } },
];

const initialEdges = [];

const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex-direction: row;

`;

const FlowContainer = styled.div`
  flex: 1;
  height: 70vh;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  height: 80vh;
 
    
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
`;


const PanelContainer = styled.div`
  width: ${(props) => (props.$isvisible ? '300px' : '0')};
  transition: width 0.3s ease;
  overflow: hidden;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
   width: ${(props) => (props.$isvisible ? '400px' : '0')};
  
`;

const FileInput = styled.input`
  display: none;
`;

const FileInputLabel = styled.label`
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;

const App = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodesDelete,
    onEdgesDelete,
    addNewNode,
    nodeUpdate,
    edgeUpdate,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useWorkflowState(initialNodes, initialEdges);

  const nodeTypes = useMemo(() => ({
    task: TaskNode,
    condition: ConditionNode,
    notification: NotificationNode,
  }), []);

  const isValidConnection = useCallback((connection) => {
    const sourceNode = nodes.find((node) => node.id === connection.source);
    const targetNode = nodes.find((node) => node.id === connection.target);

    if (sourceNode.type === 'task' && targetNode.type === 'notification') {
      return true;
    }

    if (sourceNode.type === 'condition' && targetNode.type === 'task') {
      return false;
    }

    return true;
  }, [nodes]);

  const updateNodeData = useCallback((id, data) => {
    const updatedNodes = nodes.map((node) => (node.id === id ? { ...node, data } : node));
    nodeUpdate(updatedNodes)
    setSelectedNode(null);
  }, [nodes, onNodesChange]);

  const deleteNode = useCallback((id) => {
    onNodesDelete([{ id }]);
    setSelectedNode(null);
  }, [onNodesDelete]);

  const exportWorkflow = useCallback(() => {
    const dataStr = JSON.stringify({ nodes, edges });
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
  
    const exportFileDefaultName = 'workflow.json';
  
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }, [nodes, edges]);
  
  const importWorkflow = useCallback((event) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const importedData = JSON.parse(e.target.result);
      
      onNodesChange([{ type: 'remove', id: 'all' }]);
      onEdgesChange([{ type: 'remove', id: 'all' }]);
      nodeUpdate(importedData.nodes.map(node => node));
      onEdgesChange(importedData.edges.map(edge => edge));
    };
    fileReader.readAsText(event.target.files[0]);
  }, [onNodesChange, onEdgesChange]);

  return (
    <Main>
      <Container>
        <FlowContainer>
          <WorkflowCanvas
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodesDelete={onNodesDelete}
            onNodeClick={(event, node) => setSelectedNode(node)}
            onEdgesDelete={onEdgesDelete}
            nodeTypes={nodeTypes}
            isValidConnection={isValidConnection}
          />
          <ButtonGroup>
            <Button onClick={() => addNewNode('task')}>Add Task Node</Button>
            <Button onClick={() => addNewNode('condition')}>Add Condition Node</Button>
            <Button onClick={() => addNewNode('notification')}>Add Notification Node</Button>
            <Button onClick={undo} disabled={!canUndo}>Undo</Button>
            <Button onClick={redo} disabled={!canRedo}>Redo</Button>
            <Button onClick={exportWorkflow}>Export Workflow</Button>
            <FileInputLabel>
              Import Workflow
              <FileInput type="file" accept=".json" onChange={importWorkflow} />
            </FileInputLabel>
          </ButtonGroup>
        </FlowContainer>
        <PanelContainer $isvisible={!!selectedNode}>
          {selectedNode && (
            <NodeConfigPanel
              node={selectedNode}
              onClose={() => setSelectedNode(null)}
              updateNodeData={updateNodeData}
              deleteNode={deleteNode}
            />
          )}
        </PanelContainer>
      </Container>
      <TableContainer>
        <WorkflowDataTable nodes={nodes} setSelectedNode={setSelectedNode} updateNodeData={updateNodeData} />
      </TableContainer>
    </Main>
  );
};

export default App;