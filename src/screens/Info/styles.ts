import { StyleSheet } from "react-native";
import { THEME } from "../../themes";

export const styles = StyleSheet.create({
  container: {},
  listBox: {
    paddingLeft: 24,
    marginBottom: 40,
    maxHeight: 280,
  },
  listBoxTitle: {
    color: THEME.COLORS.RED,
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: THEME.FONT_SIZE.SECTION_TITLE,
    marginBottom: 12,
  },
  contentList: {
    paddingRight: 64,
  },
});
