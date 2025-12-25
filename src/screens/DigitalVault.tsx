import React from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView, ImageBackground } from "react-native";
import { AppColors } from "../theme/colors";
import BalanceCard from "../components/digitalVault/BalanceCard";
import Leaderboard from "../components/digitalVault/Leaderboard";

import SupportCard from "../components/digitalVault/SupportCard";
import RecentTransactions from "../components/digitalVault/RecentTransactions";
import { useHeaderHeight } from "@react-navigation/elements";

const SAMPLE_TRANSACTIONS = [
    {
        "id": "47",
        "type": "1",
        "earn_category_id": "2",
        "category_name": "Claim",
        "points": 1,
        "description": "Daily Claim - Day 1",
        "date": "2025-12-23 08:51:04",
        "time_ago": "1 day ago"
    },
    {
        "id": "33",
        "type": "1",
        "earn_category_id": "3",
        "category_name": "Steps",
        "points": 0,
        "description": "Earned 0.1 points",
        "date": "2025-12-20 12:58:14",
        "time_ago": "4 days ago"
    },
    {
        "id": "26",
        "type": "1",
        "earn_category_id": "3",
        "category_name": "Steps",
        "points": 0,
        "description": "Earned 0.1 points for 60 steps",
        "date": "2025-12-19 15:21:47",
        "time_ago": "5 days ago"
    },
    {
        "id": "25",
        "type": "1",
        "earn_category_id": "3",
        "category_name": "Steps",
        "points": 0,
        "description": "Earned 0.1 points for 60 steps",
        "date": "2024-12-19 11:48:10",
        "time_ago": "Dec 19, 2024"
    },
    {
        "id": "22",
        "type": "1",
        "earn_category_id": "2",
        "category_name": "Claim",
        "points": 1,
        "description": "Daily Claim - Day 1",
        "date": "2025-12-17 13:41:46",
        "time_ago": "1 week ago"
    },
    {
        "id": "19",
        "type": "1",
        "earn_category_id": "2",
        "category_name": "Claim",
        "points": 1,
        "description": "Daily Claim - Day 1",
        "date": "2025-12-13 11:17:26",
        "time_ago": "1 week ago"
    },
    {
        "id": "17",
        "type": "1",
        "earn_category_id": "1",
        "category_name": "Sign Up",
        "points": 10,
        "description": "You earned 10 points for signing up.",
        "date": "2025-12-13 10:17:09",
        "time_ago": "1 week ago"
    }
];


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

                {/*  recent transactions */}
                <RecentTransactions transactions={SAMPLE_TRANSACTIONS} />

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
