import React from 'react';
import * as LucideIcons from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import UpcomingDeadline from '@/components/UpcomingDeadline';
import StatCard from '@/components/StatCard';
import QuickAction from '@/components/QuickAction';
import ActivityItem from '@/components/ActivityItem';

export default function StudentDashboard() {
  const { userInfo } = useAuth();
  
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <section className="bg-card rounded-xl p-6 shadow-sm border border-border transition-colors duration-300">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Welcome back, {userInfo?.name || 'Student'}!</h1>
            <p className="text-muted-foreground mt-1">Here's an overview of your learning progress</p>
          </div>
          <button className="bg-primary/10 hover:bg-primary/20 text-primary py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2">
            <LucideIcons.PlayCircle size={16} />
            Resume Learning
          </button>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Enrolled Courses" 
          value="4" 
          change="+1 this month" 
          isPositive={true}
          icon="BookOpen" 
        />
        <StatCard 
          title="Completion Rate" 
          value="76%" 
          change="+12.5%" 
          isPositive={true}
          icon="BarChart2" 
        />
        <StatCard 
          title="Pending Quizzes" 
          value="3" 
          change="Due this week" 
          isPositive={false}
          icon="ListChecks" 
        />
        <StatCard 
          title="Average Grade" 
          value="B+" 
          change="+5.3%" 
          isPositive={true}
          icon="GraduationCap" 
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
              icon="Award"
              title="Quiz Completed"
              description="Introduction to Psychology - Chapter 3"
              amount="A"
              isPositive={true}
              time="Today, 10:30 AM"
              category="Quiz"
            />
            <ActivityItem
              icon="FileText"
              title="Assignment Submitted"
              description="Data Structures - Lab Assignment #4"
              amount="Pending"
              isPositive={null}
              time="Yesterday"
              category="Assignment"
            />
            <ActivityItem
              icon="Video"
              title="Lecture Watched"
              description="Modern History - The Cold War Era"
              amount="80%"
              isPositive={true}
              time="Yesterday"
              category="Video"
            />
            <ActivityItem
              icon="MessageSquare"
              title="Discussion Post"
              description="Business Ethics - Week 5 Discussion"
              amount="Posted"
              isPositive={true}
              time="May 7, 2025"
              category="Discussion"
            />
            <ActivityItem
              icon="Book"
              title="Course Started"
              description="Introduction to Machine Learning"
              amount="New"
              isPositive={true}
              time="May 5, 2025"
              category="Course"
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
              <QuickAction icon="BookOpen" title="My Courses" />
              <QuickAction icon="ListChecks" title="Quizzes" />
              <QuickAction icon="GraduationCap" title="Grades" />
              <QuickAction icon="Search" title="Find Courses" />
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="bg-card rounded-xl border border-border shadow-sm transition-colors duration-300">
            <div className="p-5 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Upcoming Deadlines</h2>
            </div>
            <div className="p-4 space-y-4">
              <UpcomingDeadline 
                title="Data Structures Quiz" 
                course="Data Structures & Algorithms" 
                dueDate="May 12, 2025" 
                daysLeft={3} 
              />
              <UpcomingDeadline 
                title="Psychology Essay" 
                course="Introduction to Psychology" 
                dueDate="May 15, 2025" 
                daysLeft={6} 
              />
              <UpcomingDeadline 
                title="Final Project Draft" 
                course="Business Ethics" 
                dueDate="May 20, 2025" 
                daysLeft={11} 
              />
            </div>
            <div className="p-4 border-t border-border text-center">
              <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
                View All Deadlines
              </button>
            </div>
          </div>

          {/* Course Progress */}
          <div className="bg-card rounded-xl border border-border shadow-sm transition-colors duration-300 p-5">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Current Course</h2>
                <p className="text-muted-foreground text-sm">Data Structures & Algorithms</p>
              </div>
              <span className="text-primary font-semibold">68%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5">
              <div className="bg-primary h-2.5 rounded-full" style={{ width: '68%' }}></div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-muted-foreground">12/16 modules completed</span>
              <span className="text-xs text-muted-foreground">4 weeks left</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}