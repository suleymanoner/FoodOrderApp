import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { ApplicationState, ShoppingState } from '../redux';


interface SearchScreenProps {
    shoppingReducer: ShoppingState,
}

const _SearchScreen: React.FC<SearchScreenProps> = (props) => {

    

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

const mapStateToProps = (state: ApplicationState) => ({
    shoppingReducer: state.shoppingReducer
})

const SearchScreen = connect(mapStateToProps, {})(_SearchScreen)

export { SearchScreen }