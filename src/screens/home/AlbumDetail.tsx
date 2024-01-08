import React, {JSX} from 'react';
import {Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {AlbumRoutes} from '../../navigation/routes';
import {RootStackParamList} from '../../navigation/MainNavigator';

type Props = StackScreenProps<RootStackParamList, AlbumRoutes.AlbumDetail>;

function AlbumDetail({navigation, route}: Props): JSX.Element {
  const {albumData} = route.params;
  return (
    <View>
      <Text>{albumData.title}</Text>
    </View>
  );
}

export default AlbumDetail;
