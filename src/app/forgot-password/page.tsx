
import { ForgotPasswordFlow } from '@/components/auth/forgot-password-flow';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

/**
 * Renders the multi-step flow for resetting a forgotten password.
 */
export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
            <HelpCircle className="mx-auto h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold text-primary mt-4 font-headline">Forgot Password?</h1>
            <p className="text-muted-foreground mt-2">We'll help you get back into your account.</p>
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Password Reset</CardTitle>
            <CardDescription>Follow the steps to reset your password.</CardDescription>
          </CardHeader>
          <CardContent>
            <ForgotPasswordFlow />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
