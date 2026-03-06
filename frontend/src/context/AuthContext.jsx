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
                const token = await user.getIdToken();
                const localUserInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

                // Only update from Firebase if we don't have local info or if the user changed
                if (!localUserInfo || localUserInfo.email !== user.email) {
                    const updatedUserInfo = {
                        ...localUserInfo,
                        _id: user.uid,
                        name: user.displayName || localUserInfo?.name || user.email.split('@')[0],
                        email: user.email,
                        token: token
                    };
                    setUserInfo(updatedUserInfo);
                    localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
                }
            } else {
                setUserInfo(null);
                localStorage.removeItem('userInfo');
            }
            setInitialLoading(false);
        });

        return unsubscribe;
    }, []);

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
            logout
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
