import { CommonActions, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { api } from "../services/ApiClient";
import { ENDPOINTS } from "../services/ApiEndpoints";
import { isValidEmail } from "../utils/validation";

export const useLoginViewModel = () => {
    const navigation = useNavigation<any>();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
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
        if (!password) {
            Toast.show({
                type: "error",
                text1: "Validation Error",
                text2: "Password is required",
            });
            return false;
        }
        return true;
    };

    const handleSignIn = async () => {
        if (!validateInput()) return;

        setIsLoading(true);
        const params = {
            email,
            password,
        };

        try {
            console.log("Attempting login with:", params);
            const response = await api.request(ENDPOINTS.USER_LOGIN, "POST", params);
            console.log("Login Success:", response);

            if (response.status && response.data) {
                const { token, ...userData } = response.data;

                // store user token when logged in
                const { setToken } = require('../utils/storage');
                await setToken(token);


                // make remember me true when logged in
                if (rememberMe) {
                    const { setRememberMe } = require('../utils/storage');
                    await setRememberMe(true);
                }
            }

            Toast.show({
                type: "success",
                text1: "Login Successful",
                text2: "Welcome back! 👋",
            });
            // Navigate to Main or Home after successful login and reset stack
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: "Main" }],
                })
            );
        } catch (error: any) {
            console.error("Login Failed:", error.message);
            Toast.show({
                type: "error",
                text1: "Login Failed",
                text2: error.message || "Something went wrong",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignUp = () => {
        navigation.navigate("Signup");
    };

    const handleForgotPassword = () => {
        navigation.navigate("ForgotPassword");
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        rememberMe,
        setRememberMe,
        isLoading,
        handleSignIn,
        handleSignUp,
        handleForgotPassword,
    };
};
