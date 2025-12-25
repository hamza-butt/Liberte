import { useState } from 'react';
import { api } from '../services/ApiClient';
import { ENDPOINTS } from '../services/ApiEndpoints';
import { getToken } from '../utils/storage';
import Toast from 'react-native-toast-message';

export const usePersonalGoalViewModel = () => {
    const [isLoading, setIsLoading] = useState(false);

    const saveGoals = async (
        dailyStepGoal: string,
        activityLevel: string,
        weeklyGoal: string,
        onSuccess: () => void
    ) => {
        setIsLoading(true);

        // Validation for Weekly Goal
        const weeklyGoalNum = parseInt(weeklyGoal);
        const dailyStepGoalNum = parseInt(dailyStepGoal);

        // Check if daily step goal is valid
        if (isNaN(dailyStepGoalNum) || dailyStepGoalNum <= 0) {
            Toast.show({
                type: 'error',
                text1: 'Invalid Input',
                text2: 'Please enter a valid number for daily steps.'
            });
            setIsLoading(false);
            return;
        }

        // Check if weekly goal is valid
        if (isNaN(weeklyGoalNum) || weeklyGoalNum < 1 || weeklyGoalNum > 7) {
            Toast.show({
                type: 'error',
                text1: 'Invalid Input',
                text2: 'Weekly goal must be between 1 and 7 days.'
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

            const params = {
                token,
                daily_step_goal: parseInt(dailyStepGoal),
                activity_level: activityLevel,
                weekly_goal: weeklyGoalNum
            };

            console.log("params ", params);

            const response = await api.request(
                ENDPOINTS.SAVE_USER_GOALS,
                'POST',
                params
            );

            if (response.status) {
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Your goals have been saved successfully!'
                });
                onSuccess();
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: response.message || "Failed to save goals."
                });
            }
        } catch (error: any) {
            console.error("Error saving goals:", error);
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
        saveGoals,
        isLoading,
    };
};
