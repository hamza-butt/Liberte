import React from "react";
import {
    ImageBackground,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import CTAButton from "../components/common/CTAButton";
import IntroCard from "../components/login/IntroCard";
import CTATextField from "../components/common/CTATextField";
import { AppColors } from "../theme/colors";
import { useResetPasswordViewModel } from "../hooks/useResetPasswordViewModel";

const ResetPassword = () => {
    const navigation = useNavigation<any>();

    const {
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        isLoading,
        handleResetPassword
    } = useResetPasswordViewModel();

    return (
        <View style={styles.fullScreen}>
            <ImageBackground
                source={require("../assets/welcome/intro_background.png")}
                style={styles.background}
                imageStyle={styles.backgroundImage}
            />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.content}>
                    <IntroCard style={styles.card}>

                        <Text style={styles.title}>Reset Password</Text>
                        <Text style={styles.subtitle}>
                            Please enter your new password below.
                        </Text>

                        <CTATextField
                            label="New Password"
                            placeholder="Enter new password"
                            secureTextEntry={true}
                            value={password}
                            onChangeText={setPassword}
                        />

                        <CTATextField
                            label="Confirm Password"
                            placeholder="Confirm new password"
                            secureTextEntry={true}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />

                        <CTAButton
                            label="Reset Password"
                            variant="primary"
                            onPress={handleResetPassword}
                            isLoading={isLoading}
                            style={styles.button}
                        />

                        {/* Back Button */}
                        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                            <Text style={styles.backButtonText}>
                                {"Back to OTP"}
                            </Text>
                        </Pressable>
                    </IntroCard>
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
    },
    background: {
        ...StyleSheet.absoluteFillObject,
    },
    backgroundImage: {
        resizeMode: "cover",
    },
    safeArea: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: "center",
    },
    card: {
        gap: 24,
        padding: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        color: AppColors.primaryTextDark,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 14,
        color: "rgba(255, 255, 255, 0.7)",
        textAlign: "center",
        lineHeight: 20,
    },
    button: {
        marginTop: 16,
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

export default ResetPassword;
