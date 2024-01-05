import React, {FC} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AlbumRoutes} from './routes';
import {HomeScreens} from '../screens';

type RootStackParamList = {
  [AlbumRoutes.HomeScreen]: undefined;
  [AlbumRoutes.AlbumDetail]: {albumTitle: string};
};
const AlbumStack = createStackNavigator<RootStackParamList>();
const AlbumFlowNavigator: FC = () => {
  return (
    <AlbumStack.Navigator initialRouteName={AlbumRoutes.HomeScreen}>
      <AlbumStack.Screen
        name={AlbumRoutes.HomeScreen}
        component={HomeScreens.HomeScreen}
        options={{
          title: 'Users',
        }}
      />
      <AlbumStack.Screen
        name={AlbumRoutes.AlbumDetail}
        component={HomeScreens.AlbumDetail}
        options={({route}) => ({title: route.params.albumTitle})}
      />
    </AlbumStack.Navigator>
  );
};

const MainNavigator = () => {
  return <AlbumFlowNavigator />;
};

export default MainNavigator;
