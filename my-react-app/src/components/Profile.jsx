import React from 'react'
import { useQuery } from '@apollo/client';
import { GET_MY_PROFILE } from '../gqlOperations/queries';
import {useNavigate} from 'react-router-dom'

const Profile = () => {
  const navigate  = useNavigate()
  const {loading,error,data} = useQuery(GET_MY_PROFILE)
  if(!localStorage.getItem("token")){
    navigate("/login")
    return <h1>unauthorized</h1>
}
if(loading) return <h2>Profile is loading</h2>
if(error){
    console.log(error)
}

  return (
    <div className="container my-container">
         <div className="center-align">
         <img className="circle" style={{border:"2px solid",marginTop:"10px"}} src="https://robohash.org/ram.png?size=200x200" alt="pic" />
         <h5>{data.user.firstName} {data.user.lastName}</h5>
         <h6>Email - {data.user.email}</h6>
         </div>
         <h3>Your quotes</h3>
         {
                 data.user.quotes.map((quo,i)=>{
                     return(
                         <blockquote key={i}>
                            <h6>{quo.name}</h6>
                        </blockquote> 
                     )
                 })
             }
    </div>
  )
}

export default Profile