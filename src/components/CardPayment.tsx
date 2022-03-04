import React, { useState } from "react"
import { Text, View, StyleSheet, TextInput } from "react-native"
import { ButtonWithTitle } from "."
import { PaymentMethodCreateParams, useConfirmPayment, CardField, CardFieldInput } from '@stripe/stripe-react-native'
import axios from 'axios'

interface CardPaymentProps {
    onPaymentSuccess: Function,
    onPaymentFailed: Function,
    onPaymentCancel: Function,
    amount: number
}


const CardPayment: React.FC<CardPaymentProps> = ({ onPaymentSuccess, onPaymentFailed, onPaymentCancel, amount }) => {

    const [name, setName] = useState("")
    const { confirmPayment, loading } = useConfirmPayment()


    const initPayment = async () => {

        // for android, we should use ip address in url.
        // for ios, we should use localhost instead of ip address. "http://localhost:4000/create-payment-intent"
        const response = await axios.post("http://192.168.1.151:4000/create-payment-intent", {
            amount,
            currency: "try",
            paymentMethod: "card"
        })

        if(response.data) {

            const clientSecret = response.data.clientSecret
            console.log("Client secret: ", clientSecret );

            const billingDetails: PaymentMethodCreateParams.BillingDetails = {
                name
            }

            const { error, paymentIntent } = await confirmPayment(clientSecret, {
                type: "Card",
                billingDetails
            })

            if(error) {
                console.log("Error !: ", error.message)
                onPaymentFailed(error.message)
            } else {
                console.log("Success: ", paymentIntent)
                onPaymentSuccess(paymentIntent)
            }

        } else {
            console.log("Intent server is not responding ! ")
            onPaymentFailed("Client server not found !")
        }
    }


    return(
        <View style={styles.container} >
            <View style={styles.navigation} >
                <View style={styles.inside_container}>
                    <Text style={styles.make_payment_text} >Make Payment</Text>          
                </View>
            </View>
            <View style={styles.body} >
                <View style={styles.pay_amount_container} >
                    <View style={styles.amount_container} >
                        <Text style={styles.total_text} >Total</Text>
                        <Text style={styles.total_text} >{amount} ₺</Text>
                    </View>
                </View>

                <View style={styles.credit_cart_container} >

                    <TextInput 
                        autoCapitalize="none"
                        placeholder="Name on Card"
                        keyboardType='numeric'
                        showSoftInputOnFocus={false}
                        onChange={(value) => setName(value.nativeEvent.text)}
                        style={styles.name_on_card}
                    />

                    <CardField 
                        placeholder={{
                            number: "0000 0000 0000 0000"
                        }}
                        onCardChange={(cardDetails) => {
                            console.log(cardDetails)
                        }}
                        onFocus={(focusField) => {
                            console.log(focusField)
                        }}
                        cardStyle={inputStyle}
                        style={styles.card_fields}
                    />

                </View>

                <ButtonWithTitle disable={loading} isNoBg={true} title="Cancel Payment" onTap={onPaymentCancel} height={50} width={320} />
                <ButtonWithTitle disable={loading} title="Pay" onTap={initPayment} height={50} width={320} />
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
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 4,
        paddingLeft: 20,
        paddingRight: 20,
    },
    body: {
        flex: 11,
    },
    footer: {
        flex: 2,
        padding: 10,
    },
    make_payment_text: {
        fontSize: 22,
        fontWeight: "700",
        color: "black"
    },
    credit_cart_container: {
        backgroundColor: "#FFF",
        marginLeft: 15,
        marginRight: 15,
        padding: 10,
        borderRadius: 20,
        marginTop: 20,
        marginBottom: 50,
        borderColor: "#D3D3D3",
        borderWidth: 5
    },
    card_fields: {
        width: "100%",
        height: 50,
        marginVertical: 30
    },
    name_on_card: {
        height: 44,
        fontSize: 16,
        borderBottomColor: "#DEDEDE",
        borderBottomWidth: 1,
        marginBottom: 20,
    },
    pay_amount_container: {
        marginTop: 60,
        marginBottom: 30
    },
    amount_container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 20,
        paddingLeft: 20
    },
    total_text: {
        fontSize: 18,
        color: "black"
    },
})

const inputStyle: CardFieldInput.Styles = {
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: 'white',
    placeholderColor: "gray"
}

export { CardPayment }