import React from 'react'
import './New.css'
import {CalendarFilled } from '@ant-design/icons';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {FaMedal} from 'react-icons/fa'
import {Table} from 'react-bootstrap'
import {RiTimerFill} from 'react-icons/ri'
const Newhome=()=>{
    var current={
        backgroundImage:'url('+process.env.PUBLIC_URL+'Wallmax-4039.jpg'+')',
        
    }
    
    return(
        <div className="temp">
            <div className="top-bars">
                <div className="left-bar">
                  <h4 className="logo"> <Avatar className="L-icon" shape="square" size={38} > L </Avatar>  PHYSIOAI</h4>
                </div>
                <div className="right-bar">
                    <div className="inner-right-bar">
                        <div className="schedule"><CalendarFilled className="calendar-icon" /> Schedule</div>
                        <div className="username"><Avatar size={32} icon={<UserOutlined />} /> Rahul Bajaj</div>
                    </div>
                </div>
            </div>
            <div className="body">
                <div className="left-body" style={current} > 
            
                </div>
                <div className="right-body" >
                    <div className="content">
                        <div className="title-head">
                            <div className="result">
                               <center><h5><strong>Last Week's  Practice Results</strong></h5></center> 
                                <div className="status-box">
                                    <div className="score">
                                        <span className="medal">  <FaMedal size={25} /><strong>8/10</strong></span>
                                        <span className="success text-gray-400">Your Success</span>
                                    </div>
                                    <div className="progresser">
                                        <div className="kitna">
                                          <h4 className="circle-in-text"><strong>5,000</strong></h4> 
                                        </div>
                                    </div>
                                    <div className="duration">
                                        <div className="inner-duration">
                                             <RiTimerFill size={25} /> <strong>30 min</strong>
                                             </div>
                                        <p className=" practice-time font-lg text-gray-400">Your Practice Time</p>
                                         </div>
                                </div>
                                
                            </div>
                            <div className="user-profile">
                                <center>
                                <h5><strong>Treating Doctor</strong></h5>
                                    <img className="border-2 rounded-md border-black" src={process.env.PUBLIC_URL+'Logo192.png'} width="80px"  />
                                    <p><b>Dr. Arun Sharma</b></p>
                                    </center>
                                </div>
                        </div>
                        <div className="points">
                            <div className="notes">
                                
                                <ol className="list">
                                    <li><h6 className="font-extrabold">Notes-</h6></li>
                                    <li className="list-item">A paragraph is a self-contained unit of discourse in writing </li>
                                    <li className="list-item">A paragraph is a self-contained unit of discourse in writing </li>
                                    <li className="list-item">A paragraph is a self-contained unit of discourse in writing </li>
                                </ol>
                            </div>
                            <div className="episodes">
                        <h6 className="font-extrabold">Episodes</h6>
                        Lorem ipsum
                            </div>
                        </div>

                        <div className="currents">
                            <h5><strong>Shoulder Therapy</strong></h5>
                            <div className="currents-content">
                                <div className="detail">
                                    aksoaskoakokasokdada
                                     asdksaodkodk akaodkaosdksoa  kadoakodko  saokdoask odkodk  aosdkosk odak doakasokadokdx    
                                </div>
                                <div className="right-detail">
                                <div className="progress">
                                    
                                    <div className="progress-bar">
                                    
                                    </div> 
                                    <span className="percentage">65% </span>
                                </div>
                               <center><button className="continue">Continue</button></center> 
                                </div>
                            </div>

                        </div>

                        <div className="table">
                        <Table responsive="sm">
                                <thead>
                                <tr>
                                   
                                    <th>Last Week's Achivements</th>
                                  
                                    
                                </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <span className="category">

                                            <FaMedal size={25} /> Movement
                                            </span></td>
                                        <td>21 264</td>
                                        
                                        
                                    </tr>
                                    <tr>
                                        <td>
                                            <span className="category">
                                            <FaMedal size={25} /> Angle
                                            </span>
                                            </td>
                                        <td>21 206</td>
                                        
                                        
                                    </tr>
                                    </tbody>
                            </Table>
        
                        </div>

                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Newhome