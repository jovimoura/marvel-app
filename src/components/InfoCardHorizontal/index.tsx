import { CaretRight } from "phosphor-react-native";
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
  description?: string | null;
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
        <Text numberOfLines={1} style={styles.name}>
          {data.title}
        </Text>
        {data.description && (
          <Text numberOfLines={5} style={styles.description}>
            {data.description}
          </Text>
        )}
      </View>
      <View style={styles.caret}>
        <CaretRight size={24} color={THEME.COLORS.WHITE} />
      </View>
    </TouchableOpacity>
  );
}
