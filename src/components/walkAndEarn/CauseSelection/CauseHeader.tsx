import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AppColors } from "../../../theme/colors";

interface CauseHeaderProps {
    onClose: () => void;
}

const CauseHeader: React.FC<CauseHeaderProps> = ({ onClose }) => {
    return (
        <View style={styles.header}>
            <View>
                <Text style={styles.title}>Choose Your Cause</Text>
                <Text style={styles.subtitle}>
                    Select a cause to focus your walking efforts
                </Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: AppColors.primaryTextDark,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 12,
        color: AppColors.secondaryTextDark,
    },
    closeButton: {
        padding: 4,
    },
    closeButtonText: {
        color: AppColors.primaryTextDark,
        fontSize: 24,
        lineHeight: 24,
    },
});

export default CauseHeader;
