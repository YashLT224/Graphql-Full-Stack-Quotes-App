import User from './models/User.js'
import  Quote from './models/Quotes.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from './config.js';
// Sample data store (in a real app, this would be a database)
let users = [
    {
    _id:"4232",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
    },
    {
        _id:"23131",
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
        }
  ];


  export const quotes = [
    {
        name:"I turn coffee into code",
        by:"23131"
    },
    {
        name:"I am another quote",
        by:"23131"
    },
    {
        name:"If it works dont touch it",
        by:"4232"
    },

] 

// Define your resolvers
export const resolvers={
    Query:{
        greet:()=>'Hello, Graphql',
        users:async () => await User.find({}),
        user:async (_,{_id})=> await User.findOne({_id}),
        quotes:async ()=>await Quote.find({}).populate("by","_id firstName"),
        iquote:async (_,{by})=> await Quote.find({by})
    },
    User:{
        // quotes:(ur)=> quotes.filter(quote=>quote.by == ur._id)
        quotes:async (ur)=> await Quote.find({by:ur._id})
    },
    Mutation:{
        //dummy
        createUser:(_,{firstName,lastName,email})=>{
            const newUser={
                _id:String(users.length+1),
                firstName,
                lastName,
                email,
            };
            users.push(newUser);
            return newUser;
        },
        //dummy
        updateUser:(_,{_id,firstName,lastName,email})=>{
            const userIndex=users.findIndex(user=>user._id===_id);
            if(userIndex===-1)return null;

            const updatedUser={
                ...users[userIndex],
                ...(firstName&&{firstName}),
                ...(lastName&&{lastName}),
                ...(email && { email }),
            };
            users[userIndex]=updatedUser;
            return updatedUser;
        },
        //dummy
        deleteUser:(_,{_id})=>{
            const initialLength = users.length;
            users = users.filter(user => user._id !== _id);
            return users.length !== initialLength;
        },
        signupUser:async(_,{userNew})=>{
            const user= await User.findOne({email:userNew.email})
            if(user){
                throw new Error("user already exists with that email")
            }
            let salt=12
            const hashedPassword =  await bcrypt.hash(userNew.password,salt)
            const newUser= new User({
                ...userNew,
                password:hashedPassword
            })
            return await newUser.save()
        },
        signinUser:async(_,{userSignin})=>{

            const user =await User.findOne({email:userSignin.email})
            console.log(user)
            if(!user){
                throw new Error("User dosent exists with that email")
            }
            const doMatch =await bcrypt.compare(userSignin.password,user.password)
            if(!doMatch){
                throw new Error("email or password in invalid")
            }
            const token = jwt.sign({userId:user._id},JWT_SECRET)
            return {token}
        },
        createQuote:async(_,{name},{userId})=>{
            console.log(name)
            if(!userId) throw newError('You must be logged In')
                const newQuote= new Quote({
                name,
                by:userId
            })
             await newQuote.save()
           return "Quote saved successfully"
        }
    }
}