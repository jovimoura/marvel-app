import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged, User } from "firebase/auth";
import { useCallback, useEffect, useState } from "react";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { Home } from "../screens/Home";
import { Login } from "../screens/Login";
import { Perfil } from "../screens/Perfil";

const Stack = createNativeStackNavigator();

export function StackRoutes() {
  const [user, setUser] = useState<User | null>(null);
  const [userID, setUserID] = useState<string | null>(null);

  async function fetchUser() {
    const userId = await AsyncStorage.getItem("@marvel-user-id");
    if (userId) {
      setUserID(userId);
    }
  }

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  });

  useFocusEffect(
    useCallback(() => {
      fetchUser();
    }, [])
  );

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user || userID ? (
        <>
          <Stack.Screen name='home' component={Home} />
          <Stack.Screen name='perfil' component={Perfil} />
        </>
      ) : (
        <Stack.Screen name='Login' component={Login} />
      )}
    </Stack.Navigator>
  );
}
