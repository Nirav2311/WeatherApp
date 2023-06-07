import React from "react"
import { Text, StyleSheet } from "react-native"
import MapView from "react-native-maps";
import { styles } from "./MapCardStyles"

export default function MapCard(props) {
    const {region, setRegion} = props
   
    return(
        <> 
            <MapView
            style={styles.map}
            initialRegion={{
              latitude: region.latitude,
              longitude: region.longitude,
              latitudeDelta: region.latitudeDelta,
              longitudeDelta: region.longitudeDelta,
            }}
            onRegionChangeComplete={(region) => setRegion(region)}
          />
          <Text style={styles.text}>Current latitude: {region.latitude}</Text>
          <Text style={styles.text}>Current longitude: {region.longitude}</Text>
        </>
    )
}
