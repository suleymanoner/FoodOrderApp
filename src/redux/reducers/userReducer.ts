import { UserAction } from "../actions"
import { FoodModel, UserModel, UserState } from "../models"


const initialState: UserState = {
    user: {} as UserModel,
    location: "" as string,
    postCode: "" as string,
    error: undefined,
    cart: {} as [FoodModel]
}


const UserReducer = (state: UserState = initialState, action: UserAction) => {


    switch (action.type) {
        case "ON_UPDATE_LOCATION":
            return {
                ...state,
                location: action.payload,
                postCode: action.postCode
            }

        case "ON_UPDATE_CART":
            console.log(action.payload)
            break
        default:
            return state;
    }




}

export { UserReducer }