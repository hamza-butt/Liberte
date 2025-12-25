import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { AppColors } from "../../theme/colors";

interface ProfileDropdownProps {
    onOptionSelect: (option: string) => void;
}

const ProfileDropdown = ({ onOptionSelect }: ProfileDropdownProps) => {
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
});

export default ProfileDropdown;
