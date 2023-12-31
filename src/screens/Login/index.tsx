import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Keyboard,
} from "react-native";

import { styles } from "./styles";
import {
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
  updateProfile,
} from "firebase/auth";
import { StatusBar } from "expo-status-bar";
import { THEME } from "../../themes";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

export function Login({ promptAsync }: any) {
  const auth = FIREBASE_AUTH;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const navigation = useNavigation();

  const [viewSignIn, setViewSignIn] = useState(true);

  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [showMessageEmailError, setShowMessageEmailError] = useState(false);
  const [showMessagePasswordError, setShowMessagePasswordError] =
    useState(false);
  const [showMessageConfirmPasswordError, setShowMessageConfirmPasswordError] =
    useState(false);

  async function signIn() {
    const emailValidator = email === "" && !email.match(regex);
    const passwordValidator = password === "";

    const loginPermition = emailValidator && passwordValidator;

    if (!loginPermition) {
      setLoading(true);
      try {
        const res = await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        console.log(error);
        Alert.alert("Error ao logar, por favor verifique seu Email ou senha");
      } finally {
        setLoading(false);
      }
    } else {
      setShowMessageEmailError(true);
      setShowMessagePasswordError(true);
    }
  }

  async function signUp() {
    const emailValidator = email === "" && !email.match(regex);
    const passwordValidator = password === "" && password.length > 7;
    const confirmPasswordValidator =
      confirmPassword === "" || password !== confirmPassword;

    const signUpPermition =
      emailValidator && passwordValidator && confirmPasswordValidator;

    if (!signUpPermition) {
      setLoading(true);
      if (confirmPassword !== password) {
        Alert.alert(`Por favor verifique sua senha!`);
      } else {
        try {
          const res = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          ).then(async (res) => {
            await updateProfile(res.user, {
              displayName: name,
            }).catch((err) => console.log("add name error", err));
          });
          Alert.alert(`Usuário registrado com sucesso!`);
          setViewSignIn(true);
        } catch (error: any) {
          Alert.alert(
            "Ops, tivemos problemas em criar sua conta, verifique seu email e senha por favor!"
          );
        } finally {
          setLoading(false);
        }
      }
    } else {
      setShowMessageEmailError(true);
      setShowMessageConfirmPasswordError(true);
      setShowMessagePasswordError(true);
    }
  }

  const [keyboardClosed, setKeyboardClosed] = useState(true);
  useEffect(() => {
    let keyboardEventListeners: any;
    if (Platform.OS === "android") {
      keyboardEventListeners = [
        Keyboard.addListener("keyboardDidShow", () => setKeyboardClosed(false)),
        Keyboard.addListener("keyboardDidHide", () => setKeyboardClosed(true)),
      ];
    }
    return () => {
      if (Platform.OS === "android") {
        keyboardEventListeners &&
          keyboardEventListeners.forEach((eventListener: any) =>
            eventListener.remove()
          );
      }
    };
  }, []);

  return (
    <BackgroundImage
      bgImg={require("../../assets/backgrounds/bg-black-panther.png")}
    >
      <StatusBar style='light' />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <LinearGradient
          colors={['rgba(179, 121, 223, 0.20)', 'rgba(204, 88, 84, 0.02)', 'rgba(179, 121, 223, 0.20)']}
          start={{ x: 0.1532, y: 0.2104 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1, width: '100%' }}
        >
          {viewSignIn ? (
            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.title}>Faça login</Text>
                <Text style={styles.subtitle}>Seja bem-vindo!</Text>
              </View>
              <View style={{ ...styles.boxInput, marginBottom: 12 }}>
                <Text style={styles.label}>Usuário</Text>
                <Input
                  autoCapitalize='none'
                  value={email}
                  onChangeText={setEmail}
                  icon='email'
                  errorMessage='Verifique seu email.'
                  showMessageError={showMessageEmailError}
                  placeholder='seu@email.com.br'
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
                  showMessageError={showMessagePasswordError}
                  placeholder='Digite sua senha aqui...'
                  eyePress={() => setHidePassword(!hidePassword)}
                  secureTextEntry={hidePassword}
                />
                <TouchableOpacity
                  onPress={() => navigation.navigate("forgotPassword")}
                  style={{ alignSelf: "flex-end", marginTop: 4 }}
                >
                  <Text style={styles.text}>Esqueceu a senha?</Text>
                </TouchableOpacity>
              </View>
              {keyboardClosed && (
                <>
                  <ButtonGradient
                    colorLoading={THEME.COLORS.WHITE}
                    isLoading={loading}
                    label='Entrar'
                    disabled={loading}
                    onPress={signIn}
                  />
                  {/* proxima release */}
                  {/* <View style={styles.socialLabel}>
                    <Line />
                    <Text style={styles.text}>Faça login com</Text>
                    <Line right />
                  </View>
                  <View style={styles.socialBox}>
                    <TouchableOpacity onPress={() => promptAsync()} style={styles.socialButton}>
                      <GoogleIcon />
                      <Text style={styles.text}>Faça o login com Google</Text>
                    </TouchableOpacity>
                  </View> */}
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
                    <Text style={{ ...styles.text, fontSize: 16 }}>
                      Novo aqui?
                    </Text>
                    <TouchableOpacity onPress={() => setViewSignIn(false)}>
                      <Text style={styles.register}>Cadastre-se</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          ) : (
            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.title}>Criar Conta</Text>
                <Text style={styles.subtitle}>Para criar uma conta é muito fácil!</Text>
              </View>
              <View style={{ ...styles.boxInput, marginBottom: 12 }}>
                <Text style={styles.label}>Nome</Text>
                <Input
                  autoCapitalize='words'
                  value={name}
                  onChangeText={setName}
                  icon='email'
                  errorMessage='Por favor digite seu nome completo'
                  showMessageError={showMessageEmailError}
                  placeholder='Digite seu nome completo'
                />
              </View>
              <View style={{ ...styles.boxInput, marginBottom: 12 }}>
                <Text style={styles.label}>E-mail</Text>
                <Input
                  autoCapitalize='none'
                  value={email}
                  onChangeText={setEmail}
                  icon='email'
                  errorMessage='Por favor digite seu e-mail'
                  showMessageError={showMessageEmailError}
                  placeholder='seu@email.com.br'
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
                  errorMessage='Por favor escolha uma senha de 8 caracteres'
                  showMessageError={showMessagePasswordError}
                  placeholder='Digite sua senha aqui...'
                  eyePress={() => setHidePassword(!hidePassword)}
                  secureTextEntry={hidePassword}
                />
              </View>
              {password.length > 0 && (
                <View style={styles.boxInput}>
                  <Text style={styles.label}>Confirmar Senha</Text>
                  <Input
                    autoCapitalize='none'
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    icon='password'
                    type='password'
                    errorMessage='Senhas diferentes, por favor digite novamente'
                    showMessageError={showMessageConfirmPasswordError}
                    placeholder='Confirme sua senha aqui...'
                    eyePress={() => setHideConfirmPassword(!hidePassword)}
                    secureTextEntry={hideConfirmPassword}
                  />
                </View>
              )}
              {keyboardClosed && (
                <>
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
                </>
              )}
            </View>
          )}
        </LinearGradient>
      </KeyboardAvoidingView>
    </BackgroundImage>
  );
}
