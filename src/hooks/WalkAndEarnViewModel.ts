import { useState, useCallback, useRef } from 'react';
import { Alert } from 'react-native';
import PedometerService, { PedometerUpdate } from '../services/PedometerService';
import SocketService from '../services/SocketService';
import { getToken } from '../utils/storage';
import { RESULTS, PermissionStatus } from 'react-native-permissions';

export const WalkAndEarnViewModel = () => {
    const [isTracking, setIsTracking] = useState(false);
    const [steps, setSteps] = useState(0);
    const [distance, setDistance] = useState(0);
    const [selectedCause, setSelectedCause] = useState<number | null>(null);
    const [permissionStatus, setPermissionStatus] = useState<PermissionStatus | null>(null);

    // Refs to track previous values for delta calculation
    const lastStepsRef = useRef(0);
    const lastDistanceRef = useRef(0);
    const tokenRef = useRef<string | null>(null);


    const testSocket = () => {
        console.log("called")
        SocketService.connect();

        //  
    }


    // Check permission and start tracking
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

    // Start the pedometer service
    const startService = async () => {
        console.log("Starting service");

        const token = await getToken();
        tokenRef.current = token;
        if (token) {
            // SocketService.connect();
        }

        // Reset tracking state and refs
        setIsTracking(true);
        setSteps(0);
        setDistance(0);
        lastStepsRef.current = 0;
        lastDistanceRef.current = 0;

        PedometerService.startTracking(handleUpdate);
    };

    const handleUpdate = useCallback((data: PedometerUpdate) => {
        // Calculate deltas
        const stepsDelta = data.steps - lastStepsRef.current;
        const distanceDelta = data.distance - lastDistanceRef.current;
        console.log("Pedometer Update:", data);
        if (stepsDelta > 0 || distanceDelta > 0) {
            console.log(`Pedometer Delta Update: +${stepsDelta} steps, +${distanceDelta.toFixed(2)}m`);

            // if (tokenRef.current) {
            //     SocketService.sendStepEvent({
            //         token: tokenRef.current,
            //         category_id: 1,
            //         steps: stepsDelta,
            //         type: "walking",
            //         lat: 22.57,
            //         lng: 88.36
            //     });
            // }

            // Update refs
            lastStepsRef.current = data.steps;
            lastDistanceRef.current = data.distance;
        }

        // Update UI with cumulative values
        setSteps(data.steps);
        setDistance(data.distance);
    }, []);

    // Stop the pedometer service
    const stopTracking = () => {
        setIsTracking(false);
        PedometerService.stopTracking();
        // SocketService.disconnect();
    };

    // Show settings alert
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

    return {
        isTracking,
        steps,
        distance,
        permissionStatus,
        startTracking,
        stopTracking,
        selectedCause,
        setSelectedCause,
        testSocket
    };
};
