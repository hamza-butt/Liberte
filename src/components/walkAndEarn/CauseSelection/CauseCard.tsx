import React from "react";
import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";
import { AppColors } from "../../../theme/colors";

// Define the Cause interface locally or import it if shared. 
// Since it's only used here and in the modal, we can redefine or export it from a types file.
// For now, I'll redefine it to keep this component self-contained for props.
export interface Cause {
    id: number;
    title: string;
    description: string;
    image: any;
    enabled?: boolean;
}

interface CauseCardProps {
    cause: Cause;
    isSelected: boolean;
    onSelect: (id: number) => void;
}

const CauseCard: React.FC<CauseCardProps> = ({ cause, isSelected, onSelect }) => {
    return (
        <TouchableOpacity
            style={[
                styles.card,
                isSelected && styles.cardSelected,
                !cause.enabled && { opacity: 0.5 },
            ]}
            onPress={() => onSelect(cause.id)}
            activeOpacity={0.8}
            disabled={!cause.enabled}
        >
            <View style={styles.iconContainer}>
                <Image source={cause.image} style={styles.icon} />
            </View>
            <Text style={styles.cardTitle}>{cause.title}</Text>
            <Text style={styles.cardDescription}>{cause.description}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: "48%",
        backgroundColor: AppColors.whiteTranslucent,
        borderRadius: 16,
        padding: 16,
        borderWidth: 2,
        borderColor: "transparent",
        gap: 8,
    },
    cardSelected: {
        borderColor: AppColors.greenDark,
        backgroundColor: "rgba(18, 185, 129, 0.2)",
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: AppColors.whiteTranslucent,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 4,
        overflow: "hidden",
    },
    icon: {
        width: 35,
        height: 35,
        resizeMode: "cover",
    },
    cardTitle: {
        fontWeight: "600",
        color: AppColors.primaryTextDark,
        fontSize: 14,
    },
    cardDescription: {
        fontSize: 10,
        color: AppColors.secondaryTextDark,
        lineHeight: 16,
    },
});

export default CauseCard;
