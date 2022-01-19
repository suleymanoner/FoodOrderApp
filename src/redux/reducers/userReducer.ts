import { UserAction } from "../actions"
import { UserModel, UserState } from "../models"


const initialState: UserState = {
    user: {} as UserModel,
    location: "" as string,
    error: undefined
}


const UserReducer = (state: UserState = initialState, action: UserAction) => {


    switch (action.type) {
        case "ON_UPDATE_LOCATION":
            return {
                ...state,
                location: action.payload
            }
    
        default:
            return state;
    }




}

export { UserReducer }