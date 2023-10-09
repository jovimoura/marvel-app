import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Character } from "../../@types/characters";
import { Comic } from "../../@types/comics";
import { Events } from "../../@types/events";
import { Series } from "../../@types/series";
import { ArrowBackIcon, MarvelLogo, MenuIcon } from "../../components/icons";
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
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { SeeAllPageParams } from "../../@types/navigation";

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

export function SeeAll() {
  const navigation = useNavigation();

  const route = useRoute();
  const perfil = route.params as SeeAllPageParams;

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
    if (type === undefined || type !== "hero") {
      navigation.navigate("info", {
        id,
        title,
        thumbnail,
        description,
        type,
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
    type,
  }: OpenCardProps) {
    navigation.navigate("info", {
      id,
      title,
      thumbnail,
      description,
      type,
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

  function renderItems() {
    switch (perfil.type) {
      case "heroes":
        const heroes = dataHeros.filter(item => !item.thumbnail.path.includes("/image_not_available")).map(({ name, description, ...rest }) => ({
          typeArr: "heroes",
          description: description.length > 0 ? description : '...',
          title: name,
          ...rest,
        }));
        return heroes;
      case "comics":
        const comics = dataComics.filter(item => !item.thumbnail.path.includes("/image_not_available")).map(({ description, ...rest }) => ({
          typeArr: "comics",
          description: description ? description : '...',
          ...rest,
        }));
        return comics;
      case "events":
        const events = dataEvents.filter(item => !item.thumbnail.path.includes("/image_not_available")).map(({ description,...rest }) => ({
          typeArr: "events",
          description: description ? description : '...',
          ...rest,
        }));
        return events;
      case "series":
        const series = dataSeries.filter(item => !item.thumbnail.path.includes("/image_not_available")).map(({ description,...rest }) => ({
          typeArr: "series",
          description: description ? description : '...',
          ...rest,
        }));
        return series;

      default:
        break;
    }
  }

  useEffect(() => {
    if (debouncedSearchTerm.length > 0) {
      switch (perfil.type) {
        case "heroes":
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
          break;
        case "comics":
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
          break;

        case "events":
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
          break;
        case "series":
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
          break;

        default:
          break;
      }
    } else {
      switch (perfil.type) {
        case "heroes":
          api(charactersEndpoint)
            .then((response) => {
              setDataHeros(response.data.data.results);
            })
            .catch((error) => {
              console.log("Api calls hero error: ", error);
            });
          break;
        case "comics":
          api(comicsEndpoint)
            .then((response) => {
              setDataComics(response.data.data.results);
            })
            .catch((error) => {
              console.log("Api calls comics error: ", error);
            });
          break;
        case "events":
          api(eventsEndpoint)
            .then((response) => {
              setDataEvents(response.data.data.results);
            })
            .catch((error) => {
              console.log("Api calls events error: ", error);
            });
          break;
        case "series":
          api(seriesEndpoint)
            .then((response) => {
              setDataSeries(response.data.data.results);
            })
            .catch((error) => {
              console.log("Api calls series error: ", error);
            });
          break;

        default:
          break;
      }
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
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.configButton}
            >
              <ArrowBackIcon />
            </TouchableOpacity>
          )}
          <MarvelLogo
            color={!searchBarOpen ? THEME.COLORS.RED : THEME.COLORS.WHITE}
          />
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
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.contentListHorizontal}
                scrollEnabled={false}
              />
            </ScrollView>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.homeContainer}>
            <FlatList
              data={renderItems() as any}
              keyExtractor={(item) => `${item.id}`}
              renderItem={({ item }) => (
                <InfoCardHorizontal
                  key={item.id}
                  onPress={() =>
                    handleOpenInfoCard({
                      title: item.title,
                      id: item.id,
                      thumbnail: item.thumbnail,
                      description: item.description,
                      type: item.typeArr,
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
              scrollEnabled
            />
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}
