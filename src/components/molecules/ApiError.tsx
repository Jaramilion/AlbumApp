import React, {JSX} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import CustomText from '../atoms/CustomText';
import colors from '../../themes/colors';
interface Props {
  retryHandler: () => void;
}
function ApiError({retryHandler}: Props): JSX.Element {
  return (
    <View style={styles.loaderContainer}>
      <CustomText size="l">
        An error ocurred while retrieving data from the server, please try again
        later.
      </CustomText>
      <TouchableOpacity
        onPress={retryHandler}
        activeOpacity={0.4}
        style={styles.retryBtn}>
        <CustomText>Retry</CustomText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  retryBtn: {
    padding: 12,
    marginTop: 15,
    backgroundColor: colors.gray,
    borderRadius: 5,
    elevation: 1,
    paddingHorizontal: 25,
  },
});

export default ApiError;
