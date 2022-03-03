import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import opencage from 'opencage-api-client';
import { connect } from 'react-redux';
import { onUpdateLocation, UserState, ApplicationState } from '../redux'
import { showAlert, useNavigation } from '../utils'
import AsyncStorage from "@react-native-community/async-storage";

const screenWidth = Dimensions.get('screen').width


interface LandingProps {
    userReducer: UserState,
    onUpdateLocation: Function
}


const _LandingScreen: React.FC<LandingProps> = ({ userReducer,  onUpdateLocation }) => {

    const { navigate } = useNavigation()
    const [lat, setLat] = useState<number>()
    const [long, setLong] = useState<number>()
    const [address, setAddress] = useState("Click here for current address")

    const goLocationScreen:Function = () => {
        navigate("LocationPage")
    }

    /*
    const locationFromStorage = AsyncStorage.getItem("user_location")
            console.log(locationFromStorage)

            if(locationFromStorage !== null) {
                locationFromStorage.then(location => {
                    if(location !== null) {
                        navigate("HomePage")
                    }
                })
            } else {
                
            }
    */ 

    const getDeviceLocation = async() => {

        try {
            Geolocation.getCurrentPosition(data => {
                setLat(data.coords.latitude)
                setLong(data.coords.longitude)
            })
            
        } catch (error) {
            console.log(error, "Location Error !")
            showAlert("Location Permission Needed!", "Location Permission needed to access your nearest restaurants!", goLocationScreen())
        }
    }

    const checkExistingLocation = async () => {

        try {
            
            const user_location = await AsyncStorage.getItem("user_location")
            const user_location_postcode = await AsyncStorage.getItem("user_location_postcode")

            if(user_location && user_location_postcode) {

                onUpdateLocation(user_location, user_location_postcode)
                
                setTimeout(() => {
                    navigate('homeStack')
                }, 500)
            } else {
                await getDeviceLocation()
            }


        } catch (error) {
            console.log(error);
        }

    }


    useEffect(() => {
        checkExistingLocation()
    }, [])


    function getLocation() {

        const key = "9c7704b06ab64272a3fc91d27796a202"

        if(lat !== undefined && long !== undefined) {
            opencage.geocode({key, q: `${lat},${long}`}).then(response => {
                setAddress(response.results[0].formatted)
                onUpdateLocation(response.results[0].formatted, response.results[0].components.postcode)
            })

            setTimeout(() => {
                navigate('homeStack')
            }, 2000)
        } else {
            showAlert("Location Permission Needed!", "Location Permission needed to access your nearest restaurants!", goLocationScreen())
        }

    }
    

    return(
        <View style={styles.container} >
            <View style={styles.navigation}>
                
            </View>
            <View style={styles.body}>
                <Image source={require('../images/delivery_icon.png')} style={styles.deliveryIcon} />
                <View style={styles.addressContainer} >
                    <Text style={styles.addressTitle} >Your Delivery Address</Text>
                </View>
                <TouchableOpacity onPress={getLocation} >
                    <Text style={styles.addressCurrent}>{address}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footer} >
                
            </View>
        </View>
    )
}

const mapToStateProps = (state: ApplicationState) => ({
    userReducer: state.userReducer
})

const LandingScreen = connect(mapToStateProps, {onUpdateLocation})(_LandingScreen)

export { LandingScreen }


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(242,242,242,1)"
    },
    addressContainer: {
        width: screenWidth - 100,
        borderBottomColor: "red",
        borderBottomWidth: 0.5,
        padding: 5,
        alignItems: "center",
        marginBottom: 10,
    },
    navigation: {
        flex: 2,
        
    },
    body: {
        flex: 9,
        justifyContent: "center",
        alignItems: "center",
    },
    footer: {
        flex: 2,
    },
    deliveryIcon: {
        width: 120,
        height: 120,
    },
    addressTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#7D7D7D",
    },
    addressCurrent: {
        fontSize: 18,
        fontWeight: "200",
        color: "rgba(228,93,46,255)",
        width: screenWidth - 100,
        textAlign: "center"
    }
})