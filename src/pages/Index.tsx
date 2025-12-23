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

export default function Index() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchHistory, setSearchHistory] = useState<SearchQuery[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = useCallback(async (keyword: string, city: IsraelCity) => {
    setIsLoading(true);
    setHasSearched(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/search-places`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ keyword, city }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch leads');
      }

      const data = await response.json();
      const results: Lead[] = data.leads || [];
      setLeads(results);

      // Add to search history
      setSearchHistory((prev) => [
        { keyword, city, timestamp: new Date(), resultsCount: results.length },
        ...prev.filter((q) => !(q.keyword === keyword && q.city === city)).slice(0, 4),
      ]);

      const leadsWithPhone = results.filter((l) => l.phone).length;
      toast.success(`Found ${results.length} leads (${leadsWithPhone} with phone numbers)`);
    } catch (error) {
      console.error("Search error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to fetch leads. Please try again.");
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
        <section className="bg-accent/10 rounded-xl p-6 border border-accent/20">
          <h3 className="font-display font-semibold text-foreground mb-2">
            ✅ Google Places API Connected
          </h3>
          <p className="text-sm text-muted-foreground">
            Your app is connected to the Google Places API. Search for any business category in Israeli cities 
            to retrieve real leads with phone numbers. All data is retrieved legally through official Google APIs.
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
