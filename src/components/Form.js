import React, {useState,useEffect } from 'react'
import Axios from 'axios'
import './form.css'
const Form=()=>{



    
    /*
useEffect(()=>{
Axios.get('http://cloud.ideoholics.com:8006/parts-delivery/delivery-request/get/all').then((res)=>{
    console.log(res.data.data)
})
.catch((err)=>{
    console.log(err)
})

},[])
*/

    return(
        <div className="form">
            
            <div className="upper" id="upper">
                <div className="field">
                   <label> Demand id</label>
                   <input type="text" className="demandid-field bg-gray-400" />
                </div>
            </div>
            
        </div>
    )


}

export default Form;