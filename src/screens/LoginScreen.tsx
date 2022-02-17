import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { connect } from 'react-redux'
import { ButtonWithIcon, ButtonWithTitle, TextField } from '../components';
import { ApplicationState, onUserLogin, onUserSignUp, UserState, onOTPRequest, onVerifyOTP } from '../redux';
import { useNavigation } from '../utils'

interface LoginProps {
    onUserSignUp: Function,
    onUserLogin: Function,
    userReducer: UserState,
    onOTPRequest: Function,
    onVerifyOTP: Function
}

// for development, we can use OTP: 494949, if requested new OTP it will be: 595959

const _LoginScreen: React.FC<LoginProps> = ({ onUserLogin, onUserSignUp, userReducer, onOTPRequest, onVerifyOTP }) => {

    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [title, setTitle] = useState('Login')
    const [isSignup, setIsSignup] = useState(false)
    const [otp, setOtp] = useState("")
    const [verified, setVerified] = useState(true)
    const [requestOtpTitle, setRequestOtpTitle] = useState("Request a new OTP in")
    const [canRequestOtp, setCanRequestOtp] = useState(false)

    const { user } = userReducer
    const { navigate } = useNavigation()

    let countDown: NodeJS.Timer

    useEffect(() => {

        if(user.token !== undefined) {
            if(user.verified === true) {
                navigate('CartPage')
            } else {
                setVerified(user.verified)
                onEnableOtpRequest()
            }
        }

        return () => {
            clearInterval(countDown)
        }

    }, [user])

    const onTapOptions = () => {
        setIsSignup(!isSignup)
        setTitle(!isSignup ? "Sign Up" : "Login")
    }

    const onTapAuthenticate = () => {
        const edittedEmail = email.split(" ").join("")

        if(isSignup) {
            onUserSignUp(edittedEmail, phone, password)
        } else {
            onUserLogin(edittedEmail, password)
        }
    }


    const onEnableOtpRequest = () => {

        const otpDate = new Date()
        otpDate.setTime(new Date().getTime() + (2 * 60 * 1000))
        const optTime = otpDate.getTime()

        countDown = setInterval(function() {

            const currentTime = new Date().getTime()
            const totalTime = optTime - currentTime

            let minutes = Math.floor((totalTime % (1000 * 60 * 60)) / (1000 * 60))
            let seconds = Math.floor((totalTime % (1000 * 60)) / 1000)

            if(seconds < 10) {
                setRequestOtpTitle(`Request a new OTP in ${minutes}:0${seconds}`)
            } else {
                setRequestOtpTitle(`Request a new OTP in ${minutes}:${seconds}`)
            }

            if(minutes < 1 && seconds < 1) {
                setRequestOtpTitle("Request a new OTP")
                setCanRequestOtp(true)
                clearInterval(countDown)
            }
        }, 1000)
    }


    const onTapVerify = () => {
        onVerifyOTP(otp, user) 
    }

    const onTapRequestNewOTP = () => {
        setCanRequestOtp(false)
        onOTPRequest(user)
    }



    if(!verified) {

        return(
            <View style={styles.container} >
                <View style={styles.body} >

                    <Image source={require('../images/verify_otp.png')} style={styles.image} />
                    <Text style={styles.text_ver_title} >Verification</Text>
                    <Text style={styles.text_enter_number_title} >Enter your OTP sent to your mobile number</Text>
                    <TextField isOTP={true} placeholder='OTP' onTextChange={setOtp} />

                    <ButtonWithTitle title='Verify OTP' onTap={onTapVerify} width={340} height={50} />
                    <ButtonWithTitle disable={!canRequestOtp} title={requestOtpTitle} 
                    isNoBg={true} onTap={onTapRequestNewOTP} width={340} height={50} />

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

const LoginScreen = connect(mapStateToProps, { onUserSignUp, onUserLogin, onVerifyOTP, onOTPRequest })(_LoginScreen)

export { LoginScreen }