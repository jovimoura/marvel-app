import { createDrawerNavigator } from "@react-navigation/drawer";
import { Gear, House } from "phosphor-react-native";
import { Config } from "../screens/Config";
import { StackRoutes } from "./stack.routes";

import { Feather } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

export function DrawerRoutes() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: "back",
        overlayColor: "#00000000",
      }}
    >
      <Drawer.Screen
        name='feed'
        component={StackRoutes}
        options={{
          drawerIcon: ({ color, size }) => <House color={color} size={size} />,
          drawerLabel: "Início",
        }}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({ color, size }) => <Gear color={color} size={size} />,
          drawerLabel: "Configurações",
        }}
        name='config'
        component={Config}
      />
    </Drawer.Navigator>
  );
}
