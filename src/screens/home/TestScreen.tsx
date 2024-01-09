import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  NativeModules,
} from 'react-native';
import colors from '../../themes/colors';

function TestScreen(): JSX.Element {
  const {CalendarModule} = NativeModules;

  const [eventName, setEventName] = useState('');
  const [location, setLocation] = useState('');
  const onPress = () => {
    CalendarModule.createCalendarEvent(eventName, location);
  };
  return (
    <View>
      <TextInput
        value={eventName}
        onChange={e => setEventName(e.nativeEvent.text)}
        style={styles.inputs}
        placeholder="Event"
      />
      <TextInput
        value={location}
        onChange={e => setLocation(e.nativeEvent.text)}
        style={styles.inputs}
        placeholder="Location"
      />
      <TouchableOpacity style={styles.send} onPress={onPress}>
        <Text>Send</Text>
      </TouchableOpacity>
    </View>
  );
}

export default TestScreen;
const styles = StyleSheet.create({
  inputs: {
    padding: 15,
    backgroundColor: colors.pureWhite,
    borderWidth: 1,
    margin: 5,
    borderRadius: 12,
    color: colors.pureBlack,
  },
  send: {
    padding: 10,
    margin: 5,
    backgroundColor: colors.darkGray,
  },
});
