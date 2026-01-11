import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Image, StyleSheet, Dimensions, View } from 'react-native';

const { width } = Dimensions.get('window');

interface InfiniteScrollBackgroundProps {
    imageSource: any;
    duration: number;
}

const InfiniteScrollBackground: React.FC<InfiniteScrollBackgroundProps> = ({ imageSource, duration }) => {
    const translateX = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const startAnimation = () => {
            translateX.setValue(0);
            Animated.loop(
                Animated.timing(translateX, {
                    toValue: -width,
                    duration: duration,
                    easing: Easing.linear,
                    useNativeDriver: true,
                })
            ).start();
        };

        startAnimation();
    }, [translateX, duration]);

    return (
        <Animated.View
            style={[
                styles.backgroundContainer,
                {
                    transform: [{ translateX }],
                },
            ]}
        >
            {/* Two identical images side-by-side for seamless looping */}
            <Image
                source={imageSource}
                style={styles.backgroundImage}
                resizeMode="cover"
            />
            <Image
                source={imageSource}
                style={styles.backgroundImage}
                resizeMode="cover"
            />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    backgroundContainer: {
        flexDirection: 'row', // Align images horizontally
        width: width * 2, // Double width to hold two images
        height: '100%',
        position: 'absolute', // Position behind overlay
        top: 0,
        left: 0,
    },
    backgroundImage: {
        width: width, // Each image takes full screen width
        height: '100%',
    },
});

export default InfiniteScrollBackground;
