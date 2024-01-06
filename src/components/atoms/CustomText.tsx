import React, {JSX, ReactNode} from 'react';
import {Text, StyleProp, TextStyle, StyleSheet} from 'react-native';
import colors from '../../themes/colors';

interface Props {
  style?: StyleProp<TextStyle>;
  children: ReactNode;
  numberOfLines?: number;
  size?: 's' | 'm' | 'l';
}

function CustomText({
  numberOfLines,
  style,
  children,
  size = 'm',
}: Props): JSX.Element {
  const objSizes = {
    s: 12,
    m: 18,
    l: 22,
  };

  return (
    <Text
      numberOfLines={numberOfLines}
      style={[styles.textStyle, style, {fontSize: objSizes[size]}]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    color: colors.pureBlack,
    fontSize: 15,
  },
});

export default CustomText;
