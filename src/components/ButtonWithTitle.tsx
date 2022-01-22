import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';

interface ButtonProps {
    onTap: Function,
    width: number,
    height: number,
    title: string
}

const ButtonWithTitle: React.FC<ButtonProps> = ({ onTap, width, height, title }) => {
    
    return(
        <TouchableOpacity style={[styles.button, { width, height }]} onPress={() => onTap()} >
            <Text style={styles.text} >{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 60,
        height: 40,
        backgroundColor: "#f14b5d",
        marginTop: 20,
        borderRadius: 30,
        alignSelf: "center"
    },
    text: {
        fontSize: 18,
        color: "#FFF"
    }
})

export { ButtonWithTitle }