import { Building2, Search, Sparkles } from "lucide-react";

interface EmptyStateProps {
  hasSearched: boolean;
}

export function EmptyState({ hasSearched }: EmptyStateProps) {
  if (hasSearched) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
        <div className="p-4 rounded-full bg-muted mb-4">
          <Search className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="font-display text-xl font-semibold text-foreground mb-2">
          No results found
        </h3>
        <p className="text-muted-foreground max-w-md">
          Try adjusting your search terms or selecting a different city to find more businesses.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
      <div className="relative mb-6">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/10">
          <Building2 className="h-12 w-12 text-accent" />
        </div>
        <div className="absolute -top-1 -right-1 p-1.5 rounded-full bg-accent animate-pulse-slow">
          <Sparkles className="h-4 w-4 text-accent-foreground" />
        </div>
      </div>
      <h3 className="font-display text-xl font-semibold text-foreground mb-2">
        Ready to find leads
      </h3>
      <p className="text-muted-foreground max-w-md mb-6">
        Enter a business category and select a city to discover potential leads with phone numbers for your SDR team.
      </p>
      <div className="flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
        <span className="px-3 py-1.5 rounded-full bg-muted">🏢 Restaurants</span>
        <span className="px-3 py-1.5 rounded-full bg-muted">⚖️ Law Firms</span>
        <span className="px-3 py-1.5 rounded-full bg-muted">🦷 Dentists</span>
        <span className="px-3 py-1.5 rounded-full bg-muted">🏋️ Gyms</span>
        <span className="px-3 py-1.5 rounded-full bg-muted">🏠 Real Estate</span>
      </div>
    </div>
  );
}
