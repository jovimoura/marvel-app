import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PerfilPageParams } from "../../@types/navigation";
import { ArrowBackIcon, MarvelLogo } from "../../components/icons";
import { THEME } from "../../themes";

import { styles } from "./styles";

export function Perfil() {
  const route = useRoute();
  const perfil = route.params as PerfilPageParams;

  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: THEME.COLORS.BLACK,
      }}
    >
      <StatusBar style='light' />
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
            marginBottom: 40,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ position: "absolute", left: 28 }}
          >
            <ArrowBackIcon color={THEME.COLORS.WHITE} />
          </TouchableOpacity>
          <MarvelLogo color={THEME.COLORS.RED} />
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
          <Text
            style={{
              fontSize: THEME.FONT_SIZE.HOME_SUBTITLE,
              color: THEME.COLORS.GRAY,
              fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
            }}
          >
            Perfil: {perfil.title}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
