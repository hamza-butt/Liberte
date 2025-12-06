import React from "react";
import { ImageBackground, ScrollView, StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WeatherAndGreeting from "../components/home/WeatherAndGreeting";
import ProgressCard from "../components/walkAndEarn/ProgressCard";
import ImpactPortfolio from "../components/walkAndEarn/ImpactPortfolio";
import { AppColors } from "../theme/colors";

const WalkAndEarn = () => {
    return (
        <View style={styles.fullScreen}>
            <ImageBackground
                source={require("../assets/welcome/intro_background.png")}
                style={styles.background}
                imageStyle={styles.backgroundImage}
            >
                <SafeAreaView style={styles.safeArea}>
                    <ScrollView
                        contentContainerStyle={styles.content}
                        showsVerticalScrollIndicator={false}
                    >
                        {/* Weather and Greeting */}
                        <WeatherAndGreeting />

                        {/* Progress Card */}
                        <ProgressCard />


                        {/* Start Walking Button */}
                        <TouchableOpacity style={styles.walkingButton}>
                            <Text style={styles.walkingButtonIcon}>🚶</Text>
                            <Text style={styles.walkingButtonText}>Start Walking</Text>
                        </TouchableOpacity>

                        {/* Divider */}
                        <View style={styles.divider} />

                        {/* Your Impact Portfolio */}
                        <ImpactPortfolio />

                        {/* Walk & Earn Rewards */}
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}>Walk & Earn Rewards</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.rewardsList}>
                                {/* Reward 1 */}
                                <View style={styles.rewardCard}>
                                    <View style={styles.rewardHeader}>
                                        <Text style={{ fontSize: 24 }}>🌱</Text>
                                        <Text style={styles.rewardTitle}>10 EcoSeeds for{"\n"}100,000 Steps</Text>
                                    </View>
                                    <Text style={styles.rewardDesc}>We will plant 1 tree for your 10 EcoSeeds</Text>
                                </View>

                                {/* Reward 2 */}
                                <View style={styles.rewardCard}>
                                    <View style={styles.rewardHeader}>
                                        <Text style={{ fontSize: 24 }}>💧</Text>
                                        <Text style={styles.rewardTitle}>10 AquaDrops{"\n"}100,000 Steps</Text>
                                    </View>
                                    <Text style={styles.rewardDesc}>Each drop counts! Support water with your steps.</Text>
                                </View>
                            </ScrollView>
                        </View>

                    </ScrollView>
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
    },
    background: {
        flex: 1,
    },
    backgroundImage: {
        resizeMode: "cover",
    },
    safeArea: {
        flex: 1,
    },
    content: {
        paddingHorizontal: 24,
        paddingBottom: 40,
        paddingTop: 16,
        gap: 24,
    },
    divider: {
        height: 1,
        backgroundColor: AppColors.whiteTranslucent,
        marginVertical: 8,
    },
    sectionContainer: {
        gap: 16,
    },
    sectionTitle: {
        color: AppColors.primaryTextDark,
        fontSize: 20,
        fontWeight: "700",
    },
    rewardsList: {
        gap: 16,
        paddingRight: 24,
    },
    rewardCard: {
        backgroundColor: "rgba(4, 95, 121, 0.8)", // Darker background to match design
        borderRadius: 20,
        padding: 16,
        width: 240,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.15)",
    },
    rewardHeader: {
        flexDirection: "row",
        gap: 12,
        marginBottom: 12,
    },
    rewardTitle: {
        color: AppColors.primaryTextDark,
        fontSize: 16,
        fontWeight: "600",
        flex: 1,
    },
    rewardDesc: {
        color: "rgba(255,255,255,0.7)",
        fontSize: 13,
        lineHeight: 18,
    },
    walkingButton: {
        backgroundColor: AppColors.greenDark,
        borderRadius: 100, // Pill shape
        paddingVertical: 16,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        shadowColor: "rgba(0,0,0,0.2)",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 4,
    },
    walkingButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    walkingButtonIcon: {
        fontSize: 24,
    },
});

export default WalkAndEarn;
