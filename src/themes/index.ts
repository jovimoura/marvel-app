export const THEME = {
  COLORS: {
    BACKGROUND_900: "#121214",
    BACKGROUND_800: "#18181B",

    TEXT: "#17171B",

    WHITE: "#FFFFFF",
    BLACK: "#000000",
    RED: "#F2264B",
    DARK: "#313140",
    GRAY: "#B7B7C8",
    SILVER: "#F8F8F8",

    SUCCESS: "#34D399",
    ALERT: "#F87171",
    WARNING: "#FB923C",

    TRANSPARENT: "transparent",

    FOOTER: ["rgba(0,0,0,0)", "rgba(0,0,0,0.9)"],
    OVERLAY: "rgba(0,0,0,0.6)",
  },

  FONT_SIZE: {
    PROFILE_TITLE: 40,
    HOME_TITLE: 32,
    CARD_TITLE: 20,
    SECTION_TITLE: 18,
    PROFILE_SUBTITLE: 16,
    HOME_SUBTITLE: 14,
    DESCRIPTION: 14,
    CARACTERISTIC: 12,
    ABILITY: 12,
    CARD_SUBTITLE: 10,
  },
};

export const nativeBaseTheme = {
  colors: {
    // Add new color
    primary: {
      400: "#8B5CF6",
    },
    // Redefining only one shade, rest of the color will remain same.
    orange: {
      400: "#FB923C",
    },
    red: {
      400: "#F87171",
    },
    green: {
      400: "#34D399",
    },
  },
  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: "dark",
  },
};
