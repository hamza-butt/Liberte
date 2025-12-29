import React from "react";
import { View, Text, StyleSheet, ImageBackground, ScrollView } from "react-native";
import { AppColors } from "../theme/colors";
import { useHeaderHeight } from "@react-navigation/elements";

import { ProfileHeader } from "../components/profile/ProfileHeader";
import { TierProgressCard } from "../components/profile/TierProgressCard";
import LoadingScreen from "../components/common/LoadingScreen";
import { WalkingStreakCard } from "../components/profile/WalkingStreakCard";
import { PersonalGoalCard } from "../components/profile/PersonalGoalCard";
import { AccountSettingsCard } from "../components/profile/AccountSettingsCard";

import { ActivityIndicator } from "react-native";
import { useProfileViewModel } from "../hooks/useProfileViewModel";

const Profile = () => {

    const headerHeight = useHeaderHeight();
    const { profileData, isLoading, handleUpdateProfileImage } = useProfileViewModel();

    if (isLoading) {
        return <LoadingScreen />;
    }

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
                    {profileData?.user && (
                        <ProfileHeader
                            image={profileData.user.user_image ? { uri: profileData.user.user_image } : require("../assets/profile/user_avatar.png")}
                            name={profileData.user.full_name}
                            email={profileData.user.email}
                            onEditImage={handleUpdateProfileImage}
                        />
                    )}

                    {/* Progress  */}
                    {profileData?.tier && (
                        <TierProgressCard
                            currentTier={profileData.tier.current_tier}
                            currentPoints={profileData.tier.total_points}
                            nextTierPoints={profileData.tier.next_tier_points}
                            timeRemaining={profileData.tier.time_remaining}
                        />
                    )}

                    {/* Walking Streak Card */}
                    {profileData?.monthly_steps && (
                        <WalkingStreakCard data={profileData.monthly_steps} />
                    )}

                    {/* Settings Group */}
                    <View style={styles.settingsGroup}>
                        {profileData?.goal && <PersonalGoalCard initialGoals={profileData.goal} />}
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
        marginTop: 20,
    },
    settingsGroup: {
        gap: 0,
    },
});

export default Profile;
