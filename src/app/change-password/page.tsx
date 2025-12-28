
import { ChangePasswordForm } from '@/components/auth/change-password-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { KeyRound } from 'lucide-react';

/**
 * Renders the page for users to change their password.
 * This is primarily used for the first-time login flow.
 */
export default function ChangePasswordPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
            <KeyRound className="mx-auto h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold text-primary mt-4 font-headline">Secure Your Account</h1>
            <p className="text-muted-foreground mt-2">This is a one-time setup.</p>
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Create a New Password</CardTitle>
            <CardDescription>Your new password must be at least 8 characters long.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChangePasswordForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
