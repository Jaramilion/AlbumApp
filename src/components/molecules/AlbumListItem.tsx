import React, {FC, memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import useTypeSafeNavigation from '../../hooks/navigation';
import {AlbumRoutes} from '../../navigation/routes';
import Icon from 'react-native-vector-icons/FontAwesome';
import {deleteAlbumFromUser} from '../../store/album/albumSlice';
import {useAppDispatch} from '../../hooks/redux';
import {LIST_ITEM_ALBUM_HEIGHT} from '../../themes/sizes';
import colors from '../../themes/colors';

interface Props {
  albumData: albumItem;
}

export type albumItem = {
  userId: number;
  albumId: number;
  title: string;
};

const AlbumListItem: FC<Props> = memo(
  ({albumData}: Props) => {
    const navigation = useTypeSafeNavigation();
    const dispatch = useAppDispatch();

    const onDeleteHandler = () => {
      dispatch(
        deleteAlbumFromUser({
          userId: albumData.userId,
          albumId: albumData.albumId,
        }),
      );
    };

    const onAlbumPressHandler = () =>
      navigation.navigate(AlbumRoutes.AlbumDetail, {albumData});

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.titleContainer}
          activeOpacity={0.4}
          onPress={onAlbumPressHandler}>
          <Text style={styles.title}>{albumData.title}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onDeleteHandler}
          activeOpacity={0.4}
          style={styles.iconContainer}>
          <Icon name="minus-circle" size={25} color={colors.deleteRed} />
        </TouchableOpacity>
      </View>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.albumData.title === nextProps.albumData.title;
  },
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    flex: 1,
    height: LIST_ITEM_ALBUM_HEIGHT,
  },
  titleContainer: {
    flex: 0.9,
    justifyContent: 'center',
  },
  iconContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginRight: '7%',
    fontSize: 18,
    fontFamily: 'Lato-Regular',
  },
});

export default AlbumListItem;
