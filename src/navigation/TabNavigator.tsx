import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import DigitalVault from "../screens/DigitalVault";
import { AppColors } from "../theme/colors";

const Tab = createBottomTabNavigator();

// Custom Home Icon
const HomeIcon = ({ focused }: { focused: boolean }) => (
    <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
        {/* Simple House Shape */}
        <View style={styles.houseBody} />
        <View style={styles.houseRoof} />
    </View>
);

// Custom Wallet Icon
const WalletIcon = ({ focused }: { focused: boolean }) => (
    <View style={styles.iconContainer}>
        <View style={styles.walletBody}>
            <View style={styles.walletDot} />
        </View>
    </View>
);

// Custom Walk Button
const WalkButton = ({ children, onPress }: any) => (
    <TouchableOpacity
        style={styles.walkButtonContainer}
        onPress={onPress}
        activeOpacity={0.8}
    >
        <View style={styles.walkButton}>
            <View style={styles.walkIconHead} />
            <View style={styles.walkIconBody} />
        </View>
        <Text style={styles.walkLabel}>Walk</Text>
    </TouchableOpacity>
);

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarLabelStyle: styles.tabBarLabel,
                tabBarActiveTintColor: AppColors.primaryTextDark,
                tabBarInactiveTintColor: AppColors.primaryTextDark,
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => <HomeIcon focused={focused} />,
                    tabBarLabel: "Home",
                }}
            />
            <Tab.Screen
                name="Walk"
                component={Home} // Placeholder, maybe should be a different screen
                options={{
                    tabBarButton: (props) => <WalkButton {...props} />,
                    tabBarLabel: () => null, // Hide default label
                }}
            />
            <Tab.Screen
                name="DigitalVault"
                component={DigitalVault}
                options={{
                    tabBarIcon: ({ focused }) => <WalletIcon focused={focused} />,
                    tabBarLabel: "Digital Vault",
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: AppColors.navBarBackground,
        height: 80,
        borderTopWidth: 0,
        paddingBottom: 10,
        paddingTop: 10,
    },
    tabBarLabel: {
        fontSize: 12,
        fontWeight: "600",
        marginTop: 5,
    },
    iconContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
    },
    activeIconContainer: {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: 12,
    },
    // Home Icon Shapes
    houseBody: {
        width: 14,
        height: 10,
        backgroundColor: "white",
        marginTop: 4,
    },
    houseRoof: {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderLeftWidth: 9,
        borderRightWidth: 9,
        borderBottomWidth: 9,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: "white",
        position: "absolute",
        top: 6,
    },
    // Wallet Icon Shapes
    walletBody: {
        width: 20,
        height: 14,
        backgroundColor: "white",
        borderRadius: 2,
        justifyContent: "center",
        alignItems: "flex-end",
        paddingRight: 2,
    },
    walletDot: {
        width: 2,
        height: 2,
        backgroundColor: AppColors.navBarBackground,
        borderRadius: 1,
    },
    // Walk Button Styles
    walkButtonContainer: {
        top: -30,
        justifyContent: "center",
        alignItems: "center",
    },
    walkButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: AppColors.yellowDark,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: AppColors.yellowDark, // Dashed border trick requires SVG or dashed-border library, using solid for now or dotted
        borderStyle: "dashed", // Works on some platforms
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    walkLabel: {
        color: AppColors.primaryTextDark, // Or black depending on contrast
        fontWeight: "bold",
        marginTop: 5,
        fontSize: 14,
        position: "absolute",
        bottom: 15, // Adjust to be inside the circle
        zIndex: 10,
    },
    walkIconHead: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "black",
        marginBottom: 2,
    },
    walkIconBody: {
        width: 8,
        height: 16,
        borderRadius: 4,
        backgroundColor: "black",
    },
});

export default TabNavigator;
