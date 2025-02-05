import CustomHandle from "../Handle/CustomHandle";
import { Position } from "reactflow";

const TaskNode = ({ data }) => {
  return (
    <>
      <CustomHandle type="target" position={Position.Top} />
      <div style={{ padding: 10, border: '1px solid black', borderRadius: 5 }}>
        <strong>Task:</strong> {data.taskName}
      </div>
      <CustomHandle type="source" position={Position.Bottom} />
    </>
  );
};

export default TaskNode;



