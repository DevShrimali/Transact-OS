import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { ArrowLeft, Building2 } from 'lucide-react';

export function StaffLogin({ onLogin, onBackToMain }: { onLogin: () => void; onBackToMain: () => void }) {
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Mock company list - these would come from the created companies
  const companies = [
    { id: 'comp-1', name: 'ABC Corporation', code: 'ABC001' },
    { id: 'comp-2', name: 'XYZ Industries', code: 'XYZ002' },
    { id: 'comp-3', name: 'Global Retail Ltd', code: 'GRL003' },
  ];

  const handleLogin = () => {
    if (selectedCompany && username && password) {
      onLogin();
    } else {
      // toast.error('Please select a company and enter your credentials');
      alert('Please select a company and enter your credentials');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="flex items-center justify-start mb-2">
            <button 
              onClick={onBackToMain}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-hidden"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Staff Login</CardTitle>
          <CardDescription>Access your company account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            {/* Company Selection */}
            <div className="space-y-2">
              <Label>Select Company</Label>
              <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Your Company" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((company) => (
                    <SelectItem key={company.id} value={company.id}>
                      {company.name} ({company.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Username/Staff ID */}
            <div className="space-y-2">
              <Label htmlFor="username">Username or Staff ID</Label>
              <Input 
                id="username"
                type="text" 
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          
          <Button 
            className="w-full" 
            size="lg"
            onClick={handleLogin}
          >
            Sign In as Staff
          </Button>

          <div className="text-center">
            <button 
              className="text-xs text-muted-foreground hover:text-primary hover:underline focus:outline-hidden"
            >
              Forgot password?
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
