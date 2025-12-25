import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COUNTRIES, CITIES_BY_COUNTRY, Country } from "@/types/lead";

interface SearchFormProps {
  onSearch: (keyword: string, city: string, country: Country) => void;
  isLoading: boolean;
}

export function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [keyword, setKeyword] = useState("");
  const [country, setCountry] = useState<Country>("Israel");
  const [city, setCity] = useState<string>("Tel Aviv");

  // Update city when country changes
  useEffect(() => {
    const cities = CITIES_BY_COUNTRY[country];
    if (cities && cities.length > 0) {
      setCity(cities[0]);
    }
  }, [country]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      onSearch(keyword.trim(), city, country);
    }
  };

  const cities = CITIES_BY_COUNTRY[country] || [];

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Business category (e.g., restaurants, dentists, law firms...)"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="pl-10 h-12 text-base bg-card border-border/50 focus:border-accent"
          />
        </div>
        
        <div className="relative sm:w-44">
          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10 pointer-events-none" />
          <Select value={country} onValueChange={(value) => setCountry(value as Country)}>
            <SelectTrigger className="pl-10 h-12 bg-card border-border/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES.map((countryName) => (
                <SelectItem key={countryName} value={countryName}>
                  {countryName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="relative sm:w-44">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10 pointer-events-none" />
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger className="pl-10 h-12 bg-card border-border/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {cities.map((cityName) => (
                <SelectItem key={cityName} value={cityName}>
                  {cityName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button 
          type="submit" 
          variant="hero" 
          size="lg"
          disabled={isLoading || !keyword.trim()}
          className="sm:w-auto"
        >
          {isLoading ? (
            <>
              <div className="h-4 w-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
              Searching...
            </>
          ) : (
            <>
              <Search className="h-4 w-4" />
              Find Leads
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
