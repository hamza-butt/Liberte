import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { AppColors } from "../../theme/colors";

const BalanceCard = () => {
    return (
        <View style={styles.container}>
            {/* Background Gradient Simulation */}
            <View style={styles.backgroundOverlay} />

            <View style={styles.headerRow}>
                <Text style={styles.title}>Available Litties</Text>
                <TouchableOpacity style={styles.transactionButton}>
                    {/* Placeholder for icon */}
                    <View style={styles.iconPlaceholder} />
                    <Text style={styles.transactionText}>Transactions</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.balanceContainer}>
                <Text style={styles.balanceLabel}>Available Balance</Text>
                <Text style={styles.balanceValue}>6 Litties</Text>
            </View>

            <View style={styles.statsRow}>
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>3.1</Text>
                    <Text style={styles.statLabel}>Km</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>247.76</Text>
                    <Text style={styles.statLabel}>Calories</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>6194</Text>
                    <Text style={styles.statLabel}>Steps</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: AppColors.whiteTranslucent,
        borderRadius: 20,
        padding: 20,
        marginVertical: 10,
        overflow: "hidden",
        minHeight: 180,
    },
    backgroundOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(255, 255, 255, 0.1)", // Subtle overlay
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    title: {
        color: "white",
        fontSize: 18,
        fontWeight: "600",
    },
    transactionButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    iconPlaceholder: {
        width: 16,
        height: 16,
        backgroundColor: AppColors.yellowDark,
        borderRadius: 8,
        marginRight: 6,
    },
    transactionText: {
        color: "white",
        fontSize: 12,
        fontWeight: "500",
    },
    balanceContainer: {
        marginBottom: 20,
    },
    balanceLabel: {
        color: "rgba(255, 255, 255, 0.8)",
        fontSize: 14,
        marginBottom: 4,
    },
    balanceValue: {
        color: "white",
        fontSize: 32,
        fontWeight: "bold",
    },
    statsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 40, // Give some space
    },
    statItem: {
        alignItems: "flex-start",
    },
    statValue: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    statLabel: {
        color: "rgba(255, 255, 255, 0.8)",
        fontSize: 12,
    },
});

export default BalanceCard;
