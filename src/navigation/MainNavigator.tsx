import React, {FC} from 'react';
import {StyleSheet, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {AlbumRoutes} from './routes';
import {HomeScreens} from '../screens';
import RightNavHeader from '../components/molecules/RightNavHeader';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {
  resetPhotosByAlbum,
  setActiveDisplayAllPhotos,
} from '../store/album/albumSlice';

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
  const dispatch = useAppDispatch();
  const statusToggle = useAppSelector(state => state.displayAllPhotos);
  const toggleStarHandler = () => {
    if (!statusToggle) dispatch(setActiveDisplayAllPhotos());
    else dispatch(resetPhotosByAlbum());
  };
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
            return <RightNavHeader toggleStar={toggleStarHandler} />;
          },
          headerRightContainerStyle: styles.headerRight,
        })}
      />
    </AlbumStack.Navigator>
  );
};

const MainNavigator = () => {
  return <AlbumFlowNavigator />;
};

const styles = StyleSheet.create({
  headerRight: {
    alignItems: 'flex-end',
    paddingRight: 20,
  },
});

export default MainNavigator;
