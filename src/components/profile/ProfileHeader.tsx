import React from "react";
import { View, Text, StyleSheet, Image, ImageSourcePropType, Pressable } from "react-native";
import { AppColors } from "../../theme/colors";

interface ProfileHeaderProps {
    image: ImageSourcePropType;
    name: string;
    email: string;
    onEditImage?: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
    image,
    name,
    email,
    onEditImage,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={image} style={styles.image} />
                {onEditImage && (
                    <Pressable style={styles.editButton} onPress={onEditImage}>
                        <Image
                            source={require("../../assets/common/plus.png")}
                            style={styles.editIcon}
                        />
                    </Pressable>
                )}
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
        marginBottom: 16,
        // Remove overflow: hidden from here to let the absolute button show if it goes outside (though we want it inside usually)
        // But for a badge on the rim, we might need it. Let's keep it inside for now as per "add plus button here" 
        // usually implies an overlay or a badge. Let's make it a badge on the bottom right.
    },
    imageWrapper: { // Helper wrapper if needed, but modifying existing structure
        // Staying with simple modification
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 60, // Moving border radius here if we remove overflow hidden on container, but let's stick to container approach
        resizeMode: "cover",
        borderWidth: 4,
        borderColor: AppColors.whiteTranslucent,
    },
    editButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: AppColors.whiteTranslucent,
    },
    editIcon: {
        width: 24,
        height: 24,
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
