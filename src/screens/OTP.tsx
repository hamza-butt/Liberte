import React, { useState } from "react";
import {
    ImageBackground,
    StyleSheet,
    Text,
    View,
    Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { useNavigation, useRoute } from "@react-navigation/native";
import CTAButton from "../components/common/CTAButton";
import IntroCard from "../components/login/IntroCard";
import { AppColors } from "../theme/colors";
import { useOTPViewModel } from "../hooks/useOTPViewModel";

const CELL_COUNT = 6;

const OTP = () => {
    const navigation = useNavigation<any>();
    const {
        otp,
        setOtp,
        isLoading,
        handleVerify,
        handleResend,
        email,
    } = useOTPViewModel();

    const ref = useBlurOnFulfill({ value: otp, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value: otp,
        setValue: setOtp,
    });

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

                        {/* Title and Subtitle */}
                        <Text style={styles.title}>Verification Code</Text>
                        <Text style={styles.subtitle}>
                            We have sent the verification code to your email address
                            {email ? ` ${email}` : ""}
                        </Text>

                        {/* OTP Input */}
                        <CodeField
                            ref={ref}
                            {...props}
                            value={otp}
                            onChangeText={setOtp}
                            cellCount={CELL_COUNT}
                            rootStyle={styles.codeFieldRoot}
                            keyboardType="number-pad"
                            textContentType="oneTimeCode"
                            renderCell={({ index, symbol, isFocused }) => (
                                <View
                                    key={index}
                                    style={[styles.cell, isFocused && styles.focusCell]}
                                    onLayout={getCellOnLayoutHandler(index)}
                                >
                                    <Text style={styles.cellText}>
                                        {symbol || (isFocused ? <Cursor /> : null)}
                                    </Text>
                                </View>
                            )}
                        />

                        {/* Verify Button */}
                        <CTAButton
                            label="Verify"
                            variant="primary"
                            onPress={handleVerify}
                            style={styles.button}
                            isLoading={isLoading}
                        />

                        {/* Resend Button */}
                        <View style={styles.resendContainer}>
                            <Text style={styles.resendText}>Did not receive the code? </Text>
                            <Pressable onPress={handleResend}>
                                <Text style={styles.resendLink}>Resend</Text>
                            </Pressable>
                        </View>

                        {/* Back Button */}
                        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                            <Text style={styles.backButtonText}>Back to Signup</Text>
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
    codeFieldRoot: {
        marginTop: 10,
        gap: 8,
        justifyContent: "center",
    },
    cell: {
        width: 45,
        height: 55,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.2)",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        justifyContent: "center",
        alignItems: "center",
    },
    focusCell: {
        borderColor: AppColors.primaryTextDark,
        backgroundColor: AppColors.whiteTranslucent,
    },
    cellText: {
        fontSize: 24,
        color: AppColors.primaryTextDark,
        fontWeight: "600",
    },
    button: {
        marginTop: 16,
    },
    resendContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    resendText: {
        color: "rgba(255, 255, 255, 0.7)",
        fontSize: 14,
    },
    resendLink: {
        color: AppColors.yellowDark,
        fontSize: 14,
        fontWeight: "600",
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

export default OTP;
