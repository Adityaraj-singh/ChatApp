import React from 'react'
import React, {useState,useEffect } from 'react'
import Axios from 'axios'

import { useHistory } from 'react-router'
import {BrowserRouter as Router,Link,Redirect,Route,Switch} from 'react-router-dom'
import { Avatar,Image,Card,Badge} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import store from '../forms/reducers/store'
import { useSelector,useDispatch,use } from 'react-redux'

const Mainui=()=>{

    return(
        <div className="mainui">
            heyy
        </div>
    )
}


export default Mainui