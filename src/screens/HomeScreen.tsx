import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';


const HomeScreen = () => {

    return(
        <View style={styles.container} >
            <View style={styles.navigation} >
                <Text>Navigation</Text>
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

export default HomeScreen;

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