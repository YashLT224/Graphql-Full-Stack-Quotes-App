import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"; // to enable playground
import './models/Quotes.js'
import './models/User.js'
import { resolvers } from "./resolvers.js";
import { typeDefs } from "./schemaGql.js";
import {mongoose} from "mongoose";
import jwt from 'jsonwebtoken'
import { MONGO_URI,JWT_SECRET } from "./config.js";


const mongooseOptions={
    // useNewUrlParser: true,
    useUnifiedTopology: true,
}

//Connect to MongoDB
mongoose.connect(MONGO_URI, mongooseOptions)
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit if cannot connect to database
  });


  mongoose.connection.on("connected",()=>{
    console.log("connected to mongodb")
})

mongoose.connection.on("error",(err)=>{
    console.log("error connecting",err)
})

 






const context = ({req})=>{
  const { authorization } = req.headers;
  if(authorization){
   const {userId} = jwt.verify(authorization,JWT_SECRET)
   return {userId}
  }
}

//middleware
const server=new ApolloServer({
    typeDefs,
    resolvers,
    context,
    plugins:[ApolloServerPluginLandingPageGraphQLPlayground()]
});


server.listen().then(({url})=>{
    console.log(`Server is ready at ${url}`)
});














 