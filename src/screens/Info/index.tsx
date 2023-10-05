import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { InfoPageParams } from "../../@types/navigation";
import { ArrowBackIcon } from "../../components/icons";

import { api } from "../../services/api";
import { keys } from "../../services/endpoints";
import { THEME } from "../../themes";

import { styles } from "./styles";

export function Info() {
  const route = useRoute();
  const perfil = route.params as InfoPageParams;

  const navigation = useNavigation();

  const [nickname, realNameWithParenteses] = perfil.title.split(" (");
  const realName = realNameWithParenteses?.replace(")", "");
  const [storie, setStorie] = useState<any[]>([]);

  useEffect(() => {
    api(`/v1/public/${perfil.type}/${perfil.id}${keys}`)
      .then((response) => {
        setStorie(response.data.data.results);
      })
      .catch((err) => {
        console.error("err perfil", err);
      });
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <StatusBar style='light' />
      <ImageBackground
        style={{ flex: 1 }}
        source={{
          uri: `${perfil.thumbnail.path}.${perfil.thumbnail.extension}`,
        }}
      >
        <LinearGradient
          colors={THEME.COLORS.GRADIENTS.BLACK}
          style={{
            width: "100%",
            flex: 1,
            alignSelf: "flex-end",
          }}
        >
          <ScrollView
            contentContainerStyle={{
              alignItems: "center",
              justifyContent: "flex-start",
              paddingTop: 80,
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                position: "relative",
                width: "100%",
                marginBottom: 240,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ position: "absolute", left: 28 }}
              >
                <ArrowBackIcon color={THEME.COLORS.WHITE} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                width: "100%",
                paddingHorizontal: 24,
                gap: 8,
                marginBottom: 28,
              }}
            >
              {realName?.length > 1 && (
                <Text
                  style={{
                    fontSize: THEME.FONT_SIZE.PROFILE_SUBTITLE,
                    color: THEME.COLORS.WHITE,
                    fontFamily: THEME.FONT_FAMILY.MEDIUM,
                    width: 280,
                    opacity: 0.75,
                  }}
                >
                  {realName}
                </Text>
              )}
              <Text
                style={{
                  fontSize: THEME.FONT_SIZE.PROFILE_TITLE,
                  lineHeight: 44,
                  color: THEME.COLORS.WHITE,
                  fontFamily: THEME.FONT_FAMILY.MEDIUM,
                  width: 280,
                  marginBottom: 8,
                }}
              >
                {nickname}
              </Text>
              {storie[0]?.variantDescription && (
                <Text
                  style={{
                    fontSize: THEME.FONT_SIZE.PROFILE_SUBTITLE,
                    color: THEME.COLORS.WHITE,
                    fontFamily: THEME.FONT_FAMILY.MEDIUM,
                    width: 280,
                    opacity: 0.75,
                    marginBottom: 48,
                  }}
                >
                  {storie[0]?.variantDescription}
                </Text>
              )}
              {perfil?.description && (
                <Text
                  style={{
                    fontFamily: THEME.FONT_FAMILY.MEDIUM,
                    fontSize: THEME.FONT_SIZE.DESCRIPTION,
                    color: THEME.COLORS.WHITE,
                    textAlign: "left",
                  }}
                >
                  {perfil.description}
                </Text>
              )}
            </View>
          </ScrollView>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
}
