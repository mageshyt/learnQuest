import { Remarkable } from "remarkable";

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  }).format(price);
};

export const markdownToHtml = (markdown: string): string => {
  const md = new Remarkable();
  return md.render(markdown);
};
