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
import { api } from "../../services/api";
import { THEME } from "../../themes";

import { styles } from "./styles";
import { useDebounce } from "../../hooks/useDebouce";
import {
  charactersEndpoint,
  comicsEndpoint,
  eventsEndpoint,
  seriesEndpoint,
} from "../../services/endpoints";

export function Home() {
  const navigation = useNavigation();

  const [searchBarOpen, setSearchBarOpen] = useState(false);

  const [dataHeros, setDataHeros] = useState<Character[]>([]);
  const [filteredDataHeros, setFilteredDataHeros] = useState<Character[]>([]);

  const [dataComics, setDataComics] = useState<Comic[]>([]);
  const [filteredDataComics, setFilteredDataComics] = useState<Comic[]>([]);

  const [dataSeries, setDataSeries] = useState<Series[]>([]);
  const [filteredDataSeries, setFilteredDataSeries] = useState<Series[]>([]);

  const [dataEvents, setDataEvents] = useState<Events[]>([]);
  const [filteredDataEvents, setFilteredDataEvents] = useState<Events[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 200);

  function handleSearchBar() {
    setSearchTerm("");
    setSearchBarOpen(!searchBarOpen);
  }

  function handleOpenHeroCard({ id, title, thumbnail }: InfoCardProps) {
    navigation.navigate("perfil", { id, title, thumbnail });
  }

  const [selectedFilter, setSelectedFilter] = useState("hero");

  function chooseArray(filter: string) {
    switch (filter) {
      case "hero":
        let newarr =
          debouncedSearchTerm.length > 0
            ? filteredDataHeros.map((item) => {
                const { name, ...rest } = item;
                return { title: name, ...rest };
              })
            : dataHeros.map((item) => {
                const { name, ...rest } = item;
                return { title: name, ...rest };
              });
        return newarr.filter(
          (item) =>
            !item.thumbnail.path.includes("/image_not_available") &&
            item.description.length > 1
        );
      case "comics":
        let newarrcomics =
          debouncedSearchTerm.length > 0 ? filteredDataComics : dataComics;
        return newarrcomics.filter(
          (item) =>
            !item.thumbnail.path.includes("/image_not_available") &&
            item.description &&
            item.description !== null
        );
      case "events":
        let newarrevents =
          debouncedSearchTerm.length > 0 ? filteredDataEvents : dataEvents;
        return newarrevents.filter(
          (item) =>
            !item.thumbnail.path.includes("/image_not_available") &&
            item.description
        );
      case "series":
        let newarrseries =
          debouncedSearchTerm.length > 0 ? filteredDataSeries : dataSeries;
        return newarrseries.filter(
          (item) =>
            !item.thumbnail.path.includes("/image_not_available") &&
            item.description
        );

      default:
        return dataComics.filter(
          (item) =>
            !item.thumbnail.path.includes("/image_not_available") &&
            item.description &&
            item.description !== null
        );
    }
  }

  const arrFiltered = chooseArray(selectedFilter);

  useEffect(() => {
    if (debouncedSearchTerm.length > 0) {
      api(charactersEndpoint + `&nameStartsWith=${debouncedSearchTerm}`)
        .then((response) => {
          let newarr = response.data.data.results.map((item: Character) => {
            const { name, ...rest } = item;
            return { title: name, ...rest };
          });
          newarr.filter(
            (item: Character) =>
              !item.thumbnail.path.includes("/image_not_available")
          );
          setFilteredDataHeros(newarr);
        })
        .catch((error) => {
          console.log("Api calls hero error filter: ", error);
        });

      api(comicsEndpoint + `&titleStartsWith=${debouncedSearchTerm}`)
        .then((response) => {
          let newarr = response.data.data.results.map((item: Character) => {
            const { name, id, ...rest } = item;
            return { title: name, id: `${id}`, ...rest };
          });
          newarr.filter(
            (item: Comic) =>
              !item.thumbnail.path.includes("/image_not_available") &&
              item.description
          );
          setFilteredDataComics(newarr);
        })
        .catch((error) => {
          console.log("Api calls comics error filter: ", error);
        });

      api(eventsEndpoint + `&nameStartsWith=${debouncedSearchTerm}`)
        .then((response) => {
          let newarr = response.data.data.results.map((item: Character) => {
            const { name, id, ...rest } = item;
            return { title: name, id: `${id}`, ...rest };
          });
          newarr.filter(
            (item: Events) =>
              !item.thumbnail.path.includes("/image_not_available") &&
              item.description
          );
          setFilteredDataEvents(newarr);
        })
        .catch((error) => {
          console.log("Api calls events error filter: ", error);
        });

      api(seriesEndpoint + `&titleStartsWith=${debouncedSearchTerm}`)
        .then((response) => {
          let newarr = response.data.data.results.map((item: Character) => {
            const { name, id, ...rest } = item;
            return { title: name, id: `${id}`, ...rest };
          });
          newarr.filter(
            (item: Series) =>
              !item.thumbnail.path.includes("/image_not_available") &&
              item.description
          );
          setFilteredDataSeries(newarr);
        })
        .catch((error) => {
          console.log("Api calls series error filter: ", error);
        });
    } else {
      api(charactersEndpoint)
        .then((response) => {
          setDataHeros(response.data.data.results);
        })
        .catch((error) => {
          console.log("Api calls hero error: ", error);
        });

      api(comicsEndpoint)
        .then((response) => {
          setDataComics(response.data.data.results);
        })
        .catch((error) => {
          console.log("Api calls comics error: ", error);
        });

      api(seriesEndpoint)
        .then((response) => {
          setDataSeries(response.data.data.results);
        })
        .catch((error) => {
          console.log("Api calls series error: ", error);
        });

      api(eventsEndpoint)
        .then((response) => {
          setDataEvents(response.data.data.results);
        })
        .catch((error) => {
          console.log("Api calls events error: ", error);
        });
    }
  }, [debouncedSearchTerm]);

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
              value={searchTerm}
              onChangeText={setSearchTerm}
              open={searchBarOpen}
              onPress={handleSearchBar}
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
                  backgroundColor:
                    selectedFilter === "hero"
                      ? THEME.COLORS.DARK
                      : THEME.COLORS.WHITE,
                  borderColor: THEME.COLORS.DARK,
                }}
                onPress={() => setSelectedFilter("hero")}
              >
                <Text
                  style={{
                    fontFamily: THEME.FONT_FAMILY.MEDIUM,
                    fontSize: THEME.FONT_SIZE.XS,
                    color:
                      selectedFilter === "hero"
                        ? THEME.COLORS.WHITE
                        : THEME.COLORS.DARK,
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
                  backgroundColor:
                    selectedFilter === "comics"
                      ? THEME.COLORS.DARK
                      : THEME.COLORS.WHITE,
                }}
                onPress={() => setSelectedFilter("comics")}
              >
                <Text
                  style={{
                    fontFamily: THEME.FONT_FAMILY.MEDIUM,
                    fontSize: THEME.FONT_SIZE.XS,
                    color:
                      selectedFilter === "comics"
                        ? THEME.COLORS.WHITE
                        : THEME.COLORS.DARK,
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
                  backgroundColor:
                    selectedFilter === "series"
                      ? THEME.COLORS.DARK
                      : THEME.COLORS.WHITE,
                  borderColor: THEME.COLORS.DARK,
                }}
                onPress={() => setSelectedFilter("series")}
              >
                <Text
                  style={{
                    fontFamily: THEME.FONT_FAMILY.MEDIUM,
                    fontSize: THEME.FONT_SIZE.XS,
                    color:
                      selectedFilter === "series"
                        ? THEME.COLORS.WHITE
                        : THEME.COLORS.DARK,
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
                  backgroundColor:
                    selectedFilter === "events"
                      ? THEME.COLORS.DARK
                      : THEME.COLORS.WHITE,
                  borderColor: THEME.COLORS.DARK,
                }}
                onPress={() => setSelectedFilter("events")}
              >
                <Text
                  style={{
                    fontFamily: THEME.FONT_FAMILY.MEDIUM,
                    fontSize: THEME.FONT_SIZE.XS,
                    color:
                      selectedFilter === "events"
                        ? THEME.COLORS.WHITE
                        : THEME.COLORS.DARK,
                  }}
                >
                  Eventos
                </Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={arrFiltered as any}
              keyExtractor={(item) => `${item.id}`}
              renderItem={({ item }) => (
                <InfoCardHorizontal
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
