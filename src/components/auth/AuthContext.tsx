import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../../types';

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string, remember: boolean) => Promise<boolean>;
    logout: () => void;
    isLoading: boolean;
    error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DUMMY_USER: User = {
    email: 'intern@demo.com',
    name: 'Intern User',
};

const CREDENTIALS = {
    email: 'intern@demo.com',
    password: 'intern123',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Check persist storage on mount
        const storedUser = localStorage.getItem('auth_user') || sessionStorage.getItem('auth_user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse stored user", e);
                localStorage.removeItem('auth_user');
                sessionStorage.removeItem('auth_user');
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string, remember: boolean): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        if (email === CREDENTIALS.email && password === CREDENTIALS.password) {
            setUser(DUMMY_USER);
            if (remember) {
                localStorage.setItem('auth_user', JSON.stringify(DUMMY_USER));
            } else {
                sessionStorage.setItem('auth_user', JSON.stringify(DUMMY_USER));
            }
            setIsLoading(false);
            return true;
        } else {
            setError('Invalid email or password');
            setIsLoading(false);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('auth_user');
        sessionStorage.removeItem('auth_user');
        setError(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
