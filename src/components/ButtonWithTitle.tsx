import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
    onTap: Function,
    width: number,
    height: number,
    title: string,
    isNoBg?: boolean,
    disable?: boolean
}

const ButtonWithTitle: React.FC<ButtonProps> = ({ onTap, width, height, title, isNoBg = false, disable = false }) => {
    

    if(isNoBg) {
        return(
            <TouchableOpacity style={[styles.button, { width, height, backgroundColor: "transparent" }]} onPress={() => onTap()} disabled={disable} >
                <Text style={[styles.text, { color: disable ? "#6F6F6F" : "#3980D9" }]} >{title}</Text>
            </TouchableOpacity>
        )
    } else {
        return(
            <TouchableOpacity style={[styles.button, { width, height }]} onPress={() => onTap()} >
                <Text style={styles.text} >{title}</Text>
            </TouchableOpacity>
        )
    }
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