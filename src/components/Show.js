import React, {useState,useEffect } from 'react'
import './Show.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import Axios from 'axios'
const Show=({data,Setdata,time,Settime})=>{
 
  /*
  useEffect(()=>{
    Axios.get(`http://localhost:3001/read`).then((res)=>{ 
      Seteverything(res.data)
    })

  },[props.datas])

   dispatch({id:temp[0].id,name:temp[0].name,description:temp[0].description,price:temp[0].price})
  */
  const [newname,Setnewname]=useState(false)
  const [newdepid,Setnewdepid]=useState(false)
  const [newdepname,Setnewdepname]=useState(false)
  const [newjoining,Setnewjoining]=useState(false)
  const [newsalary,Setnewsalary]=useState(false)

 

    
      function remove(e){

      const id=e.target.value
  
      let temp=data
      let variable=temp.filter(item=>item.empid!=id)
      Setdata(variable)
      
     
      
      /*
      Axios.delete(`http://localhost:3001/delete/${id}`).then((res)=>{
        Seteverything(res.data)
      })
      */
      }
    
  
      function update(e)
      {
    
        var select=document.getElementById('emp-select').value
        
        if(select!=='null')
        {
          let temp=data.filter(user=>user.empid==select)
          if(newname)
          {
            temp[0].EmpName=newname
          }
          if(newdepid)
          {
            temp[0].Depid=newdepid
          }
          if(newdepname){
            temp[0].Depname=newdepname
          }
          if(newjoining){
            temp[0].Joining=newjoining
          }

          if(newsalary)
          {
            temp[0].salary=newsalary
          }
         
          var index=data.findIndex(x => x.empid ==select)
         var temparray=data
         temparray[index]=temp[0]
        Setdata(temparray)
        Settime(time+1)
          
        }
      
      
    
      }

  function get(e)
  {
   
   /*
    
    Axios.get(`http://localhost:3001/sort/${e.target.value}`).then((res)=>{ 
      Seteverything(res.data)
    })
    */
  }

    return(
        <div className="show">
       <div className="update-column">
         <select  name="employees" id="emp-select" >
         <option value='null'>Select Employee </option>
        {data.map((user,index)=>{

          return( <option value={user.empid}>{user.EmpName} </option>)
        })}

         </select>
         <input type="text" className="update-name" onChange={(e)=>Setnewname(e.target.value)}  placeholder="Update name" />
         <input type="text" className="update-name" placeholder="Update Department id" onChange={(e)=>Setnewdepid(e.target.value)} />
         <input type="text" className="update-name" placeholder="Update Department Name" onChange={(e)=>Setnewdepname(e.target.value)} />
         <input type="date" className="update-name" placeholder="Update Joininig" onChange={(e)=>Setnewjoining(e.target.value)} />
         <input type="text" className="update-name" placeholder="Update salary" onChange={(e)=>Setnewsalary(e.target.value + ' INR')} />

         <button className="update bg-blue-400 rounded-md" id="update" onClick={update} >Update</button>
       </div>
          <Table  striped bordered hover size="sm">
  <thead>
    <tr>
      <th>Employee ID</th>
      <th>Employee Name</th>
      <th>Deparment ID  </th>
      <th>Department Name</th>
      <th>Joining </th>
      <th>Salary </th>
      <th>Delete </th>
    </tr>
  </thead>
  <tbody>
   
       {
         data.map((user,index)=>{

          return (
            <tr className={user.empid}>
       <td>{user.empid}</td>
       <td>{user.EmpName}</td>
       <td>{user.Depid}</td>
       <td>{user.Depname}</td>  
       <td>{user.Joining}</td>  
       <td>{user.salary}</td> 
       <td><center><button className="delete bg-red-500"  value={user.empid}  onClick={remove}>delete</button></center></td>  
        

       </tr> 
          )
         })
       }
        
    
    
      
    
  </tbody>
</Table>
        </div>
    )
}
 
export default Show
