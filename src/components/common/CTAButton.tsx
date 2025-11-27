import React from "react";
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { AppColors } from "../../theme/colors";

export type CTAButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: "primary" | "secondary";
  iconSource?: ImageSourcePropType;
  icon?: React.ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
  style?: StyleProp<ViewStyle>;
};

function CTAButton({
  label,
  onPress,
  variant = "primary",
  iconSource,
  icon,
  disabled = false,
  isLoading = false,
  style,
}: CTAButtonProps) {
  const variantStyle =
    variant === "primary" ? styles.primaryButton : styles.secondaryButton;

  const isButtonDisabled = disabled || isLoading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isButtonDisabled }}
      disabled={isButtonDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        variantStyle,
        pressed && styles.pressed,
        isButtonDisabled && styles.disabled,
        style,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color={AppColors.primaryTextDark} />
      ) : (
        <>
          {iconSource ? (
            <View style={styles.iconWrapper}>
              <Image
                source={iconSource}
                style={styles.iconImage}
                resizeMode="contain"
              />
            </View>
          ) : icon ? (
            <View style={styles.iconWrapper}>{icon}</View>
          ) : null}
          <Text style={styles.label}>{label}</Text>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 50,
    alignSelf: "stretch",
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 5,
    elevation: 6,
  },
  primaryButton: {
    backgroundColor: AppColors.ctaGradientStart,
    experimental_backgroundImage: [
      {
        type: "linear-gradient",
        direction: "to right",
        colorStops: [
          { color: AppColors.ctaGradientStart },
          { color: AppColors.ctaGradientEnd },
        ],
      },
    ],
  },
  secondaryButton: {
    backgroundColor: AppColors.whiteTranslucent,
  },
  label: {
    color: AppColors.primaryTextDark,
    fontSize: 18,
    fontWeight: "700",
  },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    width: 35,
    height: 35,
    tintColor: AppColors.primaryTextDark,
  },
  pressed: {
    opacity: 0.9,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default CTAButton;
