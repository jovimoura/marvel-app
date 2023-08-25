import React from "react";

import { ImageBackground } from "react-native";

import { styles } from "./styles";

interface Props {
  children: React.ReactNode;
  bgImg: { uri: string } | number;
  style?: any;
}

export function BackgroundImage({ children, bgImg, style }: Props) {
  return (
    <ImageBackground
      source={bgImg}
      defaultSource={bgImg}
      style={{ ...styles.container, ...style }}
    >
      {children}
    </ImageBackground>
  );
}
