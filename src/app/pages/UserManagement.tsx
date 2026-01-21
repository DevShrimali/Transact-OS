import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Mail,
  Shield,
  Trash2,
  Edit2,
  CheckCircle,
  XCircle,
  Users,
  UserCheck,
  UserMinus,
  ShieldAlert,
  Fingerprint,
  Key,
  Briefcase,
  History,
  Lock,
  Unlock
} from "lucide-react";
import {
  Card,
  CardContent,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import { Label } from "@/app/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/app/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { motion } from "framer-motion";
import { cn } from "@/app/components/ui/utils";
import { mockUsers } from "@/app/data/mockSystemData";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: "active" | "inactive";
  lastActive: string;
  avatar?: string;
}

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

export function UserManagement() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock Data
  const [users] = useState<User[]>(mockUsers);

  const stats = [
    { title: "Total Crew", value: "32", sub: "+3 new this month", icon: Users, color: "text-blue-600", bg: "bg-blue-50/50" },
    { title: "Active Now", value: "14", sub: "Internal network", icon: UserCheck, color: "text-emerald-600", bg: "bg-emerald-50/50" },
    { title: "Off-duty", value: "18", sub: "Account inactive", icon: UserMinus, color: "text-slate-400", bg: "bg-slate-50" },
    { title: "Supervisors", value: "4", sub: "Elevated access", icon: ShieldAlert, color: "text-amber-600", bg: "bg-amber-50/50" },
  ];

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-[1600px] mx-auto space-y-10 pb-20"
    >
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div className="space-y-1">
          <Badge variant="outline" className="text-[10px] font-bold tracking-[0.2em] px-2 py-0 border-blue-200 text-blue-700 uppercase">Workspace Security</Badge>
          <h1 className="text-4xl font-medium tracking-tighter text-gray-900">Personnel Directory</h1>
          <p className="text-muted-foreground font-medium">Manage user identity, access vectors, and functional permissions.</p>
        </div>
        <div className="flex items-center gap-3">
            <Button variant="outline" className="h-12 px-6 border-muted bg-background shadow-sm gap-2">
               <History className="h-4 w-4" /> Access Logs
            </Button>
            <Button className="h-12 px-6 gap-2 shadow-xl shadow-primary/20" onClick={() => setIsSheetOpen(true)}>
              <Plus className="w-4 h-4" /> Provision User
            </Button>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-2">
        {stats.map((stat, idx) => (
          <motion.div key={idx} variants={item}>
            <Card className="border-none shadow-sm h-full group hover:shadow-xl hover:-translate-y-1 transition-all duration-500 bg-background/50 backdrop-blur-sm">
               <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                     <div className={cn("p-3 rounded-2xl transition-transform group-hover:scale-110", stat.bg, stat.color)}>
                        <stat.icon className="h-5 w-5" />
                     </div>
                     <Badge variant="outline" className="text-[10px] font-bold opacity-50 px-0">METRIC_00{idx+1}</Badge>
                  </div>
                  <div>
                    <h3 className="text-3xl font-black tracking-tight">{stat.value}</h3>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">{stat.title}</p>
                    <p className="text-[11px] text-muted-foreground mt-2 flex items-center gap-1">
                       <Fingerprint className="h-3 w-3 opacity-30" />
                       {stat.sub}
                    </p>
                  </div>
               </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Directory Controls */}
      <motion.div variants={item} className="px-2">
        <Card className="border-none bg-muted/30 shadow-inner">
           <CardContent className="p-4 flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                 <Search className="absolute left-4 top-3.5 h-4 w-4 text-muted-foreground opacity-50" />
                 <Input 
                   placeholder="Identify user by name, secure email, or functional role..." 
                   className="pl-11 h-11 bg-background border-none shadow-sm font-medium"
                   value={searchQuery}
                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                 />
              </div>
              <div className="flex items-center gap-2">
                 <Button variant="outline" className="h-11 px-5 border-none bg-background shadow-sm gap-2 font-bold">
                    <Filter className="h-4 w-4" /> Attributes
                 </Button>
                 <Select defaultValue="all">
                    <SelectTrigger className="h-11 w-48 border-none bg-background shadow-sm font-bold">
                       <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                       <SelectItem value="all">Comprehensive</SelectItem>
                       <SelectItem value="active">Operational</SelectItem>
                       <SelectItem value="inactive">Suspended</SelectItem>
                    </SelectContent>
                 </Select>
              </div>
           </CardContent>
        </Card>
      </motion.div>

      {/* Personnel Table */}
      <motion.div variants={item} className="px-2">
        <Card className="border-none shadow-2xl overflow-hidden bg-background">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b">
                <tr>
                  <th className="px-8 py-5 text-left font-black text-[10px] uppercase tracking-widest text-muted-foreground">Identity</th>
                  <th className="px-4 py-5 text-left font-black text-[10px] uppercase tracking-widest text-muted-foreground">Deployment</th>
                  <th className="px-4 py-5 text-left font-black text-[10px] uppercase tracking-widest text-muted-foreground">Vector Status</th>
                  <th className="px-4 py-5 text-left font-black text-[10px] uppercase tracking-widest text-muted-foreground">Last Auth</th>
                  <th className="px-8 py-5 text-right font-black text-[10px] uppercase tracking-widest text-muted-foreground">Management</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-muted/10">
                {users.map((user) => (
                  <tr key={user.id} className="group hover:bg-muted/5 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-11 w-11 border-2 border-background shadow-md">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback className="bg-primary/5 text-primary font-black text-sm">{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-black tracking-tight group-hover:text-primary transition-colors">{user.name}</span>
                          <span className="text-xs font-medium text-muted-foreground">{user.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-5">
                      <div className="flex flex-col">
                        <span className="text-xs font-black uppercase tracking-tight flex items-center gap-1.5">
                           <Shield className="h-3 w-3 text-primary/70" /> {user.role}
                        </span>
                        <span className="text-[10px] font-bold text-muted-foreground flex items-center gap-1">
                           <Briefcase className="h-3 w-3" /> {user.department}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-5">
                      <Badge className={cn(
                        "h-6 px-2.5 text-[10px] font-black tracking-wider uppercase",
                        user.status === "active" 
                          ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/10 border-emerald-500/20" 
                          : "bg-muted text-muted-foreground hover:bg-muted border-transparent"
                      )} variant="outline">
                        {user.status === "active" ? (
                          <div className="flex items-center gap-1.5">
                             <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                             ACTIVE
                          </div>
                        ) : (
                          "OFFLINE"
                        )}
                      </Badge>
                    </td>
                    <td className="px-4 py-5 text-sm font-medium text-muted-foreground flex items-center gap-2 mt-4">
                       <History className="h-3.5 w-3.5 opacity-50" />
                       {user.lastActive}
                    </td>
                    <td className="px-8 py-5 text-right">
                       <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-primary/10 hover:text-primary">
                             <Edit2 className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                               <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl">
                                 <MoreVertical className="h-4 w-4" />
                               </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 font-medium">
                               <DropdownMenuLabel>Account Security</DropdownMenuLabel>
                               <DropdownMenuItem>
                                  <Lock className="mr-2 h-4 w-4" /> Reset Credentials
                               </DropdownMenuItem>
                               <DropdownMenuItem>
                                  <Key className="mr-2 h-4 w-4" /> Audit Permissions
                               </DropdownMenuItem>
                               <DropdownMenuSeparator />
                               {user.status === "active" ? (
                                 <DropdownMenuItem className="text-rose-600 font-bold">
                                    <XCircle className="mr-2 h-4 w-4" /> Suspend Account
                                 </DropdownMenuItem>
                               ) : (
                                 <DropdownMenuItem className="text-emerald-600 font-bold">
                                    <CheckCircle className="mr-2 h-4 w-4" /> Re-activate Account
                                 </DropdownMenuItem>
                               )}
                               <DropdownMenuSeparator />
                               <DropdownMenuItem className="text-destructive font-bold">
                                  <Trash2 className="mr-2 h-4 w-4" /> Wipe Personal Data
                               </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-8 bg-muted/10 border-t flex flex-col md:flex-row md:items-center justify-between gap-6">
             <div className="flex flex-col">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Operational Status</p>
                <p className="text-[11px] font-medium text-muted-foreground/60 mt-1">4 of 32 identities presently authenticated via UIMS Core.</p>
             </div>
             <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-9 px-5 text-[10px] font-black uppercase tracking-widest shadow-sm">Identity Export</Button>
                <div className="flex gap-1 bg-background p-1 rounded-xl shadow-inner border">
                   {[1, 2, 3].map(n => (
                      <Button key={n} variant={n === 1 ? "secondary" : "ghost"} size="icon" className="h-7 w-7 text-xs font-bold rounded-lg">{n}</Button>
                   ))}
                </div>
             </div>
          </div>
        </Card>
      </motion.div>
      {/* Staff Provisioning (Sheet) */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-2xl overflow-y-auto px-0 border-none bg-background shadow-2xl">
           <div className="px-10 pb-32 pt-10">
              <SheetHeader className="mb-12">
                 <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 shadow-inner border border-primary/20">
                    <Shield className="h-7 w-7" />
                 </div>
                 <SheetTitle className="text-3xl font-black tracking-tight">Provision Personnel</SheetTitle>
                 <SheetDescription className="text-base font-medium">Create a secure identity and assign operational parameters.</SheetDescription>
              </SheetHeader>

              <div className="space-y-12">
                 {/* Basic Info */}
                 <section className="space-y-6">
                    <div className="flex items-center gap-2 mb-2">
                       <div className="w-1.5 h-6 bg-primary rounded-full" />
                       <h3 className="font-black text-xl tracking-tight">Core Identity</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2.5">
                           <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Given Name</Label>
                           <Input placeholder="e.g. John" className="h-12 border-none bg-muted/50 focus-visible:ring-primary/20 font-bold" />
                        </div>
                        <div className="space-y-2.5">
                           <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Surname</Label>
                           <Input placeholder="e.g. Doe" className="h-12 border-none bg-muted/50 focus-visible:ring-primary/20 font-bold" />
                        </div>
                    </div>
                    <div className="space-y-2.5">
                       <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Personnel Email</Label>
                       <div className="relative">
                          <Mail className="absolute left-4 top-4 h-4 w-4 text-muted-foreground/40" />
                          <Input type="email" placeholder="john.doe@logistics-core.com" className="h-12 border-none bg-muted/50 pl-11 focus-visible:ring-primary/20 font-bold" />
                       </div>
                    </div>
                 </section>

                 {/* Role & Dep */}
                 <section className="space-y-6">
                    <div className="flex items-center gap-2 mb-2">
                       <div className="w-1.5 h-6 bg-primary rounded-full" />
                       <h3 className="font-black text-xl tracking-tight">Deployment Profile</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                       <div className="space-y-2.5">
                          <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Functional Role</Label>
                          <Select>
                             <SelectTrigger className="h-12 border-none bg-muted/50 font-bold">
                                <SelectValue placeholder="Assign role..." />
                             </SelectTrigger>
                             <SelectContent>
                                <SelectItem value="manager" className="font-bold">Warehouse Manager</SelectItem>
                                <SelectItem value="clerk" className="font-bold">Inventory Clerk</SelectItem>
                                <SelectItem value="accounting" className="font-bold">Accountant</SelectItem>
                                <SelectItem value="admin" className="font-bold">Cluster Administrator</SelectItem>
                             </SelectContent>
                          </Select>
                       </div>
                       <div className="space-y-2.5">
                          <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Division</Label>
                          <Select>
                             <SelectTrigger className="h-12 border-none bg-muted/50 font-bold">
                                <SelectValue placeholder="Assign department..." />
                             </SelectTrigger>
                             <SelectContent>
                                <SelectItem value="ops" className="font-bold">Operations</SelectItem>
                                <SelectItem value="logistics" className="font-bold">Supply Chain</SelectItem>
                                <SelectItem value="finance" className="font-bold">Finance</SelectItem>
                                <SelectItem value="it" className="font-bold">Core Infrastructure</SelectItem>
                             </SelectContent>
                          </Select>
                       </div>
                    </div>
                 </section>

                 {/* Permissions Matrix */}
                 <section className="space-y-6">
                    <div className="flex items-center gap-2 mb-2">
                       <div className="w-1.5 h-6 bg-primary rounded-full" />
                       <h3 className="font-black text-xl tracking-tight">Access Permissions</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                       {["Dashboard Observation", "Ledger Manipulation", "Procurement Approval", "Protocol Configuration", "Audit Log Retrieval"].map((perm, i) => (
                         <label key={i} className="group relative flex items-center justify-between p-5 rounded-2xl border-2 border-transparent bg-muted/30 hover:bg-background hover:border-primary/20 transition-all cursor-pointer">
                            <div className="flex items-center gap-4">
                               <div className="h-10 w-10 flex items-center justify-center bg-background rounded-xl shadow-sm">
                                  {i % 2 === 0 ? <Unlock className="h-4 w-4 text-emerald-500" /> : <Lock className="h-4 w-4 text-amber-500" />}
                               </div>
                               <div>
                                  <p className="font-bold text-sm tracking-tight">{perm}</p>
                                  <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest mt-0.5">Vector Level 0{i+1}</p>
                               </div>
                            </div>
                            <input type="checkbox" className="h-5 w-5 rounded-lg border-muted text-primary focus:ring-primary shadow-sm" defaultChecked={i === 0} />
                         </label>
                       ))}
                    </div>
                 </section>
              </div>
           </div>

           <SheetFooter className="fixed bottom-0 left-0 right-0 p-10 pt-6 bg-background/80 backdrop-blur-xl border-t z-50">
             <div className="flex gap-4 w-full">
                <Button variant="ghost" className="flex-1 h-16 rounded-2xl font-black text-xs uppercase tracking-widest text-muted-foreground hover:bg-muted" onClick={() => setIsSheetOpen(false)}>Abort Mission</Button>
                <Button className="flex-1 h-16 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-primary/40" onClick={() => setIsSheetOpen(false)}>Confirm Provisioning</Button>
             </div>
           </SheetFooter>
        </SheetContent>
      </Sheet>
    </motion.div>
  );
}