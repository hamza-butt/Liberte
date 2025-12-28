import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/ApiClient';
import { ENDPOINTS } from '../services/ApiEndpoints';
import { getToken } from '../utils/storage';
import { User } from '../types/User';
import { useUser } from '../context/UserContext';

export const useHomeViewModel = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { setUser } = useUser();

    const fetchUserDetails = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const token = await getToken();
            if (!token) {
                console.warn('No token found, skipping fetch user details');
                return;
            }

            const response = await api.request<{ data: User }>(
                ENDPOINTS.GET_USER_DETAILS,
                'GET',
                { token }
            );

            console.log('User details fetched successfully:', response.data);

            if (response.status && response.data) {
                console.log('User details fetched successfully:', response.data);
                await setUser(response.data as unknown as User);
            }
        } catch (err: any) {
            console.error('Error fetching user details:', err);
            setError(err.message || 'Failed to fetch user details');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUserDetails();
    }, [fetchUserDetails]);

    return {
        isLoading,
        error,
        refetch: fetchUserDetails,
    };
};
