import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AppColors } from "../../theme/colors";
import RecentTransactionItem, { RecentTransaction } from "./RecentTransactionItem";

interface RecentTransactionsProps {
    transactions: RecentTransaction[];
}

const RecentTransactions = ({ transactions }: RecentTransactionsProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Recent Transactions</Text>
            <View style={styles.listContainer}>
                {transactions.map((item, index) => (
                    <RecentTransactionItem
                        key={item.id}
                        item={item}
                        isLast={index === transactions.length - 1}
                        customIcon={require("../../assets/digitalVault/plus.png")}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginBottom: 20,
    },
    headerTitle: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 16,
        paddingHorizontal: 4,
    },
    listContainer: {
        backgroundColor: AppColors.whiteTranslucent,
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: AppColors.whiteTranslucent,
    },
});

export default RecentTransactions;
