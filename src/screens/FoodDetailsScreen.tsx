import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { ButtonWithIcon, FoodCard } from '../components';
import { ApplicationState, FoodModel, Restaurant, UserState, onUpdateCart } from '../redux';
import { checkExistence, useNavigation } from '../utils'
import { connect } from 'react-redux'

interface FoodDetailsProps {
    userReducer: UserState,
    onUpdateCart: Function,
    navigation: { getParam: Function, goBack: Function }
}


const _FoodDetailsScreen: React.FC<FoodDetailsProps> = (props) => {

    const { getParam, goBack } = props.navigation

    const food = getParam('food') as FoodModel

    const { navigate } = useNavigation()

    const { cart } = props.userReducer

    return(
        <View style={styles.container} >
            <View style={styles.navigation} >
                <ButtonWithIcon icon={require('../images/back_arrow.png')} onTap={() => goBack()} width={42} height={42}/>
                <Text style={styles.name} >{food.name}</Text>
            </View>
            <View style={styles.body} >
                <ImageBackground source={{ uri: `${food.images[0]}`}} style={styles.image} >
                <View style={styles.text_container} >
                    <Text style={styles.name_text} >{food.name}</Text>
                    <Text style={styles.category_text} >{food.category}</Text>
                </View>
                </ImageBackground>
                <View style={styles.second_text_container} >
                    <Text>Food will be ready within {food.readyTime} Minute(s)</Text>
                    <Text>{food.description}</Text>
                </View>
                <View style={styles.food_card_container} >
                    <FoodCard item={checkExistence(food, cart)} onTap={() => {}} onUpdateCart={props.onUpdateCart} />
                </View>
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
        paddingLeft: 10,
        flexDirection: "row",
        alignItems: "center",
        
    },
    name: {
        fontSize: 22,
        fontWeight: "600",
        marginLeft: 40,
        color: "black"
    },
    body: {
        flex: 10,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#FFF",
        paddingBottom: 160,
    },
    image: {
        width: Dimensions.get('screen').width,
        height: 300,
        justifyContent: "flex-end"
    },
    text_container:{
        height: 120,
        backgroundColor: "rgba(0,0,0,0.6)",
        padding: 10
    },
    name_text: {
        color: "#FFF",
        fontSize: 30,
        fontWeight: "700"
    },
    category_text: {
        color: "#FFF",
        fontSize: 25,
        fontWeight: "500"
    },
    second_text_container: {
        display: "flex",
        height: 200,
        padding: 20,
    },
    food_card_container: {
        height: 120,
    }
})


const mapStateToProps = (state: ApplicationState) => ({
    shoppingReducer: state.shoppingReducer,
    userReducer: state.userReducer
})

const FoodDetailsScreen = connect(mapStateToProps, { onUpdateCart })(_FoodDetailsScreen)

export { FoodDetailsScreen }