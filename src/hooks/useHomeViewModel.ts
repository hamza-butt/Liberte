import { useState, useEffect, useCallback } from 'react';
import { WeatherData } from '../types/HomeTypes';
import { api } from '../services/ApiClient';
import { ENDPOINTS } from '../services/ApiEndpoints';
import { getToken } from '../utils/storage';
import { User } from '../types/User';
import { useUser } from '../context/UserContext';
import LocationService from '../services/LocationService';

export const useHomeViewModel = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [weather, setWeather] = useState("loading...");
    const { setUser } = useUser();

    const fetchLocationAndWeather = useCallback(async () => {
        console.log("fetchLocationAndWeather");
        try {
            const location = await LocationService.getLocation();
            if (location) {
                console.log('Location fetched:', location);
                console.log('Latitude:', location.coords.latitude);
                console.log('Longitude:', location.coords.longitude);
                const weatherResponse = await api.request<WeatherData>(
                    ENDPOINTS.GET_WEATHER_BY_LOCATION,
                    'GET',
                    {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        unit: 'C'
                    }
                );
                if (weatherResponse.status && weatherResponse.data) {
                    const { temperature, unit } = weatherResponse.data;
                    setWeather(`${temperature}${unit}`);
                }

            }
        } catch (err) {
            console.error('Error fetching location:', err);
        }
    }, []);

    const fetchUserDetails = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const token = await getToken();
            if (!token) {
                console.warn('No token found, skipping fetch user details');
                return;
            }

            const response = await api.request<User>(
                ENDPOINTS.GET_USER_DETAILS,
                'GET',
                { token }
            );

            if (response.status && response.data) {
                console.log('User details fetched successfully:', response.data);
                await setUser(response.data);
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
        fetchLocationAndWeather();
    }, [fetchUserDetails, fetchLocationAndWeather]);

    return {
        isLoading,
        error,
        weather,
        refetch: fetchUserDetails,
    };
};
