import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { styles } from "./styles";
import {
  AppleIcon,
  FacebookIcon,
  GoogleIcon,
  Line,
} from "../../components/icons";

import { BackgroundImage } from "../../components/BackgroundImage";
import { Input } from "../../components/Input";
import { ButtonGradient } from "../../components/ButtonGradient";

export function Login() {
  const navigation = useNavigation();

  const [hidePassword, setHidePassword] = useState(true);

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
    <BackgroundImage
      bgImg={require("../../assets/backgrounds/bg-black-panther.png")}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <BackgroundImage
          bgImg={require("../../assets/backgrounds/bg-login.png")}
        >
          <View style={styles.form}>
            <View style={styles.header}>
              <Text style={styles.title}>Faça login</Text>
              <Text style={styles.subtitle}>seja bem-vindo novamente.</Text>
            </View>
            <View style={{ ...styles.boxInput, marginBottom: 12 }}>
              <Text style={styles.label}>Usuário</Text>
              <Input icon='email' placeholder='tecnologia@pontua.com.br' />
            </View>
            <View style={styles.boxInput}>
              <Text style={styles.label}>Senha</Text>
              <Input
                icon='password'
                type='password'
                placeholder='Digite sua senha aqui...'
                eyePress={() => setHidePassword(!hidePassword)}
                secureTextEntry={hidePassword}
              />
              <TouchableOpacity style={{ alignSelf: "flex-end" }}>
                <Text style={styles.text}>Esqueceu a senha?</Text>
              </TouchableOpacity>
            </View>
            <ButtonGradient label='entrar' />
            <View style={styles.socialLabel}>
              <Line />
              <Text style={styles.text}>Faça login com</Text>
              <Line right />
            </View>
            <View style={styles.socialBox}>
              <TouchableOpacity style={styles.socialButton}>
                <GoogleIcon />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <AppleIcon />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <FacebookIcon />
              </TouchableOpacity>
            </View>
          </View>
        </BackgroundImage>
      </KeyboardAvoidingView>
    </BackgroundImage>
  );
}
