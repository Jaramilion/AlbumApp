import React, {JSX} from 'react';
import {Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {AlbumRoutes} from '../../navigation/routes';
import {RootStackParamList} from '../../navigation/MainNavigator';
import {BASE_URL} from '@env';

type Props = StackScreenProps<RootStackParamList, AlbumRoutes.AlbumDetail>;

function BagOfChips({navigation, route}: Props): JSX.Element {
  return (
    <View>
      <Text>lol</Text>
    </View>
  );
}

export default BagOfChips;
