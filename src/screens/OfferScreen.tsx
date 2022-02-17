import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { ApplicationState, ShoppingState, UserState, onGetOffers } from '../redux';
import { ButtonWithIcon, FoodCard } from '../components'
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '../utils'
import AsyncStorage from "@react-native-community/async-storage";


interface OfferScreenProps {
    userReducer: UserState,
    shoppingReducer: ShoppingState,
    onGetOffers: Function
}

const _OfferScreen: React.FC<OfferScreenProps> = (props) => {

    const { navigate } = useNavigation()
    const { offers } = props.shoppingReducer
    const postcodeFromStorage = AsyncStorage.getItem("user_location_postcode")


    useEffect(() => {
        props.onGetOffers(postcodeFromStorage)
        console.log(offers)
        console.log(postcodeFromStorage)
    }, [])

    console.log(offers)

    return(
        <View style={styles.container} >
            <View style={styles.navigation} >
            <View style={styles.inside_container}>
                <Text style={styles.offers_text}>Offers & Deals</Text>
            </View>
            </View>
            <View style={styles.body} >

                {Array.isArray(offers) &&

                <FlatList 
                showsVerticalScrollIndicator={false}
                data={offers} 
                renderItem={({item}) => <Text>{item}</Text> }
                keyExtractor={(item) => `${item._id}`} />
                
                }

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F2F2F2"
    },
    navigation: {
        flex: 1,
        marginTop: 43,
    },
    inside_container: {
        display: "flex",
        height: 60,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 4
    },
    body: {
        flex: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    offers_text: {
        fontSize: 22,
        fontWeight: "700",
        color: "black"
    }
})

const mapStateToProps = (state: ApplicationState) => ({
    shoppingReducer: state.shoppingReducer,
    userReducer: state.userReducer
})

const OfferScreen = connect(mapStateToProps, { onGetOffers })(_OfferScreen)

export { OfferScreen }