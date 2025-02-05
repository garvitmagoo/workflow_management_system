import CustomHandle from "../Handle/CustomHandle";
import { Position } from "reactflow";
import styled from 'styled-components';

const ConditionNodeContainer = styled.div`
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 5px;
  padding: 10px;
  text-align: center;
  font-family: Arial, sans-serif;
  transform: rotate(45deg);
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Content = styled.div`
  transform: rotate(-45deg);
  font-size: 14px;
`;

const HandleContainer = styled.div`
  position: absolute;
  top: -20px; /* Adjust this value as needed */
  left: 50%;
  transform: translateX(-50%);
`;

const ConditionNode = ({ data }) => {
  return (
    <>
      <HandleContainer>
        <CustomHandle type="target" position={Position.Top} />
      </HandleContainer>
      <ConditionNodeContainer>
        <Content><strong>Condition:</strong> {data.taskName}</Content>
      </ConditionNodeContainer>
      <HandleContainer style={{ top: 'auto', bottom: '-20px' }}>
        <CustomHandle type="source" position={Position.Bottom} />
      </HandleContainer>
    </>
  );
};

export default ConditionNode;