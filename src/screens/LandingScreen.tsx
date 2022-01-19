import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import opencage from 'opencage-api-client';
import { connect } from 'react-redux';
import { onUpdateLocation, UserState, ApplicationState } from '../redux'
import { useNavigation } from '../utils'

const screenWidth = Dimensions.get('screen').width


interface LandingProps {
    userReducer: UserState,
    onUpdateLocation: Function
}


const _LandingScreen: React.FC<LandingProps> = (props) => {

    const { userReducer,  onUpdateLocation } = props

    const { navigate } = useNavigation()

    const [lat, setLat] = useState<number>()
    const [long, setLong] = useState<number>()
    const [address, setAddress] = useState("Click here for current address")

    useEffect(() => {
        Geolocation.getCurrentPosition(data => {
            setLat(data.coords.latitude)
            setLong(data.coords.longitude)
        })
    }, [])


    function getLocation() {

        const key = "9c7704b06ab64272a3fc91d27796a202"

        opencage.geocode({key, q: `${lat},${long}`}).then(response => {
            setAddress(response.results[0].formatted)
            onUpdateLocation(response.results[0].formatted, response.results[0].components.postcode)
            // for full address, .formatted
            console.log(response.results[0].components.postcode)
            console.log(response.results[0])
            
        })

        setTimeout(() => {
            navigate('homeStack')
        }, 2000)
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