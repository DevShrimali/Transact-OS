import { useState } from "react";
import {
  Search,
  ShoppingCart,
  CreditCard,
  User,
  Printer,
  CheckCircle,
  RefreshCcw,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  UserPlus,
  X,
  AlertTriangle,
  ShieldCheck,
  MapPin,
  DollarSign,
  Clock,
  Scan,
  Package,
  History,
  Receipt,
  Wallet,
  Building2,
  Zap,
  ChevronRight,
  ArrowUpRight,
  Layers,
  Smartphone
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";
import { Label } from "@/app/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/app/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/app/components/ui/utils";

type POSStep = "start" | "search" | "cart" | "payment" | "receipt";
type PaymentMode = "pay-now" | "pay-later-full" | "pay-later-partial";

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  creditLimit: number;
  availableLimit: number;
  balance: number;
  status: "good" | "warning" | "critical";
  recentTransactions: { date: string; amount: number }[];
}

interface PaymentMethod {
  type: "cash" | "card" | "upi";
  amount: number;
}

interface RecentSale {
  id: string;
  date: string;
  time: string;
  amount: number;
  items: number;
  customer?: string;
  paymentMethod: string;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};



export function POS() {
  const [step, setStep] = useState<POSStep>("start");
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Ibuprofen 200mg",
      price: 12.5,
      qty: 2,
      tax: 0.8,
    },
    {
      id: 2,
      name: "Bandages Large",
      price: 5.0,
      qty: 1,
      tax: 0.3,
    },
  ]);

  // Payment flow states
  const [paymentMode, setPaymentMode] =
    useState<PaymentMode | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<
    PaymentMethod[]
  >([]);
  const [partialCreditAmount, setPartialCreditAmount] =
    useState("");
  const [currentPaymentType, setCurrentPaymentType] = useState<
    "cash" | "card" | "upi" | null
  >(null);
  const [currentPaymentAmount, setCurrentPaymentAmount] =
    useState("");

  // Pay Later Logic States
  const [showPayLaterModal, setShowPayLaterModal] =
    useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchStatus, setSearchStatus] = useState<
    "idle" | "searching" | "found" | "not-found"
  >("idle");
  const [selectedCustomer, setSelectedCustomer] =
    useState<Customer | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // New Customer Form State
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    addressStreet: "",
    addressCity: "",
    addressZip: "",
    creditLimit: "",
  });
  const [formErrors, setFormErrors] = useState<
    Record<string, string>
  >({});

  // Recent sales data
  const recentSales: RecentSale[] = [
    {
      id: "TXN-1245",
      date: "2024-01-19",
      time: "14:23",
      amount: 156.5,
      items: 3,
      customer: "John Doe",
      paymentMethod: "Card",
    },
    {
      id: "TXN-1244",
      date: "2024-01-19",
      time: "13:45",
      amount: 89.0,
      items: 2,
      paymentMethod: "Cash",
    },
    {
      id: "TXN-1243",
      date: "2024-01-19",
      time: "12:10",
      amount: 234.75,
      items: 5,
      customer: "Jane Smith",
      paymentMethod: "Credit",
    },
    {
      id: "TXN-1242",
      date: "2024-01-19",
      time: "11:30",
      amount: 45.25,
      items: 1,
      paymentMethod: "UPI",
    },
    {
      id: "TXN-1241",
      date: "2024-01-19",
      time: "10:15",
      amount: 312.0,
      items: 7,
      paymentMethod: "Card",
    },
  ];

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );
  const taxTotal = cart.reduce(
    (acc, item) => acc + item.tax * item.qty,
    0,
  );
  const total = subtotal + taxTotal;

  const totalPaid = paymentMethods.reduce(
    (sum, pm) => sum + pm.amount,
    0,
  );
  const remainingToPay =
    paymentMode === "pay-later-partial"
      ? (parseFloat(partialCreditAmount) || 0) - totalPaid
      : total - totalPaid;

  const handleStart = () => setStep("search");

  const addToCart = () => {
    setCart([
      ...cart,
      {
        id: Date.now(),
        name: "New Item",
        price: 10.0,
        qty: 1,
        tax: 0.5,
      },
    ]);
  };

  const handlePaymentModeSelect = (mode: PaymentMode) => {
    setPaymentMode(mode);
    setPaymentMethods([]);
    setCurrentPaymentType(null);
    setCurrentPaymentAmount("");

    if (
      mode === "pay-later-full" ||
      mode === "pay-later-partial"
    ) {
      setShowPayLaterModal(true);
      setSearchStatus("idle");
      setSearchQuery("");
      setSelectedCustomer(null);
      setIsAddingNew(false);
    }
  };

  const addPaymentMethod = () => {
    if (
      currentPaymentType &&
      currentPaymentAmount &&
      parseFloat(currentPaymentAmount) > 0
    ) {
      const amount = parseFloat(currentPaymentAmount);
      if (amount > remainingToPay) {
        alert(
          `Amount exceeds remaining balance of $${remainingToPay.toFixed(2)}`,
        );
        return;
      }

      setPaymentMethods([
        ...paymentMethods,
        {
          type: currentPaymentType,
          amount: amount,
        },
      ]);

      setCurrentPaymentType(null);
      setCurrentPaymentAmount("");
    }
  };

  const removePaymentMethod = (index: number) => {
    setPaymentMethods(
      paymentMethods.filter((_, i) => i !== index),
    );
  };

  const performSearch = () => {
    if (!searchQuery) return;
    setSearchStatus("searching");

    // Mock Search Logic
    setTimeout(() => {
      if (searchQuery.toLowerCase().includes("john")) {
        setSelectedCustomer({
          id: "CUST-8821",
          name: "John Doe",
          phone: "(555) 123-4567",
          email: "john.doe@example.com",
          address: "123 Pine St, Seattle, WA",
          creditLimit: 5000,
          availableLimit: 4200,
          balance: 800,
          status: "good",
          recentTransactions: [
            { date: "2023-10-15", amount: 150.0 },
            { date: "2023-09-22", amount: 650.0 },
          ],
        });
        setSearchStatus("found");
      } else if (searchQuery.toLowerCase().includes("jane")) {
        setSelectedCustomer({
          id: "CUST-9902",
          name: "Jane Smith",
          phone: "(555) 987-6543",
          email: "jane.s@example.com",
          address: "456 Oak Ave, Portland, OR",
          creditLimit: 1000,
          availableLimit: 50,
          balance: 950,
          status: "critical",
          recentTransactions: [
            { date: "2023-10-20", amount: 900.0 },
            { date: "2023-10-10", amount: 50.0 },
          ],
        });
        setSearchStatus("found");
      } else {
        setSelectedCustomer(null);
        setSearchStatus("not-found");
      }
    }, 600);
  };

  const validateNewCustomer = () => {
    const errors: Record<string, string> = {};
    if (newCustomer.name.length < 2)
      errors.name = "Name must be at least 2 characters";
    if (!/^\d{10,}$/.test(newCustomer.phone.replace(/\D/g, "")))
      errors.phone = "Valid 10+ digit phone required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newCustomer.email))
      errors.email = "Invalid email format";
    if (
      !newCustomer.addressStreet ||
      !newCustomer.addressCity ||
      !newCustomer.addressZip
    )
      errors.address = "Full address required";
    if (
      !newCustomer.creditLimit ||
      isNaN(Number(newCustomer.creditLimit))
    )
      errors.creditLimit = "Valid credit limit required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveNewCustomer = () => {
    if (validateNewCustomer()) {
      const createdCustomer: Customer = {
        id: `CUST-${Math.floor(Math.random() * 10000)}`,
        name: newCustomer.name,
        phone: newCustomer.phone,
        email: newCustomer.email,
        address: `${newCustomer.addressStreet}, ${newCustomer.addressCity} ${newCustomer.addressZip}`,
        creditLimit: Number(newCustomer.creditLimit),
        availableLimit: Number(newCustomer.creditLimit),
        balance: 0,
        status: "good",
        recentTransactions: [],
      };

      setSelectedCustomer(createdCustomer);
      setSearchStatus("found");
      setIsAddingNew(false);
    }
  };

  const confirmPayLater = () => {
    if (!selectedCustomer) return;

    const creditAmount =
      paymentMode === "pay-later-full"
        ? total
        : total - (parseFloat(partialCreditAmount) || 0);

    if (selectedCustomer.availableLimit < creditAmount) {
      alert("Transaction declined: Insufficient credit limit.");
      return;
    }

    setShowPayLaterModal(false);
  };

  const canCompletePayment = () => {
    if (paymentMode === "pay-now") {
      return totalPaid >= total;
    } else if (paymentMode === "pay-later-full") {
      return selectedCustomer !== null;
    } else if (paymentMode === "pay-later-partial") {
      const payNowAmount = parseFloat(partialCreditAmount) || 0;
      return (
        payNowAmount > 0 &&
        payNowAmount < total &&
        totalPaid >= payNowAmount &&
        selectedCustomer !== null
      );
    }
    return false;
  };

  const handleCompletePayment = () => {
    if (canCompletePayment()) {
      setStep("receipt");
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-50/50 -m-6 p-6 overflow-hidden">
      {/* Dynamic Navigation Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 px-2"
      >
        <div className="space-y-1">
          <Badge variant="outline" className="text-[10px] font-black tracking-[0.2em] px-2 py-0 border-primary/30 text-primary uppercase">Active Session</Badge>
          <h1 className="text-4xl font-black tracking-tighter flex items-center gap-3">
             <Zap className="h-8 w-8 text-primary fill-primary" /> Transact <span className="text-muted-foreground/30 font-light not-italic">OS</span>
          </h1>
        </div>

        <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100">
          {[
            { id: "start", label: "Control", icon: Building2 },
            { id: "search", label: "Order", icon: ShoppingCart },
            { id: "payment", label: "Escrow", icon: Wallet },
            { id: "receipt", label: "Summary", icon: Receipt },
          ].map((s, idx, arr) => (
            <div key={s.id} className="flex items-center">
              <button
                onClick={() => setStep(s.id as POSStep)}
                className={cn(
                  "flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all relative group",
                  step === s.id
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {step === s.id && (
                  <motion.div 
                    layoutId="activeStepBg"
                    className="absolute inset-0 bg-primary/5 rounded-xl border border-primary/20 shadow-inner"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <s.icon className={cn("h-3.5 w-3.5 relative z-10 transition-transform group-hover:scale-110", step === s.id ? "text-primary" : "opacity-40")} />
                <span className="relative z-10">{s.label}</span>
              </button>
              {idx < arr.length - 1 && <ChevronRight className="h-3 w-3 text-slate-200 mx-1" />}
            </div>
          ))}
        </div>
      </motion.div>

      {/* View Surface */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-20">
        <AnimatePresence mode="wait">
          {step === "start" && (
            <motion.div
              key="start"
              variants={container}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, x: -20 }}
              className="space-y-10 px-2"
            >
              {/* Quick Action Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-none shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group cursor-pointer bg-primary text-primary-foreground" onClick={handleStart}>
                   <CardContent className="p-8 flex flex-col items-center justify-center text-center space-y-4">
                      <div className="h-16 w-16 rounded-3xl bg-white/20 flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform duration-500">
                         <Plus className="h-8 w-8" />
                      </div>
                      <div>
                         <h3 className="text-xl font-black uppercase tracking-tighter">New Transaction</h3>
                         <p className="text-primary-foreground/60 text-xs font-bold tracking-widest mt-1 uppercase">Initialize fresh terminal</p>
                      </div>
                   </CardContent>
                </Card>

                {[
                   { label: 'Network Sync', icon: RefreshCcw, desc: 'Inventory Alignment', color: 'text-amber-600', bg: 'bg-amber-100' },
                   { label: 'Open Escrow', icon: Wallet, desc: 'Pending Settlements', color: 'text-blue-600', bg: 'bg-blue-100' },
                   { label: 'System Audit', icon: ShieldCheck, desc: 'Session Verification', color: 'text-emerald-600', bg: 'bg-emerald-100' }
                ].map((action, i) => (
                  <Card key={i} className="border-none shadow-sm hover:shadow-lg transition-all duration-500 overflow-hidden group cursor-pointer">
                    <CardContent className="p-8 flex flex-col items-center justify-center text-center space-y-4">
                      <div className={cn("h-16 w-16 rounded-3xl flex items-center justify-center transition-transform duration-500 group-hover:-rotate-12", action.bg, action.color)}>
                         <action.icon className="h-7 w-7" />
                      </div>
                      <div>
                         <h3 className="text-xl font-black tracking-tighter uppercase">{action.label}</h3>
                         <p className="text-muted-foreground text-[10px] font-black tracking-widest mt-1 uppercase">{action.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Forensic Transaction Feed */}
              <Card className="border-none shadow-sm overflow-hidden bg-background">
                <CardHeader className="p-8 border-b border-slate-50 flex-row items-center justify-between">
                   <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-lg">
                         <History className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-black tracking-tighter">Diurnal Archive</CardTitle>
                        <CardDescription className="font-bold text-xs uppercase tracking-widest opacity-50">surveillance of active fiscal nodes</CardDescription>
                      </div>
                   </div>
                   <Button variant="ghost" className="rounded-xl font-black uppercase text-[10px] tracking-widest gap-2 bg-slate-50">
                      Export Logs <ArrowUpRight className="h-3 w-3" />
                   </Button>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-slate-50/50">
                          <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-muted-foreground">Entity ID</th>
                          <th className="px-4 py-5 text-left text-[10px] font-black uppercase tracking-widest text-muted-foreground">Temporal Data</th>
                          <th className="px-4 py-5 text-left text-[10px] font-black uppercase tracking-widest text-muted-foreground">Associated Actor</th>
                          <th className="px-4 py-5 text-right text-[10px] font-black uppercase tracking-widest text-muted-foreground">Volume</th>
                          <th className="px-4 py-5 text-right text-[10px] font-black uppercase tracking-widest text-muted-foreground">Value Index</th>
                          <th className="px-4 py-5 text-center text-[10px] font-black uppercase tracking-widest text-muted-foreground">Settlement</th>
                          <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-muted-foreground whitespace-nowrap">Protocol</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50 font-bold">
                        {recentSales.map((sale) => (
                          <tr key={sale.id} className="group hover:bg-slate-50 transition-colors">
                            <td className="px-8 py-5">
                               <div className="flex flex-col">
                                  <span className="text-xs font-mono text-primary">{sale.id}</span>
                                  <span className="text-[10px] opacity-30">HEX_V_0x{sale.id.split('-')[1]}</span>
                               </div>
                            </td>
                            <td className="px-4 py-5">
                               <div className="flex flex-col">
                                  <span className="text-xs">{sale.time}</span>
                                  <span className="text-[10px] font-medium opacity-30">{sale.date}</span>
                               </div>
                            </td>
                            <td className="px-4 py-5">
                               {sale.customer ? (
                                 <div className="flex items-center gap-2">
                                    <div className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-[8px] font-black text-slate-500 uppercase">
                                       {sale.customer.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <span className="text-xs">{sale.customer}</span>
                                 </div>
                               ) : (
                                 <Badge variant="outline" className="text-[9px] font-black uppercase tracking-tighter opacity-40">Unregistered Actor</Badge>
                               )}
                            </td>
                            <td className="px-4 py-5 text-right font-mono text-xs">{sale.items} UNITS</td>
                            <td className="px-4 py-5 text-right font-black text-sm">${sale.amount.toFixed(2)}</td>
                            <td className="px-4 py-5 text-center text-[10px]">
                               <Badge variant="outline" className="font-black uppercase tracking-widest text-[9px] border-primary/20 text-primary bg-primary/5">{sale.paymentMethod}</Badge>
                            </td>
                            <td className="px-8 py-5 text-right">
                               <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity bg-white border border-slate-100 shadow-sm">
                                  <Printer className="w-3.5 h-3.5" />
                               </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {(step === "search" || step === "cart") && (
            <motion.div
              key="order"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-12 gap-8 h-full px-2"
            >
              {/* Entity Selector (Left) */}
              <div className="col-span-12 lg:col-span-7 space-y-8">
                <Card className="border-none shadow-sm overflow-hidden bg-background">
                  <CardHeader className="p-8 pb-4">
                    <CardTitle className="text-2xl font-black tracking-tighter">Entity Selection</CardTitle>
                    <div className="flex gap-3 mt-4">
                      <div className="relative flex-1 group">
                        <Scan className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/30 transition-colors group-focus-within:text-primary" />
                        <Input
                          placeholder="Inject SKU or scan physical node identifier..."
                          className="h-14 pl-12 border-none bg-slate-50 focus-visible:ring-primary/20 text-lg font-black tracking-tight"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                           <Badge variant="outline" className="text-[10px] font-black uppercase opacity-20">Ctrl + F</Badge>
                        </div>
                      </div>
                      <Button className="h-14 w-14 rounded-2xl shadow-xl shadow-primary/20 p-0 transform hover:scale-105 transition-transform">
                        <Search className="w-6 h-6" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8 pt-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.02, y: -4 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={addToCart}
                          className="flex flex-col items-start p-5 rounded-3xl bg-slate-50/50 border border-slate-100/50 hover:bg-white hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all text-left group overflow-hidden relative"
                        >
                          <div className="w-full h-32 bg-white rounded-2xl mb-4 flex items-center justify-center border border-slate-100 shadow-inner group-hover:scale-110 transition-transform duration-500">
                             <Package className="w-10 h-10 text-slate-200 group-hover:text-primary/40 transition-colors" />
                             <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center">
                                   <Plus className="h-3 w-3" />
                                </div>
                             </div>
                          </div>
                          <div className="space-y-1 w-full">
                            <h4 className="font-black text-sm tracking-tight truncate leading-tight uppercase">Industrial Component {i}A</h4>
                            <p className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest">SKU: 0x{i}F92B</p>
                            <div className="pt-2 flex items-center justify-between">
                               <span className="text-lg font-black text-primary">$12.50</span>
                               <span className="text-[9px] font-black uppercase tracking-widest opacity-20">v2.44</span>
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Order Calculus (Right) */}
              <div className="col-span-12 lg:col-span-5 flex flex-col gap-8">
                <Card className="flex-1 flex flex-col border-none shadow-2xl overflow-hidden bg-background relative">
                   <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/50 to-primary" />
                   <CardHeader className="p-8 pb-4">
                    <CardTitle className="flex justify-between items-center text-xl font-black tracking-tighter uppercase">
                      <span>Order Calculus</span>
                      <Badge variant="outline" className="border-primary/20 text-primary font-black uppercase text-[10px] tracking-widest bg-primary/5 px-3">
                        Terminal Node #A44
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-y-auto px-8 max-h-[500px] no-scrollbar">
                    <div className="space-y-6">
                      {cart.map((item, idx) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="flex justify-between items-start pb-6 border-b border-slate-50 last:border-0 group"
                        >
                          <div className="space-y-1">
                            <div className="text-sm font-black tracking-tight leading-tight uppercase group-hover:text-primary transition-colors">
                              {item.name}
                            </div>
                            <div className="text-[10px] font-black text-muted-foreground/50 uppercase tracking-widest">
                              UNIT_VAL: ${item.price.toFixed(2)}
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-3">
                            <div className="font-black text-sm">
                              ${(item.price * item.qty).toFixed(2)}
                            </div>
                            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 rounded-lg hover:bg-white hover:text-rose-600 transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-8 text-center text-xs font-black">
                                {item.qty}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 rounded-lg hover:bg-white hover:text-emerald-600 transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                      {cart.length === 0 && (
                         <div className="h-full flex flex-col items-center justify-center text-center opacity-20 py-20 pointer-events-none">
                            <ShoppingCart className="h-20 w-20 mb-4" />
                            <p className="font-black uppercase tracking-widest text-sm">Logical Cart Emptied</p>
                         </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="p-8 bg-slate-50/50 flex flex-col gap-6 border-t border-slate-100 mt-auto">
                    <div className="space-y-3 w-full">
                      <div className="flex justify-between text-xs font-black uppercase tracking-widest text-muted-foreground/60">
                        <span>Physical Valuation</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xs font-black uppercase tracking-widest text-muted-foreground/60">
                        <span>Fiscal Levy (6.5%)</span>
                        <span>${taxTotal.toFixed(2)}</span>
                      </div>
                      <Separator className="bg-slate-200" />
                      <div className="flex justify-between font-black text-3xl tracking-tighter items-end">
                        <span className="text-[10px] not-italic font-black uppercase tracking-[0.2em] mb-2 text-primary opacity-40">Grand Total</span>
                        <div className="flex items-start">
                           <span className="text-sm pt-1">$</span>
                           <span>{total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      size="lg"
                      className="w-full h-16 rounded-2xl shadow-2xl shadow-primary/30 font-black uppercase text-xs tracking-[0.2em] gap-3 transform hover:scale-[1.02] active:scale-95 transition-all"
                      onClick={() => setStep("payment")}
                      disabled={cart.length === 0}
                    >
                      Initialize Escrow <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </motion.div>
          )}

      {step === "payment" && (
        <motion.div
          key="payment"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="flex-1 flex items-center justify-center px-2"
        >
          <Card className="w-full max-w-4xl border-none shadow-2xl overflow-hidden bg-background">
            <div className="grid grid-cols-12">
               {/* Selection Panel */}
               <div className="col-span-12 lg:col-span-5 bg-slate-50/50 p-10 border-r border-slate-100 flex flex-col justify-between">
                  <div className="space-y-8">
                     <div className="space-y-2">
                        <Badge variant="outline" className="text-[10px] font-black tracking-widest uppercase opacity-40">Escrow Configuration</Badge>
                        <h2 className="text-3xl font-black tracking-tighter uppercase leading-none">Settlement <br/>Protocol</h2>
                     </div>

                     <div className="space-y-4">
                        {[
                           { id: 'pay-now', label: 'Instant Settlement', desc: 'Direct fiscal injection', icon: Zap },
                           { id: 'pay-later-full', label: 'Deferred Liability', desc: 'Customer credit line', icon: Clock },
                           { id: 'pay-later-partial', label: 'Hybrid Escrow', desc: 'Mixed payment matrix', icon: Layers }
                        ].map((mode) => (
                           <button
                              key={mode.id}
                              onClick={() => handlePaymentModeSelect(mode.id as PaymentMode)}
                              className={cn(
                                 "w-full flex items-center gap-4 p-5 rounded-3xl transition-all text-left border-2 group",
                                 paymentMode === mode.id 
                                    ? "bg-primary border-primary text-primary-foreground shadow-xl shadow-primary/20" 
                                    : "bg-white border-transparent hover:border-slate-200"
                              )}
                           >
                              <div className={cn(
                                 "h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110",
                                 paymentMode === mode.id ? "bg-white/20" : "bg-slate-100"
                              )}>
                                 <mode.icon className="h-6 w-6" />
                              </div>
                              <div>
                                 <div className="font-black text-sm uppercase tracking-tight">{mode.label}</div>
                                 <div className={cn("text-[10px] font-bold uppercase tracking-widest opacity-40", paymentMode === mode.id ? "text-primary-foreground" : "")}>{mode.desc}</div>
                              </div>
                           </button>
                        ))}
                     </div>
                  </div>

                  <div className="pt-10 flex gap-4">
                     <div className="flex-1 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                        <div className="text-[10px] font-black uppercase opacity-30 tracking-widest mb-1">Total Valuation</div>
                        <div className="text-2xl font-black tracking-tighter">${total.toFixed(2)}</div>
                     </div>
                     <Button variant="ghost" size="icon" className="h-16 w-16 rounded-2xl bg-white border border-slate-100" onClick={() => setStep("cart")}>
                        <ArrowLeft className="h-6 w-6" />
                     </Button>
                  </div>
               </div>

               {/* Interaction Panel */}
               <div className="col-span-12 lg:col-span-7 p-10 flex flex-col">
                  {paymentMode === "pay-now" ? (
                     <div className="space-y-8 flex-1">
                        <div className="space-y-4">
                           <h3 className="text-xs font-black uppercase tracking-[0.2em] opacity-30 text-primary">Injection Matrix</h3>
                           <div className="grid grid-cols-3 gap-4">
                              {[
                                 { id: 'cash', label: 'Physical', icon: DollarSign },
                                 { id: 'card', label: 'Digital', icon: CreditCard },
                                 { id: 'upi', label: 'Virtual', icon: Smartphone }
                              ].map((m) => (
                                 <button
                                    key={m.id}
                                    onClick={() => setCurrentPaymentType(m.id as any)}
                                    className={cn(
                                       "flex flex-col items-center justify-center gap-3 p-6 rounded-3xl border-2 transition-all group",
                                       currentPaymentType === m.id ? "border-primary bg-primary/5 shadow-inner" : "border-slate-50 bg-slate-50/50 hover:border-slate-200"
                                    )}
                                 >
                                    <m.icon className={cn("h-7 w-7 transition-transform group-hover:scale-110", currentPaymentType === m.id ? "text-primary" : "opacity-20")} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">{m.label}</span>
                                 </button>
                              ))}
                           </div>
                        </div>

                        {currentPaymentType && (
                           <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                              <div className="bg-slate-900 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
                                 <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-10 -mt-10" />
                                 <Label className="text-white/40 text-[10px] uppercase font-black tracking-[0.3em] mb-4 block">Quantum Entry ($)</Label>
                                 <div className="flex gap-4">
                                    <Input
                                       type="number"
                                       className="h-16 bg-white/5 border-none text-3xl font-black text-white focus-visible:ring-primary/40 placeholder:text-white/10"
                                       placeholder="0.00"
                                       value={currentPaymentAmount}
                                       onChange={(e) => setCurrentPaymentAmount(e.target.value)}
                                    />
                                    <Button className="h-16 px-10 rounded-2xl font-black text-xs uppercase tracking-widest group-hover:scale-105 transition-transform" onClick={addPaymentMethod}>
                                       Commit Asset
                                    </Button>
                                 </div>
                              </div>
                           </motion.div>
                        )}

                        <div className="space-y-4">
                           <h3 className="text-xs font-black uppercase tracking-[0.2em] opacity-30 text-primary">Settled Breakdown</h3>
                           <div className="space-y-2">
                              {paymentMethods.map((pm, idx) => (
                                 <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 font-bold group">
                                    <div className="flex items-center gap-3">
                                       <Badge variant="outline" className="bg-white text-[9px] uppercase tracking-tighter px-2">{pm.type}</Badge>
                                       <span className="text-sm">Settlement Node_{idx + 1}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                       <span className="text-primary">${pm.amount.toFixed(2)}</span>
                                       <button onClick={() => removePaymentMethod(idx)} className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-rose-50 hover:text-rose-500 transition-colors">
                                          <X className="h-4 w-4" />
                                       </button>
                                    </div>
                                 </div>
                              ))}
                              {paymentMethods.length === 0 && <div className="p-8 border-2 border-dashed border-slate-100 rounded-[2rem] text-center text-[10px] font-black uppercase tracking-[0.3em] opacity-20">Awaiting fiscal injection...</div>}
                           </div>
                        </div>

                        <div className="pt-6 border-t border-slate-100 mt-auto">
                           <Button
                              disabled={!canCompletePayment()}
                              onClick={handleCompletePayment}
                              className="w-full h-16 rounded-[2rem] font-black uppercase text-xs tracking-[0.3em] gap-3 shadow-2xl shadow-primary/20 active:scale-95 transition-all"
                           >
                              Finalize Settlement <ShieldCheck className="h-4 w-4" />
                           </Button>
                        </div>
                     </div>
                  ) : (
                      <div className="space-y-8 flex-1">
                         <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] opacity-30 text-primary">
                               {paymentMode === "pay-later-full" ? "Credit Settlement" : "Hybrid Configuration"}
                            </h3>

                            <Card className="border-2 border-slate-100 bg-slate-50/50 p-6 rounded-3xl group">
                               <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-4">
                                     <div className="h-12 w-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center">
                                        <User className="h-6 w-6 text-slate-400" />
                                     </div>
                                     <div>
                                        <div className="text-[10px] font-black uppercase tracking-widest opacity-40">Associated Actor</div>
                                        <div className="font-black text-sm uppercase">
                                           {selectedCustomer ? selectedCustomer.name : "Unassigned Entity"}
                                        </div>
                                     </div>
                                  </div>
                                  <Button variant="outline" size="sm" className="rounded-xl font-black uppercase text-[10px] tracking-widest bg-white" onClick={() => setShowPayLaterModal(true)}>
                                     {selectedCustomer ? "Reassign" : "Identify Actor"}
                                  </Button>
                               </div>
                            </Card>

                            {selectedCustomer && (
                               <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="p-6 rounded-3xl bg-emerald-50 border border-emerald-100 flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                     <ShieldCheck className="h-5 w-5 text-emerald-600" />
                                     <span className="text-xs font-black uppercase tracking-tight text-emerald-800">Authorization Active</span>
                                  </div>
                                  <div className="text-xs font-black text-emerald-600">
                                     Limit: ${selectedCustomer.availableLimit.toFixed(2)}
                                  </div>
                               </motion.div>
                            )}
                         </div>

                         {paymentMode === "pay-later-partial" && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                               <h3 className="text-xs font-black uppercase tracking-[0.2em] opacity-30 text-primary">Initial Injection</h3>
                               <div className="bg-slate-900 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
                                  <Label className="text-white/40 text-[10px] uppercase font-black tracking-[0.3em] mb-4 block">Upfront Payment ($)</Label>
                                  <Input
                                     type="number"
                                     className="h-16 bg-white/5 border-none text-3xl font-black text-white focus-visible:ring-primary/40 placeholder:text-white/10"
                                     placeholder="0.00"
                                     value={partialCreditAmount}
                                     onChange={(e) => setPartialCreditAmount(e.target.value)}
                                  />
                               </div>
                               <p className="text-[10px] font-black uppercase tracking-widest opacity-30 text-center">Remaining ${(total - (parseFloat(partialCreditAmount) || 0)).toFixed(2)} will be deferred to credit</p>
                            </motion.div>
                         )}

                         <div className="pt-6 border-t border-slate-100 mt-auto">
                            <Button
                               disabled={!canCompletePayment()}
                               onClick={handleCompletePayment}
                               className="w-full h-16 rounded-[2rem] font-black uppercase text-xs tracking-[0.3em] gap-3 shadow-2xl shadow-primary/20 active:scale-95 transition-all"
                            >
                               {paymentMode === "pay-later-full" ? "Seal Deferred Settlement" : "Finalize Hybrid Escrow"} <ShieldCheck className="h-4 w-4" />
                            </Button>
                         </div>
                      </div>
                   )}
               </div>
            </div>
          </Card>
        </motion.div>
      )}

      {step === "receipt" && (
        <motion.div
          key="receipt"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 flex items-center justify-center px-4"
        >
          <div className="w-full max-w-md relative">
             <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="h-24 w-24 rounded-full bg-emerald-500 shadow-2xl shadow-emerald-500/40 flex items-center justify-center text-white border-8 border-white group">
                   <CheckCircle className="h-10 w-10 group-hover:scale-110 transition-transform" />
                </div>
             </div>

             <Card className="border-none shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden bg-white pt-16">
                <CardHeader className="text-center p-8">
                   <Badge variant="outline" className="text-[10px] font-black tracking-[0.3em] mb-4 border-emerald-200 text-emerald-600 bg-emerald-50">Transaction Sealed</Badge>
                   <CardTitle className="text-4xl font-black tracking-tighter uppercase leading-none mb-2">Ref_Txn #1004A</CardTitle>
                   <CardDescription className="text-[10px] font-black uppercase tracking-widest">System Timestamp: {new Date().toLocaleTimeString()} :: {new Date().toLocaleDateString()}</CardDescription>
                </CardHeader>
                
                <CardContent className="p-8 pt-0 space-y-8">
                   <div className="p-8 rounded-[2rem] bg-slate-900 text-white relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-10 -mt-10" />
                      <div className="flex justify-between items-end relative z-10">
                         <div className="space-y-1">
                            <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Settled Valuation</div>
                            <div className="text-4xl font-black tracking-tighter flex items-start">
                               <span className="text-lg pt-1 mr-1">$</span>
                               <span>{total.toFixed(2)}</span>
                            </div>
                         </div>
                         <div className="h-12 w-12 rounded-xl border border-white/10 flex items-center justify-center bg-white/5">
                            <Zap className="h-6 w-6 text-primary fill-primary" />
                         </div>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <div className="flex justify-between text-xs font-black uppercase tracking-widest opacity-30">
                         <span>Network Confirmation</span>
                         <span>0x_VERIFIED</span>
                      </div>
                      <div className="space-y-2 border-t border-dashed border-slate-100 pt-4">
                         {paymentMethods.map((pm, i) => (
                            <div key={i} className="flex justify-between text-sm font-bold">
                               <span className="opacity-40 uppercase tracking-tighter">Settlement Node_{i+1} ({pm.type})</span>
                               <span className="italic">${pm.amount.toFixed(2)}</span>
                            </div>
                         ))}
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" className="h-14 rounded-2xl font-black uppercase text-[10px] tracking-widest border-slate-100 hover:bg-slate-50 gap-2">
                         <Printer className="h-3.5 w-3.5" /> Output Physical
                      </Button>
                      <Button className="h-14 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-primary/20 gap-2" onClick={() => {
                        setStep("start");
                        setPaymentMode(null);
                        setPaymentMethods([]);
                        setCart([]);
                      }}>
                         <Plus className="h-3.5 w-3.5" /> New Session
                      </Button>
                   </div>
                </CardContent>

                <div className="p-6 bg-slate-50/50 text-center border-t border-slate-100">
                   <p className="text-[9px] font-black uppercase tracking-[.5em] opacity-20 leading-loose">Transact_OS_v4.2.0 // Secured by UIMS Forensics</p>
                </div>
             </Card>
          </div>
        </motion.div>
      )}

      </AnimatePresence>

      {/* Pay Later Modal - Customer Selection */}
      <Dialog
        open={showPayLaterModal}
        onOpenChange={setShowPayLaterModal}
      >
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Credit Authorization</DialogTitle>
            <DialogDescription>
              Identify customer to assign credit transaction.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-6">
            {/* Search Section */}
            {!isAddingNew && (
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-neutral-500" />
                  <Input
                    placeholder="Search by Name, Phone, or Email..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) =>
                      setSearchQuery(e.target.value)
                    }
                    onKeyDown={(e) =>
                      e.key === "Enter" && performSearch()
                    }
                  />
                </div>
                <Button
                  onClick={performSearch}
                  disabled={
                    !searchQuery || searchStatus === "searching"
                  }
                >
                  {searchStatus === "searching"
                    ? "Searching..."
                    : "Search"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsAddingNew(true)}
                  className="gap-2 shrink-0"
                >
                  <UserPlus className="w-4 h-4" /> Add New
                </Button>
              </div>
            )}

            {/* Content Area */}
            <div className="min-h-[200px]">
              {/* State: Not Found */}
              {searchStatus === "not-found" && !isAddingNew && (
                <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
                  <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center">
                    <UserPlus className="w-6 h-6 text-neutral-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      Customer not found
                    </h3>
                    <p className="text-neutral-500 text-sm max-w-xs mx-auto">
                      No customer found matching "{searchQuery}
                      ". Would you like to add them?
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery("");
                        setSearchStatus("idle");
                      }}
                    >
                      Try Again
                    </Button>
                    <Button
                      onClick={() => setIsAddingNew(true)}
                    >
                      Add New Customer
                    </Button>
                  </div>
                </div>
              )}

              {/* State: Found (Credit Card Info) */}
              {searchStatus === "found" && selectedCustomer && (
                <div className="bg-neutral-50 border rounded-xl overflow-hidden">
                  {/* Card Header */}
                  <div className="p-4 border-b bg-white flex justify-between items-start">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center shrink-0 border">
                        <User className="w-6 h-6 text-neutral-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">
                          {selectedCustomer.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-neutral-500">
                          <span>{selectedCustomer.id}</span>
                          <span>•</span>
                          <span>{selectedCustomer.phone}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-xs text-neutral-400">
                          <MapPin className="w-3 h-3" />{" "}
                          {selectedCustomer.address}
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant={
                        selectedCustomer.status === "good"
                          ? "default"
                          : selectedCustomer.status ===
                              "warning"
                            ? "secondary"
                            : "destructive"
                      }
                      className="capitalize"
                    >
                      Status: {selectedCustomer.status}
                    </Badge>
                  </div>

                  {/* Credit Details */}
                  <div className="p-6 grid grid-cols-3 gap-6">
                    <div className="space-y-1">
                      <div className="text-xs font-medium text-neutral-500 uppercase tracking-wide">
                        Available Credit
                      </div>
                      <div
                        className={`text-2xl font-bold ${selectedCustomer.availableLimit < total ? "text-red-600" : "text-green-600"}`}
                      >
                        $
                        {selectedCustomer.availableLimit.toFixed(
                          2,
                        )}
                      </div>
                      <div className="text-xs text-neutral-400">
                        of $
                        {selectedCustomer.creditLimit.toFixed(2)}{" "}
                        limit
                      </div>
                    </div>

                    <div className="space-y-1 border-l pl-6">
                      <div className="text-xs font-medium text-neutral-500 uppercase tracking-wide">
                        Current Balance
                      </div>
                      <div className="text-2xl font-bold text-neutral-900">
                        ${selectedCustomer.balance.toFixed(2)}
                      </div>
                      <div className="text-xs text-neutral-400">
                        Outstanding
                      </div>
                    </div>

                    <div className="space-y-1 border-l pl-6">
                      <div className="text-xs font-medium text-neutral-500 uppercase tracking-wide">
                        This Transaction
                      </div>
                      <div className="text-2xl font-bold text-neutral-900">
                        ${total.toFixed(2)}
                      </div>
                      {selectedCustomer.availableLimit <
                        total && (
                        <div className="flex items-center gap-1 text-xs text-red-600 font-medium">
                          <AlertTriangle className="w-3 h-3" />{" "}
                          Limit Exceeded
                        </div>
                      )}
                    </div>
                  </div>

                  {/* History */}
                  <div className="px-6 pb-6">
                    <h4 className="text-sm font-medium mb-3">
                      Recent Transactions
                    </h4>
                    <div className="space-y-2">
                      {selectedCustomer.recentTransactions.map(
                        (tx, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between text-sm py-2 border-b last:border-0 border-neutral-200"
                          >
                            <span className="text-neutral-600">
                              {tx.date}
                            </span>
                            <span className="font-mono">
                              ${tx.amount.toFixed(2)}
                            </span>
                          </div>
                        ),
                      )}
                      {selectedCustomer.recentTransactions
                        .length === 0 && (
                        <div className="text-sm text-neutral-400">
                          No recent history
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-4 bg-white border-t flex justify-end gap-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery("");
                        setSearchStatus("idle");
                        setSelectedCustomer(null);
                      }}
                    >
                      Search Different
                    </Button>
                    <Button
                      disabled={
                        selectedCustomer.availableLimit < total
                      }
                      onClick={confirmPayLater}
                      className={
                        selectedCustomer.availableLimit < total
                          ? "bg-neutral-200 text-neutral-400"
                          : ""
                      }
                    >
                      Proceed with Transaction
                    </Button>
                  </div>
                </div>
              )}

              {/* State: Add New Customer */}
              {isAddingNew && (
                <div className="border rounded-xl p-6 bg-white space-y-6">
                  <div className="flex justify-between items-center border-b pb-4">
                    <div>
                      <h3 className="font-bold text-lg">
                        Add New Customer
                      </h3>
                      <p className="text-sm text-neutral-500">
                        Enter details for credit authorization.
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsAddingNew(false)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Full Name *</Label>
                      <Input
                        value={newCustomer.name}
                        onChange={(e) =>
                          setNewCustomer({
                            ...newCustomer,
                            name: e.target.value,
                          })
                        }
                        className={
                          formErrors.name
                            ? "border-red-500"
                            : ""
                        }
                      />
                      {formErrors.name && (
                        <span className="text-xs text-red-500">
                          {formErrors.name}
                        </span>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Phone Number *</Label>
                      <Input
                        value={newCustomer.phone}
                        onChange={(e) =>
                          setNewCustomer({
                            ...newCustomer,
                            phone: e.target.value,
                          })
                        }
                        placeholder="(555) 000-0000"
                        className={
                          formErrors.phone
                            ? "border-red-500"
                            : ""
                        }
                      />
                      {formErrors.phone && (
                        <span className="text-xs text-red-500">
                          {formErrors.phone}
                        </span>
                      )}
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label>Email Address *</Label>
                      <Input
                        type="email"
                        value={newCustomer.email}
                        onChange={(e) =>
                          setNewCustomer({
                            ...newCustomer,
                            email: e.target.value,
                          })
                        }
                        className={
                          formErrors.email
                            ? "border-red-500"
                            : ""
                        }
                      />
                      {formErrors.email && (
                        <span className="text-xs text-red-500">
                          {formErrors.email}
                        </span>
                      )}
                    </div>

                    <div className="col-span-2 grid grid-cols-3 gap-4">
                      <div className="col-span-3 space-y-2">
                        <Label>Street Address *</Label>
                        <Input
                          value={newCustomer.addressStreet}
                          onChange={(e) =>
                            setNewCustomer({
                              ...newCustomer,
                              addressStreet: e.target.value,
                            })
                          }
                          className={
                            formErrors.address
                              ? "border-red-500"
                              : ""
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>City *</Label>
                        <Input
                          value={newCustomer.addressCity}
                          onChange={(e) =>
                            setNewCustomer({
                              ...newCustomer,
                              addressCity: e.target.value,
                            })
                          }
                          className={
                            formErrors.address
                              ? "border-red-500"
                              : ""
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Zip Code *</Label>
                        <Input
                          value={newCustomer.addressZip}
                          onChange={(e) =>
                            setNewCustomer({
                              ...newCustomer,
                              addressZip: e.target.value,
                            })
                          }
                          className={
                            formErrors.address
                              ? "border-red-500"
                              : ""
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Credit Limit *</Label>
                        <Input
                          type="number"
                          step="100"
                          value={newCustomer.creditLimit}
                          onChange={(e) =>
                            setNewCustomer({
                              ...newCustomer,
                              creditLimit: e.target.value,
                            })
                          }
                          placeholder="0.00"
                          className={
                            formErrors.creditLimit
                              ? "border-red-500"
                              : ""
                          }
                        />
                      </div>
                    </div>
                    {formErrors.address && (
                      <span className="text-xs text-red-500 col-span-2">
                        {formErrors.address}
                      </span>
                    )}
                    {formErrors.creditLimit && (
                      <span className="text-xs text-red-500 col-span-2">
                        {formErrors.creditLimit}
                      </span>
                    )}
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button
                      variant="outline"
                      onClick={() => setIsAddingNew(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleSaveNewCustomer}>
                      Save Customer
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      </div>
    </div>
  );
}