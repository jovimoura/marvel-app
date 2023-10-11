import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged, GoogleAuthProvider, signInWithCredential, User } from "firebase/auth";
import { useEffect, useState } from "react";

import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'

import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { ForgotPassword } from "../screens/ForgotPassword";
import { Home } from "../screens/Home";
import { Info } from "../screens/Info";
import { Login } from "../screens/Login";
import { Perfil } from "../screens/Perfil";
import { SeeAll } from "../screens/SeeAll";

WebBrowser.maybeCompleteAuthSession()

const Stack = createNativeStackNavigator();

export function StackRoutes() {
  const [user, setUser] = useState<User | null>(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '655349146543-pvn1vcuvhm45hantm9a3n3jaf4guqtfl.apps.googleusercontent.com'
  })

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });

    if (response?.type == 'success') {
      const {id_token} = response.params;
      const credential = GoogleAuthProvider.credential(id_token)
      signInWithCredential(FIREBASE_AUTH, credential)
    }
  }, [response]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name='home' component={Home} />
          <Stack.Screen name='perfil' component={Perfil} />
          <Stack.Screen name='info' component={Info} />
          <Stack.Screen name='seeall' component={SeeAll} />
        </>
      ) : (
        <>
          <Stack.Screen name='login' component={() => <Login promptAsync={promptAsync} />} />
          <Stack.Screen name='forgotPassword' component={ForgotPassword} />
        </>
      )}
    </Stack.Navigator>
  );
}
