
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription
} from '@/app/components/ui/dialog';
import { Info, ArrowDown } from 'lucide-react';

import { inventoryStats, mockUsers, initialWarehouseData, mockDiscounts } from '@/app/data/mockSystemData';

export function ProjectFlowModal() {
  const activeCampaigns = mockDiscounts.filter(d => d.status === 'active').length;
  const warehouseCount = initialWarehouseData.length;
  const activeUsers = mockUsers.filter(u => u.status === 'active').length;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button 
          className="fixed top-4 right-4 p-2 rounded-full bg-secondary/80 hover:bg-secondary text-secondary-foreground transition-colors z-50 backdrop-blur-sm border border-border"
          title="View Project Flow"
        >
          <Info className="w-5 h-5" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] w-full lg:max-w-7xl max-h-[90vh] overflow-y-auto bg-background text-foreground border-border">
        <DialogHeader>
          <DialogTitle>Project Architecture Flow</DialogTitle>
          <DialogDescription className="sr-only">
            A visual representation of the application structure and user flow, detailing all modules including Inventory, POS, and Administration.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex justify-center p-4 lg:p-8 min-w-fit">
          <div className="flex flex-col items-center w-full">
            
            {/* System Root */}
            <div className="flex flex-col items-center mb-1">
               <div className="px-6 py-2 border border-border bg-card rounded-full text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                 SaaS Provider
               </div>
               <div className="px-8 py-4 border-2 border-foreground bg-foreground text-background rounded-xl font-bold shadow-md text-lg">
                 Enlight Vision
               </div>
               <div className="h-6 w-px bg-border"></div>
            </div>

            {/* Authentication & Setup Sequence */}
            <div className="flex flex-col items-center gap-0 relative">
              {/* Login */}
              <div className="flex flex-col items-center z-10">
                <div className="px-6 py-3 border-2 border-foreground/80 bg-card text-card-foreground rounded-lg font-bold shadow-sm min-w-[200px] text-center">
                  Login Screen
                </div>
                <ArrowDown className="w-4 h-4 text-muted-foreground my-1" />
              </div>

              {/* Validate */}
              <div className="flex flex-col items-center z-10">
                <div className="px-4 py-2 border border-border bg-secondary text-secondary-foreground rounded-md text-sm font-medium">
                  Validate Credentials
                </div>
                <ArrowDown className="w-4 h-4 text-muted-foreground my-1" />
              </div>

              {/* Company Master */}
              <div className="flex flex-col items-center z-10">
                <div className="px-4 py-2 border border-border bg-secondary text-secondary-foreground rounded-md text-sm font-medium">
                  Company Master (EV Mart)
                </div>
                <ArrowDown className="w-4 h-4 text-muted-foreground my-1" />
              </div>

              {/* Staff Profiling */}
              <div className="flex flex-col items-center z-10">
                <div className="px-4 py-2 border border-border bg-secondary text-secondary-foreground rounded-md text-sm font-medium">
                  Staff Profiling
                </div>
                <div className="h-8 w-px bg-border"></div>
              </div>
            </div>

            {/* Dashboard Root */}
            <div className="flex flex-col items-center w-full">
              <div className="px-10 py-4 border-2 border-foreground rounded-xl font-bold bg-card text-card-foreground mb-8 z-10 shadow-lg text-xl">
                Inventory Dashboard
              </div>
              
              {/* Branches Container */}
              <div className="relative flex flex-col lg:flex-row justify-center items-start gap-12 w-full px-4">
                
                {/* Horizontal Connector (Desktop) */}
                <div className="hidden lg:block absolute top-0 left-[15%] right-[15%] h-px border-t-2 border-dashed border-border"></div>
                <div className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 h-8 w-px border-l-2 border-dashed border-border origin-top"></div>

                {/* Branch 1: Inventory & Operations */}
                <div className="flex flex-col items-center relative flex-1 w-full lg:w-auto">
                   <div className="hidden lg:block absolute -top-8 left-1/2 -translate-x-1/2 h-8 w-px border-l-2 border-dashed border-border"></div>
                   <div className="px-6 py-3 border-l-4 border-muted-foreground rounded-r-md bg-card shadow-sm w-full mb-4">
                     <h3 className="font-bold text-lg text-card-foreground">Inventory & Operations</h3>
                     <p className="text-xs text-muted-foreground">Phase 1</p>
                   </div>
                   
                   <div className="w-full bg-muted/30 rounded-lg p-4 border border-border flex flex-col gap-3">
                     <ModuleNode label={`Item Master (${inventoryStats.totalSkus} SKUs)`} />
                     <ModuleNode label="Duplication Check" />
                     <ModuleNode label={`Warehouse Model (${warehouseCount} Facilities)`} />
                     <div className="h-px bg-border w-full my-1"></div>
                     <ModuleNode label="Inward Entry (Invoice)" />
                     <ModuleNode label="Putaway (Bin Allocation)" />
                     <ModuleNode label="Stock Ledger" />
                   </div>
                </div>

                {/* Branch 2: POS & Billing Flow */}
                <div className="flex flex-col items-center relative flex-1 w-full lg:w-auto">
                   <div className="hidden lg:block absolute -top-8 left-1/2 -translate-x-1/2 h-8 w-px border-l-2 border-dashed border-border"></div>
                   <div className="px-6 py-3 border-l-4 border-muted-foreground rounded-r-md bg-card shadow-sm w-full mb-4">
                     <h3 className="font-bold text-lg text-card-foreground">POS & Billing System</h3>
                     <p className="text-xs text-muted-foreground">Phase 2 Flow</p>
                   </div>

                   {/* Linear Process Flow */}
                   <div className="w-full bg-muted/30 rounded-lg p-4 border border-border flex flex-col gap-0">
                     <ProcessStep label="POS Start" isFirst />
                     <ProcessStep label={`Active Campaigns: ${activeCampaigns}`} />
                     <ProcessStep label="Item Search & Stock Check" />
                     <ProcessStep label="Add to Cart" />
                     <ProcessStep label="Discount & Tax Calc" />
                     <div className="flex w-full gap-2 my-1">
                        <div className="flex-1 py-1.5 px-2 bg-card border border-border rounded text-center text-xs font-medium text-foreground">Pay Now</div>
                        <div className="flex-1 py-1.5 px-2 bg-card border border-border rounded text-center text-xs font-medium text-foreground">Pay Later</div>
                     </div>
                     <ProcessStep label="Gateway Auth" />
                     <ProcessStep label="Receipt Generation" />
                     <ProcessStep label="Inventory Sync" isLast />
                   </div>
                </div>

                {/* Branch 3: Administration */}
                <div className="flex flex-col items-center relative flex-1 w-full lg:w-auto">
                   <div className="hidden lg:block absolute -top-8 left-1/2 -translate-x-1/2 h-8 w-px border-l-2 border-dashed border-border"></div>
                   <div className="px-6 py-3 border-l-4 border-muted-foreground rounded-r-md bg-card shadow-sm w-full mb-4">
                     <h3 className="font-bold text-lg text-card-foreground">Administration</h3>
                     <p className="text-xs text-muted-foreground">Setup & Reports</p>
                   </div>
                   
                   <div className="w-full bg-muted/30 rounded-lg p-4 border border-border flex flex-col gap-3">
                     <ModuleNode label="Tax Config & Rules" />
                     <ModuleNode label="Vendor Master" />
                     <ModuleNode label={`Staff Mgmt (${activeUsers} Active)`} />
                     <div className="h-px bg-border w-full my-1"></div>
                     <ModuleNode label="Sales Reports" />
                     <ModuleNode label="Audit Logs" />
                     <ModuleNode label="System Complete" />
                   </div>
                </div>

              </div>
            </div>

          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-border text-xs text-muted-foreground text-center pb-4">
           University / Inventory Information Management System (UIMS) Flow Architecture
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ModuleNode({ label }: { label: string }) {
  return (
    <div className="px-3 py-2.5 border border-border rounded-md text-sm text-foreground bg-card shadow-sm hover:border-primary/50 hover:shadow transition-all flex items-center gap-2">
      <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground"></div>
      {label}
    </div>
  );
}

function ProcessStep({ label, isFirst = false, isLast = false }: { label: string, isFirst?: boolean, isLast?: boolean }) {
  return (
    <div className="flex flex-col items-center w-full">
      {!isFirst && <div className="h-3 w-px bg-border"></div>}
      <div className={`
        w-full px-3 py-2 border rounded-md text-sm text-center font-medium shadow-sm transition-all
        ${isLast 
          ? 'bg-foreground text-background border-foreground' 
          : 'bg-card text-foreground border-border hover:border-primary/50'}
      `}>
        {label}
      </div>
    </div>
  );
}
