import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, Dimensions } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { AppColors } from '../../theme/colors';

const { width } = Dimensions.get('window');

interface WalkAnimationProps {
    steps: number;
    goal: number;
}

const WalkAnimation: React.FC<WalkAnimationProps> = ({ steps, goal }) => {
    // Determine progress for width of the bottom bar or just display text
    // The user image shows a transparent/blur bar at the bottom.

    return (
        <View style={styles.container}>
            <ImageBackground
                // Placeholder: 'forest1.png' is used because 'desert1.png' was not found.
                // TODO: Change this to 'desert1.png' once the file is available.
                source={require('../../assets/walkAndEarn/desert/forest1.png')}
                style={styles.background}
                resizeMode="cover"
            >
                {/* Walking Man GIF */}
                <View style={styles.gifContainer}>
                    <Image
                        source={require('../../assets/walkAndEarn/walkingMan.gif')}
                        style={styles.walkingGif}
                        resizeMode="contain"
                    />
                </View>

                {/* Bottom Info Bar */}
                <View style={styles.bottomBar}>
                    <BlurView
                        style={styles.blurView}
                        blurType="light"
                        blurAmount={10}
                        reducedTransparencyFallbackColor="white"
                    />
                    <View style={styles.infoContent}>
                        <View style={styles.infoRow}>
                            {/* Code-drawn Info Icon */}
                            <View style={styles.infoIconContainer}>
                                <Text style={styles.infoIconText}>i</Text>
                            </View>
                            <Text style={styles.infoText}>Tap offers along the way to collect rewards.</Text>
                        </View>
                        <Text style={styles.stepsText}>{`${steps} / ${goal}`}</Text>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 250, // Approximate height based on image
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 24,
    },
    background: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    gifContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 50, // Leave space for bottom bar
        justifyContent: 'center',
        alignItems: 'center',
    },
    walkingGif: {
        width: 150, // Adjust based on GIF size
        height: 150,
    },
    bottomBar: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        backgroundColor: 'rgba(21, 69, 75, 0.8)', // Fallback/Tint
    },
    blurView: {
        ...StyleSheet.absoluteFillObject,
    },
    infoContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    infoIconContainer: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoIconText: {
        color: AppColors.greenDark, // Using app primary color for contrast
        fontSize: 10,
        fontWeight: 'bold',
    },
    infoText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '500',
    },
    stepsText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default WalkAnimation;
