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

interface OpenCardProps {
  id: number;
  type?: string;
  title: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  description?: string | undefined | null;
  amountStories?: number | undefined;
  amountEvents?: number | undefined;
  amountSeries?: number | undefined;
  amountComics?: number | undefined;
}

export function Home() {
  const navigation = useNavigation();

  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("hero");

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

  function handleOpenHeroCard({
    id,
    title,
    thumbnail,
    description,
    amountStories,
    amountComics,
    amountEvents,
    amountSeries,
    type,
  }: OpenCardProps) {
    console.log(`Card type: ${type}`);
    if (type === undefined || type !== "hero") {
      navigation.navigate("info", {
        id,
        title,
        thumbnail,
        description,
      });
    } else {
      navigation.navigate("perfil", {
        id,
        title,
        thumbnail,
        description,
        amountStories,
        amountEvents,
        amountSeries,
        amountComics,
      });
    }
  }

  function handleOpenInfoCard({
    id,
    title,
    thumbnail,
    description,
  }: InfoCardProps) {
    navigation.navigate("info", {
      id,
      title,
      thumbnail,
      description,
    });
  }

  function chooseArray(filter: string) {
    switch (filter) {
      case "hero":
        let newarr =
          debouncedSearchTerm.length > 0
            ? filteredDataHeros.map(({ name, ...rest }) => {
                return { title: name, type: "hero", ...rest };
              })
            : dataHeros.map(({ name, ...rest }) => {
                return { title: name, type: "hero", ...rest };
              });
        return newarr.filter(
          (item) =>
            !item.thumbnail.path.includes("/image_not_available") &&
            item.description.length > 1
        );
      case "comics":
        let newarrcomics =
          debouncedSearchTerm.length > 0
            ? filteredDataComics.map(({ ...rest }) => ({
                type: "comics",
                ...rest,
              }))
            : dataComics.map(({ ...rest }) => ({ type: "comics", ...rest }));
        return newarrcomics.filter(
          (item) =>
            !item.thumbnail.path.includes("/image_not_available") &&
            item.description &&
            item.description !== null
        );
      case "events":
        let newarrevents =
          debouncedSearchTerm.length > 0
            ? filteredDataEvents.map(({ ...rest }) => ({
                type: "events",
                ...rest,
              }))
            : dataEvents.map(({ ...rest }) => ({ type: "events", ...rest }));
        return newarrevents.filter(
          (item) =>
            !item.thumbnail.path.includes("/image_not_available") &&
            item.description
        );
      case "series":
        let newarrseries =
          debouncedSearchTerm.length > 0
            ? filteredDataSeries.map(({ ...rest }) => ({
                ...rest,
                type: "series",
              }))
            : dataSeries.map(({ ...rest }) => ({ ...rest, type: "series" }));
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
    <SafeAreaView style={styles.container}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: 80,
        }}
      >
        <View style={styles.header}>
          {!searchBarOpen && (
            <TouchableOpacity style={styles.configButton}>
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
          <View style={styles.searchOpenContainer}>
            <View style={styles.filterBox}>
              <TouchableOpacity
                style={{
                  ...styles.filterButton,
                  backgroundColor:
                    selectedFilter === "hero"
                      ? THEME.COLORS.DARK
                      : THEME.COLORS.WHITE,
                }}
                onPress={() => setSelectedFilter("hero")}
              >
                <Text
                  style={{
                    ...styles.filterButtonLabel,
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
                  ...styles.filterButton,
                  backgroundColor:
                    selectedFilter === "comics"
                      ? THEME.COLORS.DARK
                      : THEME.COLORS.WHITE,
                }}
                onPress={() => setSelectedFilter("comics")}
              >
                <Text
                  style={{
                    ...styles.filterButtonLabel,
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
                  ...styles.filterButton,
                  backgroundColor:
                    selectedFilter === "series"
                      ? THEME.COLORS.DARK
                      : THEME.COLORS.WHITE,
                }}
                onPress={() => setSelectedFilter("series")}
              >
                <Text
                  style={{
                    ...styles.filterButtonLabel,
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
                  ...styles.filterButton,
                  backgroundColor:
                    selectedFilter === "events"
                      ? THEME.COLORS.DARK
                      : THEME.COLORS.WHITE,
                }}
                onPress={() => setSelectedFilter("events")}
              >
                <Text
                  style={{
                    ...styles.filterButtonLabel,
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
            <ScrollView contentContainerStyle={styles.searchContainer}>
              <FlatList
                data={arrFiltered as any}
                keyExtractor={(item) => `${item.id}`}
                renderItem={({ item }) => (
                  <InfoCardHorizontal
                    onPress={() =>
                      handleOpenHeroCard({
                        title: item.title,
                        type: item.type,
                        id: item.id,
                        thumbnail: item.thumbnail,
                        description: item.description,
                        amountStories: item?.stories?.available,
                        amountComics: item?.comics?.available,
                        amountEvents: item?.events?.available,
                        amountSeries: item?.series?.available,
                      })
                    }
                    data={{
                      title: item.title,
                      id: item.id,
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
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.homeContainer}>
            <View style={styles.infoBox}>
              <Text style={styles.subtitle}>Bem vindo ao Pontua Marvel</Text>
              <Text style={styles.title}>Escolha o seu personagem</Text>
              <Text style={styles.subtitle}>
                O Universo Marvel é o universo compartilhado onde ocorrem as
                histórias na maioria dos títulos de quadrinhos americanos e
                outras mídias publicadas pela Marvel Entertainment.
              </Text>
            </View>
            <View style={styles.listBox}>
              <Text style={styles.listBoxTitle}>Heróis</Text>
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
                        id: item.id,
                        thumbnail: item.thumbnail,
                        description: item.description,
                        amountStories: item.stories.available,
                        amountComics: item.comics.available,
                        amountEvents: item.events.available,
                        amountSeries: item.series.available,
                        type: "hero",
                      })
                    }
                    data={{
                      title: item.name,
                      id: item.id,
                      thumbnail: item.thumbnail,
                    }}
                  />
                )}
                horizontal
                showsHorizontalScrollIndicator={true}
                contentContainerStyle={styles.contentList}
              />
            </View>
            <View style={styles.listBox}>
              <Text style={styles.listBoxTitle}>Quadrinhos</Text>
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
                      handleOpenInfoCard({
                        title: item.title,
                        id: item.id,
                        thumbnail: item.thumbnail,
                        description: item.description,
                        amountStories: item.stories.available,
                        amountEvents: item.events.available,
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
            <View style={styles.listBox}>
              <Text style={styles.listBoxTitle}>Séries</Text>
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
                      handleOpenInfoCard({
                        title: item.title,
                        id: item.id,
                        thumbnail: item.thumbnail,
                        description: item.description,
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
            <View style={styles.listBox}>
              <Text style={styles.listBoxTitle}>Eventos</Text>
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
                      handleOpenInfoCard({
                        title: item.title,
                        id: item.id,
                        thumbnail: item.thumbnail,
                        description: item.description,
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
          </ScrollView>
        )}
      </View>
      {/* <Button title='Sign out' onPress={() => FIREBASE_AUTH.signOut()} /> */}
    </SafeAreaView>
  );
}
