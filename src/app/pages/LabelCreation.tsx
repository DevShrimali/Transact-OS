import { useState } from "react";
import {
  Printer,
  ScanBarcode,
  History,
  Barcode,
  Tag,
  Hash,
  Layers,
  ShieldCheck,
  TrendingUp,
  AlertCircle,
  Clock,
  Settings2,
  Maximize2
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
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/app/components/ui/utils";

interface PriceHistory {
  id: number;
  date: string;
  oldPrice: number;
  newPrice: number;
  changedBy: string;
  reason: string;
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

export function LabelCreation() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<any>({
    sku: "SKU-1001",
    barcode: "890123456789",
    name: "Industrial Widget Type A",
    currentPrice: 50.00,
    category: "Electronics"
  });
  const [newPrice, setNewPrice] = useState<string>("50.00");
  const [history, setHistory] = useState<PriceHistory[]>([
    { id: 1, date: "2024-01-10 09:30 AM", oldPrice: 45.00, newPrice: 50.00, changedBy: "Admin", reason: "Seasonal Adjustment" },
    { id: 2, date: "2023-12-05 02:15 PM", oldPrice: 42.00, newPrice: 45.00, changedBy: "Manager", reason: "Vendor Price Increase" },
  ]);

  const handleSearch = () => {
    if (searchQuery) {
      setSelectedItem({
        sku: "SKU-1001",
        barcode: "890123456789",
        name: "Industrial Widget Type A",
        currentPrice: 50.00,
        category: "Electronics"
      });
      setNewPrice("50.00");
    }
  };

  const handleUpdatePrice = () => {
    if (!selectedItem || !newPrice) return;
    const oldPrice = selectedItem.currentPrice;
    const priceValue = parseFloat(newPrice);
    if (priceValue !== oldPrice) {
      const newEntry: PriceHistory = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        oldPrice: oldPrice,
        newPrice: priceValue,
        changedBy: "Admin User",
        reason: "Manual Update"
      };
      setHistory([newEntry, ...history]);
      setSelectedItem({ ...selectedItem, currentPrice: priceValue });
    }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-[1400px] mx-auto space-y-10 pb-20 px-4"
    >
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div className="space-y-1">
          <Badge variant="outline" className="text-[10px] font-bold tracking-[0.2em] px-2 py-0 border-blue-200 text-blue-700 uppercase">Print Protocol</Badge>
          <h1 className="text-4xl font-medium tracking-tighter text-gray-900">Tag & Price Hub</h1>
          <p className="text-muted-foreground font-medium">Synchronize physical identifiers with logical price points.</p>
        </div>
        <div className="flex items-center gap-3">
            <Button variant="ghost" className="h-12 px-6 text-muted-foreground font-bold hover:bg-muted">System Diagnostics</Button>
            <Button className="h-12 px-8 gap-2 shadow-xl shadow-primary/25 font-black uppercase text-xs tracking-widest">
              <Printer className="h-4 w-4" /> Initialize Print Stream
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-2">
        {/* Main Work Area */}
        <div className="lg:col-span-8 space-y-8">
           {/* Section 1: Entity Lookup */}
           <motion.div variants={item}>
              <Card className="border-none shadow-sm overflow-hidden bg-background">
                 <CardHeader className="pb-8 pt-8 px-8 flex-row items-start gap-5 space-y-0">
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-inner">
                       <ScanBarcode className="h-7 w-7" />
                    </div>
                    <div className="flex-1">
                       <CardTitle className="text-2xl font-black tracking-tight">Entity Lookup</CardTitle>
                       <CardDescription className="text-base font-medium">Inject item SKU or scan physical barcode to begin realignment.</CardDescription>
                    </div>
                 </CardHeader>
                 <CardContent className="px-8 pb-10">
                    <div className="flex gap-4">
                       <div className="relative flex-1">
                          <Barcode className="absolute left-4 top-4 h-4 w-4 text-muted-foreground/30" />
                          <Input 
                            className="h-12 pl-12 border-none bg-muted/50 focus-visible:ring-primary/20 font-bold" 
                            placeholder="Scan or type identifier (e.g. SKU-1001)" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                          />
                       </div>
                       <Button onClick={handleSearch} className="h-12 px-8 rounded-xl font-black uppercase text-xs tracking-widest">
                          Engage Sensor
                       </Button>
                    </div>
                 </CardContent>
              </Card>
           </motion.div>

           {/* Section 2: Pricing Matrix */}
           <AnimatePresence mode="wait">
             {selectedItem && (
               <motion.div 
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 variants={item}
               >
                  <Card className="border-none shadow-sm overflow-hidden bg-background relative">
                     <div className="absolute top-0 right-0 p-8 opacity-5">
                        <TrendingUp className="w-24 h-24" />
                     </div>
                     <CardHeader className="pb-8 pt-8 px-8 flex-row items-start gap-5 space-y-0 relative z-10">
                        <div className="h-14 w-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 border border-amber-500/20 shadow-inner">
                           <Settings2 className="h-7 w-7" />
                        </div>
                        <div>
                           <CardTitle className="text-2xl font-black tracking-tight">Price Configuration</CardTitle>
                           <CardDescription className="text-base font-medium">Modifying logical price points for {selectedItem.name}</CardDescription>
                        </div>
                     </CardHeader>
                     <CardContent className="px-8 pb-10 space-y-8 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                           {[
                             { label: 'Identifier', value: selectedItem.sku, icon: Hash },
                             { label: 'Category', value: selectedItem.category, icon: Layers },
                             { label: 'Current Point', value: `$${selectedItem.currentPrice.toFixed(2)}`, icon: Tag, highlight: true },
                             { label: 'Integrity', value: 'Verified', icon: ShieldCheck, color: 'text-emerald-600' }
                           ].map((stat, i) => (
                             <div key={i} className="p-4 rounded-2xl bg-muted/30 border border-muted/50">
                                <p className="text-[10px] font-black uppercase text-muted-foreground mb-1 flex items-center gap-2">
                                   <stat.icon className="h-3 w-3" /> {stat.label}
                                </p>
                                <p className={cn("text-sm font-black truncate", stat.highlight && "text-lg text-primary", stat.color)}>{stat.value}</p>
                             </div>
                           ))}
                        </div>

                        <div className="p-8 rounded-3xl bg-muted/20 border border-muted/50 flex flex-col md:flex-row items-center justify-between gap-8">
                           <div className="space-y-1 text-center md:text-left">
                              <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">New Fiscal Target</p>
                              <p className="text-sm font-medium text-foreground">Adjust points and commit to history</p>
                           </div>
                           <div className="flex gap-4 w-full md:w-auto">
                              <div className="relative flex-1 md:w-48">
                                 <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-muted-foreground">$</span>
                                 <Input 
                                   type="number"
                                   className="h-16 pl-12 border-none bg-white shadow-sm focus-visible:ring-primary/20 text-3xl font-black text-center text-foreground"
                                   value={newPrice}
                                   onChange={(e) => setNewPrice(e.target.value)}
                                 />
                              </div>
                              <Button 
                                onClick={handleUpdatePrice} 
                                className="h-16 px-10 bg-black text-white hover:bg-black/90 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-xl shadow-black/10"
                              >
                                Commit & Stream
                              </Button>
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               </motion.div>
             )}
           </AnimatePresence>

           {/* Section 3: Forensic Log */}
           <motion.div variants={item}>
              <Card className="border-none shadow-sm">
                 <CardHeader className="px-8 pt-8 flex-row items-center justify-between">
                    <div className="flex items-center gap-3">
                       <History className="h-5 w-5 text-muted-foreground" />
                       <CardTitle className="text-xl font-black tracking-tighter">Variance Archive</CardTitle>
                    </div>
                    <Badge variant="outline" className="bg-muted text-[10px] font-black uppercase tracking-widest pl-2">System forensic feed</Badge>
                 </CardHeader>
                 <CardContent className="px-8 pb-10 p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-muted/30">
                          <tr>
                            <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-muted-foreground">Timestamp</th>
                            <th className="px-4 py-4 text-left text-[10px] font-black uppercase tracking-widest text-muted-foreground">Original</th>
                            <th className="px-4 py-4 text-left text-[10px] font-black uppercase tracking-widest text-muted-foreground">Revised</th>
                            <th className="px-4 py-4 text-left text-[10px] font-black uppercase tracking-widest text-muted-foreground">Executor</th>
                            <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-widest text-muted-foreground">Deviation</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-muted/10 font-bold">
                          {history.map((record) => (
                            <tr key={record.id} className="group hover:bg-muted/5 transition-colors">
                              <td className="px-6 py-4">
                                 <div className="flex items-center gap-2">
                                    <Clock className="h-3 w-3 text-muted-foreground/50" />
                                    <span className="text-xs">{record.date}</span>
                                 </div>
                              </td>
                              <td className="px-4 py-4 text-xs line-through opacity-30">${record.oldPrice.toFixed(2)}</td>
                              <td className="px-4 py-4 text-sm text-primary font-black">${record.newPrice.toFixed(2)}</td>
                              <td className="px-4 py-4 text-xs font-black text-muted-foreground">{record.changedBy}</td>
                              <td className="px-6 py-4 text-right">
                                 <div className={cn(
                                   "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-tighter",
                                   record.newPrice > record.oldPrice ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                                 )}>
                                    {record.newPrice > record.oldPrice ? '+' : ''}{((record.newPrice - record.oldPrice) / record.oldPrice * 100).toFixed(1)}%
                                 </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                 </CardContent>
              </Card>
           </motion.div>
        </div>

        {/* Sidebar Context */}
        <div className="lg:col-span-4 space-y-8">
           <motion.div variants={item} className="sticky top-10">
              <Card className="border shadow-lg bg-background overflow-hidden relative">
                 <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Maximize2 className="h-32 w-32" />
                 </div>
                 <CardHeader className="pb-4 relative z-10 px-8 pt-8">
                    <CardTitle className="text-xl font-black tracking-tighter">Tag Architect</CardTitle>
                    <CardDescription className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest">Real-time physical mock rendering</CardDescription>
                 </CardHeader>
                 <CardContent className="px-8 pb-10 relative z-10 flex flex-col items-center justify-center min-h-[400px]">
                    <AnimatePresence mode="wait">
                       {selectedItem ? (
                          <motion.div 
                            key={selectedItem.sku + newPrice}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="w-full max-w-[280px] aspect-[4/5] bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-between text-black relative"
                          >
                             <div className="absolute top-4 left-4 h-2 w-2 rounded-full bg-zinc-200" />
                             <div className="text-center w-full space-y-1">
                                <p className="text-xs font-black uppercase tracking-widest text-zinc-400">Industrial Node</p>
                                <h4 className="text-xl font-black tracking-tighter leading-tight truncate px-2">{selectedItem.name}</h4>
                                <Badge variant="outline" className="border-zinc-200 text-zinc-400 text-[9px] font-mono h-4 px-2 tracking-widest">#{selectedItem.sku}</Badge>
                             </div>

                             <div className="w-full flex flex-col items-center gap-4">
                                <div className="p-3 bg-zinc-50 rounded-2xl border border-zinc-100 w-full group relative overflow-hidden">
                                   <div className="h-16 bg-black flex items-center justify-center text-[10px] text-white/40 font-mono tracking-tighter">
                                      ||| | || |||| | | ||| | ||
                                   </div>
                                   <p className="text-[10px] font-black text-center mt-2 tracking-[0.2em]">{selectedItem.barcode}</p>
                                </div>

                                <div className="text-center">
                                   <div className="flex items-start justify-center">
                                      <span className="text-sm font-black pt-2">$</span>
                                      <span className="text-6xl font-black tracking-tighter">
                                         {newPrice ? parseFloat(newPrice).toFixed(0) : selectedItem.currentPrice.toFixed(0)}
                                      </span>
                                      <span className="text-xl font-black pt-2 opacity-30">
                                         .{newPrice ? (parseFloat(newPrice) % 1).toFixed(2).split('.')[1] : (selectedItem.currentPrice % 1).toFixed(2).split('.')[1]}
                                      </span>
                                   </div>
                                </div>
                             </div>

                             <div className="w-full border-t border-dashed border-zinc-200 pt-4 flex items-center justify-between">
                                <div className="flex flex-col">
                                   <span className="text-[9px] font-black uppercase opacity-30">Cleared</span>
                                   <span className="text-[9px] font-black">{selectedItem.category}</span>
                                </div>
                                <ShieldCheck className="h-5 w-5 text-emerald-500" />
                             </div>
                          </motion.div>
                       ) : (
                          <div className="flex flex-col items-center text-center space-y-4 opacity-20">
                             <ScanBarcode className="h-20 w-20" />
                             <p className="text-sm font-black uppercase tracking-widest">Awaiting Physical Node Data</p>
                          </div>
                       )}
                    </AnimatePresence>
                 </CardContent>
                 <CardFooter className="px-8 pb-8 flex flex-col gap-4 relative z-10">
                    <Button variant="outline" className="w-full h-11 border-muted text-muted-foreground bg-muted/20 hover:bg-muted/30 font-bold uppercase text-[10px] tracking-widest">
                       <Settings2 className="mr-2 h-3.5 w-3.5" /> Template Logic
                    </Button>
                    <div className="flex items-center gap-2 p-3 rounded-2xl bg-amber-50 border border-amber-100">
                       <AlertCircle className="h-4 w-4 text-amber-600" />
                       <p className="text-[10px] font-medium text-amber-800/80">Ensure thermal printer is initialized and calibrated for Zebra 4x6 media.</p>
                    </div>
                 </CardFooter>
              </Card>
           </motion.div>
        </div>
      </div>
    </motion.div>
  );
}