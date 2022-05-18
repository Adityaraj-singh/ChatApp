import React, {useState,useEffect } from 'react'
import Axios from 'axios'
import './Home.css'
const Home=({data,Setdata})=>{

return (
    <div className="home">
        <div className="details">
        <div className="name">
            <h1>Your name : </h1>
            <h1>{data.name}</h1>
        </div>
        <div className="email">
            <h1>Email : </h1>
            <h1>{data.email}</h1>
        </div>
        </div>
        <center><button className="bg-white rounded-md signout" onClick={()=>Setdata([])}>Sign out</button></center>
    </div>
)
}

export default Home