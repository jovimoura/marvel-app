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
import { GlassIcon, MarvelLogo } from "../../components/icons";
import { InfoCard, InfoCardProps } from "../../components/InfoCard";
import { api, API_HASH_KEY, API_PUBLIC_KEY } from "../../services/api";
import { THEME } from "../../themes";

import { styles } from "./styles";

export function Home() {
  const navigation = useNavigation();

  const [data, setData] = useState<Character[]>([]);

  function handleOpenHeroCard({ id, title, thumbnail }: InfoCardProps) {
    navigation.navigate("perfil", { id, title, thumbnail });
  }

  useEffect(() => {
    api(
      `/v1/public/characters?ts=1&apikey=${API_PUBLIC_KEY}&hash=${API_HASH_KEY}`
    )
      .then((response) => {
        setData(response.data.data.results);
      })
      .catch((error) => {
        console.log("Api calls error: ", error);
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
        <View style={{ paddingLeft: 24 }}>
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
            data={data.filter(
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
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contentList}
          />
        </View>
      </ScrollView>
      {/* <Button title='Sign out' onPress={() => FIREBASE_AUTH.signOut()} /> */}
    </SafeAreaView>
  );
}
