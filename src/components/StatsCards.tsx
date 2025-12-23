import { Lead } from "@/types/lead";
import { Building2, Phone, Star, TrendingUp } from "lucide-react";

interface StatsCardsProps {
  leads: Lead[];
}

export function StatsCards({ leads }: StatsCardsProps) {
  const totalLeads = leads.length;
  const leadsWithPhone = leads.filter((lead) => lead.phone).length;
  const phoneRate = totalLeads > 0 ? Math.round((leadsWithPhone / totalLeads) * 100) : 0;
  const avgRating = leads.filter((l) => l.rating).length > 0
    ? (leads.reduce((sum, l) => sum + (l.rating || 0), 0) / leads.filter((l) => l.rating).length).toFixed(1)
    : "N/A";

  const stats = [
    {
      label: "Total Leads",
      value: totalLeads,
      icon: Building2,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "With Phone",
      value: leadsWithPhone,
      icon: Phone,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      label: "Phone Rate",
      value: `${phoneRate}%`,
      icon: TrendingUp,
      color: "text-emerald-600",
      bgColor: "bg-emerald-500/10",
    },
    {
      label: "Avg Rating",
      value: avgRating,
      icon: Star,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
  ];

  if (totalLeads === 0) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-slide-up">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-card rounded-xl p-4 border border-border/50 shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
