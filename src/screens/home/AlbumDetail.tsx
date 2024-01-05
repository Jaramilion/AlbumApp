import React, {JSX} from 'react';
import {Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {AlbumRoutes} from '../../navigation/routes';

type RootStackParamList = {
  [AlbumRoutes.AlbumDetail]: {albumTitle: string};
};

type Props = StackScreenProps<RootStackParamList, AlbumRoutes.AlbumDetail>;

function AlbumDetail({navigation, route}: Props): JSX.Element {
  return (
    <View>
      <Text>{route.params.albumTitle}</Text>
    </View>
  );
}

export default AlbumDetail;
