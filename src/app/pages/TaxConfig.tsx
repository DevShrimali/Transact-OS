import React, { useState } from "react";
import {
  Plus,
  Trash2,
  Edit2,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  X,
  Receipt,
  Scale,
  Building2,
  Globe2,
  ShieldCheck,
  Percent,
  Calculator,
  Info,
  Layers,
  Settings2,
  MoreVertical,
  ChevronUp
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
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/app/components/ui/utils";

interface ChildTax {
  id: string;
  code: string;
  name: string;
  rate: number;
}

interface TaxRule {
  id: number;
  code: string;
  name: string;
  rate: number;
  type: string;
  status: string;
  isParent?: boolean;
  children?: ChildTax[];
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
  hidden: { y: 15, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export function TaxConfig() {
  const [expandedTaxes, setExpandedTaxes] = useState<number[]>([1]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isParentTax, setIsParentTax] = useState(false);
  const [childTaxes, setChildTaxes] = useState<ChildTax[]>([]);

  const taxRules: TaxRule[] = [
    { 
      id: 1, 
      code: "GST_18", 
      name: "GST 18%", 
      rate: 18.0, 
      type: "Composite Tax", 
      status: "Active",
      isParent: true,
      children: [
        { id: "1-1", code: "CGST_9", name: "Central GST", rate: 9.0 },
        { id: "1-2", code: "SGST_9", name: "State GST", rate: 9.0 }
      ]
    },
    { 
      id: 2, 
      code: "GST_12", 
      name: "GST 12%", 
      rate: 12.0, 
      type: "Composite Tax", 
      status: "Active",
      isParent: true,
      children: [
        { id: "2-1", code: "CGST_6", name: "Central GST", rate: 6.0 },
        { id: "2-2", code: "SGST_6", name: "State GST", rate: 6.0 }
      ]
    },
    { 
      id: 3, 
      code: "VAT_5", 
      name: "VAT 5%", 
      rate: 5.0, 
      type: "Simple Tax", 
      status: "Active",
      isParent: false
    },
    { 
      id: 4, 
      code: "IGST_18", 
      name: "IGST 18%", 
      rate: 18.0, 
      type: "Simple Tax", 
      status: "Active",
      isParent: false
    },
  ];

  const toggleExpand = (id: number) => {
    setExpandedTaxes(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const addChildTax = () => {
    const newChild: ChildTax = {
      id: `temp-${Date.now()}`,
      code: "",
      name: "",
      rate: 0
    };
    setChildTaxes([...childTaxes, newChild]);
  };

  const removeChildTax = (id: string) => {
    setChildTaxes(childTaxes.filter(c => c.id !== id));
  };

  const calculateTotalRate = () => {
    return childTaxes.reduce((sum, child) => sum + (child.rate || 0), 0);
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-7xl mx-auto space-y-10 pb-20"
    >
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div className="space-y-1">
          <Badge variant="outline" className="text-[10px] font-bold tracking-[0.2em] px-2 py-0 border-blue-200 text-blue-700 uppercase">Financial Strategy</Badge>
          <h1 className="text-4xl font-medium tracking-tighter text-gray-900">Tax Protocol Mapping</h1>
          <p className="text-muted-foreground font-medium">Configure nested fiscal policies and statutory compliance layers.</p>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2 border-muted h-12 px-6">
               <Settings2 className="h-4 w-4" /> Global Settings
            </Button>
            <Button className="h-12 px-6 gap-2 shadow-xl shadow-primary/25" onClick={() => setIsSheetOpen(true)}>
              <Plus className="w-4 h-4" /> New Tax Vector
            </Button>
        </div>
      </div>

      {/* Quick Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-2">
        {[
          { label: "Aggregate Rate", value: "10.25%", sub: "Region wide", icon: Calculator, color: "text-blue-600", bg: "bg-blue-50 border-blue-100" },
          { label: "Tax Authority", value: "Revenue Dept.", sub: "Verified Entity", icon: Building2, color: "text-amber-600", bg: "bg-amber-50 border-amber-100" },
          { label: "Compliance Status", value: "Verified", sub: "Exp. 2026", icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100" },
        ].map((stat, i) => (
          <motion.div key={i} variants={item}>
            <Card className={cn("border-none shadow-sm transition-all hover:shadow-md", stat.bg)}>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                   <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-70">{stat.label}</p>
                   <h3 className="text-2xl font-black mt-1 tracking-tight">{stat.value}</h3>
                   <span className="text-[11px] font-medium text-muted-foreground">{stat.sub}</span>
                </div>
                <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center shadow-inner bg-background", stat.color)}>
                   <stat.icon className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Ledger */}
      <motion.div variants={item} className="px-2">
        <Card className="border-none shadow-2xl overflow-hidden bg-background/50 backdrop-blur-xl">
          <CardHeader className="border-b bg-muted/20 pb-6 px-8 flex-row items-center justify-between space-y-0">
             <div>
                <CardTitle className="text-xl font-bold">Active Tax Topology</CardTitle>
                <CardDescription>Visual map of primary and composite tax vectors.</CardDescription>
             </div>
             <div className="flex gap-2">
                <Input placeholder="Find rule code..." className="h-9 w-[200px] border-none bg-background shadow-sm" />
             </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/10">
                    <th className="px-8 py-4 text-left font-black text-[10px] uppercase tracking-widest text-muted-foreground w-12 text-center">Map</th>
                    <th className="px-4 py-4 text-left font-black text-[10px] uppercase tracking-widest text-muted-foreground">ID Code</th>
                    <th className="px-4 py-4 text-left font-black text-[10px] uppercase tracking-widest text-muted-foreground">Functional Name</th>
                    <th className="px-4 py-4 text-left font-black text-[10px] uppercase tracking-widest text-muted-foreground">Structural Type</th>
                    <th className="px-4 py-4 text-right font-black text-[10px] uppercase tracking-widest text-muted-foreground">Net Rate</th>
                    <th className="px-4 py-4 text-left font-black text-[10px] uppercase tracking-widest text-muted-foreground">State</th>
                    <th className="px-8 py-4 text-right font-black text-[10px] uppercase tracking-widest text-muted-foreground">Ops</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-muted/10">
                  {taxRules.map((rule) => (
                    <React.Fragment key={rule.id}>
                      <tr className={cn(
                        "group transition-all duration-200 hover:bg-muted/5 font-medium",
                        expandedTaxes.includes(rule.id) && "bg-muted/5"
                      )}>
                        <td className="px-8 py-4 text-center">
                          {rule.isParent && (
                            <button 
                              onClick={() => toggleExpand(rule.id)}
                              className={cn(
                                "h-6 w-6 rounded-md flex items-center justify-center border border-muted transition-all hover:border-primary/50",
                                expandedTaxes.includes(rule.id) ? "bg-primary text-primary-foreground border-primary" : "bg-background text-muted-foreground"
                              )}
                            >
                              {expandedTaxes.includes(rule.id) ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                            </button>
                          )}
                        </td>
                        <td className="px-4 py-4">
                           <span className="font-mono text-xs font-bold text-primary tracking-tight bg-primary/5 px-2 py-1 rounded-md">{rule.code}</span>
                        </td>
                        <td className="px-4 py-4 text-sm font-bold tracking-tight">{rule.name}</td>
                        <td className="px-4 py-4">
                           <Badge variant="outline" className={cn(
                             "text-[10px] font-black uppercase tracking-widest h-6 px-3 border-muted-foreground/20",
                             rule.type.includes("Composite") ? "bg-purple-50 text-purple-700 border-purple-200" : "bg-blue-50 text-blue-700 border-blue-200"
                           )}>
                              {rule.type}
                           </Badge>
                        </td>
                        <td className="px-4 py-4 text-right">
                           <span className="text-lg font-black tracking-tighter">{rule.rate.toFixed(2)}<span className="text-xs ml-0.5 opacity-50">%</span></span>
                        </td>
                        <td className="px-4 py-4">
                           <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                              <span className="text-[10px] font-black uppercase tracking-[0.1em] text-emerald-600">{rule.status}</span>
                           </div>
                        </td>
                        <td className="px-8 py-4">
                           <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary">
                                <Edit2 className="h-3.5 w-3.5" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                   <DropdownMenuLabel>Rule Control</DropdownMenuLabel>
                                   <DropdownMenuItem>
                                      <Info className="mr-2 h-4 w-4" /> Audit Dependencies
                                   </DropdownMenuItem>
                                   <DropdownMenuItem>
                                      <Globe2 className="mr-2 h-4 w-4" /> Regional Override
                                   </DropdownMenuItem>
                                   <DropdownMenuSeparator />
                                   <DropdownMenuItem className="text-destructive font-bold">
                                      <Trash2 className="mr-2 h-4 w-4" /> Terminate Vector
                                   </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                           </div>
                        </td>
                      </tr>
                      {/* Expanded Section */}
                      <AnimatePresence initial={false}>
                        {rule.isParent && expandedTaxes.includes(rule.id) && (
                          <motion.tr
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            <td colSpan={7} className="p-0 bg-muted/5 shadow-inner">
                               <div className="flex flex-col border-l-2 border-primary ml-11 my-2 divide-y divide-muted/10">
                                  {rule.children?.map((child) => (
                                    <div key={child.id} className="flex items-center px-6 py-3 transition-colors hover:bg-muted/10">
                                       <div className="flex items-center gap-4 flex-1">
                                          <div className="w-6 h-6 rounded-full border border-primary/30 flex items-center justify-center bg-background">
                                             <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                          </div>
                                          <div className="flex flex-col">
                                             <span className="text-xs font-black text-primary opacity-70 font-mono">{child.code}</span>
                                             <span className="text-sm font-semibold">{child.name}</span>
                                          </div>
                                       </div>
                                       <Badge variant="secondary" className="mx-8 text-[10px] font-bold uppercase tracking-widest bg-background border">Nested Component</Badge>
                                       <div className="text-right w-24">
                                          <span className="text-base font-black font-mono">{child.rate.toFixed(2)}%</span>
                                       </div>
                                    </div>
                                  ))}
                               </div>
                            </td>
                          </motion.tr>
                        )}
                      </AnimatePresence>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
          <div className="px-8 py-5 border-t bg-muted/20 flex items-center justify-between">
             <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground">
                <div className="flex items-center gap-1.5">
                   <div className="h-2 w-2 rounded-full bg-purple-500" /> Composite Rules (2)
                </div>
                <div className="flex items-center gap-1.5">
                   <div className="h-2 w-2 rounded-full bg-blue-500" /> Standard Rules (2)
                </div>
             </div>
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">Fiscally secure via UIMS Vault</p>
          </div>
        </Card>
      </motion.div>
      
      {/* Compliance Advisory */}
      <motion.div variants={item} className="px-2">
        <div className="relative group p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/50 shadow-sm flex items-start gap-5 overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-5 -rotate-12 transition-transform group-hover:scale-110">
              <ShieldCheck className="w-32 h-32 text-amber-900" />
           </div>
           <div className="h-10 w-10 flex items-center justify-center bg-amber-500 rounded-xl shadow-lg shadow-amber-500/30 text-white shrink-0">
             <AlertCircle className="w-6 h-6" />
           </div>
           <div className="space-y-1 relative z-10">
              <h4 className="text-sm font-black uppercase tracking-widest text-amber-900">Compliance Advisory Protocol</h4>
              <p className="text-sm leading-relaxed text-amber-900/80 font-medium max-w-2xl">
                Statutory tax configurations are subject to legislative volatility. UIMS recommends a quarterly audit of all tax vectors by a certified auditor to maintain operational continuity.
              </p>
           </div>
        </div>
      </motion.div>

      {/* Configuration Hub (Sheet) */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-2xl overflow-y-auto px-0 border-none bg-background shadow-2xl">
          <div className="px-10 pb-32 pt-10">
            <SheetHeader className="mb-12">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 shadow-inner border border-primary/20">
                <Receipt className="h-7 w-7" />
              </div>
              <SheetTitle className="text-3xl font-black tracking-tight">Vector Definition</SheetTitle>
              <SheetDescription className="text-base font-medium">Design the parameters for a new fiscal tracking rule.</SheetDescription>
            </SheetHeader>

            <div className="space-y-12">
              {/* Architecture Type */}
              <section className="space-y-6">
                 <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Structural Blueprint</Label>
                 <div className="grid grid-cols-2 gap-4">
                    {[
                      { id: false, label: "Simple Vector", sub: "Flat rate logic", icon: Calculator },
                      { id: true, label: "Composite Cluster", sub: "Nested heirarchy", icon: Layers },
                    ].map((mode) => (
                      <button
                        key={String(mode.id)}
                        onClick={() => {
                          setIsParentTax(mode.id);
                          setChildTaxes([]);
                        }}
                        className={cn(
                          "relative p-5 rounded-2xl text-left border-2 transition-all group overflow-hidden",
                          isParentTax === mode.id ? "border-primary bg-primary/5 shadow-md shadow-primary/5" : "border-muted bg-background hover:border-muted-foreground/30 shadow-none"
                        )}
                      >
                         <div className={cn(
                           "h-9 w-9 rounded-xl flex items-center justify-center mb-4 transition-colors",
                           isParentTax === mode.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:text-foreground"
                         )}>
                            <mode.icon className="h-5 w-5" />
                         </div>
                         <div className="font-bold text-base tracking-tight">{mode.label}</div>
                         <div className="text-xs opacity-60 font-medium">{mode.sub}</div>
                         {isParentTax === mode.id && (
                            <div className="absolute top-3 right-3 h-2 w-2 rounded-full bg-primary" />
                         )}
                      </button>
                    ))}
                 </div>
              </section>

              {/* Identification */}
              <section className="space-y-6">
                <div className="flex items-center gap-2 mb-2">
                   <div className="w-1.5 h-6 bg-primary rounded-full" />
                   <h3 className="font-black text-xl tracking-tight">Technical Identification</h3>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2.5">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/70 ml-1">System Registry Code</Label>
                    <Input className="h-12 border-none bg-muted/50 focus-visible:ring-primary/20 font-bold" placeholder="e.g., TAX_MOD_V1" />
                  </div>
                  <div className="space-y-2.5">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Canonical Designation</Label>
                    <Input className="h-12 border-none bg-muted/50 focus-visible:ring-primary/20 font-bold" placeholder="e.g., Value Added Tax 5%" />
                  </div>
                </div>

                {!isParentTax && (
                  <div className="space-y-2.5">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Terminal Percentage Rate (%)</Label>
                    <div className="relative">
                       <Percent className="absolute left-4 top-4 h-4 w-4 text-muted-foreground/50" />
                       <Input type="number" step="0.01" className="h-12 pl-11 border-none bg-muted/50 focus-visible:ring-primary/20 font-black text-xl" placeholder="0.00" />
                    </div>
                  </div>
                )}

                <div className="space-y-2.5">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Fiscal Classification</Label>
                  <Select>
                    <SelectTrigger className="h-12 border-none bg-muted/50 font-bold focus:ring-primary/20">
                       <SelectValue placeholder="Determine jurisdiction type..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="state" className="font-bold">State Regulatory Tax</SelectItem>
                      <SelectItem value="federal" className="font-bold">Federal Statutory Tax</SelectItem>
                      <SelectItem value="city" className="font-bold">City/Municipal Levy</SelectItem>
                      <SelectItem value="gst" className="font-bold">Goods & Services (Unified)</SelectItem>
                      <SelectItem value="vat" className="font-bold">Value Added (Point of Sale)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </section>

              {/* Nested Architecture */}
              {isParentTax && (
                <section className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                       <h3 className="font-black text-xl tracking-tight">Component Sub-Vectors</h3>
                       <p className="text-xs text-muted-foreground font-medium">Define the atomic taxes that integrate into this cluster.</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-9 px-4 rounded-full bg-primary/10 text-primary hover:bg-primary/20 font-black text-[11px] uppercase tracking-widest" onClick={addChildTax}>
                      <Plus className="w-3.5 h-3.5 mr-1.5" /> Append Vector
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {childTaxes.map((child, index) => (
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        key={child.id} 
                        className="group flex gap-3 p-5 bg-muted/40 rounded-3xl border-2 border-transparent hover:border-primary/20 hover:bg-background transition-all"
                      >
                        <div className="flex-1 grid grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <Label className="text-[10px] font-black uppercase opacity-50 ml-1">Sub-Code</Label>
                            <Input className="h-10 text-xs font-bold bg-background/50 border-muted" placeholder="ID Code" />
                          </div>
                          <div className="space-y-1.5">
                             <Label className="text-[10px] font-black uppercase opacity-50 ml-1">Designation</Label>
                             <Input className="h-10 text-xs font-bold bg-background/50 border-muted" placeholder="Display Name" />
                          </div>
                          <div className="col-span-2 space-y-1.5">
                             <Label className="text-[10px] font-black uppercase opacity-50 ml-1">Contribution (%)</Label>
                             <div className="relative">
                               <Percent className="absolute left-3 top-3 h-3 h-3 text-muted-foreground/30" />
                               <Input type="number" step="0.01" className="h-10 pl-9 text-lg font-black bg-background/50 border-muted" placeholder="0.00" />
                             </div>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="mt-6 h-10 w-10 text-muted-foreground hover:text-rose-600 hover:bg-rose-50 rounded-2xl"
                          onClick={() => removeChildTax(child.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </motion.div>
                    ))}
                    
                    {childTaxes.length > 0 ? (
                      <div className="p-6 bg-primary/5 rounded-3xl border border-primary/20 flex justify-between items-center shadow-inner">
                        <div className="flex items-center gap-3">
                           <Calculator className="h-5 w-5 text-primary" />
                           <span className="text-sm font-black uppercase tracking-widest text-primary opacity-70">Unified Cluster Rate</span>
                        </div>
                        <span className="text-3xl font-black tracking-tighter text-primary">{calculateTotalRate().toFixed(2)}<span className="text-sm ml-1 opacity-50">%</span></span>
                      </div>
                    ) : (
                      <div className="py-12 flex flex-col items-center gap-3 rounded-3xl border border-dashed border-muted text-center">
                         <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                            <Layers className="h-5 w-5 text-muted-foreground/50" />
                         </div>
                         <p className="text-sm font-medium text-muted-foreground">Vector cluster is currently empty.</p>
                      </div>
                    )}
                  </div>
                </section>
              )}

              <div className="pt-10 flex gap-4">
                <Button variant="outline" className="flex-1 h-12 text-muted-foreground font-bold" onClick={() => setIsSheetOpen(false)}>Abort Procedure</Button>
                <Button className="flex-1 h-12 shadow-xl shadow-primary/20 font-black tracking-wide" onClick={() => setIsSheetOpen(false)}>Deploy Vector System</Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </motion.div>
  );
}