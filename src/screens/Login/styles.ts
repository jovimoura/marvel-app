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
    paddingTop: 32,
    paddingHorizontal: 60,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: 60,
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
    fontFamily: "Poppins_600SemiBold",
  },
  subtitle: {
    fontSize: THEME.FONT_SIZE.PROFILE_SUBTITLE,
    color: THEME.COLORS.GRAY_200,
    fontFamily: "Poppins_500Medium",
  },
  boxInput: { width: "100%", marginBottom: 12 },
  label: {
    fontSize: THEME.FONT_SIZE.PROFILE_SUBTITLE,
    color: THEME.COLORS.GRAY_200,
    fontFamily: "Poppins_500Medium",
  },
  text: {
    fontSize: THEME.FONT_SIZE.XS,
    color: THEME.COLORS.GRAY_200,
    fontFamily: "Poppins_500Medium",
  },
  socialLabel: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginBottom: 18,
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
