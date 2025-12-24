import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from "react-native";
import { AppColors } from "../../theme/colors";

export const PersonalGoalCard = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [dailyStepGoal, setDailyStepGoal] = useState("8000");
    const [activityLevel, setActivityLevel] = useState("Intermediate");
    const [weeklyGoal, setWeeklyGoal] = useState("5");

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <View style={styles.container}>

            {/* Header */}
            <TouchableOpacity activeOpacity={0.8} onPress={toggleExpand} style={styles.header}>
                <View style={styles.headerLeft}>
                    <Image
                        source={require("../../assets/profile/personalGoal/goal.png")}
                        style={styles.goalIcon}
                        resizeMode="contain"
                    />
                    <Text style={styles.title}>Personal Goal</Text>
                </View>
                <Image
                    source={require("../../assets/common/arrow-right-white.png")}
                    style={[
                        styles.arrowIcon,
                        isExpanded && { transform: [{ rotate: "90deg" }] }
                    ]}
                    resizeMode="contain"
                />
            </TouchableOpacity>


            {/* Drop down value */}
            {isExpanded && (
                <View style={styles.content}>
                    <View style={styles.divider} />

                    {/* Daily Step Goal */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Daily Step Goal</Text>
                        <TextInput
                            style={styles.input}
                            value={dailyStepGoal}
                            onChangeText={setDailyStepGoal}
                            keyboardType="numeric"
                            placeholderTextColor="rgba(255,255,255,0.5)"
                        />
                    </View>

                    {/* Activity Level */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Activity Level</Text>
                        <TextInput
                            style={styles.input}
                            value={activityLevel}
                            onChangeText={setActivityLevel}
                            placeholderTextColor="rgba(255,255,255,0.5)"
                        />
                    </View>

                    {/* Weekly Goal */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Weekly Goal</Text>
                        <TextInput
                            style={styles.input}
                            value={weeklyGoal}
                            onChangeText={setWeeklyGoal}
                            keyboardType="numeric"
                            placeholderTextColor="rgba(255,255,255,0.5)"
                        />
                    </View>

                    {/* Save Button */}
                    <TouchableOpacity style={styles.saveButton} onPress={toggleExpand}>
                        <Text style={styles.saveButtonText}>Save Goals</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(23, 60, 75, 0.7)", // Matches the glassy teal look roughly
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.15)",
        marginTop: 20,
        overflow: "hidden",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 20,
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },

    goalIcon: {
        width: 24,
        height: 24,
    },
    title: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    arrowIcon: {
        width: 16,
        height: 16,
        tintColor: "#fff",
    },
    content: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    divider: {
        height: 1,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        marginBottom: 20,
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8,
    },
    input: {
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        borderRadius: 12,
        padding: 16,
        color: "#fff",
        fontSize: 16,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.1)",
    },
    saveButton: {
        backgroundColor: AppColors.yellowDark, // Assuming this is the yellow/gold color
        borderRadius: 25,
        paddingVertical: 16,
        alignItems: "center",
        marginTop: 10,
    },
    saveButtonText: {
        color: "#fff", // Or dark text depending on contrast
        fontSize: 16,
        fontWeight: "bold",
    },
});
