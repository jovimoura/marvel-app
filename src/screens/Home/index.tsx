import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Text, View, Button } from "react-native";

import { styles } from "./styles";

export function Home() {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "blue",
      }}
    >
      <Text>Home</Text>
      <Text>Home</Text>
      <Text>Home</Text>
      <Text>Home</Text>

      <Button
        title='Go to Details'
        onPress={() => navigation.navigate("login")}
      />
    </View>
  );
}
