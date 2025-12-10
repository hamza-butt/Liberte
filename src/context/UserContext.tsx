import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User } from '../types/User';
import { getUser, setUser as setStorageUser } from '../utils/storage';

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => Promise<void>;
    isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUserState] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Load user from storage on mount
        const loadUser = async () => {
            try {
                const storedUser = await getUser();
                if (storedUser) {
                    setUserState(storedUser);
                }
            } catch (error) {
                console.error('Failed to load user from storage', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadUser();
    }, []);

    const setUser = async (newUser: User | null) => {
        setUserState(newUser);
        if (newUser) {
            await setStorageUser(newUser);
        } else {
            // If setUser is called with null, we might want to clear it from storage too?
            // The plan didn't explicitly say handling logout/clearing, but logically yes.
            // For now, I'll stick to what the view model does which is "setting" it.
            // But `setStorageUser` in storage.ts was typed to take Partial<User> | User.
            // Let's assume this is primarily for UPDATING the user.
            // If null is passed, we probably shouldn't call setStorageUser with null based on its signature.
            // Actually storage.ts `setUser` takes `User | Partial<User>`.
            // Let's handle the null case if we want to support logout later, but for now strict to User.
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, isLoading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
