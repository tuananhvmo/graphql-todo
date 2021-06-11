import Todo from '../models/todoModel.js';

export const resolvers = {
  Query: {
    getAllTodos: async () => {
      const todos = await Todo.find({});
      return todos;
    },

    getTodoById: async (parent, args) => {
      const todo = await Todo.findById(args.id);
      return todo;
    },
  },

  Mutation: {
    createTodo: async (parent, args) => {
      const newTodo = await Todo.create({
        text: args.text,
        completed: false,
      });
      return newTodo;
    },

    toggleTodo: async (parent, args) => {
      const todo = await Todo.findById(args.id);
      todo.completed = !todo.completed;

      await todo.save();
      return todo;
    },

    editTodo: async (parent, args) => {
      const { id, text } = args;
      const todo = await Todo.findById(id);

      todo.text = text || todo.text;

      await todo.save();
      return todo;
    },
    
    deleteTodo: async (parent, args) => {
      const todo = await Todo.findById(args.id);
      if (!todo) return 'No Todo Found.';

      await todo.remove();
      return 'Todo removed';
    },
  },
};
