import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { AppColors } from "../../theme/colors";

type IntroCardProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

function IntroCard({ children, style }: IntroCardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 28,
    padding: 20,
    backgroundColor: AppColors.whiteTranslucent,
    borderWidth: 1,
    borderColor: AppColors.whiteTranslucent,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 2,
    gap: 20,
  },
});

export default IntroCard;
