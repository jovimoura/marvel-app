import { NavigationContainer } from "@react-navigation/native";
import { DrawerRoutes } from "./drawer.routes";
import { StackRoutes } from "./stack.routes";

export const Routes = () => {
  return (
    <NavigationContainer>
      {/* <StackRoutes /> */}
      <DrawerRoutes />
    </NavigationContainer>
  );
};
