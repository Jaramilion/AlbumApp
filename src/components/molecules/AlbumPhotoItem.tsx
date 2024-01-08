import React, {FC, memo} from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';
import FastImage from 'react-native-fast-image';

interface Props {
  thumbnailUrl: string;
}

const AlbumPhotoItem: FC<Props> = memo(
  ({thumbnailUrl}: Props) => {
    const {width} = useWindowDimensions();
    const imgSize = width / 3;
    return (
      <FastImage
        style={{width: imgSize, height: imgSize}}
        source={{
          uri: thumbnailUrl,
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
    );
  },
  (prevProps, nextProps) => {
    return prevProps.thumbnailUrl === nextProps.thumbnailUrl;
  },
);

const styles = StyleSheet.create({
  container: {},
});

export default AlbumPhotoItem;
