import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import opencage from 'opencage-api-client';
import { connect } from 'react-redux';
import { onUpdateLocation, UserState, ApplicationState } from '../redux'
import { showAlert, useNavigation } from '../utils'
import AsyncStorage from "@react-native-community/async-storage";
import { ButtonWithIcon, TextField } from '../components';
import { TextInput } from 'react-native-gesture-handler';

const screenWidth = Dimensions.get('screen').width


interface LocationScreenProps {
    userReducer: UserState,
    onUpdateLocation: Function
}


const _LocationScreen: React.FC<LocationScreenProps> = ({ userReducer,  onUpdateLocation }) => {

    const { navigate } = useNavigation()
    const [isMap, setIsMap] = useState(false)


    const pickLocationView = () => {

        return(
            <View style={styles.container} >
                
                <View style={styles.pick_location_inside_container} >
                    <ButtonWithIcon icon={require("../images/back_arrow.png")} onTap={() => navigate("HomePage")} width={40} height={50} />
                    <View style={styles.input_container} >
                        
                    </View>
                    
                </View>

                <View style={styles.center_message}>
                    <Image source={require('../images/delivery_icon.png')} style={styles.deliveryIcon} />
                    <Text style={styles.addressTitle} >Pick Your Location</Text>
                </View>
            </View>
        )

    }


    const mapView = () => {

        return(
            <View style={styles.container} >
                <Text>Pick location</Text>
            </View>
        )

    }

    if(isMap) {
        return mapView()
    } else {
        return pickLocationView()
    }


}

const mapToStateProps = (state: ApplicationState) => ({
    userReducer: state.userReducer
})

const LocationScreen = connect(mapToStateProps, {onUpdateLocation})(_LocationScreen)

export { LocationScreen }


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
    center_message: {
        left: "50%",
        top: "50%",  
        position: "absolute",
        marginLeft: -65,
        marginTop: -50
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
        color: "black",
        marginLeft: -25
    },
    addressCurrent: {
        fontSize: 18,
        fontWeight: "200",
        color: "rgba(228,93,46,255)",
        width: screenWidth - 100,
        textAlign: "center"
    },
    pick_location_inside_container:{
        flex: 1,
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "row",
        marginTop: 45,
        marginLeft: 5
    },
    input_container: {
        display: "flex",
        flex: 1,
        marginRight: 5,
        alignItems: "center"
    },
    address_text_title: {
        marginTop: 30,
        fontSize: 20,
        color: "black",
    },
    address_text: {
        marginTop: 30,
        fontSize: 15,
        color: "black",
    }
})