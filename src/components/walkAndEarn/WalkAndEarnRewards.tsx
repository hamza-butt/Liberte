import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View, Dimensions, Image, ImageSourcePropType } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { AppColors } from "../../theme/colors";

interface RewardItem {
    id: string;
    icon: ImageSourcePropType;
    title: string;
    description: string;
}

const rewards: RewardItem[] = [
    {
        id: '1',
        icon: require("../../assets/walkAndEarn/walkAndEarnRewards/leaf.png"),
        title: '10 EcoSeeds for\n100,000 Steps',
        description: 'We will plant 1 tree for your 10 EcoSeeds',
    },
    {
        id: '2',
        icon: require("../../assets/walkAndEarn/walkAndEarnRewards/drop.png"),
        title: '10 AquaDrops\n100,000 Steps',
        description: 'Each drop counts! Support water with your steps.',
    },
    {
        id: '3',
        icon: require("../../assets/walkAndEarn/walkAndEarnRewards/baloon.png"),
        title: '5 GrainBundles for\n50,000 Steps',
        description: 'Walk to help provide food to those in need.',
    },
];

const CARD_WIDTH = 240;
const GAP = 16;
const ITEM_WIDTH = CARD_WIDTH + GAP;

const WalkAndEarnRewards = () => {
    const scrollViewRef = useRef<ScrollView>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = prevIndex === rewards.length - 1 ? 0 : prevIndex + 1;
                scrollViewRef.current?.scrollTo({
                    x: nextIndex * ITEM_WIDTH,
                    animated: true,
                });
                return nextIndex;
            });
        }, 3000); // Scroll every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Walk & Earn Rewards</Text>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.rewardsList}
                pagingEnabled={false}
                decelerationRate="fast"
                snapToInterval={ITEM_WIDTH}
            >
                {rewards.map((item) => (
                    <View key={item.id} style={styles.rewardCard}>
                        <LinearGradient
                            colors={['#067D9E', '#033F52']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            style={styles.gradient}
                        />
                        <View style={styles.rewardHeader}>
                            <Image source={item.icon} style={styles.rewardIcon} resizeMode="contain" />
                            <Text style={styles.rewardTitle}>{item.title}</Text>
                        </View>
                        <Text style={styles.rewardDesc}>{item.description}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
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
        borderRadius: 20,
        padding: 16,
        width: 240,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.15)",
        overflow: 'hidden',
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
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
    rewardIcon: {
        width: 32,
        height: 32,
    },
});

export default WalkAndEarnRewards;
