
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AppColors } from "../theme/colors";

const ResetPassword = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Reset Password Screen (Coming Soon)</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.navBarBackground,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: AppColors.primaryTextDark,
        fontSize: 18,
    },
});

export default ResetPassword;
