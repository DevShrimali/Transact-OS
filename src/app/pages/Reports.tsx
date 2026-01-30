import { useState } from "react";
import {
  Download,
  Calendar,
  DollarSign,
  Package,
  TrendingUp,
  Filter,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  Activity,
  ChevronRight,
  History,
  Target,
  Zap,
  Globe2,
  RefreshCcw,
  Search,
  CheckCircle2
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import { cn } from "@/app/components/ui/utils";
import { motion } from "framer-motion";



type ReportType = "sales" | "inventory" | "daily";

export function Reports() {
  const [activeTab, setActiveTab] = useState<ReportType>("sales");

  const tabs: { id: ReportType; label: string; icon: any; color: string }[] = [
    { id: "sales", label: "Fiscal Analytics", icon: DollarSign, color: "text-blue-600" },
    { id: "inventory", label: "Stock Intelligence", icon: Package, color: "text-amber-600" },
    { id: "daily", label: "Operational Feed", icon: Calendar, color: "text-emerald-600" },
  ];

  return (
    <div className="max-w-[1600px] mx-auto space-y-10 pb-20 px-4 animate-in fade-in duration-500">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div className="space-y-1">
          <Badge variant="outline" className="text-[10px] font-bold tracking-[0.2em] px-2 py-0 border-blue-200 text-blue-700 uppercase">Intelligence Suite</Badge>
          <h1 className="text-4xl font-medium tracking-tighter text-gray-900">Strategic Insights</h1>
          <p className="text-muted-foreground font-medium">Decipher organizational performance through high-fidelity data extraction.</p>
        </div>
        <div className="flex items-center gap-3">
            <div className="flex items-center bg-muted/50 rounded-xl px-1 py-1 border border-muted shadow-inner">
               {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all relative",
                      activeTab === tab.id
                        ? "text-primary shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {activeTab === tab.id && (
                       <motion.div 
                         layoutId="activeTabBg"
                         className="absolute inset-0 bg-background rounded-lg shadow-sm border border-muted"
                         transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                       />
                    )}
                    <tab.icon className={cn("h-3.5 w-3.5 relative z-10", activeTab === tab.id ? tab.color : "opacity-50")} />
                    <span className="relative z-10">{tab.label}</span>
                  </button>
               ))}
            </div>
            <Button className="h-11 px-6 gap-2 shadow-xl shadow-primary/20 font-bold uppercase text-[10px] tracking-widest">
              <Download className="w-3.5 h-3.5" /> Extract Archive
            </Button>
        </div>
      </div>

      {/* Dynamic Content Surface */}
      <div className="min-h-[600px]">
          {activeTab === "sales" && <SalesReport />}
          {activeTab === "inventory" && <InventoryReport />}
          {activeTab === "daily" && <DailyReport />}
      </div>
    </div>
  );
}

