import { gql } from '@apollo/client';

export const Q_GET_ALL_TODOS = gql`
  {
    getAllTodos {
      text
      _id
      completed
    }
  }
`;

export const M_ADD_TODO = gql`
  mutation CreateTodo($text: String!) {
    createTodo(text: $text) {
      text
      _id
      completed
    }
  }
`;

export const M_TOGGLE_TODO = gql`
  mutation ToggleTodo($id: String!) {
    toggleTodo(id: $id) {
      text
      _id
      completed
    }
  }
`;

export const M_EDIT_TODO = gql`
  mutation EditTodo($id: String!, $text: String!) {
    editTodo(id: $id, text: $text) {
      text
      _id
      completed
    }
  }
`;

export const M_DELETE_TODO = gql`
  mutation DeleteTodo($id: String!) {
    deleteTodo(id: $id)
  }
`;
