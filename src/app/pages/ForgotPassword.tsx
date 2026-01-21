import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/card';
import { ArrowLeft, Mail } from 'lucide-react';

interface ForgotPasswordProps {
  onBack: () => void;
}

export function ForgotPassword({ onBack }: ForgotPasswordProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">Reset Password</CardTitle>
          <CardDescription>
            {!isSubmitted 
              ? "Enter your email address and we'll send you a link to reset your password." 
              : "Check your email for the reset link."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isSubmitted ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="user@example.com" 
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Button 
                className="w-full" 
                size="lg"
                onClick={handleSubmit}
              >
                Send Reset Link
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4 py-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Mail className="h-6 w-6 text-foreground" />
              </div>
              <p className="text-center text-sm text-muted-foreground">
                We have sent a password reset link to your email address. Please check your inbox.
              </p>
              <Button 
                variant="outline"
                className="w-full"
                onClick={handleSubmit} // Just resends in this mock
              >
                Resend Link
              </Button>
            </div>
          )}

          <div className="text-center">
            <button 
              onClick={onBack}
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-hidden"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Login
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
