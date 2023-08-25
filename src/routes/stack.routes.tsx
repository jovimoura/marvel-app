import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Home";
import { Login } from "../screens/Login";
import { Perfil } from "../screens/Perfil";

interface Props {
  user: any;
}

const Stack = createNativeStackNavigator();

export function StackRoutes({ user }: Props) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
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
