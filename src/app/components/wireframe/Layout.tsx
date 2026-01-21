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
  Maximize
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


export type Page =
  | "login"
  | "staff-login"
  | "dashboard"
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
  | "company-settings";

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
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
  return (
    <SidebarProvider>
      <AppSidebar currentPage={currentPage} onNavigate={onNavigate} />
      <SidebarInset className="overflow-hidden flex flex-col h-screen">
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
            <button
              className="flex items-center gap-3 hover:opacity-80 focus:outline-hidden"
              onClick={() => onNavigate("profile")}
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
        <main className="flex-1 overflow-auto p-6">{children}</main>

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
      <SidebarHeader className="border-b h-14 flex items-center px-4">
        <div className="flex items-center gap-2 overflow-hidden w-full group-data-[collapsible=icon]:justify-center">
            <div className="h-8 w-8 rounded-lg bg-primary shrink-0 flex items-center justify-center">
               <span className="text-primary-foreground font-black text-xs">OS</span>
            </div>
            <span className="font-bold text-lg tracking-tight truncate group-data-[collapsible=icon]:hidden">
               Transact<span className="text-primary">OS</span>
            </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
           <div className="flex items-center justify-between px-2 py-2">
             <SidebarGroupLabel>Application</SidebarGroupLabel>
             <button onClick={toggleFullscreen} className="p-1 hover:bg-accent rounded-md text-muted-foreground group-data-[collapsible=icon]:hidden">
                {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
             </button>
           </div>
          <SidebarMenu>
            {menuItems.map((item) => {
              if (item.type === "separator") {
                return <SidebarSeparator key={item.id} className="my-2" />;
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
