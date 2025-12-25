import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { AppColors } from "../../theme/colors";

const SupportCard = () => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    {/* Placeholder for support icon */}
                    <Image
                        source={require("../../assets/digitalVault/help.png")}
                        style={styles.icon}
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Help & Customer Support</Text>
                    <Text style={styles.description}>
                        Register a complaint or get quick help on queries related to WERN
                    </Text>
                </View>
            </View>

            <View style={styles.buttonRow}>
                <TouchableOpacity style={[styles.button, styles.contactButton]}>
                    <Text style={styles.contactButtonText}>Contact Us</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={[styles.button, styles.ticketsButton]}>
                    <Text style={styles.ticketsButtonText}>View My Tickets</Text>
                </TouchableOpacity> */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: AppColors.whiteTranslucent,
        borderRadius: 20,
        padding: 20,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: AppColors.whiteTranslucent,
    },
    content: {
        flexDirection: "row",
        marginBottom: 20,
    },
    icon: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    iconContainer: {
        marginRight: 15,
        justifyContent: "center",
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: AppColors.greenDark,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "rgba(255,255,255,0.2)"
    },
    iconText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        fontStyle: "italic"
    },
    textContainer: {
        flex: 1,
    },
    title: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
    },
    description: {
        color: "rgba(255, 255, 255, 0.7)",
        fontSize: 12,
        lineHeight: 18,
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
    },
    contactButton: {
        backgroundColor: AppColors.ctaGradientStart, // Yellow/Gold
    },
    ticketsButton: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "white",
    },
    contactButtonText: {
        color: AppColors.primaryTextLight, // Dark text
        fontWeight: "bold",
        fontSize: 14,
    },
    ticketsButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 14,
    },
});

export default SupportCard;
