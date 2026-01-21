import React, { useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Filter,
  X,
  Calendar,
  Percent,
  DollarSign,
  Tag,
  Package,
  Users,
  Grid3x3,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  ArrowRight,
  TrendingDown,
  CalendarDays,
  Sparkles,
  Download
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
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
  SheetFooter,
  SheetTrigger
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

interface Discount {
  id: string;
  name: string;
  type: "category" | "product" | "vendor" | "custom-group";
  discountType: "percentage" | "fixed";
  value: number;
  appliedTo: string[];
  startDate: string;
  endDate: string;
  status: "active" | "inactive" | "expired";
  minPurchaseAmount?: number;
  maxDiscountAmount?: number;
  priority: number;
}

const mockDiscounts: Discount[] = [
  {
    id: "D001",
    name: "Winter Electronics Extravaganza",
    type: "category",
    discountType: "percentage",
    value: 15,
    appliedTo: ["Electronics", "Computers"],
    startDate: "2026-01-15",
    endDate: "2026-02-15",
    status: "active",
    minPurchaseAmount: 100,
    maxDiscountAmount: 500,
    priority: 1,
  },
  {
    id: "D002",
    name: "New Year Tech Clearance",
    type: "product",
    discountType: "fixed",
    value: 50,
    appliedTo: ["Laptop Model X", "Laptop Model Y"],
    startDate: "2026-01-10",
    endDate: "2026-03-10",
    status: "active",
    priority: 2,
  },
  {
    id: "D003",
    name: "Preferred Partner Promotion",
    type: "vendor",
    discountType: "percentage",
    value: 10,
    appliedTo: ["TechCorp Suppliers", "Global Tech Inc."],
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    status: "active",
    priority: 3,
  },
  {
    id: "D004",
    name: "Flash Holiday Markdown",
    type: "custom-group",
    discountType: "percentage",
    value: 25,
    appliedTo: ["Summer Items", "Seasonal Stock"],
    startDate: "2025-12-01",
    endDate: "2026-01-15",
    status: "expired",
    maxDiscountAmount: 200,
    priority: 4,
  },
  {
    id: "D005",
    name: "Home Office Refresh Event",
    type: "category",
    discountType: "percentage",
    value: 20,
    appliedTo: ["Furniture", "Home Decor"],
    startDate: "2026-02-01",
    endDate: "2026-03-01",
    status: "inactive",
    minPurchaseAmount: 200,
    priority: 5,
  },
];

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
  const [selectedDiscount, setSelectedDiscount] = useState<Discount | null>(null);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  // Form states
  const [formData, setFormData] = useState<Partial<Discount>>({
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

  const handleEditDiscount = (discount: Discount) => {
    setSelectedDiscount(discount);
    setFormData(discount);
    setSelectedItems(discount.appliedTo);
    setIsSheetOpen(true);
  };

  const handleDeleteDiscount = (discount: Discount) => {
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

  const stats = [
    { title: "Active Campaigns", value: "3", icon: Sparkles, color: "text-emerald-600", bg: "bg-emerald-100" },
    { title: "Total Savings", value: "$12,450", icon: TrendingDown, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Scheduled", value: "2", icon: CalendarDays, color: "text-purple-600", bg: "bg-purple-100" },
    { title: "Avg Discount", value: "15%", icon: Percent, color: "text-amber-600", bg: "bg-amber-100" },
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
          <h1 className="text-3xl font-bold tracking-tight">Campaigns & Discounts</h1>
          <p className="text-muted-foreground">Strategize and manage tiered pricing and promotional rules.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="hidden sm:flex">
            <Download className="mr-2 h-4 w-4" /> Reports
          </Button>
          <Button size="lg" className="shadow-lg gap-2" onClick={handleAddDiscount}>
            <Plus className="h-5 w-5" /> Start Campaign
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
        <SheetContent className="sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-2xl">{selectedDiscount ? "Refine Campaign" : "Manifest New Campaign"}</SheetTitle>
            <SheetDescription>
              Architect the parameters of your promotional campaign. Defined rules propagate globally across matching transactions.
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-8 py-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Campaign Identity</Label>
                <Input
                  value={formData.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="The Ultimate Tech Blast 2026"
                  className="font-semibold text-lg h-12"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Asset Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: string) => setFormData({ ...formData, type: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="category">Product Categories</SelectItem>
                      <SelectItem value="product">Specific Stock Items</SelectItem>
                      <SelectItem value="vendor">Wholesale Partners</SelectItem>
                      <SelectItem value="custom-group">Strategic Groups</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                   <Label>Campaign Status</Label>
                   <Select
                    value={formData.status}
                    onValueChange={(value: string) => setFormData({ ...formData, status: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active Now</SelectItem>
                      <SelectItem value="inactive">Paused / Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t">
               <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Value Engineering</Label>
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Calculative Model</Label>
                    <Select
                      value={formData.discountType}
                      onValueChange={(value: string) => setFormData({ ...formData, discountType: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Percentage Allocation (%)</SelectItem>
                        <SelectItem value="fixed">Fixed Currency Offset ($)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Magnitude</Label>
                    <div className="relative">
                       <Input
                        type="number"
                        value={formData.value}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, value: parseFloat(e.target.value) })}
                        className="pr-10 font-bold"
                      />
                      <div className="absolute right-3 top-2.5 text-muted-foreground">
                         {formData.discountType === "percentage" ? <Percent className="h-4 w-4" /> : <DollarSign className="h-4 w-4" />}
                      </div>
                    </div>
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="space-y-2">
                    <Label>Lower Threshold (Min Buy)</Label>
                    <Input
                      type="number"
                      value={formData.minPurchaseAmount || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, minPurchaseAmount: e.target.value ? parseFloat(e.target.value) : undefined })}
                      placeholder="No minimum"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Upper Boundary (Max Save)</Label>
                    <Input
                      type="number"
                      value={formData.maxDiscountAmount || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, maxDiscountAmount: e.target.value ? parseFloat(e.target.value) : undefined })}
                      placeholder="Capped amount"
                    />
                  </div>
               </div>
            </div>

            <div className="space-y-4 pt-6 border-t">
               <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Temporal Limits</Label>
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Activation Window</Label>
                    <Input
                      type="date"
                      value={formData.startDate}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, startDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Termination Window</Label>
                    <Input
                      type="date"
                      value={formData.endDate}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, endDate: e.target.value })}
                    />
                  </div>
               </div>
            </div>

            <div className="space-y-4 pt-6 border-t pb-24">
               <div className="flex items-center justify-between">
                  <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Asset Targeting</Label>
                  <span className="text-[10px] bg-primary text-primary-foreground px-2 py-0.5 rounded-full font-bold">
                    {selectedItems.length} Targets Selected
                  </span>
               </div>
               <div className="border border-muted rounded-xl p-2 max-h-56 overflow-y-auto bg-muted/20">
                  <div className="grid grid-cols-1 gap-1">
                    {getAppliedToOptions().map((item) => (
                      <label
                        key={item}
                        className={cn(
                          "flex items-center gap-3 cursor-pointer p-3 rounded-lg transition-colors border-2 border-transparent",
                          selectedItems.includes(item) ? "bg-background border-primary/20 shadow-sm" : "hover:bg-muted/50"
                        )}
                      >
                        <div className={cn(
                          "h-5 w-5 rounded border-2 flex items-center justify-center transition-colors",
                          selectedItems.includes(item) ? "bg-primary border-primary" : "border-muted-foreground/30 bg-background"
                        )}>
                           <AnimatePresence>
                             {selectedItems.includes(item) && (
                               <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                 <Plus className="h-3.5 w-3.5 text-white rotate-45" />
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
                        <span className={cn("text-sm font-medium", selectedItems.includes(item) ? "text-primary" : "text-muted-foreground")}>
                          {item}
                        </span>
                      </label>
                    ))}
                  </div>
               </div>
            </div>
          </div>
          <SheetFooter className="absolute bottom-0 left-0 right-0 p-6 bg-background border-t">
            <Button variant="outline" className="flex-1" onClick={() => setIsSheetOpen(false)}>Discard Draft</Button>
            <Button className="flex-1 shadow-lg shadow-primary/20" onClick={handleSaveDiscount}>
               {selectedDiscount ? "Synchronize Updates" : "Deploy Campaign"}
            </Button>
          </SheetFooter>
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