import React from 'react';
import CustomHandle from "../Handle/CustomHandle";
import { Position } from "reactflow";
import styled from 'styled-components';

const NotificationNodeContainer = styled.div`
  background-color: #e1f5fe;
  border: 2px solid #81d4fa;
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  font-family: Arial, sans-serif;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100px;
  position: relative;
`;

const Header = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 16px;
  color: #0277bd;
`;

const Content = styled.div`
  font-size: 14px;
  color: #01579b;
`;

const NotificationNode = ({ data }) => {
  return (
    <>
      <CustomHandle type="target" position={Position.Top} />
      <NotificationNodeContainer>
        <Header>Notification</Header>
        <Content>{data.taskName}</Content>
      </NotificationNodeContainer>
      <CustomHandle type="source" position={Position.Bottom} />
    </>
  );
};

export default NotificationNode;