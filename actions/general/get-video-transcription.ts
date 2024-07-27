"use server";
import axios from "axios";

export const getVideoTranscription = async (
  playBackId: string,
  trackId: string
) => {
  try {
    const { data } = await axios.get(
      `https://stream.mux.com/${playBackId}/text/${trackId}.txt`
    );
    console.log("[VIDEO TRANSCRIPT] -> data", data);
    return data;
  } catch (e) {
    return "";
  }
};
