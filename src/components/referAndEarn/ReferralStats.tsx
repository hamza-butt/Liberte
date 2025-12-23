import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { AppColors } from "../../theme/colors";

const ReferralStats = () => {
    return (
        <View style={styles.container}>
            {/* Direct Referrals Card */}
            <View style={styles.card}>
                {/* Placeholder for Coins Icon */}
                <View style={styles.iconPlaceholder}>
                    {/* Using a temporary asset or shape */}
                    <View style={[styles.circle, { backgroundColor: "#FACC15" }]} />
                    <View style={[styles.circle, { backgroundColor: "#FACC15", position: 'absolute', top: 10, right: 20 }]} />
                </View>

                <Text style={styles.number}>3</Text>
                <Text style={styles.label}>Direct Referrals</Text>
            </View>

            {/* Total Network Card */}
            <View style={styles.card}>
                {/* Placeholder for People Icon */}
                <View style={styles.iconPlaceholder}>
                    {/* Using a temporary asset or shape */}
                    <View style={[styles.circle, { backgroundColor: "#4F46E5" }]} />
                    <View style={[styles.circle, { backgroundColor: "#4F46E5", position: 'absolute', top: 10, left: 20 }]} />
                </View>

                <Text style={styles.number}>12</Text>
                <Text style={styles.label}>Total Network</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 16,
    },
    card: {
        flex: 1,
        backgroundColor: AppColors.whiteTranslucent,
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.3)",
        minHeight: 160,
    },
    iconPlaceholder: {
        height: 60,
        width: 80,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    number: {
        color: "#fff",
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 4,
    },
    label: {
        color: "#fff",
        fontSize: 14,
        opacity: 0.9,
        textAlign: "center",
    },
});

export default ReferralStats;