function SalesReport() {
  const metrics = [
    { label: "Gross Revenue", value: "$412,842.00", change: "+14.2%", trend: "up", icon: DollarSign, color: "text-blue-600", bg: "bg-blue-100/50" },
    { label: "Active Orders", value: "2,942", change: "+5.1%", trend: "up", icon: Activity, color: "text-emerald-600", bg: "bg-emerald-100/50" },
    { label: "Avg Yield/Unit", value: "$140.22", change: "-2.4%", trend: "down", icon: Target, color: "text-rose-600", bg: "bg-rose-100/50" },
    { label: "Network Growth", value: "8.4%", change: "+0.8%", trend: "up", icon: Globe2, color: "text-purple-600", bg: "bg-purple-100/50" },
  ];

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <Card key={i} className="border-none shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
            <CardContent className="p-6">
               <div className="flex justify-between items-start mb-4">
                  <div className={cn("p-3 rounded-2xl transition-transform group-hover:scale-110 duration-500", m.bg, m.color)}>
                     <m.icon className="h-5 w-5" />
                  </div>
                  <div className={cn(
                    "flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold",
                    m.trend === 'up' ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                  )}>
                    {m.trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {m.change}
                  </div>
               </div>
               <div>
                 <h3 className="text-3xl font-bold tracking-tight">{m.value}</h3>
                 <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">{m.label}</p>
                 <div className="mt-4 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: m.trend === 'up' ? '70%' : '40%' }}
                      className={cn("h-full rounded-full", m.trend === 'up' ? "bg-emerald-500" : "bg-rose-500")}
                    />
                 </div>
               </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         <Card className="lg:col-span-8 border-none shadow-2xl overflow-hidden bg-background">
            <CardHeader className="px-8 pt-8 flex-row items-center justify-between">
               <div>
                  <CardTitle className="text-2xl font-bold tracking-tight">Performance Velocity</CardTitle>
                  <CardDescription className="text-sm font-medium">Visualizing revenue flux over the current fiscal node.</CardDescription>
               </div>
               <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-9 px-4 rounded-xl font-bold border-none bg-muted/50">W</Button>
                  <Button variant="outline" size="sm" className="h-9 px-4 rounded-xl font-bold border-none bg-primary text-white shadow-lg shadow-primary/30">M</Button>
                  <Button variant="outline" size="sm" className="h-9 px-4 rounded-xl font-bold border-none bg-muted/50">Y</Button>
               </div>
            </CardHeader>
            <CardContent className="px-8 pb-10">
               <div className="h-[350px] w-full bg-muted/30 rounded-3xl border border-dashed border-muted flex items-center justify-center group">
                  <div className="text-center group-hover:scale-105 transition-transform">
                     <BarChart3 className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                     <p className="text-sm font-bold text-muted-foreground uppercase tracking-[0.2em] opacity-50">Rendering Data Matrix...</p>
                  </div>
               </div>
            </CardContent>
         </Card>

         <Card className="lg:col-span-4 border-none shadow-sm flex flex-col justify-between overflow-hidden">
            <CardHeader className="px-8 pt-8">
               <CardTitle className="text-xl font-bold tracking-tighter">High Yield Catalog</CardTitle>
               <CardDescription className="text-xs font-bold uppercase tracking-widest opacity-50">Top performing logical nodes.</CardDescription>
            </CardHeader>
            <CardContent className="px-8">
               <div className="space-y-6">
                  {[1, 2, 3, 4].map(n => (
                     <div key={n} className="flex items-center justify-between group cursor-pointer">
                        <div className="flex items-center gap-4">
                           <div className="h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center font-bold group-hover:bg-primary transition-colors group-hover:text-white">
                              {n}
                           </div>
                           <div className="flex flex-col">
                              <span className="text-sm font-bold truncate max-w-[120px]">Item Node 0x{n}A</span>
                              <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Industrial</span>
                           </div>
                        </div>
                        <div className="text-right">
                           <p className="text-sm font-bold">$12,940</p>
                           <p className="text-[10px] font-bold text-emerald-600">+12%</p>
                        </div>
                     </div>
                  ))}
               </div>
            </CardContent>
            <CardFooter className="px-8 pb-8 pt-6">
               <Button variant="ghost" className="w-full rounded-2xl font-bold uppercase text-[10px] tracking-widest bg-muted/20 hover:bg-primary hover:text-white transition-all">
                  Deep Dive Catalog
               </Button>
            </CardFooter>
         </Card>
      </div>
    </div>
  );
}

