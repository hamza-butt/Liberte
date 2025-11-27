import React, { useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { AppColors } from "../../theme/colors";

type NumberTextFieldProps = {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    onChangeFormattedText: (text: string) => void;
    onChangeCountry?: (country: any) => void;
    defaultCode?: any;
};

function NumberTextField({
    label,
    value,
    onChangeText,
    onChangeFormattedText,
    onChangeCountry,
    defaultCode = "US",
}: NumberTextFieldProps) {
    const phoneInput = useRef<PhoneInput>(null);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <PhoneInput
                ref={phoneInput}
                defaultValue={value}
                defaultCode={defaultCode}
                layout="first"
                onChangeText={onChangeText}
                onChangeFormattedText={onChangeFormattedText}
                onChangeCountry={onChangeCountry}
                containerStyle={styles.inputContainer}
                textContainerStyle={styles.textContainer}
                textInputStyle={styles.textInput}
                codeTextStyle={styles.codeText}
                flagButtonStyle={styles.flagButton}
                placeholder="Enter phone number"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 8,
    },
    label: {
        color: AppColors.primaryTextDark,
        fontSize: 16,
        fontWeight: "600",
    },
    inputContainer: {
        width: "100%",
        height: 50,
        borderRadius: 15,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 12,
        elevation: 5,
        overflow: "hidden",
    },
    textContainer: {
        backgroundColor: "#fff",
        paddingVertical: 0,
        paddingHorizontal: 0,
    },
    textInput: {
        fontSize: 16,
        color: "#13293D",
        height: 50,
        paddingVertical: 0,
    },
    codeText: {
        fontSize: 16,
        color: "#13293D",
        fontWeight: "500",
    },
    flagButton: {
        width: 50,
        justifyContent: "center",
    },
});

export default NumberTextField;
