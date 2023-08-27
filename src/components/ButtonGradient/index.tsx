import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { THEME } from "../../themes";
import { Loading } from "../Loading";

import { styles } from "./styles";

interface Props extends TouchableOpacityProps {
  label: string;
  isLoading?: boolean;
  colorLoading?: string;
}

export function ButtonGradient({
  label,
  colorLoading,
  isLoading,
  ...rest
}: Props) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <LinearGradient
        colors={["#ED1D2F", "#BF2EB9"]}
        start={[0, 1]}
        end={[1, 0]}
        style={{
          width: "100%",
          paddingVertical: 12,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 16,
          maxWidth: 300,
          height: "100%",
        }}
      >
        {isLoading ? (
          <Loading color={colorLoading} />
        ) : (
          <Text style={styles.label}>{label}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}
