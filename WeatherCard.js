import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";

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

const styles = StyleSheet.create({
    card: {
      flex: 1,
      backgroundColor: '#19C3FB',
      alignItems: 'center',
      justifyContent: 'center',
      margin:'3%',
      padding:'4%',
      width:"90%",
      borderRadius:7,
      zIndex:1,
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation:20,
    },
    data:{
        flexDirection:"row",  
    },
    dayfonts:{
        color:"white",
        fontWeight:"bold",
        fontSize:22,
        margin:5,
        fontFamily: Platform.OS == "ios" ? "Futura" : "monospace"
    },
    tempfonts:{
        color:"white",
        fontWeight:"600",
        fontSize:16,
        marginVertical:5,
        fontFamily:Platform.OS == "ios" ? "Futura" : "monospace"
    }

  });
  