import { useAuth } from "@/context/AuthContext";

export const NavMenu = () => {
  const {userInfo} = useAuth();

  const common = [
    {
      name: "Dashboard",
      icon: "Home",
      slug: "dashboard",
    }
  ];

  const student = [
    {
      name: "My Courses",
      icon: "BookOpen",
      slug: "my-courses",
    },
    // {
    //   name: "Assignments",
    //   icon: "ClipboardList",
    //   slug: "assignments",
    // },
    {
      name: "Quizzes",
      icon: "ListChecks",
      slug: "quizzes",
    },
    {
      name: "Grades",
      icon: "GraduationCap",
      slug: "grades",
    },
    // {
    //   name: "Certificates",
    //   icon: "Award",
    //   slug: "certificates",
    // },
    // {
    //   name: "Browse Courses",
    //   icon: "Search",
    //   slug: "courses",
    // },
  ];

  const instructor = [
    {
      name: "Courses",
      icon: "BookMarked",
      slug: "manage-courses",
    },
    // {
    //   name: "Create Course",
    //   icon: "PlusCircle",
    //   slug: "create-course",
    // },
    {
      name: "Submissions",
      icon: "FileText",
      slug: "submissions",
    },
    {
      name: "Course Analytics",
      icon: "BarChart3",
      slug: "course-analytics",
    },
  ];

  const admin = [
    {
      name: "User Management",
      icon: "Users",
      slug: "users",
    },
    {
      name: "Course Management",
      icon: "Library",
      slug: "course-management",
    },
    {
      name: "Reports",
      icon: "FileBarChart",
      slug: "reports",
    },
    {
      name: "Payments",
      icon: "CreditCard",
      slug: "payments",
    },
    {
      name: "System Settings",
      icon: "Sliders",
      slug: "system-settings",
    },
    {
      name: "Announcements",
      icon: "Megaphone",
      slug: "announcements",
    },
  ];

  if (userInfo.role === "student") return [...common, ...student];
  if (userInfo.role === "instructor") return [...common, ...instructor];
  if (userInfo.role === "admin") return [...common, ...admin];
  return common;
};
