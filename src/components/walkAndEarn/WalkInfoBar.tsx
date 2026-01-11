import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { AppColors } from '../../theme/colors';

interface WalkInfoBarProps {
    steps: number;
    goal: number;
}

const WalkInfoBar: React.FC<WalkInfoBarProps> = ({ steps, goal }) => {
    return (
        <View style={styles.bottomBar}>


            {/* offer tab */}
            <View style={styles.infoRow}>
                <View style={styles.infoIconContainer}>
                    <Text style={styles.infoIconText}>i</Text>
                </View>
                <Text style={styles.infoText}>Tap offers along the way to collect rewards.</Text>
            </View>

            {/* steps tab */}
            <Text style={styles.stepsText}>{steps} / {goal}</Text>



        </View>
    );
};

const styles = StyleSheet.create({
    bottomBar: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: AppColors.whiteTranslucent,
        padding: 8,
        borderRadius: 8,
    },
    infoIconContainer: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoIconText: {
        color: AppColors.greenDark,
        fontSize: 10,
        fontWeight: 'bold',
    },
    infoText: {
        color: 'white',
        fontSize: 10,
        fontWeight: '500',
    },
    stepsText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
});

export default WalkInfoBar;
