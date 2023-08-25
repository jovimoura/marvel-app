import { NavigationContainer } from "@react-navigation/native";
import { StackRoutes } from "./stack.routes";

export const Routes = () => {
  const user = {
    name: "user",
    email: "user@example.com",
  };
  return (
    <NavigationContainer>
      <StackRoutes user={user} />
    </NavigationContainer>
  );
};
