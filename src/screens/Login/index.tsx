import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
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
import { FIREBASE_AUTH } from "../../../FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { StatusBar } from "expo-status-bar";
import { THEME } from "../../themes";

export function Login() {
  const auth = FIREBASE_AUTH;
  const navigation = useNavigation();

  const [viewSignIn, setViewSignIn] = useState(true);

  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

  const [email, setEmail] = useState("");
  const [emailValidator, setEmailValidator] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordValidator, setPasswordValidator] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordValidator, setConfirmPasswordValidator] =
    useState(false);
  const [loading, setLoading] = useState(false);

  async function fetchUser() {
    const userId = await AsyncStorage.getItem("@marvel-user-id");
    if (userId) {
      navigation.navigate("home");
    }
  }

  function verifyInputs() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "" && !email.match(regex)) setEmailValidator(true);
    else setEmailValidator(false);
    if (password === "") setPasswordValidator(true);
    else setPasswordValidator(false);
    if (password !== confirmPassword || confirmPassword === "")
      setConfirmPasswordValidator(true);
    else setConfirmPasswordValidator(false);
  }

  const loginPermition = emailValidator && passwordValidator;
  const signUpPermition =
    emailValidator && passwordValidator && confirmPasswordValidator;

  async function signIn() {
    verifyInputs();
    if (loginPermition) {
      setLoading(true);
      try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        navigation.navigate("home");
      } catch (error) {
        console.log(error);
        Alert.alert("Error ao logar, por favor verifique seu Email ou senha");
      } finally {
        setLoading(false);
      }
    }
  }

  async function signUp() {
    verifyInputs();
    if (signUpPermition) {
      setLoading(true);
      if (confirmPassword !== password) {
        Alert.alert(`Por favor verifique sua senha!`);
      } else {
        try {
          const res = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          Alert.alert(`Usuário registrado com sucesso!`);
          AsyncStorage.setItem("@marvel-user-id", res.user.uid);
          setViewSignIn(true);
        } catch (error) {
          console.log(error);
          Alert.alert(
            "Ops, tivemos problemas em criar sua conta, tente novamente mais tarde!"
          );
        } finally {
          setLoading(false);
        }
      }
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
      <StatusBar style='light' />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <BackgroundImage
          bgImg={require("../../assets/backgrounds/bg-login.png")}
        >
          {viewSignIn ? (
            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.title}>Faça login</Text>
                <Text style={styles.subtitle}>seja bem-vindo novamente.</Text>
              </View>
              <View style={{ ...styles.boxInput, marginBottom: 12 }}>
                <Text style={styles.label}>Usuário</Text>
                <Input
                  autoCapitalize='none'
                  value={email}
                  onChangeText={setEmail}
                  icon='email'
                  errorMessage='Verifique seu email.'
                  showMessageError={emailValidator}
                  placeholder='tecnologia@pontua.com.br'
                />
              </View>
              <View style={styles.boxInput}>
                <Text style={styles.label}>Senha</Text>
                <Input
                  autoCapitalize='none'
                  value={password}
                  onChangeText={setPassword}
                  icon='password'
                  type='password'
                  errorMessage='Verifique sua senha.'
                  showMessageError={passwordValidator}
                  placeholder='Digite sua senha aqui...'
                  eyePress={() => setHidePassword(!hidePassword)}
                  secureTextEntry={hidePassword}
                />
                <TouchableOpacity
                  style={{ alignSelf: "flex-end", marginTop: 4 }}
                >
                  <Text style={styles.text}>Esqueceu a senha?</Text>
                </TouchableOpacity>
              </View>
              <ButtonGradient
                colorLoading={THEME.COLORS.WHITE}
                isLoading={loading}
                label='Entrar'
                disabled={loading}
                onPress={signIn}
              />
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
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  gap: 4,
                  marginTop: 12,
                }}
              >
                <Text style={{ ...styles.text, fontSize: 16 }}>Novo aqui?</Text>
                <TouchableOpacity onPress={() => setViewSignIn(false)}>
                  <Text style={styles.register}>Cadastre-se</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.title}>Criar Conta</Text>
                <Text style={styles.subtitle}>seja bem-vindo!</Text>
              </View>
              <View style={{ ...styles.boxInput, marginBottom: 12 }}>
                <Text style={styles.label}>Usuário</Text>
                <Input
                  autoCapitalize='none'
                  value={email}
                  onChangeText={setEmail}
                  icon='email'
                  errorMessage='Por favor digite seu e-mail'
                  showMessageError={emailValidator}
                  placeholder='tecnologia@pontua.com.br'
                />
              </View>
              <View style={styles.boxInput}>
                <Text style={styles.label}>Senha</Text>
                <Input
                  autoCapitalize='none'
                  value={password}
                  onChangeText={setPassword}
                  icon='password'
                  type='password'
                  errorMessage='Por favor escolha uma senha'
                  showMessageError={passwordValidator}
                  placeholder='Digite sua senha aqui...'
                  eyePress={() => setHidePassword(!hidePassword)}
                  secureTextEntry={hidePassword}
                />
              </View>
              <View style={styles.boxInput}>
                <Text style={styles.label}>Senha</Text>
                <Input
                  autoCapitalize='none'
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  icon='password'
                  type='password'
                  errorMessage='Senhas diferentes, por favor digite novamente'
                  showMessageError={confirmPasswordValidator}
                  placeholder='Confirme sua senha aqui...'
                  eyePress={() => setHideConfirmPassword(!hidePassword)}
                  secureTextEntry={hideConfirmPassword}
                />
              </View>
              <ButtonGradient
                colorLoading={THEME.COLORS.WHITE}
                isLoading={loading}
                disabled={loading}
                label='Criar conta'
                onPress={signUp}
              />
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  flexDirection: "row",
                  gap: 4,
                  marginTop: 4,
                }}
              >
                <Text style={{ ...styles.text, fontSize: 16 }}>
                  Já possui conta?
                </Text>
                <TouchableOpacity onPress={() => setViewSignIn(true)}>
                  <Text style={styles.register}>Faça o login</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </BackgroundImage>
      </KeyboardAvoidingView>
    </BackgroundImage>
  );
}
