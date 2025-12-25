import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AppColors } from "../../theme/colors";
import TransactionItem, { Transaction } from "./TransactionItem";
import { StepTransaction } from "../../types/DigitalVaultTypes";

interface StepTransactionsProps {
    transactions: StepTransaction[];
}

const StepTransactions = ({ transactions }: StepTransactionsProps) => {

    // Helper to convert StepTransaction to Transaction format for TransactionItem
    const mapStepToTransaction = (stepTx: StepTransaction): Transaction => {
        return {
            id: stepTx.id,
            type: "step", // dummy
            earn_category_id: "0", // dummy
            category_name: "Steps",
            points: stepTx.steps, // Use steps as points amount for visual
            description: `${stepTx.steps} Steps`,
            date: stepTx.event_time,
            time_ago: stepTx.time_ago,
        };
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Step Transactions</Text>

            <View style={styles.listContainer}>
                {transactions.map((item, index) => (
                    <TransactionItem
                        key={item.id}
                        item={mapStepToTransaction(item)}
                        isLast={index === transactions.length - 1}
                        customIcon={require("../../assets/digitalVault/step.png")}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
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

export default StepTransactions;
