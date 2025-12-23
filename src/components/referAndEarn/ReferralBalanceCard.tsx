import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { AppColors } from "../../theme/colors";
import Toast from "react-native-toast-message";
import Clipboard from '@react-native-clipboard/clipboard';

interface ReferralBalanceCardProps {
    balance: number;
    referral_link: string;
    totalReferrals: number;
}

const ReferralBalanceCard = ({ balance, referral_link, totalReferrals }: ReferralBalanceCardProps) => {

    const handleCopy = () => {
        Clipboard.setString(referral_link);
        Toast.show({
            type: "success",
            text1: "Copied!",
            text2: "Referral link copied to clipboard.",
        });
    };

    return (
        <View style={styles.card}>
            {/* 3D Icon - Absolutely positioned to overlap cleanly */}
            <Image
                source={require("../../assets/ReferAndEarn/referralBalance/litties-container.png")}
                style={styles.moneyBagIcon}
                resizeMode="contain"
            />

            {/* Text Content */}
            <View style={styles.contentContainer}>
                <Text style={styles.label}>Referral Balance</Text>
                <Text style={styles.balance}>{balance} Litties</Text>


                {/* Referral Count */}
                <View style={styles.referralCountContainer}>
                    <Image
                        source={require("../../assets/ReferAndEarn/referralBalance/user-solid-full.png")}
                        style={styles.referralIcon}
                    />
                    <Text style={styles.referralCount}>{String(totalReferrals).padStart(2, '0')} Total Referral</Text>
                </View>


                {/* copy label */}
                <Text style={styles.copyLabel}>Copy & Share your referral link</Text>
            </View>

            {/* Link Copy Bar */}
            <View style={styles.linkWrapper}>
                <View style={styles.linkContainer}>
                    <Text style={styles.linkText} numberOfLines={1}>{referral_link}</Text>
                    <TouchableOpacity style={styles.copyButton} onPress={handleCopy}>
                        <Text style={styles.copyButtonText}>Copy</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: '100%',
        backgroundColor: AppColors.whiteTranslucent,
        borderRadius: 24,
        padding: 24,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.2)",
        // overflow: "hidden", // Removed to allow image to float out
        minHeight: 220,
        justifyContent: "space-between",
    },
    moneyBagIcon: {
        position: "absolute",
        right: -20,
        top: -30,
        width: 140,
        height: 140,
        zIndex: 1,
        opacity: 1,
    },
    contentContainer: {
        zIndex: 2,
        marginBottom: 20,
        paddingRight: 100, // Make room for the image
    },
    label: {
        color: "#fff",
        fontSize: 15,
        opacity: 0.9,
        marginBottom: 4,
        fontWeight: "500",
    },
    balance: {
        color: "#fff",
        fontSize: 34,
        fontWeight: "800",
        marginBottom: 12,
        letterSpacing: 0.5,
    },
    referralCountContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
        gap: 6,
    },
    referralIcon: {
        width: 14,
        height: 14,
        tintColor: "#fff",
    },
    referralCount: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "600",
    },
    copyLabel: {
        color: "#fff",
        fontSize: 13,
        opacity: 0.8,
        marginTop: 8,
    },
    linkWrapper: {
        zIndex: 2,
    },
    linkContainer: {
        backgroundColor: AppColors.whiteTranslucent,
        borderRadius: 25,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 6,
        paddingHorizontal: 6,
        paddingLeft: 20,
        height: 52,

        borderWidth: 1,
        borderColor: AppColors.whiteTranslucent,
    },
    linkText: {
        flex: 1,
        color: "#fff",
        fontSize: 14,
        marginRight: 10,
    },
    copyButton: {
        backgroundColor: "#FACC15",
        borderRadius: 100, // Pill shape
        height: "100%",
        justifyContent: "center",
        paddingHorizontal: 24,
    },
    copyButtonText: {
        color: "#000",
        fontWeight: "700",
        fontSize: 14,
    },
});

export default ReferralBalanceCard;
