import { Remarkable } from "remarkable";

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

export const markdownToHtml = (markdown: string): string => {
  const md = new Remarkable();
  return md.render(markdown);
};

export const HtmlToText = (html: string): string => {
  return html.replace(/<[^>]*>?/gm, "");
};
