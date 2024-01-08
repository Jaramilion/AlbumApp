import React, {JSX, useCallback, useEffect} from 'react';
import {FlatList, ListRenderItem, StyleSheet, Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import FastImage from 'react-native-fast-image';
import {AlbumRoutes} from '../../navigation/routes';
import {RootStackParamList} from '../../navigation/MainNavigator';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {
  getAllPhotos,
  getPhotosByAlbum,
  resetPhotosByAlbum,
} from '../../store/album/albumSlice';
import STATUSES from '../../types/statuses';
import ApiError from '../../components/molecules/ApiError';
import Loading from '../../components/atoms/Loading';
import {PhotosByAlbumRecord} from '../../types/apiTypes';
import AlbumPhotoItem from '../../components/molecules/AlbumPhotoItem';

type Props = StackScreenProps<RootStackParamList, AlbumRoutes.AlbumDetail>;

function AlbumDetail({route}: Props): JSX.Element {
  const {albumData} = route.params;
  const dispatch = useAppDispatch();
  const data = useAppSelector(state => state.photosByAlbum);
  const status = useAppSelector(state => state.photosByAlbumStatus);
  const toggleStatus = useAppSelector(state => state.displayAllPhotos);
  useEffect(() => {
    if (toggleStatus) dispatch(getAllPhotos());
    else {
      setTimeout(() => {
        fetchPhotos();
      }, 50);
    }
  }, [toggleStatus]);

  useEffect(() => {
    return () => {
      cleanImgsCache();
    };
  }, []);

  function fetchPhotos() {
    dispatch(getPhotosByAlbum(albumData.albumId));
  }

  async function cleanImgsCache() {
    await FastImage.clearDiskCache();
    await FastImage.clearMemoryCache();
    dispatch(resetPhotosByAlbum());
  }

  const renderAlbumPhoto: ListRenderItem<PhotosByAlbumRecord> = useCallback(
    ({item}) => {
      return <AlbumPhotoItem thumbnailUrl={item.thumbnailUrl} />;
    },
    [],
  );

  const renderListHandler = () => {
    switch (status) {
      case STATUSES.DEFAULT:
      case STATUSES.LOADING:
        return <Loading />;
      case STATUSES.FAILURE:
        return <ApiError retryHandler={fetchPhotos} />;
      case STATUSES.SUCCESS:
        return (
          <FlatList data={data} numColumns={3} renderItem={renderAlbumPhoto} />
        );
    }
  };
  return <View style={styles.mainContainer}>{renderListHandler()}</View>;
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

export default AlbumDetail;
