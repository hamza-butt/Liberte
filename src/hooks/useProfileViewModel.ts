import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/ApiClient';
import { ENDPOINTS } from '../services/ApiEndpoints';
import { ProfileData, UpdateUserImageResponse } from '../types/ProfileTypes';
import { getToken } from '../utils/storage';
import { ImagePickerService } from '../services/ImagePickerService';

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
                console.log("Profile fetch response:", response);
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

        // Optimistic update
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
        const formData = new FormData();
        const token = await getToken();
        formData.append('token', token);
        formData.append('user_image', {
            uri: asset.uri,
            type: asset.type || 'image/jpeg',
            name: asset.fileName || 'profile_image.jpg',
        } as any);

        try {
            const response = await api.request<UpdateUserImageResponse>(
                ENDPOINTS.UPDATE_USER_IMAGE,
                'POST',
                formData
            );


            if (!response.status || !response.data?.user_image) {
                console.warn("Image upload failed or no URL returned:", response.message);
                return;
            }

            const imageUrl = response.data.user_image;
            if (profileData && profileData.user) {
                setProfileData({
                    ...profileData,
                    user: {
                        ...profileData.user,
                        user_image: imageUrl
                    }
                });
                console.log("Image uploaded successfully. New URL:", imageUrl);
            }

        } catch (error) {
            console.error("Error uploading image:", error);
        }
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
