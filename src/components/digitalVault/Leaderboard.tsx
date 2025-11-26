import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";
import { AppColors } from "../../theme/colors";

const MOCK_DATA = [
    { id: "1", rank: 1, user: "Isabella Ferreira", country: "UAE", litties: 1245, isMe: true },
    { id: "2", rank: 2, user: "Rohan B.", country: "India", litties: 1198, isMe: false },
    { id: "3", rank: 3, user: "Mia S.", country: "Pakistan", litties: 1011, isMe: false },
    { id: "4", rank: 4, user: "Daniel W.", country: "USA", litties: 985, isMe: false },
    { id: "5", rank: 5, user: "Sophia L.", country: "Canada", litties: 942, isMe: false },
    { id: "6", rank: 6, user: "Ahmed R.", country: "Egypt", litties: 910, isMe: false },
    { id: "7", rank: 7, user: "Elena G.", country: "Spain", litties: 880, isMe: false },
    { id: "8", rank: 8, user: "Kenji T.", country: "Japan", litties: 860, isMe: false },
    { id: "9", rank: 9, user: "Maria P.", country: "Brazil", litties: 835, isMe: false },
    { id: "10", rank: 10, user: "Liam O.", country: "Ireland", litties: 810, isMe: false },
];

const TABS = ["Litties", "Total Steps", "Global Impact"];

const Leaderboard = () => {
    const [activeTab, setActiveTab] = useState("Litties");

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.row}>
            <Text style={[styles.cell, styles.rankCell]}>{item.rank}</Text>
            <View style={[styles.cell, styles.userCell]}>
                <View style={styles.avatarPlaceholder}>
                    {/* Placeholder for avatar */}
                    <View style={styles.avatarInner} />
                </View>
                <Text style={styles.userName}>{item.user}</Text>
                {item.isMe && <Text style={[styles.youBadge, styles.youText]}>YOU</Text>}
            </View>
            <Text style={[styles.cell, styles.countryCell]}>{item.country}</Text>
            <Text style={[styles.cell, styles.littiesCell]}>{item.litties} Litties</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Leaderboard</Text>

            <View style={styles.tabsContainer}>
                {TABS.map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.tab, activeTab === tab && styles.activeTab]}
                        onPress={() => setActiveTab(tab)}
                    >
                        <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.tableHeader}>
                <Text style={[styles.headerCell, styles.rankCell]}>Rank</Text>
                <Text style={[styles.headerCell, styles.userCell]}>User</Text>
                <Text style={[styles.headerCell, styles.countryCell]}>Country</Text>
                <Text style={[styles.headerCell, styles.littiesCell]}>Litties</Text>
            </View>

            <View style={styles.listContainer}>
                {MOCK_DATA.map((item) => (
                    <View key={item.id} style={styles.rowWrapper}>
                        {renderItem({ item })}
                    </View>
                ))}
            </View>

            <TouchableOpacity style={styles.viewAllButton}>
                <Text style={styles.viewAllText}>View All ▼</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    title: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
    },
    tabsContainer: {
        flexDirection: "row",
        marginBottom: 20,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: 20,
        padding: 4,
    },
    tab: {
        flex: 1,
        paddingVertical: 8,
        alignItems: "center",
        borderRadius: 16,
    },
    activeTab: {
        backgroundColor: AppColors.ctaGradientStart, // Using yellow/gold from colors
    },
    tabText: {
        color: "rgba(255, 255, 255, 0.7)",
        fontSize: 12,
        fontWeight: "600",
    },
    activeTabText: {
        color: AppColors.primaryTextLight, // Dark text on light button
        fontWeight: "bold",
    },
    tableHeader: {
        flexDirection: "row",
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255, 255, 255, 0.1)",
        marginBottom: 10,
    },
    headerCell: {
        color: "rgba(255, 255, 255, 0.6)",
        fontSize: 12,
        fontWeight: "600",
    },
    listContainer: {
        // Container for list items
    },
    rowWrapper: {
        marginBottom: 12,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    cell: {
        color: "white",
        fontSize: 13,
    },
    rankCell: {
        width: 40,
        textAlign: "center",
    },
    userCell: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    countryCell: {
        width: 60,
    },
    littiesCell: {
        width: 80,
        textAlign: "right",
    },
    avatarPlaceholder: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: AppColors.yellowDark,
        marginRight: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    avatarInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "black",
        opacity: 0.3
    },
    userName: {
        color: "white",
        marginRight: 6,
    },
    youBadge: {
        backgroundColor: AppColors.redDark,
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 4,
    },
    youText: {
        color: "white",
        fontSize: 8,
        fontWeight: "bold",
    },
    viewAllButton: {
        alignItems: "center",
        marginTop: 10,
    },
    viewAllText: {
        color: "white",
        fontSize: 12,
        fontWeight: "600",
    },
});

export default Leaderboard;
