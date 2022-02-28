import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';


interface LocationPickProps {
    onChangeLocation: Function
}

const LocationPick: React.FC<LocationPickProps> = ({ onChangeLocation }) => {
    
    return(
        <View style={styles.container} >

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
    },
    button: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 60,
        height: 40
    }
})

export { LocationPick }