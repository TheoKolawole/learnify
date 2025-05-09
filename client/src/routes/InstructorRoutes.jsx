import { Routes, Route } from 'react-router-dom';
import InstructorDashboard from '@/pages/instructor/InstructorDashboard';
import InstructorCoursesPage from '@/pages/instructor/InstructorCoursesPage';
import InstructorCourseAnalyticsPage from '@/pages/instructor/InstructorCourseAnalyticsPage';
import CourseCreationPage from '@/pages/instructor/CourseCreationPage';
import EditCoursePage from '@/pages/instructor/EditCoursePage';

const InstructorRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<InstructorDashboard />} />
      <Route path="courses" element={<InstructorCoursesPage />} />
      <Route path="courses/create" element={<CourseCreationPage />} />
      <Route path="courses/:courseId/analytics" element={<InstructorCourseAnalyticsPage />} />
      <Route path="courses/:courseId/edit" element={<EditCoursePage />} />
    </Routes>
  );
};

export default InstructorRoutes;
// This file defines the routes for the instructor section of the application.