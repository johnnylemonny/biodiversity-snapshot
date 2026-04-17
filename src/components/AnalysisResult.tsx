import type { BiodiversityInfo } from "@/lib/gemini";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TreePine, Info, ShieldCheck, Leaf } from "lucide-react";

interface AnalysisResultProps {
  data: BiodiversityInfo;
}

const statusColors = {
  "Least Concern": "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  "Near Threatened": "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  "Vulnerable": "bg-orange-500/10 text-orange-600 border-orange-500/20",
  "Endangered": "bg-red-500/10 text-red-600 border-red-500/20",
  "Critically Endangered": "bg-red-700/10 text-red-700 border-red-700/20",
  "Extinct": "bg-gray-500/10 text-gray-600 border-gray-500/20",
  "Unknown": "bg-muted text-muted-foreground border-transparent",
};

export function AnalysisResult({ data }: AnalysisResultProps) {
  return (
    <div className="grid gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <Card className="flex-1 overflow-hidden border-none bg-gradient-to-br from-primary/5 to-transparent shadow-none">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline" className={statusColors[data.conservationStatus] || statusColors.Unknown}>
                {data.conservationStatus}
              </Badge>
              <span className="text-xs font-medium text-muted-foreground italic uppercase tracking-wider">
                {data.family}
              </span>
            </div>
            <CardTitle className="text-4xl font-bold text-primary tracking-tight">
              {data.name}
            </CardTitle>
            <CardDescription className="text-xl font-medium italic text-muted-foreground">
              {data.scientificName}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex gap-3 items-start p-4 rounded-2xl bg-white/50 dark:bg-black/20 border border-white/50 backdrop-blur-sm">
              <div className="p-2 rounded-xl bg-primary/10">
                <TreePine className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1 uppercase tracking-wider text-muted-foreground">Ecological Role</h4>
                <p className="leading-relaxed">{data.ecologicalRole}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="border-none bg-card shadow-lg shadow-black/5 rounded-3xl overflow-hidden group hover:shadow-primary/5 transition-all">
          <CardHeader className="flex flex-row items-center gap-3 pb-2 space-y-0">
            <div className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <ShieldCheck className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className="text-lg">Conservation</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {data.protectionTips.map((tip, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed group/item">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0 group-hover/item:scale-150 transition-transform" />
                  {tip}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-none bg-primary text-primary-foreground shadow-lg shadow-primary/20 rounded-3xl overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
            <Leaf className="w-32 h-32" />
          </div>
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-2">
              <Info className="w-5 h-5" />
              Earth Day Tip
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <p className="text-lg font-medium leading-relaxed opacity-90">
              By caring for one species, you protect the entire web of life that sustains our planet. 
              Your discovery today is a testament to how close nature is to all of us.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
