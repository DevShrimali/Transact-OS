import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/app/components/ui/card';
import { Users, ShieldCheck, Command } from 'lucide-react';
import { motion } from 'framer-motion';
import { ProjectFlowModal } from '@/app/components/ProjectFlowModal';

export function Login({ onLogin, onCreateAccount, onForgotPassword, onStaffLogin }: { onLogin: () => void; onCreateAccount?: () => void; onForgotPassword?: () => void; onStaffLogin?: () => void }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden font-sans text-foreground selection:bg-primary/20">
      
      {/* Contextual Flow Chart Trigger */}
      <ProjectFlowModal />

      {/* Dynamic Background Ambience - Theme Aware */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] opacity-40 mix-blend-multiply dark:mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-500/20 rounded-full blur-[120px] opacity-40 mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "backOut" }}
        className="w-full max-w-md relative z-10 px-4"
      >
        <Card className="border border-border/40 shadow-2xl bg-card/60 backdrop-blur-xl ring-1 ring-black/5 dark:ring-white/5">
          <CardHeader className="space-y-4 pb-6 text-center pt-10">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mx-auto bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center ring-1 ring-primary/20 shadow-lg shadow-primary/20"
            >
              <Command className="w-8 h-8 text-primary" />
            </motion.div>
            <div className="space-y-2">
              <CardTitle className="text-3xl font-black tracking-tighter text-foreground">
                Transact<span className="text-primary">OS</span>
              </CardTitle>
              <CardDescription className="text-muted-foreground font-medium uppercase tracking-widest text-xs">
                Secure Administrative Access
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 px-8 pb-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80 ml-1">Workplace Identity</Label>
                <Input 
                  id="email" 
                  placeholder="admin@company.com" 
                  type="email"
                  className="h-11 bg-secondary/50 border-transparent focus:bg-background focus:border-primary/50 transition-all font-medium placeholder:text-muted-foreground/50"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80 ml-1">Passkey</Label>
                  {onForgotPassword && (
                    <button 
                      onClick={onForgotPassword}
                      className="text-[10px] font-bold uppercase tracking-widest text-primary hover:text-primary/80 transition-colors"
                    >
                      Recover Access?
                    </button>
                  )}
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••••••"
                  className="h-11 bg-secondary/50 border-transparent focus:bg-background focus:border-primary/50 transition-all font-medium placeholder:text-muted-foreground/50"
                />
              </div>
            </div>

            <Button 
              className="w-full h-11 font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all active:scale-[0.98]" 
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <ShieldCheck className="w-4 h-4" />
                </motion.div>
              ) : (
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Authenticate
                </span>
              )}
            </Button>
            
            {onStaffLogin && (
              <Button 
                variant="outline" 
                className="w-full h-11 border-dashed border-border hover:bg-secondary/80 hover:border-primary/30 transition-all text-muted-foreground hover:text-foreground font-bold text-xs uppercase tracking-widest"
                onClick={onStaffLogin}
              >
                <Users className="mr-2 h-4 w-4" /> Staff Portal
              </Button>
            )}
          </CardContent>
          {onCreateAccount && (
            <CardFooter className="pb-8 pt-0 justify-center">
               <button 
                onClick={onCreateAccount}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors font-medium"
               >
                 New Organization? <span className="font-bold underline decoration-primary decoration-2 underline-offset-4">Provision New Workspace</span>
               </button>
            </CardFooter>
          )}
        </Card>
        
        <div className="mt-8 text-center space-y-2">
           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40">
             System Version 2.4.0-RC
           </p>
           <p className="text-[10px] text-muted-foreground/30 font-medium">
             Encrypted connection established • 256-bit SSL
           </p>
        </div>
      </motion.div>
    </div>
  );
}