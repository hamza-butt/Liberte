import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { AppColors } from "../../../theme/colors";

interface CauseFooterProps {
    onCancel: () => void;
    onStart: () => void;
    isStartDisabled: boolean;
}

const CauseFooter: React.FC<CauseFooterProps> = ({
    onCancel,
    onStart,
    isStartDisabled,
}) => {
    return (
        <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.startButton, isStartDisabled && styles.startButtonDisabled]}
                onPress={onStart}
                disabled={isStartDisabled}
            >
                <Text style={styles.startButtonText}>Start Walking</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        flexDirection: "row",
        gap: 12,
        marginTop: 8,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: AppColors.redDark,
        borderRadius: 100,
        paddingVertical: 14,
        alignItems: "center",
    },
    cancelButtonText: {
        color: AppColors.primaryTextDark,
        fontWeight: "bold",
        fontSize: 16,
    },
    startButton: {
        flex: 1,
        backgroundColor: AppColors.greenDark,
        borderRadius: 100,
        paddingVertical: 14,
        alignItems: "center",
    },
    startButtonDisabled: {
        opacity: 0.5,
    },
    startButtonText: {
        color: AppColors.primaryTextDark,
        fontWeight: "bold",
        fontSize: 16,
    },
});

export default CauseFooter;
