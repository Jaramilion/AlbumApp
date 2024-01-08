import React, {FC} from 'react';
import {Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {AlbumRoutes} from './routes';
import {HomeScreens} from '../screens';

export type RootStackParamList = {
  [AlbumRoutes.HomeScreen]: undefined;
  [AlbumRoutes.AlbumDetail]: {
    albumData: {
      userId: number;
      albumId: number;
      title: string;
    };
  };
};
const AlbumStack = createStackNavigator<RootStackParamList>();
const AlbumFlowNavigator: FC = () => {
  return (
    <AlbumStack.Navigator
      initialRouteName={AlbumRoutes.HomeScreen}
      screenOptions={{
        headerStyle: {
          elevation: 3,
        },
        headerShadowVisible: true,
      }}>
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
        options={({route}) => ({
          title: route.params.albumData.title,
          headerRight(props) {
            return <Text>we</Text>;
          },
        })}
      />
    </AlbumStack.Navigator>
  );
};

const MainNavigator = () => {
  return <AlbumFlowNavigator />;
};

export default MainNavigator;
