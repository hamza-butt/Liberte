import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import InfiniteScrollBackground from './InfiniteScrollBackground';
import WalkInfoBar from './WalkInfoBar';

interface WalkAnimationProps {
    steps: number;
    goal: number;
}

const WalkAnimation: React.FC<WalkAnimationProps> = ({ steps, goal }) => {

    const getBackgroundImage = () => {
        if (goal === 0) return require('../../assets/walkAndEarn/desert/forest1.png');

        const percentage = Math.min((steps / goal) * 100, 100);

        if (percentage < 25) {
            return require('../../assets/walkAndEarn/desert/forest1.png');
        } else if (percentage < 50) {
            return require('../../assets/walkAndEarn/desert/forest2.png');
        } else if (percentage < 75) {
            return require('../../assets/walkAndEarn/desert/forest3.png');
        } else {
            return require('../../assets/walkAndEarn/desert/forest4.png');
        }
    };

    return (

        <View>
            <View style={styles.container}>
                {/* Animated Background Layer */}
                <InfiniteScrollBackground
                    imageSource={getBackgroundImage()}
                    duration={13000}
                />

                {/* Walking Man GIF */}
                <View style={styles.gifContainer}>
                    <Image
                        source={require('../../assets/walkAndEarn/walkingMan.gif')}
                        style={styles.walkingGif}
                        resizeMode="contain"
                    />
                </View>
            </View>
            <WalkInfoBar steps={steps} goal={goal} />
        </View>



    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 250,
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 8,
        position: 'relative',
    },

    gifContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    walkingGif: {
        width: 150,
        height: 150,
        paddingTop: 20,
        marginTop: 60,
    },
});

export default WalkAnimation;
