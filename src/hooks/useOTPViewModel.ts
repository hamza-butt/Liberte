import { useNavigation, useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import { api } from "../services/ApiClient";
import { ENDPOINTS } from "../services/ApiEndpoints";

export const useOTPViewModel = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { email, type } = route.params || {};

    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [timer, setTimer] = useState(60);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((lastTimerCount) => {
                    if (lastTimerCount <= 1) {
                        clearInterval(interval);
                        return 0;
                    }
                    return lastTimerCount - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer > 0]);



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
            let response;
            if (type === 'forgot_password') {
                console.log("Verifying Forgot Password OTP for:", email);
                response = await api.request(
                    ENDPOINTS.FORGOT_PASSWORD_VERIFY_OTP,
                    "POST",
                    { email, otp }
                );
            } else {
                console.log("Verifying Registration OTP for:", email);
                response = await api.request(
                    ENDPOINTS.VERIFY_REGISTRATION_ACCOUNT,
                    "POST",
                    { email, otp }
                );
            }

            console.log("OTP Verification Success:", response);

            Toast.show({
                type: "success",
                text1: "Verification Successful",
                text2: "OTP Verified Successfully",
            });

            if (type === 'forgot_password') {
                navigation.navigate("ResetPassword", { email, otp });
            } else {
                navigation.pop(2);
            }


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
        if (timer > 0) return;

        setIsLoading(true);
        try {
            let endpoint = ENDPOINTS.RESEND_VERIFY_OTP;

            if (type === 'forgot_password') {
                endpoint = ENDPOINTS.FORGOT_PASSWORD_SEND_OTP;
            }

            const response = await api.request(
                endpoint,
                "POST",
                { email }
            );
            console.log("Resend OTP Success:", response);
            Toast.show({
                type: "success",
                text1: "OTP Resent",
                text2: "Please check your email",
            });
            setTimer(30);
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
        timer,
    };
};
