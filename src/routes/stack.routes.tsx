import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { Home } from "../screens/Home";
import { Login } from "../screens/Login";
import { Perfil } from "../screens/Perfil";

const Stack = createNativeStackNavigator();

export function StackRoutes() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  });
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='Perfil' component={Perfil} />
        </>
      ) : (
        <Stack.Screen name='Login' component={Login} />
      )}
    </Stack.Navigator>
  );
}
