import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { AppColors } from "../../theme/colors";

type ForgetPasswordProps = {
  rememberMe: boolean;
  onToggleRemember: () => void;
  onForgotPassword: () => void;
};

const checkedIcon = require("../../assets/common/checkbox_white.png");
const uncheckedIcon = require("../../assets/common/unchecked_white.png");

function ForgetPassword({
  rememberMe,
  onToggleRemember,
  onForgotPassword,
}: ForgetPasswordProps) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.checkboxRow} onPress={onToggleRemember}>
        <Image
          source={rememberMe ? checkedIcon : uncheckedIcon}
          style={styles.checkboxIcon}
        />
        <Text style={styles.metaText}>Remember me</Text>
      </Pressable>

      <Pressable style={styles.forgotButton} onPress={onForgotPassword}>
        <Text style={styles.forgotText}>Forgot password?</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  checkboxIcon: {
    width: 20,
    height: 20,
  },
  metaText: {
    color: AppColors.primaryTextDark,
    fontSize: 14,
  },
  forgotButton: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  forgotText: {
    color: AppColors.primaryTextDark,
    fontSize: 14,
    fontWeight: "600",
  },
});

export default ForgetPassword;
