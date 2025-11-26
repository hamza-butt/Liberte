import React from "react";
import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import { AppColors } from "../../theme/colors";

function HeaderActions() {
  return (
    <View style={styles.container}>
      {/* balance pill */}
      <Pressable
        style={({ pressed }) => [
          styles.balancePill,
          pressed && styles.actionPressed,
        ]}
      >
        <Image
          source={require("../../assets/welcome/wern-logo.png")}
          style={styles.iconImage}
          resizeMode="contain"
        />
        <Text style={styles.balanceValue}>511</Text>
        <Text style={styles.balanceLabel}>Litties</Text>
      </Pressable>

      {/* notification */}
      <Pressable
        style={({ pressed }) => [
          styles.roundButton,
          pressed && styles.actionPressed,
        ]}
      >
        <Image
          source={require("../../assets/welcome/wern-logo.png")}
          style={styles.iconImage}
          resizeMode="contain"
        />
      </Pressable>

      {/* profile */}
      <Pressable
        hitSlop={8}
        style={({ pressed }) => [
          styles.avatar,
          pressed && styles.actionPressed,
        ]}
      >
        <Image
          source={require("../../assets/common/profile.png")}
          style={styles.profileiconImage}
          resizeMode="contain"
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderColor: AppColors.orangeDark,
  },
  balancePill: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: AppColors.whiteTranslucent,
    backgroundColor: AppColors.whiteTranslucent,
    gap: 3,
  },
  iconImage: {
    width: 20,
    height: 20,
  },

  balanceValue: {
    fontSize: 16,
    fontWeight: "700",
    color: AppColors.primaryTextDark,
  },
  balanceLabel: {
    fontSize: 14,
    color: AppColors.primaryTextDark,
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: AppColors.whiteTranslucent,
    backgroundColor: AppColors.whiteTranslucent,
    justifyContent: "center",
    alignItems: "center",
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: AppColors.whiteTranslucent,
    justifyContent: "center",
    alignItems: "center",
  },

  profileiconImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  actionPressed: {
    opacity: 0.7,
  },
});

export default HeaderActions;
