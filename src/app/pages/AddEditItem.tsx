import React from 'react';
import { Button } from '../components/wireframe/Button';
import { Input } from '../components/wireframe/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/wireframe/Card';
import { ScanBarcode } from 'lucide-react';

export function AddEditItem() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Add New Item</h1>
        <Button variant="ghost">Cancel</Button>
      </div>

      <div className="space-y-6">
        {/* Basic Info Section */}
        <Card className="bg-neutral-50 border-neutral-200">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input label="Item Name" placeholder="Enter item name" />
            <div className="grid grid-cols-2 gap-4">
              <Input label="SKU" placeholder="Auto-generated" />
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-600 uppercase tracking-wider">Barcode / UPC</label>
                <div className="relative">
                  <input 
                    className="flex h-10 w-full rounded-sm border border-neutral-300 bg-white pl-3 pr-10 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Scan or enter barcode" 
                  />
                  <button className="absolute right-0 top-0 h-full px-3 text-neutral-500 hover:text-neutral-900 transition-colors">
                    <ScanBarcode className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-600 uppercase tracking-wider">Category</label>
              <div className="flex h-10 w-full rounded-sm border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-500">
                Select Category...
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-600 uppercase tracking-wider">Description</label>
              <textarea 
                className="flex min-h-[80px] w-full rounded-sm border border-neutral-300 bg-white px-3 py-2 text-sm placeholder:text-neutral-400 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-neutral-400"
                placeholder="Enter item description..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Inventory Details */}
        <Card className="bg-neutral-50 border-neutral-200">
          <CardHeader>
            <CardTitle>Inventory Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <Input label="Sale Price" placeholder="0.00" />
              <Input label="Cost Price" placeholder="0.00" />
              <Input label="Tax Rate (%)" placeholder="0" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Reorder Point" placeholder="10" />
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-600 uppercase tracking-wider">Unit of Measure</label>
                <div className="flex h-10 w-full rounded-sm border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-500">
                  Pieces (pcs)
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <Button variant="ghost">Cancel</Button>
          <Button>Save Item</Button>
        </div>
      </div>
    </div>
  );
}
