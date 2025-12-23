import React from "react";
import { View, Text, StyleSheet, Image, ImageSourcePropType } from "react-native";
import { AppColors } from "../../theme/colors";

interface ProfileHeaderProps {
    image: ImageSourcePropType;
    name: string;
    email: string;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
    image,
    name,
    email,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={image} style={styles.image} />
            </View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.email}>{email}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginBottom: 24,
    },
    imageContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 4,
        borderColor: AppColors.whiteTranslucent,
        marginBottom: 16,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    name: {
        fontSize: 24,
        fontWeight: "bold",
        color: AppColors.primaryTextDark,
        marginBottom: 8,
        textAlign: "center",
    },
    email: {
        fontSize: 16,
        color: AppColors.primaryTextDark,
        textAlign: "center",
    },
});
