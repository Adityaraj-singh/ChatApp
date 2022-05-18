
export default function reducer(state=[],action){
 
    switch(action.type)
    {
        case "Add":
            return [
                ...state,
                {
                    id:action.id,
                    name:action.name,
                    description:action.description,
                    price:action.price
                   
                }
            ]

        case "Remove":
            return state.filter(item=>item.id !== action.id)

            default :
            return state
    }
}