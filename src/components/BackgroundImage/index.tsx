import React from "react";

import { ImageBackground } from "react-native";

import { styles } from "./styles";

interface Props {
  children: React.ReactNode;
  bgImg: any;
}

export function BackgroundImage({ children, bgImg }: Props) {
  return (
    <ImageBackground
      source={bgImg}
      defaultSource={bgImg}
      style={styles.container}
    >
      {children}
    </ImageBackground>
  );
}
