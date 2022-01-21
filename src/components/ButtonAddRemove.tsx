import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface ButtonProps {
    onTap: Function,
}


const ButtonAddRemove: React.FC<ButtonProps> = ({ onTap }) => {

    return(
        <TouchableOpacity style={styles.button} >
            <Text style={styles.text} >Add</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    button: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 80,
        height: 40,
        alignSelf: "center",
        borderRadius: 30,
        backgroundColor: "#f15b5b",
    },
    text: {
        fontSize: 18,
        color: "#FFF",
    }
})

export { ButtonAddRemove }