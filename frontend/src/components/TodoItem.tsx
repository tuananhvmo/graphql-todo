import React, { useState } from 'react';
import { Button, FormControl, ListGroup, Spinner } from 'react-bootstrap';
import { ITodo } from '../interfaces/Todo';
import { useMutation } from '@apollo/client';
import {
  M_DELETE_TODO,
  M_EDIT_TODO,
  M_TOGGLE_TODO,
  Q_GET_ALL_TODOS,
} from '../graphql/todoGraphql';

interface ITodoItemProps {
  todo: ITodo;
}

const TodoItem: React.FC<ITodoItemProps> = ({ todo }) => {
  const [term, setTerm] = useState<ITodo['text']>('');

  const [toggleTodo] = useMutation(M_TOGGLE_TODO);
  const [editTodo, { loading: editLoading }] = useMutation(M_EDIT_TODO, {
    refetchQueries: [{ query: Q_GET_ALL_TODOS }],
  });
  const [deleteTodo, { loading: deleteLoading }] = useMutation(M_DELETE_TODO, {
    refetchQueries: [{ query: Q_GET_ALL_TODOS }],
  });

  const handleEdit = (id: ITodo['_id'], text: ITodo['text']) => {
    editTodo({
      variables: { id, text },
      refetchQueries: [{ query: Q_GET_ALL_TODOS }],
    });
    setTerm('');
  };

  return (
    <ListGroup.Item key={todo._id}>
      <div className='d-flex justify-content-between align-center mb-1'>
        <p
          onClick={() =>
            toggleTodo({
              variables: { id: todo._id },
            })
          }
          className={`todo-text ${todo.completed ? 'completed' : null}`}
        >
          {editLoading ? (
            <Spinner
              as='span'
              animation='border'
              size='sm'
              role='status'
              aria-hidden='true'
              className='mr-1'
            />
          ) : (
            todo.text
          )}
        </p>

        <Button
          onClick={() =>
            deleteTodo({
              variables: { id: todo._id },
            })
          }
          variant='danger'
          size='sm'
        >
          {deleteLoading ? (
            <Spinner
              as='span'
              animation='border'
              size='sm'
              role='status'
              aria-hidden='true'
              className='mr-1'
            />
          ) : (
            'Delete'
          )}
        </Button>
      </div>

      <div className='d-flex '>
        <FormControl value={term} onChange={(e) => setTerm(e.target.value)} />
        <Button
          onClick={() => handleEdit(todo._id, term)}
          variant='info'
          size='sm'
          className='d-flex justify-content-center align-items-center'
        >
          Update
        </Button>
      </div>
    </ListGroup.Item>
  );
};

export default TodoItem;
