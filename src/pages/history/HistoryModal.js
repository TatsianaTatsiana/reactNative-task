import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';

class HistoryModal extends React.Component {
  render() {
    const { latitude, longitude, timestamp } = this.props.selectedItem;
    return (
      <View style={styles.wrapper}>
        <View style={styles.wrapperBtn}>
          <TouchableOpacity onPress={this.props.switchOpen}>
            <Icon name='close' size={30} color='#000' />
          </TouchableOpacity>
        </View>
        <View>
          <View style={styles.row}>
            <Text> Longitude: </Text>
            <Text>{longitude}</Text>
          </View>
          <View style={styles.row}>
            <Text> Latitude: </Text>
            <Text>{latitude}</Text>
          </View>
          <View style={styles.lastRow}>
            <Text> Date: </Text>
            <Text>{moment(timestamp).format('LL, hh:mm:ss')}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapperBtn: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  wrapper: {
    paddingVertical: 20,
    paddingHorizontal: 20,
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

export default HistoryModal;
