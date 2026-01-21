import { useState } from "react";
import {
  Search,
  ArrowUpRight,
  ArrowDownLeft,
  Filter,
  Package,
  FileSpreadsheet,
  History,
  TrendingUp,
  ExternalLink,
  ChevronRight
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
      staggerChildren: 0.05
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export function InventoryLedger() {
  const [sku, setSku] = useState("");

  const summaryData = [
    { title: "Opening Balance", value: "12,400", sub: "Oct 01, 2024", icon: Package, color: "text-muted-foreground", bg: "bg-muted" },
    { title: "Inbound Total", value: "+ 3,250", sub: "14 transactions", icon: ArrowDownLeft, color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100" },
    { title: "Outbound Total", value: "- 2,100", sub: "28 transactions", icon: ArrowUpRight, color: "text-rose-600", bg: "bg-rose-50 border-rose-100" },
    { title: "Current Balance", value: "13,550", sub: "+9.2% increase", icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50 border-blue-100" },
  ];

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-[1600px] mx-auto space-y-8 pb-10"
    >
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between px-2">
        <div className="space-y-1">
          <Badge variant="outline" className="text-[10px] font-bold tracking-[0.2em] px-2 py-0 border-blue-200 text-blue-700 uppercase">Movement History</Badge>
          <h1 className="text-4xl font-medium tracking-tighter text-gray-900">Audit Ledger</h1>
          <p className="text-muted-foreground font-medium">Chronological tracking of stock movements and valuation changes.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 shadow-sm border-muted">
            <FileSpreadsheet className="h-4 w-4" /> Comprehensive Export
          </Button>
          <Button className="gap-2 shadow-lg shadow-primary/20">
            <Filter className="h-4 w-4" /> Advanced Audit
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-2">
        {summaryData.map((stat, idx) => (
          <motion.div key={idx} variants={item}>
            <Card className={cn("border transition-all hover:shadow-md", stat.bg)}>
              <CardContent className="p-5 flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-70">{stat.title}</p>
                  <h3 className="text-2xl font-black mt-1 tracking-tight">{stat.value}</h3>
                  <p className="text-[11px] font-medium text-muted-foreground mt-1 flex items-center gap-1">
                    {stat.icon === TrendingUp && <TrendingUp className="h-3 w-3 text-emerald-500" />}
                    {stat.sub}
                  </p>
                </div>
                <div className={cn("p-2 rounded-xl bg-background shadow-sm border", stat.color)}>
                  <stat.icon className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Advanced Filter Panel */}
      <motion.div variants={item} className="px-2">
        <Card className="border-none bg-muted/30 shadow-inner">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest opacity-70">Temporal Range</Label>
                <div className="flex items-center gap-2">
                  <Input type="date" className="h-10 bg-background border-none shadow-sm font-medium" />
                  <span className="text-muted-foreground"><ChevronRight className="h-4 w-4" /></span>
                  <Input type="date" className="h-10 bg-background border-none shadow-sm font-medium" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest opacity-70">Object Identifier</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="SKU or Partition ID..." 
                    value={sku}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSku(e.target.value)}
                    className="pl-10 h-10 bg-background border-none shadow-sm font-medium" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest opacity-70">Event Category</Label>
                <Select defaultValue="all">
                   <SelectTrigger className="h-10 bg-background border-none shadow-sm font-medium">
                      <SelectValue placeholder="All Activities" />
                   </SelectTrigger>
                   <SelectContent>
                      <SelectItem value="all">All Movements</SelectItem>
                      <SelectItem value="in">Inbound (Purchase/Transfer)</SelectItem>
                      <SelectItem value="out">Outbound (Sale/Adjustment)</SelectItem>
                      <SelectItem value="adj">Inventory Calibration</SelectItem>
                   </SelectContent>
                </Select>
              </div>
              <Button className="h-10 gap-2 font-bold w-full md:w-auto">
                 Initiate Log Retrieval
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Ledger Table */}
      <motion.div variants={item} className="px-2">
        <Card className="overflow-hidden border-none shadow-xl bg-background">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b">
                <tr>
                  <th className="text-left font-black text-[10px] uppercase tracking-widest text-muted-foreground px-6 py-4">Event Timestamp</th>
                  <th className="text-left font-black text-[10px] uppercase tracking-widest text-muted-foreground px-4 py-4">Nature of Event</th>
                  <th className="text-left font-black text-[10px] uppercase tracking-widest text-muted-foreground px-4 py-4">Voucher Reference</th>
                  <th className="text-left font-black text-[10px] uppercase tracking-widest text-muted-foreground px-4 py-4">Asset Identification</th>
                  <th className="text-right font-black text-[10px] uppercase tracking-widest text-muted-foreground px-4 py-4">Delta In</th>
                  <th className="text-right font-black text-[10px] uppercase tracking-widest text-muted-foreground px-4 py-4">Delta Out</th>
                  <th className="text-right font-black text-[10px] uppercase tracking-widest text-muted-foreground px-6 py-4">Net Ledger Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-muted/20">
                {Array.from({ length: 10 }).map((_, i) => (
                  <tr key={i} className="group hover:bg-muted/10 transition-colors">
                    <td className="px-6 py-4">
                       <div className="flex flex-col gap-0.5">
                          <span className="text-sm font-semibold tracking-tight">2024-01-20</span>
                          <span className="text-[10px] font-mono font-bold text-muted-foreground flex items-center gap-1">
                            <History className="h-3 w-3" /> 10:3{i} AM
                          </span>
                       </div>
                    </td>
                    <td className="px-4 py-4">
                       <Badge className={cn(
                          "h-6 px-2 text-[10px] font-black tracking-tight",
                          i % 2 === 0 ? "bg-emerald-500/10 text-emerald-600 border-emerald-200" : "bg-rose-500/10 text-rose-600 border-rose-200"
                       )} variant="outline">
                         {i % 2 === 0 ? 'PURCHASE_RECIEPT' : 'SALES_SHIPMENT'}
                       </Badge>
                    </td>
                    <td className="px-4 py-4">
                       <div className="flex items-center gap-2 group/ref">
                          <span className="text-xs font-mono font-bold text-muted-foreground">
                            {i % 2 === 0 ? `GRN-100${i}` : `SO-500${i}`}
                          </span>
                          <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover/ref:opacity-100 transition-opacity cursor-pointer" />
                       </div>
                    </td>
                    <td className="px-4 py-4">
                       <div className="flex flex-col">
                          <span className="text-sm font-semibold text-foreground">Industrial Widget - Model {i + 1}</span>
                          <span className="text-[10px] font-bold text-primary opacity-70">MOD-X00{i}</span>
                       </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                       {i % 2 === 0 ? (
                          <div className="flex items-center justify-end gap-1.5 text-emerald-600 font-bold">
                             <span className="text-sm">+ 100</span>
                             <ArrowDownLeft className="h-3 w-3" />
                          </div>
                       ) : (
                          <span className="text-muted-foreground text-xs opacity-30">—</span>
                       )}
                    </td>
                    <td className="px-4 py-4 text-right">
                       {i % 2 !== 0 ? (
                          <div className="flex items-center justify-end gap-1.5 text-rose-600 font-bold">
                             <span className="text-sm">- 50</span>
                             <ArrowUpRight className="h-3 w-3" />
                          </div>
                       ) : (
                          <span className="text-muted-foreground text-xs opacity-30">—</span>
                       )}
                    </td>
                    <td className="px-6 py-4 text-right">
                       <span className="text-sm font-black tracking-tight font-mono">
                         {1000 + (i % 2 === 0 ? 100 : -50)}
                       </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-6 bg-muted/10 border-t flex flex-col md:flex-row md:items-center justify-between gap-4">
             <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
               End of sequence reached. Displaying latest 50 entries.
             </p>
             <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-8 px-4 text-[10px] font-black uppercase tracking-widest hover:bg-primary/5 hover:text-primary transition-colors">
                   Load Historic Data
                </Button>
                <div className="h-4 w-px bg-muted mx-2" />
                <div className="flex gap-1">
                   {[1, 2, 3].map(n => (
                      <Button key={n} variant={n === 1 ? "default" : "ghost"} size="icon" className="h-8 w-8 text-xs font-bold">{n}</Button>
                   ))}
                </div>
             </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
