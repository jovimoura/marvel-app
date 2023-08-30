import { StyleSheet } from "react-native";
import { THEME } from "../../themes";

export const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    padding: 12,
    width: window.innerWidth,
    maxWidth: 362,
    maxHeight: 144,
    marginHorizontal: 12,
    flexDirection: "row",
    gap: 12,
    borderRadius: 14,
    alignItems: "flex-start",
    backgroundColor: THEME.COLORS.DARK,
    position: "relative",
  },
  cover: {
    width: 96,
    height: 120,
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
    width: "100%",
    maxWidth: 200,
    color: THEME.COLORS.WHITE,
    fontSize: THEME.FONT_SIZE.CARD_TITLE,
    fontFamily: THEME.FONT_FAMILY.MEDIUM,
  },
  description: {
    width: "100%",
    maxWidth: 200,
    color: THEME.COLORS.WHITE,
    fontSize: THEME.FONT_SIZE.DESCRIPTION,
    fontFamily: THEME.FONT_FAMILY.LIGHT,
  },
  infoBox: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  caret: { position: "absolute", top: "50%", right: 2 },
});
