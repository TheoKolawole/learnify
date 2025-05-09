import React from 'react';
import { useAuth } from "@/context/AuthContext";
import StudentDashboard from './student/StudentDashboard';
import InstructorDashboard from './instructor/InstructorDashboard';

export default function Dashboard() {
  const { userInfo } = useAuth();
  
  return (
    <>
      {userInfo?.role === "student" && <StudentDashboard />}
      {userInfo?.role === "instructor" && <InstructorDashboard />}
      {!userInfo?.role && (
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Please sign in to view your dashboard</p>
        </div>
      )}
    </>
  );
}