import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import { Category } from '../redux'

interface CategoryProps {
    item: Category,
    onTap: Function
}

const CategoryCard: React.FC<CategoryProps> = ({ item, onTap }) => {

    return(
        <TouchableOpacity style={styles.container} onPress={() => onTap(item)} >
            <Image source={{ uri: `${item.icon}` }} style={styles.image} />
            <Text style={styles.text} >{item.title}</Text>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    container: {
        width: 120,
        height: 140,
        justifyContent: "space-around",
        alignItems: "center",
        margin: 5
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 20,
        backgroundColor: "#EAEAEA"
    },
    text: {
        fontSize: 14,
        marginTop: 10,
        color: "black"
    }
})


export { CategoryCard }
