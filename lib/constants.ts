import { SideBar } from "@/types/typings";
import exp from "constants";
import {
  Book,
  BookCheck,
  Brain,
  GraduationCap,
  Layout,
  Search,
  Trophy,
  Users,
} from "lucide-react";

export const clients = [...new Array(10)].map((client, index) => ({
  href: `/sponsers/${index + 1}.png`,
}));

export const products = [
  {
    title: "Moonbeam",
    link: "https://gomoonbeam.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/moonbeam.png",
  },
  {
    title: "Cursor",
    link: "https://cursor.so",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/cursor.png",
  },
  {
    title: "Rogue",
    link: "https://userogue.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/rogue.png",
  },

  {
    title: "Editorially",
    link: "https://editorially.org",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/editorially.png",
  },
  {
    title: "Editrix AI",
    link: "https://editrix.ai",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/editrix.png",
  },
  {
    title: "Pixel Perfect",
    link: "https://app.pixelperfect.quest",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/pixelperfect.png",
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
        icon: Search,
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
};
