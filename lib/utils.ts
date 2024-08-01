import useSound from "use-sound";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { audioType } from "@/types/typings";
import { AUDIO_CONSTANTS } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncate(str: string, length: number) {
  return str.length > length ? str.substring(0, length) + "..." : str;
}

export function random<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function playAudio(type: audioType) {
  const audio_src = {
    correct: AUDIO_CONSTANTS.correct,
    select: AUDIO_CONSTANTS.select,
    wrong: AUDIO_CONSTANTS.error,
  };
  const [play] = useSound(audio_src[type]);

  return play;
}
