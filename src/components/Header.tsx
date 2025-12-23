import { MapPin, Phone, Zap } from "lucide-react";

export function Header() {
  return (
    <header className="gradient-hero text-primary-foreground py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6 animate-fade-in">
          <MapPin className="h-4 w-4" />
          <span className="text-sm font-medium">Israel Market Focus</span>
        </div>
        
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 animate-slide-up">
          SDR Lead Finder
        </h1>
        
        <p className="text-lg sm:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
          Generate quality business leads for your sales team using Google Places API. 
          Find phone numbers for outbound calls, legally and compliantly.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 text-sm animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm">
            <Phone className="h-4 w-4 text-accent" />
            <span>Phone Numbers</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm">
            <Zap className="h-4 w-4 text-accent" />
            <span>Real-time Data</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm">
            <MapPin className="h-4 w-4 text-accent" />
            <span>25+ Israeli Cities</span>
          </div>
        </div>
      </div>
    </header>
  );
}
