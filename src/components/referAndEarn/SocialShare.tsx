import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageSourcePropType } from "react-native";
import { AppColors } from "../../theme/colors";

const SocialButton = ({ icon }: { icon: ImageSourcePropType }) => (
    <TouchableOpacity style={styles.button}>
        <Image source={icon} style={styles.icon} resizeMode="contain" />
    </TouchableOpacity>
);

const SocialShare = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Share Your Referral link Via.</Text>

            <View style={styles.row}>
                <SocialButton icon={require("../../assets/ReferAndEarn/socialShare/twitter.png")} />
                <SocialButton icon={require("../../assets/ReferAndEarn/socialShare/telegram.png")} />
                <SocialButton icon={require("../../assets/ReferAndEarn/socialShare/facebook.png")} />
                <SocialButton icon={require("../../assets/ReferAndEarn/socialShare/insta.png")} />
                <SocialButton icon={require("../../assets/ReferAndEarn/socialShare/whatsapp.png")} />
                <SocialButton icon={require("../../assets/ReferAndEarn/socialShare/snapchat.png")} />
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
        marginBottom: 20,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "rgba(255, 255, 255, 0.15)", // Glass effect background
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.2)",
    },
    icon: {
        width: 35,
        height: 35,
    }
});

export default SocialShare;
