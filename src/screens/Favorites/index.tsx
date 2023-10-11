import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  SafeAreaView,
} from "react-native";

import { collection, onSnapshot } from "firebase/firestore";

import { Character } from "../../@types/characters";
import { Comic } from "../../@types/comics";
import { Events } from "../../@types/events";
import { Series } from "../../@types/series";
import { MarvelLogo, MenuIcon } from "../../components/icons";
import { InfoCard } from "../../components/InfoCard";
import { api } from "../../services/api";
import { THEME } from "../../themes";

import { styles } from "./styles";

import {
  charactersEndpoint,
  comicsEndpoint,
  eventsEndpoint,
  seriesEndpoint,
} from "../../services/endpoints";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../../FirebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";

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

export function Favorites() {
  const navigation = useNavigation();
  const navigationDrawer = useNavigation<DrawerNavigationProp<{}>>();

  const [dataHeros, setDataHeros] = useState<Character[]>([]);
  const [favoritesHeroes, setFavoritesHeroes] = useState<Character[]>([]);

  const [dataComics, setDataComics] = useState<Comic[]>([]);
  const [favoritesComics, setFavoritesComics] = useState<Character[]>([]);

  const [dataSeries, setDataSeries] = useState<Series[]>([]);
  const [favoritesSeries, setFavoritesSeries] = useState<Character[]>([]);

  const [dataEvents, setDataEvents] = useState<Events[]>([]);
  const [favoritesEvents, setFavoritesEvents] = useState<Character[]>([]);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, [user]);

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

  function filterHeroPerId(array1: any[], array2: Character[]) {
    const idsHeroArray1 = array1.map((item) => item.idHero);
    const heroesFiltrados = array2.filter((hero) =>
      idsHeroArray1.includes(hero.id)
    );
    return heroesFiltrados;
  }

  function filterAllPerId(array1: any[], array2: any[]) {
    const idsAllArray1 = array1.map((item) => item.id);
    const allFiltrados = array2.filter((hero) =>
      idsAllArray1.includes(hero.id)
    );

    return allFiltrados.filter(item => item.id);
  }

  useEffect(() => {
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

    const favHeroesRef = collection(FIRESTORE_DB, "favoriteHeroes");
    const subscriberHeroes = onSnapshot(favHeroesRef, {
      next: (snapshot) => {
        const favs: any[] = [];
        snapshot.docs.forEach((doc) => {
          favs.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setFavoritesHeroes(favs.filter(item => item.idUser == user?.uid));
      },
    });
    const favComicsRef = collection(FIRESTORE_DB, "favoriteComics");
    const subscriberComics = onSnapshot(favComicsRef, {
      next: (snapshot) => {
        const favs: any[] = [];
        snapshot.docs.forEach((doc) => {
          favs.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setFavoritesComics(favs.filter(item => item.idUser == user?.uid));
      },
    });
    const favSeriesRef = collection(FIRESTORE_DB, "favoriteSeries");
    const subscriberSeries = onSnapshot(favSeriesRef, {
      next: (snapshot) => {
        const favs: any[] = [];
        snapshot.docs.forEach((doc) => {
          favs.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setFavoritesSeries(favs.filter(item => item.idUser == user?.uid));
      },
    });

    const favEventsRef = collection(FIRESTORE_DB, "favoriteEvents");
    const subscriberEvents = onSnapshot(favEventsRef, {
      next: (snapshot) => {
        const favs: any[] = [];
        snapshot.docs.forEach((doc) => {
          favs.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setFavoritesEvents(favs.filter(item => item.idUser == user?.uid));
      },
    });
  }, []);

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
          <TouchableOpacity
            onPress={() => navigationDrawer.openDrawer()}
            style={styles.configButton}
          >
            <MenuIcon />
          </TouchableOpacity>

          <MarvelLogo color={THEME.COLORS.RED} />
        </View>
        <ScrollView contentContainerStyle={styles.homeContainer}>
          <View style={styles.infoBox}>
            <Text style={styles.title}>Meus Favoritos</Text>
            <Text style={styles.subtitle}>
              Seus Hérois, Séries, Eventos e Histórias favoritas!
            </Text>
          </View>
          <View style={styles.listBox}>
            <Text style={styles.listBoxTitle}>Heróis</Text>
            <FlatList
              data={filterHeroPerId(favoritesHeroes, dataHeros)
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
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.contentList}
            />
          </View>
          <View style={styles.listBox}>
            <Text style={styles.listBoxTitle}>Quadrinhos</Text>
            <FlatList
              data={filterAllPerId(favoritesComics, dataComics)
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
          <View style={styles.listBox}>
            <Text style={styles.listBoxTitle}>Séries</Text>
            <FlatList
              data={filterAllPerId(favoritesSeries, dataSeries)
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
                      type: "series",
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
              data={filterAllPerId(favoritesEvents, dataEvents)
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
                      type: "events",
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
      </View>
    </SafeAreaView>
  );
}
