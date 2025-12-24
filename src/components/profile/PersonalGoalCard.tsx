import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from "react-native";
import Collapsible from "react-native-collapsible";
import { AppColors } from "../../theme/colors";
import { CustomDropdown } from "./CustomDropdown";

export const PersonalGoalCard = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [dailyStepGoal, setDailyStepGoal] = useState("8000");
    const [activityLevel, setActivityLevel] = useState("Intermediate");
    const [weeklyGoal, setWeeklyGoal] = useState("5");

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <View style={[styles.container, isExpanded && styles.containerExpanded]}>
            {/* Header */}
            <TouchableOpacity activeOpacity={0.8} onPress={toggleExpand} style={styles.header}>
                <View style={styles.headerLeft}>
                    <Image
                        source={require("../../assets/profile/personalGoal/target.png")}
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
            <Collapsible collapsed={!isExpanded}>
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
                            placeholderTextColor={AppColors.primaryTextDark}
                        />
                    </View>

                    {/* Activity Level */}
                    <CustomDropdown
                        label="Activity Level"
                        value={activityLevel}
                        options={["Beginner", "Intermediate", "Advanced"]}
                        onSelect={setActivityLevel}
                        zIndex={10}
                    />

                    {/* Weekly Goal */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Weekly Goal</Text>
                        <TextInput
                            style={styles.input}
                            value={weeklyGoal}
                            onChangeText={setWeeklyGoal}
                            keyboardType="numeric"
                            placeholderTextColor={AppColors.primaryTextDark}
                        />
                    </View>

                    {/* Save Button */}
                    <TouchableOpacity style={styles.saveButton} onPress={toggleExpand}>
                        <Text style={styles.saveButtonText}>Save Goals</Text>
                    </TouchableOpacity>
                </View>
            </Collapsible>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: AppColors.whiteTranslucent,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: AppColors.whiteTranslucent,
        marginTop: 20,
        overflow: "hidden",
    },
    containerExpanded: {
        backgroundColor: "rgba(23, 60, 75, 0.7)",
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
        width: 35,
        height: 35,
    },
    title: {
        color: AppColors.primaryTextDark,
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
        backgroundColor: AppColors.whiteTranslucent,
        marginBottom: 20,
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        color: AppColors.primaryTextDark,
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8,
    },
    input: {
        backgroundColor: AppColors.whiteTranslucent,
        borderRadius: 12,
        padding: 16,
        color: AppColors.primaryTextDark,
        fontSize: 16,
        borderWidth: 1,
        borderColor: AppColors.whiteTranslucent,
    },
    saveButton: {
        backgroundColor: AppColors.yellowDark,
        borderRadius: 25,
        paddingVertical: 16,
        alignItems: "center",
        marginTop: 10,
    },
    saveButtonText: {
        color: AppColors.primaryTextDark,
        fontSize: 16,
        fontWeight: "bold",
    },
});
