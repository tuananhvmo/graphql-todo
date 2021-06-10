import { gql } from 'apollo-server-core';

export const typeDefs = gql`
  type Todo {
    text: String!
    _id: String!
    completed: Boolean!
  }

  type Query {
    getAllTodos: [Todo!]!
    getTodoById(id: String!): Todo
  }

  type Mutation {
    createTodo(text: String!): Todo!
    deleteTodo(id: String!): String!
    toggleTodo(id: String!): Todo!
    editTodo(id: String!, text: String!): Todo!
  }
`;
