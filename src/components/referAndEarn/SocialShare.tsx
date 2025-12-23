import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AppColors } from "../../theme/colors";

const SocialButton = ({ color, label }: { color: string; label: string }) => (
    <TouchableOpacity style={[styles.button, { backgroundColor: color }]}>
        <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
);

const SocialShare = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Share Your Referral link Via.</Text>

            <View style={styles.row}>
                {/* Using colors to represent social apps mostly matching the design */}
                <SocialButton color="#1DA1F2" label="Tw" />
                <SocialButton color="#0088cc" label="Tg" />
                <SocialButton color="#1877F2" label="Fb" />
                <SocialButton color="#E1306C" label="Ig" />
                <SocialButton color="#25D366" label="Wa" />
                <SocialButton color="#FFFC00" label="Sc" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    title: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 16,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
    },
    button: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: "center",
        alignItems: "center",
        // simple shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    buttonText: {
        color: "#fff", // Most icons are white, except maybe snapchat, but for text placeholder this is fine
        fontWeight: "bold",
        fontSize: 12,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2
    }
});

export default SocialShare;
