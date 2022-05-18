const currentchatuser=false

export  function setcurrentchatuser2(state2=currentchatuser,action)
{

    switch(action.type)
    {
        case "Setchatuser":
            return action.payload.currentchatuser
        
        case 'removechatuser':
            return false
            default:
                return state2
    }
}