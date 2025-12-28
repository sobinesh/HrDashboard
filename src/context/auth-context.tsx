
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import Cookies from 'js-cookie';
import { Loader2 } from 'lucide-react';

interface User {
  username: string;
  password?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password_provided: string) => Promise<void>;
  logout: () => void;
  changePassword: (oldPassword_provided: string, newPassword_provided: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<boolean>;
  verifyOtp: (email: string, otp: string) => Promise<boolean>;
  resetPassword: (email: string, newPassword_provided: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * Provides authentication state and functions to the application.
 * It manages user sessions, login, logout, and password management flows.
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      try {
        const userData = JSON.parse(userCookie);
        setUser(userData);
      } catch (e) {
        console.error("Failed to parse user cookie", e);
        Cookies.remove('user');
      }
    }
    setSessionLoading(false);
  }, []);
  
  /**
   * Simulates a user login.
   * @param username The user's username.
   * @param password_provided The password entered by the user.
   */
  const login = async (username: string, password_provided: string) => {
    setActionLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const userCookie = Cookies.get('user');
    const currentUser = userCookie ? JSON.parse(userCookie) : null;

    const isCorrectDefaultPassword = password_provided === 'Test@123';
    const isCorrectUpdatedPassword = currentUser ? password_provided === currentUser.password : false;
    
    if (username.toLowerCase() === 'admin' && (isCorrectDefaultPassword || isCorrectUpdatedPassword)) {
      const password = isCorrectDefaultPassword ? 'Test@123' : currentUser.password;
      const userData = { username, password };
      setUser(userData);
      
      Cookies.set('user', JSON.stringify(userData), { expires: 1 });

      toast({
        title: "Login Successful",
        description: `Welcome back, ${username}!`,
      });

      if (isCorrectDefaultPassword) {
        router.push('/change-password');
      } else {
        router.push('/dashboard');
      }
    } else {
      toast({
        variant: "destructive",
        title: "Invalid Credentials",
        description: "Please check your username and password.",
      });
    }

    setActionLoading(false);
  };

  /**
   * Logs the user out by clearing the session.
   */
  const logout = () => {
    setUser(null);
    Cookies.remove('user');
    router.push('/login');
    toast({
        title: "Logged Out",
        description: "You have been successfully signed out.",
    });
  };

  /**
   * Simulates changing a user's password.
   * @param oldPassword_provided The user's current password.
   * @param newPassword_provided The new password to set.
   */
  const changePassword = async (oldPassword_provided: string, newPassword_provided: string) => {
    setActionLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const userCookie = Cookies.get('user');
    const currentUser = userCookie ? JSON.parse(userCookie) : null;
    
    if (currentUser && oldPassword_provided === currentUser.password) {
      const updatedUserData = { ...currentUser, password: newPassword_provided };
      setUser(updatedUserData);
      Cookies.set('user', JSON.stringify(updatedUserData), { expires: 1 });

      toast({
        title: "Password Updated",
        description: "Your password has been changed successfully.",
      });
      router.push('/dashboard');
    } else {
      toast({
        variant: "destructive",
        title: "Incorrect Old Password",
        description: "The old password you entered is incorrect.",
      });
    }
    setActionLoading(false);
  };

  /**
   * Simulates sending a password reset OTP.
   * @param email The user's email address.
   * @returns A promise that resolves to true if the email was "sent".
   */
  const forgotPassword = async (email: string) => {
    setActionLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (email.toLowerCase() === 'admin@work.com') {
      toast({
        title: "Verification Code Sent",
        description: "Your code is: 123456 (for demo purposes)",
      });
      setActionLoading(false);
      return true;
    } else {
       toast({
        variant: "destructive",
        title: "User Not Found",
        description: "No account is associated with this email.",
      });
      setActionLoading(false);
      return false;
    }
  };

  /**
   * Simulates verifying an OTP for password reset.
   * @param email The user's email.
   * @param otp The 6-digit OTP from the user.
   * @returns A promise that resolves to true if the OTP is correct.
   */
  const verifyOtp = async (email: string, otp: string): Promise<boolean> => {
    setActionLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (email.toLowerCase() === 'admin@work.com' && otp === '123456') {
      toast({
        title: "Code Verified",
        description: "You can now set a new password.",
      });
      setActionLoading(false);
      return true;
    } else {
       toast({
        variant: "destructive",
        title: "Invalid Code",
        description: "The code you entered is incorrect.",
      });
      setActionLoading(false);
      return false;
    }
  };

  /**
   * Simulates the final step of resetting the password.
   * @param email The user's email.
   * @param newPassword_provided The new password to set.
   */
  const resetPassword = async (email: string, newPassword_provided: string) => {
    setActionLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (email.toLowerCase() === 'admin@work.com') {
        const updatedUserData = { username: 'admin', password: newPassword_provided };
        Cookies.set('user', JSON.stringify(updatedUserData), { expires: 1 });

        router.push('/login');
        
        toast({
            title: "Password Reset Successful",
            description: "Please log in with your new password.",
        });
    } else {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Could not reset password. Please try again.",
        });
    }
    setActionLoading(false);
  };

  const authContextValue = {
    user,
    loading: actionLoading || sessionLoading,
    login,
    logout,
    changePassword,
    forgotPassword,
    verifyOtp,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {sessionLoading ? (
         <div className="flex min-h-screen items-center justify-center bg-background">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
         </div>
      ) : children}
    </AuthContext.Provider>
  );
};
