import React from "react";
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import WeatherAndGreeting from "../components/home/WeatherAndGreeting";
import WeatherSlider, { WeatherSlide } from "../components/home/WeatherSlider";
import ProductSlider, { ProductSlide } from "../components/home/ProductSlider";
import ReferralCard from "../components/home/ReferralCard";
import YachtRewardCard from "../components/home/YachtRewardCard";
import { useHomeViewModel } from "../hooks/useHomeViewModel";

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

const PRODUCT_SLIDES: ProductSlide[] = [
  {
    id: "apple-watch-video",
    title: "Apple Watch Series 10",
    type: "video",
    source: require("../assets/home/productSlider/apple-watch.mp4"),
  },
  {
    id: "ipad-pro",
    title: "iPad Pro 2025",
    type: "image",
    source: require("../assets/home/productSlider/ipad.png"),
  },
];

function Home() {
  const { isLoading, refetch } = useHomeViewModel();
  const sliderItems = React.useMemo(() => WEATHER_SLIDES, []);
  const productSlides = React.useMemo(() => PRODUCT_SLIDES, []);

  return (
    <View style={styles.fullScreen}>
      <ImageBackground
        source={require("../assets/welcome/intro_background.png")}
        style={styles.background}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.safeArea}>
          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            bounces
            contentInsetAdjustmentBehavior="never"
            automaticallyAdjustContentInsets={false}
          >
            {/* weather */}
            <WeatherAndGreeting />

            {/* weather slider */}
            <WeatherSlider slides={sliderItems} />

            {/* products slider */}
            <ProductSlider slides={productSlides} />

            {/* referral card */}
            <ReferralCard />

            {/* yacht reward */}
            <YachtRewardCard />
          </ScrollView>
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
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 16,
    gap: 28,
    paddingTop: 16,
  },
});

export default Home;
