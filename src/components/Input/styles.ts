import { StyleSheet } from "react-native";
import { THEME } from "../../themes";

export const styles = StyleSheet.create({
  container: { width: "100%", maxWidth: 300, flexDirection: "column" },
  inputBox: {
    width: "100%",
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    paddingVertical: 20,
    paddingLeft: 58,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    fontSize: THEME.FONT_SIZE.DESCRIPTION,
    fontFamily: THEME.FONT_FAMILY.MEDIUM,
    color: THEME.COLORS.GRAY_200,
    borderRadius: 8,
    maxWidth: "100%",
    width: "100%",
  },
  messageError: { color: THEME.COLORS.RED },
});
