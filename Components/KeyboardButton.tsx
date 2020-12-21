import React from "react";
import { Alert, Text, TouchableOpacity } from "react-native";

export enum ButtonType {
  number = "number",
  touchID = "touchID",
  remove = "remove",
}

interface Props {
  type: ButtonType;
  value: string;
  pinCodeChange: (val: string) => void;
  pinCode: string;
}

const KeyboardButton = ({ type, value, pinCodeChange, pinCode }: Props) => {
  const onChange = () => {
    const text = pinCode + value;
    pinCodeChange(text);
  };
  const onBackspace = () => {
    const text = pinCode;
    pinCodeChange(text.slice(0, -1));
  };
  const onBiometric = () => {
    Alert.alert("onBiometric");
  };
  const onPress = () => {
    switch (type) {
      case ButtonType.number:
        onChange();
        break;
      case ButtonType.remove:
        onBackspace();
        break;
      case ButtonType.touchID:
        onBiometric();
        break;
      default:
        break;
    }
  };
  return (
    <TouchableOpacity
      style={{
        justifyContent: "center",
        backgroundColor: "black",
        margin: 5,
        height: 80,
        width: 80,
        borderRadius: 50,
      }}
      accessibilityLabel={value.toString()}
      onPress={onPress}
    >
      <Text
        style={[
          {
            fontSize: 25,
            textAlign: "center",
          },
          { color: "red" },
        ]}
      >
        {value}
      </Text>
    </TouchableOpacity>
  );
};

export default KeyboardButton;
