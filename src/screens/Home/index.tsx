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
import { FIREBASE_AUTH } from "../../../FirebaseConfig";
import { Character } from "../../@types/characters";
import { Comic } from "../../@types/comics";
import { Events } from "../../@types/events";
import { Series } from "../../@types/series";
import { GlassIcon, MarvelLogo } from "../../components/icons";
import { InfoCard, InfoCardProps } from "../../components/InfoCard";
import { api, API_HASH_KEY, API_PUBLIC_KEY } from "../../services/api";
import { THEME } from "../../themes";

import { styles } from "./styles";

interface SectionProps {
  dataComics: Comic[];
}

export function Home() {
  const navigation = useNavigation();

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

  return (
    <SafeAreaView
      style={{
        flex: 1,
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
            marginBottom: 40,
          }}
        >
          <MarvelLogo color={THEME.COLORS.RED} />
          <TouchableOpacity style={{ position: "absolute", right: 28 }}>
            <GlassIcon />
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
            histórias na maioria dos títulos de quadrinhos americanos e outras
            mídias publicadas pela Marvel Entertainment.
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
            data={dataHeros.filter(
              (item) => !item.thumbnail.path.includes("/image_not_available")
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
            data={dataComics.filter(
              (item) => !item.thumbnail.path.includes("/image_not_available")
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
            data={dataSeries.filter(
              (item) => !item.thumbnail.path.includes("/image_not_available")
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
            data={dataEvents.filter(
              (item) => !item.thumbnail.path.includes("/image_not_available")
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
      {/* <Button title='Sign out' onPress={() => FIREBASE_AUTH.signOut()} /> */}
    </SafeAreaView>
  );
}
