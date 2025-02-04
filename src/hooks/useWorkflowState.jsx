import { useCallback } from 'react';
import { addEdge, applyNodeChanges, applyEdgeChanges } from 'reactflow';
import useUndoRedo from './useUndoRedo';

const useWorkflowState = (initialNodes, initialEdges) => {
  const {
    state: { nodes, edges },
    updateState,
    silentUpdateState,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useUndoRedo({ nodes: initialNodes, edges: initialEdges });

  const onNodesChange = useCallback(
    (changes) => {
      const positionChanges = changes.filter(c => c.type === 'position' || c.type === 'dimensions');
     
        const positionedNodes = applyNodeChanges(positionChanges, nodes);
        silentUpdateState({ nodes: positionedNodes, edges });
      
    },
    [nodes, edges, updateState, silentUpdateState]
  );

  const nodeUpdate = useCallback(
    (updatedNodes) => {
       updateState({ nodes: updatedNodes, edges });
      
    },
    [nodes, edges, updateState]
  );

  const edgeUpdate = useCallback(
    (updatedEdges) => {
       updateState({ nodes, edges: updatedEdges });
      
    },
    [nodes, edges, updateState]
  );

  const onEdgesChange = useCallback(
    (changes) => {
      const updatedEdges = applyEdgeChanges(changes, edges);
      console.log(changes, edges)
      updateState({ nodes, edges: updatedEdges });
    },
    [nodes, edges, updateState]
  );

  const onConnect = useCallback(
    (params) => {
      const newEdges = addEdge(params, edges);
      updateState({ nodes, edges: newEdges });
    },
    [nodes, edges, updateState]
  );

  const onNodesDelete = useCallback(
    (deleted) => {
      const updatedNodes = nodes.filter((node) => !deleted.some((d) => d.id === node.id));
      const updatedEdges = edges.filter((edge) => !deleted.some((node) => node.id === edge.source || node.id === edge.target));
      updateState({ nodes: updatedNodes, edges: updatedEdges });
    },
    [nodes, edges, updateState]
  );

  const onEdgesDelete = useCallback(
    (deleted) => {
      const updatedEdges = edges.filter((edge) => !deleted.some((d) => d.id === edge.id));
      updateState({ nodes, edges: updatedEdges });
    },
    [nodes, updateState]
  );

  const addNewNode = useCallback((type) => {
    const newNode = {
      id: Date.now().toString(),
      type,
      position: { x: Math.random() * 300, y: Math.random() * 300 },
      data: { taskName: 'New Task', assignee: 'Test', dueDate: new Date().toISOString().split('T')[0] },
    };
    updateState({ nodes: [...nodes, newNode], edges });
  }, [nodes, edges, updateState]);


  return {
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
  };
};

export default useWorkflowState;