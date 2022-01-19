import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { connect } from 'react-redux';
import { onAvailability, UserState, ApplicationState, ShoppingState } from '../redux'

interface HomeProps {
    userReducer: UserState,
    shoppingReducer: ShoppingState,
    onAvailability: Function
}

const _HomeScreen: React.FC<HomeProps> = (props) => {

    const { location } = props.userReducer
    const { availability } = props.shoppingReducer

    return(
        <View style={styles.container} >
            <View style={styles.navigation} >
                <Text>Navigation {location}</Text>
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