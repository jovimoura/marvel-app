import { StyleSheet } from "react-native";
import { THEME } from "../../themes";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    paddingTop: "auto",
  },
  form: {
    paddingBottom: 40,
    paddingHorizontal: 30,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  header: {
    width: "100%",
    alignItems: "center",
    marginBottom: 18,
  },
  title: {
    fontSize: THEME.FONT_SIZE.PROFILE_TITLE,
    color: THEME.COLORS.WHITE,
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
    textAlign: "center",
  },
  subtitle: {
    fontSize: THEME.FONT_SIZE.XS,
    color: THEME.COLORS.GRAY_200,
    fontFamily: THEME.FONT_FAMILY.MEDIUM,
    textAlign: "center",
  },
  boxInput: { width: "100%", marginBottom: 12 },
  label: {
    fontSize: THEME.FONT_SIZE.PROFILE_SUBTITLE,
    color: THEME.COLORS.GRAY_200,
    fontFamily: THEME.FONT_FAMILY.MEDIUM,
  },
  text: {
    fontSize: THEME.FONT_SIZE.XS,
    color: THEME.COLORS.GRAY_200,
    fontFamily: THEME.FONT_FAMILY.MEDIUM,
  },
  register: {
    fontSize: 16,
    color: THEME.COLORS.WHITE,
    fontFamily: THEME.FONT_FAMILY.MEDIUM,
    textDecorationLine: "underline",
  },
  socialLabel: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginBottom: 18,
    marginTop: 4,
  },
  socialBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  socialButton: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    width: 58,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: THEME.COLORS.WHITE,
  },
});
