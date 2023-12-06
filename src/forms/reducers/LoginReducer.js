const initialstate=[{
    id:'defaultID',
    name:'defaultName',
    email:'defaultEmail',
    password:'defaultPassword',
    loading:false

}]
export default function islogged(state=initialstate,action){

    switch(action.type)
    {
        case "Signin":
            return [
                {
                    id:action.payload.id,
                    name:action.payload.name,
                    email:action.payload.email,
                    password:action.payload.password,
                    loading:action.payload.loading
                   
                }
            ]

        case "Signout":
            return initialstate

            default :
            return state
    }
}