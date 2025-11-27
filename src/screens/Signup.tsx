import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CTAButton from "../components/common/CTAButton";
import CTATextField from "../components/common/CTATextField";
import IntroCard from "../components/login/IntroCard";
import LoginHeader from "../components/login/LoginHeader";
import { AppColors } from "../theme/colors";

function Signup() {
  const navigation = useNavigation<any>();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");

  const handleSignup = () => { };
  const handleNavigateToLogin = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.fullScreen}>
      <ImageBackground
        source={require("../assets/welcome/intro_background.png")}
        style={styles.background}
        imageStyle={styles.backgroundImage}
      />

      <SafeAreaView style={[styles.safeArea]}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          bounces={true}
        >
          <LoginHeader />

          <IntroCard style={styles.form}>
            <CTATextField
              label="Full Name"
              placeholder="Enter your name"
              autoCapitalize="words"
              value={fullName}
              onChangeText={setFullName}
            />

            <CTATextField
              label="Email Address"
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <CTATextField
              label="Phone Number"
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />

            <CTATextField
              label="Password"
              placeholder="Enter your password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <CTATextField
              label="Confirm Password"
              placeholder="Re-enter your password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            <CTATextField
              label="Referral Code"
              placeholder="Enter referral code"
              autoCapitalize="characters"
              value={referralCode}
              onChangeText={setReferralCode}
            />

            <CTAButton
              label="Sign Up"
              variant="primary"
              iconSource={require("../assets/common/arrow-right-white.png")}
              onPress={handleSignup}
            />
          </IntroCard>

          <Pressable style={styles.footer} onPress={handleNavigateToLogin}>
            <Text style={styles.footerText}>
              Already have an account?{" "}
              <Text style={styles.linkText}>Sign In</Text>
            </Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  fullScreen: {
    flex: 1,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundImage: {
    resizeMode: "cover",
  },
  content: {
    flexGrow: 1,
    gap: 24,
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  form: {
    gap: 25,
  },
  footer: {
    alignItems: "center",
    marginTop: 12,
  },
  footerText: {
    color: AppColors.primaryTextDark,
    fontSize: 14,
  },
  linkText: {
    color: AppColors.primaryTextDark,
    fontSize: 14,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});

export default Signup;
