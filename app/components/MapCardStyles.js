import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
    map: {
      height: 200,
      width: "90%",
      marginVertical: 20,
      borderRadius: 10,
    },
    text: {
    fontFamily: Platform.OS == "ios" ? "Futura" : "monospace",
      fontSize: Platform.OS == "ios" ? 18 : 15,
      color:"#000C66"
    }
  });