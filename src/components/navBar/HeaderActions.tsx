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
          source={require("../../assets/tabbar/Wallet_dark.png")}
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
          source={require("../../assets/tabbar/bell_white.png")}
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
    height: 30,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: AppColors.whiteTranslucent,
    backgroundColor: AppColors.whiteTranslucent,
    gap: 3,
  },
  iconImage: {
    width: 12,
    height: 12,
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
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: AppColors.whiteTranslucent,
    backgroundColor: AppColors.whiteTranslucent,
    justifyContent: "center",
    alignItems: "center",
  },

  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: AppColors.whiteTranslucent,
    justifyContent: "center",
    alignItems: "center",
  },

  profileiconImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },

  actionPressed: {
    opacity: 0.7,
  },
});

export default HeaderActions;
