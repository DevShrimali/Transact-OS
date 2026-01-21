import { useState } from 'react';
import { 
  Plus, 
  Minus, 
  Edit2, 
  Trash2, 
  X, 
  ChevronRight, 
  ChevronDown, 
  Folder, 
  Box, 
  LayoutGrid, 
  MapPin,
  Home,
  ArrowRight,
  MoreVertical,
  Building2,
  Layers,
  Container,
  Package,
  Network,
  Settings2
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { Label } from '@/app/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/app/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/components/ui/alert-dialog";
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/app/components/ui/utils';

type ItemType = 'Warehouse' | 'Zone' | 'Rack' | 'Bin';

interface WarehouseItem {
  id: string;
  name: string;
  type: ItemType;
  children: WarehouseItem[];
  expanded?: boolean;
}

// Initial Mock Data
const INITIAL_DATA: WarehouseItem[] = [
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
            expanded: false,
            children: []
          }
        ]
      },
      {
        id: 'z-2',
        name: 'Zone 2 - Industrial',
        type: 'Zone',
        expanded: false,
        children: []
      }
    ]
  },
  {
    id: 'w-2',
    name: 'Distribution Center South',
    type: 'Warehouse',
    expanded: false,
    children: []
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  show: { x: 0, opacity: 1 }
};

