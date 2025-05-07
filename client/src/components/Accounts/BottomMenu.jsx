// BottomMenu.jsx
import React from "react";
import * as LucideIcons from "lucide-react";
import { NavMenu } from "../../../configs/NavMenu";
import { Link, useLocation } from "react-router-dom";

export default function BottomMenu() {
  const location = useLocation();
  
  // Get only the first 4 items to display in the bottom menu
  const menuItems = Object.values(NavMenu()).slice(0, 4);
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-lg transition-colors duration-300">
      <div className="h-16 max-w-md mx-auto flex justify-between items-center px-6">
        {menuItems.map((item, index) => {
          const IconComponent = LucideIcons[item.icon.charAt(0).toUpperCase() + item.icon.slice(1)];
          const isActive = location.pathname === `/user/${item.slug}`;
          
          return (
            <Link
              key={index}
              to={`/user/${item.slug}`}
              className="flex flex-col items-center justify-center"
            >
              {IconComponent && (
                <IconComponent
                  className={`w-5 h-5 mb-1 ${isActive ? "text-primary" : "text-muted-foreground"} transition-colors duration-300`}
                />
              )}
              <span className={`text-xs ${isActive ? "text-primary font-medium" : "text-muted-foreground"} transition-colors duration-300`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}