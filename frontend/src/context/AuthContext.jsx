import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth';
import { auth } from '../firebase';
import * as api from '../api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(
        localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    );
    const [initialLoading, setInitialLoading] = useState(true);
    const [authActionLoading, setAuthActionLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const token = await user.getIdToken();
                    const localUserInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

                    // Always perform a background sync to ensure isAdmin status is up to date
                    console.log('Syncing user profile for:', user.email);
                    const { data } = await api.register(
                        user.displayName || user.email.split('@')[0],
                        user.email,
                        "FIREBASE_AUTH"
                    );

                    const updatedUserInfo = {
                        ...data,
                        token: token
                    };
                    setUserInfo(updatedUserInfo);
                    localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
                } catch (err) {
                    console.error('Error in onAuthStateChanged sync:', err);
                    // If sync fails (e.g. backend down), we still set minimal info so they can browse
                    // but some protected routes might fail later
                    if (!userInfo) {
                        setUserInfo({ email: user.email, token: await user.getIdToken() });
                    }
                }
            } else {
                setUserInfo(null);
                localStorage.removeItem('userInfo');
            }
            setInitialLoading(false);
        });

        return unsubscribe;
    }, []);

    const refreshToken = async () => {
        const user = auth.currentUser;
        if (user) {
            try {
                const token = await user.getIdToken(true);
                const localUserInfo = JSON.parse(localStorage.getItem('userInfo'));
                if (localUserInfo) {
                    const updatedUserInfo = { ...localUserInfo, token };
                    localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
                    setUserInfo(updatedUserInfo);
                }
                return token;
            } catch (err) {
                console.error('Error refreshing token:', err);
                logout();
                throw err;
            }
        }
        return null;
    };

    const login = async (email, password) => {
        setAuthActionLoading(true);
        setError(null);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const token = await user.getIdToken();

            // Sync with backend BEFORE setting state to avoid redirection race
            const { data } = await api.login(email, "FIREBASE_AUTH");

            const updatedUserInfo = {
                ...data,
                token: token
            };

            localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
            setUserInfo(updatedUserInfo);
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setAuthActionLoading(false);
        }
    };

    const register = async (name, email, password) => {
        setAuthActionLoading(true);
        setError(null);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, { displayName: name });
            const token = await user.getIdToken();

            // Sync with backend BEFORE setting state
            const { data } = await api.register(name, email, "FIREBASE_AUTH");

            const updatedUserInfo = {
                ...data,
                token: token
            };

            localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
            setUserInfo(updatedUserInfo);
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setAuthActionLoading(false);
        }
    };

    const logout = async () => {
        await signOut(auth);
        setUserInfo(null);
        localStorage.removeItem('userInfo');
    };

    return (
        <AuthContext.Provider value={{
            userInfo,
            loading: initialLoading || authActionLoading,
            authActionLoading,
            error,
            login,
            register,
            logout,
            refreshToken
        }}>
            {!initialLoading ? children : (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    fontSize: '1.2rem',
                    color: '#666'
                }}>
                    Loading...
                </div>
            )}
        </AuthContext.Provider>
    );
};
