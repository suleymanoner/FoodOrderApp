import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Alert } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { ButtonWithIcon, CategoryCard, RestaurantCard, SearchBar } from '../components';
import { onAvailability, onSearchFoods, UserState, ApplicationState, ShoppingState, Restaurant, FoodModel } from '../redux'
import { useNavigation } from '../utils'


interface HomeProps {
    userReducer: UserState,
    shoppingReducer: ShoppingState,
    onAvailability: Function,
    onSearchFoods: Function
}

const _HomeScreen: React.FC<HomeProps> = (props) => {

    const { location, postCode } = props.userReducer
    const { availability } = props.shoppingReducer
    const { categories, foods, restaurants } = availability
    const [address, setAddress] = useState("Address")
    const { navigate } = useNavigation()

    useEffect(() => {
        setAddress(location)
        props.onAvailability(postCode)
        props.onSearchFoods(postCode)
    }, [location])

    const onTapRestaurant = (item: Restaurant) => {
        navigate('RestaurantPage', { restaurant: item })
    }

    const onTapFood = (item: FoodModel) => {
        navigate('FoodDetailsPage', { food: item })
    }

    const onTapEditLocation = () => {
        navigate("LocationPage")
    }


    return(
        <View style={styles.container} >
            <View style={styles.navigation} >
                <View style={styles.navigation_inner_container} >
                    <Image style={{width: 30, height: 30}} source={require("../images/delivery_icon.png")} />
                    <Text style={styles.address_text} >{address}</Text>
                    <ButtonWithIcon height={30} width={30} icon={require("../images/edit_icon.png")} onTap={onTapEditLocation} />
                </View>
                <View style={styles.search_bar_container} >
                    <SearchBar 
                    didTouch={() => {
                        navigate('SearchPage')
                    }}
                    onTextChange={() => {}}
                    onEndEditing={() => {}} />
                    <ButtonWithIcon onTap={() => {}} icon={require('../images/hambar.png')} width={50} height={40} />
                </View>
            </View>

            <View style={styles.body} >
                <ScrollView>
                    <FlatList 
                    horizontal
                    showsHorizontalScrollIndicator={false} 
                    data={categories} 
                    renderItem={({item}) => <CategoryCard item={item} onTap={() => {Alert.alert('Category Tapped')}} />} 
                    keyExtractor={(item) => `${item.id}`} />

                    <View>
                        <Text style={styles.restaurantsTitle} >Top Restaurants</Text>
                    </View>

                    <FlatList 
                    horizontal
                    showsHorizontalScrollIndicator={false} 
                    data={restaurants} 
                    renderItem={({item}) => <RestaurantCard item={item} onTap={onTapRestaurant} />} 
                    keyExtractor={(item) => `${item._id}`} />

                    <View>
                        <Text style={styles.restaurantsTitle} >30 Minutes Foods</Text>
                    </View>

                    <FlatList 
                    horizontal
                    showsHorizontalScrollIndicator={false} 
                    data={foods} 
                    renderItem={({item}) => <RestaurantCard item={item} onTap={onTapFood} />} 
                    keyExtractor={(item) => `${item._id}`} />

                </ScrollView>
                
             
            </View>
        </View>
    )

}

const mapToStateProps = (state: ApplicationState) => ({
    userReducer: state.userReducer,
    shoppingReducer: state.shoppingReducer
})

const HomeScreen = connect(mapToStateProps, {onAvailability, onSearchFoods})(_HomeScreen)

export { HomeScreen }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(242,242,242,1)"
    },
    navigation: {
        flex: 2,
    },
    navigation_inner_container: {
        marginTop: 25,
        flex: 4,
        backgroundColor: "rgba(242,242,242,1)",
        paddingLeft: 25,
        paddingRight: 25,
        justifyContent: "center",
        alignItems: "flex-start",
        flexDirection: "row",
    },
    search_bar_container: {
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
        alignItems: "center",
    },
    restaurantsTitle: {
        fontSize: 25,
        fontWeight: "800",
        color: "#f15b5d",
        marginLeft: 20
    },
    address_text: {
        fontSize: 13,
        color: "black",
        marginRight: 10,
        marginLeft: 10
    }
})