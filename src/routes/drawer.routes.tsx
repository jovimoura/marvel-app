import { createDrawerNavigator } from "@react-navigation/drawer";
import { Gear, House } from "phosphor-react-native";
import { Config } from "../screens/Config";
import { StackRoutes } from "./stack.routes";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { THEME } from "../themes";

const Drawer = createDrawerNavigator();

export function DrawerRoutes() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  });
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: "back",
        overlayColor: "#00000000",
      }}
    >
      <Drawer.Screen
        name='Home'
        component={StackRoutes}
        options={{
          drawerActiveTintColor: THEME.COLORS.RED,
          drawerIcon: ({ color, size }) => <House color={color} size={size} />,
          drawerLabel: "Início",
        }}
      />
      <Drawer.Screen
        options={{
          drawerActiveTintColor: THEME.COLORS.RED,
          drawerIcon: ({ color, size }) => <Gear color={color} size={size} />,
          drawerLabel: "Configurações",
        }}
        name='config'
        component={Config}
      />
    </Drawer.Navigator>
  );
}
