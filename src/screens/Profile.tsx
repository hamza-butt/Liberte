import React from "react";
import { View, Text, StyleSheet, ImageBackground, ScrollView } from "react-native";
import { AppColors } from "../theme/colors";
import { useHeaderHeight } from "@react-navigation/elements";

import { ProfileHeader } from "../components/profile/ProfileHeader";
import { TierProgressCard } from "../components/profile/TierProgressCard";
import { WalkingStreakCard } from "../components/profile/WalkingStreakCard";
import { PersonalGoalCard } from "../components/profile/PersonalGoalCard";
import { AccountSettingsCard } from "../components/profile/AccountSettingsCard";

const Profile = () => {

    const headerHeight = useHeaderHeight();

    return (
        <View style={styles.fullScreen}>
            <ImageBackground
                source={require("../assets/welcome/intro_background.png")}
                style={styles.background}
                imageStyle={styles.backgroundImage}
            >
                <ScrollView
                    contentContainerStyle={[
                        styles.content,
                        { paddingTop: headerHeight },
                    ]}
                    showsVerticalScrollIndicator={false}
                    bounces
                    contentInsetAdjustmentBehavior="never"
                    automaticallyAdjustContentInsets={false}
                >

                    {/* Profile Header */}
                    <ProfileHeader
                        image={require("../assets/profile/user_avatar.png")}
                        name="Isabella Ferreira"
                        email="isabella134@gmail.com"
                    />

                    {/* Progress  */}
                    <TierProgressCard
                        currentTier="Bronze"
                        currentPoints={1000}
                        nextTierPoints={2000}
                        timeRemaining="13h 11min"
                    />

                    {/* Walking Streak Card */}
                    <WalkingStreakCard />

                    {/* Settings Group */}
                    <View style={styles.settingsGroup}>
                        <PersonalGoalCard />
                        <AccountSettingsCard />
                    </View>

                </ScrollView>
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
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingBottom: 100,
        gap: 28,
        padding: 100,
    },
    settingsGroup: {
        gap: 0,
    },
});

export default Profile;
