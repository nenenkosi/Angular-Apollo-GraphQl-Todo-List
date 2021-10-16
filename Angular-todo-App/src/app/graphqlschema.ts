import gql from 'graphql-tag'

export const Get_Todos = gql
`
  query {
    getTodo {
      id
      title
      completed
      timestamp
    }
  }
`;

export const Create_Todos = gql
`mutation Mutation($title: String!) {
  createTodo(title: $title) {
    title
  }
}
`;

export const Update_Todos = gql
`mutation Mutation($updatTodoId: String!, $title: String!, $completed: Boolean!) {
  updatTodo(id: $updatTodoId, title: $title, completed: $completed) {
    title
  }
}
 `;

 export const Delete_Todos = gql
`mutation Mutation($deleteTodoId: String!) {
  deleteTodo(id: $deleteTodoId) {
    title
  }
}
`;