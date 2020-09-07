import { StatusBar } from 'expo-status-bar';
import React from 'react';
import RouteNav from './src/navigation/RouteNav';
import LocationProvider from './src/context/LocationProvider';

class App extends React.Component {
  render() {
    return (
      <LocationProvider>
        <RouteNav />
      </LocationProvider>
    );
  }
}

export default App;
