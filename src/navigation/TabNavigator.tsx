import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import DigitalVault from "../screens/DigitalVault";
import { AppColors } from "../theme/colors";
import WalkAndEarn from "../screens/WalkAndEarn";
import { commonHeaderOptions } from "./NavigationOptions";

const Tab = createBottomTabNavigator();

// Custom Home Icon
const HomeIcon = ({ focused }: { focused: boolean }) => (
    <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
        <Image
            source={require("../assets/tabbar/home_white.png")}
            style={styles.iconImage}
            resizeMode="contain"
        />
    </View>
);

// Custom Wallet Icon
const WalletIcon = ({ focused }: { focused: boolean }) => (
    <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
        <Image
            source={require("../assets/tabbar/Wallet_white.png")}
            style={styles.iconImage}
            resizeMode="contain"
        />
    </View>
);

// Custom Walk Button
const WalkButton = ({ children, onPress }: any) => (
    <TouchableOpacity
        style={styles.walkButtonContainer}
        onPress={onPress}
    >
        <View style={styles.walkButton}>
            <Image
                source={require("../assets/tabbar/walk.gif")}
                style={styles.walkImage}
                resizeMode="cover"
            />
        </View>
    </TouchableOpacity>
);

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: AppColors.navBarBackground,
                },
                ...commonHeaderOptions,
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
                name="WalkAndEarn"
                component={WalkAndEarn}
                options={{
                    tabBarButton: (props) => <WalkButton {...props} />,
                    tabBarLabel: () => null,
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
    iconImage: {
        width: 24,
        height: 24,
        tintColor: "white",
    },
    // Walk Button Styles
    walkButtonContainer: {
        top: -40,
        justifyContent: "center",
        alignItems: "center",
    },
    walkButton: {
        width: 70,
        height: 70,
    },
    walkImage: {
        width: '100%',
        height: '100%',
    },
});

export default TabNavigator;
