import * as LucideIcons from "lucide-react";

export default function ActivityItem({ icon, title, description, amount, isPositive, time, category }) {
  const IconComponent = LucideIcons[icon];
  
  let textColor = "text-muted-foreground";
  if (isPositive === true) textColor = "text-green-500";
  if (isPositive === false) textColor = "text-red-500";

  return (
    <div className="flex items-center">
      <div className={`p-3 rounded-lg ${isPositive === false ? 'bg-red-100' : isPositive === true ? 'bg-green-100' : 'bg-blue-100'} dark:bg-opacity-10`}>
        {IconComponent && <IconComponent className={`w-5 h-5 ${isPositive === false ? 'text-red-500' : isPositive === true ? 'text-green-500' : 'text-blue-500'}`} />}
      </div>
      <div className="ml-4 flex-1">
        <div className="flex justify-between">
          <h4 className="font-medium text-foreground">{title}</h4>
          <span className={`font-medium ${textColor}`}>{amount}</span>
        </div>
        <div className="flex justify-between mt-1">
          <p className="text-sm text-muted-foreground">{description}</p>
          <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
            {category}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{time}</p>
      </div>
    </div>
  );
}