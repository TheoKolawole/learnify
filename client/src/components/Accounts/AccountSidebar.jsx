import React from "react";
import * as LucideIcons from "lucide-react";
import { NavMenu } from "../../../configs/NavMenu";
import { Link, useLocation } from "react-router-dom";

export default function AccountSidebar({ collapsed, toggleCollapse, closeMobileSidebar }) {
  const location = useLocation();
  
  return (
    <div className="h-full flex flex-col bg-card text-foreground">
      {/* App Logo/Brand */}
      <div className={`h-16 flex items-center ${collapsed ? "justify-center" : "px-5"} border-b border-border`}>
        {collapsed ? (
          <div className="flex justify-center items-center w-10 h-10 bg-primary rounded-lg text-primary-foreground font-bold">
            <LucideIcons.LayoutDashboard size={20} />
          </div>
        ) : (
          <div className="text-xl font-bold text-primary">MyApp</div>
        )}
        
        {/* Close button on mobile / Collapse toggle button on desktop */}
        <button 
          onClick={toggleCollapse}
          className="ml-auto hidden lg:block text-muted-foreground hover:text-primary transition-colors"
        >
          {collapsed ? <LucideIcons.ChevronRight size={20} /> : <LucideIcons.ChevronLeft size={20} />}
        </button>

        {/* Close button for mobile */}
        <button 
          onClick={closeMobileSidebar}
          className="ml-auto lg:hidden text-muted-foreground hover:text-primary transition-colors"
        >
          <LucideIcons.X size={20} />
        </button>
      </div>

      {/* Menu Items */}
      <div className="flex-1 py-5 overflow-y-auto">
        <div className={`flex flex-col ${collapsed ? "items-center" : "px-3"} space-y-1`}>
          {Object.values(NavMenu()).map((item, index) => {
            const IconComponent = LucideIcons[item.icon.charAt(0).toUpperCase() + item.icon.slice(1)];
            const isActive = location.pathname === `/user/${item.slug}`;
            
            return (
              <Link 
                key={index}
                to={`/user/${item.slug}`}
                onClick={() => window.innerWidth < 1024 ? closeMobileSidebar() : null}
                className={`flex items-center ${collapsed ? "justify-center" : ""} py-3 px-3 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {IconComponent && (
                  <IconComponent 
                    className={`${isActive ? "text-primary" : "text-muted-foreground"} ${collapsed ? "w-6 h-6" : "w-5 h-5 mr-3"}`} 
                  />
                )}
                
                {!collapsed && <span className="font-medium">{item.name}</span>}
              </Link>
            );
          })}
        </div>
      </div>
      
      {/* User Profile Section */}
      <div className={`p-4 border-t border-border flex ${collapsed ? "justify-center" : ""} items-center`}>
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
          <LucideIcons.User size={16} />
        </div>
        {!collapsed && (
          <div className="ml-3">
            <p className="text-sm font-medium text-foreground">User Name</p>
            <p className="text-xs text-muted-foreground">user@example.com</p>
          </div>
        )}
      </div>
    </div>
  );
}