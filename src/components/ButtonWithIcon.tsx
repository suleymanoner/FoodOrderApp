import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';

interface ButtonProps {
    onTap: Function,
    width: number,
    height: number,
    icon: ImageSourcePropType
}

const ButtonWithIcon: React.FC<ButtonProps> = (props) => {

    const { onTap, width, height, icon } = props

    return(
        <TouchableOpacity style={[styles.button, { width, height }]} 
            onPress={() => onTap()}
        >
            <Image style={{width: (width - 2), height: (height - 2)}} source={icon} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 60,
        height: 40
    }
})

export { ButtonWithIcon }