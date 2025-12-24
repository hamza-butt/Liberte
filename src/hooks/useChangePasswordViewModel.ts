import { useState } from 'react';
import { api } from '../services/ApiClient';
import { ENDPOINTS } from '../services/ApiEndpoints';
import { getToken } from '../utils/storage';
import Toast from 'react-native-toast-message';

export const useChangePasswordViewModel = () => {
    const [isLoading, setIsLoading] = useState(false);

    const changePassword = async (
        oldPassword: string,
        newPassword: string,
        confirmPassword: string,
        onSuccess: () => void
    ) => {
        setIsLoading(true);

        // Validation
        if (!oldPassword || !newPassword || !confirmPassword) {
            Toast.show({
                type: 'error',
                text1: 'Validation Error',
                text2: 'All fields are required.'
            });
            setIsLoading(false);
            return;
        }

        if (newPassword !== confirmPassword) {
            Toast.show({
                type: 'error',
                text1: 'Validation Error',
                text2: 'New passwords do not match.'
            });
            setIsLoading(false);
            return;
        }

        try {
            const token = await getToken();
            if (!token) {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Authentication token not found.'
                });
                setIsLoading(false);
                return;
            }

            const response = await api.request(
                ENDPOINTS.CHANGE_PASSWORD,
                'POST',
                {
                    token,
                    old_password: oldPassword,
                    new_password: newPassword,
                    confirm_password: confirmPassword
                }
            );

            if (response.status) {
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: response.message || 'Password changed successfully.'
                });
                onSuccess();
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: response.message || "Failed to change password."
                });
            }
        } catch (error: any) {
            console.error("Error changing password:", error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.message || "An unexpected error occurred."
            });
        } finally {
            setIsLoading(false);
        }
    };

    return {
        changePassword,
        isLoading,
    };
};
