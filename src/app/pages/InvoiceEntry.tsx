import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card, CardContent, CardHeader } from '@/app/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { Badge } from '@/app/components/ui/badge';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  FileText,
  Truck,
  CheckCircle2
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter
} from "@/app/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Label } from "@/app/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Separator } from "@/app/components/ui/separator";
import { motion } from 'framer-motion';
import { cn } from '@/app/components/ui/utils';

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

export function InvoiceEntry() {
  const [isEntryOpen, setIsEntryOpen] = useState(false);

  // Mock data for inward entries list
  const inwardEntries = [
    { id: 'IWD-001', vendor: 'Apex Industrial', invoiceNo: 'INV-2024-001', date: '2024-01-15', items: 5, total: '$1,250.00', status: 'Verified' },
    { id: 'IWD-002', vendor: 'Quantum Components', invoiceNo: 'INV-2024-002', date: '2024-01-14', items: 3, total: '$890.00', status: 'Verified' },
    { id: 'IWD-003', vendor: 'Global Logistics', invoiceNo: 'INV-2024-003', date: '2024-01-13', items: 8, total: '$2,100.00', status: 'Pending' },
    { id: 'IWD-004', vendor: 'TechCore Supply', invoiceNo: 'INV-2024-004', date: '2024-01-12', items: 4, total: '$670.00', status: 'Verified' },
    { id: 'IWD-005', vendor: 'Apex Industrial', invoiceNo: 'INV-2024-005', date: '2024-01-11', items: 6, total: '$1,540.00', status: 'Verified' },
  ];

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-[1600px] mx-auto space-y-8 pb-20 px-4"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div className="space-y-1">
          <Badge variant="outline" className="text-[10px] font-black tracking-[0.2em] px-2 py-0 border-primary/30 text-primary uppercase">Procurement</Badge>
          <h1 className="text-4xl font-black tracking-tighter italic">Inward Ledger</h1>
          <p className="text-muted-foreground font-medium">Manage inbound stock receipts and vendor invoices.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-12 px-6 border-muted bg-background shadow-sm gap-2 font-bold hidden md:flex">
             <Filter className="h-4 w-4" /> Filter
          </Button>
          <Sheet open={isEntryOpen} onOpenChange={setIsEntryOpen}>
            <SheetTrigger asChild>
              <Button className="h-12 px-6 shadow-xl shadow-primary/20 gap-2 font-bold tracking-tight">
                <Plus className="h-4 w-4" /> Record Entry
              </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-xl overflow-y-auto w-[90vw]">
              <SheetHeader className="pb-6 border-b">
                <SheetTitle className="text-2xl font-black tracking-tighter text-primary">New Inward Entry</SheetTitle>
                <SheetDescription className="font-medium">
                  Record receiving particulars and vendor invoice details.
                </SheetDescription>
              </SheetHeader>
              
              <div className="grid gap-6 py-6">
                 {/* Vendor Details */}
                 <div className="grid gap-4">
                    <h3 className="text-sm font-black uppercase tracking-wider text-muted-foreground">Vendor Information</h3>
                    <div className="grid gap-2">
                       <Label>Select Vendor</Label>
                       <Select>
                          <SelectTrigger className="h-11">
                             <SelectValue placeholder="Search vendor..." />
                          </SelectTrigger>
                          <SelectContent>
                             <SelectItem value="apex">Apex Industrial</SelectItem>
                             <SelectItem value="quantum">Quantum Components</SelectItem>
                          </SelectContent>
                       </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="grid gap-2">
                          <Label>Invoice Ref.</Label>
                          <Input placeholder="INV-2024-XXX" className="h-11 font-mono uppercase" />
                       </div>
                       <div className="grid gap-2">
                          <Label>Invoice Date</Label>
                          <Input type="date" className="h-11" />
                       </div>
                    </div>
                 </div>

                 <Separator />

                 {/* Items */}
                 <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                       <h3 className="text-sm font-black uppercase tracking-wider text-muted-foreground">Line Items</h3>
                       <Button variant="outline" size="sm" className="h-8 text-xs font-bold">+ Add Row</Button>
                    </div>
                    <div className="border rounded-lg overflow-hidden">
                       <Table>
                          <TableHeader className="bg-muted/50">
                             <TableRow>
                                <TableHead className="h-9 text-[10px] font-black uppercase">Item</TableHead>
                                <TableHead className="h-9 text-[10px] font-black uppercase w-20">Qty</TableHead>
                                <TableHead className="h-9 text-[10px] font-black uppercase w-24 text-right">Amnt</TableHead>
                             </TableRow>
                          </TableHeader>
                          <TableBody>
                             {[1, 2].map(i => (
                                <TableRow key={i}>
                                   <TableCell className="py-2">
                                      <Input className="h-8 w-full border-none shadow-none focus-visible:ring-0 bg-transparent px-0 placeholder:text-muted-foreground/50" placeholder="Search item..." />
                                   </TableCell>
                                   <TableCell className="py-2">
                                      <Input className="h-8 w-full border-none shadow-none focus-visible:ring-0 bg-transparent px-0 font-mono" placeholder="0" />
                                   </TableCell>
                                   <TableCell className="py-2 text-right">
                                      <span className="font-mono text-xs">$0.00</span>
                                   </TableCell>
                                </TableRow>
                             ))}
                          </TableBody>
                       </Table>
                    </div>
                    <div className="flex justify-end gap-6 text-sm">
                       <div className="text-muted-foreground font-medium">Subtotal: <span className="text-foreground">$0.00</span></div>
                       <div className="text-muted-foreground font-medium">Tax: <span className="text-foreground">$0.00</span></div>
                       <div className="font-black text-primary">Total: $0.00</div>
                    </div>
                 </div>
              </div>

              <SheetFooter className="border-t pt-6 gap-2 sm:gap-0">
                <Button variant="outline" className="h-11" onClick={() => setIsEntryOpen(false)}>Cancel</Button>
                <Button className="h-11 font-bold">Confirm Receipt</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-2">
         {[
           { label: 'Pending Receipts', value: '3', icon: Truck, color: 'text-amber-500', bg: 'bg-amber-500/10' },
           { label: 'Verified Invoices', value: '12', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
           { label: 'Total Value', value: '$45.2k', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-500/10' },
         ].map((stat, i) => (
           <motion.div key={i} variants={item}>
              <Card className="border-l-4 border-l-primary shadow-sm hover:shadow-md transition-all">
                 <CardContent className="p-4 flex items-center justify-between">
                    <div>
                       <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">{stat.label}</p>
                       <p className="text-2xl font-black tracking-tight">{stat.value}</p>
                    </div>
                    <div className={cn("p-2 rounded-lg", stat.bg)}>
                       <stat.icon className={cn("h-5 w-5", stat.color)} />
                    </div>
                 </CardContent>
              </Card>
           </motion.div>
         ))}
      </div>

      {/* Main Table */}
      <motion.div variants={item}>
        <Card className="border-none shadow-lg">
           <CardHeader className="bg-muted/30 border-b p-4">
              <div className="flex items-center gap-3">
                 <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search records..." className="pl-9 h-9 border-none bg-background shadow-sm" />
                 </div>
                 <div className="hidden md:flex gap-2">
                    <Badge variant="secondary" className="cursor-pointer hover:bg-muted">Status: All</Badge>
                    <Badge variant="secondary" className="cursor-pointer hover:bg-muted">Date: Any</Badge>
                 </div>
              </div>
           </CardHeader>
           <CardContent className="p-0">
              <Table>
                 <TableHeader>
                    <TableRow className="hover:bg-transparent">
                       <TableHead className="w-[120px] font-black text-[11px] uppercase tracking-wider">Ref ID</TableHead>
                       <TableHead className="font-black text-[11px] uppercase tracking-wider">Vendor Entity</TableHead>
                       <TableHead className="font-black text-[11px] uppercase tracking-wider">Invoice No.</TableHead>
                       <TableHead className="font-black text-[11px] uppercase tracking-wider text-right">Total Value</TableHead>
                       <TableHead className="font-black text-[11px] uppercase tracking-wider text-center">Status</TableHead>
                       <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                 </TableHeader>
                 <TableBody>
                    {inwardEntries.map((entry) => (
                       <TableRow key={entry.id} className="group hover:bg-muted/30">
                          <TableCell className="font-mono text-xs font-medium text-muted-foreground">
                             {entry.id}
                          </TableCell>
                          <TableCell>
                             <div className="flex flex-col">
                                <span className="font-bold text-sm tracking-tight">{entry.vendor}</span>
                                <span className="text-[10px] text-muted-foreground uppercase">{entry.date}</span>
                             </div>
                          </TableCell>
                          <TableCell className="font-mono text-xs">{entry.invoiceNo}</TableCell>
                          <TableCell className="text-right font-black text-sm">{entry.total}</TableCell>
                          <TableCell className="text-center">
                             <Badge 
                                variant="outline" 
                                className={cn(
                                   "text-[10px] font-bold uppercase tracking-widest border-0",
                                   entry.status === 'Verified' ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200" : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                                )}
                             >
                                {entry.status}
                             </Badge>
                          </TableCell>
                          <TableCell>
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                   <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                                      <MoreVertical className="h-4 w-4" />
                                   </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                   <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                   <DropdownMenuSeparator />
                                   <DropdownMenuItem>View Details</DropdownMenuItem>
                                   <DropdownMenuItem>Download Invoice</DropdownMenuItem>
                                </DropdownMenuContent>
                             </DropdownMenu>
                          </TableCell>
                       </TableRow>
                    ))}
                 </TableBody>
              </Table>
           </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}