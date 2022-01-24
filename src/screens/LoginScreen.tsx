import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux'
import { ButtonWithIcon, ButtonWithTitle, TextField } from '../components';
import { ApplicationState, onUserLogin, UserState } from '../redux';

interface LoginProps {
    onUserSignUp: Function,
    onUserLogin: Function,
    userReducer: UserState
}

const _LoginScreen: React.FC<LoginProps> = ({ onUserLogin, onUserSignUp, userReducer }) => {

    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [title, setTitle] = useState('Login')
    const [isSignup, setIsSignup] = useState(false)

    const onTapOptions = () => {
        setIsSignup(!isSignup)
        setTitle(!isSignup ? "Sign Up" : "Login")
    }

    return(
        <View style={styles.container} >
            <View style={styles.navigation} >
                <Text style={styles.title} >{title}</Text>
            </View>

            <View style={styles.body} >
                    <TextField placeholder="Email" onTextChange={setEmail} />
                    { isSignup && <TextField placeholder="Phone" onTextChange={setPhone} /> }
                    <TextField placeholder="Password" onTextChange={setPassword} />
                    <ButtonWithTitle title={title} onTap={() => {}} width={340} height={50} />
                    <ButtonWithTitle title={!isSignup ? "No Account? Signup here!" : "Have an Account? Login here!"}
                     onTap={() => {onTapOptions()}} width={340} height={50} isNoBg={true} />

            </View>
            

            <View style={styles.footer} ></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    navigation: {
        flex: 1,
        paddingLeft: 50,
        paddingTop: 50
    },
    body: {
        flex: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    footer: {
        flex: 1,
    },
    title: {
        fontSize: 30
    }
})


const mapStateToProps = (state: ApplicationState) => ({
    userReducer: state.userReducer
})

const LoginScreen = connect(mapStateToProps, {  })(_LoginScreen)

export { LoginScreen }