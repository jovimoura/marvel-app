import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, Text, View } from "react-native";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";

import { styles } from "./styles";

export function Config() {
  const navigation = useNavigation();
  async function handleSignOut() {
    FIREBASE_AUTH.signOut();
    navigation.navigate("home");
  }
  return (
    <View style={styles.container}>
      <Text>config</Text>
      <Button title='Sign out' onPress={handleSignOut} />
    </View>
  );
}
