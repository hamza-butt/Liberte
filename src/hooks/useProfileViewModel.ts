import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/ApiClient';
import { ENDPOINTS } from '../services/ApiEndpoints';
import { ProfileData } from '../types/ProfileTypes';
import { getToken } from '../utils/storage';
import { ImagePickerService } from '../services/ImagePickerService';

export const useProfileViewModel = () => {
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchProfileData = useCallback(async () => {
        try {
            // const token = await getToken();
            const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjI1IiwiaWF0IjoxNzY3MDA0MjgwLCJleHAiOjE3Njk1OTYyODB9.doTZyhruDkbRsiv1xhh7VQcOEjErXSH5yM2EMSeRS4o";

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

    const handleUpdateProfileImage = async () => {
        console.log("Update profile image");
        const asset = await ImagePickerService.pickImage();
        if (!asset || !asset.uri) {
            console.warn("No image selected");
            return;
        }

        // update profile image
        if (profileData && profileData.user) {
            setProfileData({
                ...profileData,
                user: {
                    ...profileData.user,
                    user_image: asset.uri
                }
            });
        }


        // upload image to server

    };

    useEffect(() => {
        fetchProfileData();
    }, [fetchProfileData]);

    return {
        profileData,
        isLoading,
        handleUpdateProfileImage
    };
};
