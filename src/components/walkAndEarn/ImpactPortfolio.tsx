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
    { id: '1', value: '24', label: 'Trees Planted', icon: require('../../assets/walkAndEarn/portfolio/p1.png') },
    { id: '2', value: '34L', label: 'Water Donated', icon: require('../../assets/walkAndEarn/portfolio/p2.png') },
    { id: '3', value: '15', label: 'Meals Provided', icon: require('../../assets/walkAndEarn/portfolio/p3.png') },
    { id: '4', value: '8', label: 'Safety Reports', icon: require('../../assets/walkAndEarn/portfolio/p4.png') },
    { id: '5', value: '124', label: 'Lives Touched', icon: require('../../assets/walkAndEarn/portfolio/p5.png') },
    { id: '6', value: '123', label: 'Interaction', icon: require('../../assets/walkAndEarn/portfolio/p6.png') },
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
                        <Image source={item.icon} style={styles.icon} resizeMode="contain" />
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
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: 110,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.1)",
        overflow: "hidden",
        paddingTop: 10,
    },
    impactContent: {
        paddingTop: 12,
        paddingHorizontal: 8,
        alignItems: "center",
        width: "100%",
        flex: 1,
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
    icon: {
        width: "100%",
        height: 50,
    },
});

export default ImpactPortfolio;
