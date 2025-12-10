import React from "react";
import { View } from "react-native";
import BrandHeader from "../components/navBar/BrandHeader";
import HeaderActions from "../components/navBar/HeaderActions";

export const commonHeaderOptions = {
    headerTitle: "",
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
