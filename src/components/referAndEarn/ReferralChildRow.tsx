import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { NetworkNode } from "../../types/Referral";
import { AppColors } from "../../theme/colors";

const ReferralChildRow = ({ node, isLast }: { node: NetworkNode; isLast: boolean }) => {
    return (
        <View style={styles.childRowWrapper}>
            {/* Visual Tree Line Connector */}
            <View style={styles.childConnector} />
            <View style={[styles.childVerticalLine, isLast && styles.shortVerticalLine]} />

            <View style={styles.childCard}>

                {/* user info */}
                <View style={styles.userInfo}>
                    <Image source={{ uri: node.user_image }} style={styles.childAvatar} />
                    <Text style={styles.childName}>{node.full_name}</Text>
                </View>

                {/* Right Side: Status or Earnings? API doesn't have earnings for child, so maybe just status or remove earnings */}
                <View style={styles.rightAction}>
                    {/* Status Badge instead of earnings since we don't have earnings in child data yet */}
                    <View style={[styles.statusBadge, node.status === '1' ? styles.activeBadge : styles.pendingBadge]}>
                        <Text style={styles.statusText}>{node.status === '1' ? 'Active' : 'Inactive'}</Text>
                    </View>
                </View>


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
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    activeBadge: {
        backgroundColor: 'rgba(34, 197, 95, 0.4)',
    },
    pendingBadge: {
        backgroundColor: 'rgba(156, 163, 175, 0.4)',
    },
    statusText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
    },
});

export default ReferralChildRow;
