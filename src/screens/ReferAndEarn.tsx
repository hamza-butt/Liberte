import React from "react";
import { View, Text, StyleSheet, ImageBackground, ScrollView } from "react-native";
import { AppColors } from "../theme/colors";
import { useHeaderHeight } from "@react-navigation/elements";
import ReferralBalanceCard from "../components/referAndEarn/ReferralBalanceCard";
import ReferralStats from "../components/referAndEarn/ReferralStats";
import SocialShare from "../components/referAndEarn/SocialShare";
import ReferralTree from "../components/referAndEarn/ReferralTree";

const ReferAndEarn = () => {
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
                    {/* Referral Balance Card */}
                    <ReferralBalanceCard />
                    {/* Referral Stats */}
                    <ReferralStats />
                    {/* Social Share */}
                    <SocialShare />

                    {/* Network Tree */}
                    <ReferralTree />
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
        marginTop: 100,
    },
    text: {
        fontSize: 24,
        color: AppColors.primaryTextDark,
        fontWeight: "bold",
    },
});

export default ReferAndEarn;
