import './App.css';
import {
  Container,
  Form,
  FormControl,
  InputGroup,
  ListGroup,
} from 'react-bootstrap';
import { useState } from 'react';
import { ITodo } from './interfaces/Todo';
import { gql, useMutation, useQuery } from '@apollo/client';
import { M_ADD_TODO, Q_GET_ALL_TODOS } from './graphql/todoGraphql';
import TodoItem from './components/TodoItem';
import Loader from './components/Loader';

function App() {
  const [term, setTerm] = useState<ITodo['text']>('');

  const { data, loading } = useQuery(Q_GET_ALL_TODOS);
  const todos = data?.getAllTodos;

  const [createTodo] = useMutation(M_ADD_TODO, {
    update(cache, { data: { createTodo } }) {
      cache.modify({
        fields: {
          todos(existingTodos = []) {
            const newTodoRef = cache.writeFragment({
              data: createTodo,
              fragment: gql`
                fragment NewTodo on Todo {
                  _id
                  text
                  completed
                }
              `,
            });
            return [...existingTodos, newTodoRef];
          },
        },
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTodo({
      variables: { text: term },
      refetchQueries: [{ query: Q_GET_ALL_TODOS }],
    });
    setTerm('');
  };

  return (
    <Container className='container-sm'>
      <div className='mt-5'>
        <h1 className='text-center'>Todo list with Graphql</h1>
      </div>

      <Form className='mt-3' onSubmit={(e) => handleSubmit(e)}>
        <InputGroup className='mb-3'>
          <InputGroup.Text>New todo</InputGroup.Text>
          <FormControl onChange={(e) => setTerm(e.target.value)} value={term} />
        </InputGroup>
      </Form>

      <div>
        <ListGroup>
          {loading && <Loader />}
          {data && todos.map((todo: ITodo) => <TodoItem todo={todo} />)}
        </ListGroup>
      </div>
    </Container>
  );
}

export default App;
