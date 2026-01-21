
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { 
  DollarSign, 
  Package, 
  ShoppingCart, 
  AlertTriangle, 
  Download,
  Search,
  FileText,
  Printer,
  BarChart3,
  ExternalLink,
  Terminal,
  Code,
  TrendingUp
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/app/components/ui/utils';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Cell } from 'recharts';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export function Dashboard({ onNavigate }: { onNavigate: (page: string) => void }) {
  // Mock Data
  const stats = [
    { 
      id: 1, 
      title: 'Global Asset Value', 
      value: '$45,231.89', 
      change: '+20.1%', 
      trend: 'up', 
      icon: DollarSign,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50/50',
      border: 'border-emerald-100'
    },
    { 
      id: 2, 
      title: 'Critical Stock Alerts', 
      value: '12', 
      change: '-4.5%', 
      trend: 'down', 
      icon: AlertTriangle,
      color: 'text-amber-600',
      bg: 'bg-amber-50/50',
      border: 'border-amber-100' 
    },
    { 
      id: 3, 
      title: 'Pending Fulfillment', 
      value: '24', 
      change: '+12.2%', 
      trend: 'up', 
      icon: ShoppingCart,
      color: 'text-blue-600',
      bg: 'bg-blue-50/50',
      border: 'border-blue-100' 
    },
    { 
      id: 4, 
      title: 'Total SKU Count', 
      value: '1,432', 
      change: '+3.4%', 
      trend: 'up', 
      icon: Package,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50/50',
      border: 'border-indigo-100' 
    }
  ];

  const alerts = [
    { id: 1, message: 'Stock Threshold Breach: ITEM-1001', sub: 'Copper Wire Grade A', time: '09:42 AM', type: 'warning' },
    { id: 2, message: 'Inbound Shipment Received', sub: 'PO-2024-001 / Vendor: Apex Logistics', time: '08:15 AM', type: 'info' },
    { id: 3, message: 'Inventory Variance Detected', sub: 'Zone A-2 / Bin 42', time: 'Yesterday', type: 'error' },
    { id: 4, message: 'Monthly Fiscal Report Generated', sub: 'Auto-routine executed', time: 'Yesterday', type: 'success' },
  ];

  const quickActions = [
    { label: 'Label Studio', sub: 'Generate & Print', icon: Printer, action: 'label-creation', color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'POS Terminal', sub: 'New Transaction', icon: DollarSign, action: 'pos', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Stock Lookup', sub: 'Check Availability', icon: Search, action: 'view-stock', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Invoice Gen', sub: 'Create Document', icon: FileText, action: 'invoice', color: 'text-amber-600', bg: 'bg-amber-50' }
  ];

  // CSS-based Mock Chart Data
  const chartData = [45, 62, 55, 78, 50, 68, 85, 72, 60, 92, 85, 78, 65, 88, 95, 82, 70, 85, 90, 100];

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-[1600px] mx-auto space-y-8 pb-20 px-4"
    >
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div className="space-y-1">
          <Badge variant="outline" className="text-[10px] font-bold tracking-[0.2em] px-2 py-0 border-blue-200 text-blue-700 uppercase">Executive Overview</Badge>
          <h1 className="text-4xl font-medium tracking-tighter text-gray-900">Command Center</h1>
          <p className="text-muted-foreground font-medium">Real-time operational dashboard and system status.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex flex-col items-end mr-4">
             <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">System Status</span>
             <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-bold text-gray-900">Operational</span>
             </div>
          </div>
          <Button variant="outline" className="h-12 px-6 border-muted bg-white shadow-sm gap-2 font-bold text-gray-700 hover:bg-gray-50">
            <Download className="h-4 w-4" /> Export Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 px-2">
        {stats.map((stat) => (
          <motion.div key={stat.id} variants={item}>
            <Card className={cn("shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-l-4", stat.border)}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className={cn("p-2.5 rounded-xl", stat.bg)}>
                    <stat.icon className={cn("h-5 w-5", stat.color)} />
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-tight bg-slate-100 px-2 py-1 rounded-full">
                    <TrendingUp className={cn("h-3 w-3", stat.trend === 'up' ? 'text-emerald-600' : 'text-rose-600')} />
                    <span className={stat.trend === 'up' ? 'text-emerald-700' : 'text-rose-700'}>{stat.change}</span>
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-black tracking-tight">{stat.value}</div>
                  <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mt-1">{stat.title}</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-12 px-2">


        {/* Main Chart Section */}
        <motion.div variants={item} className="md:col-span-8">
          <Card className="h-full shadow-sm border border-slate-200 bg-white">
             <CardHeader>
                <div className="flex items-center justify-between">
                   <div>
                      <CardTitle className="text-lg font-bold tracking-tight flex items-center gap-2 text-gray-900">
                         <BarChart3 className="h-5 w-5 text-blue-600" /> Stock Velocity Analysis
                      </CardTitle>
                      <CardDescription>30-Day aggregate movement metrics</CardDescription>
                   </div>
                   <div className="flex gap-2">
                      {['Daily', 'Weekly', 'Monthly'].map((period, i) => (
                         <Button key={period} variant={i === 0 ? 'secondary' : 'ghost'} size="sm" className="h-7 text-xs font-bold text-slate-600">{period}</Button>
                      ))}
                   </div>
                </div>
             </CardHeader>
             <CardContent>
                <div className="h-[300px] w-full mt-4">
                   <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData.map((val, i) => ({ day: `D${i+1}`, volume: val * 12 }))}>
                         <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} stroke="#000" />
                         <XAxis 
                            dataKey="day" 
                            tickLine={false} 
                            axisLine={false} 
                            tick={{ fontSize: 10, fill: '#64748b', opacity: 0.8 }} 
                            interval={3}
                         />
                         <YAxis 
                            tickLine={false} 
                            axisLine={false} 
                            tick={{ fontSize: 10, fill: '#64748b', opacity: 0.8 }}
                            tickFormatter={(value) => `$${value}`}
                         />
                         <RechartsTooltip 
                            contentStyle={{ 
                                backgroundColor: '#fff', 
                                borderColor: '#e2e8f0', 
                                borderRadius: '8px', 
                                color: '#0f172a',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                            }}
                            cursor={{ fill: '#f1f5f9' }}
                         />
                         <Bar dataKey="volume" radius={[4, 4, 0, 0]}>
                            {chartData.map((_, index) => (
                               <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#1e293b" : "#cbd5e1"} />
                            ))}
                         </Bar>
                      </BarChart>
                   </ResponsiveContainer>
                </div>
             </CardContent>
          </Card>
        </motion.div>

        {/* Command Console & Live Event Stream */}
        <motion.div variants={item} className="md:col-span-4 space-y-6">
           {/* Command Console */}
          <Card className="shadow-none border-dashed border-2 border-slate-200 bg-white/50 overflow-hidden relative">
             <CardHeader className="relative z-10 pb-2">
                <CardTitle className="text-lg font-bold tracking-tight flex items-center gap-2 text-foreground">
                   <Terminal className="h-5 w-5 text-blue-600" /> Command Console
                </CardTitle>
                <CardDescription className="text-muted-foreground font-medium">Frequent operational modules</CardDescription>
             </CardHeader>
             <CardContent className="relative z-10">
                <div className="grid grid-cols-2 gap-3">
                   {quickActions.map((action, idx) => (
                      <button 
                         key={idx}
                         onClick={() => onNavigate(action.action)}
                         className="flex flex-col items-start p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-all hover:scale-[1.02] border border-slate-100 text-left group"
                      >
                         <div className={cn("p-2 rounded-lg bg-white mb-2 shadow-sm group-hover:shadow-md transition-all border border-slate-100")}>
                            <action.icon className="h-4 w-4 text-blue-600" />
                         </div>
                         <span className="text-xs font-bold text-foreground leading-tight">{action.label}</span>
                         <span className="text-[9px] text-muted-foreground mt-0.5 font-medium">{action.sub}</span>
                      </button>
                   ))}
                </div>
             </CardContent>
          </Card>

          {/* Live Event Stream */}
          <Card className="shadow-lg border-none bg-background/50 backdrop-blur-sm">
            <CardHeader className="pb-3 sticky top-0 bg-background/50 backdrop-blur-sm z-10">
               <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-black tracking-tight uppercase flex items-center gap-2 text-foreground">
                     <Code className="h-4 w-4 text-primary" /> Live Event Stream
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-full text-muted-foreground hover:bg-accent"><ExternalLink className="h-3 w-3" /></Button>
               </div>
            </CardHeader>
            <CardContent className="space-y-4 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
               {alerts.map((alert) => (
                  <div key={alert.id} className="flex gap-3 group">
                     <div className="flex flex-col items-center">
                        <div className={cn("h-2 w-2 rounded-full mt-1.5 ring-4 ring-background", 
                            alert.type === 'warning' ? 'bg-amber-500' : 
                            alert.type === 'error' ? 'bg-rose-500' : 
                            alert.type === 'success' ? 'bg-emerald-500' : 'bg-blue-500')} 
                        />
                        <div className="w-px h-full bg-slate-700 my-1 group-last:hidden" />
                     </div>
                     <div className="flex-1 pb-2">
                        <div className="flex justify-between items-start">
                           <span className="text-xs font-bold text-foreground">{alert.message}</span>
                           <span className="text-[9px] font-mono text-emerald-400 bg-slate-900 px-1 py-0.5 rounded border border-slate-700">{alert.time}</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-0.5 font-medium">{alert.sub}</p>
                     </div>
                  </div>
               ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}