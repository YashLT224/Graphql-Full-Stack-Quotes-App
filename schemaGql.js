import { gql } from "apollo-server";
//schema defination -> tagged template literals
export const typeDefs=gql`
type Quote{
    name:String
    by:ID
}
type User{
    id:ID!
    name:String!
    email:String!
    age:Int
    quotes:[Quote]
}

type Query{
    greet:String
    users:[User!]!
    user(id:ID):User
    quotes:[Quote]
    iquote(by:ID!):[Quote]
}

type Mutation{
  createUser(name:String!,email:String!, age:Int):User!
  updateUser(id:ID!,name:String,email:String,age:Int):User
  deleteUser(id:ID!):Boolean!
}
`;