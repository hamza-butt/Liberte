import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/ApiClient';
import { ENDPOINTS } from '../services/ApiEndpoints';
import { ProfileData } from '../types/ProfileTypes';
import { getToken } from '../utils/storage';

export const useProfileViewModel = () => {
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchProfileData = useCallback(async () => {
        try {
            const token = await getToken();
            if (!token) {
                console.warn("No token found");
                setIsLoading(false);
                return;
            }

            const response = await api.request<ProfileData>(
                ENDPOINTS.GET_PROFILE_DATA,
                'GET',
                { token }
            );

            if (response.status && response.data) {
                setProfileData(response.data);
            } else {
                console.warn("Profile fetch returned status false or no data");
            }
        } catch (error) {
            console.error("Error fetching profile data:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProfileData();
    }, [fetchProfileData]);

    return {
        profileData,
        isLoading,
    };
};
