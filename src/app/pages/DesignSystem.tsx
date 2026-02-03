
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
// Tabs removed
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

      <div className="space-y-24">
        
        {/* TYPOGRAPHY */}
        <section id="typography" className="space-y-8 scroll-mt-24">
           <div className="flex items-center gap-4 pb-6 border-b">
               <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-sm border border-primary/20">
                   <Type className="h-6 w-6" />
               </div>
               <div>
                   <h2 className="text-2xl font-black tracking-tight">Typography</h2>
                   <p className="text-muted-foreground font-medium">Headings, body text, and hierarchal scales.</p>
               </div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="space-y-10">
                 <div className="space-y-3">
                    <span className="text-xs font-mono font-bold text-muted-foreground bg-muted px-2 py-1 rounded-md w-fit">Display / H1 / 6xl</span>
                    <h1 className="text-6xl font-black tracking-tighter">The quick brown fox</h1>
                 </div>
                 <div className="space-y-3">
                    <span className="text-xs font-mono font-bold text-muted-foreground bg-muted px-2 py-1 rounded-md w-fit">Heading / H2 / 4xl</span>
                    <h2 className="text-4xl font-bold tracking-tight">Jumps over the lazy dog</h2>
                 </div>
                 <div className="space-y-3">
                    <span className="text-xs font-mono font-bold text-muted-foreground bg-muted px-2 py-1 rounded-md w-fit">Heading / H3 / 3xl</span>
                    <h3 className="text-3xl font-bold tracking-tight">Pack my box with five dozen liquor jugs</h3>
                 </div>
                 <div className="space-y-3">
                    <span className="text-xs font-mono font-bold text-muted-foreground bg-muted px-2 py-1 rounded-md w-fit">Heading / H4 / xl</span>
                    <h4 className="text-xl font-semibold tracking-tight">Sphinx of black quartz, judge my vow</h4>
                 </div>
              </div>
              <div className="space-y-10">
                 <div className="space-y-3">
                    <span className="text-xs font-mono font-bold text-muted-foreground bg-muted px-2 py-1 rounded-md w-fit">Body / Large</span>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Domines, ut aiunt, luce clarior est.
                    </p>
                 </div>
                 <div className="space-y-3">
                    <span className="text-xs font-mono font-bold text-muted-foreground bg-muted px-2 py-1 rounded-md w-fit">Body / Base</span>
                    <p className="text-base leading-relaxed text-muted-foreground">
                       Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                 </div>
                 <div className="space-y-3">
                    <span className="text-xs font-mono font-bold text-muted-foreground bg-muted px-2 py-1 rounded-md w-fit">Caption / Small</span>
                    <p className="text-sm font-medium text-muted-foreground">
                       Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu.
                    </p>
                 </div>
                 <div className="space-y-3">
                    <span className="text-xs font-mono font-bold text-muted-foreground bg-muted px-2 py-1 rounded-md w-fit">Micro / Uppercase</span>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                       System Status: Operational
                    </p>
                 </div>
              </div>
           </div>
        </section>

        {/* COLORS */}
        <section id="colors" className="space-y-8 scroll-mt-24">
           <div className="flex items-center gap-4 pb-6 border-b">
               <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-sm border border-primary/20">
                   <Palette className="h-6 w-6" />
               </div>
               <div>
                   <h2 className="text-2xl font-black tracking-tight">Color Palette</h2>
                   <p className="text-muted-foreground font-medium">Core application colors and tonal variations.</p>
               </div>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {colors.map((color, i) => (
                 <div key={i} className={`h-40 rounded-2xl ${color.variable} p-6 flex flex-col justify-between shadow-sm ${color.border ? 'border' : ''} transition-transform hover:scale-[1.02]`}>
                    <span className={`text-xs font-black uppercase tracking-widest ${color.text}`}>
                       {color.name}
                    </span>
                    <span className={`text-xs font-mono opacity-80 ${color.text} bg-black/5 px-2 py-1 rounded w-fit`}>
                       var(--{color.name.toLowerCase()})
                    </span>
                 </div>
              ))}
           </div>
        </section>

        {/* BUTTONS */}
        <section id="buttons" className="space-y-8 scroll-mt-24">
           <div className="flex items-center gap-4 pb-6 border-b">
               <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-sm border border-primary/20">
                   <MousePointer className="h-6 w-6" />
               </div>
               <div>
                   <h2 className="text-2xl font-black tracking-tight">Buttons & Actions</h2>
                   <p className="text-muted-foreground font-medium">Interactive triggers and call-to-actions.</p>
               </div>
           </div>

           <div className="space-y-8 p-10 border rounded-3xl bg-slate-50/50">
               <div className="flex flex-wrap gap-8 items-center justify-center">
                  <Button>Default Button</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="link">Link Style</Button>
               </div>
               <div className="flex flex-wrap gap-8 items-center justify-center">
                  <Button size="lg" className="rounded-xl font-bold">Large Rounded</Button>
                  <Button size="default">Default</Button>
                  <Button size="sm">Small</Button>
                  <Button size="icon"><MousePointer className="h-4 w-4" /></Button>
               </div>
               <div className="p-10 bg-slate-900 rounded-2xl flex gap-8 items-center justify-center shadow-inner">
                  <Button className="shadow-lg shadow-primary/20 border border-primary/20">Glow Effect</Button>
                  <Button variant="outline" className="border-white/10 text-white hover:bg-white/10 hover:text-white hover:border-white">Dark Mode</Button>
               </div>
           </div>
        </section>

        {/* INPUTS */}
        <section id="inputs" className="space-y-8 scroll-mt-24">
           <div className="flex items-center gap-4 pb-6 border-b">
               <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-sm border border-primary/20">
                   <Layout className="h-6 w-6" />
               </div>
               <div>
                   <h2 className="text-2xl font-black tracking-tight">Forms & Controls</h2>
                   <p className="text-muted-foreground font-medium">Input fields, switches, and selection mechanisms.</p>
               </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto border p-12 rounded-3xl bg-white shadow-sm">
              <div className="space-y-6">
                 <div className="space-y-2.5">
                    <Label className="text-xs uppercase font-black tracking-widest text-muted-foreground">Email Address</Label>
                    <Input placeholder="user@example.com" className="h-11" />
                 </div>
                 <div className="space-y-2.5">
                    <Label className="text-xs uppercase font-black tracking-widest text-muted-foreground">Password</Label>
                    <Input type="password" value="secretpassword" className="h-11" />
                 </div>
                 <div className="flex items-center space-x-3 pt-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms" className="font-medium">Accept terms and conditions</Label>
                 </div>
              </div>
              <div className="space-y-6">
                 <div className="space-y-2.5">
                    <Label className="text-xs uppercase font-black tracking-widest text-muted-foreground">Role Selection</Label>
                    <Select>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrator</SelectItem>
                        <SelectItem value="user">Standard User</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                 </div>
                 <div className="flex items-center justify-between p-5 border rounded-xl bg-slate-50">
                    <div className="space-y-1">
                        <Label className="font-black">Dark Mode</Label>
                        <p className="text-xs text-muted-foreground">Toggle theme preference</p>
                    </div>
                    <Switch />
                 </div>
              </div>
           </div>
        </section>

        {/* CARDS */}
        <section id="cards" className="space-y-8 scroll-mt-24">
           <div className="flex items-center gap-4 pb-6 border-b">
               <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-sm border border-primary/20">
                   <Box className="h-6 w-6" />
               </div>
               <div>
                   <h2 className="text-2xl font-black tracking-tight">Cards & Surfaces</h2>
                   <p className="text-muted-foreground font-medium">Containers and structural elements.</p>
               </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="shadow-lg border-muted">
                 <CardHeader>
                    <CardTitle>Standard Card</CardTitle>
                    <CardDescription>Basic container for content</CardDescription>
                 </CardHeader>
                 <CardContent>
                    Cards contain content and actions about a single subject.
                 </CardContent>
              </Card>

              <Card className="bg-slate-900 text-white border-none shadow-xl shadow-slate-900/20">
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
        </section>

      </div>
    </div>
  );
}
