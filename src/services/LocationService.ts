import Geolocation from 'react-native-geolocation-service';
import { Platform, Alert } from 'react-native';
import {
    check,
    request,
    PERMISSIONS,
    RESULTS,
    openSettings,
    PermissionStatus,
} from 'react-native-permissions';

class LocationService {
    private static instance: LocationService;

    private constructor() { }

    public static getInstance(): LocationService {
        if (!LocationService.instance) {
            LocationService.instance = new LocationService();
        }
        return LocationService.instance;
    }

    async getLocation(): Promise<Geolocation.GeoPosition | null> {
        try {
            const status = await this.checkPermission();
            console.log('Location permission status:', status);

            if (status === 'granted') {
                return await this.getCurrentLocation();
            } else if (status === 'blocked' || status === 'unavailable') {
                this.showPermissionBlockedAlert();
                return null;
            } else {
                const requestResult = await this.requestPermission();
                if (requestResult === 'granted') {
                    return await this.getCurrentLocation();
                } else if (requestResult === 'blocked') {
                    this.showPermissionBlockedAlert();
                    return null;
                }
            }
        } catch (err) {
            console.error('Error fetching location:', err);
        }
        return null;
    }


    async checkPermission(): Promise<PermissionStatus> {
        const permission = Platform.select({
            ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
            android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        });

        if (!permission) return RESULTS.UNAVAILABLE;

        try {
            const result = await check(permission);
            return result;
        } catch (error) {
            console.error('Error checking permission:', error);
            return RESULTS.DENIED;
        }
    }


    async requestPermission(): Promise<PermissionStatus> {
        const permission = Platform.select({
            ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
            android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        });

        if (!permission) return RESULTS.UNAVAILABLE;

        try {
            const result = await request(permission);
            return result;
        } catch (error) {
            console.error('Error requesting permission:', error);
            return RESULTS.DENIED;
        }
    }

    async openAppSettings() {
        await openSettings();
    }

    showPermissionBlockedAlert() {
        Alert.alert(
            'Permission Required',
            'Please enable location services in settings to see local weather.',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Open Settings', onPress: () => this.openAppSettings() },
            ]
        );
    }

    async getCurrentLocation(): Promise<Geolocation.GeoPosition | null> {
        return new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition(
                (position) => {
                    resolve(position);
                },
                (error) => {
                    console.error(error.code, error.message);
                    resolve(null);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        });
    }


}

export default LocationService.getInstance();
