import React from "react";
import { View, Text } from "react-native";
import { styles } from "./WeatherCardStyles";

export default function WeatherCard(props) {
    const {item} = props
   
    const weekDay = (item) => {
        switch(item){
            case 0:
                return "Sunday";
            case 1:
                return "Monday";
            case 2:  
                return "Tuesday";
            case 3:
                return "Wednesday";
            case 4:
                return "Thursday";
            case 5:
                return "Friday";
            case 6:
                return "Saturday";
            default:
                return null;    
        }
    }
    return(
        <>
            <View style={styles.card}>
                <View style={styles.data}>
                <Text style={styles.dayfonts}> {item.Date}  |</Text>
                <Text style={styles.dayfonts}>{weekDay(item.Day)}</Text>
                </View>
                <View style={styles.data}>
                <Text style={styles.tempfonts}>MaxTemp : {item.maxTemp}  </Text>
                <Text style={styles.tempfonts}>MinTemp : {item.minTemp}  </Text>
                <Text style={styles.tempfonts}>Rain: {item.Rain}% </Text>
                </View>  
            </View>
        </>
    )
}

  