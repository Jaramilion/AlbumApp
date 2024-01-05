import {StackNavigationProp} from '@react-navigation/stack';
import React, {JSX} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AlbumRoutes} from '../../navigation/routes';

interface Props {
  navigation: StackNavigationProp<{
    [AlbumRoutes.AlbumDetail]: {
      albumTitle: string;
    };
  }>;
}

function HomeScreen({navigation}: Props): JSX.Element {
  return (
    <View style={styles.mainView}>
      <Text>Hi</Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(AlbumRoutes.AlbumDetail, {
            albumTitle: 'House Party',
          })
        }>
        <Text>Navigate to album details</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
});

export default HomeScreen;
