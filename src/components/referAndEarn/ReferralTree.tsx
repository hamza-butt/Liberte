import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Collapsible from "react-native-collapsible";
import { ReferralNodeData } from "../../types/ReferralTypes";
import ReferralChildRow from "./ReferralChildRow";
import ReferralParentCard from "./ReferralParentCard";

// Mock Data
export const REFERRAL_DATA: ReferralNodeData[] = [
    {
        id: "1",
        name: "Sarah Johnson",
        status: "Active",
        referralsCount: 3,
        avatar: require("../../assets/common/profile.png"),
        children: [
            { id: "2", name: "Maria Garcia", status: "Active", earnings: 10, avatar: require("../../assets/common/profile.png") },
            { id: "3", name: "David Thompson", status: "Active", earnings: 10, avatar: require("../../assets/common/profile.png") },
            { id: "4", name: "Alex Kumar", status: "Active", earnings: 10, avatar: require("../../assets/common/profile.png") },
        ],
    },
    {
        id: "5",
        name: "Maria Garcia",
        status: "Active",
        referralsCount: 2,
        avatar: require("../../assets/common/profile.png"),
        children: [
            { id: "6", name: "John Doe", status: "Pending", earnings: 0, avatar: require("../../assets/common/profile.png") }
        ]
    },
    {
        id: "7",
        name: "Ronald Mccoy",
        status: "Pending",
        earnings: 0,
        avatar: require("../../assets/common/profile.png"),
        children: []
    }
];



// --- Main Tree Component ---
const ReferralTree = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Your Referral Network Tree</Text>
            <View style={styles.listContainer}>
                {REFERRAL_DATA.map((node) => (
                    <ReferralParentCard key={node.id} node={node} />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        width: '100%',
        paddingBottom: 40,
    },
    headerTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 16,
    },
    listContainer: {
        gap: 20,
    },
});

export default ReferralTree;
