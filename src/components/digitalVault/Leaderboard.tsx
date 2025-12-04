import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";
import { AppColors } from "../../theme/colors";
import { hexToRgba } from "../../utils/colorUtils";

const MOCK_DATA = [
    { id: "1", rank: 1, user: "Isabella F.", country: "UAE", litties: 1245, steps: 15000, week: "Week 1", impact: "High", isMe: true },
    { id: "2", rank: 2, user: "Rohan B.", country: "India", litties: 1198, steps: 14500, week: "Week 1", impact: "High", isMe: false },
    { id: "3", rank: 3, user: "Mia S.", country: "Pakistan", litties: 1011, steps: 13000, week: "Week 1", impact: "Med", isMe: false },
    { id: "4", rank: 4, user: "Daniel W.", country: "USA", litties: 985, steps: 12500, week: "Week 1", impact: "Med", isMe: false },
    { id: "5", rank: 5, user: "Sophia L.", country: "Canada", litties: 942, steps: 12000, week: "Week 1", impact: "Med", isMe: false },
    { id: "6", rank: 6, user: "Ahmed R.", country: "Egypt", litties: 910, steps: 11500, week: "Week 1", impact: "Low", isMe: false },
    { id: "7", rank: 7, user: "Elena G.", country: "Spain", litties: 880, steps: 11000, week: "Week 1", impact: "Low", isMe: false },
    { id: "8", rank: 8, user: "Kenji T.", country: "Japan", litties: 860, steps: 10500, week: "Week 1", impact: "Low", isMe: false },
    { id: "9", rank: 9, user: "Maria P.", country: "Brazil", litties: 835, steps: 10000, week: "Week 1", impact: "Low", isMe: false },
    { id: "10", rank: 10, user: "Liam O.", country: "Ireland", litties: 810, steps: 9500, week: "Week 1", impact: "Low", isMe: false },
];

const TABS = ["Litties", "Total Steps", "Global Impact"];

type ColumnConfig = {
    header: string;
    style: any;
    render: (item: any) => React.ReactNode;
};

const Leaderboard = () => {
    const [activeTab, setActiveTab] = useState("Litties");

    const TAB_CONFIG: Record<string, ColumnConfig[]> = {
        "Litties": [
            { header: "Country", style: styles.countryCell, render: (item) => <Text style={[styles.cell, styles.countryCell]}>{item.country}</Text> },
            { header: "Litties", style: styles.littiesCell, render: (item) => <Text style={[styles.cell, styles.littiesCell]}>{item.litties} Litties</Text> },
        ],
        "Total Steps": [
            { header: "Week", style: styles.weekCell, render: (item) => <Text style={[styles.cell, styles.weekCell]}>{item.week}</Text> },
            { header: "Steps", style: styles.stepsCell, render: (item) => <Text style={[styles.cell, styles.stepsCell]}>{item.steps}</Text> },
        ],
        "Global Impact": [
            { header: "Impact", style: styles.impactCell, render: (item) => <Text style={[styles.cell, styles.impactCell]}>{item.impact}</Text> },
        ],
    };

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.row}>
            {/* Rank */}
            <Text style={[styles.cell, styles.rankCell]}>{item.rank}</Text>

            {/* User */}
            <View style={[styles.userCell]}>
                <Image
                    source={require("../../assets/digitalVault/user.png")}
                    style={styles.icon}
                />
                <Text style={styles.userName}>{item.user}</Text>
                {item.isMe && <Text style={[styles.youBadge, styles.youText]}>YOU</Text>}
            </View>

            {/* Tab Config */}
            {TAB_CONFIG[activeTab].map((col, index) => (
                <React.Fragment key={index}>
                    {col.render(item)}
                </React.Fragment>
            ))}
        </View>
    );

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Leaderboard</Text>

            {/* Tabs */}
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

            {/* Table Header */}
            <View style={styles.tableHeader}>
                <Text style={[styles.headerCell, styles.rankCell]}>Rank</Text>
                <Text style={[styles.headerCell, styles.userCell]}>User</Text>
                {TAB_CONFIG[activeTab].map((col, index) => (
                    <Text
                        key={index}
                        style={[styles.headerCell, col.style]}
                    >
                        {col.header}
                    </Text>
                ))}
            </View>

            {/* List List */}
            <View>
                {MOCK_DATA.map((item) => (
                    <View key={item.id} style={styles.rowWrapper}>
                        {renderItem({ item })}
                    </View>
                ))}
            </View>


            {/* View All Button */}
            {/* <TouchableOpacity style={styles.viewAllButton}>
                <Text style={styles.viewAllText}>View All ▼</Text>
            </TouchableOpacity> */}
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
        gap: 10,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: "center",
        borderRadius: 25,
        backgroundColor: AppColors.whiteTranslucent,
    },
    activeTab: {
        backgroundColor: hexToRgba(AppColors.ctaGradientStart, 0.8),
    },
    tabText: {
        color: "white",
        fontSize: 13,
        fontWeight: "600",
    },
    activeTabText: {
        color: "white",
        fontWeight: "bold",
    },
    tableHeader: {
        flexDirection: "row",
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255, 255, 255, 0.1)",
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    headerCell: {
        color: "white",
        fontSize: 12,
        fontWeight: "600",
    },
    rowWrapper: {
        marginBottom: 12,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    cell: {
        color: "white",
        fontSize: 13,
    },
    rankCell: {
        width: 40,
        textAlign: "left",
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
    weekCell: {
        width: 60,
    },
    stepsCell: {
        width: 80,
        textAlign: "right",
    },
    impactCell: {
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
    icon: {
        width: 20,
        height: 20,
        marginRight: 6,
        resizeMode: 'contain',
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
