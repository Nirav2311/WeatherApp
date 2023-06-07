import { StyleSheet, Platform, StatusBar } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E3F4FE',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0
    },
    btn: {
      height: 70,
      width: 70,
      borderRadius: 35,
      borderColor: "#e3f4fe",
      borderWidth: 2,
      backgroundColor: "#f58008",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1,
      shadowColor: '#171717',
      shadowOffset: { width: -2, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 10,
      position: "absolute",
      top: "14%",
      left: "78%"
    },
    text: {
    fontFamily: Platform.OS == "ios" ? "Futura" : "monospace",
      fontSize: Platform.OS == "ios" ? 18 : 15,
      color:"#000C66"
    },
    btnText:{
      color: "white",
      fontWeight: "bold",
      fontFamily: Platform.OS == "ios" ? "Futura" : "monospace" 
    }
  });