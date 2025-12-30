import React from "react";
import {
    ImageBackground,
    ScrollView,
    StyleSheet,
    View,
    Pressable,
    Text
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppColors } from "../theme/colors";
import CTAButton from "../components/common/CTAButton";
import CTATextField from "../components/common/CTATextField";
import IntroCard from "../components/login/IntroCard";
import LoginHeader from "../components/login/LoginHeader";
import { useForgotPasswordViewModel } from "../hooks/useForgotPasswordViewModel";

function ForgotPassword() {
    const {
        email,
        setEmail,
        isLoading,
        handleSendOTP,
        handleBack
    } = useForgotPasswordViewModel();

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
                    {/* Reuse LoginHeader or make a new one if needed, keeping consistency */}
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

                        <CTAButton
                            label="Send OTP"
                            variant="primary"
                            iconSource={require("../assets/common/arrow-right-white.png")}
                            onPress={handleSendOTP}
                            isLoading={isLoading}
                        />

                        {/* Back Button */}
                        <Pressable onPress={handleBack} style={styles.backButton}>
                            <Text style={styles.backButtonText}>
                                {"Back to Login"}
                            </Text>
                        </Pressable>
                    </IntroCard>

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
    backButton: {
        marginTop: 24,
        alignItems: "center",
    },
    backButtonText: {
        color: "rgba(255, 255, 255, 0.5)",
        fontSize: 14,
        textDecorationLine: "underline",
    },
});

export default ForgotPassword;
