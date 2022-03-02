import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { MAP_API_KEY } from '../utils';
import { Region } from '../redux/models'
import MapView from 'react-native-maps'


interface LocationPickMapProps {
    lastLocation: Region,
    onMarkerChanged: Function
}

const LocationPickMap: React.FC<LocationPickMapProps> = ({ onMarkerChanged, lastLocation }) => {
    
    const onRegionChange = (newRegion: Region) => {
        onMarkerChanged(newRegion)
    }


    return(
        <View style={styles.container} >

            <MapView
                style={styles.map_view_container}
                initialRegion={lastLocation}
                onRegionChangeComplete={onRegionChange}
            >

            </MapView>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
    },
    button: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 60,
        height: 40
    },
    map_view_container: {
        flex: 1,
    }
})

export { LocationPickMap }