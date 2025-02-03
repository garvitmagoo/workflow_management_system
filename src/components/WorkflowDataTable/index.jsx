import React, { useMemo } from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import styled from 'styled-components';

// Styled Components
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

// Table Component
const WorkflowTable = ({ nodes, setSelectedNode }) => {
  const columns = useMemo(
    () => [
      { accessorKey: 'data.taskName', header: 'Node Name' },
      { accessorKey: 'type', header: 'Node Type' },
      { accessorKey: 'data.status', header: 'Status', cell: ({ getValue }) => getValue() || 'Pending' },
      {
        header: 'Actions',
        cell: ({ row }) => (
          <Button onClick={() => setSelectedNode(row.original)}>Edit</Button>
        ),
      },
    ],
    []
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
