import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Collapsible from "react-native-collapsible";
import { NetworkNode } from "../../types/Referral";
import ReferralChildRow from "./ReferralChildRow";
import { AppColors } from "../../theme/colors";


const ReferralParentCard = ({ node }: { node: NetworkNode }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const hasChildren = node.children && node.children.length > 0;

    return (
        <View style={styles.parentContainer}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => hasChildren && setIsCollapsed(!isCollapsed)}
                style={styles.parentCard}
            >
                <View style={styles.userInfo}>
                    {/*Image and notification */}
                    <View>
                        <Image source={{ uri: node.user_image }} style={styles.avatar} />
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{node.referral_count || 0}</Text>
                        </View>
                    </View>

                    <View style={styles.textContainer}>
                        <Text style={styles.name}>{node.full_name}</Text>

                        {/* Status and referrals */}
                        <View style={styles.statusRow}>
                            <View style={[styles.statusBadge, node.status === '1' ? styles.activeBadge : styles.pendingBadge]}>
                                <Text style={styles.statusText}>{node.status === '1' ? '✓ Active' : '⏳ Pending'}</Text>
                            </View>

                            {node.referral_count > 0 && (
                                <View style={styles.referralBadge}>
                                    <Text style={styles.referralText}>+{node.referral_count} referrals</Text>
                                </View>
                            )}
                        </View>
                    </View>
                </View>

                {/* Expand Toggle Button */}
                {hasChildren && (
                    <View style={styles.arrowButtonParent}>
                        <Image
                            source={
                                isCollapsed
                                    ? require("../../assets/ReferAndEarn/referralTree/arrowDown.png")
                                    : require("../../assets/ReferAndEarn/referralTree/arrowUp.png")
                            }
                            style={styles.arrowIcon}
                            resizeMode="contain"
                        />
                    </View>
                )}
            </TouchableOpacity>

            {/* Collapsible Children Section */}
            <Collapsible collapsed={isCollapsed}>
                <View style={styles.childrenWrapper}>
                    {node.children?.map((child, index) => (
                        <ReferralChildRow
                            key={child.id}
                            node={child}
                            isLast={index === (node.children?.length || 0) - 1}
                        />
                    ))}
                </View>
            </Collapsible>
        </View>
    );
};

const styles = StyleSheet.create({
    parentContainer: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.15)",
        paddingBottom: 4,
    },
    parentCard: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        paddingVertical: 18,
    },

    // Parent Info Styles
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        flex: 1,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: AppColors.whiteTranslucent,
    },
    badge: {
        position: 'absolute',
        top: -2,
        right: -2,
        backgroundColor: '#EF4444',
        width: 18,
        height: 18,
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#374151', // Dark border to match bg usually, or white
    },
    badgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    textContainer: {
        justifyContent: 'center',
    },
    name: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    statusRow: {
        flexDirection: 'row',
        gap: 8,
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
    },
    activeBadge: {
        backgroundColor: 'rgba(34, 197, 95, 0.4)',
    },
    pendingBadge: {
        backgroundColor: 'rgba(156, 163, 175, 0.4)',
    },
    statusText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: '700',
    },
    referralBadge: {
        backgroundColor: 'rgba(162, 173, 96, 1)',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
    },
    referralText: {
        color: '#1a1a1a',
        fontSize: 11,
        fontWeight: '700',
    },
    arrowButtonParent: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "rgba(255,255,255,0.2)",
        justifyContent: 'center',
        alignItems: 'center',
    },

    childrenWrapper: {
        paddingLeft: 40,
        paddingRight: 16,
        paddingBottom: 16,
        paddingTop: 10,
    },

    arrowIcon: {
        width: "100%",
        height: "100%",
    },
});

export default ReferralParentCard;
