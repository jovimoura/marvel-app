import { StyleSheet } from "react-native";
import { THEME } from "../../themes";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    position: "relative",
    width: "100%",
    marginBottom: 40,
  },
  configButton: {
    position: "absolute",
    left: 28,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  searchOpenContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    paddingBottom: 200,
  },
  searchContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 120,
    width: "100%",
  },
  filterBox: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    marginBottom: 24,
    gap: 5,
    paddingHorizontal: 12,
  },
  filterButton: {
    height: 32,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 26,
    borderWidth: 1,
    borderColor: THEME.COLORS.DARK,
  },
  filterButtonLabel: {
    fontFamily: THEME.FONT_FAMILY.MEDIUM,
    fontSize: THEME.FONT_SIZE.XS,
  },
  homeContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 80,
  },
  infoBox: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    paddingHorizontal: 24,
    gap: 8,
    marginBottom: 28,
  },
  title: {
    fontSize: THEME.FONT_SIZE.HOME_TITLE,
    color: THEME.COLORS.DARK,
    fontFamily: THEME.FONT_FAMILY.MEDIUM,
    lineHeight: 38,
  },
  subtitle: {
    fontSize: THEME.FONT_SIZE.HOME_SUBTITLE,
    color: THEME.COLORS.GRAY,
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
  },
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
  text: {
    fontSize: 20,
  },
  contentList: {
    paddingRight: 64,
  },
  contentListHorizontal: {
    maxWidth: "100%",
    width: "100%",
  },
});
