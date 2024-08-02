import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { GRADE_CONSTANTS } from "./constants/constants";
import { Role, User } from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncate(str: string, length: number) {
  return str.length > length ? str.substring(0, length) + "..." : str;
}

export function random<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function getGradeImage(score: number) {
  if (score >= 80 && score <= 100) {
    return GRADE_CONSTANTS.grade1;
  } else if (score >= 60 && score < 80) {
    return GRADE_CONSTANTS.grade2;
  } else if (score >= 40 && score < 60) {
    return GRADE_CONSTANTS.grade3;
  } else {
    return GRADE_CONSTANTS.grade4;
  }
}

export function userInRole({ user_role, roles }: { user_role: Role; roles: Role[] }) {
  return roles.includes(user_role);
}
