

import express from 'express'
import dotenv from 'dotenv'
import { ApolloServer, gql,ApolloError } from 'apollo-server-express'
import { getTodo, createTodo, deleteTodo, updatTodo } from './services-exporter'

dotenv.config()
const port = process.env.SERVER_PORT; // default port to listen
const app = express();


// Construct a schema, using GraphQL schema language
const typeDefs = gql`
type Todo {
    id: String
    title: String
    completed: Boolean
    timestamp: Float
  }

  type Query {
    getTodo: [Todo]
  }

  type Mutation {
    createTodo(title: String!): Todo
    updatTodo(id: String! ,title: String!, completed: Boolean!): Todo
    deleteTodo(id: String!): Todo
  }`
  ;

// Provide resolver functions for your schema fields.
const resolvers = {
  Query: {
    getTodo: () => {
      return getTodo().then((res) => {
        console.log(res);
        return res
      })
    },
  },

    // create todo Api 
    // passing the title as parameter
    // calling the services-exporter for the firebase database
  Mutation: {
    createTodo: async (parent: any, args: any) => {
      try {
        const { title } = args;
        const res = await createTodo(title)
        console.log(res)
        return res
      } catch (error) {
        throw new ApolloError(error);
      }

    },

    // delete todo Api 
    // passing the id as parameter
    // calling the services-exporter for the firebase database
    deleteTodo: async (parent: any, args: any) => {
      try {
        const { id } = args;
        const res = await deleteTodo(id)
        console.log(res)
        return res
      } catch (error) {
        throw new ApolloError(error);
      }

    },

    // Update todo Api 
    // passing the title, id and complete status as parameter
    // calling the services-exporter for the firebase database
    updatTodo: async (parent: any, args: any) => {
      try {
        const { id, title, completed } = args;
        const res = await updatTodo(id, title, completed)
        console.log(res)
        return res
      } catch (error) {
        throw new ApolloError(error);
      }

    },
  },
};

// Start server function
async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  app.get("/", (_, res) => {
    res.send("Server is running hello world :)");
  });

  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
    console.log(`server started at http://localhost:${port}${server.graphqlPath}`);
  });
}

// call the Apollo Server to start the appllication
startApolloServer()

