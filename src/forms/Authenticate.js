import React, { useState,useEffect,createContext } from 'react'
import Login from './Login'
import Signup from './Signup'
import { useHistory } from 'react-router'



const Authenticate =({data,Setdata})=>{
const history=useHistory()
    
   
    const [login,Setlogin]=useState(true)
    

    
    return (
        <div className="authenticate">
            {
          login ? <Login  data={data} Setdata={Setdata} login={login} Setlogin={Setlogin} /> :  <Signup  data={data} Setdata={Setdata} login={login} Setlogin={Setlogin}/>
        }
        </div>
    )
}

export default Authenticate;