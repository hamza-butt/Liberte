import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { AppColors } from "../../theme/colors";

interface CustomDropdownProps {
    label: string;
    value: string;
    options: string[];
    onSelect: (value: string) => void;
    zIndex?: number;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
    label,
    value,
    options,
    onSelect,
    zIndex = 1,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (option: string) => {
        onSelect(option);
        setIsOpen(false);
    };

    return (
        <View style={[styles.inputGroup, { zIndex }]}>
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity
                style={styles.dropdownTrigger}
                onPress={() => setIsOpen(!isOpen)}
                activeOpacity={0.8}
            >
                <Text style={styles.dropdownText}>{value}</Text>
                <Image
                    source={require("../../assets/common/arrow-right-white.png")}
                    style={[
                        styles.dropdownArrow,
                        isOpen && { transform: [{ rotate: "90deg" }] }
                    ]}
                    resizeMode="contain"
                />
            </TouchableOpacity>

            {isOpen && (
                <View style={styles.dropdownList}>
                    {options.map((option) => (
                        <TouchableOpacity
                            key={option}
                            style={[
                                styles.dropdownItem,
                                value === option && styles.dropdownItemSelected
                            ]}
                            onPress={() => handleSelect(option)}
                        >
                            <Text style={styles.dropdownItemText}>{option}</Text>
                            {value === option && (
                                <Text style={styles.checkMark}>✓</Text>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        color: AppColors.primaryTextDark,
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8,
    },
    dropdownTrigger: {
        backgroundColor: AppColors.whiteTranslucent,
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: AppColors.whiteTranslucent,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    dropdownText: {
        color: AppColors.primaryTextDark,
        fontSize: 16,
    },
    dropdownArrow: {
        width: 14,
        height: 14,
        tintColor: AppColors.primaryTextDark,
    },
    dropdownList: {
        marginTop: 8,
        backgroundColor: "rgba(23, 60, 75, 0.95)", // Glassy teal background
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.1)",
        overflow: "hidden",
    },
    dropdownItem: {
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255, 255, 255, 0.05)",
    },
    dropdownItemSelected: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
    dropdownItemText: {
        color: "#fff",
        fontSize: 16,
    },
    checkMark: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
