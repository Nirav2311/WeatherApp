import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
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