import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface ButtonProps {
    onAdd: Function,
    unit: number,
    onRemove: Function
}


const ButtonAddRemove: React.FC<ButtonProps> = ({ onAdd, unit, onRemove }) => {

    if(unit > 0) {
        return(
            <View style={styles.optionsView} >
                <TouchableOpacity style={styles.btn_plus_minus} onPress={() => onRemove()} >
                    <Text style={styles.text} >-</Text>
                </TouchableOpacity>
                <View style={styles.unit_container} >
                    <Text style={styles.unit_text} >{unit}</Text>
                </View>
                <TouchableOpacity style={styles.btn_plus_minus} onPress={() => onAdd()} >
                    <Text style={styles.text} >+</Text>
                </TouchableOpacity>
            </View>
        )
    } else {
        return(
            <TouchableOpacity style={styles.button} onPress={() => onAdd()} >
                <Text style={[styles.text, { color: "#FFF" }]} >Add</Text>
            </TouchableOpacity>
        )
    }
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
        fontSize: 20,
        color: "#f14b5d",
    },
    optionsView: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    btn_plus_minus: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#f14b5d",
        borderRadius: 10,
        borderWidth: 0.5,
        height: 58,
        width: 38,
    },
    unit_container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 40
    },
    unit_text: {
        fontSize: 25,
        fontWeight: "600",
        textAlign: "center",
        color: "#f14b5d"
    }
})

export { ButtonAddRemove }