import React, { useState,useEffect} from 'react'
import './tempol.css'

const Tempol=({signin,Setsiginin})=>{
    const [id,Setid]=useState('')
    const [password,Setpassword]=useState('')
    const [error,Seterror]=useState('')
    const credentials={
        username:"Admin",
        password:'password123'
      }
    
     function submit()
     {
         
     if(id && password)
     {
       if(id==credentials.username)
       {
         if(password==credentials.password)
         {
           Setsiginin(true)
        
         }
         else{
           Seterror('incorrect password')
         }
       }
       else{
        Seterror('Incorrect Id')
      }
     }
    
     }


     return(
        <div className="tempol">
            <div className="main">
              <h3>Admin Login</h3>
              <div className="form">
              <div className="field">
              <label>User id</label>
              <input type="text" className="userid" onChange={(e)=>Setid(e.target.value)} />
              </div>
              <div className="field">
              <label>Password</label>
              <input type="password" className="password" onChange={(e)=>Setpassword(e.target.value)} />
              </div>
              <span className="text-red-400"><strong>{error}</strong></span>
              <div className="field">
                <button type="button" className="submit-btn bg-green-400" onClick={submit} >Login</button>
              </div>
            </div>
            </div>
        </div>
      )



}

export default Tempol