
"use client";

import { useState } from 'react';
import { Loader2 } from "lucide-react";
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * A form for user login. Handles user input, validation, and submission.
 */
export function LoginForm() {
  const { login, loading } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const validate = () => {
    const newErrors: { username?: string; password?: string } = {};
    if (!formData.username) {
      newErrors.username = "Username is required.";
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) {
      await login(formData.username, formData.password);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input 
          id="username"
          placeholder="admin" 
          value={formData.username}
          onChange={handleChange}
        />
        {errors.username && <p className="text-sm font-medium text-destructive">{errors.username}</p>}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link href="/forgot-password" className="text-sm font-medium text-primary hover:underline">
            Forgot Password?
          </Link>
        </div>
        <Input 
          id="password"
          type="password" 
          placeholder="Test@123"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p className="text-sm font-medium text-destructive">{errors.password}</p>}
      </div>
      
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing In...
          </>
        ) : (
          "Sign In"
        )}
      </Button>
    </form>
  );
}
