import { LinearGradient } from "expo-linear-gradient";
import {
  ImageBackground,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
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
}

interface Props extends TouchableOpacityProps {
  data: InfoCardProps;
}

export function InfoCard({ data, ...rest }: Props) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <ImageBackground
        style={styles.cover}
        source={{ uri: `${data.thumbnail.path}.${data.thumbnail.extension}` }}
      >
        <LinearGradient
          colors={THEME.COLORS.GRADIENTS.BLACK}
          style={styles.footer}
        >
          <Text style={styles.name}>{data.title}</Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}
