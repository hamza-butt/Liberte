import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import { AppColors } from "../../theme/colors";

type CTATextFieldProps = {
  label: string;
  containerStyle?: StyleProp<ViewStyle>;
} & TextInputProps;

function CTATextField({ label, containerStyle, ...rest }: CTATextFieldProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor="rgba(19, 41, 61, 0.4)"
        {...rest}
        style={[styles.input, rest.style]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    color: AppColors.primaryTextDark,
    fontSize: 16,
    fontWeight: "600",
  },
  input: {
    height: 50,
    borderRadius: 15,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#13293D",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 5,
  },
});

export default CTATextField;
