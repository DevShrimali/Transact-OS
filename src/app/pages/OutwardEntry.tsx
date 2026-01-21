import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card, CardContent, CardHeader } from '@/app/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { Badge } from '@/app/components/ui/badge';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Truck,
  PackageCheck,
  Plane,
  Box
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

export function OutwardEntry() {
  const [isEntryOpen, setIsEntryOpen] = useState(false);

  // Mock data for outward entries list
  const outwardEntries = [
    { id: 'OWD-001', customer: 'Global Motors', orderNo: 'ORD-2024-001', date: '2024-01-15', items: 12, total: '$4,250.00', status: 'Dispatched' },
    { id: 'OWD-002', customer: 'Nexus Systems', orderNo: 'ORD-2024-002', date: '2024-01-14', items: 5, total: '$1,890.00', status: 'Delivered' },
    { id: 'OWD-003', customer: 'Hyperion Corp', orderNo: 'ORD-2024-003', date: '2024-01-13', items: 24, total: '$12,100.00', status: 'Processing' },
    { id: 'OWD-004', customer: 'Vanguard Retail', orderNo: 'ORD-2024-004', date: '2024-01-12', items: 8, total: '$2,670.00', status: 'Dispatched' },
    { id: 'OWD-005', customer: 'Global Motors', orderNo: 'ORD-2024-005', date: '2024-01-11', items: 15, total: '$5,540.00', status: 'Delivered' },
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
          <Badge variant="outline" className="text-[10px] font-bold tracking-[0.2em] px-2 py-0 border-blue-200 text-blue-700 uppercase">Logistics</Badge>
          <h1 className="text-4xl font-medium tracking-tighter text-gray-900">Dispatch Ledger</h1>
          <p className="text-muted-foreground font-medium">Outbound shipment tracking and delivery manifests.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-12 px-6 border-muted bg-background shadow-sm gap-2 font-bold hidden md:flex">
             <Filter className="h-4 w-4" /> Filter
          </Button>
          <Sheet open={isEntryOpen} onOpenChange={setIsEntryOpen}>
            <SheetTrigger asChild>
              <Button className="h-12 px-6 shadow-xl shadow-primary/20 gap-2 font-bold tracking-tight">
                <Box className="h-4 w-4" /> Create Manifest
              </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-2xl overflow-y-auto px-0 border-none bg-background shadow-2xl">
              <div className="px-10 pb-32 pt-10">
                <SheetHeader className="mb-12">
                  <div className="h-14 w-14 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-600 mb-6 shadow-inner border border-orange-500/20">
                    <Box className="h-7 w-7" />
                  </div>
                  <SheetTitle className="text-3xl font-black tracking-tight">New Dispatch Entry</SheetTitle>
                  <SheetDescription className="text-base font-medium">
                    Create delivery note and assign carrier details.
                  </SheetDescription>
                </SheetHeader>
                
                <div className="space-y-12">
                  {/* Destination Information */}
                  <section className="space-y-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1.5 h-6 bg-orange-500 rounded-full" />
                      <h3 className="font-black text-xl tracking-tight">Destination Information</h3>
                    </div>
                    <div className="space-y-6">
                      <div className="space-y-2.5">
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Client / Destination</Label>
                        <Select>
                          <SelectTrigger className="h-12 border-none bg-muted/50 font-bold focus:ring-orange-500/20">
                            <SelectValue placeholder="Search client..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="global" className="font-bold">Global Motors</SelectItem>
                            <SelectItem value="nexus" className="font-bold">Nexus Systems</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2.5">
                          <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Order Ref.</Label>
                          <Input 
                            placeholder="ORD-2024-XXX" 
                            className="h-12 border-none bg-muted/50 focus-visible:ring-orange-500/20 font-mono uppercase font-bold" 
                          />
                        </div>
                        <div className="space-y-2.5">
                          <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Dispatch Date</Label>
                          <Input 
                            type="date" 
                            className="h-12 border-none bg-muted/50 focus-visible:ring-orange-500/20 font-bold" 
                          />
                        </div>
                      </div>
                      <div className="space-y-2.5">
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Shipping Address</Label>
                        <Input 
                          placeholder="Enter primary delivery address..." 
                          className="h-12 border-none bg-muted/50 focus-visible:ring-orange-500/20 font-bold" 
                        />
                      </div>
                    </div>
                  </section>

                  {/* Manifest Items */}
                  <section className="space-y-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-6 bg-orange-500 rounded-full" />
                        <h3 className="font-black text-xl tracking-tight">Manifest Items</h3>
                      </div>
                      <Button variant="outline" size="sm" className="h-8 text-xs font-bold">+ Add Row</Button>
                    </div>
                    <div className="border rounded-xl overflow-hidden bg-muted/20">
                      <Table>
                        <TableHeader className="bg-muted/50">
                          <TableRow>
                            <TableHead className="h-9 text-[10px] font-black uppercase">Item SKU</TableHead>
                            <TableHead className="h-9 text-[10px] font-black uppercase w-20">Qty</TableHead>
                            <TableHead className="h-9 text-[10px] font-black uppercase w-24 text-right">Value</TableHead>
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
                  </section>

                  <div className="pt-10 flex gap-4">
                    <Button variant="outline" className="flex-1 h-12 text-muted-foreground font-bold" onClick={() => setIsEntryOpen(false)}>Cancel</Button>
                    <Button className="flex-1 h-12 shadow-xl shadow-orange-500/20 font-black tracking-wide bg-orange-600 text-white hover:bg-orange-700">Generate Manifest</Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-2">
         {[
           { label: 'Active Shipments', value: '8', icon: Truck, color: 'text-blue-500', bg: 'bg-blue-500/10' },
           { label: 'Delivered (24h)', value: '24', icon: PackageCheck, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
           { label: 'Logistics Cost', value: '$2.4k', icon: Plane, color: 'text-purple-500', bg: 'bg-purple-500/10' },
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
                    <Input placeholder="Search manifests..." className="pl-9 h-9 border-none bg-background shadow-sm" />
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
                       <TableHead className="w-[120px] font-black text-[11px] uppercase tracking-wider">Manifest ID</TableHead>
                       <TableHead className="font-black text-[11px] uppercase tracking-wider">Client Destination</TableHead>
                       <TableHead className="font-black text-[11px] uppercase tracking-wider">Order Ref.</TableHead>
                       <TableHead className="font-black text-[11px] uppercase tracking-wider text-right">Value</TableHead>
                       <TableHead className="font-black text-[11px] uppercase tracking-wider text-center">Status</TableHead>
                       <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                 </TableHeader>
                 <TableBody>
                    {outwardEntries.map((entry) => (
                       <TableRow key={entry.id} className="group hover:bg-muted/30">
                          <TableCell className="font-mono text-xs font-medium text-muted-foreground">
                             {entry.id}
                          </TableCell>
                          <TableCell>
                             <div className="flex flex-col">
                                <span className="font-bold text-sm tracking-tight">{entry.customer}</span>
                                <span className="text-[10px] text-muted-foreground uppercase">{entry.date}</span>
                             </div>
                          </TableCell>
                          <TableCell className="font-mono text-xs">{entry.orderNo}</TableCell>
                          <TableCell className="text-right font-black text-sm">{entry.total}</TableCell>
                          <TableCell className="text-center">
                             <Badge 
                                variant="outline" 
                                className={cn(
                                   "text-[10px] font-bold uppercase tracking-widest border-0",
                                   entry.status === 'Delivered' ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200" : 
                                   entry.status === 'Dispatched' ? "bg-blue-100 text-blue-700 hover:bg-blue-200" :
                                   "bg-amber-100 text-amber-700 hover:bg-amber-200"
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
                                   <DropdownMenuItem>Track Shipment</DropdownMenuItem>
                                   <DropdownMenuItem>Print Label</DropdownMenuItem>
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