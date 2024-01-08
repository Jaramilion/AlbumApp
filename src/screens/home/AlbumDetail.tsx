import React, {JSX, useCallback} from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {AlbumRoutes} from '../../navigation/routes';
import {RootStackParamList} from '../../navigation/MainNavigator';
import STATUSES from '../../types/statuses';
import ApiError from '../../components/molecules/ApiError';
import Loading from '../../components/atoms/Loading';
import {PhotosByAlbumRecord} from '../../types/apiTypes';
import AlbumPhotoItem from '../../components/molecules/AlbumPhotoItem';
import {useAlbumPhotos} from '../../hooks/useAlbumPhotos';

type Props = StackScreenProps<RootStackParamList, AlbumRoutes.AlbumDetail>;

function AlbumDetail({route}: Props): JSX.Element {
  const {albumData} = route.params;
  const {status, data, fetchPhotos} = useAlbumPhotos(albumData.albumId);
  const {width} = useWindowDimensions();
  const imgSize = width / 3;
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
          <FlatList
            data={data}
            getItemLayout={(_data, index) => ({
              length: imgSize,
              offset: imgSize * index,
              index,
            })}
            numColumns={3}
            renderItem={renderAlbumPhoto}
          />
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
