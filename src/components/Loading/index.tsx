import { View, ActivityIndicator } from "react-native";
import { THEME } from "../../themes";

import { styles } from "./styles";

export function Loading({ color = THEME.COLORS.RED }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={20} color={color || THEME.COLORS.RED} />
    </View>
  );
}
