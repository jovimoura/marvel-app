import { useNavigation } from "@react-navigation/native";
import { User } from "phosphor-react-native";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";
import { Character } from "../../@types/characters";
import { Comic } from "../../@types/comics";
import { Events } from "../../@types/events";
import { Series } from "../../@types/series";
import { MarvelLogo } from "../../components/icons";
import { InfoCard, InfoCardProps } from "../../components/InfoCard";
import { InfoCardHorizontal } from "../../components/InfoCardHorizontal";
import { SearchBar } from "../../components/SearchBar";
import { api, API_HASH_KEY, API_PUBLIC_KEY } from "../../services/api";
import { THEME } from "../../themes";

import { styles } from "./styles";

export function Home() {
  const navigation = useNavigation();

  const [searchBarOpen, setSearchBarOpen] = useState(false);

  const [dataHeros, setDataHeros] = useState<Character[]>([]);
  const [dataComics, setDataComics] = useState<Comic[]>([]);
  const [dataSeries, setDataSeries] = useState<Series[]>([]);
  const [dataEvents, setDataEvents] = useState<Events[]>([]);

  function handleOpenHeroCard({ id, title, thumbnail }: InfoCardProps) {
    navigation.navigate("perfil", { id, title, thumbnail });
  }

  useEffect(() => {
    api(
      `/v1/public/characters?ts=1&apikey=${API_PUBLIC_KEY}&hash=${API_HASH_KEY}`
    )
      .then((response) => {
        setDataHeros(response.data.data.results);
      })
      .catch((error) => {
        console.log("Api calls hero error: ", error);
      });

    api(`/v1/public/comics?ts=1&apikey=${API_PUBLIC_KEY}&hash=${API_HASH_KEY}`)
      .then((response) => {
        setDataComics(response.data.data.results);
      })
      .catch((error) => {
        console.log("Api calls comics error: ", error);
      });

    api(`/v1/public/series?ts=1&apikey=${API_PUBLIC_KEY}&hash=${API_HASH_KEY}`)
      .then((response) => {
        setDataSeries(response.data.data.results);
      })
      .catch((error) => {
        console.log("Api calls comics error: ", error);
      });

    api(`/v1/public/events?ts=1&apikey=${API_PUBLIC_KEY}&hash=${API_HASH_KEY}`)
      .then((response) => {
        setDataEvents(response.data.data.results);
      })
      .catch((error) => {
        console.log("Api calls comics error: ", error);
      });
  }, []);

  console.log("search bar", searchBarOpen);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
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
            marginBottom: 40,
          }}
        >
          {!searchBarOpen && (
            <TouchableOpacity
              style={{
                position: "absolute",
                left: 28,
                width: 40,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
                shadowColor: "black",
                shadowOffset: { width: 2, height: 0 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
                elevation: 2,
                borderBlockColor: "black",
                borderRadius: 100,
              }}
            >
              <User size={24} weight='bold' />
            </TouchableOpacity>
          )}
          <MarvelLogo color={THEME.COLORS.RED} />
          <View
            style={{ position: "absolute", right: searchBarOpen ? 28 : 56 }}
          >
            <SearchBar
              open={searchBarOpen}
              onPress={() => setSearchBarOpen(!searchBarOpen)}
            />
          </View>
        </View>
        {searchBarOpen ? (
          <ScrollView
            contentContainerStyle={{
              alignItems: "center",
              justifyContent: "flex-start",
              paddingBottom: 120,
              width: "100%",
            }}
          >
            <View
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "flex-start",
                flexDirection: "row",
                marginBottom: 24,
                gap: 5,
              }}
            >
              <TouchableOpacity
                style={{
                  height: 32,
                  paddingHorizontal: 15,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 26,
                  borderWidth: 1,
                  backgroundColor: THEME.COLORS.DARK,
                  borderColor: THEME.COLORS.DARK,
                }}
              >
                <Text
                  style={{
                    fontFamily: THEME.FONT_FAMILY.MEDIUM,
                    fontSize: THEME.FONT_SIZE.XS,
                    color: THEME.COLORS.WHITE,
                  }}
                >
                  Heróis
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: 32,
                  paddingHorizontal: 15,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 26,
                  borderWidth: 1,
                  borderColor: THEME.COLORS.DARK,
                }}
              >
                <Text
                  style={{
                    fontFamily: THEME.FONT_FAMILY.MEDIUM,
                    fontSize: THEME.FONT_SIZE.XS,
                    color: THEME.COLORS.DARK,
                  }}
                >
                  Quadrinhos
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: 32,
                  paddingHorizontal: 15,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 26,
                  borderWidth: 1,
                  borderColor: THEME.COLORS.DARK,
                }}
              >
                <Text
                  style={{
                    fontFamily: THEME.FONT_FAMILY.MEDIUM,
                    fontSize: THEME.FONT_SIZE.XS,
                    color: THEME.COLORS.DARK,
                  }}
                >
                  Séries
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: 32,
                  paddingHorizontal: 15,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 26,
                  borderWidth: 1,
                  borderColor: THEME.COLORS.DARK,
                }}
              >
                <Text
                  style={{
                    fontFamily: THEME.FONT_FAMILY.MEDIUM,
                    fontSize: THEME.FONT_SIZE.XS,
                    color: THEME.COLORS.DARK,
                  }}
                >
                  Eventos
                </Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={dataHeros
                .slice(0, 22)
                .filter(
                  (item) =>
                    !item.thumbnail.path.includes("/image_not_available") &&
                    item.description.length > 0
                )}
              keyExtractor={(item) => `${item.id}`}
              renderItem={({ item }) => (
                <InfoCardHorizontal
                  onPress={() =>
                    handleOpenHeroCard({
                      title: item.name,
                      id: `${item.id}`,
                      thumbnail: item.thumbnail,
                    })
                  }
                  data={{
                    title: item.name.replace(/\([^)]*\)/g, ""),
                    id: `${item.id}`,
                    thumbnail: item.thumbnail,
                    description: item.description,
                  }}
                />
              )}
              showsHorizontalScrollIndicator={true}
              contentContainerStyle={styles.contentListHorizontal}
              scrollEnabled={false}
            />
          </ScrollView>
        ) : (
          <ScrollView
            contentContainerStyle={{
              alignItems: "center",
              justifyContent: "flex-start",
              paddingBottom: 80,
            }}
          >
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
              <Text
                style={{
                  fontSize: THEME.FONT_SIZE.HOME_SUBTITLE,
                  color: THEME.COLORS.GRAY,
                  fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
                }}
              >
                Bem vindo ao Pontua Marvel
              </Text>
              <Text
                style={{
                  fontSize: THEME.FONT_SIZE.HOME_TITLE,
                  color: THEME.COLORS.DARK,
                  fontFamily: THEME.FONT_FAMILY.MEDIUM,
                  lineHeight: 38,
                }}
              >
                Escolha o seu personagem
              </Text>
              <Text
                style={{
                  fontSize: THEME.FONT_SIZE.HOME_SUBTITLE,
                  color: THEME.COLORS.GRAY,
                  fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
                }}
              >
                O Universo Marvel é o universo compartilhado onde ocorrem as
                histórias na maioria dos títulos de quadrinhos americanos e
                outras mídias publicadas pela Marvel Entertainment.
              </Text>
            </View>
            <View
              style={{
                paddingLeft: 24,
                marginBottom: 40,
                maxHeight: 280,
              }}
            >
              <Text
                style={{
                  color: THEME.COLORS.RED,
                  fontFamily: THEME.FONT_FAMILY.BOLD,
                  fontSize: THEME.FONT_SIZE.SECTION_TITLE,
                  marginBottom: 12,
                }}
              >
                Heróis
              </Text>
              <FlatList
                data={dataHeros
                  .slice(0, 22)
                  .filter(
                    (item) =>
                      !item.thumbnail.path.includes("/image_not_available")
                  )}
                keyExtractor={(item) => `${item.id}`}
                renderItem={({ item }) => (
                  <InfoCard
                    onPress={() =>
                      handleOpenHeroCard({
                        title: item.name,
                        id: `${item.id}`,
                        thumbnail: item.thumbnail,
                      })
                    }
                    data={{
                      title: item.name,
                      id: `${item.id}`,
                      thumbnail: item.thumbnail,
                    }}
                  />
                )}
                horizontal
                showsHorizontalScrollIndicator={true}
                contentContainerStyle={styles.contentList}
              />
            </View>
            <View style={{ paddingLeft: 24, marginBottom: 40, maxHeight: 280 }}>
              <Text
                style={{
                  color: THEME.COLORS.RED,
                  fontFamily: THEME.FONT_FAMILY.BOLD,
                  fontSize: THEME.FONT_SIZE.SECTION_TITLE,
                  marginBottom: 12,
                }}
              >
                Quadrinhos
              </Text>
              <FlatList
                data={dataComics
                  .slice(0, 22)
                  .filter(
                    (item) =>
                      !item.thumbnail.path.includes("/image_not_available")
                  )}
                keyExtractor={(item) => `${item.id}`}
                renderItem={({ item }) => (
                  <InfoCard
                    onPress={() =>
                      handleOpenHeroCard({
                        title: item.title,
                        id: `${item.id}`,
                        thumbnail: item.thumbnail,
                      })
                    }
                    data={{
                      title: item.title,
                      id: `${item.id}`,
                      thumbnail: item.thumbnail,
                    }}
                  />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.contentList}
              />
            </View>
            <View style={{ paddingLeft: 24, marginBottom: 40, maxHeight: 280 }}>
              <Text
                style={{
                  color: THEME.COLORS.RED,
                  fontFamily: THEME.FONT_FAMILY.BOLD,
                  fontSize: THEME.FONT_SIZE.SECTION_TITLE,
                  marginBottom: 12,
                }}
              >
                Séries
              </Text>
              <FlatList
                data={dataSeries
                  .slice(0, 22)
                  .filter(
                    (item) =>
                      !item.thumbnail.path.includes("/image_not_available")
                  )}
                keyExtractor={(item) => `${item.id}`}
                renderItem={({ item }) => (
                  <InfoCard
                    onPress={() =>
                      handleOpenHeroCard({
                        title: item.title,
                        id: `${item.id}`,
                        thumbnail: item.thumbnail,
                      })
                    }
                    data={{
                      title: item.title,
                      id: `${item.id}`,
                      thumbnail: item.thumbnail,
                    }}
                  />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.contentList}
              />
            </View>
            <View style={{ paddingLeft: 24, marginBottom: 40, maxHeight: 280 }}>
              <Text
                style={{
                  color: THEME.COLORS.RED,
                  fontFamily: THEME.FONT_FAMILY.BOLD,
                  fontSize: THEME.FONT_SIZE.SECTION_TITLE,
                  marginBottom: 12,
                }}
              >
                Eventos
              </Text>
              <FlatList
                data={dataEvents
                  .slice(0, 22)
                  .filter(
                    (item) =>
                      !item.thumbnail.path.includes("/image_not_available")
                  )}
                keyExtractor={(item) => `${item.id}`}
                renderItem={({ item }) => (
                  <InfoCard
                    onPress={() =>
                      handleOpenHeroCard({
                        title: item.title,
                        id: `${item.id}`,
                        thumbnail: item.thumbnail,
                      })
                    }
                    data={{
                      title: item.title,
                      id: `${item.id}`,
                      thumbnail: item.thumbnail,
                    }}
                  />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.contentList}
              />
            </View>
          </ScrollView>
        )}
      </View>
      {/* <Button title='Sign out' onPress={() => FIREBASE_AUTH.signOut()} /> */}
    </SafeAreaView>
  );
}
