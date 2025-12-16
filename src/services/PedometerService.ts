import {
    startStepCounterUpdate,
    stopStepCounterUpdate,
} from '@dongminyu/react-native-step-counter';

type StepCountData = {
    counterType: string;
    steps: number;
    startDate: number;
    endDate: number;
    distance: number;
};
import { Platform } from 'react-native';
import {
    check,
    PERMISSIONS,
    request,
    RESULTS,
    openSettings,
    PermissionStatus,
} from 'react-native-permissions';

export interface PedometerUpdate {
    steps: number;
    distance: number; // in meters
    startDate: number; // timestamp
    endDate: number; // timestamp
}

class PedometerService {
    private static instance: PedometerService;

    private constructor() { }

    public static getInstance(): PedometerService {
        if (!PedometerService.instance) {
            PedometerService.instance = new PedometerService();
        }
        return PedometerService.instance;
    }

    async checkPermission(): Promise<PermissionStatus> {
        const permission =
            Platform.OS === 'ios'
                ? PERMISSIONS.IOS.MOTION
                : PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION;

        try {
            const result = await check(permission);
            return result;
        } catch (error) {
            console.error('Error checking permission:', error);
            return RESULTS.DENIED;
        }
    }

    async requestPermission(): Promise<PermissionStatus> {
        const permission =
            Platform.OS === 'ios'
                ? PERMISSIONS.IOS.MOTION
                : PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION;

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

    startTracking(onUpdate: (data: PedometerUpdate) => void) {
        const now = new Date();
        // Start tracking from the current moment
        startStepCounterUpdate(now, (data: StepCountData) => {
            onUpdate({
                steps: data.steps,
                distance: data.distance,
                startDate: data.startDate,
                endDate: data.endDate,
            });
        });
    }

    stopTracking() {
        stopStepCounterUpdate();
    }
}

export default PedometerService.getInstance();
