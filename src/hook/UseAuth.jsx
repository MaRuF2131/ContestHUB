import { useEffect, useState } from 'react';
import axiosInstance, { setUserInterceptor } from '../utils/api/axios.jsx';
import {
  auth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  googleProvider,
  signOut,
  onAuthStateChanged,
} from '../firebase/firebase.config.js';
import { reload, updateProfile } from 'firebase/auth';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  //  Format user from Firebase Auth
  const formatUser = (firebaseUser) => {
    if (!firebaseUser) {
      setUserInterceptor(null);
      return null;
    }

    const { displayName, email, uid, photoURL } = firebaseUser;
    return { displayName, email, uid, photoURL };
  };

  //  Sync to backend only once per login (React Query handles caching)
  const { data: backendUser } = useQuery({
    queryKey: ['user-sync', user?.uid],
    enabled: !!user?.displayName, // Only run when UID exists
    queryFn: async () => {
      const userData = {
        username: user.displayName,
        uid: user.uid,
        email: user.email,
        role: 'user',
      };
      const res = await axiosInstance.post('/authin/login', userData);
      console.log('✅ Synced to backend:', res.data.role);
      setUserInterceptor(res?.data?.token);
      return res.data;
    },
    staleTime: Infinity,
    retry: false,
  });

  // 🔹 Firebase Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      const formatted = formatUser(firebaseUser);
      if(!formatted){setUser(null)}
      else {setUser({ ...formatted, role: backendUser?.role });}
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      setUser({ ...user, role: backendUser?.role });
    }
  }, [backendUser]);

  // 🔹 Login with Google
  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Google login failed:', error.message);
      throw error;
    }
  };

  // 🔹 Login with Email/Password
  const loginWithEmail = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Email login failed:', error.message);
      throw error;
    }
  };

  // 🔹 Register with Email
  const registerWithEmail = async (email, password, displayName, photoURL) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName, photoURL });
      await reload(result.user);
    } catch (error) {
      console.error('Registration failed:', error.message);
      throw error;
    }
  };

  // 🔹 Logout and clear only specific user query
  const logout = async () => {
    try {
      await signOut(auth);
      await axiosInstance.post('/logout');
      queryClient.removeQueries({ queryKey: ['user-sync', user?.uid] }); //  Just one
    } catch (error) {
      console.error('Logout failed:', error.message);
      throw error;
    }
  };

  return {
    user,
    loading,
    loginWithGoogle,
    loginWithEmail,
    registerWithEmail,
    logout,
  };
};

export default useAuth;
