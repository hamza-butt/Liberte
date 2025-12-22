import React from "react";
import { View, StyleSheet } from "react-native";
import { BlurView } from "@react-native-community/blur";
import BrandHeader from "../components/navBar/BrandHeader";
import HeaderActions from "../components/navBar/HeaderActions";

export const commonHeaderOptions = {
    headerTitle: "",
    headerTransparent: true,
    headerStyle: {
        backgroundColor: "transparent",
    },
    headerBackground: () => (
        <View style={{ flex: 1, borderBottomWidth: 1, borderBottomColor: "rgba(255, 255, 255, 0.2)" }}>
            <BlurView
                style={StyleSheet.absoluteFill}
                blurType="light"
                blurAmount={10}
                overlayColor="transparent"
            />
        </View>
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
