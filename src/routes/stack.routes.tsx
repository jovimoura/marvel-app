import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { ForgotPassword } from "../screens/ForgotPassword";
import { Home } from "../screens/Home";
import { Info } from "../screens/Info";
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
          <Stack.Screen name='home' component={Home} />
          <Stack.Screen name='perfil' component={Perfil} />
          <Stack.Screen name='info' component={Info} />
        </>
      ) : (
        <>
          <Stack.Screen name='login' component={Login} />
          <Stack.Screen name='forgotPassword' component={ForgotPassword} />
        </>
      )}
    </Stack.Navigator>
  );
}
