import React, {useState} from 'react';
import {Alert, Text, View} from 'react-native';
import InputStars from './InputStars';
import KeyboardButton, {ButtonType} from './KeyboardButton';

export enum Status {
  choose = 'choose',
  enter = 'enter',
}

interface Props {
  endEnterProcess: (value: string) => void;
  pinCodeStatus: Status;
  pin: string;
}

const VirtualKeyboard = ({endEnterProcess, pinCodeStatus, pin}: Props) => {
  const buttons = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['ID', '0', '⇦'],
  ];
  const [pinCode, setPinCode] = useState('');
  const [pinCodeConfirm, setPinCodeConfirm] = useState('');
  const [confirm, setConfirm] = useState(false);
  const pinCodeChange = (value: string) => {
    if (confirm) {
      setPinCodeConfirm(value);
    } else {
      setPinCode(value);
    }
    const end = value.length === 4;
    if (end) {
      if (confirm) {
        setTimeout(() => {
          const match = pinCode.match(pinCodeConfirm);
          if (match) {
            endEnterProcess(value);
          } else {
            setConfirm(false);
            setPinCode('');
            setPinCodeConfirm('');
          }
        }, 400);
      } else if (pinCodeStatus === Status.enter) {
        setTimeout(() => {
          const match = pin.match(pinCode);
          if (match) {
            endEnterProcess(value);
          } else {
            setPinCode('');
          }
        }, 400);
      } else {
        setTimeout(() => {
          setConfirm(true);
        }, 400);
      }
    }
  };
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        marginBottom: 100,
      }}>
      <Text
        style={{
          fontSize: 20,
          textAlign: 'center',
          margin: 10,
          marginTop: 20,
        }}>
        {pinCode}
      </Text>
      <Text
        style={{
          fontSize: 20,
          textAlign: 'center',
          margin: 10,
          marginTop: 20,
        }}>
        {pinCodeConfirm}
      </Text>
      <InputStars value={confirm ? pinCodeConfirm : pinCode} />
      {buttons.map((item, i) => {
        return (
          <View
            key={item + '_' + i}
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
            }}>
            {item.map((subItem, sI) => {
              const btnType =
                subItem === 'ID'
                  ? ButtonType.touchID
                  : subItem === '⇦'
                  ? ButtonType.remove
                  : ButtonType.number;
              return (
                <KeyboardButton
                  key={item + '_' + i + '_' + sI}
                  type={btnType}
                  value={subItem}
                  pinCode={confirm ? pinCodeConfirm : pinCode}
                  pinCodeChange={pinCodeChange}
                />
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

export default VirtualKeyboard;
