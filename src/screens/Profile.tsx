import React from "react";
import { View, Text, StyleSheet, ImageBackground, ScrollView } from "react-native";
import { AppColors } from "../theme/colors";
import { useHeaderHeight } from "@react-navigation/elements";


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
                    <Text>Profile</Text>
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
    },
});

export default Profile;
