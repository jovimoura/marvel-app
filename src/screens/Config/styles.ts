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
  boxInput: { width: "100%", marginBottom: 12 },
  label: {
    fontSize: THEME.FONT_SIZE.PROFILE_SUBTITLE,
    color: THEME.COLORS.GRAY_200,
    fontFamily: THEME.FONT_FAMILY.MEDIUM,
  },
  button: {
    width: "100%",
    maxWidth: 300,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderColor: THEME.COLORS.RED,
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 12,
    alignSelf: "center",
  },
  buttonLabel: { color: THEME.COLORS.RED, fontSize: 20, fontWeight: "500" },
});
