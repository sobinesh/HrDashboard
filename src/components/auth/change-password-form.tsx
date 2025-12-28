
"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useAuth } from '@/context/auth-context';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Errors = {
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
};

/**
 * Form for changing the user's password.
 */
export function ChangePasswordForm() {
  const { changePassword, loading } = useAuth();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const validate = () => {
    const newErrors: Errors = {};
    if (!formData.oldPassword) {
      newErrors.oldPassword = "Old password is required.";
    }
    if (formData.newPassword.length < 8) {
      newErrors.newPassword = "New password must be at least 8 characters.";
    }
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) {
      await changePassword(formData.oldPassword, formData.newPassword);
    }
  }

  return (
    <form onSubmit={handleChangePassword} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="oldPassword">Old Password</Label>
        <Input 
          id="oldPassword"
          type="password" 
          placeholder="Enter your old password" 
          value={formData.oldPassword}
          onChange={handleChange}
        />
        {errors.oldPassword && <p className="text-sm font-medium text-destructive">{errors.oldPassword}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="newPassword">New Password</Label>
        <Input
          id="newPassword"
          type="password"
          placeholder="Enter a strong new password"
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
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Updating Password...
          </>
        ) : (
          "Update Password"
        )}
      </Button>
    </form>
  );
}
