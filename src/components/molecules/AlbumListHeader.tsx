import React, {FC, JSX, memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from '../../themes/colors';

interface Props {
  title: string;
  id?: string;
}

const AlbumListHeader: FC<Props> = memo(
  ({title}: Props) => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.title === nextProps.title;
  },
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Lato-Regular',
  },
});
export default AlbumListHeader;
