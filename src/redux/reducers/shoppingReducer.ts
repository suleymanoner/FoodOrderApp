import { ShoppingAction } from "../actions"
import { FoodAvailability, ShoppingState, FoodModel } from "../models"

const initialState = {
    availability: {} as FoodAvailability,
    availableFoods: {} as [FoodModel]
}

const ShoppingReducer = (state: ShoppingState = initialState, action: ShoppingAction) => {


    switch (action.type) {
        case "ON_AVAILABILITY":
            return {
                ...state,
                availability: action.payload
            }
        
        case "ON_FOOD_SEARCH":
            return {
                ...state,
                availableFoods: action.payload
            }
            
    
        default:
            return state;
    }

}

export { ShoppingReducer }