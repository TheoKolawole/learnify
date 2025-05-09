import React from 'react';
import * as LucideIcons from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import PendingReview from '@/components/PendingReview';
import StatCard from '@/components/StatCard';
import ActivityItem from '@/components/ActivityItem';
import QuickAction from '@/components/QuickAction';

export default function InstructorDashboard() {
  const { userInfo } = useAuth();
  
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <section className="bg-card rounded-xl p-6 shadow-sm border border-border transition-colors duration-300">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Welcome back, {userInfo?.name || 'Instructor'}!</h1>
            <p className="text-muted-foreground mt-1">Here's an overview of your courses and student activity</p>
          </div>
          <button className="bg-primary/10 hover:bg-primary/20 text-primary py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2">
            <LucideIcons.PlusCircle size={16} />
            Create Course
          </button>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Active Courses" 
          value="5" 
          change="+1 this month" 
          isPositive={true}
          icon="BookMarked" 
        />
        <StatCard 
          title="Total Students" 
          value="327" 
          change="+42 this month" 
          isPositive={true}
          icon="Users" 
        />
        <StatCard 
          title="Pending Reviews" 
          value="14" 
          change="Submissions" 
          isPositive={false}
          icon="FileText" 
        />
        <StatCard 
          title="Avg. Completion" 
          value="83%" 
          change="+5.3%" 
          isPositive={true}
          icon="BarChart3" 
        />
      </section>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Feed (Left Column) */}
        <section className="lg:col-span-2 bg-card rounded-xl border border-border shadow-sm transition-colors duration-300">
          <div className="p-5 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
          </div>
          <div className="p-5 space-y-5">
            <ActivityItem
              icon="FileText"
              title="Assignment Submission"
              description="Data Structures - Lab #4 from John Smith"
              amount="New"
              isPositive={null}
              time="Today, 10:30 AM"
              category="Submission"
            />
            <ActivityItem
              icon="MessageSquare"
              title="Discussion Post"
              description="5 new replies in Business Ethics forum"
              amount="5 replies"
              isPositive={true}
              time="Yesterday"
              category="Discussion"
            />
            <ActivityItem
              icon="ListChecks"
              title="Quiz Results"
              description="Intro to Psychology - Chapter 3 Quiz"
              amount="Avg: 87%"
              isPositive={true}
              time="Yesterday"
              category="Quiz"
            />
            <ActivityItem
              icon="UserPlus"
              title="New Enrollments"
              description="3 students joined Modern History"
              amount="+3"
              isPositive={true}
              time="May 7, 2025"
              category="Enrollment"
            />
            <ActivityItem
              icon="AlertCircle"
              title="Low Performance Alert"
              description="5 students below 60% in Data Structures"
              amount="Action needed"
              isPositive={false}
              time="May 6, 2025"
              category="Alert"
            />
          </div>
          <div className="p-4 border-t border-border text-center">
            <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
              View All Activity
            </button>
          </div>
        </section>

        {/* Right Sidebar */}
        <section className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-card rounded-xl border border-border shadow-sm transition-colors duration-300">
            <div className="p-5 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
            </div>
            <div className="grid grid-cols-2 gap-2 p-4">
              <QuickAction icon="BookMarked" title="Courses" />
              <QuickAction icon="FileText" title="Submissions" />
              <QuickAction icon="BarChart3" title="Analytics" />
              <QuickAction icon="PlusCircle" title="New Course" />
            </div>
          </div>

          {/* Pending Reviews */}
          <div className="bg-card rounded-xl border border-border shadow-sm transition-colors duration-300">
            <div className="p-5 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Pending Reviews</h2>
            </div>
            <div className="p-4 space-y-4">
              <PendingReview 
                title="Final Project Draft" 
                course="Business Ethics" 
                student="Emily Johnson"
                submitted="May 8, 2025" 
                daysWaiting={1} 
              />
              <PendingReview 
                title="Research Paper" 
                course="Modern History" 
                student="Michael Chang"
                submitted="May 7, 2025" 
                daysWaiting={2} 
              />
              <PendingReview 
                title="Coding Assignment" 
                course="Data Structures" 
                student="Sarah Williams"
                submitted="May 5, 2025" 
                daysWaiting={4} 
              />
            </div>
            <div className="p-4 border-t border-border text-center">
              <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
                View All Submissions
              </button>
            </div>
          </div>

          {/* Course Analytics Summary */}
          <div className="bg-card rounded-xl border border-border shadow-sm transition-colors duration-300 p-5">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Most Active Course</h2>
                <p className="text-muted-foreground text-sm">Data Structures & Algorithms</p>
              </div>
              <span className="text-primary font-semibold">89%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5">
              <div className="bg-primary h-2.5 rounded-full" style={{ width: '89%' }}></div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-muted-foreground">112 active students</span>
              <span className="text-xs text-muted-foreground">Week 8 of 12</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}