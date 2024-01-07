import {StackScreenProps} from '@react-navigation/stack';
import React, {JSX, useEffect} from 'react';
import {
  ActivityIndicator,
  SectionList,
  SectionListData,
  SectionListRenderItem,
  StyleSheet,
  View,
} from 'react-native';
import {AlbumRoutes} from '../../navigation/routes';
import {RootStackParamList} from '../../navigation/MainNavigator';
import AlbumListHeader from '../../components/molecules/AlbumListHeader';
import AlbumListItem, {
  albumItem,
} from '../../components/molecules/AlbumListItem';
import colors from '../../themes/colors';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {getAlbumsData} from '../../store/album/albumSlice';
import {AlbumRecord} from '../../types/albumTypes';

type Props = StackScreenProps<RootStackParamList, AlbumRoutes.HomeScreen>;

function HomeScreen({navigation}: Props): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAlbumsData());
  }, []);

  const data = useAppSelector(state => state.albumData);
  const status = useAppSelector(state => state.albumDataStatus);

  const onAlbumPressHandler = (item: albumItem) =>
    navigation.navigate(AlbumRoutes.AlbumDetail, {albumData: item});

  const renderAlbumListItem: SectionListRenderItem<AlbumRecord> = ({item}) => (
    <AlbumListItem
      albumData={{
        albumId: item.id,
        title: item.title,
        userId: item.userId,
      }}
    />
  );
  const keyExtractor = ({title, id}: {title: string; id: number}) => title + id;
  const renderSeparator = () => <View style={styles.separator} />;
  const renderLoading = () => <ActivityIndicator size={'large'} />;

  return (
    <View style={styles.mainView}>
      <SectionList
        ListEmptyComponent={renderLoading}
        sections={data}
        keyExtractor={keyExtractor}
        renderItem={renderAlbumListItem}
        renderSectionHeader={({section: {name}}) => (
          <AlbumListHeader title={name} />
        )}
        stickySectionHeadersEnabled={true}
        initialNumToRender={20}
        ItemSeparatorComponent={renderSeparator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.pureWhite,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: colors.gray,
    marginHorizontal: 10,
  },
});

export default HomeScreen;
