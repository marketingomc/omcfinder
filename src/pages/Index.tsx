import { useState, useCallback } from "react";
import { Header } from "@/components/Header";
import { SearchForm } from "@/components/SearchForm";
import { LeadsTable } from "@/components/LeadsTable";
import { StatsCards } from "@/components/StatsCards";
import { ExportButton } from "@/components/ExportButton";
import { SearchHistory } from "@/components/SearchHistory";
import { EmptyState } from "@/components/EmptyState";
import { Lead, SearchQuery, IsraelCity } from "@/types/lead";
import { toast } from "sonner";

// Mock data for demonstration - replace with actual API integration
const generateMockLeads = (keyword: string, city: string): Lead[] => {
  const mockBusinesses = [
    { name: "Elite", suffix: "Solutions", hasPhone: true },
    { name: "Prime", suffix: "Services", hasPhone: true },
    { name: "Golden", suffix: "Group", hasPhone: false },
    { name: "First", suffix: "Partners", hasPhone: true },
    { name: "Top", suffix: "Professionals", hasPhone: true },
    { name: "Best", suffix: "Experts", hasPhone: false },
    { name: "Premium", suffix: "Associates", hasPhone: true },
    { name: "Superior", suffix: "Team", hasPhone: true },
  ];

  const streets = ["Rothschild Blvd", "Dizengoff St", "Ben Yehuda St", "King George St", "Allenby St", "Ibn Gabirol St"];

  return mockBusinesses.map((business, index) => ({
    id: `lead-${index}-${Date.now()}`,
    name: `${business.name} ${keyword} ${business.suffix}`,
    address: `${Math.floor(Math.random() * 200) + 1} ${streets[index % streets.length]}, ${city}, Israel`,
    phone: business.hasPhone ? `+972-${Math.floor(Math.random() * 9) + 1}-${Math.floor(1000000 + Math.random() * 9000000)}` : null,
    website: Math.random() > 0.3 ? `https://www.${business.name.toLowerCase()}${keyword.toLowerCase().replace(/\s/g, "")}.co.il` : null,
    category: keyword,
    rating: Math.round((3 + Math.random() * 2) * 10) / 10,
    userRatingsTotal: Math.floor(Math.random() * 500) + 10,
    placeId: `place_${index}_${Date.now()}`,
  }));
};

export default function Index() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchHistory, setSearchHistory] = useState<SearchQuery[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = useCallback(async (keyword: string, city: IsraelCity) => {
    setIsLoading(true);
    setHasSearched(true);

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In production, this would call the Google Places API via an edge function
      const results = generateMockLeads(keyword, city);
      setLeads(results);

      // Add to search history
      setSearchHistory((prev) => [
        { keyword, city, timestamp: new Date(), resultsCount: results.length },
        ...prev.filter((q) => !(q.keyword === keyword && q.city === city)).slice(0, 4),
      ]);

      const leadsWithPhone = results.filter((l) => l.phone).length;
      toast.success(`Found ${results.length} leads (${leadsWithPhone} with phone numbers)`);
    } catch (error) {
      toast.error("Failed to fetch leads. Please try again.");
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleRerunSearch = useCallback((keyword: string, city: string) => {
    handleSearch(keyword, city as IsraelCity);
  }, [handleSearch]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Search Section */}
        <section className="-mt-8 relative z-10">
          <div className="bg-card rounded-2xl shadow-xl border border-border/50 p-6">
            <SearchForm onSearch={handleSearch} isLoading={isLoading} />
          </div>
        </section>

        {/* Search History */}
        <SearchHistory history={searchHistory} onRerun={handleRerunSearch} />

        {/* Stats */}
        <StatsCards leads={leads} />

        {/* Results Section */}
        <section className="space-y-4">
          {leads.length > 0 && (
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold text-foreground">
                Search Results
              </h2>
              <ExportButton leads={leads} />
            </div>
          )}

          {leads.length > 0 ? (
            <LeadsTable leads={leads} />
          ) : (
            <EmptyState hasSearched={hasSearched} />
          )}
        </section>

        {/* API Info Notice */}
        <section className="bg-muted/50 rounded-xl p-6 border border-border/50">
          <h3 className="font-display font-semibold text-foreground mb-2">
            🔐 Google Places API Integration Required
          </h3>
          <p className="text-sm text-muted-foreground">
            This demo uses mock data. To fetch real business leads, connect your Google Cloud project 
            with Places API (New) enabled. All data is retrieved legally through official Google APIs, 
            ensuring compliance with terms of service.
          </p>
        </section>
      </main>

      <footer className="border-t border-border/50 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
          <p>SDR Lead Finder – Israel • Powered by Google Places API</p>
        </div>
      </footer>
    </div>
  );
}
