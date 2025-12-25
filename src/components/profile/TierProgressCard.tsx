import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { AppColors } from "../../theme/colors";

interface TierProgressCardProps {
    currentTier: string;
    nextTierPoints: number;
    currentPoints: number;
    timeRemaining: string;
}

export const TierProgressCard = ({
    currentTier = "Bronze",
    nextTierPoints = 2000,
    currentPoints = 1000,
    timeRemaining = "13h 11min",
}: TierProgressCardProps) => {
    const progress = Math.min(Math.max(currentPoints / nextTierPoints, 0), 1);

    return (
        <View style={styles.container}>
            {/* Left Side: Tier Icon & Label */}
            <View style={styles.leftSection}>
                <Text style={styles.tierTitle}>{currentTier}</Text>
                <Text style={styles.tierSubtitle}>Tier</Text>
                <Image
                    source={require("../../assets/profile/bronze.png")}
                    style={styles.tierIcon}
                    resizeMode="contain"
                />
            </View>

            {/* Right Side: Progress Info */}
            <View style={styles.rightSection}>
                <View style={styles.headerRow}>
                    <Text style={styles.tierNameSmall}>{currentTier}</Text>
                    <Text style={styles.pointsText}>
                        {currentPoints}/{nextTierPoints}
                    </Text>
                </View>

                {/* Progress Bar */}
                <View style={styles.progressBarBackground}>
                    <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
                </View>

                {/* <Text style={styles.timeRemainingText}>
                    Time Remaining {timeRemaining}
                </Text> */}

                <Text style={styles.instructionText}>
                    Walk {nextTierPoints - currentPoints} more steps to maintain {currentTier} Tier.
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "rgba(160, 60, 20, 0.8)", // Fallback/base color similar to image
        borderRadius: 20,
        overflow: "hidden",
        minHeight: 160,
    },
    leftSection: {
        width: "35%",
        backgroundColor: "#703c10",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 20,
    },
    tierTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 2,
    },
    tierSubtitle: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 10,
    },
    tierIcon: {
        width: 60,
        height: 60,
    },
    rightSection: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        backgroundColor: "#a95d14"
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    tierNameSmall: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "500",
    },
    pointsText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "500",
    },
    progressBarBackground: {
        height: 6,
        backgroundColor: AppColors.whiteTranslucent,
        borderRadius: 3,
        marginBottom: 12,
        overflow: "hidden",
    },
    progressBarFill: {
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        borderRadius: 3,
    },
    timeRemainingText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
    },
    instructionText: {
        color: "rgba(255, 255, 255, 0.8)",
        fontSize: 12,
        lineHeight: 18,
    },
});
