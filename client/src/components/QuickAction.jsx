import * as LucideIcons from "lucide-react";

export default function QuickAction({ icon, title }) {
  const IconComponent = LucideIcons[icon];

  return (
    <button className="flex flex-col items-center justify-center p-4 rounded-lg hover:bg-muted transition-colors duration-200">
      <div className="bg-primary/10 p-3 rounded-lg">
        {IconComponent && <IconComponent className="w-5 h-5 text-primary" />}
      </div>
      <span className="text-sm font-medium text-foreground mt-2">{title}</span>
    </button>
  );
}