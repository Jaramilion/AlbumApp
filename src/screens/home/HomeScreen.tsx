import {StackScreenProps} from '@react-navigation/stack';
import React, {JSX, useState} from 'react';
import {SectionList, StyleSheet, View} from 'react-native';
import {AlbumRoutes} from '../../navigation/routes';
import {RootStackParamList} from '../../navigation/MainNavigator';
import AlbumListHeader from '../../components/molecules/AlbumListHeader';
import AlbumListItem from '../../components/molecules/AlbumListItem';
import colors from '../../themes/colors';

type Props = StackScreenProps<RootStackParamList, AlbumRoutes.HomeScreen>;

function HomeScreen({navigation}: Props): JSX.Element {
  const [data, setData] = useState([]);

  const deleteAlbum = (userId: number, albumId: number) => {
    /* const newData = [...data];
    const userIndex = newData.findIndex(u => u.id === userId);
    const indexAlbum = newData[userIndex].data.findIndex(i => i.id === albumId);
    newData[userIndex].data.splice(indexAlbum, 1);
    setData(newData); */
  };
  return (
    <View style={styles.mainView}>
      <SectionList
        sections={data}
        keyExtractor={({title, id}) => title + id}
        renderItem={({item}) => (
          <AlbumListItem
            onPressDelete={() => deleteAlbum(item.userId, item.id)}
            albumData={{
              albumId: item.id,
              title: item.title,
              userId: item.userId,
            }}
          />
        )}
        renderSectionHeader={({section: {title}}) => (
          <AlbumListHeader title={title} />
        )}
        stickySectionHeadersEnabled={true}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        initialNumToRender={20}
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
