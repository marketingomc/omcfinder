import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Lead } from "@/types/lead";
import { toast } from "sonner";

interface ExportButtonProps {
  leads: Lead[];
}

export function ExportButton({ leads }: ExportButtonProps) {
  const exportToCSV = () => {
    if (leads.length === 0) {
      toast.error("No leads to export");
      return;
    }

    const headers = ["Business Name", "Category", "Phone", "Address", "Website", "Rating", "Reviews"];
    const csvContent = [
      headers.join(","),
      ...leads.map((lead) =>
        [
          `"${lead.businessName.replace(/"/g, '""')}"`,
          `"${lead.category}"`,
          lead.phone ? `"${lead.phone}"` : "",
          `"${lead.address.replace(/"/g, '""')}"`,
          lead.website || "",
          lead.rating || "",
          lead.reviewCount || "",
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `leads_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success(`Exported ${leads.length} leads to CSV`);
  };

  if (leads.length === 0) return null;

  return (
    <Button variant="outline" onClick={exportToCSV} className="gap-2">
      <Download className="h-4 w-4" />
      Export CSV ({leads.length})
    </Button>
  );
}
