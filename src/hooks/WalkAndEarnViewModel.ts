import { useState, useCallback, useRef, useEffect } from 'react';
import { Alert } from 'react-native';
import PedometerService, { PedometerUpdate } from '../services/PedometerService';
import SocketService from '../services/SocketService';
import { getToken, getUserId } from '../utils/storage';
import { RESULTS, PermissionStatus } from 'react-native-permissions';
import { api } from '../services/ApiClient';
import { ENDPOINTS } from '../services/ApiEndpoints';
import { DailyStepSummary } from '../types/WalkAndEarnTypes';

export const WalkAndEarnViewModel = () => {
    const [isTracking, setIsTracking] = useState(false);
    const [steps, setSteps] = useState(0);
    const [distance, setDistance] = useState(0);
    const [selectedCause, setSelectedCause] = useState<number | null>(null);
    const [permissionStatus, setPermissionStatus] = useState<PermissionStatus | null>(null);
    const [dailySummary, setDailySummary] = useState<DailyStepSummary | null>(null);

    // Refs to track previous values for delta calculation
    const lastStepsRef = useRef(0);
    const lastDistanceRef = useRef(0);

    // fetch daily summary
    const fetchDailySummary = async () => {

        const token = await getToken();
        const params = {
            token,
            category_id: 1
        }
        if (!token) {
            console.log("No token found");
            return;
        }
        try {
            const response = await api.request<DailyStepSummary>(
                ENDPOINTS.GET_STEP_SUMMARY,
                'GET',
                params
            );
            if (response.data) {
                console.log("Step summary fetched successfully");
                setDailySummary(response.data);
            }
        } catch (error) {
            console.error('Error fetching step summary:', error);
        }
    };

    const handleSocketUpdate = useCallback((data: any) => {
        console.log("ViewModel received step_ack:", data);
        if (data && data.status) {
            const summary: DailyStepSummary = {
                date: new Date().toISOString(),
                category_id: data.category_id,
                steps: data.steps,
                goal: data.goal,
                progress: data.goal > 0 ? (data.steps / data.goal) : 0,
                kilometre: parseFloat(data.kilometre),
                kcal: data.kcal,
                litres: parseFloat(data.litres)
            };
            setDailySummary(summary);
        }
    }, []);

    useEffect(() => {

        printUserId();

        fetchDailySummary();
        // Listen for socket updates
        SocketService.onStepAck(handleSocketUpdate);
    }, [handleSocketUpdate]);


    const printUserId = async () => {
        const userId = await getUserId();
        console.log("User ID:", userId);
    }

    const testSocket = async () => {
        console.log("called")
        SocketService.connect();
        const userId = await getUserId();

        // wait for 2 seconds
        setTimeout(() => {
            if (userId) {
                SocketService.sendStepEvent({
                    user_id: userId,
                    category_id: 1,
                    steps: 10,
                    type: "walk",
                    lat: 22.57,
                    lng: 88.36,
                    timestamp: Math.floor(Date.now() / 1000)
                });
            } else {
                console.log("User ID not found, skipping socket event");
            }
        }, 2000);


        setTimeout(() => {
            SocketService.disconnect();
        }, 10000);
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

    // Start the pedometer and socket service
    const startService = () => {
        console.log("Starting service");
        SocketService.connect();

        // Reset tracking state and refs
        setIsTracking(true);
        setSteps(0);
        setDistance(0);
        lastStepsRef.current = 0;
        lastDistanceRef.current = 0;

        PedometerService.startTracking(handleUpdate);
    };

    const handleUpdate = useCallback(async (data: PedometerUpdate) => {

        // Calculate deltas
        const stepsDelta = data.steps - lastStepsRef.current;
        const distanceDelta = data.distance - lastDistanceRef.current;
        console.log(`Pedometer Delta Update: +${stepsDelta} steps, +${distanceDelta.toFixed(2)}m`);


        // return if there is no step
        if (stepsDelta <= 0) {
            console.log("Zero or less step found")
            return;
        }

        const userId = await getUserId();
        if (userId == null) {
            console.log("User ID not found, skipping socket event");
            return;
        }

        SocketService.sendStepEvent({
            user_id: userId,
            category_id: 1,
            steps: stepsDelta,
            type: "walking",
            lat: 22.57,
            lng: 88.36
        });

        // Update refs
        lastStepsRef.current = data.steps;
        lastDistanceRef.current = data.distance;

        // Update UI with cumulative values
        setSteps(data.steps);
        setDistance(data.distance);

    }, []);

    // Stop the pedometer service
    const stopTracking = () => {
        setIsTracking(false);
        PedometerService.stopTracking();
        SocketService.disconnect();
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
        testSocket,
        dailySummary,
        fetchDailySummary
    };
};
