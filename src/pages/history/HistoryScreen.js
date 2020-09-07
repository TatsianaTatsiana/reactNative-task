import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
} from 'react-native';
import { LocationContext } from '../../context/LocationProvider';
import HistoryModal from '../../pages/history/HistoryModal';
import moment from 'moment';

class HistoryScreen extends React.Component {
  static contextType = LocationContext;
  state = {
    isOpen: false,
    selectedItem: null,
  };

  switchOpen = (item) => {
    this.setState({ isOpen: !this.state.isOpen, selectedItem: item });
  };

  render() {
    const { history } = this.context;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.wrapper}>
          <ScrollView>
            <View>
              <View style={styles.row}>
                <Text style={styles.tableHeader}>Parameters</Text>
                <Text style={styles.tableHeader}>Data from request</Text>
              </View>
              {history.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    this.switchOpen(item);
                  }}
                >
                  <View style={styles.row}>
                    <Text style={styles.tableBody}>
                      Date and time of request:
                    </Text>
                    <Text style={styles.tableBody}>
                      {moment(item.timestamp).format('LL, hh:mm:ss')}
                    </Text>
                  </View>
                  <View style={styles.rowCoords}>
                    <Text style={styles.tableBody}>Coordinates:</Text>
                    <Text style={styles.tableBody}>
                      {item.latitude}, {item.longitude}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          <Modal visible={this.state.isOpen}>
            <HistoryModal
              switchOpen={this.switchOpen}
              selectedItem={this.state.selectedItem}
            />
          </Modal>
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
    marginTop: 30,
  },
  row: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#3455db',
    borderBottomWidth: 0,
  },
  rowCoords: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#3455db',
    borderTopWidth: 0,
  },
  tableHeader: {
    color: '#3455db',
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#3455db',
    width: '50%',
    textAlign: 'center',
    padding: 5,
  },
  tableBody: {
    width: '50%',
    padding: 5,
  },
});

export default HistoryScreen;
