import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useEffect } from 'react';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  margin-bottom: 5px;
  margin-right: 10px;
  font-weight: bold;
  color: #333;
  width: 90px;
`;

const FormField = styled.div`
  display: flex;
 
`
const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
  font-size: 1em;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
  font-size: 1em;
  margin-top: 10px;

  &:hover {
    background-color: #c82333;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9em;
  margin-top: -8px;
  margin-bottom: 10px;
`;


const NodeForm = ({ node, updateNodeData, deleteNode, onClose }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: node?.data || {},
  });

  useEffect(() => {
    if (node) {
      reset(node.data);
    }
  }, [node, reset]);

  const onSubmit = (data) => {
    console.log(data,'nodeform')
    updateNodeData(node.id, data);
    onClose();
  };

  const handleDelete = () => {
    deleteNode(node.id);
    onClose();
  };

  if (!node) {
    return null;
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormField>
        <Label htmlFor="taskName">Task Name</Label>
        <Input
          {...register('taskName', { required: 'Task Name is required' })}
        />
        </FormField>
      
        {errors.taskName && <ErrorMessage>{errors.taskName.message}</ErrorMessage>}
      <FormField>
        <Label>Assignee</Label>
        <Input
          {...register('assignee', { required: 'Assignee is required' })}
        />
        </FormField>
      
        {errors.assignee && <ErrorMessage>{errors.assignee.message}</ErrorMessage>}
      <FormField>
        <Label>Due Date</Label>
        <Input
          type="date"
          {...register('dueDate', {
            required: 'Due Date is required',
            validate: (value) => {
              const today = new Date().toISOString().split('T')[0];
              return value >= today || 'Due Date cannot be in the past';
            },
          })}
        />
         </FormField>
     
        {errors.dueDate && <ErrorMessage>{errors.dueDate.message}</ErrorMessage>}
      <Button type="submit">Save</Button>
      <DeleteButton type="button" onClick={handleDelete}>Delete Node</DeleteButton>
    </Form>
  );
};

export default NodeForm;