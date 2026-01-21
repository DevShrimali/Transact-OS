import React, { useState } from 'react';
import { Button } from '../components/wireframe/Button';
import { Input } from '../components/wireframe/Input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/wireframe/Table';
import { Card, CardContent, CardHeader, CardTitle } from '../components/wireframe/Card';
import { Badge } from '../components/wireframe/Badge';

export function SalesOrder() {
  const [view, setView] = useState<'list' | 'detail'>('list');

  if (view === 'detail') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-4">
             <Button variant="outline" size="sm" onClick={() => setView('list')}>← Back</Button>
             <h1 className="text-2xl font-bold tracking-tight">Order #SO-2024-001</h1>
             <Badge variant="secondary">Processing</Badge>
           </div>
           <div className="flex gap-2">
             <Button variant="outline">Print Invoice</Button>
             <Button>Ship Order</Button>
           </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
           <Card className="md:col-span-2 space-y-6 p-6">
              <div className="border-b border-neutral-100 pb-4">
                <h3 className="font-semibold mb-4">Order Items</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead className="text-right">Qty</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Premium Widget A</TableCell>
                      <TableCell className="text-right">2</TableCell>
                      <TableCell className="text-right">$ 50.00</TableCell>
                      <TableCell className="text-right">$ 100.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Basic Component B</TableCell>
                      <TableCell className="text-right">5</TableCell>
                      <TableCell className="text-right">$ 10.00</TableCell>
                      <TableCell className="text-right">$ 50.00</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div className="flex justify-end">
                 <div className="w-48 space-y-2">
                    <div className="flex justify-between text-sm"><span>Subtotal</span><span>$ 150.00</span></div>
                    <div className="flex justify-between text-sm"><span>Tax</span><span>$ 15.00</span></div>
                    <div className="flex justify-between font-bold border-t border-neutral-200 pt-2"><span>Total</span><span>$ 165.00</span></div>
                 </div>
              </div>
           </Card>

           <div className="space-y-6">
              <Card>
                <CardHeader><CardTitle>Customer Details</CardTitle></CardHeader>
                <CardContent>
                   <p className="font-medium">Acme Corp.</p>
                   <p className="text-sm text-neutral-500 mt-1">contact@acme.com</p>
                   <p className="text-sm text-neutral-500">+1 (555) 123-4567</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Shipping Address</CardTitle></CardHeader>
                <CardContent>
                   <p className="text-sm text-neutral-600">
                     123 Business Park Dr.<br/>
                     Suite 400<br/>
                     Tech City, TC 94000
                   </p>
                </CardContent>
              </Card>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Sales Orders</h1>
        <Button>+ Create Order</Button>
      </div>

      <div className="flex items-end gap-4 rounded-sm border border-neutral-200 bg-white p-4">
        <div className="flex-1">
          <Input placeholder="Search orders..." />
        </div>
        <Button variant="secondary">Filter</Button>
      </div>

      <div className="rounded-sm border border-neutral-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4, 5].map((i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">SO-2024-00{i}</TableCell>
                <TableCell>Acme Corp {i}</TableCell>
                <TableCell>2024-01-1{i}</TableCell>
                <TableCell>$ {100 * i}.00</TableCell>
                <TableCell><Badge variant="secondary">Processing</Badge></TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => setView('detail')}>View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
