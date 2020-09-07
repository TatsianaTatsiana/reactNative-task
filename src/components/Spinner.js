import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

export const Spinner = () => {
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator color='#3455db' size='large' />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
