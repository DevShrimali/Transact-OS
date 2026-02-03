import React from "react";
import {
  LayoutDashboard,
  Package,
  Users,
  Home,
  FileText,
  Download,
  BarChart3,
  History,
  ShieldAlert,
  CreditCard,
  Building,
  DollarSign,
  Upload,
  Percent,
  LogOut,
  PanelLeft,
  Menu,
  Minimize,
  Maximize,
  Search
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
  SidebarInset,
  SidebarRail,
} from "../ui/sidebar";
import { cn } from "../ui/utils";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";


export type Page =
  | "login"
  | "staff-login"
  | "dashboard"
  | "department-category"
  | "items"
  | "add-item"
  | "discount"
  | "vendors"
  | "warehouse"
  | "invoice"
  | "outward"
  | "outward"
  | "stock"
  | "pos"
  | "ledger"
  | "audit"
  | "label-creation"
  | "reports"
  | "create-company"
  | "profile"
  | "users"
  | "forgot-password"
  | "tax-config"
  | "company-settings"
  | "design-system";

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "department-category", label: "Department & Category", icon: FileText },
  { id: "items", label: "Item List", icon: Package },
  { id: "discount", label: "Discount", icon: Percent },
  { id: "vendors", label: "Vendors", icon: Users },
  { id: "warehouse", label: "Warehouse Model", icon: Home },
  { id: "invoice", label: "Inward List", icon: Download },
  { id: "outward", label: "Outward List", icon: Upload },


  { id: "sep-pos", type: "separator", label: "POS & Sales" },
  { id: "pos", label: "Point of Sale (POS)", icon: CreditCard },
  { id: "stock", label: "View Stock", icon: BarChart3 },
  { id: "label-creation", label: "Print Labels", icon: FileText },

  { id: "sep-admin", type: "separator", label: "Administration" },
  { id: "company-settings", label: "Company Master", icon: Building },
  { id: "tax-config", label: "Tax Configuration", icon: DollarSign },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "ledger", label: "Inventory Ledger", icon: History },
  { id: "users", label: "Staff / Users", icon: Users },
  { id: "audit", label: "Audit Logs", icon: ShieldAlert },
];

export function Layout({ children, currentPage, onNavigate }: LayoutProps) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <SidebarProvider>
      <AppSidebar currentPage={currentPage} onNavigate={onNavigate} />
      
      {/* Global Command Palette */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem onSelect={() => runCommand(() => onNavigate('dashboard'))}>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => onNavigate('pos'))}>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>POS Terminal</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => onNavigate('stock'))}>
               <BarChart3 className="mr-2 h-4 w-4" />
               <span>Check Stock</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Modules">
             {menuItems.filter(i => i.type !== 'separator').map((item: any) => (
                <CommandItem key={item.id} onSelect={() => runCommand(() => onNavigate(item.id))}>
                   {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                   <span>{item.label}</span>
                </CommandItem>
             ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="System">
             <CommandItem onSelect={() => runCommand(() => onNavigate('profile'))}>
                <Users className="mr-2 h-4 w-4" />
                <span>Profile Settings</span>
             </CommandItem>
             <CommandItem onSelect={() => runCommand(() => console.log("Logout"))}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log Out</span>
             </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      <SidebarInset className="overflow-hidden flex flex-col h-screen">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-background focus:text-foreground">
          Skip to main content
        </a>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="mr-4 hidden h-4 w-px bg-border md:block" />
          <div className="flex items-center gap-2 text-sm text-neutral-500">
            Pages /{" "}
            <span className="font-semibold text-foreground capitalize">
              {currentPage.replace(/-/g, " ")}
            </span>
          </div>
          <div className="ml-auto flex items-center gap-4">
            {/* Search Trigger */}
            <button
               onClick={() => setOpen(true)}
               className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm text-neutral-500 hover:text-foreground bg-neutral-100/50 hover:bg-neutral-100 border border-transparent hover:border-neutral-200 rounded-md transition-all mr-2"
            >
               <Search className="h-4 w-4" />
               <span className="text-xs font-medium mr-2">Search...</span>
               <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                  <span className="text-xs">⌘</span>K
               </kbd>
            </button>
            <button
               onClick={() => setOpen(true)}
               className="md:hidden p-2 text-neutral-500 hover:text-foreground"
               aria-label="Search"
            >
               <Search className="h-5 w-5" />
            </button>

            <button
              className="flex items-center gap-3 hover:opacity-80 focus:outline-hidden"
              onClick={() => onNavigate("profile")}
              aria-label="User Profile"
            >
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground border border-border">
                AU
              </div>
              <span className="text-sm font-medium hidden md:block">
                Admin User
              </span>
            </button>
          </div>
        </header>
        <main id="main-content" className="flex-1 overflow-auto p-6" tabIndex={-1}>{children}</main>

      </SidebarInset>
    </SidebarProvider>
  );
}


const AppSidebar = ({ currentPage, onNavigate }: { currentPage: Page; onNavigate: (page: Page) => void }) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b h-16 flex items-center px-6">
        <div className="flex items-center gap-3 overflow-hidden w-full group-data-[collapsible=icon]:justify-center">
            <div className="h-9 w-9 rounded-xl bg-primary shrink-0 flex items-center justify-center shadow-md shadow-primary/20">
               <span className="text-primary-foreground font-black text-xs">OS</span>
            </div>
            <span className="font-bold text-xl tracking-tight truncate group-data-[collapsible=icon]:hidden">
               Transact<span className="text-primary">OS</span>
            </span>
        </div>
      </SidebarHeader>
      <SidebarContent className="gap-0 py-2">
        <SidebarGroup className="px-3">
           <div className="flex items-center justify-between px-2 py-4">
             <SidebarGroupLabel>Application</SidebarGroupLabel>
             <button onClick={toggleFullscreen} className="p-1 hover:bg-accent rounded-md text-muted-foreground group-data-[collapsible=icon]:hidden opacity-50 hover:opacity-100 transition-opacity" aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}>
                {isFullscreen ? <Minimize className="h-3.5 w-3.5" aria-hidden="true" /> : <Maximize className="h-3.5 w-3.5" aria-hidden="true" />}
             </button>
           </div>
          <SidebarMenu className="gap-1.5">
            {menuItems.map((item) => {
              if (item.type === "separator") {
                return (
                  <SidebarGroupLabel key={item.id} className="mt-6 mb-2 group-data-[collapsible=icon]:hidden">
                    {item.label}
                  </SidebarGroupLabel>
                );
              }
              const Icon = item.icon as React.ElementType;
              return (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={currentPage === item.id}
                    onClick={() => onNavigate(item.id as Page)}
                    tooltip={item.label}
                  >
                    {Icon && <Icon />}
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => onNavigate("login")}>
              <LogOut />
              <span>Log out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
