import React, {JSX} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useAppSelector} from '../../hooks/redux';

interface Props {
  toggleStar: () => void;
}
function RightNavHeader({toggleStar}: Props): JSX.Element {
  const toggleStatus = useAppSelector(state => state.displayAllPhotos);
  return (
    <TouchableOpacity activeOpacity={0.4} onPress={toggleStar}>
      <Icon size={25} name={toggleStatus ? 'star' : 'star-o'} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
});

export default RightNavHeader;
