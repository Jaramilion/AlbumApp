import React, {JSX} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';

function Loading(): JSX.Element {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size={'large'} />
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loading;