function InventoryReport() {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-none shadow-sm bg-background overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-5">
             <PieChart className="w-32 h-32" />
          </div>
          <CardHeader className="p-8">
            <CardTitle className="text-2xl font-bold tracking-tighter">Inventory Architecture</CardTitle>
            <CardDescription className="font-bold uppercase tracking-widest text-[10px] text-muted-foreground">Asset distribution by logical category.</CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-10">
             <div className="h-[280px] bg-muted/20 rounded-3xl border border-dashed border-muted flex items-center justify-center mb-8">
                <PieChart className="h-10 w-10 text-muted-foreground/20" />
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-muted/30 border border-muted/50">
                   <p className="text-[10px] font-bold uppercase opacity-50 mb-1">Total Assets</p>
                   <p className="text-xl font-bold">12,842 units</p>
                </div>
                <div className="p-4 rounded-2xl bg-muted/30 border border-muted/50">
                   <p className="text-[10px] font-bold uppercase opacity-50 mb-1">Valuation</p>
                   <p className="text-xl font-bold">$1.2M USD</p>
                </div>
             </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-rose-50/30 border-l-4 border-l-rose-500 overflow-hidden">
          <CardHeader className="p-8">
            <div className="flex items-center gap-3 mb-1">
               <Zap className="h-5 w-5 text-rose-600" />
               <CardTitle className="text-2xl font-bold tracking-tight text-rose-900">Velocity Warnings</CardTitle>
            </div>
            <CardDescription className="font-bold text-rose-700/60 text-xs">Items manifesting critical depletion trajectories.</CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-10">
             <div className="space-y-4">
               {[1, 2, 3].map(n => (
                 <div key={n} className="p-5 rounded-2xl bg-white shadow-sm flex items-center justify-between group hover:scale-[1.02] transition-transform">
                    <div className="flex items-center gap-4">
                       <div className="h-10 w-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600">
                          <Package className="h-5 w-5" />
                       </div>
                       <div>
                          <p className="text-sm font-bold">Stock Vector 0x{n}B</p>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase">Target WH-01</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-6">
                       <div className="text-right">
                          <p className="text-xs font-bold uppercase tracking-tighter">32 Units Left</p>
                          <p className="text-[10px] font-bold text-rose-500">Critical (2 days)</p>
                       </div>
                       <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full border border-rose-100 text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity">
                          <RefreshCcw className="h-3 w-3" />
                       </Button>
                    </div>
                 </div>
               ))}
             </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-2xl overflow-hidden bg-background">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="px-8 py-5 text-left font-bold text-[10px] uppercase tracking-widest text-muted-foreground">Entity Identifier</th>
                <th className="px-4 py-5 text-left font-bold text-[10px] uppercase tracking-widest text-muted-foreground">Logical Category</th>
                <th className="px-4 py-5 text-left font-bold text-[10px] uppercase tracking-widest text-muted-foreground">Quantity Index</th>
                <th className="px-4 py-5 text-left font-bold text-[10px] uppercase tracking-widest text-muted-foreground">Daily burn rate</th>
                <th className="px-4 py-5 text-left font-bold text-[10px] uppercase tracking-widest text-muted-foreground">Status vector</th>
                <th className="px-8 py-5 text-right font-bold text-[10px] uppercase tracking-widest text-muted-foreground">Prognosis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-muted/10">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="group hover:bg-muted/5 transition-colors border-l-4 border-l-transparent hover:border-l-primary/40">
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold tracking-tighter">Copper Wire 10m - V{i}</span>
                      <span className="text-[10px] font-mono font-bold text-muted-foreground tracking-widest uppercase">ID: 0x{i}F92</span>
                    </div>
                  </td>
                  <td className="px-4 py-5">
                    <Badge variant="outline" className="text-[9px] font-bold uppercase border-muted-foreground/20 text-muted-foreground">Logistics-Hub</Badge>
                  </td>
                  <td className="px-4 py-5 font-bold text-sm">1,242 units</td>
                  <td className="px-4 py-5 font-mono text-[11px] font-bold text-muted-foreground">-14.2 / day</td>
                  <td className="px-4 py-5">
                    <div className="flex items-center gap-2">
                       <div className="h-1.5 w-16 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 w-[80%]" />
                       </div>
                       <span className="text-[10px] font-bold text-emerald-600">STABLE</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <span className="text-xs font-bold tracking-tighter">84 Days Remaining</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function DailyReport() {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="border-none shadow-sm bg-emerald-50/40 border-l-4 border-l-emerald-500">
          <CardContent className="p-8">
            <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-900/40 mb-2 flex items-center gap-2">
               <DollarSign className="h-3 w-3" /> Diurnal Revenue
            </p>
            <div className="flex items-end justify-between">
               <h3 className="text-4xl font-bold tracking-tight text-emerald-900">$1,240.50</h3>
               <span className="text-[10px] font-bold text-emerald-600 bg-white px-2 py-1 rounded-lg shadow-sm border border-emerald-100">+4.2%</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-blue-50/40 border-l-4 border-l-blue-500">
          <CardContent className="p-8">
            <p className="text-[11px] font-bold uppercase tracking-widest text-blue-900/40 mb-2 flex items-center gap-2">
               <Package className="h-3 w-3" /> Reception Count
            </p>
            <div className="flex items-end justify-between">
               <h3 className="text-4xl font-bold tracking-tight text-blue-900">1,500 <span className="text-sm">u</span></h3>
               <span className="text-[10px] font-bold text-blue-600 bg-white px-2 py-1 rounded-lg shadow-sm border border-blue-100">ON TRACK</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-amber-50/40 border-l-4 border-l-amber-500">
          <CardContent className="p-8">
            <p className="text-[11px] font-bold uppercase tracking-widest text-amber-900/40 mb-2 flex items-center gap-2">
               <Zap className="h-3 w-3" /> Active Anomalies
            </p>
            <div className="flex items-end justify-between">
               <h3 className="text-4xl font-bold tracking-tight text-amber-900">04</h3>
               <span className="text-[10px] font-bold text-amber-600 bg-white px-2 py-1 rounded-lg shadow-sm border border-amber-100">UNRESOLVED</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-2xl bg-background overflow-hidden">
        <CardHeader className="p-8 flex-row items-center justify-between border-b bg-muted/20">
          <div>
            <CardTitle className="text-2xl font-bold tracking-tighter">Diurnal Event Feed</CardTitle>
            <CardDescription className="text-xs font-bold uppercase tracking-widest opacity-50">Surveillance of real-time physical and logical operations.</CardDescription>
          </div>
          <div className="flex gap-2">
             <div className="relative">
                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground opacity-50" />
                <Input placeholder="Search feed..." className="h-9 w-48 pl-9 border-none bg-background shadow-sm text-xs font-bold" />
             </div>
             <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl border-none bg-background shadow-sm hover:bg-muted transition-colors">
                <Filter className="h-4 w-4" />
             </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-muted/10">
            {[1, 2, 3, 4, 5, 6].map(n => (
              <div key={n} className="p-6 flex items-start gap-6 group hover:bg-muted/5 transition-colors border-l-4 border-l-transparent hover:border-l-primary/40 cursor-default">
                  <div className="flex flex-col items-center gap-1 mt-1">
                     <span className="text-xs font-bold tracking-tighter">16:{45-n}</span>
                     <History className="h-3 w-3 text-muted-foreground opacity-30" />
                  </div>
                  <div className="h-10 w-10 rounded-2xl bg-muted/50 flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300">
                     {n % 3 === 0 ? <Zap className="h-5 w-5" /> : (n % 2 === 0 ? <RefreshCcw className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />)}
                  </div>
                  <div className="flex-1">
                     <div className="flex items-center gap-3 mb-1">
                        <span className="text-sm font-bold tracking-tight">{n % 3 === 0 ? 'Anomaly Detected' : (n % 2 === 0 ? 'Stock Realignment' : 'Asset Reception')}</span>
                        <Badge className="h-4 px-1.5 text-[8px] font-bold uppercase bg-primary/5 text-primary border-none">CORE_LOG</Badge>
                     </div>
                     <p className="text-xs text-muted-foreground font-medium">Node identifier 0x{n}B{n} manifested a variance of -2.4 units during physical reconciliation.</p>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="h-7 w-7 rounded-full bg-muted border flex items-center justify-center text-[8px] font-bold uppercase text-muted-foreground">JD</div>
                     <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                  </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-8 bg-muted/10 border-t flex justify-center">
            <Button variant="ghost" className="rounded-2xl font-bold uppercase text-[10px] tracking-widest text-muted-foreground hover:text-primary transition-all">
               Load Historical Fragments
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}