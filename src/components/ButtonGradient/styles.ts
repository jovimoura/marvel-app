import { StyleSheet } from "react-native";
import { THEME } from "../../themes";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  label: { color: THEME.COLORS.WHITE, fontSize: 20, fontWeight: "500" },
});
