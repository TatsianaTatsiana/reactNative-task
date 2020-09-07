import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import * as Location from 'expo-location';
import { LocationContext } from '../../context/LocationProvider';
import { Spinner } from '../../components/Spinner';
import { AsyncStorage } from 'react-native';

class LocationScreen extends React.Component {
  static contextType = LocationContext;

  state = { temperature: null };

  componentDidMount() {
    this.fillDate();
  }

  fetchCurrentLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
    }

    let location = await Location.getCurrentPositionAsync({});
    this.fetchWeather(location.coords.latitude, location.coords.longitude);

    this.context.setLocation({
      id: location.timestamp++,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      timestamp: location.timestamp,
    });
    return location;
  };

  fetchWeather = async (latitude, longitude) => {
    const key = '5d9ba466d380732f34fe1a1374d936b3';

    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`
      );
      if (response.ok) {
        const data = await response.json();
        this.setState({
          temperature: this.transformTemp(data.main.temp),
        });
      }
    } catch {
      (error) => {
        console.error(error);
      };
    }
  };

  transformTemp = (temp) => {
    return Math.round(temp - 273.15);
  };

  setData = async (id, timestamp, latitude, longitude) => {
    try {
      await AsyncStorage.setItem(
        'data',
        JSON.stringify([
          ...this.context.history,
          { id, timestamp, latitude, longitude },
        ])
      );
    } catch (error) {
      console.error(error);
    }
  };

  getData = async () => {
    try {
      const date = await AsyncStorage.getItem('data');
      return JSON.parse(date);
    } catch (error) {
      console.error(error);
    }
  };

  fillDate = async () => {
    const data = await this.getData();
    if (data.length === 0) {
      this.fetchCurrentLocation();
      return;
    }
    this.fetchWeather(
      data[data.length - 1].latitude,
      data[data.length - 1].longitude
    );
    this.context.addStorageHistory(data);
  };

  newRequest = async () => {
    const result = await this.fetchCurrentLocation();
    const { timestamp } = result;
    const { latitude, longitude } = result.coords;
    this.setData(this.context.id, timestamp, latitude, longitude);
  };

  render() {
    const { history } = this.context;
    if (!history.length || !this.state.temperature) {
      return <Spinner />;
    }
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.row}>
            <Text> Longitude: </Text>
            <Text>{history[history.length - 1].longitude}</Text>
          </View>
          <View style={styles.row}>
            <Text> Latitude: </Text>
            <Text>{history[history.length - 1].latitude}</Text>
          </View>
          <View style={styles.lastRow}>
            <Text> Temparature: </Text>
            <Text>{this.state.temperature}℃</Text>
          </View>
          <TouchableOpacity onPress={this.newRequest} style={styles.btn}>
            <Text style={styles.text}>Send request</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    marginTop: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    width: '100%',
    height: 50,
    backgroundColor: '#3455db',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    position: 'absolute',
    bottom: 20,
  },
  text: {
    fontSize: 20,
    color: '#fff',
  },
  row: {
    borderTopWidth: 1,
    borderColor: '#999',
    flexDirection: 'row',
    paddingVertical: 10,
    width: '100%',
    justifyContent: 'space-between',
  },
  lastRow: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#999',
    flexDirection: 'row',
    paddingVertical: 10,
    width: '100%',
    justifyContent: 'space-between',
  },
});

export default LocationScreen;
