import React from "react";
import { ImageBackground, ScrollView, StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WeatherAndGreeting from "../components/home/WeatherAndGreeting";
import ProgressCard from "../components/walkAndEarn/ProgressCard";
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

                        <View style={styles.divider} />

                        {/* Your Impact Portfolio */}
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}>Your Impact Portfolio</Text>
                            <View style={styles.impactGrid}>
                                <View style={styles.impactCard}>
                                    <Text style={styles.impactValue}>24</Text>
                                    <Text style={styles.impactLabel}>Trees Planted</Text>
                                    <View style={styles.impactImagePlaceholder}><Text>🌿</Text></View>
                                </View>
                                <View style={styles.impactCard}>
                                    <Text style={styles.impactValue}>34L</Text>
                                    <Text style={styles.impactLabel}>Water Donated</Text>
                                    <View style={styles.impactImagePlaceholder}><Text>💧</Text></View>
                                </View>
                                <View style={styles.impactCard}>
                                    <Text style={styles.impactValue}>15</Text>
                                    <Text style={styles.impactLabel}>Meals Provided</Text>
                                    <View style={styles.impactImagePlaceholder}><Text>🍲</Text></View>
                                </View>
                                <View style={styles.impactCard}>
                                    <Text style={styles.impactValue}>8</Text>
                                    <Text style={styles.impactLabel}>Safety Reports</Text>
                                    <View style={styles.impactImagePlaceholder}><Text>🛡️</Text></View>
                                </View>
                                <View style={styles.impactCard}>
                                    <Text style={styles.impactValue}>124</Text>
                                    <Text style={styles.impactLabel}>Lives Touched</Text>
                                    <View style={styles.impactImagePlaceholder}><Text>🤝</Text></View>
                                </View>
                                <View style={styles.impactCard}>
                                    <Text style={styles.impactValue}>123</Text>
                                    <Text style={styles.impactLabel}>Interaction</Text>
                                    <View style={styles.impactImagePlaceholder}><Text>💬</Text></View>
                                </View>
                            </View>
                        </View>

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
        backgroundColor: "rgba(255,255,255,0.2)",
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
    impactGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
    },
    impactCard: {
        width: "31%", // approx 1/3 minus gap
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        borderRadius: 16,
        padding: 12,
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: 110,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.1)",
    },
    impactValue: {
        fontSize: 20,
        fontWeight: "700",
        color: AppColors.primaryTextDark,
    },
    impactLabel: {
        fontSize: 12,
        color: "rgba(255,255,255,0.8)",
        textAlign: "center",
        flexGrow: 1,
        marginTop: 4,
    },
    impactImagePlaceholder: {
        marginTop: 8,
        height: 30,
        width: "100%",
        backgroundColor: "rgba(255,255,255,0.1)",
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
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
