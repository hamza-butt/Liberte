import React from "react";
import { StyleSheet, Text, View, Image, ImageSourcePropType } from "react-native";
import { AppColors } from "../../theme/colors";

interface ImpactItem {
    id: string;
    value: string;
    label: string;
    icon: ImageSourcePropType;
}

const impactItems: ImpactItem[] = [
    { id: '1', value: '24', label: 'Trees Planted', icon: require('../../assets/home/tick.png') },
    { id: '2', value: '34L', label: 'Water Donated', icon: require('../../assets/home/tick.png') },
    { id: '3', value: '15', label: 'Meals Provided', icon: require('../../assets/home/tick.png') },
    { id: '4', value: '8', label: 'Safety Reports', icon: require('../../assets/home/tick.png') },
    { id: '5', value: '124', label: 'Lives Touched', icon: require('../../assets/home/tick.png') },
    { id: '6', value: '123', label: 'Interaction', icon: require('../../assets/home/tick.png') },
];

const ImpactPortfolio = () => {
    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Your Impact Portfolio</Text>
            <View style={styles.impactGrid}>
                {impactItems.map((item) => (
                    <View key={item.id} style={styles.impactCard}>
                        <Text style={styles.impactValue}>{item.value}</Text>
                        <Text style={styles.impactLabel}>{item.label}</Text>
                        <View style={styles.impactImagePlaceholder}>
                            <Image source={item.icon} style={styles.icon} resizeMode="contain" />
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        gap: 16,
    },
    sectionTitle: {
        color: AppColors.primaryTextDark,
        fontSize: 20,
        fontWeight: "700",
    },
    impactGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
    },
    impactCard: {
        width: "31%", // approx 1/3 minus gap
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        borderRadius: 16,
        padding: 12,
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: 110,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.1)",
    },
    impactValue: {
        fontSize: 20,
        fontWeight: "700",
        color: AppColors.primaryTextDark,
    },
    impactLabel: {
        fontSize: 12,
        color: "rgba(255,255,255,0.8)",
        textAlign: "center",
        flexGrow: 1,
        marginTop: 4,
    },
    impactImagePlaceholder: {
        marginTop: 8,
        height: 30,
        width: "100%",
        backgroundColor: "rgba(255,255,255,0.1)",
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 16,
        height: 16,
        tintColor: "rgba(255,255,255,0.8)",
    },
});

export default ImpactPortfolio;
