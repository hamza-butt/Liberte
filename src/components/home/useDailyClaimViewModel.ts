import { useState, useEffect } from 'react';
import { api } from '../../services/ApiClient';
import { ENDPOINTS } from '../../services/ApiEndpoints';
import { DailyClaimData, DailyClaimResponse } from '../../types/DailyClaimTypes';
import { Alert } from 'react-native';
import { getToken } from '../../utils/storage';

export const useDailyClaimViewModel = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<DailyClaimData | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchDailyClaimStatus = async () => {
        try {

            setLoading(true);
            let token = await getToken();
            if (!token) {
                console.log("Token fetch timeout.");
                setLoading(false);
                return;
            }

            const response = await api.request<DailyClaimData>(
                ENDPOINTS.GET_DAILY_CLAIM_STATUS,
                'GET',
                { token }
            );
            console.log('Daily claim status fetched successfully:', response.data);

            if (response.status && response.data) {
                setData(response.data);
            } else {
                setError(response.message || 'Failed to fetch daily claim status');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred');
            console.error("Error fetching daily claim:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDailyClaimStatus();
    }, []);


    const claimReward = async () => {
        try {
            setLoading(true);
            const token = await getToken();
            if (!token) {
                Alert.alert("Error", "User token not found");
                setLoading(false);
                return;
            }

            const response = await api.request<any>(
                ENDPOINTS.USER_DAILY_CLAIM,
                'GET',
                { token }
            );

            if (response.status) {
                // Success
                Alert.alert("Success", response.message || "Claim successful.");
                fetchDailyClaimStatus(); // Refresh status
            } else {
                // Already claimed or other error
                Alert.alert("Claim Info", response.message || "Could not claim reward.");
            }
        } catch (error: any) {
            console.error("Error claiming reward:", error);
            Alert.alert("Error", error.message || "Failed to claim reward");
        } finally {
            setLoading(false);
        }
    };



    // Time related logic
    const [remainingTime, setRemainingTime] = useState<string>("--:--:--");

    const parseTime = (timeStr: string): number => {
        const parts = timeStr.split(':');
        if (parts.length === 3) {
            return (parseInt(parts[0], 10) * 3600) + (parseInt(parts[1], 10) * 60) + parseInt(parts[2], 10);
        }
        return 0;
    };

    const formatTime = (totalSeconds: number): string => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        if (data?.time_left) {
            let totalSeconds = parseTime(data.time_left);
            setRemainingTime(formatTime(totalSeconds));

            const interval = setInterval(() => {
                if (totalSeconds > 0) {
                    totalSeconds -= 1;
                    setRemainingTime(formatTime(totalSeconds));
                } else {
                    clearInterval(interval);
                    // Optionally refetch or update status here
                }
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [data?.time_left]);

    return {
        loading,
        data,
        error,
        formattedTime: remainingTime,
        refetch: fetchDailyClaimStatus,
        claimReward
    };
};
