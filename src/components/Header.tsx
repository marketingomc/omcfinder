import { MapPin, Phone, Zap } from "lucide-react";
import omcLogo from "@/assets/omc-logo.png";
import heroClouds from "@/assets/hero-clouds.jpg";

export function Header() {
  return (
    <header className="relative text-primary-foreground py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroClouds})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-accent/60" />
      
      <div className="relative max-w-4xl mx-auto text-center z-10">
        <div className="flex justify-center mb-8 animate-fade-in">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-xl">
            <img src={omcLogo} alt="OMC Logo" className="h-12 sm:h-16" />
          </div>
        </div>
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6 animate-fade-in border border-white/30">
          <MapPin className="h-4 w-4" />
          <span className="text-sm font-medium">Israel Market Focus</span>
        </div>
        
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 animate-slide-up drop-shadow-lg">
          SDR Lead Finder
        </h1>
        
        <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-8 animate-slide-up drop-shadow" style={{ animationDelay: '100ms' }}>
          Generate quality business leads for your sales team using Google Places API. 
          Find phone numbers for outbound calls, legally and compliantly.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 text-sm animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30">
            <Phone className="h-4 w-4 text-cyan-300" />
            <span>Phone Numbers</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30">
            <Zap className="h-4 w-4 text-cyan-300" />
            <span>Real-time Data</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30">
            <MapPin className="h-4 w-4 text-cyan-300" />
            <span>25+ Israeli Cities</span>
          </div>
        </div>
      </div>
    </header>
  );
}
