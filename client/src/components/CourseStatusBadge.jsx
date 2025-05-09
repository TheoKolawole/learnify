import React from 'react';
import * as LucideIcons from "lucide-react";

/**
 * CourseStatusBadge displays the current status of a course
 * 
 * @param {object} props - Component props
 * @param {string} props.status - Course status ('published', 'draft', or 'archived')
 */
export default function CourseStatusBadge({ status }) {
  const getStatusConfig = () => {
    switch (status) {
      case 'published':
        return {
          label: 'Published',
          icon: LucideIcons.Globe,
          className: 'bg-success/15 text-success border-success/30'
        };
      case 'draft':
        return {
          label: 'Draft',
          icon: LucideIcons.FileEdit,
          className: 'bg-warning/15 text-warning border-warning/30'
        };
      case 'archived':
        return {
          label: 'Archived',
          icon: LucideIcons.Archive,
          className: 'bg-muted/30 text-muted-foreground border-muted'
        };
      default:
        return {
          label: 'Unknown',
          icon: LucideIcons.HelpCircle,
          className: 'bg-muted text-muted-foreground border-muted'
        };
    }
  };

  const { label, icon: Icon, className } = getStatusConfig();

  return (
    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border ${className}`}>
      <Icon size={12} />
      <span>{label}</span>
    </div>
  );
}