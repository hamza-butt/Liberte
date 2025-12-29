import React from "react";
import { View, Text, StyleSheet, Image, ImageSourcePropType } from "react-native";
import { StepTransaction } from "../../types/DigitalVaultTypes";

interface StepTransactionItemProps {
    item: StepTransaction;
    isLast: boolean;
    customIcon?: ImageSourcePropType;
}

const StepTransactionItem = ({ item, isLast, customIcon }: StepTransactionItemProps) => {
    return (
        <View style={[styles.container, !isLast && styles.borderBottom]}>
            {/* Icon */}
            {customIcon && (
                <Image
                    source={customIcon}
                    style={styles.customIcon}
                />
            )}

            {/* Content */}
            <View style={styles.contentContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.steps} Steps</Text>
                    <Text style={styles.subtitle}>
                        {item.time_ago}
                    </Text>
                </View>

                {/* Stats */}
                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{item.kilometre > 0 ? item.kilometre.toFixed(2) : "0"}</Text>
                        <Text style={styles.statLabel}>km</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{item.kcal > 0 ? item.kcal.toFixed(2) : "0"}</Text>
                        <Text style={styles.statLabel}>Kcal</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16,
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255, 255, 255, 0.2)",
    },
    customIcon: {
        width: 48,
        height: 48,
        marginRight: 16,
        resizeMode: "contain",
    },
    contentContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    textContainer: {
        flex: 1,
        marginRight: 8,
    },
    title: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
    },
    subtitle: {
        color: "rgba(255, 255, 255, 0.8)",
        fontSize: 12,
        lineHeight: 16,
    },
    statsContainer: {
        flexDirection: 'row',
        alignItems: "center",
        gap: 12,
    },
    statItem: {
        alignItems: 'flex-end',
    },
    statValue: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 2,
    },
    statLabel: {
        color: "white",
        fontSize: 10,
        opacity: 0.9,
    },
});

export default StepTransactionItem;
