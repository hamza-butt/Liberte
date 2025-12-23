import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/ApiClient';
import { ENDPOINTS } from '../services/ApiEndpoints';
import { getToken } from '../utils/storage';
import { ReferAndEarnData } from '../types/Referral';

export const useReferAndEarnViewModel = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [referralData, setReferralData] = useState<ReferAndEarnData | null>(null);

    const fetchReferralData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            // const token = await getToken();
            const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjE1IiwiaWF0IjoxNzY2MTUzNzM0LCJleHAiOjE3Njg3NDU3MzR9.D5BH6PE4NoYLp-gkr7H3iExX4v7qFI97mn72TITW3wI"
            if (!token) {
                console.warn('No token found, skipping fetch referral data');
                return;
            }
            const response = await api.request<ReferAndEarnData>(
                ENDPOINTS.GET_REFER_AND_EARN_DATA,
                'GET',
                { token }
            );

            if (response.status && response.data) {
                setReferralData(response.data);
            } else {
                setError(response.message || 'Failed to fetch referral data');
            }
        } catch (err: any) {
            console.error('Error fetching referral data:', err);
            setError(err.message || 'Failed to fetch referral data');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchReferralData();
    }, [fetchReferralData]);

    return {
        isLoading,
        error,
        referralData,
        refetch: fetchReferralData,
    };
};
