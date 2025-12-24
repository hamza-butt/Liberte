import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from "react-native";
import Collapsible from "react-native-collapsible";
import { AppColors } from "../../theme/colors";
import CTAButton from "../common/CTAButton";

export const AccountSettingsCard = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <View style={[styles.container, isExpanded && styles.containerExpanded]}>
            {/* Header */}
            <TouchableOpacity activeOpacity={0.8} onPress={toggleExpand} style={styles.header}>
                <View style={styles.headerLeft}>
                    <Image
                        source={require("../../assets/profile/gear.png")}
                        style={styles.icon}
                        resizeMode="contain"
                    />
                    <Text style={styles.title}>Account Settings</Text>
                </View>
                <Image
                    source={
                        isExpanded
                            ? require("../../assets/profile/personalGoal/arrow-down.png")
                            : require("../../assets/profile/personalGoal/arrow-right.png")
                    }
                    style={styles.arrowIcon}
                    resizeMode="contain"
                />
            </TouchableOpacity>

            {/* Drop down value */}
            <Collapsible collapsed={!isExpanded}>
                <View style={styles.content}>
                    <View style={styles.divider} />

                    <Text style={styles.sectionTitle}>Change Password</Text>

                    {/* New Password */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>New Password</Text>
                        <TextInput
                            style={styles.input}
                            value={newPassword}
                            onChangeText={setNewPassword}
                            secureTextEntry
                            placeholderTextColor={AppColors.primaryTextDark}
                        />
                    </View>

                    {/* Confirm Password */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Confirm Password</Text>
                        <TextInput
                            style={styles.input}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                            placeholderTextColor={AppColors.primaryTextDark}
                        />
                    </View>

                    <CTAButton
                        label="Change Password"
                        variant="primary"
                        onPress={() => { }}
                        style={{ marginTop: 10 }}
                    />
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
    icon: {
        width: 35,
        height: 35,
    },
    title: {
        color: AppColors.primaryTextDark,
        fontSize: 18,
        fontWeight: "bold",
    },
    arrowIcon: {
        width: 15, // Matched strict size from PersonalGoalCard requested change
        height: 15,
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
    sectionTitle: {
        color: "rgba(255, 255, 255, 0.7)",
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 8,
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
});
