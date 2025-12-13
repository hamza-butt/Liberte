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
        // Placeholder for claim functionality if needed
        // For now the task is just to "get" the status and update info
        Alert.alert("Claim", "Claim functionality to be implemented");
    };

    return {
        loading,
        data,
        error,
        refetch: fetchDailyClaimStatus,
        claimReward
    };
};
