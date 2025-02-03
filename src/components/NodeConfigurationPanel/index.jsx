import NodeForm from '../../form/NodeForm';
import styled from 'styled-components';

const PanelContainer = styled.div`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  height:100vh;
  
`;

const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: transparent;
  border: none;
  font-size: 1.2em;
  cursor: pointer;
  outline: none;
  &:hover {
    color: red;
  }
  &:focus {
    outline: none;
  }
   
`;

const PanelHeader = styled.h3`
  margin-top: 0;
  font-size: 1.5em;
  color: #333;
  
`;


const NodeConfigPanel = ({ node, updateNodeData, deleteNode, onClose }) => {

  return (
    <PanelContainer>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      <PanelHeader>Node Configuration</PanelHeader>
      <NodeForm node={node} updateNodeData={updateNodeData} deleteNode={deleteNode} onClose={onClose} />
    </PanelContainer>
  );
};

export default NodeConfigPanel;