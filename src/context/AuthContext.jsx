import { createContext, useContext, useEffect, useState } from "react";
import {
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase.config";
import axiosInstance from "../utils/axios";

export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Register with email and password
    const register = async (name, email, password, photoURL) => {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(result.user, { displayName: name, photoURL });
        // Save user to DB
        await axiosInstance.post('/api/auth/register', { name, email, password, photoURL });
        return result;
    };

    // Login with email and password
    const login = async (email, password) => {
        const result = await signInWithEmailAndPassword(auth, email, password);
        // Get JWT cookie
        await axiosInstance.post('/api/auth/login', { email, password });
        return result;
    };

    // Google Login
    const googleLogin = async () => {
        const result = await signInWithPopup(auth, googleProvider);
        const { displayName, email, photoURL } = result.user;
        // Save to DB and get JWT cookie
        await axiosInstance.post('/api/auth/google', {
            name: displayName,
            email,
            photoURL
        });
        return result;
    };

    // Logout
    const logout = async () => {
        await signOut(auth);
        await axiosInstance.post('/api/auth/logout');
        setUser(null);
    };

    // Auth state observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const value = {
        user,
        loading,
        register,
        login,
        googleLogin,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;