import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import { AppColors } from "../../theme/colors";
import { useUser } from "../../context/UserContext";
import ProfileDropdown from "./ProfileDropdown";
import { setToken, setRememberMe } from "../../utils/storage";
import { useNavigation, CommonActions } from "@react-navigation/native";
import Toast from "react-native-toast-message";

function HeaderActions() {
  const { user, setUser } = useUser();
  const navigation = useNavigation();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isLightMode, setIsLightMode] = useState(true);

  const handleOptionSelect = async (option: string) => {
    setDropdownVisible(false);

    if (option === "Profile") {
      navigation.navigate("Profile" as never);
    }

    if (option === "Refer & Earn") {
      navigation.navigate("ReferAndEarn" as never);
    }

    if (option === "Logout") {
      await setToken("");
      await setRememberMe(false);
      setUser(null);

      Toast.show({
        type: "success",
        text1: "Logout Successful",
        text2: "You have been logged out successfully",
      });

      // Navigate toLogin
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }],
        })
      );
    }
    // Handle other options like Navigation here
    console.log("Selected:", option);
  };

  const handleToggleTheme = () => {
    setIsLightMode(!isLightMode);
  };

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
        <Text style={styles.balanceValue}>{user?.card_points || "0"}</Text>
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
      <View style={{ zIndex: 2000 }}>
        <Pressable
          hitSlop={8}
          onPress={() => setDropdownVisible(!isDropdownVisible)}
          style={({ pressed }) => [
            styles.avatar,
            pressed && styles.actionPressed,
          ]}
        >
          <Image
            source={
              user?.user_image
                ? { uri: user.user_image }
                : require("../../assets/common/profile.png")
            }
            style={styles.profileiconImage}
            resizeMode="cover"
          />
        </Pressable>

        {isDropdownVisible && (
          <ProfileDropdown
            onOptionSelect={handleOptionSelect}
            isLightMode={isLightMode}
            onToggleTheme={handleToggleTheme}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
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
