import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { styles } from "./styles";
import { Loading } from "../../components/Loading";
import { Background } from "../../components/Background";

export function Login() {
  const navigation = useNavigation();

  async function fetchUser() {
    const userId = await AsyncStorage.getItem("@marvel-user-id");
    if (userId) {
      navigation.navigate("home");
    }
  }

  async function handleLogin() {
    try {
      // api func
      AsyncStorage.getItem("@marvel-user-id");
    } catch (error) {
      // err
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchUser();
    }, [])
  );

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 64, fontWeight: "700", color: "#000" }}>
        Home Screen
      </Text>
    </View>
  );
}
