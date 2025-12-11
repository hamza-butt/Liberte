import React from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView, ImageBackground } from "react-native";
import { AppColors } from "../theme/colors";
import BalanceCard from "../components/digitalVault/BalanceCard";
import Leaderboard from "../components/digitalVault/Leaderboard";
import SupportCard from "../components/digitalVault/SupportCard";
import { useHeaderHeight } from "@react-navigation/elements";


const DigitalVault = () => {
    const headerHeight = useHeaderHeight();
    return (
        <ImageBackground
            source={require("../assets/welcome/intro_background.png")}
            style={styles.background}
            imageStyle={styles.backgroundImage}
        >
            <ScrollView style={styles.container} contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight }]}>

                {/* Balance Card */}
                <BalanceCard />

                {/* Leaderboard */}
                <Leaderboard />

                {/* Support Card */}
                <SupportCard />
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    backgroundImage: {
        resizeMode: "cover",
    },
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal: 20,
    },
});

export default DigitalVault;
