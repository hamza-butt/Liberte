import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ImageBackground, ScrollView, StyleSheet, View } from "react-native";
import CTAButton from "../components/common/CTAButton";
import WelcomeFeatureItem from "../components/welcome/WelcomeFeatureItem";
import WelcomeHero from "../components/welcome/WelcomeHero";
import { AppColors } from "../theme/colors";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

function Intro() {
  const navigation = useNavigation<any>();
  const features = [
    {
      title: "Earn While Walking",
      subtitle: "100 steps = 1 Litty",
      iconSource: require("../assets/welcome/coins-solid-full_white.png"),
      iconBackgroundColor: AppColors.redDark,
    },
    {
      title: "Refer & Earn More",
      subtitle: "Invite friends and earn bonus rewards together",
      iconSource: require("../assets/welcome/share-nodes-solid-full_white.png"),
      iconBackgroundColor: AppColors.yellowDark,
    },
    {
      title: "Connect Safely",
      subtitle: "Meet other walkers and build community bonds",
      iconSource: require("../assets/welcome/users-solid-full_white.png"),
      iconBackgroundColor: AppColors.greenDark,
    },
    {
      title: "Stay Protected",
      subtitle: "Report issues and help keep your city safe",
      iconSource: require("../assets/welcome/shield-halved-solid-full_white.png"),
      iconBackgroundColor: AppColors.orangeDark,
    },
  ];

  return (
    <View style={styles.fullScreen}>
      {/* background Image */}
      <ImageBackground
        source={require("../assets/welcome/intro_background.png")}
        style={styles.background}
        imageStyle={styles.backgroundImage}
      />

      <SafeAreaView style={[styles.safeArea, styles.contentWrapper]}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          bounces={true}
        >
          {/* welcome image and title */}
          <WelcomeHero />

          {/* features list */}
          <View style={styles.features}>
            {features.map((feature) => (
              <WelcomeFeatureItem
                key={feature.title}
                title={feature.title}
                subtitle={feature.subtitle}
                iconSource={feature.iconSource}
                iconBackgroundColor={feature.iconBackgroundColor}
              />
            ))}
          </View>

          {/* get started and account button */}
          <View style={styles.buttonStack}>
            <CTAButton
              label="Get Started"
              variant="primary"
              iconSource={require("../assets/common/arrow-right-white.png")}
              onPress={() => navigation.navigate("Login")}
            />
            <CTAButton
              label="I already have an account"
              variant="secondary"
              onPress={() => navigation.navigate("Login")}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  fullScreen: {
    flex: 1,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundImage: {
    resizeMode: "cover",
  },
  contentWrapper: {
    padding: 24,
  },
  buttonStack: {
    gap: 16,
  },
  content: {
    flexGrow: 1,
    paddingVertical: 16,
    gap: 24,
  },
  features: {
    gap: 14,
  },
});

export default Intro;
