import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { CalendarGrid } from "./CalendarGrid";
import { AppColors } from "../../theme/colors";
import { MonthlyStepsData } from "../../types/ProfileTypes";

interface WalkingStreakCardProps {
    data: MonthlyStepsData;
}

export const WalkingStreakCard = ({ data }: WalkingStreakCardProps) => {
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
                    <Text style={styles.streakCount}>{data.goal_achieved_days} </Text>
                    Your {data.month.substring(0, 3)} walking streak
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
            <CalendarGrid data={data} />


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
