import axios from "axios";
import { Dispatch } from "react";
import { BASE_URL } from "../../utils";
import AsyncStorage from "@react-native-community/async-storage";
import { FoodModel } from "..";

export interface UpdateLocationAction {
    readonly type: "ON_UPDATE_LOCATION",
    payload: string,
    postCode: string
}

export interface UserErrorAction {
    readonly type: "ON_USER_ERROR",
    payload: any
}

export interface UpdateCartAction {
    readonly type: "ON_UPDATE_CART",
    payload: FoodModel
}


export type UserAction = UpdateLocationAction | UserErrorAction | UpdateCartAction


export const onUpdateLocation = (location: string, postCode: string) => {

    return async (dispatch: Dispatch<UserAction>) => {

        try {
            await AsyncStorage.setItem('user_location', location)
            await AsyncStorage.setItem('user_location_postcode', postCode)

            dispatch({
                type: "ON_UPDATE_LOCATION",
                payload: location,
                postCode: postCode
            })
            
        } catch (error) {
            dispatch({
                type: "ON_USER_ERROR",
                payload: error
            })
        }
    }
}


export const onUpdateCart = (item: FoodModel) => {

    return async (dispatch: Dispatch<UserAction>) => {

        dispatch({
            type: "ON_UPDATE_CART",
            payload: item
        })

    }
}