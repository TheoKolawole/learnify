import React, { useState } from 'react';
import * as LucideIcons from "lucide-react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/useToast";

export default function CourseCreationPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverImage, setCoverImage] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  
  // Get today's date in YYYY-MM-DD format for the datepicker
  const today = new Date().toISOString().split('T')[0];
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    level: 'beginner',
    price: 0,
    isFree: true,
    isPremium: false,
    isPublic: true,
    status: 'draft',
    startDate: today, // Default to today
    endDate: null // Optional
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked
      });
      
      // Handle price checkbox logic
      if (name === 'isFree' && checked) {
        setFormData(prev => ({
          ...prev,
          isPremium: false,
          price: 0,
          [name]: checked
        }));
      } else if (name === 'isPremium' && checked) {
        setFormData(prev => ({
          ...prev,
          isFree: false,
          [name]: checked
        }));
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeCoverImage = () => {
    setCoverImage(null);
    setCoverImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setIsSubmitting(true);
  
      // Create a FormData object for the multipart form submission
      const courseData = new FormData();
      
      // Convert price to number to match backend expectations
      const {
        endDate,
        ...rest
      } = formData;
      
      const dataToSubmit = {
        ...rest,
        price: formData.isPremium ? Number(formData.price) : 0,
        startDate: new Date(formData.startDate).toISOString(),
        ...(endDate ? { endDate: new Date(endDate).toISOString() } : {})
      };  
      
      // Append JSON stringified form data
      courseData.append('data', JSON.stringify(dataToSubmit));
  
      // Append cover image if it exists
      if (coverImage) {
        courseData.append('coverImage', coverImage);
      }
  
      const response = await axios.post('/course/create', courseData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      toast({
        title: "Success",
        description: "Course created successfully",
      });
  
      // Navigate to course edit page with the new course ID
      navigate(`/user/instructor/courses/${response.data.data._id}/edit`);
    } catch (error) {
      console.error('Error creating course:', error);
      toast({
        title: "Error",
        description: error.response?.data?.msg || "Failed to create course",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <section className="bg-card rounded-xl p-6 shadow-sm border border-border transition-colors duration-300">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Create New Course</h1>
            <p className="text-muted-foreground mt-1">Fill in the details to create your new course</p>
          </div>
          <button 
            onClick={() => navigate('/user/instructor/courses')}
            className="bg-muted hover:bg-muted/80 py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
          >
            <LucideIcons.ArrowLeft size={16} />
            Back to Courses
          </button>
        </div>
      </section>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <section className="bg-card rounded-xl p-6 shadow-sm border border-border">
          <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
          
          <div className="space-y-4">
            {/* Course Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Course Title <span className="text-destructive">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter course title"
                className="w-full p-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <p className="text-xs text-muted-foreground mt-1">A URL slug will be automatically generated from your title</p>
            </div>
            
            {/* Course Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Description <span className="text-destructive">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Enter course description"
                className="w-full p-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              />
            </div>
            
            {/* Category & Level */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-1">
                  Category <span className="text-destructive">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="" disabled>Select a category</option>
                  <option value="programming">Programming</option>
                  <option value="design">Design</option>
                  <option value="business">Business</option>
                  <option value="marketing">Marketing</option>
                  <option value="personal-development">Personal Development</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="level" className="block text-sm font-medium mb-1">
                  Difficulty Level
                </label>
                <select
                  id="level"
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="w-full p-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="all-levels">All Levels</option>
                </select>
              </div>
            </div>
            
            {/* Course Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium mb-1">
                  Start Date <span className="text-destructive">*</span>
                </label>
                <input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  min={today}
                  className="w-full p-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium mb-1">
                  End Date <span className="text-muted-foreground">(Optional)</span>
                </label>
                <input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                  min={formData.startDate} // Can't be before start date
                  className="w-full p-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Media Section */}
        {/* <section className="bg-card rounded-xl p-6 shadow-sm border border-border">
          <h2 className="text-lg font-semibold mb-4">Course Media</h2>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Cover Image
            </label>
            
            {coverImagePreview ? (
              <div className="mb-4 relative">
                <img 
                  src={coverImagePreview} 
                  alt="Cover preview" 
                  className="w-full h-48 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={removeCoverImage}
                  className="absolute top-2 right-2 bg-destructive text-destructive-foreground p-1 rounded-full hover:bg-destructive/90 transition-colors"
                >
                  <LucideIcons.X size={16} />
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-border rounded-md p-8 text-center mb-4">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <LucideIcons.Image size={40} className="text-muted-foreground" />
                  <div className="text-sm text-muted-foreground">
                    Drag and drop or click to upload
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Recommended: 1280x720px (16:9)
                  </div>
                  <label className="mt-2 cursor-pointer">
                    <span className="bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-lg font-medium transition-colors duration-200 inline-block">
                      Choose File
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            )}
          </div>
        </section> */}

        {/* Course Settings */}
        <section className="bg-card rounded-xl p-6 shadow-sm border border-border">
          <h2 className="text-lg font-semibold mb-4">Course Settings</h2>
          
          <div className="space-y-4">
            {/* Pricing Options */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Pricing
              </label>
              <div className="flex flex-col space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="isFree"
                    checked={formData.isFree}
                    onChange={handleChange}
                    className="rounded border-input text-primary focus:ring-primary"
                  />
                  <span>Free Course</span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="isPremium"
                    checked={formData.isPremium}
                    onChange={handleChange}
                    className="rounded border-input text-primary focus:ring-primary"
                  />
                  <span>Premium Course</span>
                </label>
                
                {formData.isPremium && (
                  <div className="pl-6 pt-2">
                    <label htmlFor="price" className="block text-sm font-medium mb-1">
                      Price (₦) <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={handleChange}
                      required={formData.isPremium}
                      placeholder="29.99"
                      className="w-full p-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                )}
              </div>
            </div>
            
            {/* Visibility Settings */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Visibility
              </label>
              <div className="flex flex-col space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="isPublic"
                    checked={formData.isPublic}
                    onChange={handleChange}
                    className="rounded border-input text-primary focus:ring-primary"
                  />
                  <span>Public - Listed in course directory</span>
                </label>
              </div>
            </div>
            
            {/* Publication Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium mb-1">
                Initial Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="draft">Draft - Not visible to students</option>
                <option value="published">Published - Available for enrollment</option>
              </select>
            </div>
          </div>
        </section>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/user/instructor/courses')}
            className="py-2 px-4 rounded-lg font-medium border border-input hover:bg-muted transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-6 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <LucideIcons.Loader className="animate-spin" size={16} />
                Creating...
              </>
            ) : (
              <>
                <LucideIcons.Save size={16} />
                Create Course
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}