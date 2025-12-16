import { useState, useCallback, useEffect } from 'react';
import { Alert, AppState, AppStateStatus } from 'react-native';
import PedometerService, { PedometerUpdate } from '../services/PedometerService';
import { RESULTS, PermissionStatus } from 'react-native-permissions';

export const useWalkTracker = () => {
    const [isTracking, setIsTracking] = useState(false);
    const [steps, setSteps] = useState(0);
    const [distance, setDistance] = useState(0);
    const [permissionStatus, setPermissionStatus] = useState<PermissionStatus | null>(null);

    const handleUpdate = useCallback((data: PedometerUpdate) => {
        setSteps(data.steps);
        setDistance(data.distance);
    }, []);

    const startTracking = async () => {
        const status = await PedometerService.checkPermission();
        setPermissionStatus(status);

        if (status === RESULTS.GRANTED) {
            startService();
        } else if (status === RESULTS.DENIED) {
            const newStatus = await PedometerService.requestPermission();
            setPermissionStatus(newStatus);
            if (newStatus === RESULTS.GRANTED) {
                startService();
            } else if (newStatus === RESULTS.BLOCKED) {
                showSettingsAlert();
            }
        } else if (status === RESULTS.BLOCKED || status === RESULTS.UNAVAILABLE) {
            showSettingsAlert();
        }
    };

    const startService = () => {
        // setIsTracking(true);
        // setSteps(0);
        // setDistance(0);
        // PedometerService.startTracking(handleUpdate);
    };

    const stopTracking = () => {
        // setIsTracking(false);
        // PedometerService.stopTracking();
    };

    const showSettingsAlert = () => {
        Alert.alert(
            'Permission Required',
            'We need access to your motion data to track your steps. Please enable it in settings.',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Open Settings', onPress: () => PedometerService.openAppSettings() },
            ]
        );
    };

    // Resume tracking if app comes to foreground and was tracking? 
    // For now, simpler: just session based. 
    // If the library supports background, it should persist.
    // We clean up on unmount.
    useEffect(() => {
        return () => {
            // Optional: Stop tracking on unmount if desired, or let it run.
            // Usually for "Start Walking" feature, we want it to run until user stops it explicitly.
            // But to be safe for dev, let's not stop it here unless we are sure.
            // Actually, if component unmounts (nav away), we probably want to pause or keep it in global state.
            // For now, since it is a screen, we leaving it might stop it.
            // Let's assume the user stays on screen or we want to support background.
        };
    }, []);

    return {
        isTracking,
        steps,
        distance,
        permissionStatus,
        startTracking,
        stopTracking
    };
};
