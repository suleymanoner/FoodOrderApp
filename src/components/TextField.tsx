import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

interface TextFieldProps {
    placeholder: string,
    isSecure?: boolean,
    onTextChange: Function
}


const TextField: React.FC<TextFieldProps> = ({ placeholder, isSecure = false, onTextChange }) => {

    return(
        <View style={styles.container} >
            <TextInput 
            placeholder={placeholder}
            autoCapitalize='none'
            secureTextEntry={isSecure}
            showSoftInputOnFocus={false}
            keyboardType='numeric'
            onChangeText={(text) => onTextChange(text)}
            style={styles.textField} />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        width: 340,
        backgroundColor: "#DBDBDB",
        height: 50,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingRight: 10,
        paddingLeft: 20
    },
    textField: {
        flex: 1,
        height: 50,
        fontSize: 20,
        color: "#000"
    }
})

export { TextField }