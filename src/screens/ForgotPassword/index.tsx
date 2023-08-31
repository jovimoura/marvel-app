import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";

import { styles } from "./styles";

import { BackgroundImage } from "../../components/BackgroundImage";
import { Input } from "../../components/Input";
import { ButtonGradient } from "../../components/ButtonGradient";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
import { StatusBar } from "expo-status-bar";
import { THEME } from "../../themes";
import { useNavigation } from "@react-navigation/native";

export function ForgotPassword() {
  const auth = FIREBASE_AUTH;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [showMessageEmailError, setShowMessageEmailError] = useState(false);

  async function handleForgotPassword() {
    const emailValidator = email === "" && !email.match(regex);

    if (!emailValidator) {
      setLoading(true);
      try {
        const res = await sendPasswordResetEmail(auth, email);
        Alert.alert(
          "Redefinir senha",
          "Enviamos o link de troca de senha para seu e-mail!"
        );
        navigation.navigate("login");
      } catch (error) {
        console.log(error);
        Alert.alert("Error ao logar, por favor verifique seu Email ou senha");
      } finally {
        setLoading(false);
      }
    } else {
      setShowMessageEmailError(true);
    }
  }

  return (
    <BackgroundImage
      bgImg={require("../../assets/backgrounds/bg-black-panther.png")}
    >
      <StatusBar style='light' />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <BackgroundImage
          bgImg={require("../../assets/backgrounds/bg-login.png")}
        >
          <View style={styles.form}>
            <View style={styles.header}>
              <Text style={styles.title}>Criar Nova Senha</Text>
              <Text style={styles.subtitle}>
                Digite seu e-mail corretamente e enviaremos o código para
                resetar sua senha!
              </Text>
            </View>
            <View style={{ ...styles.boxInput, marginBottom: 12 }}>
              <Text style={styles.label}>Usuário</Text>
              <Input
                autoCapitalize='none'
                value={email}
                onChangeText={setEmail}
                icon='email'
                errorMessage='Por favor digite seu e-mail'
                showMessageError={showMessageEmailError}
                placeholder='tecnologia@pontua.com.br'
              />
            </View>
            <ButtonGradient
              colorLoading={THEME.COLORS.WHITE}
              isLoading={loading}
              disabled={loading}
              label='Resetar Senha'
              onPress={handleForgotPassword}
            />
            <View
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                gap: 4,
                marginTop: 20,
              }}
            >
              <Text style={{ ...styles.text, fontSize: 16 }}>
                Já possui conta?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("login")}>
                <Text style={styles.register}>Faça o login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BackgroundImage>
      </KeyboardAvoidingView>
    </BackgroundImage>
  );
}
