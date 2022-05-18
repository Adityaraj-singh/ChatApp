import React from 'react'
import store from '../forms/reducers/store'
import { useSelector,useDispatch,use } from 'react-redux'
import './Home.css'
import { Card,Badge,Avatar } from 'antd'
const Cart=()=>{
    const dispatch=useDispatch()
    const hmm=useSelector(state=>state)
    function remove(e)
    {   
        dispatch({type:"Remove",id:e.target.id})
      
    }
    return (
        <div className="container-main">
            <button className="cart-icon">
              <Badge count={store.getState().length}>
        <Avatar shape="square" className="bg-blue-400" >Cart</Avatar>
      </Badge>
      </button>
            <div className="chat-box-cart">
                {
                    hmm.map((item)=>{
                        return(
                            <Card className="card" title={item.name} bordered={true}>
                        {item.description}
                        <p className="price"><strong>{item.price}</strong></p>

                        <button className="bg-red-400 p-1 rounded-md" id={item.id} onClick={remove} >Remove from cart</button>
                      </Card>
                        )
                        
                    })
                }
            </div>
        </div>
    )
}

export default Cart