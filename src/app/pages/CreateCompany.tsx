import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Plus, Trash2, Check, ChevronRight, Edit2, X, Home as HomeIcon } from 'lucide-react';
import { cn } from '../components/ui/utils';

// Helper Component for Stock Methods
const MethodSelector = ({ 
  title, 
  methods, 
  onChange, 
  suggestions 
}: { 
  title: string; 
  methods: string[]; 
  onChange: (methods: string[]) => void; 
  suggestions: string[] 
}) => {
  const [inputVal, setInputVal] = useState('');
  
  const handleAdd = () => {
    if (inputVal && !methods.includes(inputVal)) {
      onChange([...methods, inputVal]);
      setInputVal('');
    }
  };
  
  const handleRemove = (method: string) => {
    onChange(methods.filter(m => m !== method));
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
      <h3 className="mb-4 font-semibold leading-none tracking-tight">{title}</h3>
      
      <div className="flex gap-2 mb-4">
        <div className="flex-1">
             <div className="w-full space-y-1.5">
               <Input
                 list={`list-${title.replace(/\s/g, '')}`}
                 placeholder="Type or select method..." 
                 value={inputVal}
                 onChange={(e) => setInputVal(e.target.value)}
                 onKeyDown={(e) => {
                     if (e.key === 'Enter') {
                         e.preventDefault();
                         handleAdd();
                     }
                 }}
               />
             </div>
             <datalist id={`list-${title.replace(/\s/g, '')}`}>
                {suggestions.map(s => <option key={s} value={s} />)}
             </datalist>
        </div>
        <Button onClick={handleAdd} type="button" size="icon" variant="secondary">
            <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-2 max-h-[300px] overflow-y-auto">
        {methods.length === 0 && <p className="text-sm text-muted-foreground">No methods selected</p>}
        {methods.map((method) => (
          <div key={method} className="flex items-center justify-between rounded-md border bg-muted/50 p-2 pl-3">
             <span className="text-sm font-medium">{method}</span>
             <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => handleRemove(method)}>
                <X className="h-4 w-4" />
             </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

type Step = 'details' | 'stock' | 'warehouse' | 'taxes' | 'review';

interface CreateCompanyProps {
  onBack: () => void;
  onComplete: () => void;
}

export function CreateCompany({ onBack, onComplete }: CreateCompanyProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  
  // Mock State for Form Data (to show interactivity in review)
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    type: 'Manufacturing',
    location: '',
    taxId: '',
    stockIn: ['Purchase Order', 'Job Work'],
    stockOut: ['Sales Order'],
    taxes: [
      { 
        id: 1, 
        type: 'GST', 
        percentage: '18%', 
        region: 'National',
        applicability: 'All Items', 
        subTaxes: [
          { name: 'CGST', percentage: '9%' },
          { name: 'SGST', percentage: '9%' }
        ]
      }
    ],
    warehouses: [
      { 
        id: 'WH-001', 
        name: 'Main Warehouse', 
        location: 'New York, USA', 
        zones: [
            { 
                id: 'zone-a', 
                name: 'Zone A (Cold Storage)', 
                racks: [
                    { id: 'rack-a-1', name: 'Rack A-1', bins: 4 }
                ] 
            },
            { 
                id: 'zone-b', 
                name: 'Zone B (General)', 
                racks: [] 
            }
        ]
      }
    ]
  });

  const steps = [
    { id: 1, title: 'Company Details', key: 'details' },
    { id: 2, title: 'Stock Methods', key: 'stock' },
    { id: 3, title: 'Warehouse Setup', key: 'warehouse' },
    { id: 4, title: 'Taxes', key: 'taxes' },
    { id: 5, title: 'Review & Submit', key: 'review' },
  ];

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
    else onComplete();
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
    else onBack();
  };

  const renderProgress = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;
          
          return (
            <div key={step.id} className="flex flex-1 items-center">
              <div className={`relative flex flex-col items-center ${index === steps.length - 1 ? 'flex-1' : 'w-full'}`}>
                <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors
                  ${isActive ? 'border-primary bg-primary text-primary-foreground' : 
                    isCompleted ? 'border-primary bg-background text-primary' : 
                    'border-muted bg-background text-muted-foreground'}`}
                >
                  {isCompleted ? <Check className="h-4 w-4" /> : step.id}
                </div>
                <span className={`mt-2 text-xs font-medium uppercase tracking-wider
                  ${isActive ? 'text-foreground' : 
                    isCompleted ? 'text-foreground' : 
                    'text-muted-foreground'}`}
                >
                  {step.title}
                </span>
                
                {index < steps.length - 1 && (
                  <div className={`absolute left-[50%] top-4 -z-10 h-0.5 w-full -translate-y-1/2
                    ${isCompleted ? 'bg-primary' : 'bg-muted'}`} 
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="font-semibold leading-none tracking-tight">Basic Information</h3>
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input 
              id="companyName"
              placeholder="Enter company legal name" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="taxId">Tax ID / EIN</Label>
            <Input 
              id="taxId"
              placeholder="XX-XXXXXXX"
              value={formData.taxId}
              onChange={(e) => setFormData({...formData, taxId: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label>Business Type</Label>
            <Select 
              value={formData.type}
              onValueChange={(val) => setFormData({...formData, type: val})}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="Retail">Retail</SelectItem>
                    <SelectItem value="Trading">Trading</SelectItem>
                    <SelectItem value="Distribution">Distribution</SelectItem>
                </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4 rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="font-semibold leading-none tracking-tight">Location Details</h3>
          <div className="space-y-2">
            <Label htmlFor="address">Full Address</Label>
            <Input 
              id="address"
              placeholder="Street address, City, State, Zip"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hq">Headquarters Location</Label>
            <Input 
              id="hq"
              placeholder="City, Country"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="grid gap-6 md:grid-cols-2">
      <MethodSelector
        title="Stock In Methods"
        methods={formData.stockIn}
        onChange={(newMethods) => setFormData({ ...formData, stockIn: newMethods })}
        suggestions={['Purchase Order', 'Purchase Invoice', 'Job Work In', 'Sales Return', 'Stock Transfer In']}
      />
      
      <MethodSelector
        title="Stock Out Methods"
        methods={formData.stockOut}
        onChange={(newMethods) => setFormData({ ...formData, stockOut: newMethods })}
        suggestions={['Sales Order', 'Point of Sale (POS)', 'Job Work Out', 'Purchase Return', 'Stock Transfer Out']}
      />
    </div>
  );

  // State for warehouse modal
  const [isWarehouseModalOpen, setIsWarehouseModalOpen] = useState(false);
  const [currentWarehouse, setCurrentWarehouse] = useState<{ id: string, name: string, zones: number, location: string } | null>(null);
  const [warehouseForm, setWarehouseForm] = useState({ name: '', location: '' });
  
  // State for warehouse hierarchy expansion
  const [expandedNodes, setExpandedNodes] = useState<string[]>(['zone-a', 'rack-a-1']);

  const toggleNode = (nodeId: string) => {
    if (expandedNodes.includes(nodeId)) {
      setExpandedNodes(expandedNodes.filter(id => id !== nodeId));
    } else {
      setExpandedNodes([...expandedNodes, nodeId]);
    }
  };

  const handleAddWarehouse = () => {
    setCurrentWarehouse(null);
    setWarehouseForm({ name: '', location: '' });
    setIsWarehouseModalOpen(true);
  };

  const handleEditWarehouse = (warehouse: any) => {
    setCurrentWarehouse(warehouse);
    setWarehouseForm({ name: warehouse.name, location: warehouse.location });
    setIsWarehouseModalOpen(true);
  };

  const handleSaveWarehouse = () => {
    if (currentWarehouse) {
        setFormData(prev => ({
            ...prev,
            warehouses: prev.warehouses.map(wh => 
                wh.id === currentWarehouse.id 
                ? { ...wh, name: warehouseForm.name, location: warehouseForm.location }
                : wh
            )
        }));
    } else {
        const newWarehouse = {
            id: `WH-00${formData.warehouses.length + 1}`,
            name: warehouseForm.name,
            location: warehouseForm.location,
            zones: []
        };
        setFormData(prev => ({
            ...prev,
            warehouses: [...prev.warehouses, newWarehouse]
        }));
    }
    setIsWarehouseModalOpen(false);
  };

  const handleAddZone = (warehouseId: string) => {
    // Ideally use a modal, but for wireframe prompt is fine or we can add a simple input toggle
    // For now, let's just add a generic zone to prove interactivity or use a prompt
    const zoneName = prompt("Enter Zone Name (e.g., Zone C - Packaging):");
    if (!zoneName) return;

    setFormData(prev => ({
      ...prev,
      warehouses: prev.warehouses.map(wh => {
        if (wh.id === warehouseId) {
          return {
            ...wh,
            zones: [
              ...wh.zones,
              {
                id: `zone-${Date.now()}`,
                name: zoneName,
                racks: []
              }
            ]
          };
        }
        return wh;
      })
    }));
  };

  const handleAddRack = (warehouseId: string, zoneId: string) => {
     setFormData(prev => ({
      ...prev,
      warehouses: prev.warehouses.map(wh => {
        if (wh.id === warehouseId) {
          return {
            ...wh,
            zones: wh.zones.map(zone => {
                if (zone.id === zoneId) {
                    return {
                        ...zone,
                        racks: [
                            ...zone.racks,
                            {
                                id: `rack-${Date.now()}`,
                                name: `Rack ${zone.racks.length + 1}`,
                                bins: 4
                            }
                        ]
                    };
                }
                return zone;
            })
          };
        }
        return wh;
      })
    }));
  };

  // State for tax modal
  const [isTaxModalOpen, setIsTaxModalOpen] = useState(false);
  const [currentTax, setCurrentTax] = useState<any | null>(null);
  const [taxForm, setTaxForm] = useState({
    type: '',
    percentage: '',
    region: '',
    applicability: 'All Items',
    subTaxes: [] as { name: string, percentage: string }[]
  });

  const handleAddTax = () => {
    setCurrentTax(null);
    setTaxForm({ type: '', percentage: '', region: '', applicability: 'All Items', subTaxes: [] });
    setIsTaxModalOpen(true);
  };

  const handleEditTax = (tax: any) => {
    setCurrentTax(tax);
    setTaxForm({ 
        type: tax.type, 
        percentage: tax.percentage, 
        region: tax.region,
        applicability: tax.applicability || 'All Items',
        subTaxes: tax.subTaxes || [] 
    });
    setIsTaxModalOpen(true);
  };

  const handleDeleteTax = (taxId: number) => {
    setFormData(prev => ({
        ...prev,
        taxes: prev.taxes.filter(t => t.id !== taxId)
    }));
  };

  const handleSaveTax = () => {
    if (currentTax) {
        setFormData(prev => ({
            ...prev,
            taxes: prev.taxes.map(t => t.id === currentTax.id ? { ...t, ...taxForm } : t)
        }));
    } else {
        const newTax = {
            id: Date.now(), // Simple ID generation
            ...taxForm
        };
        setFormData(prev => ({
            ...prev,
            taxes: [...prev.taxes, newTax]
        }));
    }
    setIsTaxModalOpen(false);
  };

  const addSubTax = () => {
    setTaxForm(prev => ({
        ...prev,
        subTaxes: [...prev.subTaxes, { name: '', percentage: '' }]
    }));
  };

  const updateSubTax = (index: number, field: 'name' | 'percentage', value: string) => {
    const newSubTaxes = [...taxForm.subTaxes];
    newSubTaxes[index] = { ...newSubTaxes[index], [field]: value };
    setTaxForm(prev => ({ ...prev, subTaxes: newSubTaxes }));
  };

  const removeSubTax = (index: number) => {
    setTaxForm(prev => ({
        ...prev,
        subTaxes: prev.subTaxes.filter((_, i) => i !== index)
    }));
  };

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Define your warehouse hierarchy structure.</p>
        <Button variant="outline" size="sm" onClick={handleAddWarehouse}>
          <Plus className="mr-2 h-4 w-4" /> Add Warehouse
        </Button>
      </div>

      {/* Warehouse Modal */}
      {isWarehouseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <Card className="w-full max-w-md shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-bold">{currentWarehouse ? 'Edit Warehouse' : 'Add New Warehouse'}</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setIsWarehouseModalOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="whName">Warehouse Name</Label>
                <Input 
                  id="whName"
                  placeholder="e.g. Main Distribution Center" 
                  value={warehouseForm.name}
                  onChange={(e) => setWarehouseForm({...warehouseForm, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whLocation">Location / Address</Label>
                <Input 
                  id="whLocation"
                  placeholder="City, State" 
                  value={warehouseForm.location}
                  onChange={(e) => setWarehouseForm({...warehouseForm, location: e.target.value})}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-3 bg-muted/50 p-4">
              <Button variant="ghost" onClick={() => setIsWarehouseModalOpen(false)}>Cancel</Button>
              <Button onClick={handleSaveWarehouse}>Save Warehouse</Button>
            </CardFooter>
          </Card>
        </div>
      )}

      <div className="space-y-4">
        {formData.warehouses.map((wh) => (
            <div key={wh.id} className="rounded-lg border bg-card shadow-sm overflow-hidden">
                {/* Warehouse Level */}
                <div className="border-b bg-muted/40 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center font-semibold text-foreground">
                    <HomeIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                    {wh.name} <span className="ml-2 text-xs font-normal text-muted-foreground">({wh.id})</span>
                    </div>
                    <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEditWarehouse(wh)}>Edit</Button>
                    <Button variant="ghost" size="sm" onClick={() => handleAddZone(wh.id)}><Plus className="h-4 w-4 mr-1" /> Zone</Button>
                    </div>
                </div>
                </div>

                {/* Zones Level */}
                {wh.zones.map(zone => (
                    <div key={zone.id} className="border-b last:border-0 p-4 pl-8">
                        <div className="mb-3 flex items-center justify-between">
                            <button 
                                onClick={() => toggleNode(zone.id)}
                                className="flex items-center font-medium text-foreground hover:text-primary focus:outline-hidden"
                            >
                            <div className="mr-3 flex h-5 w-5 items-center justify-center">
                                <ChevronRight className={cn("h-4 w-4 transition-transform", expandedNodes.includes(zone.id) && "rotate-90")} />
                            </div>
                            {zone.name}
                            </button>
                            <div className="flex space-x-2">
                            <Button variant="ghost" size="sm" className="h-8">Edit</Button>
                            <Button variant="ghost" size="sm" className="h-8" onClick={() => handleAddRack(wh.id, zone.id)}><Plus className="h-3 w-3 mr-1" /> Rack</Button>
                            </div>
                        </div>

                        {/* Rack Level */}
                        {expandedNodes.includes(zone.id) && (
                            <div className="ml-8 space-y-3 border-l pl-4">
                            {zone.racks.length === 0 && <p className="text-xs text-muted-foreground">No racks added yet.</p>}
                            {zone.racks.map(rack => (
                                <div key={rack.id} className="rounded-md border bg-muted/20 p-3">
                                    <div className="flex items-center justify-between">
                                        <button 
                                            onClick={() => toggleNode(rack.id)}
                                            className="flex items-center text-sm font-medium text-foreground hover:text-primary focus:outline-hidden"
                                        >
                                            <div className="mr-2 flex h-4 w-4 items-center justify-center">
                                                <ChevronRight className={cn("h-3 w-3 transition-transform", expandedNodes.includes(rack.id) && "rotate-90")} />
                                            </div>
                                            {rack.name}
                                        </button>
                                    <div className="flex items-center space-x-4">
                                        <span className="text-xs text-muted-foreground">{rack.bins} Bins</span>
                                        <Button variant="ghost" size="sm" className="h-6 text-xs">Edit</Button>
                                    </div>
                                    </div>
                                    {/* Bin Level */}
                                    {expandedNodes.includes(rack.id) && (
                                        <div className="mt-2 grid grid-cols-4 gap-2 pl-6">
                                        {[1, 2, 3, 4].map(bin => (
                                            <div key={bin} className="rounded-sm border bg-background p-2 text-center text-xs text-muted-foreground">
                                            Bin {rack.name.split(' ')[1]}-0{bin}
                                            </div>
                                        ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            </div>
                        )}
                    </div>
                ))}
                {wh.zones.length === 0 && (
                    <div className="p-8 text-center text-sm text-muted-foreground">
                        No zones defined. Click "Zone" to add one.
                    </div>
                )}
            </div>
        ))}
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Configure applicable taxes for your products.</p>
        <Button variant="outline" size="sm" onClick={handleAddTax}><Plus className="mr-2 h-4 w-4" /> Add Tax Rule</Button>
      </div>

      {/* Tax Modal */}
      {isTaxModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <Card className="w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-bold">{currentTax ? 'Edit Tax Rule' : 'Add Tax Rule'}</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setIsTaxModalOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="taxName">Tax Name</Label>
                  <Input 
                      id="taxName"
                      placeholder="e.g. GST" 
                      value={taxForm.type}
                      onChange={(e) => setTaxForm({...taxForm, type: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxPerc">Total Percentage</Label>
                  <Input 
                      id="taxPerc"
                      placeholder="e.g. 18%" 
                      value={taxForm.percentage}
                      onChange={(e) => setTaxForm({...taxForm, percentage: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label>Applicability</Label>
                    <Select 
                      value={taxForm.applicability}
                      onValueChange={(val) => setTaxForm({...taxForm, applicability: val})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Scope" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All Items">All Items</SelectItem>
                        <SelectItem value="Specific Categories">Specific Categories</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                <div className="space-y-2">
                  <Label htmlFor="region">Region</Label>
                  <Input 
                      id="region"
                      placeholder="e.g. National" 
                      value={taxForm.region}
                      onChange={(e) => setTaxForm({...taxForm, region: e.target.value})}
                  />
                </div>
              </div>

              {/* Sub-taxes Section */}
              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-2">
                    <Label>Tax Components (Sub-taxes)</Label>
                    <Button variant="ghost" size="sm" onClick={addSubTax} type="button" className="text-xs h-8">
                        <Plus className="mr-1 h-3 w-3" /> Add Component
                    </Button>
                </div>
                
                <div className="space-y-2 bg-muted/50 p-3 rounded-md border">
                    {taxForm.subTaxes.length === 0 && <p className="text-xs text-muted-foreground text-center py-2">No components added. This is a flat tax.</p>}
                    {taxForm.subTaxes.map((sub, index) => (
                        <div key={index} className="flex gap-2 items-center">
                            <Input 
                                placeholder="Name (e.g. CGST)" 
                                className="h-8 text-xs bg-background"
                                value={sub.name}
                                onChange={(e) => updateSubTax(index, 'name', e.target.value)}
                            />
                            <Input 
                                placeholder="%" 
                                className="h-8 w-20 text-xs bg-background"
                                value={sub.percentage}
                                onChange={(e) => updateSubTax(index, 'percentage', e.target.value)}
                            />
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => removeSubTax(index)}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-3 bg-muted/50 p-4">
              <Button variant="ghost" onClick={() => setIsTaxModalOpen(false)}>Cancel</Button>
              <Button onClick={handleSaveTax}>Save Tax Rule</Button>
            </CardFooter>
          </Card>
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tax Name</TableHead>
              <TableHead>Percentage</TableHead>
              <TableHead>Applicability</TableHead>
              <TableHead>Region</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {formData.taxes.map((tax) => (
              <TableRow key={tax.id}>
                <TableCell>
                  <div className="font-medium">{tax.type}</div>
                  {/* Nested Text Display */}
                  {tax.subTaxes && tax.subTaxes.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-x-2 text-xs text-muted-foreground">
                          {tax.subTaxes.map((sub, idx) => (
                              <span key={idx} className="flex items-center">
                                  {idx > 0 && <span className="mr-2 text-muted-foreground/30">|</span>}
                                  {sub.name}: {sub.percentage}
                              </span>
                          ))}
                      </div>
                  )}
                </TableCell>
                <TableCell>{tax.percentage}</TableCell>
                <TableCell>{tax.applicability || 'All Items'}</TableCell>
                <TableCell>{tax.region}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEditTax(tax)}><Edit2 className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => handleDeleteTax(tax.id)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {formData.taxes.length === 0 && (
                <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        No tax rules defined. Click "Add Tax Rule" to start.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-8">
      <div className="rounded-lg border bg-muted/20 p-4 text-center">
         <h3 className="text-lg font-bold">Review Application</h3>
         <p className="text-sm text-muted-foreground">Please verify all details before creating your account.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 py-3 pb-2 border-b">
               <CardTitle className="text-sm font-bold">Company Details</CardTitle>
               <Button variant="ghost" size="sm" onClick={() => setCurrentStep(1)} className="text-xs h-7">Edit</Button>
            </CardHeader>
            <CardContent className="pt-4">
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-muted-foreground">Name:</dt> <dd className="font-medium">{formData.name || 'N/A'}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Type:</dt> <dd className="font-medium">{formData.type}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Tax ID:</dt> <dd className="font-medium">{formData.taxId || 'N/A'}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Location:</dt> <dd className="font-medium">{formData.location || 'N/A'}</dd></div>
              </dl>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
             <CardHeader className="flex flex-row items-center justify-between space-y-0 py-3 pb-2 border-b">
               <CardTitle className="text-sm font-bold">Warehouse Setup</CardTitle>
               <Button variant="ghost" size="sm" onClick={() => setCurrentStep(3)} className="text-xs h-7">Edit</Button>
            </CardHeader>
            <CardContent className="pt-4">
               <p className="text-sm text-foreground">{formData.warehouses.length} Warehouse{formData.warehouses.length !== 1 ? 's' : ''} Configured</p>
               <ul className="mt-2 list-inside list-disc text-sm text-muted-foreground">
                 {formData.warehouses.map(wh => (
                   <li key={wh.id}>{wh.name} ({wh.zones.length} Zones)</li>
                 ))}
               </ul>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="shadow-sm">
             <CardHeader className="flex flex-row items-center justify-between space-y-0 py-3 pb-2 border-b">
               <CardTitle className="text-sm font-bold">Methods</CardTitle>
               <Button variant="ghost" size="sm" onClick={() => setCurrentStep(2)} className="text-xs h-7">Edit</Button>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div>
                <span className="block text-xs font-semibold uppercase text-muted-foreground mb-1">Stock In</span>
                <div className="flex flex-wrap gap-1">
                  {formData.stockIn.map(m => <span key={m} className="inline-flex items-center rounded-sm border px-2 py-0.5 text-xs font-medium bg-muted">{m}</span>)}
                  {formData.stockIn.length === 0 && <span className="text-xs text-muted-foreground">None selected</span>}
                </div>
              </div>
              <div>
                <span className="block text-xs font-semibold uppercase text-muted-foreground mb-1">Stock Out</span>
                 <div className="flex flex-wrap gap-1">
                  {formData.stockOut.map(m => <span key={m} className="inline-flex items-center rounded-sm border px-2 py-0.5 text-xs font-medium bg-muted">{m}</span>)}
                  {formData.stockOut.length === 0 && <span className="text-xs text-muted-foreground">None selected</span>}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
             <CardHeader className="flex flex-row items-center justify-between space-y-0 py-3 pb-2 border-b">
               <CardTitle className="text-sm font-bold">Taxes</CardTitle>
               <Button variant="ghost" size="sm" onClick={() => setCurrentStep(4)} className="text-xs h-7">Edit</Button>
            </CardHeader>
            <CardContent className="pt-4">
               <div className="text-sm space-y-2">
                {formData.taxes.map(t => (
                  <div key={t.id} className="flex flex-col py-1 border-b last:border-0 border-muted">
                    <div className="flex justify-between">
                        <span>{t.type}</span>
                        <span className="font-medium">{t.percentage}</span>
                    </div>
                    {t.subTaxes && t.subTaxes.length > 0 && (
                        <div className="text-xs text-muted-foreground mt-0.5 pl-2 border-l-2 ml-1">
                            {t.subTaxes.map(s => `${s.name} (${s.percentage})`).join(', ')}
                        </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-muted/40 p-6 md:p-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-neutral-900">Create Company Account</h1>
          <p className="text-neutral-500">Setup your enterprise inventory environment</p>
        </div>

        {renderProgress()}

        <Card className="min-h-[400px] border shadow-sm">
          <CardContent className="p-8">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
            {currentStep === 5 && renderStep5()}
          </CardContent>
        </Card>

        {/* Footer Actions */}
        <div className="mt-8 flex justify-between border-t border-neutral-200 pt-6">
          <Button 
            variant="outline" 
            onClick={handleBack}
            className="w-32"
          >
            {currentStep === 1 ? 'Cancel' : 'Back'}
          </Button>
          
          <Button 
            onClick={handleNext}
            className="w-32"
          >
            {currentStep === 5 ? 'Create Account' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
}
