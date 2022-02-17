import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import { ApplicationState, ShoppingState, UserState, onGetOffers, OfferModel, onApplyOffer } from '../redux';
import { ButtonWithIcon, FoodCard, OfferCard } from '../components'
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '../utils'
import AsyncStorage from "@react-native-community/async-storage";


interface OfferScreenProps {
    userReducer: UserState,
    shoppingReducer: ShoppingState,
    onGetOffers: Function,
    onApplyOffer: Function
}

const _OfferScreen: React.FC<OfferScreenProps> = (props) => {

    const { navigate } = useNavigation()
    const { offers } = props.shoppingReducer
    const { cart, appliedOffer } = props.userReducer
    const postcodeFromStorage = AsyncStorage.getItem("user_location_postcode")


    useEffect(() => {
        props.onGetOffers(postcodeFromStorage)
        console.log(offers)
        console.log(postcodeFromStorage)
    }, [])

    const showAlert = (title: string, msg: string) => {

        Alert.alert(
            title,
            msg,
            [
                {text: "OK", onPress: () => {}}
            ]
        )
    }


    const onTapApplyOffer = (offer: OfferModel) => {

        let total = 0
        if(Array.isArray(cart)){
            cart.map(food => {
                total += food.price * food.unit
            })
        }

        const taxAmount = (total / 100 * 0.9) + 40
        const orderAmount = taxAmount + total

        if(orderAmount >= offer.minValue) {
            props.onApplyOffer(offer, false)
            showAlert("Offer Applied", `Offer Applied with discount of ${offer.offerPercentage} %`)
        } else {
            showAlert("This offer is not applicable!", `This offer is applicable with minimum amount ${offer.minValue} only.`)
        }
    }

    const onTapRemoveOffer = (offer: OfferModel) => {
        props.onApplyOffer(offer, true)
    }

    const checkIfExist = (offer: OfferModel) => {

        if(appliedOffer._id !== undefined) {
            return offer._id.toString() === appliedOffer._id.toString()
        }

        return false
    }

    

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
                renderItem={({item}) => 
                <OfferCard item={item} 
                onTapApply={onTapApplyOffer}
                onTapRemove={onTapRemoveOffer}
                isApplied={checkIfExist(item)}
                /> }
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

const OfferScreen = connect(mapStateToProps, { onGetOffers, onApplyOffer })(_OfferScreen)

export { OfferScreen }