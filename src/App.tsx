import { useState, useEffect } from "react";
import { KeyModal } from "./components/KeyModal";
import { ImageUploader } from "./components/ImageUploader";
import { AnalysisResult } from "./components/AnalysisResult";
import { analyzeImage, BiodiversityInfo } from "./lib/gemini";
import { Button } from "./components/ui/button";
import { Settings, Globe, Leaf } from "lucide-react";

function App() {
  const [apiKey, setApiKey] = useState<string>(localStorage.getItem("gemini_api_key") || "");
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<BiodiversityInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!apiKey) {
      setIsKeyModalOpen(true);
    }
  }, [apiKey]);

  const handleSaveKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem("gemini_api_key", key);
    setIsKeyModalOpen(false);
    setError(null);
  };

  const handleImageSelected = async (file: File) => {
    if (!apiKey) {
      setIsKeyModalOpen(true);
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeImage(file, apiKey);
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(
        err.message?.includes("API key not valid")
          ? "Invalid API key. Please check your settings."
          : "An error occurred during image analysis. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans selection:bg-primary/20">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-400/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-lime-400/20 blur-[120px] rounded-full" />
      </div>

      <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container max-w-6xl h-16 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
              <Leaf className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:inline-block">NatureNode</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setIsKeyModalOpen(true)}
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </nav>

      <main className="container max-w-4xl py-12 px-4 relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-sm font-semibold mb-6 border border-emerald-500/20">
            <Globe className="w-4 h-4" />
            Weekend Challenge: Earth Day Edition
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight bg-gradient-to-b from-slate-900 to-slate-700 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
            Discover the nature <br className="hidden sm:block" /> around you.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Take a photo or upload an image to identify species and learn how 
            you can help protect our planet's biodiversity.
          </p>
        </div>

        <section className="mb-12">
          <ImageUploader onImageSelected={handleImageSelected} isLoading={isLoading} />
          
          {error && (
            <div className="mt-6 p-4 rounded-2xl bg-destructive/10 text-destructive text-center border border-destructive/20 font-medium">
              {error}
            </div>
          )}
        </section>

        {result && (
          <section id="results" className="scroll-mt-24">
            <AnalysisResult data={result} />
            <div className="mt-12 text-center">
              <Button 
                variant="outline" 
                className="rounded-full px-8 h-12"
                onClick={() => {
                  setResult(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Scan another object
              </Button>
            </div>
          </section>
        )}
      </main>

      <footer className="border-t py-12 mt-12 bg-white/50 dark:bg-black/20">
        <div className="container max-w-6xl px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6 opacity-50">
            <Leaf className="w-4 h-4" />
            <span className="text-sm font-semibold uppercase tracking-widest">Earth Day 2026</span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Built with 🌱 during the DEV.to Weekend Challenge. <br className="sm:hidden" />
            Powered by Google Gemini API.
          </p>
          <div className="flex justify-center gap-6 text-sm font-medium">
            <a href="https://dev.to" className="hover:text-primary transition-colors">DEV.to</a>
            <a href="https://github.com" className="hover:text-primary transition-colors">GitHub</a>
          </div>
        </div>
      </footer>

      <KeyModal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        onSave={handleSaveKey}
        currentKey={apiKey}
      />
    </div>
  );
}

export default App;
