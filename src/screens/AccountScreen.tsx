import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import { ApplicationState, UserState, onUserLogout } from '../redux';
import { useNavigation } from '../utils'
import { LoginScreen } from './LoginScreen';
import { ScrollView } from 'react-native-gesture-handler';


interface AccountScreenProps {
    userReducer: UserState,
    onUserLogout: Function
}

const _AccountScreen: React.FC<AccountScreenProps> = (props) => {

    const { navigate } = useNavigation()
    const { user, location } = props.userReducer

    const options = [
        {
            title: "Edit Profile",
            action: () => {Alert.alert("edit profile")}
        },
        {
            title: "View Orders",
            action: () => {
                navigate("AccountOrderPage")
            }
        },
        {
            title: "Contact Support",
            action: () => {Alert.alert("Contact Support")}
        },
        {
            title: "Logout",
            action: () => {
                props.onUserLogout()
                console.log(user)
            }
        }
    ]

    const optionCard = (title: string, action: Function) => {
        return(
            <TouchableOpacity onPress={() => action()} key={title} style={styles.button_style} >
                <Text style={styles.edit_profile_text} >{title}</Text>
                <Image source={require("../images/arrow_icon.png")} style={styles.icon} />
            </TouchableOpacity>
        )
    }


    if(user.token !== undefined) {

        return(
            <View style={styles.container} >
                <View style={styles.navigation} >
                    <View style={styles.inside_container}>
                        
                        <Image source={require("../images/avatar.png")} style={styles.order_icon} />
                        <View style={styles.info_container} >
                            <Text style={styles.first_name_text} >{user.firstName || "Guest"}</Text> 
                            <Text style={styles.email_text} >{user.email}</Text> 
                        </View>         
                    </View>
                </View>
                <View style={styles.body} >

                    <ScrollView>
                        {options.map(({ title, action }) => {
                            return optionCard(title, action)
                            
                        })}
                    </ScrollView>
                   
                </View>
            </View>
        )
    } else {
        return(
            <LoginScreen />
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F2F2F2"
    },
    navigation: {
        flex: 3,
        marginTop: 45,
        padding: 10,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    inside_container: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
    },
    body: {
        flex: 9,
        display: "flex"
    },
    info_container: {
        flex: 1,
    },
    first_name_text: {
        fontSize: 22,
        fontWeight: "600",
        color: "black"
    },
    email_text: {
        fontSize: 14
    },
    order_icon: {
        width: 150,
        height: 150,
        marginRight: 15
    },
    edit_profile_text: {
        flex: 1,
        fontSize: 18,
        color: "black"
    },
    icon: {
        width: 40,
        height: 40,
    },
    button_style: {
        backgroundColor: "#fff",
        height: 80,
        justifyContent: "space-around",
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        paddingLeft: 30,
        paddingRight: 20,
        borderTopColor: "#d3d3d3",
        borderTopWidth: 0.5,
        borderBottomColor: "#d3d3d3",
        borderBottomWidth: 0.5
    }
})

const mapStateToProps = (state: ApplicationState) => ({
    userReducer: state.userReducer
})

const AccountScreen = connect(mapStateToProps, { onUserLogout })(_AccountScreen)

export { AccountScreen }