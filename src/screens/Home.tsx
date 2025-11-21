import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import BrandHeader from "../components/home/BrandHeader";
import HeaderActions from "../components/home/HeaderActions";
import WeatherAndGreeting from "../components/home/WeatherAndGreeting";
import WeatherSlider, { WeatherSlide } from "../components/home/WeatherSlider";

const WEATHER_SLIDES: WeatherSlide[] = [
  {
    id: "kids-labubu",
    image: require("../assets/home/slider/s1.png"),
  },
  {
    id: "forest-run",
    image: require("../assets/home/slider/s2.png"),
  },
  {
    id: "city-sprint",
    image: require("../assets/home/slider/s3.png"),
  },
  {
    id: "night-walk",
    image: require("../assets/home/slider/s4.png"),
  },
  {
    id: "river-hike",
    image: require("../assets/home/slider/s5.png"),
  },
];

function Home() {
  const navigation = useNavigation();
  const renderHeaderActions = React.useCallback(() => <HeaderActions />, []);
  const sliderItems = React.useMemo(() => WEATHER_SLIDES, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <BrandHeader />,
      headerRight: renderHeaderActions,
      unstable_headerRightItems: () => [
        {
          type: "custom",
          element: renderHeaderActions(),
          hidesSharedBackground: true,
        },
      ],
    });
  }, [navigation, renderHeaderActions]);

  return (
    <View style={styles.fullScreen}>
      <ImageBackground
        source={require("../assets/welcome/intro_background.png")}
        style={styles.background}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.safeArea}>
          {/* weather */}
          <WeatherAndGreeting />

          {/* weather slider */}
          <WeatherSlider slides={sliderItems} />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  backgroundImage: {
    resizeMode: "cover",
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 28,
    justifyContent: "flex-start",
  },
});

export default Home;
