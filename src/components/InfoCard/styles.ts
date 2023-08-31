import { StyleSheet } from "react-native";
import { THEME } from "../../themes";

export const styles = StyleSheet.create({
  container: {
    marginRight: 24,
  },
  cover: {
    width: 140,
    height: 230,
    justifyContent: "flex-end",
    borderRadius: 16,
    overflow: "hidden",
  },
  footer: {
    width: "100%",
    height: 102,
    padding: 16,
    justifyContent: "flex-end",
  },
  name: {
    color: THEME.COLORS.WHITE,
    fontSize: THEME.FONT_SIZE.CARD_TITLE,
    fontFamily: THEME.FONT_FAMILY.MEDIUM,
  },
});
