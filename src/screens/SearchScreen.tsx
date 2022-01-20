import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet } from 'react-native';


interface SearchScreenProps {

}

const SearchScreen: React.FC<SearchScreenProps> = (props) => {

    return(
        <View style={styles.container} >

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export { SearchScreen }