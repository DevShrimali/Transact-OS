import { useState } from "react";
import { Plus, Edit, Trash2, FolderTree, Tag, MoreVertical, Filter, Search } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Card, CardContent } from "@/app/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/app/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
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
import { Badge } from "@/app/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/app/components/ui/utils";

interface Department {
  id: string;
  name: string;
  createdAt: string;
  categoryCount: number;
}

interface Category {
  id: string;
  name: string;
  departmentId: string;
  departmentName: string;
  createdAt: string;
}

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

export function DepartmentCategory() {
  const [departments, setDepartments] = useState<Department[]>([
    { id: "DEPT-001", name: "Electronics", createdAt: "2024-01-15", categoryCount: 2 },
    { id: "DEPT-002", name: "Furniture", createdAt: "2024-01-16", categoryCount: 2 },
    { id: "DEPT-003", name: "Clothing", createdAt: "2024-01-17", categoryCount: 0 },
  ]);

  const [categories, setCategories] = useState<Category[]>([
    { id: "CAT-001", name: "Laptops", departmentId: "DEPT-001", departmentName: "Electronics", createdAt: "2024-01-15" },
    { id: "CAT-002", name: "Smartphones", departmentId: "DEPT-001", departmentName: "Electronics", createdAt: "2024-01-15" },
    { id: "CAT-003", name: "Office Chairs", departmentId: "DEPT-002", departmentName: "Furniture", createdAt: "2024-01-16" },
    { id: "CAT-004", name: "Desks", departmentId: "DEPT-002", departmentName: "Furniture", createdAt: "2024-01-16" },
  ]);

  const [showDeptSheet, setShowDeptSheet] = useState(false);
  const [showCatSheet, setShowCatSheet] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'dept' | 'cat', id: string } | null>(null);
  const [editingDept, setEditingDept] = useState<Department | null>(null);
  const [editingCat, setEditingCat] = useState<Category | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [deptForm, setDeptForm] = useState({ name: "" });
  const [catForm, setCatForm] = useState({ name: "", departmentId: "" });

  const handleAddDepartment = () => {
    setEditingDept(null);
    setDeptForm({ name: "" });
    setShowDeptSheet(true);
  };

  const handleEditDepartment = (dept: Department) => {
    setEditingDept(dept);
    setDeptForm({ name: dept.name });
    setShowDeptSheet(true);
  };

  const handleSaveDepartment = () => {
    if (editingDept) {
      setDepartments(departments.map(d => 
        d.id === editingDept.id ? { ...d, name: deptForm.name } : d
      ));
    } else {
      const newDept: Department = {
        id: `DEPT-${String(departments.length + 1).padStart(3, '0')}`,
        name: deptForm.name,
        createdAt: new Date().toISOString().split('T')[0],
        categoryCount: 0,
      };
      setDepartments([...departments, newDept]);
    }
    setShowDeptSheet(false);
  };

  const handleDeleteDepartment = (dept: Department) => {
    setDeleteTarget({ type: 'dept', id: dept.id });
    setShowDeleteModal(true);
  };

  const handleAddCategory = () => {
    setEditingCat(null);
    setCatForm({ name: "", departmentId: "" });
    setShowCatSheet(true);
  };

  const handleEditCategory = (cat: Category) => {
    setEditingCat(cat);
    setCatForm({ name: cat.name, departmentId: cat.departmentId });
    setShowCatSheet(true);
  };

  const handleSaveCategory = () => {
    const dept = departments.find(d => d.id === catForm.departmentId);
    if (!dept) return;

    if (editingCat) {
      setCategories(categories.map(c => 
        c.id === editingCat.id 
          ? { ...c, name: catForm.name, departmentId: catForm.departmentId, departmentName: dept.name } 
          : c
      ));
    } else {
      const newCat: Category = {
        id: `CAT-${String(categories.length + 1).padStart(3, '0')}`,
        name: catForm.name,
        departmentId: catForm.departmentId,
        departmentName: dept.name,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setCategories([...categories, newCat]);
      setDepartments(departments.map(d => 
        d.id === catForm.departmentId ? { ...d, categoryCount: d.categoryCount + 1 } : d
      ));
    }
    setShowCatSheet(false);
  };

  const handleDeleteCategory = (cat: Category) => {
    setDeleteTarget({ type: 'cat', id: cat.id });
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    
    if (deleteTarget.type === 'dept') {
      setDepartments(departments.filter(d => d.id !== deleteTarget.id));
      setCategories(categories.filter(c => c.departmentId !== deleteTarget.id));
    } else {
      const cat = categories.find(c => c.id === deleteTarget.id);
      if (cat) {
        setCategories(categories.filter(c => c.id !== deleteTarget.id));
        setDepartments(departments.map(d => 
          d.id === cat.departmentId ? { ...d, categoryCount: Math.max(0, d.categoryCount - 1) } : d
        ));
      }
    }
    setShowDeleteModal(false);
    setDeleteTarget(null);
  };

  const filteredDepartments = departments.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.departmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    { title: "Total Departments", value: departments.length.toString(), icon: FolderTree, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Total Categories", value: categories.length.toString(), icon: Tag, color: "text-emerald-600", bg: "bg-emerald-100" },
  ];

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-[1600px] mx-auto space-y-8 pb-10"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div className="space-y-1">
          <Badge variant="outline" className="text-[10px] font-bold tracking-[0.2em] px-2 py-0 border-blue-200 text-blue-700 uppercase">Product Taxonomy</Badge>
          <h1 className="text-4xl font-medium tracking-tighter text-gray-900">Classification Matrix</h1>
          <p className="text-muted-foreground font-medium">Architect hierarchical product organization and categorization.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={handleAddDepartment} variant="outline" className="h-12 px-6 border-muted bg-background shadow-sm gap-2 font-bold">
            <FolderTree className="h-4 w-4" /> New Department
          </Button>
          <Button onClick={handleAddCategory} className="h-12 px-8 gap-2 shadow-xl shadow-primary/25 font-black uppercase text-xs tracking-widest">
            <Plus className="h-4 w-4" /> New Category
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                  placeholder="Search departments or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background"
                />
              </div>
              <Button variant="outline" size="icon" className="bg-background">
                 <Filter className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Departments Table */}
      <motion.div variants={item}>
        <Card className="overflow-hidden border-none shadow-sm">
          <div className="bg-muted/30 border-b p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <FolderTree className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-black text-lg tracking-tight">Departments</h3>
                <p className="text-xs text-muted-foreground font-medium">Primary classification hierarchy</p>
              </div>
            </div>
          </div>
          <table className="w-full">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="text-left py-4 px-6 text-xs font-bold text-muted-foreground uppercase tracking-widest">Identity</th>
                <th className="text-left py-4 px-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">Department Name</th>
                <th className="text-left py-4 px-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">Categories</th>
                <th className="text-left py-4 px-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">Created</th>
                <th className="text-right py-4 px-6 text-xs font-bold text-muted-foreground uppercase tracking-widest">Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-muted/30">
              <AnimatePresence>
                {filteredDepartments.map((dept) => (
                  <motion.tr 
                    key={dept.id}
                    layout
                    className="group hover:bg-muted/10 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <span className="font-mono text-xs font-bold text-primary">{dept.id}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-semibold text-sm group-hover:text-primary transition-colors">{dept.name}</span>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline" className="text-[10px] h-5 px-2 font-medium">
                        {dept.categoryCount} items
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-xs font-medium text-muted-foreground">{dept.createdAt}</td>
                    <td className="py-4 px-6 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                             <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleEditDepartment(dept)}>
                             <Edit className="h-4 w-4 mr-2" /> Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive font-medium" onClick={() => handleDeleteDepartment(dept)}>
                             <Trash2 className="h-4 w-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          <div className="flex items-center justify-between border-t px-6 py-4 bg-muted/20">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Total: {filteredDepartments.length} Departments</span>
          </div>
        </Card>
      </motion.div>

      {/* Categories Table */}
      <motion.div variants={item}>
        <Card className="overflow-hidden border-none shadow-sm">
          <div className="bg-muted/30 border-b p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <Tag className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-black text-lg tracking-tight">Categories</h3>
                <p className="text-xs text-muted-foreground font-medium">Secondary classification taxonomy</p>
              </div>
            </div>
          </div>
          <div className="p-4 space-y-2 bg-muted/10">
            <AnimatePresence>
              {filteredCategories.map((cat) => (
                <motion.div 
                  key={cat.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="group flex items-center justify-between p-4 bg-background rounded-xl border border-border/50 shadow-sm hover:shadow-md hover:border-emerald-500/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs shadow-inner">
                      {cat.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm tracking-tight text-foreground/90">{cat.name}</h4>
                        <span className="text-[10px] font-mono text-muted-foreground/60 bg-muted px-1.5 py-0.5 rounded-sm">{cat.id}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                        <div className="flex items-center gap-1.5">
                          <FolderTree className="h-3 w-3" />
                          <span>{cat.departmentName}</span>
                        </div>
                        <span className="text-muted-foreground/40">•</span>
                        <span>{cat.createdAt}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="hidden sm:flex bg-blue-50/50 text-blue-700 border-blue-100 hover:bg-blue-100/50 transition-colors cursor-default">
                      {cat.departmentName}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                           <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-44">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleEditCategory(cat)}>
                           <Edit className="h-4 w-4 mr-2" /> Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive font-medium" onClick={() => handleDeleteCategory(cat)}>
                           <Trash2 className="h-4 w-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {filteredCategories.length === 0 && (
               <div className="text-center py-10 text-muted-foreground">
                  <p>No categories found.</p>
               </div>
            )}
          </div>
          <div className="flex items-center justify-between border-t px-6 py-4 bg-muted/20">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Total: {filteredCategories.length} Categories</span>
          </div>
        </Card>
      </motion.div>

      {/* Department Sheet */}
      <Sheet open={showDeptSheet} onOpenChange={setShowDeptSheet}>
        <SheetContent className="sm:max-w-2xl overflow-y-auto px-0 border-none bg-background shadow-2xl">
          <div className="px-10 pb-32 pt-10">
             <SheetHeader className="mb-12">
               <div className="h-14 w-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 mb-6 shadow-inner border border-blue-500/20">
                  <FolderTree className="h-7 w-7" />
               </div>
               <SheetTitle className="text-3xl font-black tracking-tight">{editingDept ? "Refine Department" : "Manifest New Department"}</SheetTitle>
               <SheetDescription className="text-base font-medium">
                  Define the primary classification node for product organization.
               </SheetDescription>
             </SheetHeader>
             
             <div className="space-y-12">
                <section className="space-y-6">
                   <div className="flex items-center gap-2 mb-2">
                      <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
                      <h3 className="font-black text-xl tracking-tight">Department Identity</h3>
                   </div>
                   <div className="space-y-2.5">
                      <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Department Name</Label>
                      <Input
                        value={deptForm.name}
                        onChange={(e) => setDeptForm({ ...deptForm, name: e.target.value })}
                        placeholder="Electronics, Furniture, etc."
                        className="h-12 border-none bg-muted/50 focus-visible:ring-blue-500/20 font-bold"
                      />
                   </div>
                </section>

                <div className="pt-10 flex gap-4">
                     <Button variant="outline" className="flex-1 h-12 text-muted-foreground font-bold" onClick={() => setShowDeptSheet(false)}>Discard</Button>
                     <Button className="flex-1 h-12 shadow-xl shadow-blue-500/20 font-black tracking-wide bg-blue-600 hover:bg-blue-700 text-white border-none" onClick={handleSaveDepartment} disabled={!deptForm.name.trim()}>
                        {editingDept ? "Update Department" : "Create Department"}
                     </Button>
                </div>
             </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Category Sheet */}
      <Sheet open={showCatSheet} onOpenChange={setShowCatSheet}>
        <SheetContent className="sm:max-w-2xl overflow-y-auto px-0 border-none bg-background shadow-2xl">
          <div className="px-10 pb-32 pt-10">
             <SheetHeader className="mb-12">
               <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-6 shadow-inner border border-emerald-500/20">
                  <Tag className="h-7 w-7" />
               </div>
               <SheetTitle className="text-3xl font-black tracking-tight">{editingCat ? "Refine Category" : "Manifest New Category"}</SheetTitle>
               <SheetDescription className="text-base font-medium">
                  Define the secondary classification node linked to a department.
               </SheetDescription>
             </SheetHeader>
             
             <div className="space-y-12">
                <section className="space-y-6">
                   <div className="flex items-center gap-2 mb-2">
                      <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                      <h3 className="font-black text-xl tracking-tight">Category Identity</h3>
                   </div>
                   <div className="space-y-6">
                      <div className="space-y-2.5">
                         <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Category Name</Label>
                         <Input
                           value={catForm.name}
                           onChange={(e) => setCatForm({ ...catForm, name: e.target.value })}
                           placeholder="Laptops, Chairs, etc."
                           className="h-12 border-none bg-muted/50 focus-visible:ring-emerald-500/20 font-bold"
                         />
                      </div>
                      <div className="space-y-2.5">
                         <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Parent Department</Label>
                         <Select
                           value={catForm.departmentId}
                           onValueChange={(value) => setCatForm({ ...catForm, departmentId: value })}
                         >
                           <SelectTrigger className="h-12 border-none bg-muted/50 font-bold focus:ring-emerald-500/20">
                             <SelectValue placeholder="Select department..." />
                           </SelectTrigger>
                           <SelectContent>
                             {departments.map((dept) => (
                               <SelectItem key={dept.id} value={dept.id} className="font-bold">
                                 {dept.name}
                               </SelectItem>
                             ))}
                           </SelectContent>
                         </Select>
                      </div>
                   </div>
                </section>

                <div className="pt-10 flex gap-4">
                     <Button variant="outline" className="flex-1 h-12 text-muted-foreground font-bold" onClick={() => setShowCatSheet(false)}>Discard</Button>
                     <Button className="flex-1 h-12 shadow-xl shadow-emerald-500/20 font-black tracking-wide bg-emerald-600 hover:bg-emerald-700 text-white border-none" onClick={handleSaveCategory} disabled={!catForm.name.trim() || !catForm.departmentId}>
                        {editingCat ? "Update Category" : "Create Category"}
                     </Button>
                </div>
             </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
               <Trash2 className="h-5 w-5" /> Confirm Deletion
            </DialogTitle>
            <DialogDescription>
              {deleteTarget?.type === 'dept' 
                ? "Are you certain you wish to permanently delete this department? All associated categories will also be removed."
                : "Are you certain you wish to permanently delete this category?"}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 mt-4">
            <Button variant="outline" className="flex-1" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="destructive" className="flex-1 shadow-lg shadow-destructive/20" onClick={handleConfirmDelete}>
              Confirm Deletion
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
