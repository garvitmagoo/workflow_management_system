import { useState } from 'react';

const useUndoRedo = (initialState) => {
  const [history, setHistory] = useState([initialState]);
  const [index, setIndex] = useState(0);

  const state = history[index];

  const updateState = (newState) => {
    if (JSON.stringify(state) === JSON.stringify(newState)) return;
    
    const newHistory = [...history.slice(0, index + 1), newState];
    setHistory(newHistory);
    setIndex(newHistory.length - 1);
  };

  const silentUpdateState = (newState) => {
    const newHistory = [...history];
    newHistory[index] = newState;
    setHistory(newHistory);
  };

  const undo = () => index > 0 && setIndex(index - 1);
  const redo = () => index < history.length - 1 && setIndex(index + 1);

  return {
    state,
    updateState,
    silentUpdateState,
    undo,
    redo,
    canUndo: index > 0,
    canRedo: index < history.length - 1,
  };
};

export default useUndoRedo;