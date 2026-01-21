import { useState } from "react";
import {
  Filter,
  Shield,
  Clock,
  ChevronRight,
  Download,
  Terminal,
  AlertTriangle,
  Database,
  Cpu,
  RefreshCcw,
  Fingerprint
} from "lucide-react";
import {
  Card,
  CardContent
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
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

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04
    }
  }
};

const item = {
  hidden: { x: -10, opacity: 0 },
  show: { x: 0, opacity: 1 }
};

export function AuditLogs() {
  const [searchQuery, setSearchQuery] = useState("");

  const eventStats = [
    { label: "Total Operations", value: "12,842", sub: "Last 24 hours", icon: Database, color: "text-blue-600", bg: "bg-blue-100/50" },
    { label: "Critical Actions", value: "14", sub: "Admin overrides", icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-100/50" },
    { label: "System Uptime", value: "99.98%", sub: "Core Engine", icon: Cpu, color: "text-emerald-600", bg: "bg-emerald-100/50" },
    { label: "Active Sessions", value: "8", sub: "Verified users", icon: Shield, color: "text-purple-600", bg: "bg-purple-100/50" },
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
          <Badge variant="outline" className="text-[10px] font-black tracking-[0.2em] px-2 py-0 border-primary/30 text-primary uppercase">Forensic Ledger</Badge>
          <h1 className="text-4xl font-black tracking-tighter italic">Security Feed</h1>
          <p className="text-muted-foreground font-medium">Real-time surveillance of system-wide administrative operations.</p>
        </div>
        <div className="flex items-center gap-3">
            <Button variant="outline" className="h-12 px-6 border-muted bg-background shadow-sm gap-2">
               <RefreshCcw className="h-4 w-4" /> Sync Stream
            </Button>
            <Button className="h-12 px-6 gap-2 shadow-xl shadow-primary/20">
              <Download className="w-4 h-4" /> Export Archive
            </Button>
        </div>
      </div>

      {/* Forensic Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-2">
        {eventStats.map((stat, i) => (
          <motion.div key={i} variants={item}>
            <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300">
               <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                     <div className={cn("p-3 rounded-2xl", stat.bg, stat.color)}>
                        <stat.icon className="h-5 w-5" />
                     </div>
                     <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black tracking-tight">{stat.value}</h3>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">{stat.label}</p>
                    <p className="text-[11px] text-muted-foreground mt-2">{stat.sub}</p>
                  </div>
               </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filter Controls */}
      <motion.div variants={item} className="px-2">
        <Card className="border-none bg-muted/40 shadow-inner overflow-hidden">
           <CardContent className="p-4 flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                 <Terminal className="absolute left-4 top-3.5 h-4 w-4 text-muted-foreground opacity-50" />
                 <Input 
                   placeholder="Query event registry..." 
                   className="pl-11 h-11 bg-background border-none shadow-sm font-medium"
                   value={searchQuery}
                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                 />
              </div>
              <div className="flex items-center gap-2">
                 <Select defaultValue="all">
                    <SelectTrigger className="h-11 w-48 border-none bg-background shadow-sm font-bold">
                       <SelectValue placeholder="All Modules" />
                    </SelectTrigger>
                    <SelectContent>
                       <SelectItem value="all">Global Scope</SelectItem>
                       <SelectItem value="items">Inventory Items</SelectItem>
                       <SelectItem value="vendors">Supply Chain</SelectItem>
                       <SelectItem value="users">IAM / Permissions</SelectItem>
                       <SelectItem value="finance">Financials</SelectItem>
                    </SelectContent>
                 </Select>
                 <Button variant="outline" className="h-11 px-5 border-none bg-background shadow-sm gap-2 font-bold">
                    <Filter className="h-4 w-4" /> Filter Stack
                 </Button>
              </div>
           </CardContent>
        </Card>
      </motion.div>

      {/* Event Stream */}
      <motion.div variants={item} className="px-2">
        <Card className="border-none shadow-2xl overflow-hidden bg-background">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b">
                <tr>
                  <th className="px-8 py-5 text-left font-black text-[10px] uppercase tracking-widest text-muted-foreground">Log Sequence</th>
                  <th className="px-4 py-5 text-left font-black text-[10px] uppercase tracking-widest text-muted-foreground">Identity</th>
                  <th className="px-4 py-5 text-left font-black text-[10px] uppercase tracking-widest text-muted-foreground">Operation</th>
                  <th className="px-4 py-5 text-left font-black text-[10px] uppercase tracking-widest text-muted-foreground">Target Module</th>
                  <th className="px-4 py-5 text-left font-black text-[10px] uppercase tracking-widest text-muted-foreground">Forensic Details</th>
                  <th className="px-8 py-5 text-right font-black text-[10px] uppercase tracking-widest text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-muted/10">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                  <tr key={i} className="group hover:bg-muted/5 transition-colors border-l-4 border-l-transparent hover:border-l-primary/40">
                    <td className="px-8 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-black tracking-tighter">2024-01-20</span>
                        <span className="text-[10px] font-mono font-bold text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" /> 14:3{i}:0{i}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-5">
                      <div className="flex items-center gap-2">
                         <div className="h-7 w-7 rounded-full bg-primary/5 border flex items-center justify-center text-[10px] font-black text-primary uppercase">A</div>
                         <div className="flex flex-col">
                            <span className="text-xs font-bold leading-none">admin_core</span>
                            <span className="text-[9px] text-muted-foreground font-mono">ID: 0x{i}F92</span>
                         </div>
                      </div>
                    </td>
                    <td className="px-4 py-5">
                      <Badge className={cn(
                        "h-6 px-2.5 text-[10px] font-black tracking-wider uppercase border-none",
                        i % 3 === 0 ? "bg-rose-500/10 text-rose-600" : (i % 2 === 0 ? "bg-blue-500/10 text-blue-600" : "bg-emerald-500/10 text-emerald-600")
                      )} variant="outline">
                         {i % 3 === 0 ? 'PURGE_ENTRY' : (i % 2 === 0 ? 'MODIFY_ATTR' : 'INITIALIZE_OBJ')}
                      </Badge>
                    </td>
                    <td className="px-4 py-5">
                      <div className="flex items-center gap-1.5">
                         <Database className="h-3 w-3 text-muted-foreground/50" />
                         <span className="text-xs font-bold uppercase tracking-tight opacity-70">
                            {i % 3 === 0 ? 'ITEM_REGISTRY' : (i % 2 === 0 ? 'SUPPLY_CHAIN' : 'CORE_AUTH')}
                         </span>
                      </div>
                    </td>
                    <td className="px-4 py-5">
                       <div className="flex flex-col max-w-[320px]">
                          <span className="text-sm font-bold truncate group-hover:text-primary transition-colors">
                             {i % 3 === 0 ? `Irreversible deletion of inventory node: SKU-00${i}5` : `Entity metadata update for identifier: VENDOR_0${i}`}
                          </span>
                          <span className="text-[10px] font-medium text-muted-foreground flex items-center gap-1">
                             <Fingerprint className="h-2.5 w-2.5" /> SHA256: e3b0c44298fc1...
                          </span>
                       </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                       <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                          <ChevronRight className="h-4 w-4" />
                       </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-8 bg-muted/10 border-t flex flex-col md:flex-row md:items-center justify-between gap-6">
             <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                   {[1, 2, 3].map(n => (
                     <div key={n} className="h-9 w-9 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-black text-muted-foreground uppercase">JD</div>
                   ))}
                </div>
                <p className="text-[11px] font-medium text-muted-foreground">3 administrative identities actively monitoring the stream.</p>
             </div>
             <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-9 px-5 text-[10px] font-black uppercase tracking-widest shadow-sm">Audit History</Button>
                <div className="flex gap-1 bg-background p-1 rounded-xl shadow-inner border">
                   {[1, 2, 3].map(n => (
                      <Button key={n} variant={n === 1 ? "secondary" : "ghost"} size="icon" className="h-7 w-7 text-xs font-bold rounded-lg">{n}</Button>
                   ))}
                </div>
             </div>
          </div>
        </Card>
      </motion.div>

      {/* Terminal View / Details Drawer (Optional concept) */}
      <motion.div variants={item} className="px-2">
         <Card className="bg-black border-none shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-1 bg-primary/30" />
            <CardContent className="p-8">
               <div className="flex items-center gap-4 mb-4">
                  <Terminal className="h-5 w-5 text-emerald-500" />
                  <span className="text-xs font-mono font-bold text-emerald-500 uppercase tracking-widest">Active System Console</span>
               </div>
               <div className="font-mono text-[13px] space-y-2 text-primary/80">
                  <p><span className="text-primary font-bold">[SYS_INFO]:</span> Initializing forensic bridge on port 443...</p>
                  <p><span className="text-emerald-500 font-bold">[SUCCESS]:</span> Handshake with SecureVault API completed.</p>
                  <p><span className="text-rose-500 font-bold">[WARN]:</span> Multiple failed auth attempts detected from IP 192.168.1.45</p>
                  <p><span className="text-primary/40 animate-pulse">_ await stream_input()</span></p>
               </div>
            </CardContent>
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
               <Button size="sm" variant="outline" className="h-8 border-primary/20 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest">Clear session</Button>
            </div>
         </Card>
      </motion.div>
    </motion.div>
  );
}
