import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { AppColors } from "../../theme/colors";

function ReferralCard() {
  return (
    <ImageBackground
      source={require("../../assets/home/refer.png")}
      style={styles.card}
      imageStyle={styles.cardImage}
    ></ImageBackground>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: 150,
    borderRadius: 24,
    overflow: "hidden",
    justifyContent: "center",
  },
  cardImage: {
    borderRadius: 24,
    resizeMode: "cover",
  },
});

export default ReferralCard;
