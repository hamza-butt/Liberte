import React from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView, ImageBackground } from "react-native";
import { AppColors } from "../theme/colors";
import BalanceCard from "../components/digitalVault/BalanceCard";
import Leaderboard from "../components/digitalVault/Leaderboard";

import SupportCard from "../components/digitalVault/SupportCard";
import RecentTransactions from "../components/digitalVault/RecentTransactions";
import { useHeaderHeight } from "@react-navigation/elements";

import { useDigitalVaultViewModel } from "../hooks/useDigitalVaultViewModel";
import StepTransactions from "../components/digitalVault/StepTransactions";

const DigitalVault = () => {
    const headerHeight = useHeaderHeight();
    const { data, isLoading } = useDigitalVaultViewModel();

    return (
        <ImageBackground
            source={require("../assets/welcome/intro_background.png")}
            style={styles.background}
            imageStyle={styles.backgroundImage}
        >
            <ScrollView style={styles.container} contentContainerStyle={[styles.contentContainer, { paddingTop: headerHeight }]}>

                {/* Balance Card */}
                <BalanceCard
                    availableBalance={data?.balance_card.available_balance}
                    totalKm={data?.balance_card.total_km}
                    totalCalories={data?.balance_card.total_calories}
                    totalSteps={data?.balance_card.total_steps}
                />

                {/*  recent transactions */}
                {data?.recent_transactions && data.recent_transactions.length > 0 && (
                    <RecentTransactions transactions={data.recent_transactions} />
                )}

                {/* Step Transactions */}
                {data?.step_transactions && data.step_transactions.length > 0 && (
                    <StepTransactions transactions={data.step_transactions} />
                )}

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
        paddingBottom: 100,
    },
});

export default DigitalVault;
