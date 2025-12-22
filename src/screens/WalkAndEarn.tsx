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


import { WalkAndEarnViewModel } from "../hooks/WalkAndEarnViewModel";

const WalkAndEarn = () => {

    const headerHeight = useHeaderHeight();
    const [isCauseModalVisible, setIsCauseModalVisible] = React.useState(false);
    const { isTracking, steps, distance, startTracking, stopTracking, selectedCause, setSelectedCause, testSocket, dailySummary } = WalkAndEarnViewModel();

    const handleStartWalking = (causeId: number) => {
        // update cause selection
        setSelectedCause(causeId);
        startTracking();
    };

    const handlePressButton = () => {
        // testSocket();

        if (isTracking) {
            stopTracking();
        } else {
            startTracking()
            // setIsCauseModalVisible(true);
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
                    <ProgressCard data={dailySummary} />

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

});

export default WalkAndEarn;
