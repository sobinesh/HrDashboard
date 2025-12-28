
"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { useAuth } from '@/context/auth-context';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Step = "email" | "otp" | "reset";

/**
 * A multi-step component to handle the entire forgot password process.
 */
export function ForgotPasswordFlow() {
  const [step, setStep] = useState<Step>("email");
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState<any>({});
  
  const { forgotPassword, verifyOtp, resetPassword, loading } = useAuth();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({...prev, [id]: value}));
  }

  // Handlers for each form submission
  async function handleSendEmail(e: React.FormEvent) {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      setErrors({ email: "Please enter a valid email address." });
      return;
    }
    setErrors({});
    const success = await forgotPassword(formData.email);
    if (success) {
      setStep("otp");
    }
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    if (formData.otp.length !== 6) {
      setErrors({ otp: "OTP must be 6 digits." });
      return;
    }
    setErrors({});
    const success = await verifyOtp(formData.email, formData.otp);
    if (success) {
      setStep("reset");
    }
  }

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    const newErrors: any = {};
    if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters.";
    }
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      await resetPassword(formData.email, formData.newPassword);
    }
  }

  // Render step 1: Email input
  if (step === "email") {
    return (
      <form onSubmit={handleSendEmail} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Your Employee Email</Label>
          <Input 
            id="email"
            placeholder="name@company.com" 
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-sm font-medium text-destructive">{errors.email}</p>}
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Send Code
        </Button>
      </form>
    );
  }
  
  // Render step 2: OTP input
  if (step === "otp") {
    return (
      <>
        <div className="text-sm text-center text-muted-foreground mb-4">
          <p>We sent a 6-digit code to</p>
          <p className="font-medium text-foreground">{formData.email}</p>
        </div>
        <form onSubmit={handleVerifyOtp} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="otp">One-Time Password</Label>
            <Input 
              id="otp"
              placeholder="123456" 
              value={formData.otp}
              onChange={handleChange}
            />
            {errors.otp && <p className="text-sm font-medium text-destructive">{errors.otp}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Verify Code
          </Button>
        </form>
      </>
    );
  }

  // Render step 3: Reset password form
  if (step === "reset") {
    return (
      <form onSubmit={handleResetPassword} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            id="newPassword"
            type="password"
            placeholder="Enter a new password"
            value={formData.newPassword}
            onChange={handleChange}
          />
          {errors.newPassword && <p className="text-sm font-medium text-destructive">{errors.newPassword}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Repeat the new password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <p className="text-sm font-medium text-destructive">{errors.confirmPassword}</p>}
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Set New Password
        </Button>
      </form>
    );
  }

  return null;
}
