import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  addDoc,
  deleteDoc,
  collection,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { Star } from "phosphor-react-native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../../FirebaseConfig";
import { Comic } from "../../@types/comics";
import { PerfilPageParams } from "../../@types/navigation";
import { Story } from "../../@types/storie";
import { ArrowBackIcon, SortAmountIcon } from "../../components/icons";
import { InfoCard } from "../../components/InfoCard";
import { api } from "../../services/api";
import { keys } from "../../services/endpoints";
import { THEME } from "../../themes";

import { styles } from "./styles";

interface Props {
  id: number;
  type: string;
  title: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  description?: string | undefined | null;
}

export function Perfil() {
  const route = useRoute();
  const perfil = route.params as PerfilPageParams;

  const [user, setUser] = useState<User | null>(null);

  const navigation = useNavigation();

  const [nickname, realNameWithParenteses] = perfil.title.split(" (");
  const realName = realNameWithParenteses?.replace(")", "");

  const [storie, setStorie] = useState<Story[]>([]);
  const [comics, setComics] = useState<Comic[]>([]);

  const [favorites, setFavorites] = useState<any[]>([]);

  function handleOpenInfoCard({
    id,
    title,
    thumbnail,
    description,
    type,
  }: Props) {
    navigation.navigate("info", {
      id,
      title,
      thumbnail,
      description,
      type,
    });
  }

  function verificaIdHeroNoArray(array: any[], idHeroDesejado: number) {
    for (const item of array) {
      if (item.idHero === idHeroDesejado) {
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
    const favorite = favorites.filter(
      (item) => item.idUser === user?.uid && item.idHero === perfil.id
    )[0];

    const ref = doc(FIRESTORE_DB, `favoriteHeroes/${favorite.id}`);
    deleteDoc(ref);
  }

  function handleFav() {
    const doc = addDoc(collection(FIRESTORE_DB, `favoriteHeroes`), {
      idUser: user?.uid,
      idHero: perfil.id,
      title: perfil.title,
      image: perfil.thumbnail,
    });
  }

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, [user]);

  useEffect(() => {
    api(`/v1/public/characters/${perfil.id}/stories${keys}`)
      .then((response) => {
        setStorie(response.data.data.results);
      })
      .catch((err) => {
        console.error("err perfil", err);
      });

    api(`/v1/public/characters/${perfil.id}/comics${keys}`)
      .then((response) => {
        setComics(response.data.data.results);
      })
      .catch((err) => {
        console.error("err perfil", err);
      });

    const favRef = collection(FIRESTORE_DB, "favoriteHeroes");
    const subscriber = onSnapshot(favRef, {
      next: (snapshot) => {
        const favs: any[] = [];
        snapshot.docs.forEach((doc) => {
          favs.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setFavorites(favs);
      },
    });
  }, []);

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
                  handleStar(verificaIdHeroNoArray(favorites, perfil.id))
                }
                style={{ position: "absolute", right: 28 }}
              >
                <Star
                  size={24}
                  weight={verificaIdHeroNoArray(favorites, perfil.id)}
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
                    width: 180,
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
                  width: 180,
                  marginBottom: 48,
                }}
              >
                {nickname}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  gap: 28,
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 28,
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: THEME.FONT_FAMILY.BLACK,
                      fontSize: THEME.FONT_SIZE.CARD_TITLE,
                      color: THEME.COLORS.WHITE,
                    }}
                  >
                    {perfil.amountStories}
                  </Text>
                  <Text
                    style={{
                      fontFamily: THEME.FONT_FAMILY.MEDIUM,
                      fontSize: THEME.FONT_SIZE.XS,
                      color: THEME.COLORS.WHITE,
                    }}
                  >
                    Histórias
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: THEME.FONT_FAMILY.BLACK,
                      fontSize: THEME.FONT_SIZE.CARD_TITLE,
                      color: THEME.COLORS.WHITE,
                    }}
                  >
                    {perfil.amountEvents}
                  </Text>
                  <Text
                    style={{
                      fontFamily: THEME.FONT_FAMILY.MEDIUM,
                      fontSize: THEME.FONT_SIZE.XS,
                      color: THEME.COLORS.WHITE,
                    }}
                  >
                    Eventos
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: THEME.FONT_FAMILY.BLACK,
                      fontSize: THEME.FONT_SIZE.CARD_TITLE,
                      color: THEME.COLORS.WHITE,
                    }}
                  >
                    {perfil.amountSeries}
                  </Text>
                  <Text
                    style={{
                      fontFamily: THEME.FONT_FAMILY.MEDIUM,
                      fontSize: THEME.FONT_SIZE.XS,
                      color: THEME.COLORS.WHITE,
                    }}
                  >
                    Séries
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: THEME.FONT_FAMILY.BLACK,
                      fontSize: THEME.FONT_SIZE.CARD_TITLE,
                      color: THEME.COLORS.WHITE,
                    }}
                  >
                    {perfil.amountComics}
                  </Text>
                  <Text
                    style={{
                      fontFamily: THEME.FONT_FAMILY.MEDIUM,
                      fontSize: THEME.FONT_SIZE.XS,
                      color: THEME.COLORS.WHITE,
                    }}
                  >
                    Quadrinhos
                  </Text>
                </View>
              </View>
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
              <View
                style={{
                  width: "100%",
                  maxWidth: 320,
                  maxHeight: 150,
                  height: "100%",
                  flexDirection: "column",
                  marginBottom: 38,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    maxWidth: 320,
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 34,
                    marginBottom: 20,
                  }}
                >
                  <Text
                    style={{
                      color: THEME.COLORS.GRAY_300,
                      fontSize: THEME.FONT_SIZE.DESCRIPTION,
                      fontFamily: THEME.FONT_FAMILY.MEDIUM,
                    }}
                  >
                    Data
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      width: "100%",
                      maxWidth: 250,
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: THEME.COLORS.GRAY_300,
                        fontSize: THEME.FONT_SIZE.DESCRIPTION,
                        fontFamily: THEME.FONT_FAMILY.MEDIUM,
                      }}
                    >
                      Timeline
                    </Text>
                    <TouchableOpacity>
                      <SortAmountIcon />
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    width: "100%",
                    maxWidth: 320,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: THEME.FONT_SIZE.PROFILE_SUBTITLE,
                        color: THEME.COLORS.WHITE,
                        fontFamily: THEME.FONT_FAMILY.MEDIUM,
                        marginBottom: 38,
                      }}
                    >
                      {storie[0]?.modified.substring(0, 4)}
                    </Text>
                    <Text
                      style={{
                        fontSize: THEME.FONT_SIZE.PROFILE_SUBTITLE,
                        color: THEME.COLORS.WHITE,
                        fontFamily: THEME.FONT_FAMILY.MEDIUM,
                      }}
                    >
                      {storie[storie?.length - 1]?.modified.substring(0, 4)}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: 2,
                      height: "100%",
                      backgroundColor: THEME.COLORS.WHITE,
                      marginHorizontal: 16,
                    }}
                  />
                  <View>
                    <View
                      style={{
                        width: "100%",
                        maxWidth: 250,
                        minWidth: 250,
                        height: 45,
                        borderRadius: 16,
                        paddingLeft: 18,
                        paddingVertical: 10,
                        alignItems: "flex-start",
                        backgroundColor: THEME.COLORS.RED,
                        marginBottom: 17,
                      }}
                    >
                      {storie?.length > 0 && (
                        <Text
                          style={{
                            fontSize: THEME.FONT_SIZE.PROFILE_SUBTITLE,
                            color: THEME.COLORS.WHITE,
                            fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
                          }}
                        >
                          {storie[0]?.characters?.items[0]?.name}
                        </Text>
                      )}
                    </View>
                    <View
                      style={{
                        width: "100%",
                        maxWidth: 250,
                        minWidth: 250,
                        height: 45,
                        borderRadius: 16,
                        paddingLeft: 18,
                        paddingVertical: 10,
                        alignItems: "flex-start",
                        backgroundColor: THEME.COLORS.DARK,
                      }}
                    >
                      {storie?.length > 0 && (
                        <Text
                          style={{
                            fontSize: THEME.FONT_SIZE.PROFILE_SUBTITLE,
                            color: THEME.COLORS.WHITE,
                            fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
                          }}
                        >
                          {
                            storie[storie?.length - 1]?.characters?.items[0]
                              ?.name
                          }
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.listBox}>
                <Text style={styles.listBoxTitle}>Quadrinhos</Text>
                <FlatList
                  data={comics.filter(
                    (item) =>
                      !item.thumbnail.path.includes("/image_not_available")
                  )}
                  keyExtractor={(item) => `${item.id}`}
                  renderItem={({ item }) => (
                    <InfoCard
                      onPress={() =>
                        handleOpenInfoCard({
                          title: item.title,
                          id: item.id,
                          thumbnail: item.thumbnail,
                          description: item.description,
                          type: "comics",
                        })
                      }
                      data={{
                        title: item.title,
                        id: item.id,
                        thumbnail: item.thumbnail,
                      }}
                    />
                  )}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.contentList}
                />
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
}
