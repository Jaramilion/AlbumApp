import React, {FC, memo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import useTypeSafeNavigation from '../../hooks/navigation';
import {AlbumRoutes} from '../../navigation/routes';
import CustomText from '../atoms/CustomText';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Props {
  albumData: {
    userId: number;
    albumId: number;
    title: string;
  };
  onPressDelete: () => void;
}

const AlbumListItem: FC<Props> = memo(
  ({albumData, onPressDelete}: Props) => {
    const navigation = useTypeSafeNavigation();

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.titleContainer}
          activeOpacity={0.4}
          onPress={() =>
            navigation.navigate(AlbumRoutes.AlbumDetail, {albumData})
          }>
          <CustomText style={styles.title}>{albumData.title}</CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPressDelete}
          activeOpacity={0.4}
          style={styles.iconContainer}>
          <Icon name="minus-circle" size={25} />
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
    paddingVertical: 12,
    paddingHorizontal: 10,
    flexDirection: 'row',
    flex: 1,
  },
  titleContainer: {
    flex: 0.9,
  },
  iconContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginRight: '7%',
  },
});

export default AlbumListItem;
