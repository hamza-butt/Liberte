import React from "react";
import {
    ImageBackground,
    ScrollView,
    StyleSheet,
    View,
    Pressable,
    Image
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

                <Pressable onPress={handleBack} style={styles.backButton}>
                    <Image
                        source={require("../assets/common/arrow-right-white.png")}
                        style={styles.backIcon}
                    />
                </Pressable>

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
        position: 'absolute',
        top: 60,
        left: 24,
        zIndex: 10,
        padding: 8
    },
    backIcon: {
        width: 24,
        height: 24,
        transform: [{ rotate: "180deg" }]
    }
});

export default ForgotPassword;
