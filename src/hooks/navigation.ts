import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '../navigation/MainNavigator';

type NavigationProp = StackNavigationProp<
    RootStackParamList,
  keyof RootStackParamList
>;

function useTypeSafeNavigation() {
  const navigation = useNavigation<NavigationProp>();

  return navigation;
}

export default useTypeSafeNavigation;