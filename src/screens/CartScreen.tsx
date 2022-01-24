import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { ApplicationState, FoodModel, ShoppingState, onUpdateCart, UserState } from '../redux';
import { ButtonWithTitle, FoodCardInfo } from '../components'
import { FlatList } from 'react-native-gesture-handler';
import { checkExistence, useNavigation } from '../utils'


interface CartScreenProps {
    userReducer: UserState,
    shoppingReducer: ShoppingState,
    onUpdateCart: Function
}

const _CartScreen: React.FC<CartScreenProps> = (props) => {

    const { navigate } = useNavigation()
    const { cart } = props.userReducer
    const [totalAmount, setTotalAmount] = useState(0)

    const onTapFood = (item: FoodModel) => {
        navigate('FoodDetailsPage', { food: item })
    }


    useEffect(() => {
        onCalculateAmount()
    }, [cart])


    const onCalculateAmount = () => {

        let total = 0
        if(Array.isArray(cart)){
            cart.map(food => {
                total += food.price * food.unit
            })
        }
        
        setTotalAmount(total)
    }

    const onValidateOrder = () => {
        navigate('LoginPage')
    }


    if(cart.length > 0) {

        return(
            <View style={styles.container} >
                <View style={styles.navigation} >
                    <View style={styles.searchbar_container} >
    
                    </View>
                </View>
                <View style={styles.body} >
                    <FlatList 
                    showsVerticalScrollIndicator={false}
                    data={cart}
                    renderItem={({item}) => <FoodCardInfo item={checkExistence(item, cart)} onTap={onTapFood} onUpdateCart={props.onUpdateCart} /> } 
                    keyExtractor={(item) => `${item._id}`} />
                </View>

                <View style={styles.footer}>
                    <View style={styles.amount_container} >
                        <Text style={styles.total_text} >Total</Text>
                        <Text style={styles.total_text} >{totalAmount} ₺</Text>
                    </View>
                    <ButtonWithTitle title={"Order Now"} onTap={onValidateOrder} height={50} width={320}/>
                </View>
            </View>
        )

    } else {

        return(
            <View style={styles.empty_cart_container} >
                <Text style={styles.empty_text} >Your Cart is Empty ! ! !</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F2F2F2"
    },
    navigation: {
        flex: 1,
        marginTop: 20,
    },
    searchbar_container: {
        display: "flex",
        height: 60,
        justifyContent: "space-around",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 4
    },
    body: {
        flex: 9,
        justifyContent: "center",
        alignItems: "center"
    },
    empty_cart_container: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    empty_text: {
        fontSize: 25,
        fontWeight: "700"
    },
    footer: {
        flex: 2,
        padding: 10,
    },
    amount_container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 20,
        paddingLeft: 20
    },
    total_text: {
        fontSize: 18
    }
})

const mapStateToProps = (state: ApplicationState) => ({
    shoppingReducer: state.shoppingReducer,
    userReducer: state.userReducer
})

const CartScreen = connect(mapStateToProps, { onUpdateCart })(_CartScreen)

export { CartScreen }