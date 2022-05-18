import React, { useState } from 'react'
import './add.css'
import Axios from 'axios'
import Show from './Show'
const Add=()=>{
    const [empid,Setempid]=useState('')
    const [empname,Setempname]=useState('')
    const [depid,Setdepid]=useState(0)
    const [depname,Setdepname]=useState(0)
    const [joining,Setjoining]=useState(0)
    const [salary,Setsalary]=useState(0)
    const [time,Settime]=useState(0)
    const array=[
        {
          empid:0,
          EmpName:'Mukesh Chabra',
          Depid:'D01',
          Depname:'Software testing',
          Joining :'2021-07-22',
          salary: '35,000 INR'
        },
        {
          empid:1,
          EmpName:'Dinesh Verma',
          Depid:'D15',
          Depname:'Marketing',
          Joining :'2020-02-06',
          salary: '25,000 INR'
        },
        {
          empid:2,
          EmpName:'Surbhi Ranjan',
          Depid:'D08',
          Depname:'Mobile Application Development',
          Joining :'2021-01-15',
          salary: '45,000 INR'
        }
        
          ]
    const [data,Setdata]=useState(array)
         
    function add(){
 
        if(document.getElementById('id').value!='' && document.getElementById('name').value!='' && document.getElementById('maths').value!='' && document.getElementById('chemistry').value!='' && document.getElementById('physics').value!='')
        {
            let temp={
                empid:empid,
                EmpName:empname,
                Depid:depid,
                Depname:depname,
                Joining :joining,
                salary: salary
              }
              var array=data
              array.push(temp)
              Setdata(array)
              console.log(data)
              Settime(time+1)

            /*
            Axios.post("http://localhost:3001/insert",{
                studentId:studentId,
                name:name,
                maths:maths,
                english:english,
                chem:chem,
                phy,phy
            })

        props.Setdatas({
            studentId:studentId,
                name:name,
                maths:maths,
                english:english,
                chem:chem,
                phy,phy
        })
        */

        }
        else

        {
            alert('somethings empty')
        }
    }
    return (
        <div className="main-container">
        <div className="add p-2">
            <div className="field">
                <label>Employee Id</label>
                <input type="text" id="id" className="text-field"  placeholder="Employee Id" onChange={(event)=>{
                    Setempid(event.target.value)
                }} />
            </div>
            <div className="field">
                <label>Employee Name</label>
                <input type="text" id="name" placeholder="Employee name" className="text-field" onChange={(event)=>{
                    Setempname(event.target.value)
                }} />
            </div>
            <div className="field">
                <label>Department Id</label>
                <input type="text" id="maths" className="text-field" placeholder="Depatment Id" onChange={(event)=>{
                    Setdepid(event.target.value)
                }} />
            </div>
            <div className="field">
                <label>Deparment Name</label>
                <input type="text" id="english" className="text-field" placeholder="Deparment Name" onChange={(event)=>{
                    Setdepname(event.target.value)
                }} />
            </div>
            <div className="field">
                <label>Joinig date</label>
                <input type="date" id="chemistry" className="text-field" placeholder="Joininig Date" onChange={(event)=>{
                    Setjoining(event.target.value)
                }} />
            </div>
            <div className="field">
                <label>Salary (in $)</label>
                <input type="text" id="physics" className="text-field" placeholder="Salary" onChange={(event)=>{
                    Setsalary(event.target.value)
                }} />
            </div>
        
        <div className="button">
        <button className="add-button bg-green-400 p-1 rounded-md" id="btn" onClick={add}>add</button>
        </div>
        </div>
        <Show data={data} Setdata={Setdata} time={time} Settime={Settime} />
        </div>
    )
}


export default Add