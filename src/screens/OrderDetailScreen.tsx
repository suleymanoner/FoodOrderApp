import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, Alert } from 'react-native';
import { connect } from 'react-redux';
import { ApplicationState, UserState, onGetOrders, OrderModel } from '../redux';
import { ButtonWithIcon, FoodCard, OrderCard } from '../components'
import { useNavigation } from '../utils'


interface OrderDetailScreenProps {
    userReducer: UserState,
    navigation : { getParam: Function, goBack: Function }
}

const _OrderDetailScreen: React.FC<OrderDetailScreenProps> = (props) => {

    const { goBack, getParam } = props.navigation
    const { navigate } = useNavigation()
    const { user } = props.userReducer

    const order = getParam("order") as OrderModel


    return(
        <View style={styles.container} >
            <View style={styles.navigation} >
                <View style={styles.inside_container}>

                    <ButtonWithIcon width={50} height={50} onTap={() => goBack()} icon={require("../images/back_arrow.png")} />

                    <Text style={styles.orders_text}>Order ID: {order.orderID}</Text>
                        
                </View>
            </View>
            <View style={styles.body} >
               
                <FlatList 
                showsVerticalScrollIndicator={false}
                data={order.items}
                renderItem={({item}) => 
                <FoodCard item={item.food} onTap={()=> {}} onUpdateCart={() => {}} unit={item.unit} /> } 
                keyExtractor={(item) => `${item._id}`} />
                
            </View>

            <View style={styles.footer}>
                
            </View>

        </View>
    )

    
        
    

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F2F2F2"
    },
    navigation: {
        flex: 1,
        marginTop: 20,
    },
    inside_container: {
        display: "flex",
        height: 60,
        justifyContent: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 4,
        paddingLeft: 20,
        paddingRight: 20,
    },
    body: {
        flex: 9,
        justifyContent: "center",
        alignItems: "center"
    },
    empty_cart_container: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    empty_text: {
        fontSize: 25,
        fontWeight: "700",
        color: "black"
    },
    footer: {
        flex: 2,
        padding: 10,
    },
    amount_container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 20,
        paddingLeft: 20
    },
    total_text: {
        fontSize: 18
    },
    popup_container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        width: "100%",
    },
    payment_view: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
        margin: 5,
        backgroundColor: "#E3BE74",
    },
    payment_view_address_container: {
        display: "flex",
        height: 100,
        padding: 20,
        flexDirection: "row"
    },
    delivery_address_title: {
        fontSize: 16,
        fontWeight: "800",
        marginBottom: 5,
        color: "black"
    },
    delivery_address_text: {
        fontSize: 16, 
        marginBottom: 5,
        color: "#666666",
        width: Dimensions.get("screen").width - 60
    },
    payment_options: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: Dimensions.get("screen").width
    },
    options: {
        display: "flex",
        height: 120,
        width: 160,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
        padding: 10,
        borderColor: "#A0A0A0",
        backgroundColor: "#F2F2F2",
        borderWidth: 0.2,
        borderRadius: 10,
        margin: 10,
    },
    icon: {
        width: 115,
        height: 80,
    },
    icon_text: {
        fontSize: 16,
        fontWeight: "800",
        color: "#545252",
    },
    orders_text: {
        fontSize: 22,
        fontWeight: "700",
        color: "black"
    },
    order_icon: {
        width: 50,
        height: 50,
    }
})

const mapStateToProps = (state: ApplicationState) => ({
    userReducer: state.userReducer
})

const OrderDetailScreen = connect(mapStateToProps, { onGetOrders })(_OrderDetailScreen)

export { OrderDetailScreen }