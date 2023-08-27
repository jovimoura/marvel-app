import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Text, View, Button } from "react-native";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";

import { styles } from "./styles";

export function Home() {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={styles.text}>Home</Text>

      <Button title='Sign out' onPress={() => FIREBASE_AUTH.signOut()} />
    </View>
  );
}
