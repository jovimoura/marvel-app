import React from "react";
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { THEME } from "../../themes";
import { BackgroundImage } from "../BackgroundImage";
import { EyeIcon, KeyIcon, UserIcon } from "../icons";
import { styles } from "./styles";

interface Props extends TextInputProps {
  errorMessage?: string;
  showMessageError?: boolean;
  className?: string;
  showCheckedIcon?: boolean;
  icon?: "email" | "password";
  type?: "password" | string;
  eyePress?: () => void;
}

export const Input = ({
  className,
  icon,
  errorMessage,
  showMessageError,
  showCheckedIcon,
  type,
  eyePress,
  ...rest
}: Props) => {
  const changeIcon = () => {
    switch (icon) {
      case "email":
        return <UserIcon style={{ position: "absolute", left: 20 }} />;
      case "password":
        return <KeyIcon style={{ position: "absolute", left: 20 }} />;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputBox}>
        {icon && changeIcon()}
        <TextInput
          style={styles.input}
          placeholderTextColor={THEME.COLORS.GRAY_200}
          {...rest}
        />
        {type === "password" && (
          <TouchableOpacity style={{ position: "absolute", right: 20 }}>
            <EyeIcon onPress={eyePress} open={rest.secureTextEntry} />
          </TouchableOpacity>
        )}
      </View>
      {showMessageError && (
        <Text style={styles.messageError}>{errorMessage}</Text>
      )}
    </View>
  );
};
