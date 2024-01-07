import React, {useEffect} from 'react';

import MainNavigator from './navigation/MainNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
/* import NativeDevSettings from 'react-native/Libraries/NativeModules/specs/NativeDevSettings'; */
import {store} from './store';
import {StatusBar} from 'react-native';
import colors from './themes/colors';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function App(): React.JSX.Element {
  /* const connectToRemoteDebugger = () => {
    NativeDevSettings.setIsDebuggingRemotely(true);
  }; */

  /* useEffect(() => {
    connectToRemoteDebugger();
  }, []); */
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}
export default App;
