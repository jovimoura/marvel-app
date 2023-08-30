import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  ImageBackground,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { THEME } from "../../themes";

import { styles } from "./styles";

export interface InfoCardProps {
  id: string;
  title: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  description?: string;
}

interface Props extends TouchableOpacityProps {
  data: InfoCardProps;
}

export function InfoCardHorizontal({ data, ...rest }: Props) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <ImageBackground
        style={styles.cover}
        source={{ uri: `${data.thumbnail.path}.${data.thumbnail.extension}` }}
      />
      <View style={styles.infoBox}>
        <Text style={styles.name}>{data.title}</Text>
        <Text numberOfLines={5} style={styles.description}>
          {data.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
