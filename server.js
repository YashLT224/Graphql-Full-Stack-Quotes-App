import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"; // to enable playground
import { resolvers } from "./resolvers";
import { typeDefs } from "./schemaGql";








const server=new ApolloServer({
    typeDefs,
    resolvers,
    plugins:[ApolloServerPluginLandingPageGraphQLPlayground()]
});


server.listen().then(({url})=>{
    console.log(`Server is ready at ${url}`)
});














 