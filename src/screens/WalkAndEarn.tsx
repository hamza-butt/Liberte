import React from "react";
import { ImageBackground, ScrollView, StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import WeatherAndGreeting from "../components/home/WeatherAndGreeting";
import ProgressCard from "../components/walkAndEarn/ProgressCard";
import ImpactPortfolio from "../components/walkAndEarn/ImpactPortfolio";
import EcoSeedsCard from "../components/walkAndEarn/EcoSeedsCard";
import WalkAndEarnRewards from "../components/walkAndEarn/WalkAndEarnRewards";
import CauseSelectionModal from "../components/walkAndEarn/Modal/CauseSelectionModal";
import { AppColors } from "../theme/colors";
import { useHeaderHeight } from "@react-navigation/elements";


import { useWalkTracker } from "../hooks/useWalkTracker";

const WalkAndEarn = () => {

    const headerHeight = useHeaderHeight();
    const [isCauseModalVisible, setIsCauseModalVisible] = React.useState(false);
    const { isTracking, steps, distance, startTracking, stopTracking } = useWalkTracker();
    const [selectedCause, setSelectedCause] = React.useState(null);

    const handleStartWalking = (cause: any) => {
        // update cause selection
        setSelectedCause(cause);
        console.log("Starting walking with cause:", selectedCause);
        // startTracking();
    };

    const handlePressButton = () => {
        if (isTracking) {
            stopTracking();
        } else {
            setIsCauseModalVisible(true);
        }
    };

    return (
        <View style={styles.fullScreen}>
            <ImageBackground
                source={require("../assets/welcome/intro_background.png")}
                style={styles.background}
                imageStyle={styles.backgroundImage}
            >
                <ScrollView
                    contentContainerStyle={[styles.content, { paddingTop: headerHeight }]}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Weather and Greeting */}
                    <WeatherAndGreeting />

                    {/* Progress Card */}
                    <ProgressCard />

                    {/* Live Stats */}
                    {isTracking && (
                        <View style={styles.liveStatsContainer}>
                            <View style={styles.statItem}>
                                <Text style={styles.statValue}>{steps}</Text>
                                <Text style={styles.statLabel}>Steps</Text>
                            </View>
                            <View style={styles.statDivider} />
                            <View style={styles.statItem}>
                                <Text style={styles.statValue}>{distance.toFixed(0)}</Text>
                                <Text style={styles.statLabel}>Meters</Text>
                            </View>
                        </View>
                    )}

                    {/* Start/Stop Walking Button */}
                    <TouchableOpacity
                        style={[styles.walkingButton, isTracking && styles.stopButton]}
                        onPress={handlePressButton}
                    >
                        <Image
                            source={require("../assets/walkAndEarn/walk_person.png")}
                            style={styles.walkingButtonIcon}
                            resizeMode="contain"
                        />
                        <Text style={styles.walkingButtonText}>
                            {isTracking ? "Stop Walking" : "Start Walking"}
                        </Text>
                    </TouchableOpacity>

                    {/* Divider */}
                    <View style={styles.divider} />

                    {/* Your Impact Portfolio */}
                    <ImpactPortfolio />

                    {/* Walk & Earn Rewards */}
                    <WalkAndEarnRewards />

                    {/* EcoSeeds Card */}
                    <EcoSeedsCard />

                </ScrollView>
                <CauseSelectionModal
                    visible={isCauseModalVisible}
                    onClose={() => setIsCauseModalVisible(false)}
                    onCauseSelection={handleStartWalking}
                />
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
    content: {
        paddingHorizontal: 24,
        paddingBottom: 120,
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
        width: 24,
        height: 24,
        tintColor: "#FFFFFF",
    },
    stopButton: {
        backgroundColor: '#FF4B4B',
    },
    liveStatsContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 16,
        padding: 16,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: '700',
    },
    statLabel: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 14,
        marginTop: 4,
    },
    statDivider: {
        width: 1,
        height: '80%',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
});

export default WalkAndEarn;
