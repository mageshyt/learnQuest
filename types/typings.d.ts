import { LucideIcon } from "lucide-react";

export type SideNavItem = {
  title: string;
  path: string;
  icon?: LucideIcon;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
};

export type SideBar = {
  title: string;
  items: SideNavItem[];
};

export type Question = {
  question: string;
  answer: string;
  options: string[];
  explanation: string;
  type: questionType;
};

export type questionType =
  | "true/false"
  | "multiple choice"
  | "fill in the blank";

export type quizStatusType = "none" | "completed" | "correct" | "wrong";

export type audioType = "correct" | "select" | "wrong";

export type userAnswerType = {
  question: string;
  answer: string;
  isCorrect: boolean;
};


export type LeaderboardUser = {
  id: string
  name: string | null;
  email: string | null;
  points: number;
}

