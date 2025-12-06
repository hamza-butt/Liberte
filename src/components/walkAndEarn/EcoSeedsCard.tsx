import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Canvas, RoundedRect, LinearGradient, vec } from "@shopify/react-native-skia";
import Video from "react-native-video";
import { AppColors } from "../../theme/colors";

const TOTAL_STEPS = 100000;
const CURRENT_STEPS = 8750;
const ECO_SEEDS = 0.875;

const EcoSeedsCard = () => {
    const progress = Math.min(1, CURRENT_STEPS / TOTAL_STEPS);
    const barWidth = 180;
    const barHeight = 6;

    return (
        <View style={styles.card}>
            {/* Left Side: Video Animation */}
            <View style={styles.videoContainer}>
                <Video
                    source={require("../../assets/home/productSlider/apple-watch.mp4")}
                    style={styles.video}
                    resizeMode="cover"
                    repeat
                    muted
                />
            </View>

            {/* Right Side: Stats & Progress */}
            <View style={styles.contentContainer}>
                <View>
                    <View style={styles.headerRow}>
                        <Text style={styles.mainValue}>{ECO_SEEDS}</Text>
                        <Text style={styles.mainLabel}>EcoSeeds</Text>
                    </View>
                    <Text style={styles.subLabel}>10 EcoSeeds = 1 Tree Planted</Text>
                </View>

                {/* Gradient Progress Bar */}
                <View style={{ height: barHeight, width: barWidth, marginVertical: 8 }}>
                    <Canvas style={{ flex: 1 }}>
                        {/* Background Track */}
                        <RoundedRect
                            x={0}
                            y={0}
                            width={barWidth}
                            height={barHeight}
                            r={barHeight / 2}
                            color="rgba(255,255,255,0.2)"
                        />
                        {/* Progress Fill */}
                        <RoundedRect
                            x={0}
                            y={0}
                            width={barWidth * progress}
                            height={barHeight}
                            r={barHeight / 2}
                        >
                            <LinearGradient
                                start={vec(0, 0)}
                                end={vec(barWidth * progress, 0)}
                                colors={[AppColors.orangeDark, AppColors.greenDark]}
                            />
                        </RoundedRect>
                    </Canvas>
                </View>

                <Text style={styles.progressText}>
                    {CURRENT_STEPS.toLocaleString()} of {TOTAL_STEPS.toLocaleString()} Steps
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: AppColors.whiteTranslucent, // Based on cardSurface but slightly transparent or adjusted
        borderRadius: 24,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        borderWidth: 1,
        borderColor: AppColors.whiteTranslucent,
    },
    videoContainer: {
        width: 80,
        height: 80,
        borderRadius: 40, // Circular mask
        overflow: "hidden",
        backgroundColor: "rgba(0,0,0,0.1)",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "rgba(255,255,255,0.1)",
    },
    video: {
        width: "100%",
        height: "100%",
    },
    contentContainer: {
        flex: 1,
        justifyContent: "center",
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "baseline",
        gap: 6,
    },
    mainValue: {
        fontSize: 32,
        fontWeight: "700",
        color: AppColors.primaryTextDark,
    },
    mainLabel: {
        fontSize: 16,
        color: AppColors.primaryTextDark,
        fontWeight: "500",
    },
    subLabel: {
        fontSize: 12,
        color: "rgba(255, 255, 255, 0.8)",
        marginBottom: 4,
    },
    progressText: {
        fontSize: 12,
        color: AppColors.primaryTextDark,
        fontWeight: "600",
    },
});

export default EcoSeedsCard;
