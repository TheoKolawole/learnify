import React from 'react';
import * as LucideIcons from "lucide-react";
import { useNavigate } from 'react-router-dom';
import CourseStatusBadge from './CourseStatusBadge';

/**
 * CourseCard component for displaying course information
 * 
 * @param {object} props - Component props
 * @param {object} props.course - Course data object
 * @param {function} props.onEdit - Function to call when edit button is clicked
 * @param {function} props.onDelete - Function to call when delete button is clicked
 * @param {function} props.onChangeStatus - Function to call when status change is requested
 * @param {function} props.onViewAnalytics - Function to call when analytics button is clicked
 */
export default function CourseCard({ 
  course, 
  onEdit, 
  onDelete, 
  onChangeStatus, 
  onViewAnalytics 
}) {
  const navigate = useNavigate();
  
  if (!course) return null;
  
  return (
    <div className="bg-card rounded-xl border border-border shadow-sm transition-colors duration-300 overflow-hidden flex flex-col h-full">
      {/* Course Image */}
      <div className="h-40 bg-muted relative">
        {course.coverImage ? (
          <img 
            src={course.coverImage} 
            alt={course.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <LucideIcons.BookOpen size={48} className="text-muted-foreground/50" />
          </div>
        )}
        <div className="absolute top-3 right-3">
          <CourseStatusBadge status={course.status} />
        </div>
      </div>
      
      {/* Course Content */}
      <div className="p-5 flex-grow">
        <h3 className="font-semibold text-lg line-clamp-1">{course.title}</h3>
        <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
          {course.description || "No description provided."}
        </p>
        
        {/* Course Meta */}
        <div className="mt-4 flex flex-wrap gap-y-2 gap-x-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <LucideIcons.BookOpen size={14} />
            <span>{course.modules?.length || 0} Modules</span>
          </div>
          <div className="flex items-center gap-1">
            <LucideIcons.Users size={14} />
            <span>{course.enrollmentCount || 0} Students</span>
          </div>
          <div className="flex items-center gap-1">
            <LucideIcons.Calendar size={14} />
            <span>Created {new Date(course.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      
      {/* Actions Footer */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex justify-between">
          <div className="space-x-1">
            <button 
              onClick={() => onEdit(course._id)}
              className="p-2 rounded-md hover:bg-accent transition-colors"
              title="Edit course"
            >
              <LucideIcons.Edit size={16} />
            </button>
            <button 
              onClick={() => onViewAnalytics(course._id)}
              className="p-2 rounded-md hover:bg-accent transition-colors"
              title="View analytics"
            >
              <LucideIcons.BarChart2 size={16} />
            </button>
            <button 
              onClick={() => onDelete(course._id)}
              className="p-2 rounded-md hover:bg-destructive/10 text-destructive transition-colors"
              title="Delete course"
            >
              <LucideIcons.Trash2 size={16} />
            </button>
          </div>
          <div className="relative group">
            <button className="p-2 rounded-md hover:bg-accent transition-colors">
              <LucideIcons.MoreHorizontal size={16} />
            </button>
            <div className="absolute right-0 bottom-full mb-2 w-48 bg-popover border border-border rounded-md shadow-md z-10 hidden group-hover:block">
              <div className="py-1">
                {course.status !== 'published' && (
                  <button 
                    onClick={() => onChangeStatus(course._id, 'published')}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-accent transition-colors flex items-center"
                  >
                    <LucideIcons.Globe size={14} className="mr-2" />
                    Publish Course
                  </button>
                )}
                {course.status !== 'draft' && (
                  <button 
                    onClick={() => onChangeStatus(course._id, 'draft')}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-accent transition-colors flex items-center"
                  >
                    <LucideIcons.FileEdit size={14} className="mr-2" />
                    Move to Draft
                  </button>
                )}
                {course.status !== 'archived' && (
                  <button 
                    onClick={() => onChangeStatus(course._id, 'archived')}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-accent transition-colors flex items-center"
                  >
                    <LucideIcons.Archive size={14} className="mr-2" />
                    Archive Course
                  </button>
                )}
                <button 
                  onClick={() => navigate(`/courses/${course.slug}`)}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-accent transition-colors flex items-center"
                >
                  <LucideIcons.ExternalLink size={14} className="mr-2" />
                  View as Student
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}