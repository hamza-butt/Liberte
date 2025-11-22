import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AppColors } from "../theme/colors";

const DigitalVault = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Digital Vault</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.backgroundColorDark,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: AppColors.primaryTextDark,
        fontSize: 20,
        fontWeight: "bold",
    },
});

export default DigitalVault;
