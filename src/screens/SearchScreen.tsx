import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { ApplicationState, FoodModel, ShoppingState, onUpdateCart, UserState } from '../redux';
import { ButtonWithIcon, FoodCard, SearchBar } from '../components'
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '../utils'


interface SearchScreenProps {
    userReducer: UserState,
    shoppingReducer: ShoppingState,
    onUpdateCart: Function
}

const _SearchScreen: React.FC<SearchScreenProps> = (props) => {

    const [isEditing, setIsEditing] = useState(false)
    const [keyword, setKeyword] = useState("")

    const { availableFoods } = props.shoppingReducer
    const { navigate } = useNavigation()
    const { cart } = props.userReducer

    const onTapFood = (item: FoodModel) => {
        navigate('FoodDetailsPage', { food: item })
    }

    return(
        <View style={styles.container} >
            <View style={styles.navigation} >
                <View style={styles.searchbar_container} >
                    <ButtonWithIcon icon={require('../images/back_arrow.png')} height={50} width={40} onTap={() => navigate('HomePage')} />
                    <SearchBar onTextChange={setKeyword} onEndEditing={() => setIsEditing(false)} didTouch={() => setIsEditing(true)} />
                </View>
            </View>
            <View style={styles.body} >
                <FlatList 
                showsVerticalScrollIndicator={false}
                data={
                    isEditing 
                    ?
                    availableFoods.filter((item) => {
                        return item.name.toLocaleLowerCase().includes(keyword)
                    }) : availableFoods
                }
                renderItem={({item}) => <FoodCard item={item} onTap={onTapFood} onUpdateCart={() => {}} /> } 
                keyExtractor={(item) => `${item._id}`} />
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
    searchbar_container: {
        display: "flex",
        height: 60,
        justifyContent: "space-around",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 4
    },
    body: {
        flex: 10,
        justifyContent: "center",
        alignItems: "center"
    }
})

const mapStateToProps = (state: ApplicationState) => ({
    shoppingReducer: state.shoppingReducer,
    userReducer: state.userReducer
})

const SearchScreen = connect(mapStateToProps, { onUpdateCart })(_SearchScreen)

export { SearchScreen }