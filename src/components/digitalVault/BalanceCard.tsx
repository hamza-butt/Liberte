import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { AppColors } from "../../theme/colors";

const BalanceCard = () => {
    return (
        <View style={styles.container}>

            {/* Available Litties */}
            <View style={styles.headerRow}>
                <Text style={styles.title}>Available Litties</Text>
                <View style={styles.transactionButton}>
                    <Image
                        source={require("../../assets/digitalVault/coin.png")}
                        style={styles.icon}
                    />
                    <Text style={styles.transactionText}>Transactions</Text>
                </View>
            </View>

            {/* Balance and Stats */}
            <View style={styles.contentRow}>
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: AppColors.whiteTranslucent,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: AppColors.whiteTranslucent,
        padding: 20,
        marginVertical: 10,
        overflow: "hidden",
        minHeight: 180,
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
        borderColor: AppColors.whiteTranslucent,
        borderWidth: 1,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    icon: {
        width: 16,
        height: 16,
        marginRight: 6,
        resizeMode: 'contain',
    },
    transactionText: {
        color: "white",
        fontSize: 12,
        fontWeight: "500",
    },
    contentRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
    },
    balanceContainer: {
        // Removed marginBottom to align better in row
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
        gap: 15, // Add gap between stat items
    },
    statItem: {
        alignItems: "center", // Center align text for stats
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
