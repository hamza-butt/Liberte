
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { api } from "../services/ApiClient";
import { ENDPOINTS } from "../services/ApiEndpoints";
import { isValidEmail } from "../utils/validation";

export const useForgotPasswordViewModel = () => {
    const navigation = useNavigation<any>();
    // const [email, setEmail] = useState("");
    const [email, setEmail] = useState("m.hamzase@gmail.com");
    const [isLoading, setIsLoading] = useState(false);

    const validateInput = () => {
        if (!email) {
            Toast.show({
                type: "error",
                text1: "Validation Error",
                text2: "Email is required",
            });
            return false;
        }
        if (!isValidEmail(email)) {
            Toast.show({
                type: "error",
                text1: "Validation Error",
                text2: "Please enter a valid email address",
            });
            return false;
        }
        return true;
    };

    const handleSendOTP = async () => {
        if (!validateInput()) return;

        setIsLoading(true);
        const params = {
            email,
        };

        try {
            console.log("Attempting to send OTP to:", email);
            const response = await api.request(ENDPOINTS.FORGOT_PASSWORD_SEND_OTP, "POST", params);
            console.log("Send OTP Response:", response);

            if (response.status === true) {
                Toast.show({
                    type: "success",
                    text1: "OTP Sent",
                    text2: response.message || "Please check your email for the OTP.",
                });
                // Assuming we navigate to OTP screen, passing email if needed
                navigation.navigate("OTP", { email, type: 'forgot_password' });
            } else {
                Toast.show({
                    type: "error",
                    text1: "Failed to Send OTP",
                    text2: response.message || "Please try again later.",
                });
            }

        } catch (error: any) {
            console.error("Send OTP Failed:", error.message);
            Toast.show({
                type: "error",
                text1: "Request Failed",
                text2: error.message || "Something went wrong",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleBack = () => {
        navigation.goBack();
    };

    return {
        email,
        setEmail,
        isLoading,
        handleSendOTP,
        handleBack
    };
};
