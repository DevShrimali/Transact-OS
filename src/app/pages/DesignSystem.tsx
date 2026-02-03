
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Checkbox } from "@/app/components/ui/checkbox";
import { Switch } from "@/app/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Type, Palette, Layout, MousePointer, Box, List as ListIcon } from "lucide-react";

export function DesignSystem() {


  const colors = [
    { name: "Primary", variable: "bg-primary", text: "text-primary-foreground" },
    { name: "Secondary", variable: "bg-secondary", text: "text-secondary-foreground" },
    { name: "Accent", variable: "bg-accent", text: "text-accent-foreground" },
    { name: "Muted", variable: "bg-muted", text: "text-muted-foreground" },
    { name: "Destructive", variable: "bg-destructive", text: "text-destructive-foreground" },
    { name: "Background", variable: "bg-background", text: "text-foreground", border: "border" },
    { name: "Card", variable: "bg-card", text: "text-card-foreground", border: "border" },
  ];

  return (
    <div className="max-w-[1600px] mx-auto p-8 space-y-12 pb-32">
      <div className="space-y-4">
        <Badge variant="outline" className="text-xs font-black tracking-[0.3em] uppercase border-primary/20 text-primary">Design System v2.4</Badge>
        <h1 className="text-5xl font-black tracking-tighter text-foreground">
          Transact<span className="text-primary">OS</span> <span className="text-muted-foreground font-light">UI Library</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl font-medium">
          A comprehensive guide to the atomic components, design tokens, and visual patterns that power the TransactOS interface.
        </p>
      </div>

      <div className="absolute top-8 right-8">
        <Button 
          variant="outline" 
          onClick={() => window.location.href = '/'}
          className="gap-2"
        >
          Exit Documentation
        </Button>
      </div>

      <Tabs defaultValue="typography" className="w-full">
        <TabsList className="h-14 p-1 bg-muted/50 rounded-xl mb-8 w-full justify-start overflow-x-auto">
          {[
            { id: "typography", label: "Typography", icon: Type },
            { id: "colors", label: "Color Palette", icon: Palette },
            { id: "buttons", label: "Buttons & Actions", icon: MousePointer },
            { id: "inputs", label: "Forms & Controls", icon: Layout },
            { id: "cards", label: "Cards & Surfaces", icon: Box },
            { id: "data", label: "Data Display", icon: ListIcon },
          ].map((tab) => (
            <TabsTrigger 
              key={tab.id} 
              value={tab.id}
              className="h-12 px-6 rounded-lg text-sm font-bold uppercase tracking-wide gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
            >
              <tab.icon className="h-4 w-4" /> {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* TYPOGRAPHY */}
        <TabsContent value="typography" className="space-y-8 animate-in fade-in-50 duration-500">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                 <div className="space-y-2">
                    <span className="text-xs font-mono text-muted-foreground">Display / H1 / Font Black</span>
                    <h1 className="text-6xl font-black tracking-tighter">The quick brown fox</h1>
                 </div>
                 <div className="space-y-2">
                    <span className="text-xs font-mono text-muted-foreground">Heading / H2 / Font Bold</span>
                    <h2 className="text-4xl font-bold tracking-tight">Jumps over the lazy dog</h2>
                 </div>
                 <div className="space-y-2">
                    <span className="text-xs font-mono text-muted-foreground">Heading / H3 / Font Bold</span>
                    <h3 className="text-3xl font-bold tracking-tight">Pack my box with five dozen liquor jugs</h3>
                 </div>
                 <div className="space-y-2">
                    <span className="text-xs font-mono text-muted-foreground">Heading / H4 / Font Semibold</span>
                    <h4 className="text-xl font-semibold tracking-tight">Sphinx of black quartz, judge my vow</h4>
                 </div>
              </div>
              <div className="space-y-8">
                 <div className="space-y-2">
                    <span className="text-xs font-mono text-muted-foreground">Body / Large</span>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Domines, ut aiunt, luce clarior est.
                    </p>
                 </div>
                 <div className="space-y-2">
                    <span className="text-xs font-mono text-muted-foreground">Body / Base</span>
                    <p className="text-base leading-relaxed text-muted-foreground">
                       Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                 </div>
                 <div className="space-y-2">
                    <span className="text-xs font-mono text-muted-foreground">Caption / Small</span>
                    <p className="text-sm font-medium text-muted-foreground">
                       Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu.
                    </p>
                 </div>
                 <div className="space-y-2">
                    <span className="text-xs font-mono text-muted-foreground">Micro / Uppercase</span>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                       System Status: Operational
                    </p>
                 </div>
              </div>
           </div>
        </TabsContent>

        {/* COLORS */}
        <TabsContent value="colors" className="space-y-8 animate-in fade-in-50 duration-500">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {colors.map((color, i) => (
                 <div key={i} className={`h-32 rounded-2xl ${color.variable} p-6 flex flex-col justify-between shadow-sm ${color.border ? 'border' : ''}`}>
                    <span className={`text-xs font-black uppercase tracking-widest ${color.text}`}>
                       {color.name}
                    </span>
                    <span className={`text-xs font-mono opacity-60 ${color.text}`}>
                       var(--{color.name.toLowerCase()})
                    </span>
                 </div>
              ))}
           </div>
        </TabsContent>

        {/* BUTTONS */}
        <TabsContent value="buttons" className="space-y-8 animate-in fade-in-50 duration-500">
           <div className="flex flex-wrap gap-6 items-center">
              <Button>Default Button</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link Style</Button>
           </div>
           <div className="flex flex-wrap gap-6 items-center">
              <Button size="lg" className="rounded-xl font-bold">Large Rounded</Button>
              <Button size="default">Default</Button>
              <Button size="sm">Small</Button>
              <Button size="icon"><MousePointer className="h-4 w-4" /></Button>
           </div>
           <div className="p-8 bg-slate-900 rounded-2xl flex gap-6 items-center">
              <Button className="shadow-lg shadow-primary/20">Glow Effect</Button>
              <Button variant="outline" className="border-white/10 text-white hover:bg-white/10 hover:text-white">Dark Mode</Button>
           </div>
        </TabsContent>

        {/* INPUTS */}
        <TabsContent value="inputs" className="space-y-8 animate-in fade-in-50 duration-500">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
              <div className="space-y-4">
                 <div className="space-y-2">
                    <Label>Email Address</Label>
                    <Input placeholder="user@example.com" />
                 </div>
                 <div className="space-y-2">
                    <Label>Password</Label>
                    <Input type="password" value="secretpassword" />
                 </div>
                 <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms">Accept terms and conditions</Label>
                 </div>
              </div>
              <div className="space-y-4">
                 <div className="space-y-2">
                    <Label>Role Selection</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrator</SelectItem>
                        <SelectItem value="user">Standard User</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                 </div>
                 <div className="flex items-center justify-between p-4 border rounded-xl">
                    <Label>Dark Mode Preferences</Label>
                    <Switch />
                 </div>
              </div>
           </div>
        </TabsContent>

        {/* CARDS */}
        <TabsContent value="cards" className="space-y-8 animate-in fade-in-50 duration-500">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                 <CardHeader>
                    <CardTitle>Standard Card</CardTitle>
                    <CardDescription>Basic container for content</CardDescription>
                 </CardHeader>
                 <CardContent>
                    Cards contain content and actions about a single subject.
                 </CardContent>
              </Card>

              <Card className="bg-slate-900 text-white border-none shadow-2xl">
                 <CardHeader>
                    <CardTitle className="text-white">Dark Surface</CardTitle>
                    <CardDescription className="text-slate-400">High contrast variant</CardDescription>
                 </CardHeader>
                 <CardContent>
                    Used for emphasis or distinct dashboard sections.
                 </CardContent>
              </Card>

              <Card className="border-dashed border-2 shadow-none bg-muted/30">
                 <CardHeader>
                    <CardTitle>Ghost / Placeholder</CardTitle>
                    <CardDescription>For empty states or secondary info</CardDescription>
                 </CardHeader>
                 <CardContent className="flex items-center justify-center py-8">
                    <Box className="h-10 w-10 text-muted-foreground/20" />
                 </CardContent>
              </Card>
           </div>
        </TabsContent>

      </Tabs>
    </div>
  );
}
