import React from "react";
import { View, StyleSheet } from "react-native";
import BrandHeader from "../components/navBar/BrandHeader";
import HeaderActions from "../components/navBar/HeaderActions";
import { AppColors } from "../theme/colors";


export const commonHeaderOptions = {
    headerTitle: "",
    headerTransparent: true,
    headerStyle: {
        backgroundColor: "transparent",
    },
    headerBackground: () => (
        <View style={styles.backgroundContainer} />
    ),
    headerLeft: () => (
        <View style={{ paddingLeft: 20 }}>
            <BrandHeader />
        </View>
    ),
    headerRight: () => (
        <View style={{ paddingRight: 20 }}>
            <HeaderActions />
        </View>
    ),
};


const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: AppColors.whiteTranslucent,
        backgroundColor: AppColors.whiteTranslucent,
    }
});