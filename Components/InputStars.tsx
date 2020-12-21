import React from 'react';
import PincodeInput from 'react-native-pincode-input';

interface Props {
  value: string;
}

const InputStars = ({value}: Props) => {
  return (
    <PincodeInput
      length={4}
      containerStyle={{
        display: 'flex',
        width: '60%',
        height: 100,
        alignSelf: 'center',
        justifyContent: 'center',
      }}
      circleContainerStyle={{
        paddingHorizontal: 32,
      }}
      circleEmptyStyle={{
        borderWidth: 1,
        borderColor: '#424242',
      }}
      circleFilledStyle={{
        backgroundColor: '#424242',
      }}
      pin={value}
      onTextChange={() => {}}
      autoFocus={false}
      keyboardType={null}
      editable={false}
    />
  );
};

export default InputStars;
