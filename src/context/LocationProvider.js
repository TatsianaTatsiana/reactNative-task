import React from 'react';

export const LocationContext = React.createContext();

class LocationProvider extends React.Component {
  state = {
    history: [],
  };

  setLocation = (params) => {
    this.setState({ history: [...this.state.history, params] });
  };

  addStorageHistory = (param) => {
    this.setState({ history: param });
  };

  render() {
    const { history } = this.state;
    return (
      <LocationContext.Provider
        value={{
          history,
          setLocation: this.setLocation,
          addStorageHistory: this.addStorageHistory,
        }}
      >
        {this.props.children}
      </LocationContext.Provider>
    );
  }
}

export default LocationProvider;
