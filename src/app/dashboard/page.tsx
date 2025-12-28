
"use client";

import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, LogOut, User } from 'lucide-react';

/**
 * The main dashboard page, accessible only to authenticated users.
 * It displays a welcome message and a logout button.
 */
export default function DashboardPage() {
  const { user, logout, loading } = useAuth();

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl shadow-lg text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
              <User className="h-10 w-10" />
          </div>
          <CardTitle className="text-4xl font-bold">Welcome, {user.username}!</CardTitle>
          <CardDescription className="text-lg mt-2">You have successfully logged into Genezys Innovations.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-8 text-muted-foreground">This is your secure portal. From here, you would typically manage all HR-related tasks.</p>
          <Button onClick={logout} size="lg">
            <LogOut className="mr-2 h-5 w-5" />
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
