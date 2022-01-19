import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { connect } from 'react-redux';
import { onAvailability, UserState, ApplicationState, ShoppingState } from '../redux'

interface HomeProps {
    userReducer: UserState,
    shoppingReducer: ShoppingState,
    onAvailability: Function
}

const _HomeScreen: React.FC<HomeProps> = (props) => {

    const { location, postCode } = props.userReducer
    const { availability } = props.shoppingReducer
    const { categories, foods, restaurants } = availability
 
    useEffect(() => {

        props.onAvailability(postCode)

    }, [])

    return(
        <View style={styles.container} >
            <View style={styles.navigation} >
                <View style={styles.navigation_inner_container} >
                    <Text>{location}</Text>
                    <Text>Edit</Text>
                </View>
                <View style={styles.search_bar_container} >
                    <Text>Search Bar</Text>
                </View>
                
            </View>
            <View style={styles.body} >
                <Text>Home Screen</Text>
            </View>
            <View style={styles.footer} >
                <Text>Footer</Text>
            </View>
        </View>
    )

}

const mapToStateProps = (state: ApplicationState) => ({
    userReducer: state.userReducer,
    shoppingReducer: state.shoppingReducer
})

const HomeScreen = connect(mapToStateProps, {onAvailability})(_HomeScreen)

export { HomeScreen }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "red"
    },
    navigation: {
        flex: 2,
        backgroundColor: "yellow"
    },
    navigation_inner_container: {
        marginTop: 25,
        flex: 4,
        backgroundColor: "rgba(242,242,242,1)",
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: "center",
        alignItems: "flex-start",
        flexDirection: "row"
    },
    search_bar_container: {
        flex: 3,
        backgroundColor: "green"
    },
    body: {
        flex: 9,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "orange"
    },
    footer: {
        flex: 1,
        backgroundColor: "cyan"
    }
})