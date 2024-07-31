import { SideBar } from "@/types/typings";
import {
  Book,
  BookCheck,
  GraduationCap,
  Layout,
  Search,
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
    ],
  },
];

export const QUIZ_IMAGE = ["/image/quiz-1.jpeg", "/image/quiz-2.jpeg"];
