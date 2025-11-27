import React from "react";
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CTAButton from "../components/common/CTAButton";
import IntroCard from "../components/login/IntroCard";
import CTATextField from "../components/common/CTATextField";
import LoginHeader from "../components/login/LoginHeader";
import ForgetPassword from "../components/login/ForgetPassword";
import { AppColors } from "../theme/colors";
import { SafeAreaView } from "react-native-safe-area-context";

import { useLoginViewModel } from "../hooks/useLoginViewModel";

function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    isLoading,
    handleSignIn,
    handleSignUp,
    handleForgotPassword,
  } = useLoginViewModel();

  return (
    <View style={styles.fullScreen}>
      <ImageBackground
        source={require("../assets/welcome/intro_background.png")}
        style={styles.background}
        imageStyle={styles.backgroundImage}
      />

      <SafeAreaView style={[styles.safeArea, styles.contentWrapper]}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          bounces={true}
        >
          {/* intro header */}
          <LoginHeader />

          <IntroCard style={styles.fieldStack}>
            <CTATextField
              label="Email Address"
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <CTATextField
              label="Password"
              placeholder="Enter your password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <ForgetPassword
              rememberMe={rememberMe}
              onToggleRemember={() => setRememberMe((prev) => !prev)}
              onForgotPassword={handleForgotPassword}
            />

            <CTAButton
              label="Sign In"
              variant="primary"
              iconSource={require("../assets/common/arrow-right-white.png")}
              onPress={handleSignIn}
            />
          </IntroCard>

          {/* divider */}
          <View style={styles.divider}>
            <Text style={styles.dividerText}>Or continue with</Text>
          </View>

          {/* signup */}
          <Pressable style={styles.footer} onPress={handleSignUp}>
            <Text style={styles.footerText}>
              Don&apos;t have an account?{" "}
              <Text style={styles.linkText}>Sign up</Text>
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
  contentWrapper: {
    padding: 24,
  },
  content: {
    flexGrow: 1,
    gap: 28,
    paddingVertical: 24,
  },
  fieldStack: {
    gap: 25,
  },
  linkText: {
    color: AppColors.primaryTextDark,
    fontSize: 14,
    textDecorationLine: "underline",
    fontWeight: "600",
  },
  divider: {
    alignItems: "center",
  },
  dividerText: {
    color: AppColors.primaryTextDark,
    fontSize: 14,
  },
  socialRow: {
    flexDirection: "row",
    gap: 16,
  },
  googleIcon: {
    fontSize: 16,
    fontWeight: "700",
    color: "#EA4335",
  },
  appleIcon: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
  },
  footer: {
    alignItems: "center",
  },
  footerText: {
    color: AppColors.primaryTextDark,
    textAlign: "center",
    fontSize: 14,
  },
});

export default Login;
