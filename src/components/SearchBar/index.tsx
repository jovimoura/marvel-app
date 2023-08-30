import { X } from "phosphor-react-native";
import React from "react";
import {
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { THEME } from "../../themes";
import { GlassIcon } from "../icons";

interface Props extends TextInputProps {
  open: boolean;
  onPress: Function;
}

export function SearchBar({ open, onPress, ...rest }: Props) {
  const animation = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width:
        animation.value == 1
          ? withTiming(300, { duration: 300 })
          : withTiming(0, { duration: 300 }),
      borderColor:
        animation.value == 1
          ? withTiming(THEME.COLORS.DARK, { duration: 300 })
          : withTiming(THEME.COLORS.WHITE, { duration: 300 }),
    };
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animated.View
        style={[
          {
            width: 300,
            height: 55,
            backgroundColor: THEME.COLORS.WHITE,
            borderRadius: 14,
            borderWidth: 0.5,
            paddingLeft: 20,
            gap: 6,
            flexDirection: "row",
            alignItems: "center",
          },
          animatedStyle,
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            onPress();
            if (animation.value == 1) {
              animation.value = 0;
            } else {
              animation.value = 1;
            }
          }}
        >
          {open ? <X size={24} /> : <GlassIcon />}
        </TouchableOpacity>
        <TextInput
          placeholderTextColor={THEME.COLORS.DARK}
          style={{
            width: "85%",
            fontFamily: THEME.FONT_FAMILY.MEDIUM,
            color: THEME.COLORS.DARK,
            fontSize: THEME.FONT_SIZE.DESCRIPTION,
          }}
          placeholder='Faça sua busca'
          {...rest}
        />
      </Animated.View>
    </View>
  );
}
