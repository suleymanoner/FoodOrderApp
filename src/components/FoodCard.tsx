import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FoodModel } from '../redux';

interface FoodCardProps {
    item: FoodModel,
    onTap: Function
}


const FoodCard: React.FC<FoodCardProps> = ({ item, onTap }) => {

    return(
        <View style={styles.container}>
            <Image source={{ uri: `${item.images[0]}`}} style={styles.image} />
            <TouchableOpacity style={styles.button_container} onPress={() => onTap(item)} >
                <View style={styles.text_container} >
                    <Text>{item.name}</Text>
                    <Text>{item.category}</Text>
                </View>
                <View style={styles.price_container} >
                    <Text style={styles.price_text} >{item.price}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "green"
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 20,
        backgroundColor: "#EAEAEA"
    },
    button_container: {
        display: "flex",
        flex: 1,
        flexDirection: "row",
    },
    text_container: {
        display: "flex",
        flex: 8,
        padding: 10,
    },
    price_container: {
        display: "flex",
        flex: 4,
        padding: 10,
        justifyContent: "space-around",
        alignItems: "center",
    },
    price_text: {
        fontSize: 18,
        fontWeight: "600",
        color: "#7C7C7C"
    }
})


export { FoodCard }