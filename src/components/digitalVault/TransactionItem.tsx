import React from "react";
import { View, Text, StyleSheet, Image, ImageSourcePropType } from "react-native";
import { AppColors } from "../../theme/colors";

export interface Transaction {
    id: string;
    type: string;
    earn_category_id: string;
    category_name: string;
    points: number;
    description: string;
    date: string;
    time_ago: string;
}

interface TransactionItemProps {
    item: Transaction;
    isLast: boolean;
    customIcon?: ImageSourcePropType;
}

const TransactionItem = ({ item, isLast, customIcon }: TransactionItemProps) => {

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
                    <Text style={styles.title}>{item.category_name === "Claim" ? "Daily Claim" : item.category_name}</Text>
                    <Text style={styles.subtitle}>
                        {item.description} • {item.time_ago}
                    </Text>
                </View>

                {/* Points */}
                <View style={styles.pointsContainer}>
                    <Text style={styles.pointsValue}>{item.points.toFixed(1)}</Text>
                    <Text style={styles.pointsLabel}>Litties</Text>
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
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
    },
    icon: {
        width: 24,
        height: 24,
        resizeMode: "contain",
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
    pointsContainer: {
        alignItems: "flex-end",
    },
    pointsValue: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 2,
    },
    pointsLabel: {
        color: "white",
        fontSize: 12,
        opacity: 0.9,
    },
});

export default TransactionItem;
