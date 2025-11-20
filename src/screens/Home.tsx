import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { AppColors } from "../theme/colors";
import BrandHeader from "../components/home/BrandHeader";
import HeaderActions from "../components/home/HeaderActions";

function Home() {
  const navigation = useNavigation();
  const renderHeaderActions = React.useCallback(() => <HeaderActions />, []);

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
          <Text style={styles.placeholderText}>Home Screen</Text>
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
    justifyContent: "space-between",
  },
  placeholderText: {
    color: AppColors.primaryTextDark,
    fontSize: 18,
  },
});

export default Home;
