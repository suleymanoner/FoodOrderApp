import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

interface TextFieldProps {
    placeholder: string,
    isSecure?: boolean,
    onTextChange: Function,
    isOTP?: boolean
}


const TextField: React.FC<TextFieldProps> = ({ placeholder, isSecure = false, onTextChange, isOTP = false }) => {


    if(isOTP) {

        return(
            <View style={styles.container} >
                <TextInput 
                placeholder={placeholder}
                maxLength={6}
                autoCapitalize='none'
                secureTextEntry={true}
                showSoftInputOnFocus={false}
                keyboardType='numeric'
                onChangeText={(text) => onTextChange(text)}
                style={styles.otpTextField} />
            </View>
        )
    } else {

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
        paddingLeft: 20,
        borderWidth: 1,
        borderColor: "#f14b5d"
    },
    textField: {
        flex: 1,
        width: 320,
        height: 50,
        fontSize: 16,
        color: "#000"
    },
    otpTextField: {
        flex: 1,
        width: 320,
        height: 50,
        fontSize: 25,
        color: "#000",
        textAlign: "center",
    }
})

export { TextField }