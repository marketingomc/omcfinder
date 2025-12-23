import { Lead } from "@/types/lead";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Phone, Globe, Star, MapPin, Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface LeadsTableProps {
  leads: Lead[];
}

export function LeadsTable({ leads }: LeadsTableProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Phone number copied to clipboard");
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (leads.length === 0) {
    return null;
  }

  return (
    <div className="w-full overflow-hidden rounded-xl border border-border/50 bg-card shadow-lg animate-fade-in">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="font-display font-semibold text-foreground">Business Name</TableHead>
            <TableHead className="font-display font-semibold text-foreground">Category</TableHead>
            <TableHead className="font-display font-semibold text-foreground">
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                Phone
              </div>
            </TableHead>
            <TableHead className="font-display font-semibold text-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                Address
              </div>
            </TableHead>
            <TableHead className="font-display font-semibold text-foreground">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4" />
                Rating
              </div>
            </TableHead>
            <TableHead className="font-display font-semibold text-foreground">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead, index) => (
            <TableRow 
              key={lead.id} 
              className="transition-colors hover:bg-accent/5"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <TableCell className="font-medium">{lead.businessName}</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                  {lead.category}
                </span>
              </TableCell>
              <TableCell>
                {lead.phone ? (
                  <div className="flex items-center gap-2">
                    <a 
                      href={`tel:${lead.phone}`}
                      className="text-accent hover:underline font-medium"
                    >
                      {lead.phone}
                    </a>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => copyToClipboard(lead.phone!, lead.id)}
                    >
                      {copiedId === lead.id ? (
                        <Check className="h-3.5 w-3.5 text-accent" />
                      ) : (
                        <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                ) : (
                  <span className="text-muted-foreground text-sm">Not available</span>
                )}
              </TableCell>
              <TableCell className="max-w-[200px] truncate text-sm text-muted-foreground">
                {lead.address}
              </TableCell>
              <TableCell>
                {lead.rating ? (
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-medium">{lead.rating}</span>
                    {lead.reviewCount > 0 && (
                      <span className="text-xs text-muted-foreground">
                        ({lead.reviewCount})
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="text-muted-foreground text-sm">-</span>
                )}
              </TableCell>
              <TableCell>
                {lead.website && (
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="text-muted-foreground hover:text-accent"
                  >
                    <a href={lead.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="h-4 w-4 mr-1" />
                      Website
                    </a>
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
