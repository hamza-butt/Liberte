import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch, Image } from "react-native";
import { AppColors } from "../../theme/colors";

interface ProfileDropdownProps {
    onOptionSelect: (option: string) => void;
    isLightMode: boolean;
    onToggleTheme: () => void;
}

const ProfileDropdown = ({ onOptionSelect, isLightMode, onToggleTheme }: ProfileDropdownProps) => {
    return (
        <View style={styles.container}>
            {/* Menu Items */}
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => onOptionSelect("Profile")}
            >
                <Text style={styles.menuText}>Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => onOptionSelect("Refer & Earn")}
            >
                <Text style={styles.menuText}>Refer & Earn</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => onOptionSelect("Logout")}
            >
                <Text style={styles.menuText}>Logout</Text>
            </TouchableOpacity>

            {/* Separator */}
            <View style={styles.separator} />

            {/* Theme Toggle */}
            <TouchableOpacity
                style={styles.toggleContainer}
                onPress={onToggleTheme}
                activeOpacity={0.7}
            >
                <Switch
                    trackColor={{ false: "#767577", true: AppColors.greenDark }}
                    thumbColor={isLightMode ? "#f4f3f4" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={onToggleTheme}
                    value={isLightMode}
                    style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                    pointerEvents="none" // Let parent handle touch to avoid conflict
                />
                <Text style={styles.toggleText}>Light Mode</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 50, // Below the profile icon
        right: 0,
        width: 200,
        backgroundColor: "white",
        borderRadius: 16,
        paddingVertical: 12,
        paddingHorizontal: 16,
        // Shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 8,
        zIndex: 1000,
    },
    menuItem: {
        paddingVertical: 12,
    },
    menuText: {
        fontSize: 16,
        color: AppColors.primaryTextLight,
        fontWeight: "500",
    },
    separator: {
        height: 1,
        backgroundColor: "#E0E0E0",
        marginVertical: 8,
    },
    toggleContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        gap: 8,
    },
    toggleText: {
        fontSize: 16,
        color: AppColors.primaryTextLight,
        fontWeight: "500",
    },
});

export default ProfileDropdown;
