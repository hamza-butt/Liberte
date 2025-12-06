import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View, Dimensions } from "react-native";
import { AppColors } from "../../theme/colors";

interface RewardItem {
    id: string;
    icon: string;
    title: string;
    description: string;
}

const rewards: RewardItem[] = [
    {
        id: '1',
        icon: '🌱',
        title: '10 EcoSeeds for\n100,000 Steps',
        description: 'We will plant 1 tree for your 10 EcoSeeds',
    },
    {
        id: '2',
        icon: '💧',
        title: '10 AquaDrops\n100,000 Steps',
        description: 'Each drop counts! Support water with your steps.',
    },
    {
        id: '3',
        icon: '🎈',
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
                pagingEnabled={false} // Disable standard paging to handle custom snapping if needed, but for auto-scroll it's fine
                decelerationRate="fast"
                snapToInterval={ITEM_WIDTH} // Snap to card + gap
            >
                {rewards.map((item) => (
                    <View key={item.id} style={styles.rewardCard}>
                        <View style={styles.rewardHeader}>
                            <Text style={{ fontSize: 24 }}>{item.icon}</Text>
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
});

export default WalkAndEarnRewards;
