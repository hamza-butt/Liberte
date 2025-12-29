import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AppColors } from "../../theme/colors";
import StepTransactionItem from "./StepTransactionItem";
import { StepTransaction } from "../../types/DigitalVaultTypes";

interface StepTransactionsProps {
    transactions: StepTransaction[];
}

const StepTransactions = ({ transactions }: StepTransactionsProps) => {

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Step Transactions</Text>

            <View style={styles.listContainer}>
                {transactions.map((item, index) => (
                    <StepTransactionItem
                        key={item.id}
                        item={item}
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
