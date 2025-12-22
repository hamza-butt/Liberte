import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/User';

const KEY_AUTH_TOKEN = 'auth_token';
const KEY_USER_INFO = 'user_info';
const KEY_REMEMBER_ME = 'remember_me';

export const setRememberMe = async (value: boolean): Promise<void> => {
    try {
        await AsyncStorage.setItem(KEY_REMEMBER_ME, JSON.stringify(value));
    } catch (error) {
        console.error('Error setting remember me:', error);
    }
};

export const getRememberMe = async (): Promise<boolean> => {
    try {
        const value = await AsyncStorage.getItem(KEY_REMEMBER_ME);
        return value ? JSON.parse(value) : false;
    } catch (error) {
        console.error('Error getting remember me:', error);
        return false;
    }
};

export const removeRememberMe = async (): Promise<void> => {
    try {
        await AsyncStorage.removeItem(KEY_REMEMBER_ME);
    } catch (error) {
        console.error('Error removing remember me:', error);
    }
};



export const setToken = async (token: string): Promise<void> => {
    try {
        await AsyncStorage.setItem(KEY_AUTH_TOKEN, token);
    } catch (error) {
        console.error('Error setting token:', error);
    }
};

export const getToken = async (): Promise<string | null> => {
    try {
        return await AsyncStorage.getItem(KEY_AUTH_TOKEN);
    } catch (error) {
        console.error('Error getting token:', error);
        return null;
    }
};

export const removeToken = async (): Promise<void> => {
    try {
        await AsyncStorage.removeItem(KEY_AUTH_TOKEN);
    } catch (error) {
        console.error('Error removing token:', error);
    }
};


export const setUser = async (user: User | Partial<User>): Promise<void> => {
    try {
        await AsyncStorage.setItem(KEY_USER_INFO, JSON.stringify(user));
    } catch (error) {
        console.error('Error setting user info:', error);
    }
};

export const getUser = async (): Promise<User | null> => {
    try {
        const user = await AsyncStorage.getItem(KEY_USER_INFO);
        return user ? JSON.parse(user) : null;
    } catch (error) {
        console.error('Error getting user info:', error);
        return null;
    }
};

export const removeUser = async (): Promise<void> => {
    try {
        await AsyncStorage.removeItem(KEY_USER_INFO);
    } catch (error) {
        console.error('Error removing user info:', error);
    }
};

export const getUserId = async (): Promise<number | null> => {
    try {
        const user = await getUser();
        return user?.id ? parseInt(user.id, 10) : null;
    } catch (error) {
        console.error('Error getting user id:', error);
        return null;
    }
};
