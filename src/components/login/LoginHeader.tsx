import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppColors } from "../../theme/colors";

function LoginHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>
        Continue your journey to a healthier, more connected life
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    gap: 8,
  },
  title: {
    color: AppColors.primaryTextDark,
    fontSize: 30,
    fontWeight: "700",
  },
  subtitle: {
    color: AppColors.primaryTextDark,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    maxWidth: 320,
  },
});

export default LoginHeader;
