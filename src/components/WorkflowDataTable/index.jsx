import  { useMemo, useState } from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import styled from 'styled-components';

const TableContainer = styled.div`
  width: 80%;
  margin: 20px auto;
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
`;

const Thead = styled.thead`
  background: #f4f4f4;
`;

const Th = styled.th`
  padding: 10px;
  text-align: left;
  border-bottom: 2px solid #ddd;
 
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background: #fafafa;
  }
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
   text-transform: capitalize;
`;

const Input = styled.input`
  padding: 6px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border 0.3s ease;

  &:focus {
    outline: none;
    border: 1px solid #007bff;
  }
`;

const Button = styled.button`
  padding: 6px 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #0056b3;
  }
`;

const WorkflowTable = ({ nodes, updateNodeData }) => {
  const [editingCell, setEditingCell] = useState(null); 
  const [editValue, setEditValue] = useState(""); 

  const handleEdit = (nodeId, columnId, value) => {
    setEditValue(value);
  };

  const saveEdit = (nodeId, columnId) => {
    if (editValue.trim() === "") return; 

    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return;

    const updatedNode = {
      ...node.data,
      [columnId]: editValue,
    };

    updateNodeData(nodeId, updatedNode);
    setEditingCell(null);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'taskName',
        header: 'Task Name',
        cell: ({ row }) => {
          const node = row.original;
          const isEditing = editingCell?.id === node.id && editingCell?.columnId === 'taskName';

          return isEditing ? (
            <Input
              type="text"
              value={editValue}
              onChange={(e) => handleEdit(node.id, 'taskName', e.target.value)}
              onBlur={() => saveEdit(node.id, 'taskName')}
              onKeyDown={(e) => e.key === 'Enter' && saveEdit(node.id, 'taskName')}
              autoFocus
            />
          ) : (
            <span
              onClick={() => {
                setEditingCell({ id: node.id, columnId: 'taskName' });
                setEditValue(node.data.taskName);
              }}
              style={{ cursor: 'pointer' }}
            >
              {node.data.taskName}
            </span>
          );
        },
      },
      {
        accessorKey: 'type',
        header: 'Node Type',
      },
      {
        accessorKey: 'assignee',
        header: 'Assignee',
        cell: ({ row }) => {
          const node = row.original;
          const isEditing = editingCell?.id === node.id && editingCell?.columnId === 'assignee';

          return isEditing ? (
            <Input
              type="text"
              value={editValue}
              onChange={(e) => handleEdit(node.id, 'assignee', e.target.value)}
              onBlur={() => saveEdit(node.id, 'assignee')}
              onKeyDown={(e) => e.key === 'Enter' && saveEdit(node.id, 'assignee')}
              autoFocus
            />
          ) : (
            <span
              onClick={() => {
                setEditingCell({ id: node.id, columnId: 'assignee' });
                setEditValue(node.data.assignee);
              }}
              style={{ cursor: 'pointer' }}
            >
              {node.data.assignee}
            </span>
          );
        },
      },
      {
        accessorKey: 'dueDate',
        header: 'Due Date',
        cell: ({ row }) => {
          const node = row.original;
          const isEditing = editingCell?.id === node.id && editingCell?.columnId === 'dueDate';

          return isEditing ? (
            <Input
              type="date"
              value={new Date(editValue).toISOString().split('T')[0]}
              onChange={(e) => handleEdit(node.id, 'dueDate', new Date(e.target.value).toISOString().split('T')[0])}
              onBlur={() => saveEdit(node.id, 'dueDate')}
              autoFocus
            />
          ) : (
            <span
              onClick={() => {
                setEditingCell({ id: node.id, columnId: 'dueDate' });
                setEditValue(node.data.dueDate);
              }}
              style={{ cursor: 'pointer' }}
            >
              {new Date(node.data.dueDate).toLocaleDateString()}
            </span>
          );
        },
      },
    ],
    [editingCell, editValue, nodes]
  );

  const table = useReactTable({ data: nodes, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <TableContainer>
      <Table>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Td>
              ))}
            </Tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default WorkflowTable;
