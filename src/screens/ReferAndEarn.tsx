import React from "react";
import { View, Text, StyleSheet, ImageBackground, ScrollView, ActivityIndicator } from "react-native";
import { AppColors } from "../theme/colors";
import { useHeaderHeight } from "@react-navigation/elements";
import ReferralBalanceCard from "../components/referAndEarn/ReferralBalanceCard";
import ReferralStats from "../components/referAndEarn/ReferralStats";
import SocialShare from "../components/referAndEarn/SocialShare";
import ReferralTree from "../components/referAndEarn/ReferralTree";
import { useReferAndEarnViewModel } from "../hooks/useReferAndEarnViewModel";
import LoadingScreen from "../components/common/LoadingScreen";

const ReferAndEarn = () => {
    const headerHeight = useHeaderHeight();
    const { referralData, isLoading, error } = useReferAndEarnViewModel();

    if (isLoading) {
        return <LoadingScreen />;
    }

    // Default values if data is missing or loading failed
    const balance = referralData?.total_referral_earn || 0;
    const referral_link = referralData?.referral_link || "";
    const totalReferrals = referralData?.total_network_count || 0;
    const directReferrals = referralData?.direct_count || 0;
    const networkTree = referralData?.network_tree || [];

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
                    {/* Referral Balance Card */}
                    <ReferralBalanceCard
                        balance={balance}
                        referral_link={referral_link}
                        totalReferrals={totalReferrals}
                    />
                    {/* Referral Stats */}
                    <ReferralStats
                        directReferrals={directReferrals}
                        totalNetwork={totalReferrals}
                    />
                    {/* Social Share */}
                    <SocialShare />

                    {/* Network Tree */}
                    <ReferralTree networkTree={networkTree} />
                </ScrollView>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    backgroundImage: {
        resizeMode: "cover",
    },
    content: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingBottom: 100,
        gap: 28,
        marginTop: 30,
    },
    text: {
        fontSize: 24,
        color: AppColors.primaryTextDark,
        fontWeight: "bold",
    },
});

export default ReferAndEarn;
