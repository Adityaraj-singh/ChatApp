import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import './needed/main.css'
import React, { useState,useEffect,createContext,useReducer } from 'react'
import './needed/main.css'
import {BrowserRouter as Router,Redirect,Route,Switch} from 'react-router-dom'
import Home from './Home/Home'
import Cart from './Home/Cart';

import Authenticate from './forms/Authenticate';
import store from './forms/reducers/store';
import Show from './components/Show'

import Newhome from './components/Newhome';
function App() {
  /*
  useEffect(()=>{
    if(localStorage.getItem('user'))
    {
     
      Setdata(JSON.parse(localStorage.getItem('user')))

    }

  },[])
  */
/*
  const [signin,Setsiginin]=useState(false)
  
    return(
      <div className="App">

         {signin ?  <Add /> : <Tempol signin={signin} Setsiginin={Setsiginin} /> }
        
      </div>
    )
  
    */
  
  


  
  const [data,Setdata]=useState()
    return (
      <Router >    
      <div className="App">
       <Switch>
      <Route path='/' exact >
       <Authenticate  data={data} Setdata={Setdata} />
          </Route>
      <Route path="/home"   exact>
        <Home data={data} Setdata={Setdata} /> 
      </Route>
       <Route path='/cart' component={Cart} / >
         
          <Route path='/new' component={Newhome} />
      </Switch>
      </div>
      

      </Router>
    )

        /*
  else
  {
  
    return(
      <div className="App">
        <Home data={data} Setdata={Setdata} />
      </div>
    )
  }
    

  */
  
  
 
}

export default App;
