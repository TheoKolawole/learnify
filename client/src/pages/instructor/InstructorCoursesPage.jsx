import React, { useState, useEffect } from 'react';
import * as LucideIcons from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import StatCard from '@/components/StatCard';
import CourseCard from '@/components/CourseCard';
import CourseStatusBadge from '@/components/CourseStatusBadge';
import axios from 'axios';
import { useToast } from "@/hooks/useToast";
import { Link, useNavigate } from 'react-router-dom';

export default function InstructorCoursesPage() {
  const { userInfo } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    draft: 0,
    archived: 0
  });
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/course/instructor/me');
      setCourses(response.data.data);
      
      // Calculate stats
      const total = response.data.data.length;
      const published = response.data.data.filter(course => course.status === 'published').length;
      const draft = response.data.data.filter(course => course.status === 'draft').length;
      const archived = response.data.data.filter(course => course.status === 'archived').length;
      
      setStats({ total, published, draft, archived });
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast({
        title: "Error",
        description: "Failed to load courses",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChangeCourseStatus = async (courseId, newStatus) => {
    try {
      await axios.patch(`/course/${courseId}/status`, { status: newStatus });
      
      // Update local state
      setCourses(prevCourses => 
        prevCourses.map(course => 
          course._id === courseId 
            ? { ...course, status: newStatus } 
            : course
        )
      );
      
      // Update stats
      setStats(prevStats => {
        const updatedStats = { ...prevStats };
        
        // Find the course and its old status
        const course = courses.find(c => c._id === courseId);
        const oldStatus = course.status;
        
        // Decrement the old status count
        if (oldStatus === 'published') updatedStats.published--;
        else if (oldStatus === 'draft') updatedStats.draft--;
        else if (oldStatus === 'archived') updatedStats.archived--;
        
        // Increment the new status count
        if (newStatus === 'published') updatedStats.published++;
        else if (newStatus === 'draft') updatedStats.draft++;
        else if (newStatus === 'archived') updatedStats.archived++;
        
        return updatedStats;
      });
      
      toast({
        title: "Success",
        description: `Course ${newStatus === 'published' ? 'published' : newStatus === 'draft' ? 'moved to draft' : 'archived'} successfully`,
      });
    } catch (error) {
      console.error('Error updating course status:', error);
      toast({
        title: "Error",
        description: "Failed to update course status",
        variant: "destructive"
      });
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      return;
    }
    
    try {
      await axios.delete(`/course/${courseId}`);
      
      // Update local state
      const deletedCourse = courses.find(course => course._id === courseId);
      setCourses(prevCourses => prevCourses.filter(course => course._id !== courseId));
      
      // Update stats
      setStats(prevStats => {
        const updatedStats = { ...prevStats };
        updatedStats.total--;
        
        if (deletedCourse.status === 'published') updatedStats.published--;
        else if (deletedCourse.status === 'draft') updatedStats.draft--;
        else if (deletedCourse.status === 'archived') updatedStats.archived--;
        
        return updatedStats;
      });
      
      toast({
        title: "Success",
        description: "Course deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting course:', error);
      toast({
        title: "Error",
        description: "Failed to delete course",
        variant: "destructive"
      });
    }
  };

  const handleViewAnalytics = (courseId) => {
    navigate(`/user/instructor/courses/${courseId}/analytics`);
  };

  const handleEditCourse = (courseId) => {
    navigate(`/user/instructor/courses/${courseId}/edit`);
  };

  const filteredCourses = filter === 'all' 
    ? courses 
    : courses.filter(course => course.status === filter);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <section className="bg-card rounded-xl p-6 shadow-sm border border-border transition-colors duration-300">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Courses</h1>
            <p className="text-muted-foreground mt-1">Manage and monitor all your educational content</p>
          </div>
          <button 
            onClick={() => navigate('/user/instructor/courses/create')}
            className="bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
          >
            <LucideIcons.PlusCircle size={16} />
            Create Course
          </button>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Courses" 
          value={stats.total.toString()} 
          icon="BookMarked" 
          onClick={() => setFilter('all')}
          isActive={filter === 'all'}
        />
        <StatCard 
          title="Published" 
          value={stats.published.toString()} 
          icon="Globe" 
          onClick={() => setFilter('published')}
          isActive={filter === 'published'}
        />
        <StatCard 
          title="Drafts" 
          value={stats.draft.toString()} 
          icon="FileEdit" 
          onClick={() => setFilter('draft')}
          isActive={filter === 'draft'}
        />
        <StatCard 
          title="Archived" 
          value={stats.archived.toString()} 
          icon="Archive" 
          onClick={() => setFilter('archived')}
          isActive={filter === 'archived'}
        />
      </section>

      {/* Filter Controls */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <h2 className="text-lg font-semibold text-foreground">
            {filter === 'all' ? 'All Courses' : 
             filter === 'published' ? 'Published Courses' : 
             filter === 'draft' ? 'Draft Courses' : 
             'Archived Courses'}
          </h2>
          <span className="text-muted-foreground text-lg">({filteredCourses.length})</span>
        </div>
        <div className="flex gap-2">
          <button className="text-sm px-3 py-1 rounded-md hover:bg-accent transition-colors">
            <LucideIcons.SlidersHorizontal size={16} className="inline mr-1" />
            Sort
          </button>
          <button className="text-sm px-3 py-1 rounded-md hover:bg-accent transition-colors">
            <LucideIcons.Search size={16} className="inline mr-1" />
            Search
          </button>
        </div>
      </div>

      {/* Courses Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <LucideIcons.Loader className="animate-spin" size={32} />
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="bg-card rounded-xl p-12 shadow-sm border border-border text-center">
          <LucideIcons.BookX size={48} className="mx-auto text-muted-foreground" />
          <h3 className="text-xl font-semibold mt-4">No courses found</h3>
          <p className="text-muted-foreground mt-2">
            {filter === 'all' 
              ? "You haven't created any courses yet." 
              : `You don't have any ${filter} courses.`}
          </p>
          {filter !== 'all' && (
            <button 
              onClick={() => setFilter('all')}
              className="mt-4 text-primary hover:text-primary/80 font-medium"
            >
              View all courses
            </button>
          )}
          <button 
            onClick={() => navigate('/user/instructor/courses/create')}
            className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 mx-auto"
          >
            <LucideIcons.PlusCircle size={16} />
            Create your first course
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <div key={course._id} className="bg-card rounded-xl border border-border shadow-sm transition-colors duration-300 overflow-hidden flex flex-col">
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
                      onClick={() => handleEditCourse(course._id)}
                      className="p-2 rounded-md hover:bg-accent transition-colors"
                      title="Edit course"
                    >
                      <LucideIcons.Edit size={16} />
                    </button>
                    <button 
                      onClick={() => handleViewAnalytics(course._id)}
                      className="p-2 rounded-md hover:bg-accent transition-colors"
                      title="View analytics"
                    >
                      <LucideIcons.BarChart2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDeleteCourse(course._id)}
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
                            onClick={() => handleChangeCourseStatus(course._id, 'published')}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-accent transition-colors flex items-center"
                          >
                            <LucideIcons.Globe size={14} className="mr-2" />
                            Publish Course
                          </button>
                        )}
                        {course.status !== 'draft' && (
                          <button 
                            onClick={() => handleChangeCourseStatus(course._id, 'draft')}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-accent transition-colors flex items-center"
                          >
                            <LucideIcons.FileEdit size={14} className="mr-2" />
                            Move to Draft
                          </button>
                        )}
                        {course.status !== 'archived' && (
                          <button 
                            onClick={() => handleChangeCourseStatus(course._id, 'archived')}
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
          ))}
        </div>
      )}
    </div>
  );
}