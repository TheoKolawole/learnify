import React, { useState, useEffect } from 'react';
import * as LucideIcons from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/useToast";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';

export default function EditCoursePage() {
  const { courseId } = useParams();
  const { userInfo } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [course, setCourse] = useState({
    title: '',
    description: '',
    coverImage: '',
    status: 'draft',
    startDate: '',
    endDate: ''
  });
  const [errors, setErrors] = useState({});
  const [modules, setModules] = useState([]);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    fetchCourseData();
  }, [courseId]);

  const fetchCourseData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/course/${courseId}`);
      const courseData = response.data.data;
      
      // Format dates for form inputs
      setCourse({
        ...courseData,
        startDate: courseData.startDate ? format(new Date(courseData.startDate), 'yyyy-MM-dd') : '',
        endDate: courseData.endDate ? format(new Date(courseData.endDate), 'yyyy-MM-dd') : ''
      });
      
      // Fetch modules if needed
      if (courseData.modules) {
        setModules(courseData.modules);
      }
    } catch (error) {
      console.error('Error fetching course:', error);
      toast({
        title: "Error",
        description: "Failed to load course data",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourse(prev => ({ ...prev, [name]: value }));
    setIsDirty(true);
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!course.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!course.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!course.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveCourse = async () => {
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please check the form for errors",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSaving(true);
      
      const courseData = {
        ...course,
        startDate: new Date(course.startDate),
        endDate: course.endDate ? new Date(course.endDate) : undefined
      };
      
      await axios.put(`/course/${courseId}`, courseData);
      
      toast({
        title: "Success",
        description: "Course updated successfully"
      });
      
      setIsDirty(false);
    } catch (error) {
      console.error('Error updating course:', error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update course",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      await axios.patch(`/course/${courseId}/status`, { status: newStatus });
      
      setCourse(prev => ({ ...prev, status: newStatus }));
      
      toast({
        title: "Status Updated",
        description: `Course is now ${newStatus}`
      });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Failed to update course status",
        variant: "destructive"
      });
    }
  };

  const handlePublishCourse = () => {
    if (!validateForm()) {
      toast({
        title: "Cannot Publish",
        description: "Please complete all required fields first",
        variant: "destructive"
      });
      return;
    }
    
    handleStatusChange('published');
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File",
        description: "Please select an image file",
        variant: "destructive"
      });
      return;
    }
    
    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Image file must be less than 5MB",
        variant: "destructive"
      });
      return;
    }
    
    try {
      // Create FormData
      const formData = new FormData();
      formData.append('image', file);
      
      // Upload image
      const response = await axios.post('/upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Update course with new image URL
      const imageUrl = response.data.url;
      setCourse(prev => ({ ...prev, coverImage: imageUrl }));
      setIsDirty(true);
      
      toast({
        title: "Success",
        description: "Cover image uploaded successfully"
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive"
      });
    }
  };

  const handleDeleteCoverImage = () => {
    setCourse(prev => ({ ...prev, coverImage: '' }));
    setIsDirty(true);
  };

  const navigateToModuleEditor = (moduleId = null) => {
    if (moduleId) {
      navigate(`/user/instructor/courses/${courseId}/modules/${moduleId}`);
    } else {
      navigate(`/user/instructor/courses/${courseId}/modules/create`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LucideIcons.Loader className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Header Section */}
      <section className="bg-card rounded-xl p-6 shadow-sm border border-border transition-colors duration-300">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => navigate('/user/instructor/courses')}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <LucideIcons.ArrowLeft size={20} />
              </button>
              <h1 className="text-2xl font-bold text-foreground">Edit Course</h1>
            </div>
            <p className="text-muted-foreground mt-1">Update your course details and content</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <span className="text-sm text-muted-foreground">Status:</span>
              <span className={`
                text-sm font-medium px-2 py-1 rounded-full
                ${course.status === 'published' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                  course.status === 'draft' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                  'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'}
              `}>
                {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
              </span>
            </div>
            {course.status !== 'published' && (
              <button
                onClick={handlePublishCourse}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                disabled={isSaving}
              >
                <LucideIcons.Globe size={16} />
                Publish
              </button>
            )}
            <button
              onClick={handleSaveCourse}
              className="bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
              disabled={isSaving || !isDirty}
            >
              {isSaving ? (
                <LucideIcons.Loader size={16} className="animate-spin" />
              ) : (
                <LucideIcons.Save size={16} />
              )}
              Save Changes
            </button>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course Details Form */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-card rounded-xl p-6 shadow-sm border border-border transition-colors duration-300">
            <h2 className="text-lg font-semibold mb-4">Course Information</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                  Course Title <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={course.title}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${errors.title ? 'border-destructive' : 'border-input'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                  placeholder="Enter course title"
                />
                {errors.title && (
                  <p className="text-destructive text-sm mt-1">{errors.title}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Description <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={course.description}
                  onChange={handleInputChange}
                  rows={5}
                  className={`w-full px-3 py-2 border ${errors.description ? 'border-destructive' : 'border-input'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                  placeholder="Describe your course"
                ></textarea>
                {errors.description && (
                  <p className="text-destructive text-sm mt-1">{errors.description}</p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium mb-1">
                    Start Date <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={course.startDate}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border ${errors.startDate ? 'border-destructive' : 'border-input'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                  />
                  {errors.startDate && (
                    <p className="text-destructive text-sm mt-1">{errors.startDate}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium mb-1">
                    End Date <span className="text-muted-foreground text-xs">(Optional)</span>
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={course.endDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-xl p-6 shadow-sm border border-border transition-colors duration-300">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Course Modules</h2>
              <button
                onClick={() => navigateToModuleEditor()}
                className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1"
              >
                <LucideIcons.PlusCircle size={16} />
                Add Module
              </button>
            </div>
            
            {modules.length === 0 ? (
              <div className="text-center py-8 border border-dashed border-border rounded-lg">
                <LucideIcons.BookOpen size={32} className="mx-auto text-muted-foreground mb-2" />
                <h3 className="font-medium">No modules yet</h3>
                <p className="text-sm text-muted-foreground mt-1">Add modules to organize your course content</p>
                <button
                  onClick={() => navigateToModuleEditor()}
                  className="mt-4 bg-primary/10 text-primary hover:bg-primary/20 py-2 px-4 rounded-md text-sm font-medium transition-colors"
                >
                  Create First Module
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {modules.map((module, index) => (
                  <div 
                    key={module._id} 
                    className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 text-primary flex items-center justify-center rounded-full font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium">{module.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {module.lessons?.length || 0} {module.lessons?.length === 1 ? 'lesson' : 'lessons'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigateToModuleEditor(module._id)}
                        className="p-2 rounded-md hover:bg-accent transition-colors"
                        title="Edit module"
                      >
                        <LucideIcons.Edit size={16} />
                      </button>
                      <button
                        className="p-2 rounded-md hover:bg-destructive/10 text-destructive transition-colors"
                        title="Delete module"
                      >
                        <LucideIcons.Trash2 size={16} />
                      </button>
                      <button
                        className="p-2 rounded-md hover:bg-accent transition-colors"
                        title="Drag to reorder"
                      >
                        <LucideIcons.GripVertical size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <section className="bg-card rounded-xl p-6 shadow-sm border border-border transition-colors duration-300">
            <h2 className="text-lg font-semibold mb-4">Cover Image</h2>
            
            <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-4">
              {course.coverImage ? (
                <div className="relative w-full h-full">
                  <img 
                    src={course.coverImage} 
                    alt="Course cover" 
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={handleDeleteCoverImage}
                    className="absolute top-2 right-2 p-1 bg-card/80 backdrop-blur-sm rounded-full hover:bg-destructive hover:text-destructive-foreground transition-colors"
                    title="Remove image"
                  >
                    <LucideIcons.X size={16} />
                  </button>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
                  <LucideIcons.Image size={48} className="mb-2" />
                  <p className="text-sm">No cover image</p>
                </div>
              )}
            </div>
            
            <div>
              <label
                htmlFor="coverImageUpload"
                className="flex items-center justify-center w-full px-4 py-2 border border-input rounded-md cursor-pointer hover:bg-accent transition-colors"
              >
                <LucideIcons.Upload size={16} className="mr-2" />
                <span>{course.coverImage ? 'Change Image' : 'Upload Image'}</span>
                <input
                  id="coverImageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-muted-foreground mt-2">
                Recommended size: 1280×720px. Max 5MB.
              </p>
            </div>
          </section>
          
          <section className="bg-card rounded-xl p-6 shadow-sm border border-border transition-colors duration-300">
            <h2 className="text-lg font-semibold mb-4">Course Status</h2>
            
            <div className="space-y-3">
              <button
                onClick={() => handleStatusChange('draft')}
                className={`w-full flex items-center p-3 rounded-lg border ${
                  course.status === 'draft' 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50 hover:bg-accent'
                } transition-colors`}
              >
                <div className={`w-4 h-4 rounded-full mr-3 ${
                  course.status === 'draft' ? 'bg-primary' : 'border border-muted-foreground'
                }`}></div>
                <div className="flex-1">
                  <h3 className="font-medium">Draft</h3>
                  <p className="text-sm text-muted-foreground">Only visible to you</p>
                </div>
              </button>
              
              <button
                onClick={() => handleStatusChange('published')}
                className={`w-full flex items-center p-3 rounded-lg border ${
                  course.status === 'published' 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50 hover:bg-accent'
                } transition-colors`}
              >
                <div className={`w-4 h-4 rounded-full mr-3 ${
                  course.status === 'published' ? 'bg-primary' : 'border border-muted-foreground'
                }`}></div>
                <div className="flex-1">
                  <h3 className="font-medium">Published</h3>
                  <p className="text-sm text-muted-foreground">Visible to all students</p>
                </div>
              </button>
              
              <button
                onClick={() => handleStatusChange('archived')}
                className={`w-full flex items-center p-3 rounded-lg border ${
                  course.status === 'archived' 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50 hover:bg-accent'
                } transition-colors`}
              >
                <div className={`w-4 h-4 rounded-full mr-3 ${
                  course.status === 'archived' ? 'bg-primary' : 'border border-muted-foreground'
                }`}></div>
                <div className="flex-1">
                  <h3 className="font-medium">Archived</h3>
                  <p className="text-sm text-muted-foreground">Hidden from course listings</p>
                </div>
              </button>
            </div>
          </section>
          
          <section className="bg-card rounded-xl p-6 shadow-sm border border-border transition-colors duration-300">
            <h2 className="text-lg font-semibold mb-4">Actions</h2>
            
            <div className="space-y-3">
              <button
                onClick={() => navigate(`/courses/${course.slug}`)}
                className="w-full flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-accent transition-colors"
              >
                <span className="font-medium">Preview as Student</span>
                <LucideIcons.ExternalLink size={16} />
              </button>
              
              <button
                onClick={() => navigate(`/user/instructor/courses/${courseId}/analytics`)}
                className="w-full flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-accent transition-colors"
              >
                <span className="font-medium">View Analytics</span>
                <LucideIcons.BarChart2 size={16} />
              </button>
              
              <button
                className="w-full flex items-center justify-between p-3 rounded-lg border border-destructive/30 text-destructive hover:bg-destructive/10 transition-colors"
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
                    // Handle delete action
                    navigate('/user/instructor/courses');
                  }
                }}
              >
                <span className="font-medium">Delete Course</span>
                <LucideIcons.Trash2 size={16} />
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}