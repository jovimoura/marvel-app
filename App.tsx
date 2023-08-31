import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_900Black,
} from "@expo-google-fonts/poppins";
import { StatusBar } from "expo-status-bar";
import { Loading } from "./src/components/Loading";
import { Routes } from "./src/routes";

import "react-native-gesture-handler";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_500Medium,
    Poppins_700Bold,
    Poppins_900Black,
  });
  return (
    <>
      <StatusBar style='dark' />
      {fontsLoaded ? <Routes /> : <Loading />}
    </>
  );
}
