import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { AppColors } from "../../theme/colors";

const ReferralStats = () => {
    return (
        <View style={styles.container}>
            {/* Direct Referrals Card */}
            <View style={styles.card}>
                <Image
                    source={require("../../assets/ReferAndEarn/referralStat/coins.png")}
                    style={styles.floatingIcon}
                    resizeMode="contain"
                />

                <View style={styles.content}>
                    <Text style={styles.number}>3</Text>
                    <Text style={styles.label}>Direct Referrals</Text>
                </View>
            </View>

            {/* Total Network Card */}
            <View style={styles.card}>
                <Image
                    source={require("../../assets/ReferAndEarn/referralStat/human.png")}
                    style={styles.floatingIcon}
                    resizeMode="contain"
                />

                <View style={styles.content}>
                    <Text style={styles.number}>12</Text>
                    <Text style={styles.label}>Total Network</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 16,
    },
    card: {
        flex: 1,
        backgroundColor: AppColors.whiteTranslucent,
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: AppColors.whiteTranslucent,
        minHeight: 180,
        marginTop: 30,
    },
    floatingIcon: {
        position: "absolute",
        top: -50,
        alignSelf: "center",
        width: 120,
        height: 120,
        zIndex: 1,
    },
    content: {
        marginTop: 30,
        alignItems: "center",
    },
    number: {
        color: "#fff",
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 4,
    },
    label: {
        color: "#fff",
        fontSize: 14,
        opacity: 0.9,
        textAlign: "center",
    },
});

export default ReferralStats;
