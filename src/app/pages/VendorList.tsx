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
  Mail, 
  Phone, 
  Building2, 
  ChevronRight,
  Star,
  Clock,
  CheckCircle2,
  ExternalLink
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
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
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

export function VendorList() {
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);

  const stats = [
    { title: 'Registered Nodes', value: '142', icon: Building2, color: 'text-indigo-600', bg: 'bg-indigo-100/50' },
    { title: 'Active Escrows', value: '86', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-100/50' },
    { title: 'Trust Integrity', value: '4.8/5', icon: Star, color: 'text-amber-600', bg: 'bg-amber-100/50' },
    { title: 'Success Protocol', value: '94%', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-100/50' },
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
          <Badge variant="outline" className="text-[10px] font-bold tracking-[0.2em] px-2 py-0 border-blue-200 text-blue-700 uppercase">Procurement Network</Badge>
          <h1 className="text-4xl font-medium tracking-tighter text-gray-900">Supply Chain Partners</h1>
          <p className="text-muted-foreground font-medium">Manage external entity relationships and logistical contact vectors.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-12 px-6 border-muted bg-background shadow-sm gap-2 font-bold">
            <Download className="h-4 w-4" /> Export CSV
          </Button>
          <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
            <SheetTrigger asChild>
              <Button className="h-12 px-8 gap-2 shadow-xl shadow-primary/25 font-black uppercase text-xs tracking-widest">
                <Plus className="h-4 w-4" /> Provision Entity
              </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-2xl overflow-y-auto px-0 border-none bg-background shadow-2xl">
              <div className="px-10 pb-32 pt-10">
                <SheetHeader className="mb-12">
                  <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-6 shadow-inner border border-emerald-500/20">
                    <Building2 className="h-7 w-7" />
                  </div>
                  <SheetTitle className="text-3xl font-black tracking-tight">Provision New Entity</SheetTitle>
                  <SheetDescription className="text-base font-medium">
                    Onboard a new supplier to the system. Provide their business and contact details.
                  </SheetDescription>
                </SheetHeader>
                
                <div className="space-y-12">
                  {/* Company Details */}
                  <section className="space-y-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                      <h3 className="font-black text-xl tracking-tight">Company Details</h3>
                    </div>
                    <div className="space-y-6">
                      <div className="space-y-2.5">
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Legal Business Name</Label>
                        <Input 
                          id="vendor-name" 
                          placeholder="e.g. Global Logistics Corp" 
                          className="h-12 border-none bg-muted/50 focus-visible:ring-emerald-500/20 font-bold"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2.5">
                          <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Tax ID / PAN</Label>
                          <Input 
                            id="tax-id" 
                            placeholder="Enter identification number" 
                            className="h-12 border-none bg-muted/50 focus-visible:ring-emerald-500/20 font-bold"
                          />
                        </div>
                        <div className="space-y-2.5">
                          <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Vendor Category</Label>
                          <Select>
                            <SelectTrigger className="h-12 border-none bg-muted/50 font-bold focus:ring-emerald-500/20">
                              <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="raw" className="font-bold">Raw Materials</SelectItem>
                              <SelectItem value="logistics" className="font-bold">Logistics</SelectItem>
                              <SelectItem value="services" className="font-bold">Services</SelectItem>
                              <SelectItem value="maintenance" className="font-bold">Maintenance</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Primary Contact */}
                  <section className="space-y-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                      <h3 className="font-black text-xl tracking-tight">Primary Contact</h3>
                    </div>
                    <div className="space-y-6">
                      <div className="space-y-2.5">
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Contact Person</Label>
                        <Input 
                          id="contact-person" 
                          placeholder="Full name" 
                          className="h-12 border-none bg-muted/50 focus-visible:ring-emerald-500/20 font-bold"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2.5">
                          <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Email Address</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            placeholder="email@business.com" 
                            className="h-12 border-none bg-muted/50 focus-visible:ring-emerald-500/20 font-bold"
                          />
                        </div>
                        <div className="space-y-2.5">
                          <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Phone Number</Label>
                          <Input 
                            id="phone" 
                            placeholder="+1 (234) 567-890" 
                            className="h-12 border-none bg-muted/50 focus-visible:ring-emerald-500/20 font-bold"
                          />
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Address */}
                  <section className="space-y-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                      <h3 className="font-black text-xl tracking-tight">Address</h3>
                    </div>
                    <div className="space-y-2.5">
                      <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Street Address</Label>
                      <textarea 
                        id="address"
                        className="flex min-h-[100px] w-full rounded-xl border-none bg-muted/50 px-4 py-3 text-sm font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Street, Building, Unit..."
                      />
                    </div>
                  </section>

                  <div className="pt-10 flex gap-4">
                    <Button variant="outline" className="flex-1 h-12 text-muted-foreground font-bold" onClick={() => setIsAddSheetOpen(false)}>Discard</Button>
                    <Button className="flex-1 h-12 shadow-xl shadow-emerald-500/20 font-black tracking-wide bg-emerald-600 text-white hover:bg-emerald-700" onClick={() => setIsAddSheetOpen(false)}>Save Vendor</Button>
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
                <div className={`${stat.bg} ${stat.color} p-3 rounded-2xl`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters & Actions */}
      <motion.div variants={item}>
        <Card className="border-none shadow-sm bg-muted/30">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by name, email, or company..." className="pl-10 bg-background" />
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px] bg-background">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="raw">Raw Materials</SelectItem>
                    <SelectItem value="services">Services</SelectItem>
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

      {/* Table */}
      <motion.div variants={item}>
        <Card className="overflow-hidden border-none shadow-sm">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[80px] font-bold">ID</TableHead>
                <TableHead className="font-bold">Vendor</TableHead>
                <TableHead className="font-bold">Contact Person</TableHead>
                <TableHead className="font-bold">Communication</TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="text-right font-bold pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <TableRow key={i} className="group hover:bg-muted/30 transition-colors">
                  <TableCell className="font-mono text-xs font-semibold text-muted-foreground">
                    V-{1000 + i}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border border-border">
                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=Vendor${i}`} />
                        <AvatarFallback>V{i}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-semibold text-sm group-hover:text-primary transition-colors">Global Supplier {i}</span>
                        <Badge variant="outline" className="w-fit text-[10px] h-4 py-0 leading-none">Raw Materials</Badge>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">John Doe</span>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-tight">Lead Account Mgr</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Mail className="h-3 w-3" /> contact@supplier{i}.com
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Phone className="h-3 w-3" /> +1 (555) 000-00{i}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <div className={cn(
                        "h-1.5 w-1.5 rounded-full animate-pulse",
                        i === 4 ? "bg-amber-500" : "bg-emerald-500"
                      )} />
                      <span className="text-sm font-medium">{i === 4 ? 'On Hold' : 'Active'}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right pr-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel>Vendor Actions</DropdownMenuLabel>
                        <DropdownMenuItem className="gap-2">
                          <ExternalLink className="h-4 w-4" /> Company Portal
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <ChevronRight className="h-4 w-4" /> Order History
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2">
                          Edit Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive gap-2">
                          Deactivate
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center justify-between border-t px-6 py-4 bg-muted/20">
            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Page 1 of 12</span>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                 <button className="h-8 w-8 rounded-md border border-border flex items-center justify-center bg-background disabled:opacity-50" disabled>
                   <span className="sr-only">Prev</span>
                   <ChevronRight className="h-4 w-4 rotate-180" />
                 </button>
                 <button className="h-8 w-8 rounded-md border border-primary bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">1</button>
                 <button className="h-8 w-8 rounded-md border border-border flex items-center justify-center bg-background text-xs">2</button>
                 <button className="h-8 w-8 rounded-md border border-border flex items-center justify-center bg-background">
                   <span className="sr-only">Next</span>
                   <ChevronRight className="h-4 w-4" />
                 </button>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
