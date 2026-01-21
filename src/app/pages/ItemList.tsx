import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { Badge } from '@/app/components/ui/badge';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  MoreVertical, 
  FileText, 
  Package, 
  AlertTriangle, 
  Layers, 
  TrendingUp,
  ScanBarcode
} from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription, 
  SheetFooter,
  SheetTrigger
} from '@/app/components/ui/sheet';
import { Label } from '@/app/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/app/components/ui/select';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/app/components/ui/dropdown-menu';
import { motion } from 'framer-motion';
import { cn } from '@/app/components/ui/utils';
import { inventoryStats } from '@/app/data/mockSystemData';

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

export function ItemList() {
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { title: 'Registered SKU', value: inventoryStats.totalSkus, icon: Package, color: 'text-blue-600', bg: 'bg-blue-100/50' },
    { title: 'Critical Stock', value: inventoryStats.criticalStock, icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-100/50' },
    { title: 'Logical Groups', value: inventoryStats.logicalGroups, icon: Layers, color: 'text-purple-600', bg: 'bg-purple-100/50' },
    { title: 'Asset Valuation', value: inventoryStats.assetValuation, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-100/50' },
  ];

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-[1600px] mx-auto space-y-10 pb-20 px-4"
    >
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div className="space-y-1">
          <Badge variant="outline" className="text-[10px] font-bold tracking-[0.2em] px-2 py-0 border-blue-200 text-blue-700 uppercase">Catalog Management</Badge>
          <h1 className="text-4xl font-medium tracking-tighter text-gray-900">Inventory Hub</h1>
          <p className="text-muted-foreground font-medium">Synchronize physical assets with your organizational ledger.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-12 px-6 border-muted bg-background shadow-sm gap-2 font-bold">
            <Download className="h-4 w-4" /> Export Archive
          </Button>
          <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
            <SheetTrigger asChild>
              <Button className="h-12 px-8 gap-2 shadow-xl shadow-primary/25 font-black uppercase text-xs tracking-widest">
                <Plus className="h-4 w-4" /> Initialize SKU
              </Button>
            </SheetTrigger>
          <SheetContent className="sm:max-w-2xl overflow-y-auto px-0 border-none bg-background shadow-2xl">
              <div className="px-10 pb-32 pt-10">
                 <SheetHeader className="mb-12">
                   <div className="h-14 w-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 mb-6 shadow-inner border border-indigo-500/20">
                      <Package className="h-7 w-7" />
                   </div>
                   <SheetTitle className="text-3xl font-black tracking-tight">Initialize New SKU</SheetTitle>
                   <SheetDescription className="text-base font-medium">
                      Enter the details of the new item to add it to the inventory.
                   </SheetDescription>
                 </SheetHeader>
                 
                 <div className="space-y-12">
                    {/* Core Identity */}
                    <section className="space-y-6">
                       <div className="flex items-center gap-2 mb-2">
                          <div className="w-1.5 h-6 bg-indigo-500 rounded-full" />
                          <h3 className="font-black text-xl tracking-tight">Core Identification</h3>
                       </div>
                       <div className="space-y-6">
                          <div className="space-y-2.5">
                             <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Item Name</Label>
                             <Input 
                               id="name" 
                               placeholder="e.g. Wireless Mouse" 
                               className="h-12 border-none bg-muted/50 focus-visible:ring-indigo-500/20 font-bold"
                             />
                          </div>
                          <div className="grid grid-cols-2 gap-6">
                             <div className="space-y-2.5">
                                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/70 ml-1">SKU Code</Label>
                                <Input 
                                  id="sku" 
                                  placeholder="Auto-generated" 
                                  disabled 
                                  className="h-12 border-none bg-muted/30 font-mono text-muted-foreground font-bold"
                                />
                             </div>
                             <div className="space-y-2.5">
                                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Barcode / UPC</Label>
                                <div className="relative">
                                   <ScanBarcode className="absolute left-4 top-4 h-4 w-4 text-muted-foreground/50" />
                                   <Input 
                                      id="barcode" 
                                      placeholder="Scan barcode" 
                                      className="h-12 border-none bg-muted/50 pl-11 focus-visible:ring-indigo-500/20 font-bold"
                                   />
                                </div>
                             </div>
                          </div>
                          <div className="space-y-2.5">
                             <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Description</Label>
                             <textarea 
                               id="desc"
                               className="flex min-h-[100px] w-full rounded-xl border-none bg-muted/50 px-4 py-3 text-sm font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                               placeholder="Enter detailed description..."
                             />
                          </div>
                       </div>
                    </section>
                    
                    {/* Classification */}
                    <section className="space-y-6">
                       <div className="flex items-center gap-2 mb-2">
                          <div className="w-1.5 h-6 bg-indigo-500 rounded-full" />
                          <h3 className="font-black text-xl tracking-tight">Classification & Tax</h3>
                       </div>
                       <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2.5">
                             <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Category</Label>
                             <Select>
                               <SelectTrigger className="h-12 border-none bg-muted/50 font-bold focus:ring-indigo-500/20">
                                 <SelectValue placeholder="Select Category" />
                               </SelectTrigger>
                               <SelectContent>
                                 <SelectItem value="electronics" className="font-bold">Electronics</SelectItem>
                                 <SelectItem value="tools" className="font-bold">Tools</SelectItem>
                                 <SelectItem value="raw" className="font-bold">Raw Materials</SelectItem>
                                 <SelectItem value="finished" className="font-bold">Finished Goods</SelectItem>
                               </SelectContent>
                             </Select>
                          </div>
                          <div className="space-y-2.5">
                             <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Applicable Tax (%)</Label>
                             <Input 
                                id="tax" 
                                type="number" 
                                placeholder="18" 
                                className="h-12 border-none bg-muted/50 focus-visible:ring-indigo-500/20 font-bold"
                             />
                          </div>
                       </div>
                    </section>

                    {/* Logistics */}
                    <section className="space-y-6">
                       <div className="flex items-center gap-2 mb-2">
                          <div className="w-1.5 h-6 bg-indigo-500 rounded-full" />
                          <h3 className="font-black text-xl tracking-tight">Inventory Logistics</h3>
                       </div>
                       <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2.5">
                             <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Reorder Point</Label>
                             <Input 
                                id="reorder" 
                                type="number" 
                                placeholder="10" 
                                className="h-12 border-none bg-muted/50 focus-visible:ring-indigo-500/20 font-bold"
                             />
                          </div>
                          <div className="space-y-2.5">
                             <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Unit of Measure</Label>
                             <Select>
                               <SelectTrigger className="h-12 border-none bg-muted/50 font-bold focus:ring-indigo-500/20">
                                 <SelectValue placeholder="Select Unit" />
                               </SelectTrigger>
                               <SelectContent>
                                 <SelectItem value="pcs" className="font-bold">Pieces (pcs)</SelectItem>
                                 <SelectItem value="kg" className="font-bold">Kilograms (kg)</SelectItem>
                                 <SelectItem value="l" className="font-bold">Liters (l)</SelectItem>
                                 <SelectItem value="box" className="font-bold">Box</SelectItem>
                               </SelectContent>
                             </Select>
                          </div>
                       </div>
                    </section>

                    <div className="pt-10 flex gap-4">
                       <Button variant="outline" className="flex-1 h-12 text-muted-foreground font-bold" onClick={() => setIsAddSheetOpen(false)}>Cancel</Button>
                       <Button className="flex-1 h-12 shadow-xl shadow-indigo-500/20 font-black tracking-wide bg-indigo-600 hover:bg-indigo-700 text-white border-none" onClick={() => setIsAddSheetOpen(false)}>
                          Create Item
                       </Button>
                    </div>
                 </div>
              </div>
          </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => (
          <motion.div key={idx} variants={item}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                </div>
                <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Advanced Filters Card */}
      <motion.div variants={item}>
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search by SKU, name or barcode..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="raw">Raw Materials</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="active">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="discontinued">Discontinued</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="secondary" className="gap-2">
                  <Filter className="h-4 w-4" /> Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Table Card */}
      <motion.div variants={item}>
        <Card className="overflow-hidden border-none shadow-sm">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[120px] font-bold">SKU</TableHead>
                <TableHead className="font-bold">Item Details</TableHead>
                <TableHead className="font-bold">Category</TableHead>
                <TableHead className="font-bold">Stock Status</TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="text-right font-bold pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <TableRow key={i} className="hover:bg-muted/30 transition-colors group">
                  <TableCell className="font-mono text-xs font-semibold text-primary">
                    SKU-{2024 + i}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-semibold text-sm group-hover:text-primary transition-colors">Industrial Connector Type {String.fromCharCode(64 + i)}</span>
                      <span className="text-xs text-muted-foreground font-mono flex items-center gap-1">
                        <ScanBarcode className="h-3 w-3" /> 89012345{i}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-background">Electronics</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1.5 min-w-[120px]">
                      <div className="flex items-center justify-between text-[10px] font-medium text-muted-foreground uppercase">
                        <span>{Math.floor(Math.random() * 500)} in stock</span>
                        <span>{i === 2 ? 'Low' : 'Good'}</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                        <div 
                          className={cn(
                            "h-full transition-all duration-1000",
                            i === 2 ? "bg-amber-500" : "bg-primary"
                          )} 
                          style={{ width: `${i === 2 ? 15 : 65 + (i * 4)}%` }} 
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn(
                      i === 5 ? "bg-red-100 text-red-700 hover:bg-red-100" : "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                    )}>
                      {i === 5 ? 'Inactive' : 'Active'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem className="gap-2">
                          <FileText className="h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <TrendingUp className="h-4 w-4" /> Stock History
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive gap-2">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center justify-between border-t px-6 py-4 bg-muted/20">
            <span className="text-xs text-muted-foreground">Showing 8 of 1,284 results</span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}