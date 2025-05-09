import * as LucideIcons from "lucide-react";

export default function StatCard({ title, value, change, isPositive, icon }) {
  const IconComponent = LucideIcons[icon];

  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-sm transition-colors duration-300">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-muted-foreground text-sm">{title}</p>
          <h3 className="text-2xl font-bold mt-1 text-foreground">{value}</h3>
          <span className={`text-xs font-medium ${isPositive ? 'text-green-500' : 'text-red-500'} flex items-center mt-1`}>
            {isPositive ? <LucideIcons.TrendingUp size={14} className="mr-1" /> : <LucideIcons.TrendingDown size={14} className="mr-1" />}
            {change}
          </span>
        </div>
        <div className="bg-primary/10 p-2 rounded-lg">
          {IconComponent && <IconComponent className="w-6 h-6 text-primary" />}
        </div>
      </div>
    </div>
  );
}