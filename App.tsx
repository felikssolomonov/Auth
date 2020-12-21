import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert,
  Button,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';
import * as Keychain from 'react-native-keychain';
import PincodeInput from 'react-native-pincode-input';
import InputStars from './Components/InputStars';
import KeyboardButton from './Components/KeyboardButton';
import VirtualKeyboard, {Status} from './Components/VirtualKeyboard';

const App = () => {
  const [pinCodeStatus, setPinCodeStatus] = useState<Status>(Status.choose);
  const [enterProcess, setEnterProcess] = useState<boolean>(false);
  const [pin, setPin] = useState('');
  const endEnterProcess = (value: string) => {
    setEnterProcess(false);
    if (Status.choose) {
      setPin(value);
      setKeyChain(value);
    }
  };

  const createPinCode = () => {
    setPinCodeStatus(Status.choose);
    setEnterProcess(true);
    setPin('');
  };

  const enterPinCode = () => {
    setPinCodeStatus(Status.enter);
    setEnterProcess(true);
  };

  const [chain, setChain] = useState('');

  const clearPinCode = async () => {
    setPin('');
    await Keychain.resetGenericPassword();
  };

  const setKeyChain = async (value: string) => {
    await Keychain.setGenericPassword('username', value);
  };

  const getKeyChain = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        setChain(
          'username ' +
            credentials.username +
            ' password ' +
            credentials.password,
        );
      } else {
        setChain('No credentials stored');
      }
    } catch (error) {
      setChain("Keychain couldn't be accessed!");
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: 'pink',
          }}>
          <Text style={styles.title}>{pin}</Text>
          <Text style={styles.title}>{chain}</Text>
          {enterProcess ? (
            <VirtualKeyboard
              endEnterProcess={endEnterProcess}
              pinCodeStatus={pinCodeStatus}
              pin={pin}
            />
          ) : (
            <View>
              <View style={styles.button}>
                <Text style={styles.title}>
                  Click on this button to set your PIN.
                </Text>
                <Button onPress={createPinCode} title="Set Pin" />
              </View>
              <View style={styles.seperator} />
              <View style={styles.button}>
                <Text style={styles.title}>
                  Click on this button to enter your PIN.
                </Text>
                <Button onPress={enterPinCode} title="Enter Pin" />
              </View>
              <View style={styles.seperator} />
              <View style={styles.button}>
                <Text style={styles.title}>Clear</Text>
                <Button onPress={clearPinCode} title="Clear Pin" />
              </View>
              <View style={styles.seperator} />
              <View style={styles.button}>
                <Text style={styles.title}>getKeyChain</Text>
                <Button onPress={getKeyChain} title="getKeyChain" />
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    marginTop: 20,
  },
  button: {
    marginBottom: 10,
    padding: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  seperator: {
    margin: 10,
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default App;
