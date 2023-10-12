import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { onAuthStateChanged, User } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { Star } from "phosphor-react-native";
import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../../FirebaseConfig";
import { InfoPageParams } from "../../@types/navigation";
import { ArrowBackIcon } from "../../components/icons";

import { api } from "../../services/api";
import { keys } from "../../services/endpoints";
import { THEME } from "../../themes";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";

import { styles } from "./styles";

export function Info() {
  const route = useRoute();
  const perfil = route.params as InfoPageParams;

  const [user, setUser] = useState<User | null>(null);

  const navigation = useNavigation();

  const [nickname, realNameWithParenteses] = perfil.title.split(" (");
  const realName = realNameWithParenteses?.replace(")", "");
  const [storie, setStorie] = useState<any[]>([]);

  const [favorites, setFavorites] = useState<any[]>([]);

  function verificaIdNoArray(array: any[], idDesejado: number) {
    for (const item of array) {
      if (item.id === idDesejado) {
        return "fill";
      }
    }
    return "regular";
  }

  function handleStar(state: string) {
    if (state === "regular") {
      handleFav();
    } else {
      handleUnFav();
    }
  }

  function handleUnFav() {
    if (perfil.type) {
      const favorite = favorites.filter(
        (item) => item.idUser === user?.uid && item.id === perfil.id
      )[0];
  
      const ref = doc(FIRESTORE_DB, `favorite${capitalizeFirstLetter(perfil.type)}/${favorite.id}`);
      deleteDoc(ref);
    }
  }

  function handleFav() {
    if (perfil.type) {
      const doc = addDoc(collection(FIRESTORE_DB, `favorite${capitalizeFirstLetter(perfil.type)}`), {
        idUser: user?.uid,
        id: perfil.id,
        title: perfil.title,
        image: perfil.thumbnail,
      });
    }
  }

  useEffect(() => {
    api(`/v1/public/${perfil.type}/${perfil.id}${keys}`)
      .then((response) => {
        setStorie(response.data.data.results);
      })
      .catch((err) => {
        console.error("err perfil", err);
      });

    if (perfil.type) {
      const favRef = collection(FIRESTORE_DB, `favorite${capitalizeFirstLetter(perfil.type)}`);
      const subscriber = onSnapshot(favRef, {
        next: (snapshot) => {
          const favs: any[] = [];
          snapshot.docs.forEach((doc) => {
            favs.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          setFavorites(favs.filter(item => item.idUser == user?.uid));
        },
      });
    }
  }, [user]);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, [user]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <StatusBar style='light' />
      <ImageBackground
        style={{ flex: 1 }}
        source={{
          uri: `${perfil.thumbnail.path}.${perfil.thumbnail.extension}`,
        }}
      >
        <LinearGradient
          colors={THEME.COLORS.GRADIENTS.BLACK}
          style={{
            width: "100%",
            flex: 1,
            alignSelf: "flex-end",
          }}
        >
          <ScrollView
            contentContainerStyle={{
              alignItems: "center",
              justifyContent: "flex-start",
              paddingTop: 80,
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                position: "relative",
                width: "100%",
                marginBottom: 240,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ position: "absolute", left: 28 }}
              >
                <ArrowBackIcon color={THEME.COLORS.WHITE} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  handleStar(verificaIdNoArray(favorites, perfil.id))
                }
                style={{ position: "absolute", right: 28 }}
              >
                <Star
                  size={24}
                  weight={verificaIdNoArray(favorites, perfil.id)}
                  color={THEME.COLORS.WHITE}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                width: "100%",
                paddingHorizontal: 24,
                gap: 8,
                marginBottom: 28,
              }}
            >
              {realName?.length > 1 && (
                <Text
                  style={{
                    fontSize: THEME.FONT_SIZE.PROFILE_SUBTITLE,
                    color: THEME.COLORS.WHITE,
                    fontFamily: THEME.FONT_FAMILY.MEDIUM,
                    width: 280,
                    opacity: 0.75,
                  }}
                >
                  {realName}
                </Text>
              )}
              <Text
                style={{
                  fontSize: THEME.FONT_SIZE.PROFILE_TITLE,
                  lineHeight: 44,
                  color: THEME.COLORS.WHITE,
                  fontFamily: THEME.FONT_FAMILY.MEDIUM,
                  width: 280,
                  marginBottom: 8,
                }}
              >
                {nickname}
              </Text>
              {storie[0]?.variantDescription && (
                <Text
                  style={{
                    fontSize: THEME.FONT_SIZE.PROFILE_SUBTITLE,
                    color: THEME.COLORS.WHITE,
                    fontFamily: THEME.FONT_FAMILY.MEDIUM,
                    width: 280,
                    opacity: 0.75,
                    marginBottom: 48,
                  }}
                >
                  {storie[0]?.variantDescription}
                </Text>
              )}
              {perfil?.description && (
                <Text
                  style={{
                    fontFamily: THEME.FONT_FAMILY.MEDIUM,
                    fontSize: THEME.FONT_SIZE.DESCRIPTION,
                    color: THEME.COLORS.WHITE,
                    textAlign: "left",
                  }}
                >
                  {perfil.description}
                </Text>
              )}
            </View>
          </ScrollView>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
}
