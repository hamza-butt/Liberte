import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Canvas, Path, Skia, LinearGradient, vec } from "@shopify/react-native-skia";
import { AppColors } from "../../theme/colors";

// Constants for steps
const TOTAL_STEPS = 10000;
const COMPLETED_STEPS = 8500;

const RADIUS = 65;
const STROKE_WIDTH = 10;
const CENTER = RADIUS;
const SIZE = RADIUS * 2;
const STEP_ICON = require("../../assets/walkAndEarn/progressCard/step.png");
const KILOMETRE_ICON = require("../../assets/walkAndEarn/progressCard/walk_person.png");
const KCAL_ICON = require("../../assets/walkAndEarn/progressCard/walk_person.png");
const LITRES_ICON = require("../../assets/walkAndEarn/progressCard/walk_person.png");

const ProgressCard = () => {
    const { path, targetPath } = React.useMemo(() => {
        const progress = Math.min(1, Math.max(0, COMPLETED_STEPS / TOTAL_STEPS));

        const path = Skia.Path.Make();
        path.addCircle(CENTER, CENTER, RADIUS - STROKE_WIDTH / 2);

        const targetPath = Skia.Path.Make();
        targetPath.addArc(
            { x: STROKE_WIDTH / 2, y: STROKE_WIDTH / 2, width: SIZE - STROKE_WIDTH, height: SIZE - STROKE_WIDTH },
            -90,
            progress * 360
        );

        return { path, targetPath };
    }, []);

    return (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                {/* Circular Progress */}
                <View style={styles.progressCircleContainer}>
                    <Canvas style={{ width: SIZE, height: SIZE }}>
                        {/* Background Track */}
                        <Path
                            path={path}
                            color={AppColors.whiteTranslucent}
                            style="stroke"
                            strokeWidth={STROKE_WIDTH}
                        />
                        {/* Progress Arc with Gradient */}
                        <Path
                            path={targetPath}
                            style="stroke"
                            strokeWidth={STROKE_WIDTH}
                            strokeCap="round"
                        >
                            <LinearGradient
                                start={vec(0, 0)}
                                end={vec(SIZE, SIZE)}
                                colors={[AppColors.greenDark, AppColors.greenDark]} // Gradient colors (same for now)
                            />
                        </Path>
                    </Canvas>

                    {/* Inner Content Overlay */}
                    <View style={styles.progressInnerProfile}>
                        {/* Placeholder for footprint icon */}
                        <Image source={STEP_ICON} style={styles.stepIcon} resizeMode="contain" />
                        <Text style={styles.stepCount}>{COMPLETED_STEPS}</Text>
                        <View style={styles.stepDivider} />
                        <Text style={styles.stepTarget}>{TOTAL_STEPS}</Text>
                    </View>
                </View>


                {/* Stats */}
                <View style={styles.progressContainer}>
                    <Text style={styles.cardTitle}>Todays Progress</Text>

                    <View style={styles.statsRow}>


                        {/* Steps */}
                        <View style={styles.progressItemContainer}>
                            <View style={styles.progressItemHorizantalContainer}>
                                <Image source={KILOMETRE_ICON} style={styles.stepIcon} resizeMode="contain" />
                                <Text style={styles.statValue}>6.4</Text>
                            </View>
                            <Text style={styles.statLabel}>Kilometre</Text>
                        </View>

                        {/* kcal */}
                        <View style={styles.progressItemContainer}>
                            <View style={styles.progressItemHorizantalContainer}>
                                <Image source={KCAL_ICON} style={styles.stepIcon} resizeMode="contain" />
                                <Text style={styles.statValue}>224</Text>
                            </View>
                            <Text style={styles.statLabel}>Kcal</Text>
                        </View>

                        {/* litres */}
                        <View style={styles.progressItemContainer}>
                            <View style={styles.progressItemHorizantalContainer}>
                                <Image source={LITRES_ICON} style={styles.stepIcon} resizeMode="contain" />
                                <Text style={styles.statValue}>8.7</Text>
                            </View>
                            <Text style={styles.statLabel}>Litres</Text>
                        </View>


                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: AppColors.whiteTranslucent,
        borderRadius: 24,
        padding: 10,
        borderWidth: 1,
        borderColor: AppColors.whiteTranslucent,
    },
    cardContent: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    // progress circle
    progressCircleContainer: {
        position: 'relative',
        width: SIZE,
        height: SIZE,
        justifyContent: "center",
        alignItems: "center",
    },
    progressInnerProfile: {
        position: 'absolute',
        alignItems: "center",
        justifyContent: "center",
        width: '100%',
        height: '100%',
    },


    progressContainer: {
        flex: 1,
        gap: 12,
    },

    cardTitle: {
        color: AppColors.primaryTextDark,
        fontSize: 18,
        fontWeight: "800",
    },

    statsRow: {
        flexDirection: 'row',
        gap: 8,
    },

    progressItemContainer: {
        gap: 5,
        flex: 1,
        flexDirection: 'column',
        alignItems: "flex-start",
    },

    progressItemHorizantalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },





    // step count
    stepCount: {
        color: AppColors.primaryTextDark,
        fontSize: 24,
        fontWeight: "700",
        marginTop: 4,
    },
    stepDivider: {
        width: 40,
        height: 1,
        backgroundColor: "rgba(255,255,255,0.5)",
        marginVertical: 4,
    },
    stepTarget: {
        color: "rgba(255,255,255,0.8)",
        fontSize: 14,
        fontWeight: "500",
    },



    // icon, value, label
    statIcon: {
        fontSize: 14,
        marginBottom: 2,
    },
    statValue: {
        color: AppColors.primaryTextDark,
        fontSize: 14,
        fontWeight: "700",
    },
    statLabel: {
        color: "rgba(255,255,255,0.8)",
        fontSize: 11,
    },
    stepIcon: {
        width: 30,
        height: 30,
    },

});

export default ProgressCard;
