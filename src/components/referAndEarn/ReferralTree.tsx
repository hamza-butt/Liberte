import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NetworkNode } from "../../types/Referral";
import ReferralParentCard from "./ReferralParentCard";

// --- Main Tree Component ---
const ReferralTree = ({ networkTree }: { networkTree: NetworkNode[] }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Your Referral Network Tree</Text>
            <View style={styles.listContainer}>
                {networkTree.map((node) => (
                    <ReferralParentCard key={node.id} node={node} />
                ))}
                {networkTree.length === 0 && (
                    <Text style={styles.emptyText}>No referrals yet.</Text>
                )}
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
    emptyText: {
        color: 'rgba(255, 255, 255, 0.5)',
        textAlign: 'center',
        marginTop: 10,
    },
});

export default ReferralTree;
