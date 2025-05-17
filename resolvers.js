// Sample data store (in a real app, this would be a database)
let users = [
    {
    id:"4232",
      name: "John Doe",
      email: "john@example.com",
      age: 30
    },
    {
        id:"23131",
          name: "John Doe",
          email: "john@example.com",
          age: 30
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
        users:()=>users,
        user:(_,{id})=>{           //fieldName: (parent, args, context, info) => { /* ... */ }  // first argument is parent 
            return users.find(user=>user.id===id);
        },
        quotes:()=>quotes,
        iquote:(_,{by})=> quotes.filter((quote)=>quote.by==by) 
    },
    User:{
        quotes:(ur)=> quotes.filter(quote=>quote.by == ur.id)
    },
    Mutation:{
        createUser:(_,{name,email,age})=>{
            const newUser={
                id:String(users.length+1),
                name,
                email,
                age
            };
            users.push(newUser);
            return newUser;
        },
        updateUser:(_,{id,name,email,age})=>{
            const userIndex=users.findIndex(user=>user.id===id);
            if(userIndex===-1)return null;

            const updatedUser={
                ...users[userIndex],
                ...(name&&{name}),
                ...(email && { email }),
                ...(age && { age })
            };
            users[userIndex]=updatedUser;
            return updatedUser;
        },
        deleteUser:(_,{id})=>{
            const initialLength = users.length;
            users = users.filter(user => user.id !== id);
            return users.length !== initialLength;
        }
    }
}