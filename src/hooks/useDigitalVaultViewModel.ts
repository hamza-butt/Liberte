import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/ApiClient';
import { ENDPOINTS } from '../services/ApiEndpoints';
import { getToken } from '../utils/storage';
import { DigitalVaultData } from '../types/DigitalVaultTypes';

export const useDigitalVaultViewModel = () => {
    const [data, setData] = useState<DigitalVaultData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchDigitalVaultData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const token = await getToken();
            if (!token) {
                console.warn('No token found, skipping fetch digital vault data');
                return;
            }

            const response = await api.request<{ data: DigitalVaultData }>(
                ENDPOINTS.GET_DIGITAL_VAULT_DATA,
                'GET',
                { token }
            );

            if (response.status && response.data) {
                setData(response.data as unknown as DigitalVaultData);
            }
        } catch (err: any) {
            console.error('Error fetching digital vault data:', err);
            setError(err.message || 'Failed to fetch digital vault data');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDigitalVaultData();
    }, [fetchDigitalVaultData]);

    return {
        data,
        isLoading,
        error,
        refetch: fetchDigitalVaultData,
    };
};
