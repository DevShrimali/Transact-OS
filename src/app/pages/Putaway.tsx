import React from 'react';
import { Button } from '../components/wireframe/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/wireframe/Table';
import { Badge } from '../components/wireframe/Badge';

export function Putaway() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Inventory Putaway</h1>
        <Button variant="secondary">Scan Barcode</Button>
      </div>

      <div className="rounded-sm border border-neutral-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item Details</TableHead>
              <TableHead className="w-[100px]">Qty</TableHead>
              <TableHead className="w-[200px]">Warehouse</TableHead>
              <TableHead className="w-[150px]">Zone</TableHead>
              <TableHead className="w-[150px]">Rack</TableHead>
              <TableHead className="w-[150px]">Bin</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3].map((i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="font-medium">SKU-200{i}</div>
                  <div className="text-xs text-neutral-500">Incoming Shipment #GRN-{100+i}</div>
                </TableCell>
                <TableCell>50</TableCell>
                <TableCell>
                   <div className="flex h-9 w-full items-center rounded-sm border border-neutral-300 bg-white px-2 text-xs text-neutral-500">
                      Main Warehouse
                   </div>
                </TableCell>
                <TableCell>
                   <div className="flex h-9 w-full items-center rounded-sm border border-neutral-300 bg-white px-2 text-xs text-neutral-500">
                      Zone A
                   </div>
                </TableCell>
                <TableCell>
                   <div className="flex h-9 w-full items-center rounded-sm border border-neutral-300 bg-white px-2 text-xs text-neutral-500">
                      Rack {i}
                   </div>
                </TableCell>
                <TableCell>
                   <div className="flex h-9 w-full items-center rounded-sm border border-neutral-300 bg-white px-2 text-xs text-neutral-500">
                      Bin 0{i}
                   </div>
                </TableCell>
                <TableCell>
                   <div className="h-4 w-4 rounded-full border border-neutral-300 bg-neutral-100"></div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end gap-4 bg-neutral-50 p-4 border border-neutral-200 border-t-0 rounded-b-sm">
        <Button variant="ghost">Cancel</Button>
        <Button>Confirm Putaway</Button>
      </div>
    </div>
  );
}
