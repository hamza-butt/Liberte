import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { api } from "../services/ApiClient";
import { ENDPOINTS } from "../services/ApiEndpoints";
import { isValidEmail } from "../utils/validation";

export const useSignupViewModel = () => {
    const navigation = useNavigation<any>();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [referralCode, setReferralCode] = useState("");
    const [formattedPhoneNumber, setFormattedPhoneNumber] = useState("");
    const [countryCode, setCountryCode] = useState("US");
    const [callingCode, setCallingCode] = useState("1");
    const [isLoading, setIsLoading] = useState(false);

    const validateInput = () => {
        if (!fullName.trim()) {
            Toast.show({
                type: "error",
                text1: "Validation Error",
                text2: "Full Name is required",
            });
            return false;
        }
        if (!email.trim()) {
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
        if (!phoneNumber.trim()) {
            Toast.show({
                type: "error",
                text1: "Validation Error",
                text2: "Phone Number is required",
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
        if (password !== confirmPassword) {
            Toast.show({
                type: "error",
                text1: "Validation Error",
                text2: "Passwords do not match",
            });
            return false;
        }
        return true;
    };

    const handleSignup = async () => {
        if (!validateInput()) return;

        setIsLoading(true);
        const params = {
            full_name: fullName,
            country_code: `+${callingCode}`,
            phone_number: phoneNumber,
            email: email,
            password: password,
            confirm_password: confirmPassword,
            refferal_code: referralCode,
        };

        try {
            console.log("Attempting signup with:", params);
            const response = await api.request(
                ENDPOINTS.USER_REGISTRATION,
                "POST",
                params
            );
            console.log("Signup Success:", response);
            Toast.show({
                type: "success",
                text1: "Signup Successful",
                text2: "Please login to continue",
            });
            navigation.navigate("OTP", { email });
        } catch (error: any) {
            console.error("Signup Failed:", error.message);
            Toast.show({
                type: "error",
                text1: "Signup Failed",
                text2: error.message || "Something went wrong",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleNavigateToLogin = () => {
        navigation.goBack();
    };

    return {
        fullName,
        setFullName,
        email,
        setEmail,
        phoneNumber,
        setPhoneNumber,
        formattedPhoneNumber,
        setFormattedPhoneNumber,
        countryCode,
        setCountryCode,
        callingCode,
        setCallingCode,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        referralCode,
        setReferralCode,
        isLoading,
        handleSignup,
        handleNavigateToLogin,
    };
};
