import {StackScreenProps} from '@react-navigation/stack';
import React, {JSX, useCallback} from 'react';
import {
  SectionList,
  SectionListData,
  SectionListRenderItem,
  StyleSheet,
  View,
} from 'react-native';
import {AlbumRoutes} from '../../navigation/routes';
import {RootStackParamList} from '../../navigation/MainNavigator';
import AlbumListHeader from '../../components/molecules/AlbumListHeader';
import AlbumListItem from '../../components/molecules/AlbumListItem';
import colors from '../../themes/colors';
import {AlbumRecord} from '../../types/albumTypes';
import {
  LIST_ITEM_ALBUM_HEIGHT,
  LIST_ITEM_ALBUM_SEPARATOR_HEIGHT,
} from '../../themes/sizes';
import STATUSES from '../../types/statuses';
import Loading from '../../components/atoms/Loading';
import ApiError from '../../components/molecules/ApiError';
import {useAlbumData} from '../../hooks/useAlbumData';

type Props = StackScreenProps<RootStackParamList, AlbumRoutes.HomeScreen>;

function HomeScreen({navigation}: Props): JSX.Element {
  const {data, status, fetchAlbums} = useAlbumData();

  const renderAlbumListItem: SectionListRenderItem<AlbumRecord> = useCallback(
    ({item}) => (
      <AlbumListItem
        albumData={{
          albumId: item.id,
          title: item.title,
          userId: item.userId,
        }}
      />
    ),
    [],
  );
  const renderSectionHeaderItem = useCallback(
    ({section: {name}}: {section: SectionListData<AlbumRecord>}) => (
      <AlbumListHeader title={name} />
    ),
    [],
  );

  const keyExtractor = ({title, id}: {title: string; id: number}) => title + id;
  const renderSeparator = useCallback(
    () => <View style={styles.separator} />,
    [],
  );

  const renderListHandler = () => {
    switch (status) {
      case STATUSES.DEFAULT:
      case STATUSES.LOADING:
        return <Loading />;
      case STATUSES.SUCCESS:
        return (
          <SectionList
            sections={data}
            keyExtractor={keyExtractor}
            renderItem={renderAlbumListItem}
            renderSectionHeader={renderSectionHeaderItem}
            stickySectionHeadersEnabled={true}
            initialNumToRender={20}
            ItemSeparatorComponent={renderSeparator}
            getItemLayout={(_data, index) => ({
              length: LIST_ITEM_ALBUM_HEIGHT + LIST_ITEM_ALBUM_SEPARATOR_HEIGHT,
              offset:
                (LIST_ITEM_ALBUM_HEIGHT + LIST_ITEM_ALBUM_SEPARATOR_HEIGHT) *
                index,
              index,
            })}
          />
        );
      case STATUSES.FAILURE:
        return <ApiError retryHandler={fetchAlbums} />;
    }
  };

  return <View style={styles.mainView}>{renderListHandler()}</View>;
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.pureWhite,
  },
  separator: {
    height: LIST_ITEM_ALBUM_SEPARATOR_HEIGHT,
    width: '100%',
    backgroundColor: colors.gray,
    marginHorizontal: 10,
  },
});

export default HomeScreen;
