import axios from "axios";
import { Dispatch } from "react";
import { BASE_URL } from "../../utils";
import AsyncStorage from "@react-native-community/async-storage";
import { FoodModel, UserModel, OrderModel, OfferModel } from "../models";

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

export interface UserLoginAction {
    readonly type: "ON_USER_LOGIN",
    payload: UserModel
}

export interface CreateOrderAction {
    readonly type: "ON_CREATE_ORDER",
    payload: OrderModel
}

export interface ViewOrdersAction {
    readonly type: "ON_VIEW_ORDER" | "ON_CANCEL_ORDER",
    payload: [OrderModel]
}

export interface UserLogoutAction {
    readonly type: "ON_USER_LOGOUT"
}

export interface AddRemoveOfferAction {
    readonly type: "ON_ADD_OFFER" | "ON_REMOVE_OFFER",
    payload: OfferModel
}


export type UserAction = 
UpdateLocationAction | 
UserErrorAction | 
UpdateCartAction | 
UserLoginAction | 
CreateOrderAction | 
ViewOrdersAction | 
UserLogoutAction |
AddRemoveOfferAction


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


export const onUserLogin = (email: string, password: string) => {

    return async (dispatch: Dispatch<UserAction>) => {

        try {
            const response = await axios.post<UserModel>(`${BASE_URL}user/login`, {
                email,
                password
            })

            // I added here because 'verified' value return undefined even we entered correct credentials.
            if(response.data.token) {
                response.data.verified = true
            }

            console.log(response.data.verified)

            if(!response) {
                dispatch({
                    type: "ON_USER_ERROR",
                    payload: "User Login Error"
                })
            } else {
                dispatch({
                    type: "ON_USER_LOGIN",
                    payload: response.data
                })
            }
            
        } catch (error) {
            dispatch({
                type: "ON_USER_ERROR",
                payload: error
            })
        }
    }
}

// signup doesn't work now. maybe because of backend issues.
export const onUserSignUp = (email: string, phone: string, password: string) => {

    return async (dispatch: Dispatch<UserAction>) => {        
        try {
            const response = await axios.post<UserModel>(`${BASE_URL}user/create-account`, {
                email,
                phone,
                password
            })

            if(!response) {
                dispatch({
                    type: "ON_USER_ERROR",
                    payload: "User Login Error"
                })
            } else {
                dispatch({
                    type: "ON_USER_LOGIN",
                    payload: response.data
                })
            }
            
        } catch (error) {
            dispatch({
                type: "ON_USER_ERROR",
                payload: error
            })
        }
    }
}


export const onVerifyOTP = (otp: string, user: UserModel) => {

    return async (dispatch: Dispatch<UserAction>) => {

        try {

            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`

            const response = await axios.patch<UserModel>(`${BASE_URL}user/verify`, {
                otp
            })

            if(!response) {
                dispatch({
                    type: "ON_USER_ERROR",
                    payload: "User Verification Error"
                })
            } else {
                dispatch({
                    type: "ON_USER_LOGIN",
                    payload: response.data
                })
            }
            
        } catch (error) {
            dispatch({
                type: "ON_USER_ERROR",
                payload: error
            })
        }
    }
}


export const onOTPRequest = (user: UserModel) => {

    return async (dispatch: Dispatch<UserAction>) => {

        try {

            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`

            const response = await axios.get<UserModel>(`${BASE_URL}user/otp`)

            if(!response) {
                dispatch({
                    type: "ON_USER_ERROR",
                    payload: "User Verification Error"
                })
            } else {
                dispatch({
                    type: "ON_USER_LOGIN",
                    payload: response.data
                })
            }
            
        } catch (error) {
            dispatch({
                type: "ON_USER_ERROR",
                payload: error
            })
        }
    }
}


export const onCreateOrder = (cartItems: [FoodModel], user: UserModel) => {

    let cart = new Array()

    cartItems.map(item => {
        cart.push({_id: item._id, unit: item.unit})
    })

    
    return async (dispatch: Dispatch<UserAction>) => {

        try {

            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`

            const response = await axios.post<OrderModel>(`${BASE_URL}user/create-order` , {
                cart
            })

            if(!response) {
                dispatch({
                    type: "ON_USER_ERROR",
                    payload: "User Verification Error"
                })
            } else {
                dispatch({
                    type: "ON_CREATE_ORDER",
                    payload: response.data
                })
            }
            
        } catch (error) {
            dispatch({
                type: "ON_USER_ERROR",
                payload: error
            })
        }
    }
}


export const onGetOrders = (user: UserModel) => {
    
    return async (dispatch: Dispatch<UserAction>) => {

        try {

            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`

            const response = await axios.get<[OrderModel]>(`${BASE_URL}user/order`)

            if(!response) {
                dispatch({
                    type: "ON_USER_ERROR",
                    payload: "User Verification Error"
                })
            } else {
                dispatch({
                    type: "ON_VIEW_ORDER",
                    payload: response.data
                })
            }
            
        } catch (error) {
            dispatch({
                type: "ON_USER_ERROR",
                payload: error
            })
        }
    }
}


export const onCancelOrder = (order: OrderModel, user: UserModel) => {
    
    return async (dispatch: Dispatch<UserAction>) => {

        try {

            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`

            const response = await axios.delete<[OrderModel]>(`${BASE_URL}user/order/${order._id}`)

            if(!response) {
                dispatch({
                    type: "ON_USER_ERROR",
                    payload: "User Verification Error"
                })
            } else {
                dispatch({
                    type: "ON_CANCEL_ORDER",
                    payload: response.data
                })
            }
            
        } catch (error) {
            dispatch({
                type: "ON_USER_ERROR",
                payload: error
            })
        }
    }
}


export const onUserLogout = () => {
    
    return async (dispatch: Dispatch<UserAction>) => {

        try {
            
            dispatch({
                type: "ON_USER_LOGOUT"
            })

        } catch (error) {
            dispatch({
                type: "ON_USER_ERROR",
                payload: error
            })
        }
    }
}


export const onApplyOffer = (offer: OfferModel, isRemove: boolean) => {

    return async (dispatch: Dispatch<UserAction>) => {

        if(isRemove) {
            dispatch({
                type: "ON_REMOVE_OFFER",
                payload: offer
            })
        } else {
            dispatch({
                type: "ON_ADD_OFFER",
                payload: offer
            })
        }


        

    }
}