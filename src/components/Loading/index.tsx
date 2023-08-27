import { View, ActivityIndicator } from "react-native";
import { THEME } from "../../themes";

import { styles } from "./styles";

export function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={20} color={THEME.COLORS.RED} />
    </View>
  );
}