export function WarehouseModel() {
  const [data, setData] = useState<WarehouseItem[]>(INITIAL_DATA);
  
  // Sheet State
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [targetId, setTargetId] = useState<string | null>(null);
  const [newItemType, setNewItemType] = useState<ItemType>('Warehouse');
  const [itemName, setItemName] = useState('');

  // Delete Dialog State
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Helper to find item and update it
  const updateItemInTree = (items: WarehouseItem[], id: string, updateFn: (item: WarehouseItem) => WarehouseItem): WarehouseItem[] => {
    return items.map(item => {
      if (item.id === id) {
        return updateFn(item);
      }
      if (item.children.length > 0) {
        return { ...item, children: updateItemInTree(item.children, id, updateFn) };
      }
      return item;
    });
  };

  // Helper to add child
  const addChildToTree = (items: WarehouseItem[], parentId: string, newItem: WarehouseItem): WarehouseItem[] => {
    return items.map(item => {
      if (item.id === parentId) {
        return { ...item, children: [...item.children, newItem], expanded: true };
      }
      if (item.children.length > 0) {
        return { ...item, children: addChildToTree(item.children, parentId, newItem) };
      }
      return item;
    });
  };

  // Helper to remove item
  const deleteFromTree = (items: WarehouseItem[], id: string): WarehouseItem[] => {
    return items.filter(item => item.id !== id).map(item => ({
      ...item,
      children: deleteFromTree(item.children, id)
    }));
  };

  const handleToggleExpand = (id: string) => {
    setData(prev => updateItemInTree(prev, id, item => ({ ...item, expanded: !item.expanded })));
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      setData(prev => deleteFromTree(prev, deleteId));
      setIsDeleteDialogOpen(false);
      setDeleteId(null);
    }
  };

  const handleOpenAddModal = (parentId: string | null, parentType?: ItemType) => {
    setModalMode('add');
    setTargetId(parentId);
    setItemName('');
    
    // Determine next type based on hierarchy
    if (!parentType) setNewItemType('Warehouse');
    else if (parentType === 'Warehouse') setNewItemType('Zone');
    else if (parentType === 'Zone') setNewItemType('Rack');
    else if (parentType === 'Rack') setNewItemType('Bin');
    
    setIsSheetOpen(true);
  };

  const handleOpenEditModal = (item: WarehouseItem) => {
    setModalMode('edit');
    setTargetId(item.id);
    setItemName(item.name);
    setNewItemType(item.type);
    setIsSheetOpen(true);
  };

  const handleSave = () => {
    if (!itemName.trim()) return;

    if (modalMode === 'add') {
      const newItem: WarehouseItem = {
        id: `${newItemType.toLowerCase()}-${Date.now()}`,
        name: itemName,
        type: newItemType,
        children: [],
        expanded: true
      };

      if (targetId === null) {
        setData(prev => [...prev, newItem]);
      } else {
        setData(prev => addChildToTree(prev, targetId, newItem));
      }
    } else {
      if (targetId) {
        setData(prev => updateItemInTree(prev, targetId, item => ({ ...item, name: itemName })));
      }
    }
    setIsSheetOpen(false);
  };

  const getIcon = (type: ItemType) => {
    switch (type) {
      case 'Warehouse': return Building2;
      case 'Zone': return Layers;
      case 'Rack': return Network;
      case 'Bin': return Package;
      default: return Folder;
    }
  };

  const getTypeColor = (type: ItemType) => {
    switch (type) {
      case 'Warehouse': return 'text-primary bg-primary/10 border-primary/20';
      case 'Zone': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'Rack': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'Bin': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      default: return 'text-neutral-500 bg-neutral-50 border-neutral-200';
    }
  };

  const renderTreeItem = (item: WarehouseItem, level: number) => {
    const Icon = getIcon(item.type);
    const hasChildren = item.children && item.children.length > 0;
    const canHaveChildren = item.type !== 'Bin';
    const typeColor = getTypeColor(item.type);

    return (
      <motion.div 
        key={item.id}
        variants={itemVariants}
        layout
        className="select-none"
      >
        <div 
          className={cn(
            "group flex items-center justify-between py-2.5 transition-all duration-200 hover:bg-muted/40 rounded-lg pr-4",
            level > 1 && "relative before:absolute before:left-[-1.25rem] before:top-[-1rem] before:bottom-0 before:w-px before:bg-border last:before:bottom-auto last:before:h-8",
            level > 1 && "after:absolute after:left-[-1.25rem] after:top-4 after:w-4 after:h-px after:bg-border"
          )}
          style={{ marginLeft: level > 1 ? `2rem` : `0` }}
        >
          <div className="flex items-center gap-3 overflow-hidden flex-1">
            {canHaveChildren ? (
              <button 
                onClick={() => handleToggleExpand(item.id)}
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-input bg-background shadow-sm transition-transform duration-200 hover:bg-accent",
                  item.expanded && "transform rotate-0"
                )}
              >
                {item.expanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
              </button>
            ) : (
               <div className="h-6 w-6 shrink-0" />
            )}
            
            <div className="flex items-center gap-3">
               <div className={cn("p-2 rounded-xl border flex items-center justify-center shadow-sm", typeColor)}>
                  <Icon className="h-4 w-4" />
               </div>
               <div className="flex flex-col">
                  <span className="text-sm font-semibold tracking-tight text-foreground">{item.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-70">
                      {item.type}
                    </span>
                    {hasChildren && (
                       <Badge variant="secondary" className="h-3.5 text-[9px] px-1 font-bold">
                          {item.children.length} {item.type === 'Warehouse' ? 'Zones' : item.type === 'Zone' ? 'Racks' : 'Bins'}
                       </Badge>
                    )}
                  </div>
               </div>
            </div>
          </div>

          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {canHaveChildren && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary" 
                onClick={() => handleOpenAddModal(item.id, item.type)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Node Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => handleOpenEditModal(item)}>
                  <Edit2 className="mr-2 h-4 w-4" /> Rename Component
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MapPin className="mr-2 h-4 w-4" /> View Map Position
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive font-medium" onClick={() => handleDelete(item.id)}>
                  <Trash2 className="mr-2 h-4 w-4" /> Deconstruct node
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <AnimatePresence initial={false}>
          {item.expanded && item.children.length > 0 && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pb-2">
                {item.children.map(child => renderTreeItem(child, level + 1))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between px-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Facility Mapping</h1>
          <p className="text-muted-foreground mt-1">Design the physical topology of your inventory network.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
             <Settings2 className="h-4 w-4" /> Global Config
          </Button>
          <Button className="shadow-lg shadow-primary/25 gap-2" onClick={() => handleOpenAddModal(null)}>
            <Plus className="h-4 w-4" /> Define Warehouse
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Hierarchy View */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="shadow-sm border-none bg-background/50 backdrop-blur-sm">
            <CardHeader className="border-b bg-muted/20 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <Network className="h-4 w-4" /> Infrastructure Tree
                  </CardTitle>
                </div>
                <div className="flex items-center gap-1">
                  <Badge variant="outline" className="font-mono text-[10px]">Total Nodes: 12</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <motion.div 
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-1"
              >
                {data.length === 0 ? (
                    <div className="py-20 text-center flex flex-col items-center gap-4">
                        <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
                          <Home className="h-10 w-10 text-muted-foreground/30" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Digital Void Detected</p>
                          <p className="text-xs text-muted-foreground">No facility structures have been defined in the current cluster.</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => handleOpenAddModal(null)}>Initialize Facility</Button>
                    </div>
                ) : (
                    data.map(item => renderTreeItem(item, 1))
                )}
              </motion.div>
            </CardContent>
          </Card>
        </div>

        {/* Info & Insights Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
               <CardTitle className="text-lg">Structural Insights</CardTitle>
               <CardDescription>Real-time topology overview.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Warehouses</span>
                  </div>
                  <span className="font-bold">{data.length}</span>
               </div>
               <div className="flex items-center justify-between p-3 rounded-lg bg-amber-500/5 hover:bg-amber-500/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <Layers className="h-4 w-4 text-amber-600" />
                    <span className="text-sm font-medium">Storage Zones</span>
                  </div>
                  <span className="font-bold">4</span>
               </div>
               <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <Package className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm font-medium">Active Bins</span>
                  </div>
                  <span className="font-bold">128</span>
               </div>
               
               <div className="pt-4 border-t space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Capacity Profile</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Occupancy</span>
                      <span className="font-bold font-mono">68%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                       <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "68%" }}
                        className="h-full bg-primary"
                       />
                    </div>
                  </div>
               </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/50 border-dashed">
            <CardContent className="p-6">
               <div className="flex flex-col items-center text-center gap-4">
                  <div className="p-3 bg-background rounded-xl shadow-sm border">
                    <Network className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold">Smart Hierarchy</h4>
                    <p className="text-xs text-muted-foreground">UIMS automatically manages the parent-child relationships using standardized logistic protocols.</p>
                  </div>
               </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Configuration Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md">
          {(() => {
            const ActiveIcon = getIcon(newItemType);
            return (
              <>
                <SheetHeader>
                  <SheetTitle className="text-2xl font-bold flex items-center gap-2">
                    <ActiveIcon className="h-6 w-6 text-primary" />
                    {modalMode === 'add' ? `Define ${newItemType}` : `Modify node`}
                  </SheetTitle>
                  <SheetDescription>
                    Specify the identification and metadata for this hierarchical component.
                  </SheetDescription>
                </SheetHeader>
                <div className="py-8 space-y-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-bold">Identification Name</Label>
                    <Input 
                      placeholder={`Enter identifier for this ${newItemType.toLowerCase()}`} 
                      value={itemName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setItemName(e.target.value)}
                      autoFocus
                      className="h-12 text-lg font-medium"
                      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSave()}
                    />
                  </div>
                  
                  <div className="p-4 rounded-xl bg-muted/50 border space-y-3">
                    <h5 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Type Blueprint</h5>
                    <div className="flex gap-4">
                        <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center shrink-0 border", getTypeColor(newItemType))}>
                          <ActiveIcon className="h-5 w-5" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-bold">{newItemType}</p>
                          <p className="text-[11px] leading-relaxed text-muted-foreground">
                            {newItemType === 'Warehouse' && 'Top-level physical logistics center or storage facility.'}
                            {newItemType === 'Zone' && 'Logical sub-division (e.g., Ambient, Frozen, Hazmat areas).'}
                            {newItemType === 'Rack' && 'Physical storage structure supporting vertical stackability.'}
                            {newItemType === 'Bin' && 'Exact terminal coordinate where stock is physically placed.'}
                          </p>
                        </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })()}

          <SheetFooter className="absolute bottom-0 left-0 right-0 p-6 bg-background border-t">
            <Button variant="outline" className="flex-1" onClick={() => setIsSheetOpen(false)}>Abort</Button>
            <Button className="flex-1 shadow-lg shadow-primary/20" onClick={handleSave}>
               {modalMode === 'add' ? `Deploy Node` : 'Update Specs'}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Deconstruction Confirmation */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
               <Trash2 className="h-5 w-5" /> Confirm Node Deconstruction
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you absolute? Deleting this node will recursively purge <strong>all children</strong> (zones, racks, bins) associated with it. This action is irreversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Abort Mission</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-lg shadow-destructive/20" onClick={confirmDelete}>
              Confirm Deletion
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}