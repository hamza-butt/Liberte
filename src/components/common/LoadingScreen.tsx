import React from "react";
import { View, StyleSheet, ImageBackground, ActivityIndicator } from "react-native";
import { AppColors } from "../../theme/colors";

const LoadingScreen = () => {
    return (
        <View style={styles.fullScreen}>
            <ImageBackground
                source={require("../../assets/welcome/intro_background.png")}
                style={styles.background}
                imageStyle={styles.backgroundImage}
            >
                <ActivityIndicator size="large" color={AppColors.primaryTextDark} />
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
        justifyContent: "center",
        alignItems: "center",
    },
    backgroundImage: {
        resizeMode: "cover",
    },
});

export default LoadingScreen;
