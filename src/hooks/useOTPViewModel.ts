import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { api } from "../services/ApiClient";
import { ENDPOINTS } from "../services/ApiEndpoints";

export const useOTPViewModel = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    // const { email } = route.params || {};
    const email = "m.hamzase@gmail.com";

    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleVerify = async () => {
        if (otp.length < 6) {
            Toast.show({
                type: "error",
                text1: "Validation Error",
                text2: "Please enter a valid 6-digit OTP",
            });
            return;
        }

        setIsLoading(true);
        try {
            const response = await api.request(
                ENDPOINTS.VERIFY_REGISTRATION_ACCOUNT,
                "POST",
                { email, otp }
            );
            console.log("OTP Verification Success:", response);
            Toast.show({
                type: "success",
                text1: "Verification Successful",
                text2: "Welcome back!",
            });

            navigation.pop(2);
        } catch (error: any) {
            console.error("OTP Verification Failed:", error.message);
            Toast.show({
                type: "error",
                text1: "Verification Failed",
                text2: error.message || "Invalid OTP",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        setIsLoading(true);
        try {
            const response = await api.request(
                ENDPOINTS.RESEND_VERIFY_OTP,
                "POST",
                { email }
            );
            console.log("Resend OTP Success:", response);
            Toast.show({
                type: "success",
                text1: "OTP Resent",
                text2: "Please check your email",
            });
        } catch (error: any) {
            console.error("Resend OTP Failed:", error.message);
            Toast.show({
                type: "error",
                text1: "Resend Failed",
                text2: error.message || "Could not resend OTP",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return {
        otp,
        setOtp,
        isLoading,
        handleVerify,
        handleResend,
        email,
    };
};
