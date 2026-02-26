'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { User, LoginInput, RegisterInput } from '@/types/auth.types';
import { authService } from '@/lib/services/auth.service';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

type AuthAction = { type: 'LOGIN'; payload: User } | { type: 'LOGOUT' } | { type: 'SET_LOADING'; payload: boolean };

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload, isAuthenticated: true, isLoading: false };
        case 'LOGOUT':
            return { ...state, user: null, isAuthenticated: false, isLoading: false };
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };
        default:
            return state;
    }
}

interface AuthContextProps extends AuthState {
    login: (data: LoginInput) => Promise<void>;
    register: (data: RegisterInput) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = async (data: LoginInput) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const response = await authService.login(data);
            dispatch({ type: 'LOGIN', payload: response.user });
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    const register = async (data: RegisterInput) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            await authService.register(data);
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    const logout = async () => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            await authService.logout();
            // Destroy any and all locally persisted data to ensure complete wipe on logout
            if (typeof window !== 'undefined') {
                localStorage.clear();
                sessionStorage.clear();
            }
            dispatch({ type: 'LOGOUT' });
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    return <AuthContext.Provider value={{ ...state, login, register, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
