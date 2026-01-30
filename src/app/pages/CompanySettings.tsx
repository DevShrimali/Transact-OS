import {
  Building2,
  Globe,
  Phone,
  Mail,
  Save,
  ShieldCheck,
  CreditCard,
  Flag,
  Navigation,
  ExternalLink,
  Briefcase,
  Layers,
  Globe2,
  Clock,
  Compass
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
import { Badge } from "@/app/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { motion } from "framer-motion";
import { cn } from "@/app/components/ui/utils";

import { container, item } from "@/app/components/ui/animations";

export function CompanySettings() {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-[1600px] mx-auto space-y-10 pb-20 px-4"
    >
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div className="space-y-1">
          <Badge variant="outline" className="text-[10px] font-bold tracking-[0.2em] px-2 py-0 border-blue-200 text-blue-700 uppercase">Organization Protocol</Badge>
          <h1 className="text-4xl font-medium tracking-tighter text-gray-900">Entity Master</h1>
          <p className="text-muted-foreground font-medium">Define the core characteristics and operational jurisdiction of your enterprise.</p>
        </div>
        <div className="flex items-center gap-3">
            <Button variant="ghost" className="h-12 px-6 text-muted-foreground font-bold hover:bg-muted">Discard Updates</Button>
            <Button className="h-12 px-8 gap-2 shadow-xl shadow-primary/25 font-black uppercase text-xs tracking-widest">
              <Save className="h-4 w-4" /> Save Configuration
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-2">
        {/* Main Configuration Stack */}
        <div className="lg:col-span-8 space-y-8">
           {/* Section 1: Institutional Identity */}
           <motion.div variants={item}>
              <Card className="border-none shadow-sm overflow-hidden bg-background">
                 <CardHeader className="pb-8 pt-8 px-8 flex-row items-start gap-5 space-y-0">
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-inner">
                       <Building2 className="h-7 w-7" />
                    </div>
                    <div>
                       <CardTitle className="text-2xl font-black tracking-tight">Institutional Identity</CardTitle>
                       <CardDescription className="text-base">Legal identification and tax directives.</CardDescription>
                    </div>
                 </CardHeader>
                 <CardContent className="px-8 pb-10 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-2.5 text-left">
                          <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Company Designation</Label>
                          <Input className="h-12 border-none bg-muted/50 focus-visible:ring-primary/20 font-bold" defaultValue="EV Mart (US) Enterprises" />
                       </div>
                       <div className="space-y-2.5 text-left">
                          <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Regulatory Tax ID (EIN)</Label>
                          <div className="relative">
                             <CreditCard className="absolute left-4 top-4 h-4 w-4 text-muted-foreground/30" />
                             <Input className="h-12 pl-11 border-none bg-muted/50 focus-visible:ring-primary/20 font-mono font-bold" defaultValue="EIN-99-887766" />
                          </div>
                       </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-2.5 text-left">
                          <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Business Architecture</Label>
                          <Select defaultValue="food">
                             <SelectTrigger className="h-12 border-none bg-muted/50 focus:ring-primary/20 font-bold">
                                <SelectValue placeholder="Select type..." />
                             </SelectTrigger>
                             <SelectContent>
                                <SelectItem value="retail" className="font-bold">Retail Logistics</SelectItem>
                                <SelectItem value="wholesale" className="font-bold">Wholesale Distribution</SelectItem>
                                <SelectItem value="food" className="font-bold">Food & Pharmaceutical</SelectItem>
                                <SelectItem value="manufacturing" className="font-bold">Industrial Manufacturing</SelectItem>
                             </SelectContent>
                          </Select>
                       </div>
                       <div className="space-y-2.5 text-left">
                          <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Base Fiscal Currency</Label>
                          <div className="relative">
                             <Globe2 className="absolute left-4 top-4 h-4 w-4 text-muted-foreground/30" />
                             <Input className="h-12 pl-11 border-none bg-muted/50 focus-visible:ring-primary/20 font-bold" defaultValue="USD ($) - United States Dollar" disabled />
                          </div>
                       </div>
                    </div>
                 </CardContent>
              </Card>
           </motion.div>

           {/* Section 2: Global Positioning */}
           <motion.div variants={item}>
              <Card className="border-none shadow-sm overflow-hidden bg-background">
                 <CardHeader className="pb-8 pt-8 px-8 flex-row items-start gap-5 space-y-0">
                    <div className="h-14 w-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 border border-amber-500/20 shadow-inner">
                       <Compass className="h-7 w-7" />
                    </div>
                    <div>
                       <CardTitle className="text-2xl font-black tracking-tight">Global Positioning</CardTitle>
                       <CardDescription className="text-base">Registered headquarters and legal physical jurisdiction.</CardDescription>
                    </div>
                 </CardHeader>
                 <CardContent className="px-8 pb-10 space-y-8">
                    <div className="space-y-2.5 text-left">
                       <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Street Address Archive</Label>
                       <div className="relative">
                          <Navigation className="absolute left-4 top-4 h-4 w-4 text-muted-foreground/30" />
                          <Input className="h-12 pl-11 border-none bg-muted/50 focus-visible:ring-primary/20 font-bold" defaultValue="400 Broad St, Space Needle Plaza" />
                       </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                       <div className="space-y-2.5 text-left">
                          <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Operational City</Label>
                          <Input className="h-12 border-none bg-muted/50 focus-visible:ring-primary/20 font-bold" defaultValue="Seattle" />
                       </div>
                       <div className="space-y-2.5 text-left">
                          <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Territory / State</Label>
                          <Input className="h-12 border-none bg-muted/50 focus-visible:ring-primary/20 font-bold" defaultValue="Washington (WA)" />
                       </div>
                       <div className="space-y-2.5 text-left">
                          <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Postal Coordinate</Label>
                          <Input className="h-12 border-none bg-muted/50 focus-visible:ring-primary/20 font-mono font-bold" defaultValue="98109" />
                       </div>
                    </div>
                    <div className="space-y-2.5 text-left">
                       <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Sovereign Country</Label>
                       <div className="flex gap-4">
                          <div className="flex-1 relative">
                             <Flag className="absolute left-4 top-4 h-4 w-4 text-muted-foreground/30" />
                             <Input className="h-12 pl-11 border-none bg-muted/50 focus-visible:ring-primary/20 font-bold" defaultValue="United States" />
                          </div>
                          <Button variant="outline" className="h-12 px-6 rounded-xl font-bold bg-muted/30 border-none">
                             Verify Node
                          </Button>
                       </div>
                    </div>
                 </CardContent>
              </Card>
           </motion.div>
        </div>

        {/* Sidebar Context */}
        <div className="lg:col-span-4 space-y-8">
           <motion.div variants={item}>
              <Card className="border shadow-lg bg-background overflow-hidden relative">
                 <div className="absolute -bottom-10 -right-10 opacity-5">
                    <ShieldCheck className="w-64 h-64" />
                 </div>
                 <CardHeader className="pb-4 relative z-10">
                    <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center text-primary mb-2 border border-emerald-100">
                       <Layers className="h-5 w-5 text-emerald-600" />
                    </div>
                    <CardTitle className="text-xl font-black">Entity Status</CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-6 relative z-10">
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 border border-muted/50">
                       <div className="flex flex-col">
                          <span className="text-[10px] uppercase font-black opacity-50 text-muted-foreground">Operational Hub</span>
                          <span className="text-sm font-bold">North America - West</span>
                       </div>
                       <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse" />
                    </div>
                    <div className="space-y-4">
                       <div className="flex items-center gap-4 text-sm font-medium">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>Last profile sync: 12m ago</span>
                       </div>
                       <div className="flex items-center gap-4 text-sm font-medium">
                          <Briefcase className="h-4 w-4 text-muted-foreground" />
                          <span>Linked Warehouses: 04</span>
                       </div>
                    </div>
                    <Separator className="bg-border" />
                    <Button variant="ghost" className="w-full text-muted-foreground hover:text-foreground hover:bg-muted font-bold gap-2">
                       <ExternalLink className="h-4 w-4" /> View Legal Manifest
                    </Button>
                 </CardContent>
              </Card>
           </motion.div>

           <motion.div variants={item}>
              <Card className="border-none shadow-sm">
                 <CardHeader>
                    <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">Communication Flux</CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-6">
                    <div className="space-y-4">
                       <div className="space-y-1.5 text-left">
                          <Label className="text-[10px] font-black uppercase tracking-tighter opacity-70 flex items-center gap-2">
                             <Mail className="h-3 w-3" /> System Primary Email
                          </Label>
                          <p className="text-sm font-black text-primary truncate">admin@evmart-global.com</p>
                       </div>
                       <div className="space-y-1.5 text-left">
                          <Label className="text-[10px] font-black uppercase tracking-tighter opacity-70 flex items-center gap-2">
                             <Phone className="h-3 w-3" /> HQ Switchboard
                          </Label>
                          <p className="text-sm font-black">+1 (555) 000-0000</p>
                       </div>
                       <div className="space-y-1.5 text-left">
                          <Label className="text-[10px] font-black uppercase tracking-tighter opacity-70 flex items-center gap-2">
                             <Globe className="h-3 w-3" /> Corporate Web Terminal
                          </Label>
                          <p className="text-sm font-black truncate">https://evmart-global.terminal</p>
                       </div>
                    </div>
                    <Button variant="outline" className="w-full h-10 rounded-xl font-bold bg-muted/20 border-none hover:bg-muted/40 transition-colors">
                       Modify Vectors
                    </Button>
                 </CardContent>
              </Card>
           </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

const Separator = ({ className }: { className?: string }) => (
  <div className={cn("h-px w-full bg-border", className)} />
);
