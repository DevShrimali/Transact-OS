import React, { useState } from "react";
import {
  Search,
  Plus,
  Trash2,
  Filter,
  Calendar,
  Percent,
  DollarSign,
  MoreVertical,
  Sparkles,
  ChevronDown,
  Edit,
  Users,
  Download,
  ChevronUp,
  ArrowRight
} from "lucide-react";
import {
  Card,
  CardContent,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Label } from "@/app/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/app/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
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

import { mockDiscounts, discountStats, Discount as DiscountModel } from '@/app/data/mockSystemData';

const mockCategories = ["Electronics", "Computers", "Furniture", "Home Decor", "Clothing", "Sports"];
const mockProducts = ["Laptop Model X", "Laptop Model Y", "Desktop PC", "Monitor 24\"", "Wireless Mouse"];
const mockVendors = ["TechCorp Suppliers", "Global Tech Inc.", "Furniture World", "Electronics Hub"];

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

export function Discount() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState<DiscountModel | null>(null);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  // Form states
  const [formData, setFormData] = useState<Partial<DiscountModel>>({
    name: "",
    type: "category",
    discountType: "percentage",
    value: 0,
    appliedTo: [],
    startDate: "",
    endDate: "",
    status: "active",
    minPurchaseAmount: undefined,
    maxDiscountAmount: undefined,
    priority: 1,
  });

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleAddDiscount = () => {
    setSelectedDiscount(null);
    setFormData({
      name: "",
      type: "category",
      discountType: "percentage",
      value: 0,
      appliedTo: [],
      startDate: "",
      endDate: "",
      status: "active",
      minPurchaseAmount: undefined,
      maxDiscountAmount: undefined,
      priority: 1,
    });
    setSelectedItems([]);
    setIsSheetOpen(true);
  };

  const handleEditDiscount = (discount: DiscountModel) => {
    setSelectedDiscount(discount);
    setFormData(discount);
    setSelectedItems(discount.appliedTo);
    setIsSheetOpen(true);
  };

  const handleDeleteDiscount = (discount: DiscountModel) => {
    setSelectedDiscount(discount);
    setShowDeleteModal(true);
  };

  const handleSaveDiscount = () => {
    console.log("Saving discount:", { ...formData, appliedTo: selectedItems });
    setIsSheetOpen(false);
  };

  const handleConfirmDelete = () => {
    console.log("Deleting discount:", selectedDiscount?.id);
    setShowDeleteModal(false);
  };

  const toggleItemSelection = (item: string) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const getAppliedToOptions = () => {
    switch (formData.type) {
      case "category":
        return mockCategories;
      case "product":
        return mockProducts;
      case "vendor":
        return mockVendors;
      case "custom-group":
        return ["Summer Items", "Winter Stock", "Seasonal Stock", "Premium Collection"];
      default:
        return [];
    }
  };

  const toggleRowExpansion = (id: string) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const filteredDiscounts = mockDiscounts.filter((discount) => {
    const matchesSearch =
      discount.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discount.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || discount.type === filterType;
    const matchesStatus = filterStatus === "all" || discount.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = discountStats;

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-[1600px] mx-auto space-y-8 pb-10"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div className="space-y-1">
          <Badge variant="outline" className="text-[10px] font-bold tracking-[0.2em] px-2 py-0 border-blue-200 text-blue-700 uppercase">Pricing Strategy</Badge>
          <h1 className="text-4xl font-medium tracking-tighter text-gray-900">Promotions Engine</h1>
          <p className="text-muted-foreground font-medium">Strategize and manage tiered pricing and promotional rules.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-12 px-6 border-muted bg-background shadow-sm gap-2 font-bold">
            <Download className="h-4 w-4" /> Export Report
          </Button>
          <Button onClick={handleAddDiscount} className="h-12 px-8 gap-2 shadow-xl shadow-primary/25 font-black uppercase text-xs tracking-widest">
            <Plus className="h-4 w-4" /> New Campaign
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => (
          <motion.div key={idx} variants={item}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex items-center gap-4">
                <div className={cn(stat.bg, stat.color, "p-3 rounded-2xl")}>
                   <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-0.5">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Controls Card */}
      <motion.div variants={item}>
        <Card className="bg-muted/30 border-none">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Find campaigns by name or ID..."
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background"
                />
              </div>
              <div className="flex items-center gap-3">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-[180px] bg-background">
                    <SelectValue placeholder="All Asset Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Everywhere</SelectItem>
                    <SelectItem value="category">Categories</SelectItem>
                    <SelectItem value="product">Specific Products</SelectItem>
                    <SelectItem value="vendor">Partner Vendors</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[140px] bg-background">
                    <SelectValue placeholder="Lifespan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Status: All</SelectItem>
                    <SelectItem value="active">Status: Active</SelectItem>
                    <SelectItem value="inactive">Status: Inactive</SelectItem>
                    <SelectItem value="expired">Status: Expired</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon" className="bg-background">
                   <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* List Card */}
      <motion.div variants={item}>
        <Card className="overflow-hidden border-none shadow-sm">
          <table className="w-full">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="text-left py-4 px-6 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Identity
                </th>
                <th className="text-left py-4 px-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Campaign Meta
                </th>
                <th className="text-left py-4 px-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Value Model
                </th>
                <th className="text-left py-4 px-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Temporal Window
                </th>
                <th className="text-left py-4 px-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Status
                </th>
                <th className="text-right py-4 px-6 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Control
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-muted/30">
              <AnimatePresence>
                {filteredDiscounts.map((discount) => (
                  <React.Fragment key={discount.id}>
                    <motion.tr 
                      layout
                      className="group hover:bg-muted/10 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => toggleRowExpansion(discount.id)}
                            className="text-muted-foreground hover:text-primary transition-colors h-6 w-6 rounded-full hover:bg-muted flex items-center justify-center border border-transparent hover:border-border"
                          >
                            {expandedRows.has(discount.id) ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </button>
                          <span className="font-mono text-xs font-bold text-primary">
                            {discount.id}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                         <div className="flex flex-col gap-0.5">
                            <span className="font-semibold text-sm group-hover:text-primary transition-colors">{discount.name}</span>
                            <div className="flex items-center gap-2">
                               <Badge variant="outline" className="text-[10px] h-4 py-0 leading-none font-medium capitalize">
                                  {discount.type.replace("-", " ")}
                               </Badge>
                            </div>
                         </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                           <div className="h-8 w-8 rounded-full bg-emerald-50 flex items-center justify-center">
                              {discount.discountType === "percentage" ? (
                                <Percent className="h-3.5 w-3.5 text-emerald-600" />
                              ) : (
                                <DollarSign className="h-3.5 w-3.5 text-emerald-600" />
                              )}
                           </div>
                           <span className="font-bold text-emerald-700">
                             {discount.value}{discount.discountType === "percentage" ? "%" : ""}
                           </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{discount.startDate}</span>
                            <ArrowRight className="h-3 w-3" />
                            <span>{discount.endDate}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={cn(
                          "font-semibold h-5 px-2",
                          discount.status === "active" ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" :
                          discount.status === "expired" ? "bg-red-100 text-red-700 hover:bg-red-100" :
                          "bg-zinc-100 text-zinc-700 hover:bg-zinc-100"
                        )}>
                           {discount.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                               <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-44">
                            <DropdownMenuLabel>Campaign Settings</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleEditDiscount(discount)}>
                               <Edit className="h-4 w-4 mr-2" /> Modify Parameters
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                               <Users className="h-4 w-4 mr-2" /> View Reach
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive font-medium" onClick={() => handleDeleteDiscount(discount)}>
                               <Trash2 className="h-4 w-4 mr-2" /> Terminate
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </motion.tr>
                    {expandedRows.has(discount.id) && (
                      <motion.tr 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-muted/10 border-b border-muted/50"
                      >
                        <td colSpan={6} className="py-6 px-12">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="md:col-span-2 space-y-3">
                              <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Scope of Application</h4>
                              <div className="flex flex-wrap gap-2">
                                {discount.appliedTo.map((item, idx) => (
                                  <Badge
                                    key={idx}
                                    variant="outline"
                                    className="bg-background border-muted px-2 py-0.5 text-xs font-medium"
                                  >
                                    {item}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="space-y-4">
                              <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Performance Metrics</h4>
                              <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                  <span className="text-muted-foreground">Priority Rating</span>
                                  <span className="font-bold text-primary">Level {discount.priority}</span>
                                </div>
                                <div className="flex justify-between text-xs pt-1 border-t border-muted">
                                  <span className="text-muted-foreground">Min Transaction</span>
                                  <span className="font-bold">{discount.minPurchaseAmount ? `$${discount.minPurchaseAmount}` : "None"}</span>
                                </div>
                                <div className="flex justify-between text-xs pt-1 border-t border-muted">
                                  <span className="text-muted-foreground">Cap Limit</span>
                                  <span className="font-bold">{discount.maxDiscountAmount ? `$${discount.maxDiscountAmount}` : "Infinite"}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </motion.tr>
                    )}
                  </React.Fragment>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          <div className="flex items-center justify-between border-t px-6 py-4 bg-muted/20">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Total: {filteredDiscounts.length} Global Discounts</span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 px-3 text-xs" disabled>Previous</Button>
              <Button variant="outline" size="sm" className="h-8 px-3 text-xs">Next</Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Campaign Config Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-2xl overflow-y-auto px-0 border-none bg-background shadow-2xl">
          <div className="px-10 pb-32 pt-10">
             <SheetHeader className="mb-12">
               <div className="h-14 w-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 mb-6 shadow-inner border border-amber-500/20">
                  <Sparkles className="h-7 w-7" />
               </div>
               <SheetTitle className="text-3xl font-black tracking-tight">{selectedDiscount ? "Refine Campaign" : "Manifest New Campaign"}</SheetTitle>
               <SheetDescription className="text-base font-medium">
                  Architect the parameters of your promotional campaign. Defined rules propagate globally across matching transactions.
               </SheetDescription>
             </SheetHeader>
             
             <div className="space-y-12">
                {/* Identity Section */}
                <section className="space-y-6">
                   <div className="flex items-center gap-2 mb-2">
                      <div className="w-1.5 h-6 bg-amber-500 rounded-full" />
                      <h3 className="font-black text-xl tracking-tight">Campaign Identity</h3>
                   </div>
                   <div className="space-y-6">
                      <div className="space-y-2.5">
                         <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Campaign Moniker</Label>
                         <Input
                           value={formData.name}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
                           placeholder="The Ultimate Tech Blast 2026"
                           className="h-12 border-none bg-muted/50 focus-visible:ring-amber-500/20 font-bold"
                         />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                         <div className="space-y-2.5">
                           <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Target Asset Type</Label>
                           <Select
                             value={formData.type}
                             onValueChange={(value: string) => setFormData({ ...formData, type: value as any })}
                           >
                             <SelectTrigger className="h-12 border-none bg-muted/50 font-bold focus:ring-amber-500/20">
                               <SelectValue />
                             </SelectTrigger>
                             <SelectContent>
                               <SelectItem value="category" className="font-bold">Product Categories</SelectItem>
                               <SelectItem value="product" className="font-bold">Specific Stock Items</SelectItem>
                               <SelectItem value="vendor" className="font-bold">Wholesale Partners</SelectItem>
                               <SelectItem value="custom-group" className="font-bold">Strategic Groups</SelectItem>
                             </SelectContent>
                           </Select>
                         </div>
                         <div className="space-y-2.5">
                            <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Live Status</Label>
                            <Select
                             value={formData.status}
                             onValueChange={(value: string) => setFormData({ ...formData, status: value as any })}
                           >
                             <SelectTrigger className="h-12 border-none bg-muted/50 font-bold focus:ring-amber-500/20">
                               <SelectValue />
                             </SelectTrigger>
                             <SelectContent>
                               <SelectItem value="active" className="text-emerald-600 font-bold">Active Now</SelectItem>
                               <SelectItem value="inactive" className="text-muted-foreground font-bold">Dormant</SelectItem>
                               <SelectItem value="expired" className="text-rose-600 font-bold">Concluded</SelectItem>
                             </SelectContent>
                           </Select>
                         </div>
                      </div>
                   </div>
                </section>
                
                {/* Value Matrix */}
                <section className="space-y-6">
                   <div className="flex items-center gap-2 mb-2">
                      <div className="w-1.5 h-6 bg-amber-500 rounded-full" />
                      <h3 className="font-black text-xl tracking-tight">Value Matrix</h3>
                   </div>
                   <div className="grid grid-cols-3 gap-6">
                      <div className="space-y-2.5">
                         <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Logic Type</Label>
                         <Select
                           value={formData.discountType}
                           onValueChange={(value: string) => setFormData({ ...formData, discountType: value as any })}
                         >
                           <SelectTrigger className="h-12 border-none bg-muted/50 font-bold focus:ring-amber-500/20">
                             <SelectValue />
                           </SelectTrigger>
                           <SelectContent>
                             <SelectItem value="percentage" className="font-bold">Percentage (%)</SelectItem>
                             <SelectItem value="fixed" className="font-bold">Fixed Amount ($)</SelectItem>
                           </SelectContent>
                         </Select>
                      </div>
                      <div className="space-y-2.5 col-span-2">
                         <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Discount Magnitude</Label>
                         <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-lg bg-background flex items-center justify-center shadow-sm">
                               {formData.discountType === 'percentage' ? <Percent className="h-4 w-4 text-primary" /> : <DollarSign className="h-4 w-4 text-primary" />}
                            </div>
                            <Input
                              type="number"
                              value={formData.value}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, value: parseFloat(e.target.value) || 0 })}
                              className="h-12 pl-16 border-none bg-muted/50 focus-visible:ring-amber-500/20 text-lg font-black"
                            />
                         </div>
                      </div>
                   </div>
                      
                   <div className="grid grid-cols-2 gap-6 pt-2">
                      <div className="space-y-2.5">
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Min Threshold</Label>
                        <Input
                          type="number"
                          value={formData.minPurchaseAmount || ""}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, minPurchaseAmount: e.target.value ? parseFloat(e.target.value) : undefined })}
                          placeholder="No minimum"
                          className="h-12 border-none bg-muted/50 focus-visible:ring-amber-500/20 font-bold"
                        />
                      </div>
                      <div className="space-y-2.5">
                         <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Max Cap</Label>
                         <Input
                           type="number"
                           value={formData.maxDiscountAmount || ""}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, maxDiscountAmount: e.target.value ? parseFloat(e.target.value) : undefined })}
                           placeholder="No limit"
                           className="h-12 border-none bg-muted/50 focus-visible:ring-amber-500/20 font-bold"
                         />
                      </div>
                   </div>
                </section>

                {/* Temporal Limits */}
                <section className="space-y-6">
                   <div className="flex items-center gap-2 mb-2">
                      <div className="w-1.5 h-6 bg-amber-500 rounded-full" />
                      <h3 className="font-black text-xl tracking-tight">Temporal Limits</h3>
                   </div>
                   <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2.5">
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Activation Window</Label>
                        <Input
                          type="date"
                          value={formData.startDate}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, startDate: e.target.value })}
                          className="h-12 border-none bg-muted/50 focus-visible:ring-amber-500/20 font-bold"
                        />
                      </div>
                      <div className="space-y-2.5">
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Termination Window</Label>
                        <Input
                          type="date"
                          value={formData.endDate}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, endDate: e.target.value })}
                          className="h-12 border-none bg-muted/50 focus-visible:ring-amber-500/20 font-bold"
                        />
                      </div>
                   </div>
                </section>

                {/* Asset Targeting */}
                <section className="space-y-6">
                   <div className="flex items-center gap-2 mb-2">
                      <div className="w-1.5 h-6 bg-amber-500 rounded-full" />
                      <h3 className="font-black text-xl tracking-tight">Asset Targeting</h3>
                   </div>
                   <div className="space-y-4">
                       <div className="flex items-center justify-between">
                          <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Selected Targets</Label>
                          <Badge className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-2.5">
                            {selectedItems.length} Active
                          </Badge>
                       </div>
                       <div className="border border-none bg-muted/30 rounded-2xl p-2 max-h-56 overflow-y-auto">
                          <div className="grid grid-cols-1 gap-1">
                            {getAppliedToOptions().map((item) => (
                              <label
                                key={item}
                                className={cn(
                                  "flex items-center gap-3 cursor-pointer p-3 rounded-xl transition-all border-2 border-transparent",
                                  selectedItems.includes(item) ? "bg-background border-amber-500/20 shadow-sm" : "hover:bg-muted/50"
                                )}
                              >
                                <div className={cn(
                                  "h-5 w-5 rounded-lg border-2 flex items-center justify-center transition-colors",
                                  selectedItems.includes(item) ? "bg-amber-500 border-amber-500" : "border-muted-foreground/30 bg-background"
                                )}>
                                   <AnimatePresence>
                                     {selectedItems.includes(item) && (
                                       <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                         <Plus className="h-3.5 w-3.5 text-white stroke-[3px]" />
                                       </motion.div>
                                     )}
                                   </AnimatePresence>
                                </div>
                                <input
                                  type="checkbox"
                                  checked={selectedItems.includes(item)}
                                  onChange={() => toggleItemSelection(item)}
                                  className="hidden"
                                />
                                <span className={cn("text-sm font-bold", selectedItems.includes(item) ? "text-amber-700" : "text-muted-foreground")}>
                                  {item}
                                </span>
                              </label>
                            ))}
                          </div>
                       </div>
                   </div>
                </section>

                <div className="pt-10 flex gap-4">
                     <Button variant="outline" className="flex-1 h-12 text-muted-foreground font-bold" onClick={() => setIsSheetOpen(false)}>Discard</Button>
                     <Button className="flex-1 h-12 shadow-xl shadow-amber-500/20 font-black tracking-wide bg-amber-500 hover:bg-amber-600 text-white border-none" onClick={handleSaveDiscount}>
                        {selectedDiscount ? "Update Campaign" : "Launch Campaign"}
                     </Button>
                </div>
             </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Termination Confirmation */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
               <Trash2 className="h-5 w-5" /> Terminate Campaign
            </DialogTitle>
            <DialogDescription>
              Are you certain you wish to permanently terminate the campaign <strong>"{selectedDiscount?.name}"</strong>? This will immediately restore default pricing for all targeted assets.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 mt-4">
            <Button variant="outline" className="flex-1" onClick={() => setShowDeleteModal(false)}>
              Abort
            </Button>
            <Button variant="destructive" className="flex-1 shadow-lg shadow-destructive/20" onClick={handleConfirmDelete}>
              Confirm Termination
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}