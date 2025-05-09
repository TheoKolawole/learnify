import { useAuth } from "@/context/AuthContext";

export const NavMenu = () => {
  const {userInfo} = useAuth();
  const role = userInfo?.role || "student";

  const common = [
    {
      name: "Dashboard",
      icon: "Home",
      slug: `${role}/dashboard`,
    }
  ];

  const student = [
    {
      name: "My Courses",
      icon: "BookOpen",
      slug: `${role}/courses`,
    },
    // {
    //   name: "Assignments",
    //   icon: "ClipboardList",
    //   slug: `${role}/assignments`,
    // },
    {
      name: "Quizzes",
      icon: "ListChecks",
      slug: `${role}/quizzes`,
    },
    {
      name: "Grades",
      icon: "GraduationCap",
      slug: `${role}/grades`,
    },
    // {
    //   name: "Certificates",
    //   icon: "Award",
    //   slug: `${role}/certificates`,
    // },
    // {
    //   name: "Browse Courses",
    //   icon: "Search",
    //   slug: `${role}/courses`,
    // },
  ];

  const instructor = [
    {
      name: "Courses",
      icon: "BookMarked",
      slug: `${role}/courses`,
    },
    // {
    //   name: "Create Course",
    //   icon: "PlusCircle",
    //   slug: `${role}/create`course",
    // },
    {
      name: "Submissions",
      icon: "FileText",
      slug: `${role}/submissions`,
    },
    {
      name: "Course Analytics",
      icon: "BarChart3",
      slug: `${role}/course-analytics`,
    },
  ];

  if (userInfo.role === "student") return [...common, ...student];
  if (userInfo.role === "instructor") return [...common, ...instructor];
  return common;
};
