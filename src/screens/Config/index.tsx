import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged, User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { A } from "@expo/html-elements";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";
import { MarvelLogo, MenuIcon } from "../../components/icons";
import { THEME } from "../../themes";

import { styles } from "./styles";

export function Config() {
  const navigation = useNavigation();
  const navigationDrawer = useNavigation<DrawerNavigationProp<{}>>();

  async function handleSignOut() {
    FIREBASE_AUTH.signOut();
    navigation.navigate("home");
  }

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "flex-start",
          paddingVertical: 80,
          flex: 1,
        }}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigationDrawer.openDrawer()}
            style={styles.configButton}
          >
            <MenuIcon />
          </TouchableOpacity>
          <MarvelLogo color={THEME.COLORS.RED} />
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.subtitle}>Bem vindo {user?.displayName}</Text>
          <Text style={styles.title}>Configurações</Text>
          <Text style={styles.subtitle}>
            Para deslogar do app, clique no botão de sair abaixo.
          </Text>
        </View>
        <View style={{ marginTop: "auto", width: "100%", gap: 20 }}>
          <TouchableOpacity style={styles.button} onPress={handleSignOut}>
            <Text style={styles.buttonLabel}>Sair</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.footer}>
              Desenvolvido por{" "}
              <A href='https://www.linkedin.com/in/jovimoura10/'>John</A>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
