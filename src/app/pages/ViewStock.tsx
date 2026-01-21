import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Printer,
  Package,
  Layers,
  MapPin,
  TrendingDown,
  Info,
  Scale,
  MoreVertical,
  ShieldCheck,
  AlertTriangle,
  History
} from "lucide-react";
import {
  Card,
  CardContent,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
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
  hidden: { y: 10, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export function ViewStock() {
  const [searchQuery, setSearchQuery] = useState("");
  const [warehouse, setWarehouse] = useState("all");

  const stats = [
    { title: "Total Qty on Hand", value: "48,290", icon: Package, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Allocated Stock", value: "3,120", icon: Scale, color: "text-amber-600", bg: "bg-amber-100" },
    { title: "Available Units", value: "45,170", icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-100" },
    { title: "Critical Stock", value: "12 Items", icon: AlertTriangle, color: "text-red-600", bg: "bg-red-100" },
  ];

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-[1600px] mx-auto space-y-8 pb-10"
    >
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Stock Inventory</h1>
          <p className="text-muted-foreground mt-1">Real-time oversight of all physical assets and allocations.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Printer className="h-4 w-4" /> Print
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <motion.div key={idx} variants={item}>
            <Card className="border-none shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
               <CardContent className="p-6 flex items-center gap-4">
                  <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", stat.bg, stat.color)}>
                     <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{stat.title}</p>
                    <h3 className="text-2xl font-black mt-0.5">{stat.value}</h3>
                  </div>
               </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Control Bar */}
      <motion.div variants={item}>
        <Card className="bg-muted/40 border-none shadow-inner">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Scan SKU or lookup part identifiers..."
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                  className="pl-10 h-10 bg-background border-none shadow-sm focus-visible:ring-primary/20"
                />
              </div>
              <div className="flex items-center gap-3">
                <Select value={warehouse} onValueChange={setWarehouse}>
                   <SelectTrigger className="w-[220px] h-10 bg-background border-none shadow-sm">
                      <Layers className="mr-2 h-4 w-4 text-muted-foreground" />
                      <SelectValue placeholder="Storage Node" />
                   </SelectTrigger>
                   <SelectContent>
                      <SelectItem value="all">All Facilities</SelectItem>
                      <SelectItem value="main">Main Logistics Center</SelectItem>
                      <SelectItem value="south">Southern Distribution</SelectItem>
                      <SelectItem value="cold">Refinery & Cold Storage</SelectItem>
                   </SelectContent>
                </Select>
                <Button variant="outline" size="icon" className="h-10 w-10 bg-background border-none shadow-sm">
                   <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Data Visualizer */}
      <motion.div variants={item}>
        <Card className="overflow-hidden border-none shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b">
                <tr>
                  <th className="text-left font-bold text-[10px] uppercase tracking-widest text-muted-foreground px-6 py-4">Item Identity</th>
                  <th className="text-left font-bold text-[10px] uppercase tracking-widest text-muted-foreground px-4 py-4">Logistics Grouping</th>
                  <th className="text-left font-bold text-[10px] uppercase tracking-widest text-muted-foreground px-4 py-4">Precise Location</th>
                  <th className="text-right font-bold text-[10px] uppercase tracking-widest text-muted-foreground px-4 py-4">Current Ledger</th>
                  <th className="text-right font-bold text-[10px] uppercase tracking-widest text-muted-foreground px-4 py-4">Available</th>
                  <th className="text-center font-bold text-[10px] uppercase tracking-widest text-muted-foreground px-6 py-4">Lifecycle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-muted/30">
                {Array.from({ length: 12 }).map((_, i) => (
                  <tr key={i} className="group hover:bg-muted/10 transition-colors">
                    <td className="px-6 py-4 text-sm">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-mono text-xs font-bold text-primary">SKU-100{i}</span>
                        <span className="font-semibold text-foreground group-hover:text-primary transition-colors">Industrial Grade Component #{i + 300}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                       <div className="flex items-center gap-2">
                          <Badge variant="outline" className="border-muted bg-background h-5 text-[10px] font-bold">BATCH-2024-{10+i}</Badge>
                          <span className="text-xs text-muted-foreground font-medium">Main WH</span>
                       </div>
                    </td>
                    <td className="px-4 py-4">
                       <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span className="font-medium">Z1-R2-B{i}</span>
                       </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                       <div className="flex flex-col text-right">
                          <span className="text-sm font-bold">{1000 - (i*10)} Units</span>
                          <span className="text-[10px] text-muted-foreground">Allocated: {i * 5}</span>
                       </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                       <Badge className={cn(
                          "font-mono font-bold",
                          i % 5 === 0 ? "bg-red-100 text-red-700 hover:bg-red-100" : "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                       )}>
                          {1000 - (i*15)}
                       </Badge>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex items-center justify-center gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                             <History className="h-4 w-4 text-muted-foreground" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                <MoreVertical className="h-4 w-4 text-muted-foreground" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                               <DropdownMenuLabel>Stock Options</DropdownMenuLabel>
                               <DropdownMenuItem>
                                  <TrendingDown className="mr-2 h-4 w-4" /> Correct Stock Level
                               </DropdownMenuItem>
                               <DropdownMenuItem>
                                  <Layers className="mr-2 h-4 w-4" /> Move to Zone...
                               </DropdownMenuItem>
                               <DropdownMenuSeparator />
                               <DropdownMenuItem>
                                  <Info className="mr-2 h-4 w-4" /> View Technical Specs
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
          <div className="flex items-center justify-between border-t px-6 py-4 bg-muted/20">
             <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Filtered View: 12 / 128 Global Listings</span>
             </div>
             <div className="flex items-center gap-2">
               <Button variant="outline" size="sm" className="h-8 px-3 text-xs" disabled>Previous</Button>
               <Button variant="outline" size="sm" className="h-8 px-3 text-xs">Next</Button>
             </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
