'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { supabase } from '@/lib/supabaseClient';
import { setUser, setLoading, setError, signOut } from '@/features/authSlice';
import { RootState } from '@/store';
import { Loader } from '@/components/loader/loader';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        dispatch(setUser(session.user));
      } else {
        dispatch(signOut());
      }
      dispatch(setLoading(false));
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [dispatch]);

  if (isLoading) {
    return <div className='bg-[hsl(var(--background))]'><Loader/></div>;
  }

  return <>{children}</>;
};