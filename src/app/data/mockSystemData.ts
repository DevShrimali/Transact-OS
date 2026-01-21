
import { 
  Package, 
  AlertTriangle, 
  Layers, 
  TrendingUp,
  Sparkles,
  TrendingDown,
  CalendarDays,
  Percent
} from 'lucide-react';

// --- User Management Data ---
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: "active" | "inactive";
  lastActive: string;
  avatar?: string;
}

export const mockUsers: User[] = [
  { id: "1", name: "John Doe", email: "john@company.com", role: "Warehouse Manager", department: "Operations", status: "active", lastActive: "2 mins ago" },
  { id: "2", name: "Jane Smith", email: "jane@company.com", role: "Accountant", department: "Finance", status: "active", lastActive: "1 hour ago" },
  { id: "3", name: "Mike Johnson", email: "mike@company.com", role: "Picker", department: "Logistics", status: "inactive", lastActive: "2 days ago" },
  { id: "4", name: "Sarah Wilson", email: "sarah@company.com", role: "Admin", department: "IT", status: "active", lastActive: "Just now" },
  { id: "5", name: "David Brown", email: "david@company.com", role: "Supervisor", department: "Logistics", status: "active", lastActive: "5 mins ago" },
];

// --- Inventory / Item Master Data ---
export const inventoryStats = {
  totalSkus: '1,284',
  criticalStock: '12',
  logicalGroups: '24',
  assetValuation: '$84,200',
  totalCategories: 6, // Electronics, Tools, Raw, Finished, etc.
};

// --- Warehouse Data ---
export type ItemType = 'Warehouse' | 'Zone' | 'Rack' | 'Bin';

export interface WarehouseItem {
  id: string;
  name: string;
  type: ItemType;
  children: WarehouseItem[];
  expanded?: boolean;
}

export const initialWarehouseData: WarehouseItem[] = [
  {
    id: 'w-1',
    name: 'Main Warehouse A',
    type: 'Warehouse',
    expanded: true,
    children: [
      {
        id: 'z-1',
        name: 'Zone 1 - Electronics',
        type: 'Zone',
        expanded: true,
        children: [
          {
            id: 'r-1',
            name: 'Rack A',
            type: 'Rack',
            expanded: true,
            children: [
              { id: 'b-1', name: 'Bin A-01', type: 'Bin', children: [] },
              { id: 'b-2', name: 'Bin A-02', type: 'Bin', children: [] },
            ]
          },
          {
            id: 'r-2',
            name: 'Rack B',
            type: 'Rack',
            expanded: true,
            children: []
          }
        ]
      },
      {
        id: 'z-2',
        name: 'Zone 2 - Heavy Goods',
        type: 'Zone',
        children: []
      }
    ]
  }
];

// --- Discount / Campaign Data ---
export interface Discount {
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

export const mockDiscounts: Discount[] = [
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

export const discountStats = [
  { title: "Active Campaigns", value: "3", icon: Sparkles, color: "text-emerald-600", bg: "bg-emerald-100" },
  { title: "Total Savings", value: "$12,450", icon: TrendingDown, color: "text-blue-600", bg: "bg-blue-100" },
  { title: "Scheduled", value: "2", icon: CalendarDays, color: "text-purple-600", bg: "bg-purple-100" },
  { title: "Avg Discount", value: "15%", icon: Percent, color: "text-amber-600", bg: "bg-amber-100" },
];
