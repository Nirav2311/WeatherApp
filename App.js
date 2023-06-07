import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  StatusBar
} from 'react-native';
import { useEffect, useState } from 'react';
import moment from 'moment';
import WeatherCard from './WeatherCard';
import MapView from "react-native-maps";


export default function App() {

  const [myData, setMyData] = useState([])
  const [lat, setLat] = useState(42.9716)
  const [long, setLong] = useState(-78.8536)
  const [gridX, setGridX] = useState(0)
  const [gridY, setGridY] = useState(0)
  const [isLoading, setLoading] = useState(false)
  const [region, setRegion] = useState({
    latitude: 42.9716,
    longitude: -78.8536,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  });

  const today = moment().add(-1, 'days')

  useEffect(() => {
    getGrid()
  }, [lat, long])

  useEffect(() => {
    if (gridX && gridY) {
      getDataFromApiAsync()
    }
  }, [gridY, gridX])

  const getGrid = async () => {
    setLoading(true)

    try {
      const response = await fetch(
        `https://api.weather.gov/points/${region.latitude},${region.longitude}`
      );
      const json = await response.json();

      if (json.status !== 404) {
        setGridX(json.properties.gridX)
        setGridY(json.properties.gridY)
      } else {
        Alert.alert("Data Unavailable For Requested Point")
      }

      setLoading(false)

    } catch (error) {
      console.error(error);
    }
  }

  const getDataFromApiAsync = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `https://api.weather.gov/gridpoints/AKQ/${gridX},${gridY}/forecast/hourly?units=si`
      );
      const json = await response.json();

      if (json.status !== 404) {
        if (json.status !== 500) {

          const newArray = json.properties?.periods?.map((item, index) => {
            return (
              {
                "Date": moment(item.startTime).format("DD-MM-YYYY"),
                "Day": moment(item.startTime).day(),
                "Temp": item.temperature,
                "Rain": item.probabilityOfPrecipitation.value
              }
            )
          })

          feedData(newArray)
        }
      } else {
        setLoading(false)
        Alert.alert("Can not fetch data....")
      }

      setLoading(false)

    } catch (error) {
      console.error(error);
    }
  };

  const feedData = (newArray) => {
    let finalArray = []
    for (let i = 0; i < 7; i++) {
      let day = today.add(1, "day").format("DD-MM-YYYY")

      let daywiseArray = newArray.filter((item) => item.Date == day)
      let sortedArray = daywiseArray.sort((a, b) => (a.Temp) - (b.Temp))

      let newObject = {
        "Date": sortedArray[0].Date,
        "Day": sortedArray[0].Day,
        "minTemp": sortedArray[0].Temp,
        "maxTemp": sortedArray[sortedArray.length - 1].Temp,
        "Rain": sortedArray[sortedArray.length - 1].Rain
      }

      finalArray.push(newObject)
    }
    setMyData(finalArray)
  }

  const onPressReload = () => {
    setLat(region.latitude);
    setLong(region.longitude);
  }

  return (
    <SafeAreaView style={styles.container} >
      <Text style={[styles.text, { marginBottom: 10 }]}> Welcome to weather app!</Text>
      {
        isLoading ? <ActivityIndicator /> :
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

          <ScrollView showsVerticalScrollIndicator={false}>
            {
              myData.map((item, index) => {
                return (
                  <View key={index}>
                    <WeatherCard item={item} />
                  </View>
                )
              })
            }
          </ScrollView>
          <TouchableOpacity onPress={onPressReload} style={styles.btn}>
            <Text style={{ color: "white", fontWeight: "bold", fontFamily: Platform.OS == "ios" ? "Futura" : "monospace" }}>Reload</Text>
          </TouchableOpacity>
          <View>
            <Text style={[styles.text,{fontSize:10}]}>Data Source : https://www.weather.gov/documentation/services-web-api</Text>
          </View>
        </>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 100
  },
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

