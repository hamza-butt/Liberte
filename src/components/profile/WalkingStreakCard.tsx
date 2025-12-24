import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { CalendarGrid, MonthlySteps } from "./CalendarGrid";
import { AppColors } from "../../theme/colors";



const mockData: MonthlySteps["monthly_steps"] = {
    "month": "December",
    "year": "2025",
    "total_steps": 193,
    "daily_goal": 10000,
    "goal_achieved_days": 0,
    "missed_days": 24,
    "daily_steps": {
        "2025-12-01": 0,
        "2025-12-02": 0,
        "2025-12-03": 0,
        "2025-12-04": 0,
        "2025-12-05": 0,
        "2025-12-06": 0,
        "2025-12-07": 0,
        "2025-12-08": 0,
        "2025-12-09": 0,
        "2025-12-10": 0,
        "2025-12-11": 0,
        "2025-12-12": 0,
        "2025-12-13": 0,
        "2025-12-14": 0,
        "2025-12-15": 0,
        "2025-12-16": 0,
        "2025-12-17": 0,
        "2025-12-18": 0,
        "2025-12-19": 120,
        "2025-12-20": 73,
        "2025-12-21": 0,
        "2025-12-22": 0,
        "2025-12-23": 0,
        "2025-12-24": 0,
        "2025-12-25": 0,
        "2025-12-26": 0,
        "2025-12-27": 0,
        "2025-12-28": 0,
        "2025-12-29": 0,
        "2025-12-30": 0,
        "2025-12-31": 0
    }
};

export const WalkingStreakCard = () => {
    return (
        <View style={styles.container}>

            {/* Header */}
            <View style={styles.header}>
                <Image
                    source={require("../../assets/profile/walkingStreak/fire.png")}
                    style={styles.fireIcon}
                    resizeMode="contain"
                />
                <Text style={styles.headerTitle}>
                    <Text style={styles.streakCount}>3 </Text>
                    Your {mockData.month.substring(0, 3)} walking streak
                </Text>
                <TouchableOpacity onPress={() => { }}>
                    <Image
                        source={require("../../assets/profile/walkingStreak/info.png")}
                        style={styles.infoIcon}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>

            {/* Calendar Grid */}
            <CalendarGrid data={mockData} />


            {/* Legend */}
            <View style={styles.legendContainer}>
                <View style={styles.legendItem}>
                    <Image source={require("../../assets/profile/calender/check.png")} style={styles.legendImage} resizeMode="contain" />
                    <Text style={styles.legendIconText}>Completed</Text>
                </View>
                <View style={styles.legendItem}>
                    <Image source={require("../../assets/profile/calender/cross.png")} style={styles.legendImage} resizeMode="contain" />
                    <Text style={styles.legendIconText}>Missed</Text>
                </View>
                <View style={styles.legendItem}>
                    <Image source={require("../../assets/profile/calender/lock.png")} style={styles.legendImage} resizeMode="contain" />
                    <Text style={styles.legendIconText}>Upcoming</Text>
                </View>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 24,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: AppColors.whiteTranslucent,
        backgroundColor: AppColors.whiteTranslucent,
        padding: 20,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },

    headerTitle: {
        flex: 1,
        color: "#fff",
        fontSize: 16,
        fontWeight: "500",
    },
    streakCount: {
        fontSize: 35,
        fontWeight: "bold",
    },
    fireIcon: {
        width: 50,
        height: 50,
        marginRight: 12,
    },
    infoIcon: {
        width: 30,
        height: 30,
    },


    // Legend
    legendContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        marginTop: 24,
    },
    legendItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    legendIconText: {
        fontSize: 14,
        opacity: 0.9,
        color: "#fff",
    },

    legendImage: {
        width: 30,
        height: 30,
    },
});
