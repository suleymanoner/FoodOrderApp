import React, { useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { connect } from 'react-redux'
import { ButtonWithIcon, ButtonWithTitle, TextField } from '../components';
import { ApplicationState, onUserLogin, onUserSignUp, UserState } from '../redux';

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
    const [otp, setOtp] = useState("")
    const [verified, setVerified] = useState(false)
    const [requestOtpTitle, setRequestOtpTitle] = useState("Request a new OTP in")
    const [canRequestOtp, setCanRequestOtp] = useState(true)

    const onTapOptions = () => {
        setIsSignup(!isSignup)
        setTitle(!isSignup ? "Sign Up" : "Login")
    }

    const onTapAuthenticate = () => {
        if(isSignup) {
            onUserSignUp(email, phone, password)
        } else {
            onUserLogin(email, password)
        }
    }


    if(!verified) {

        return(
            <View style={styles.container} >
                <View style={styles.body} >

                    <Image source={require('../images/otp_photo.png')} style={styles.image} />
                    <Text style={styles.text_ver_title} >Verification</Text>
                    <Text style={styles.text_enter_number_title} >Enter your OTP sent to your mobile number</Text>
                    <TextField isOTP={true} placeholder='OTP' onTextChange={() => {}} />

                    <ButtonWithTitle title='Verify OTP' onTap={() => {}} width={340} height={50} />
                    <ButtonWithTitle disable={canRequestOtp} title={requestOtpTitle} isNoBg={true} onTap={() => {}} width={340} height={50} />


                </View>
                
    
                <View style={styles.footer} ></View>
            </View>
        )




    } else {

        return(
            <View style={styles.container} >
                <View style={styles.navigation} >
                    <Text style={styles.title} >{title}</Text>
                </View>
    
                <View style={styles.body} >
                        <TextField placeholder="Email" onTextChange={setEmail} />
                        { isSignup && <TextField placeholder="Phone" onTextChange={setPhone} /> }
                        <TextField placeholder="Password" onTextChange={setPassword} isSecure={true} />
                        <ButtonWithTitle title={title} onTap={onTapAuthenticate} width={340} height={50} />
                        <ButtonWithTitle title={!isSignup ? "No Account? Signup here!" : "Have an Account? Login here!"}
                        onTap={() => {onTapOptions()}} width={340} height={50} isNoBg={true} />
    
                </View>
                
    
                <View style={styles.footer} ></View>
            </View>
        )
    }    
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
    },
    image: {
        width: 120,
        height: 120,
        margin: 20,

    },
    text_ver_title: {
        fontSize: 22,
        fontWeight: "600",
        margin: 10,
    },
    text_enter_number_title: {
        fontSize: 16,
        padding: 10,
        marginBottom: 20,
        color: "#716F6F"
    }
})


const mapStateToProps = (state: ApplicationState) => ({
    userReducer: state.userReducer
})

const LoginScreen = connect(mapStateToProps, { onUserSignUp, onUserLogin })(_LoginScreen)

export { LoginScreen }