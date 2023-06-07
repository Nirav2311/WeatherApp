import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useEffect, useState } from 'react';
import moment from 'moment';
import WeatherCard from './app/components/WeatherCard';
import MapCard from './app/components/MapCard';
import { styles } from "./AppStyles"
import { 
  HEADER, 
  FOOTER, 
  RELOAD, 
  DATA_UNAVAILABLE, 
  WEATHER_API,
  COORDINATE_API
} from './app/components/Constants';

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

  const yesterday = moment().add(-1, 'days')

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
        COORDINATE_API.replace("##latitude##",region.latitude).replace("##longitude##",region.longitude)
      );
      const json = await response.json();

      if (json.status !== 404) {
        setGridX(json.properties.gridX)
        setGridY(json.properties.gridY)
      } else {
        Alert.alert(DATA_UNAVAILABLE)
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
        WEATHER_API.replace("##GridX##", gridX).replace("##GridY##", gridY)
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
      let day = yesterday.add(1, "day").format("DD-MM-YYYY")

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
      <Text style={[styles.text, { marginBottom: 10 }]}>{HEADER}</Text>
      {
        isLoading ? <ActivityIndicator /> :
        <>
          <MapCard region = {region}  setRegion={setRegion}/>
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
            <Text style={styles.btnText}>{RELOAD}</Text>
          </TouchableOpacity>
          <View>
            <Text style={[styles.text,{fontSize:10}]}>{FOOTER}</Text>
          </View>
        </>
      }
    </SafeAreaView>
  );
}
