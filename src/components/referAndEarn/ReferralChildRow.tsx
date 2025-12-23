import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { ReferralNodeData } from "../../types/ReferralTypes";
import { AppColors } from "../../theme/colors";

const ReferralChildRow = ({ node, isLast }: { node: ReferralNodeData; isLast: boolean }) => {
    return (
        <View style={styles.childRowWrapper}>
            {/* Visual Tree Line Connector */}
            <View style={styles.childConnector} />
            <View style={[styles.childVerticalLine, isLast && styles.shortVerticalLine]} />

            <View style={styles.childCard}>

                {/* user info */}
                <View style={styles.userInfo}>
                    <Image source={node.avatar} style={styles.childAvatar} />
                    <Text style={styles.childName}>{node.name}</Text>
                </View>

                {/* Right Side: Earnings */}
                <View style={styles.rightAction}>
                    {node.earnings !== undefined && (
                        <View style={styles.earningBadge}>
                            <Image
                                source={require("../../assets/ReferAndEarn/referralStat/coins.png")}
                                style={styles.coinIconSmall}
                                resizeMode="contain"
                            />
                            <Text style={styles.earningText}>{node.earnings}</Text>
                        </View>
                    )}
                    <View style={styles.arrowButton}>
                        <Image
                            source={require("../../assets/common/arrow-right-white.png")}
                            style={[styles.arrowIcon, { transform: [{ rotate: '90deg' }] }]}
                            resizeMode="contain"
                        />
                    </View>
                </View>

                {/* seperator line */}

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    childRowWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        marginBottom: 12,
    },
    // The Line logic
    childConnector: {
        position: 'absolute',
        left: -14,
        width: 14,
        height: 1,
        backgroundColor: AppColors.whiteTranslucent,
    },
    childVerticalLine: {
        position: 'absolute',
        left: -14,
        top: -12,
        bottom: -12,
        width: 1,
        backgroundColor: AppColors.whiteTranslucent,
    },
    shortVerticalLine: {
        bottom: '50%',
    },

    // Child Card
    childCard: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    childAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: AppColors.whiteTranslucent,
    },
    childName: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },

    // Right Actions
    rightAction: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    earningBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: AppColors.whiteTranslucent,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        gap: 6,
        height: 32,
    },
    coinIconSmall: {
        width: 14,
        height: 14,
    },
    earningText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 13,
    },
    arrowButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: AppColors.whiteTranslucent,
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrowIcon: {
        width: 12,
        height: 12,
        tintColor: '#fff',
    },
});

export default ReferralChildRow;
