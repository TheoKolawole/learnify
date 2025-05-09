import React, { useState, useEffect } from 'react';
import * as LucideIcons from "lucide-react";
import { useParams, useNavigate } from 'react-router-dom';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { useToast } from "@/hooks/useToast";

export default function InstructorCourseAnalyticsPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [course, setCourse] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recalculating, setRecalculating] = useState(false);
  const [period, setPeriod] = useState('week'); // 'week', 'month', 'year'

  useEffect(() => {
    fetchCourseAndAnalytics();
  }, [courseId]);

  const fetchCourseAndAnalytics = async () => {
    try {
      setLoading(true);
      
      // Fetch course details
      const courseRes = await axios.get(`/api/courses/${courseId}`);
      setCourse(courseRes.data.data);
      
      // Fetch course analytics
      const analyticsRes = await axios.get(`/api/courses/${courseId}/analytics`);
      setAnalytics(analyticsRes.data.data);
    } catch (error) {
      console.error('Error fetching course data:', error);
      toast({
        title: "Error",
        description: "Failed to load course analytics",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRecalculateAnalytics = async () => {
    try {
      setRecalculating(true);
      const res = await axios.post(`/api/courses/${courseId}/analytics/recalculate`);
      setAnalytics(res.data.data);
      
      toast({
        title: "Success",
        description: "Analytics recalculated successfully",
      });
    } catch (error) {
      console.error('Error recalculating analytics:', error);
      toast({
        title: "Error",
        description: "Failed to recalculate analytics",
        variant: "destructive"
      });
    } finally {
      setRecalculating(false);
    }
  };

  // Sample data for charts when real data is not available
  const sampleEnrollmentData = [
    { name: 'Week 1', count: 12 },
    { name: 'Week 2', count: 19 },
    { name: 'Week 3', count: 25 },
    { name: 'Week 4', count: 32 },
    { name: 'Week 5', count: 38 },
    { name: 'Week 6', count: 42 },
    { name: 'Week 7', count: 49 },
    { name: 'Week 8', count: 53 },
  ];

  const sampleModuleCompletionData = [
    { name: 'Module 1', completion: 95 },
    { name: 'Module 2', completion: 88 },
    { name: 'Module 3', completion: 76 },
    { name: 'Module 4', completion: 65 },
    { name: 'Module 5', completion: 54 },
    { name: 'Module 6', completion: 42 },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LucideIcons.Loader className="animate-spin" size={32} />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="bg-card rounded-xl p-12 shadow-sm border border-border text-center">
        <LucideIcons.AlertCircle size={48} className="mx-auto text-muted-foreground" />
        <h3 className="text-xl font-semibold mt-4">Course not found</h3>
        <p className="text-muted-foreground mt-2">
          The requested course could not be found or you don't have access to it.
        </p>
        <button 
          onClick={() => navigate('/instructor/courses')}
          className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-lg font-medium transition-colors duration-200"
        >
          Back to Courses
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <section className="bg-card rounded-xl p-6 shadow-sm border border-border transition-colors duration-300">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => navigate('/instructor/courses')}
                className="p-2 rounded-md hover:bg-accent transition-colors"
              >
                <LucideIcons.ArrowLeft size={18} />
              </button>
              <h1 className="text-2xl font-bold text-foreground">{course.title} - Analytics</h1>
            </div>
            <p className="text-muted-foreground mt-1 ml-10">Track student engagement and course performance</p>
          </div>
          <button 
            onClick={handleRecalculateAnalytics}
            disabled={recalculating}
            className="bg-primary/10 hover:bg-primary/20 text-primary py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 disabled:opacity-50"
          >
            {recalculating ? (
              <LucideIcons.Loader size={16} className="animate-spin" />
            ) : (
              <LucideIcons.RefreshCw size={16} />
            )}
            Recalculate Analytics
          </button>
        </div>
      </section>

      {/* Overview Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl p-5 shadow-sm border border-border transition-colors duration-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-muted-foreground text-sm">Total Enrollments</p>
              <h3 className="text-2xl font-bold mt-1">
                {analytics?.totalEnrollments || 0}
              </h3>
            </div>
            <div className="bg-primary/10 p-3 rounded-full">
              <LucideIcons.Users size={20} className="text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-xl p-5 shadow-sm border border-border transition-colors duration-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-muted-foreground text-sm">Completion Rate</p>
              <h3 className="text-2xl font-bold mt-1">
                {analytics?.completionRate || 0}%
              </h3>
            </div>
            <div className="bg-success/10 p-3 rounded-full">
              <LucideIcons.CheckCircle size={20} className="text-success" />
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-xl p-5 shadow-sm border border-border transition-colors duration-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-muted-foreground text-sm">Average Rating</p>
              <h3 className="text-2xl font-bold mt-1">
                {analytics?.averageRating?.toFixed(1) || '0.0'}
              </h3>
            </div>
            <div className="bg-warning/10 p-3 rounded-full">
              <LucideIcons.Star size={20} className="text-warning" />
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-xl p-5 shadow-sm border border-border transition-colors duration-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-muted-foreground text-sm">Active Students</p>
              <h3 className="text-2xl font-bold mt-1">
                {analytics?.activeStudents || 0}
              </h3>
            </div>
            <div className="bg-blue-500/10 p-3 rounded-full">
              <LucideIcons.UserCheck size={20} className="text-blue-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Trend Chart */}
        <div className="bg-card rounded-xl shadow-sm border border-border transition-colors duration-300">
          <div className="p-5 border-b border-border">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-foreground">Enrollment Trend</h2>
              <div className="flex bg-muted rounded-lg overflow-hidden">
                <button 
                  onClick={() => setPeriod('week')}
                  className={`px-3 py-1 text-sm ${period === 'week' ? 'bg-accent text-foreground' : 'text-muted-foreground'}`}
                >
                  Week
                </button>
                <button 
                  onClick={() => setPeriod('month')}
                  className={`px-3 py-1 text-sm ${period === 'month' ? 'bg-accent text-foreground' : 'text-muted-foreground'}`}
                >
                  Month
                </button>
                <button 
                  onClick={() => setPeriod('year')}
                  className={`px-3 py-1 text-sm ${period === 'year' ? 'bg-accent text-foreground' : 'text-muted-foreground'}`}
                >
                  Year
                </button>
              </div>
            </div>
          </div>
          <div className="p-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={analytics?.enrollmentTrend || sampleEnrollmentData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#888" opacity={0.2} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  name="Enrollments" 
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Module Completion Chart */}
        <div className="bg-card rounded-xl shadow-sm border border-border transition-colors duration-300">
          <div className="p-5 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Module Completion Rates</h2>
          </div>
          <div className="p-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={analytics?.moduleCompletionRates || sampleModuleCompletionData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#888" opacity={0.2} />
                <XAxis dataKey="name" />
                <YAxis unit="%" />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="completion" 
                  name="Completion %" 
                  fill="#82ca9d" 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Student Engagement and Demographics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student Demographics */}
        <div className="bg-card rounded-xl shadow-sm border border-border transition-colors duration-300">
          <div className="p-5 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Student Demographics</h2>
          </div>
          <div className="p-5">
            <div className="space-y-4">
              {(analytics?.demographics?.age || [
                { group: '18-24', percentage: 35 },
                { group: '25-34', percentage: 45 },
                { group: '35-44', percentage: 15 },
                { group: '45+', percentage: 5 }
              ]).map(item => (
                <div key={item.group}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">{item.group}</span>
                    <span className="text-sm font-medium">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Top Performing Content */}
        <div className="bg-card rounded-xl shadow-sm border border-border transition-colors duration-300 lg:col-span-2">
          <div className="p-5 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Top Performing Content</h2>
          </div>
          <div className="p-5">
            <div className="space-y-4">
              {(analytics?.topContent || [
                { title: 'Introduction to Course', type: 'Video', engagement: 98 },
                { title: 'Understanding Core Concepts', type: 'Lesson', engagement: 92 },
                { title: 'Practical Exercise #1', type: 'Assignment', engagement: 89 },
                { title: 'Advanced Techniques', type: 'Lesson', engagement: 85 },
                { title: 'Case Study Analysis', type: 'Quiz', engagement: 82 }
              ]).map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                  <div className="flex items-center gap-3">
                    <div className="bg-background w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      <span className="text-xs text-muted-foreground">{item.type}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold">{item.engagement}%</span>
                    <div className="text-xs text-muted-foreground">engagement</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}