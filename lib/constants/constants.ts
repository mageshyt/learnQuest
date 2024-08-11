import { SideBar } from "@/types/typings";
import {
  BookCheck,
  Compass,
  GraduationCap,
  Layout,
  Trophy,
} from "lucide-react";

export const clients = [...new Array(4)].map((client, index) => ({
  href: `/sponsers/${index + 1}.png`,
}));

export const products = [
  {
    title: "Programming",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Video Editing",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Design",
    link: "#",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/rogue.png",
  },

  {
    title: "Filming",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Teaching & Academics",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Cooking ",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1556911261-6bd341186b2f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNvb2t8ZW58MHx8MHx8fDA%3D",
  },
  {
    title: "Digital Marketing",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1532622785990-d2c36a76f5a6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Healthy Lifestyle",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1445384763658-0400939829cd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Camping",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1487730116645-74489c95b41b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D",
  },
  {
    title: "Health & Fitness",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fEZpdG5lc3N8ZW58MHx8MHx8fDA%3D",
  },
  {
    title: "Music",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export const TEACHER_NAV_ITEM: SideBar[] = [
  {
    title: "Main",

    items: [
      {
        title: "Dashboard",
        path: "/teacher/analytics",
        submenu: false,
        icon: Layout,
      },
    ],
  },
  {
    title: "Course Management",
    items: [
      {
        title: "course",
        path: "/teacher/courses",
        submenu: true,
        subMenuItems: [
          {
            title: "My courses",
            path: "/",
          },
          {
            title: "Add course",
            path: "/create",
          },
        ],
        icon: BookCheck,
      },
      {
        title: "students",
        icon: GraduationCap,
        path: "/teacher/students",
      },
    ],
  },
];

export const USER_NAV_ITEM: SideBar[] = [
  {
    title: "Main",
    items: [
      {
        title: "Dashboard",
        path: "/",
        icon: Layout,
      },
      {
        title: "Browser",
        path: "/search",
        icon: Compass,
      },
      {
        title: "Quiz",
        path: "/quiz",
        icon: Trophy,
      },
    ],
  },
];

export const QUIZ_IMAGE = ["/image/quiz-1.jpeg", "/image/quiz-1.jpeg"];

export const AssetConstants = {
  error: "/image/error.jpeg",
  sad_emoji: "/icons/sad.svg",
  teacher: "/icons/teacher.svg",
  verified: "/icons/verified.svg",
};

export const AUDIO_CONSTANTS = {
  error: "/audio/wrong-answer.mp3",
  correct: "/audio/correct.mp3",
  select: "/audio/menu-selection.mp3",
  intro: "/audio/game-start.mp3",
};

export const GRADE_CONSTANTS = {
  grade1: "/icons/grades/grade-1.svg",
  grade2: "/icons/grades/grade-2.svg",
  grade3: "/icons/grades/grade-3.svg",
  grade4: "/icons/grades/grade-4.svg",
  test: "/icons/grades/test.svg",
};
