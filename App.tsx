import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { Loading } from "./src/components/Loading";
import { Routes } from "./src/routes";

export default function App() {
  const [fontsLoaded] = useFonts({
    GilroyRegular: require("./assets/fonts/gilroy/Gilroy-Regular.ttf"),
    GilroyMedium: require("./assets/fonts/gilroy/Gilroy-Medium.ttf"),
    GilroySemiBold: require("./assets/fonts/gilroy/Gilroy-SemiBold.ttf"),
    GilroyBold: require("./assets/fonts/gilroy/Gilroy-Bold.ttf"),
  });
  return (
    <>
      <StatusBar style='auto' />
      {fontsLoaded ? <Routes /> : <Loading />}
    </>
  );
}
