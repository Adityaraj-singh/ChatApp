import { createStore ,combineReducers} from "redux";
import  islogged from './LoginReducer'
import setcurrentchat from "./Currentchatreducer";

import { setcurrentchatuser2 } from "./currentchatfriend";
const allReducer=combineReducers({
    islogged:islogged,
    setcurrentchat:setcurrentchat,
    setcurrentchatuser2:setcurrentchatuser2
    
})

const store=createStore(allReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store