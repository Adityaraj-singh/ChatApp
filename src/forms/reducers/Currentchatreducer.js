const currentchat=false

export  default function setcurrentchat(state=currentchat,action){


    switch(action.type){

        case "Setchat":
            return action.payload.conversationid

            case "removechat":
                return false
                default:
                    return state    
    }

    
}
