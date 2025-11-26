import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { AppColors } from "../../theme/colors";

function BrandHeader() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/welcome/wern-logo.png")}
        style={styles.iconImage}
        resizeMode="contain"
      />
      <Text style={styles.brandName}>WERN</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
  },
  iconImage: {
    width: 35,
    height: 35,
  },
  brandName: {
    fontSize: 16,
    fontWeight: "300",
    color: AppColors.primaryTextDark,
  },
});

export default BrandHeader;
