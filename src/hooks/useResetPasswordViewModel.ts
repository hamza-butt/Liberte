import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { api } from "../services/ApiClient";
import { ENDPOINTS } from "../services/ApiEndpoints";

export const useResetPasswordViewModel = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { token } = route.params || {};

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleResetPassword = async () => {
        if (!password || !confirmPassword) {
            Toast.show({
                type: "error",
                text1: "Validation Error",
                text2: "Please fill in all fields",
            });
            return;
        }

        if (password !== confirmPassword) {
            Toast.show({
                type: "error",
                text1: "Validation Error",
                text2: "Passwords do not match",
            });
            return;
        }

        setIsLoading(true);
        try {
            console.log("Resetting Password with token:", token);
            const response = await api.request(
                ENDPOINTS.FORGOT_PASSWORD_CHANGE,
                "POST",
                {
                    token,
                    password,
                    confirm_password: confirmPassword
                }
            );

            console.log("Password Reset Success:", response);

            Toast.show({
                type: "success",
                text1: "Success",
                text2: "Password changed successfully",
            });

            navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
            });

        } catch (error: any) {
            console.error("Password Reset Failed:", error.message);
            Toast.show({
                type: "error",
                text1: "Reset Failed",
                text2: error.message || "Something went wrong",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return {
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        isLoading,
        handleResetPassword,
    };
};
