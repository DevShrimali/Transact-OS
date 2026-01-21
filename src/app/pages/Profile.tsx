import {
  User,
  Mail,
  Shield,
  Building,
  Lock,
  Smartphone,
  LogOut,
  Camera,
  ShieldCheck,
  Globe2,
  Fingerprint,
  Bell,
  Cpu,
  Key,
  SmartphoneNfc
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Separator } from "@/app/components/ui/separator";
import { Badge } from "@/app/components/ui/badge";
import { motion } from "framer-motion";
import { cn } from "@/app/components/ui/utils";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export function Profile() {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-[1400px] mx-auto space-y-10 pb-20 px-4"
    >
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div className="space-y-1">
          <Badge variant="outline" className="text-[10px] font-black tracking-[0.2em] px-2 py-0 border-primary/30 text-primary uppercase">Identity Management</Badge>
          <h1 className="text-4xl font-black tracking-tighter italic">Personal Matrix</h1>
          <p className="text-muted-foreground font-medium">Synchronize your profile architecture and security protocols.</p>
        </div>
        <div className="flex items-center gap-3">
            <Button variant="ghost" className="h-12 px-6 text-muted-foreground font-bold hover:bg-muted">Abort Changes</Button>
            <Button className="h-12 px-8 gap-2 shadow-xl shadow-primary/25 font-black uppercase text-xs tracking-widest">
              Update Identity
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column - ID Card */}
        <motion.div variants={item} className="lg:col-span-4 space-y-8">
           <Card className="border-none shadow-2xl bg-primary text-primary-foreground overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-8 opacity-10 -rotate-12 group-hover:scale-110 transition-transform">
                 <ShieldCheck className="w-48 h-48" />
              </div>
              <CardContent className="p-8 relative z-10">
                 <div className="relative inline-block mb-6">
                    <Avatar className="h-32 w-32 border-4 border-primary-foreground/20 shadow-2xl">
                       <AvatarImage src="/avatars/01.png" alt="@admin" />
                       <AvatarFallback className="bg-white/10 text-4xl font-black">AD</AvatarFallback>
                    </Avatar>
                    <Button size="icon" className="absolute bottom-0 right-0 h-10 w-10 rounded-full border-4 border-primary bg-background text-foreground hover:scale-110 transition-transform">
                       <Camera className="h-4 w-4" />
                    </Button>
                 </div>
                 <div className="space-y-1">
                    <h2 className="text-3xl font-black tracking-tight">Admin User</h2>
                    <p className="text-primary-foreground/70 font-bold uppercase text-[10px] tracking-[0.2em]">Master Administrator</p>
                 </div>
                 
                 <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/5">
                       <p className="text-[10px] font-bold uppercase opacity-50 mb-1">Clearance</p>
                       <p className="text-sm font-black">LEVEL_09</p>
                    </div>
                    <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/5">
                       <p className="text-[10px] font-bold uppercase opacity-50 mb-1">Status</p>
                       <p className="text-sm font-black flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                          VERIFIED
                       </p>
                    </div>
                 </div>
              </CardContent>
              <div className="px-8 pb-8 pt-4">
                 <Button variant="secondary" className="w-full h-12 rounded-xl font-bold gap-2">
                    <Globe2 className="h-4 w-4" /> Public Profile View
                 </Button>
              </div>
           </Card>

           <Card className="border-none shadow-sm bg-muted/30">
              <CardHeader>
                 <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">Session Intelligence</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3 text-muted-foreground">
                       <Cpu className="h-4 w-4" /> Machine ID
                    </div>
                    <span className="font-mono text-[10px] font-bold">DESKTOP-UIMS-772</span>
                 </div>
                 <Separator className="opacity-50" />
                 <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3 text-muted-foreground">
                       <Fingerprint className="h-4 w-4" /> Last Auth
                    </div>
                    <span className="font-bold text-[11px]">Today, 09:42 AM</span>
                 </div>
                 <Separator className="opacity-50" />
                 <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3 text-muted-foreground">
                       <Building className="h-4 w-4" /> Current node
                    </div>
                    <span className="font-bold text-[11px]">Main WH (Zone A)</span>
                 </div>
              </CardContent>
           </Card>

           <Button variant="ghost" className="w-full h-12 rounded-xl text-rose-600 hover:text-rose-700 hover:bg-rose-50 font-black uppercase text-[10px] tracking-widest">
              <LogOut className="mr-2 h-4 w-4" /> Terminate Identity Session
           </Button>
        </motion.div>

        {/* Right Column - Matrix Config */}
        <div className="lg:col-span-8 space-y-10">
           {/* Section 1: Core Specs */}
           <motion.div variants={item}>
              <Card className="border-none shadow-sm">
                 <CardHeader className="pb-8">
                    <div className="flex items-center gap-3 mb-1">
                       <User className="h-5 w-5 text-primary" />
                       <CardTitle className="text-xl font-black">Core Specifications</CardTitle>
                    </div>
                    <CardDescription>Fundamental identity attributes utilized across the UIMS cluster.</CardDescription>
                 </CardHeader>
                 <CardContent className="space-y-8">
                    <div className="grid gap-6 md:grid-cols-2">
                       <div className="space-y-2.5">
                          <Label className="text-xs font-black uppercase tracking-widest opacity-60 ml-1">Given Name</Label>
                          <Input className="h-12 border-none bg-muted/50 focus-visible:ring-primary/20 font-bold" defaultValue="Admin" />
                       </div>
                       <div className="space-y-2.5">
                          <Label className="text-xs font-black uppercase tracking-widest opacity-60 ml-1">Surname</Label>
                          <Input className="h-12 border-none bg-muted/50 focus-visible:ring-primary/20 font-bold" defaultValue="User" />
                       </div>
                    </div>
                    <div className="space-y-2.5">
                       <Label className="text-xs font-black uppercase tracking-widest opacity-60 ml-1">Identity Email</Label>
                       <div className="relative">
                          <Mail className="absolute left-4 top-4 h-4 w-4 text-muted-foreground/30" />
                          <Input className="h-12 pl-11 border-none bg-muted/50 focus-visible:ring-primary/20 font-bold" defaultValue="admin@uims-core.com" />
                       </div>
                    </div>
                    <div className="space-y-2.5">
                       <Label className="text-xs font-black uppercase tracking-widest opacity-60 ml-1">Mobile Vector</Label>
                       <div className="relative">
                          <Smartphone className="absolute left-4 top-4 h-4 w-4 text-muted-foreground/30" />
                          <Input className="h-12 pl-11 border-none bg-muted/50 focus-visible:ring-primary/20 font-bold" placeholder="+1 (555) 000-0000" />
                       </div>
                    </div>
                 </CardContent>
              </Card>
           </motion.div>

           {/* Section 2: Defense Protocols */}
           <motion.div variants={item}>
              <Card className="border-none shadow-sm">
                 <CardHeader className="pb-8">
                    <div className="flex items-center gap-3 mb-1">
                       <Shield className="h-5 w-5 text-primary" />
                       <CardTitle className="text-xl font-black">Defense Protocols</CardTitle>
                    </div>
                    <CardDescription>Manage credential integrity and authentication barriers.</CardDescription>
                 </CardHeader>
                 <CardContent className="space-y-4">
                    <div className="group relative flex items-center justify-between p-6 rounded-2xl border-2 border-transparent bg-muted/20 hover:bg-background hover:border-primary/10 transition-all cursor-pointer">
                       <div className="flex items-center gap-5">
                          <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center shadow-sm text-primary transition-transform group-hover:scale-110">
                             <Key className="h-5 w-5" />
                          </div>
                          <div>
                             <p className="text-base font-black tracking-tight">Access Credentials</p>
                             <p className="text-xs text-muted-foreground font-medium">Last rotated 92 days ago. Entropy level: High.</p>
                          </div>
                       </div>
                       <Button variant="outline" className="h-10 rounded-xl px-5 border-none bg-background shadow-sm hover:bg-primary hover:text-white transition-all">Rotate Key</Button>
                    </div>

                    <div className="group relative flex items-center justify-between p-6 rounded-2xl border-2 border-transparent bg-muted/20 hover:bg-background hover:border-primary/10 transition-all cursor-pointer">
                       <div className="flex items-center gap-5">
                          <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center shadow-sm text-amber-600 transition-transform group-hover:scale-110">
                             <SmartphoneNfc className="h-5 w-5" />
                          </div>
                          <div>
                             <p className="text-base font-black tracking-tight">Two-Barrier Auth (2FA)</p>
                             <p className="text-xs text-muted-foreground font-medium">Add a secondary verification layer to your matrix.</p>
                          </div>
                       </div>
                       <Badge className="bg-amber-100 text-amber-700 border-none font-bold px-3">INACTIVE</Badge>
                    </div>
                 </CardContent>
              </Card>
           </motion.div>

           {/* Section 3: Notification Flux */}
           <motion.div variants={item}>
              <Card className="border-primary/5 bg-primary/[0.02]">
                 <CardHeader>
                    <div className="flex items-center gap-3 mb-1">
                       <Bell className="h-5 w-5 text-primary" />
                       <CardTitle className="text-lg font-bold">Signal Preferences</CardTitle>
                    </div>
                 </CardHeader>
                 <CardContent>
                    <div className="flex items-center justify-between py-2">
                       <div className="space-y-0.5">
                          <p className="text-sm font-bold uppercase tracking-tight">Critical Event Feed</p>
                          <p className="text-xs text-muted-foreground">Direct broadcast for system-level errors and breaches.</p>
                       </div>
                       <div className="h-6 w-11 rounded-full bg-primary relative cursor-pointer shadow-inner">
                          <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white transition-all shadow-md" />
                       </div>
                    </div>
                 </CardContent>
              </Card>
           </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
