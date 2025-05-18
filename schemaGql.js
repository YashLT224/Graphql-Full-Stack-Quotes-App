import { gql } from "apollo-server";
//schema defination -> tagged template literals
export const typeDefs = gql`
type Quote{
    name:String
    by:IdName
}
 type IdName{
    _id:String
     firstName:String
 }
type User{
    _id:ID!
    firstName:String!
    lastName:String!
    email:String!
    quotes:[Quote]
}
type Token{
    token:String
}

type Query{
    greet:String
    users:[User!]!
    user(_id:ID):User
    quotes:[QuoteWithName]
    iquote(by:ID!):[Quote]
}

type Mutation{
  # Dummy mutations
  createUser(firstName:String!,lastName:String!,email:String!):User!
  updateUser(id:ID!,firstName:String!,lastName:String,email:String):User
  deleteUser(id:ID!):Boolean! 

  # Real mutations - work with db
  signupUser(userNew:UserInput!):User
  signinUser(userSignin:UserSigninInput!):Token
   createQuote(name:String!):String
}

input UserInput{
   firstName:String!
   lastName:String!
   email:String!
   password:String!
}
input UserSigninInput{
   email:String!
   password:String!
}
`;