import { Clock, Search } from "lucide-react";
import { SearchQuery } from "@/types/lead";
import { Button } from "@/components/ui/button";

interface SearchHistoryProps {
  history: SearchQuery[];
  onRerun: (keyword: string, city: string) => void;
}

export function SearchHistory({ history, onRerun }: SearchHistoryProps) {
  if (history.length === 0) return null;

  return (
    <div className="bg-card rounded-xl border border-border/50 p-4 shadow-md">
      <div className="flex items-center gap-2 mb-3">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <h3 className="font-display font-semibold text-foreground">Recent Searches</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {history.slice(0, 5).map((query, index) => (
          <Button
            key={index}
            variant="secondary"
            size="sm"
            onClick={() => onRerun(query.keyword, query.city)}
            className="gap-1.5 text-sm"
          >
            <Search className="h-3 w-3" />
            {query.keyword} • {query.city}
            <span className="text-muted-foreground">({query.resultsCount})</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
